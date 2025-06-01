<template>
  <div class="my-account-view pa-4">
    <h1 class="text-h4 mb-8">My Account</h1>

    <!-- Shipping Addresses Section -->
    <section class="shipping-addresses mb-8">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h5">Shipping Addresses</h2>
        <v-btn color="primary" @click="openAddAddressDialog" prepend-icon="mdi-plus-circle-outline">Add New Address</v-btn>
      </div>
      <v-alert v-if="shippingAddresses.length === 0" type="info" variant="tonal" class="mb-4">
        No shipping addresses saved.
      </v-alert>
      <v-row v-else>
        <v-col v-for="address in shippingAddresses" :key="address.id" cols="12" md="6" lg="4">
          <v-card class="mb-4" outlined>
            <v-card-title class="text-subtitle-1">{{ address.street }}</v-card-title>
            <v-card-text class="pb-0">
              <p>{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
              <p>{{ address.country }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon="mdi-pencil" size="small" variant="text" @click="openEditAddressDialog(address)" title="Edit Address"></v-btn>
              <v-btn icon="mdi-delete" size="small" variant="text" @click="openDeleteAddressDialog(address)" title="Delete Address"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- Bank Accounts Section -->
    <section class="bank-accounts mb-8">
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h5">Bank Accounts</h2>
        <v-btn color="primary" @click="openAddBankAccountDialog" prepend-icon="mdi-plus-circle-outline">Add New Bank Account</v-btn>
      </div>
      <v-alert v-if="bankAccounts.length === 0" type="info" variant="tonal" class="mb-4">
        No bank accounts saved.
      </v-alert>
      <v-row v-else>
        <v-col v-for="account in bankAccounts" :key="account.id" cols="12" md="6" lg="4">
          <v-card class="mb-4" outlined>
            <v-card-title class="text-subtitle-1">{{ account.bankName }}</v-card-title>
            <v-card-text class="pb-0">
              <p><strong>Holder:</strong> {{ account.accountHolderName }}</p>
              <p><strong>Number:</strong> **** **** **** {{ account.accountNumber.slice(-4) }}</p>
              <p><strong>Type:</strong> {{ account.accountType }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon="mdi-pencil" size="small" variant="text" @click="openEditBankAccountDialog(account)" title="Edit Bank Account"></v-btn>
              <v-btn icon="mdi-delete" size="small" variant="text" @click="openDeleteBankAccountDialog(account)" title="Delete Bank Account"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- Add/Edit Shipping Address Dialog -->
    <v-dialog v-model="addressDialog" persistent max-width="600px" eager>
      <v-card>
        <v-card-title class="text-h6">{{ editingAddress && editingAddress.id ? 'Edit Shipping Address' : 'Add New Shipping Address' }}</v-card-title>
        <v-card-text class="pt-4">
          <v-form ref="addressFormRef" v-model="isAddressFormValid">
            <v-container>
              <v-row>
                <v-col cols="12"><v-text-field v-model="currentAddressFormData.street" label="Street Address" :rules="[rules.required]" required density="compact" variant="outlined"></v-text-field></v-col>
                <v-col cols="12" sm="6"><v-text-field v-model="currentAddressFormData.city" label="City" :rules="[rules.required]" required density="compact" variant="outlined"></v-text-field></v-col>
                <v-col cols="12" sm="6"><v-text-field v-model="currentAddressFormData.state" label="State / Province" :rules="[rules.required]" required density="compact" variant="outlined"></v-text-field></v-col>
                <v-col cols="12" sm="6"><v-text-field v-model="currentAddressFormData.zipCode" label="ZIP / Postal Code" :rules="[rules.required]" required density="compact" variant="outlined"></v-text-field></v-col>
                <v-col cols="12" sm="6"><v-text-field v-model="currentAddressFormData.country" label="Country" :rules="[rules.required]" required density="compact" variant="outlined"></v-text-field></v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeAddressDialog">Cancel</v-btn>
          <v-btn color="primary" variant="flat" :disabled="!isAddressFormValid" @click="saveShippingAddress">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Address Confirmation Dialog -->
    <v-dialog v-model="deleteAddressDialog" persistent max-width="450px">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete Address</v-card-title>
        <v-card-text>Are you sure you want to delete this shipping address? This action cannot be undone.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDeleteAddressDialog">Cancel</v-btn>
          <v-btn color="error" variant="flat" @click="confirmDeleteAddress">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add/Edit Bank Account Dialog -->
    <v-dialog v-model="bankAccountDialog" persistent max-width="600px" eager>
      <v-card>
        <v-card-title class="text-h6">{{ editingBankAccount && editingBankAccount.id ? 'Edit Bank Account' : 'Add New Bank Account' }}</v-card-title>
        <v-card-text class="pt-4">
          <v-form ref="bankAccountFormRef" v-model="isBankAccountFormValid">
            <v-container>
              <v-row>
                <v-col cols="12"><v-text-field v-model="currentBankAccountFormData.bankName" label="Bank Name" :rules="[rules.required]" required density="compact" variant="outlined"></v-text-field></v-col>
                <v-col cols="12"><v-text-field v-model="currentBankAccountFormData.accountHolderName" label="Account Holder Name" :rules="[rules.required]" required density="compact" variant="outlined"></v-text-field></v-col>
                <v-col cols="12" sm="8"><v-text-field v-model="currentBankAccountFormData.accountNumber" label="Account Number" :rules="[rules.required, rules.accountNumber]" required density="compact" variant="outlined"></v-text-field></v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="currentBankAccountFormData.accountType"
                    :items="accountTypes"
                    label="Account Type"
                    :rules="[rules.required]"
                    required
                    density="compact"
                    variant="outlined"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeBankAccountDialog">Cancel</v-btn>
          <v-btn color="primary" variant="flat" :disabled="!isBankAccountFormValid" @click="saveBankAccount">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Bank Account Confirmation Dialog -->
    <v-dialog v-model="deleteBankAccountDialog" persistent max-width="450px">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete Bank Account</v-card-title>
        <v-card-text>Are you sure you want to delete this bank account? This action cannot be undone.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDeleteBankAccountDialog">Cancel</v-btn>
          <v-btn color="error" variant="flat" @click="confirmDeleteBankAccount">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ReactiveLocalStorage } from '@/persistence/ReactiveLocalStorage';
import { VForm } from 'vuetify/components';

// --- Interfaces ---
interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
interface AddressFormData {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
interface BankAccount {
  id: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
}
interface BankAccountFormData {
  id?: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
}

// --- Default Form States ---
const defaultAddressForm: AddressFormData = { street: '', city: '', state: '', zipCode: '', country: '' };
const defaultBankAccountForm: BankAccountFormData = { bankName: '', accountHolderName: '', accountNumber: '', accountType: '' };

export default defineComponent({
  name: 'MyAccountView',
  setup() {
    // --- Local Storage Initialization ---
    const shippingAddressesStorage = new ReactiveLocalStorage<Address[]>('shippingAddresses', []);
    const bankAccountsStorage = new ReactiveLocalStorage<BankAccount[]>('bankAccounts', []);

    const shippingAddresses = shippingAddressesStorage.state;
    const bankAccounts = bankAccountsStorage.state;

    // --- Dialog States ---
    const addressDialog = ref(false);
    const deleteAddressDialog = ref(false);
    const bankAccountDialog = ref(false);
    const deleteBankAccountDialog = ref(false);

    // --- Form Validity ---
    const isAddressFormValid = ref(false);
    const isBankAccountFormValid = ref(false);

    // --- Form Refs ---
    const addressFormRef = ref<InstanceType<typeof VForm> | null>(null);
    const bankAccountFormRef = ref<InstanceType<typeof VForm> | null>(null);

    // --- Current Form Data ---
    const currentAddressFormData = reactive<AddressFormData>({ ...defaultAddressForm });
    const currentBankAccountFormData = reactive<BankAccountFormData>({ ...defaultBankAccountForm });

    // --- Editing States ---
    const editingAddress = ref<Address | null>(null);
    const editingBankAccount = ref<BankAccount | null>(null);

    // --- Items for Selects ---
    const accountTypes = ['Savings', 'Checking', 'Credit Card']; // Example types

    // --- Validation Rules ---
    const rules = {
      required: (value: string) => !!value || 'This field is required.',
      accountNumber: (value: string) => /^\d+$/.test(value) || 'Account number must be numeric.',
      // Add more specific rules as needed
    };

    // --- Shipping Address Methods ---
    const openAddAddressDialog = () => {
      editingAddress.value = null;
      Object.assign(currentAddressFormData, defaultAddressForm);
      addressDialog.value = true;
      addressFormRef.value?.resetValidation();
    };
    const openEditAddressDialog = (address: Address) => {
      editingAddress.value = address;
      Object.assign(currentAddressFormData, address);
      addressDialog.value = true;
      addressFormRef.value?.resetValidation();
    };
    const closeAddressDialog = () => {
      addressDialog.value = false;
      editingAddress.value = null;
      addressFormRef.value?.resetValidation();
    };
    const saveShippingAddress = async () => {
      const validation = await addressFormRef.value?.validate();
      if (!validation?.valid) return;

      if (editingAddress.value && currentAddressFormData.id) {
        const index = shippingAddresses.value.findIndex(addr => addr.id === currentAddressFormData.id);
        if (index !== -1) {
          shippingAddresses.value = [
            ...shippingAddresses.value.slice(0, index),
            { ...currentAddressFormData } as Address,
            ...shippingAddresses.value.slice(index + 1),
          ];
        }
      } else {
        const newAddress: Address = { id: Date.now().toString(), ...currentAddressFormData };
        shippingAddresses.value = [...shippingAddresses.value, newAddress];
      }
      closeAddressDialog();
    };
    const addressToDelete = ref<Address | null>(null);
    const openDeleteAddressDialog = (address: Address) => {
      addressToDelete.value = address;
      deleteAddressDialog.value = true;
    };
    const closeDeleteAddressDialog = () => {
      addressToDelete.value = null;
      deleteAddressDialog.value = false;
    };
    const confirmDeleteAddress = () => {
      if (addressToDelete.value) {
        shippingAddresses.value = shippingAddresses.value.filter(addr => addr.id !== addressToDelete.value!.id);
      }
      closeDeleteAddressDialog();
    };

    // --- Bank Account Methods ---
    const openAddBankAccountDialog = () => {
      editingBankAccount.value = null;
      Object.assign(currentBankAccountFormData, defaultBankAccountForm);
      bankAccountDialog.value = true;
      bankAccountFormRef.value?.resetValidation();
    };
    const openEditBankAccountDialog = (account: BankAccount) => {
      editingBankAccount.value = account;
      Object.assign(currentBankAccountFormData, account);
      bankAccountDialog.value = true;
      bankAccountFormRef.value?.resetValidation();
    };
    const closeBankAccountDialog = () => {
      bankAccountDialog.value = false;
      editingBankAccount.value = null;
      bankAccountFormRef.value?.resetValidation();
    };
    const saveBankAccount = async () => {
      const validation = await bankAccountFormRef.value?.validate();
      if (!validation?.valid) return;

      if (editingBankAccount.value && currentBankAccountFormData.id) {
        const index = bankAccounts.value.findIndex(acc => acc.id === currentBankAccountFormData.id);
        if (index !== -1) {
          bankAccounts.value = [
            ...bankAccounts.value.slice(0, index),
            { ...currentBankAccountFormData } as BankAccount,
            ...bankAccounts.value.slice(index + 1),
          ];
        }
      } else {
        const newAccount: BankAccount = { id: Date.now().toString(), ...currentBankAccountFormData };
        bankAccounts.value = [...bankAccounts.value, newAccount];
      }
      closeBankAccountDialog();
    };
    const bankAccountToDelete = ref<BankAccount | null>(null);
    const openDeleteBankAccountDialog = (account: BankAccount) => {
      bankAccountToDelete.value = account;
      deleteBankAccountDialog.value = true;
    };
    const closeDeleteBankAccountDialog = () => {
      bankAccountToDelete.value = null;
      deleteBankAccountDialog.value = false;
    };
    const confirmDeleteBankAccount = () => {
      if (bankAccountToDelete.value) {
        bankAccounts.value = bankAccounts.value.filter(acc => acc.id !== bankAccountToDelete.value!.id);
      }
      closeDeleteBankAccountDialog();
    };

    return {
      shippingAddresses,
      bankAccounts,
      addressDialog,
      deleteAddressDialog,
      isAddressFormValid,
      editingAddress,
      currentAddressFormData,
      addressFormRef,
      rules,
      openAddAddressDialog,
      openEditAddressDialog,
      closeAddressDialog,
      saveShippingAddress,
      openDeleteAddressDialog,
      closeDeleteAddressDialog,
      confirmDeleteAddress,
      // Bank Account related
      bankAccountDialog,
      deleteBankAccountDialog,
      isBankAccountFormValid,
      editingBankAccount,
      currentBankAccountFormData,
      bankAccountFormRef,
      accountTypes,
      openAddBankAccountDialog,
      openEditBankAccountDialog,
      closeBankAccountDialog,
      saveBankAccount,
      openDeleteBankAccountDialog,
      closeDeleteBankAccountDialog,
      confirmDeleteBankAccount,
    };
  },
});
</script>

<style scoped>
.my-account-view {
  padding: 20px;
}
section {
  margin-bottom: 48px; /* Increased bottom margin for sections */
}
.v-card-text p {
  margin-bottom: 8px; /* Add some space between paragraphs in card text */
}
.v-card-text p:last-child {
  margin-bottom: 0;
}
</style>
