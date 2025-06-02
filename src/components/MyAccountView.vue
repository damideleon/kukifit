<template>
  <div class="my-account-view pa-4">
    <h1 class="text-h4 mb-8">Mi cuenta</h1>

    <!-- Shipping Addresses Section -->
    <section class="shipping-addresses mb-8">
      <h2 class="text-h5">Direcciones de envío</h2>
      <p>Aquí puedes gestionar tus direcciones de envío guardadas.</p>
      <v-alert
        v-if="shippingAddresses && shippingAddresses.length === 0"
        type="info"
        variant="tonal"
        class="mb-4"
      >
        No hay direcciones de envío guardadas.
      </v-alert>
      <v-row v-else>
        <v-col
          v-for="address in shippingAddresses"
          :key="address.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="mb-4" outlined>
            <v-card-title class="text-subtitle-1">
              <h3>
                {{ address.label }}
              </h3>
            </v-card-title>
            <v-card-text class="pb-0">
              <p>{{ address.street }}, {{ address.city }}</p>
              <p>{{ address.placeReference }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                icon="mdi-pencil"
                size="small"
                variant="text"
                @click="openEditAddressDialog(address)"
                title="Editar dirección"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                size="small"
                variant="text"
                @click="openDeleteAddressDialog(address)"
                title="Eliminar dirección"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-btn
        block
        size="large"
        color="primary"
        @click="openAddAddressDialog"
        prepend-icon="mdi-plus"
      >
        Agregar dirección
      </v-btn>
    </section>

    <!-- Bank Accounts Section -->
    <section class="bank-accounts mb-8">
      <div class="mb-4">
        <h2 class="text-h5">Cuentas bancarias</h2>
        <p>
          Para agilizar los pedidos agrega tu cuenta bancaria de donde envías
          las transferencias.
        </p>
      </div>
      <v-alert
        v-if="bankAccounts.length === 0"
        type="info"
        variant="tonal"
        class="mb-4"
      >
        No hay cuentas bancarias guardadas.
      </v-alert>
      <v-row v-else>
        <v-col
          v-for="account in bankAccounts"
          :key="account.id"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="mb-4" outlined>
            <v-card-title class="text-subtitle-1">{{
              account.bankName
            }}</v-card-title>
            <v-card-text class="pb-0">
              <p><strong>Holder:</strong> {{ account.accountHolderName }}</p>
              <p>
                <strong>Number:</strong> **** **** ****
                {{ account.accountNumber.slice(-4) }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                icon="mdi-pencil"
                size="small"
                variant="text"
                @click="openEditBankAccountDialog(account)"
                title="Edit Bank Account"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                size="small"
                variant="text"
                @click="openDeleteBankAccountDialog(account)"
                title="Delete Bank Account"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-btn
        block
        size="large"
        color="primary"
        @click="openAddBankAccountDialog"
        prepend-icon="mdi-plus"
      >
        Agregar cuenta bancaria
      </v-btn>
    </section>

    <!-- Add/Edit Shipping Address Dialog -->
    <v-dialog v-model="addressDialog" persistent max-width="600px" eager>
      <v-card class="elevation-6 rounded-lg">
        <v-card-title class="text-h6 bg-primary">{{
          (editingAddress && editingAddress.id ? "Editar" : "Agregar") +
          " dirección de envío"
        }}</v-card-title>
        <v-card-text class="pa-3">
          <v-form ref="addressFormRef" v-model="isAddressFormValid">
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentAddressFormData.label"
                    label="Nombre"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    rounded="lg"
                    placeholder="Casa, Trabajo, etc."
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="currentAddressFormData.street"
                    label="Dirección"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    rounded="lg"
                  />
                </v-col>
                <v-col cols="12" sm="6"
                  ><v-text-field
                    v-model="currentAddressFormData.city"
                    label="Ciudad"
                    :rules="[rules.required]"
                    required
                    rounded="lg"
                    variant="outlined"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="currentAddressFormData.neighborhood"
                    label="Barrio"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    rounded="lg"
                    hide-details
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="currentAddressFormData.placeReference"
                    label="Referencia"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    placeholder="Cerca de la estación de servicio, tocar el timbre no. 1..."
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeAddressDialog">Cancelar</v-btn>
          <v-btn
            color="secondary"
            variant="flat"
            :disabled="!isAddressFormValid"
            @click="saveShippingAddress"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Address Confirmation Dialog -->
    <v-dialog v-model="deleteAddressDialog" persistent max-width="450px">
      <v-card>
        <v-card-title class="text-h6">Confirmar</v-card-title>
        <v-card-text>
          <p>
            Estás a punto de eliminar esta dirección de envío. Esta acción no se
            puede deshacer.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDeleteAddressDialog">
            Cancelar
          </v-btn>
          <v-btn color="error" variant="flat" @click="confirmDeleteAddress"
            >Entiendo, eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add/Edit Bank Account Dialog -->
    <v-dialog v-model="bankAccountDialog" persistent max-width="600px" eager>
      <v-card>
        <v-card-title class="text-h6"
          >{{
            editingBankAccount && editingBankAccount.id ? "Editar" : "Agregar"
          }}
          cuenta bancaria</v-card-title
        >
        <v-card-text class="pt-4">
          <v-form ref="bankAccountFormRef" v-model="isBankAccountFormValid">
            <v-container>
              <v-row dense>
                <v-col cols="12"
                  ><v-autocomplete
                    v-model="currentBankAccountFormData.bankName"
                    label="Banco"
                    placeholder="Seleccione un banco"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    rounded="lg"
                    :items="bankList"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="8"
                  ><v-text-field
                    v-model="currentBankAccountFormData.accountHolderName"
                    label="Titular de la cuenta"
                    :rules="[rules.required]"
                    required
                    rounded="lg"
                    variant="outlined"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="4"
                  >
                  <v-text-field
                    v-model="currentBankAccountFormData.accountNumber"
                    label="Número de cuenta"
                    :rules="[rules.required, rules.accountNumber]"
                    required
                    rounded="lg"
                    variant="outlined"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeBankAccountDialog">Cancel</v-btn>
          <v-btn
            color="secondary"
            variant="elevated"
            :disabled="!isBankAccountFormValid"
            @click="saveBankAccount"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Bank Account Confirmation Dialog -->
    <v-dialog v-model="deleteBankAccountDialog" persistent max-width="450px">
      <v-card>
        <v-card-title class="text-h6">Confirmar</v-card-title>
        <v-card-text>
          <p>
            Estás a punto de eliminar esta cuenta bancaria. Esta acción no se
            puede deshacer.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDeleteBankAccountDialog"
            >Cancelar</v-btn
          >
          <v-btn color="error" variant="flat" @click="confirmDeleteBankAccount"
            >Sí, eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { ReactiveLocalStorage } from "@/persistence/ReactiveLocalStorage";
import { VForm } from "vuetify/components";

// --- Interfaces ---
interface Address {
  id: string;
  street: string;
  city: string;
  neighborhood: string;
  placeReference: string;
  label: string;
}
interface AddressFormData {
  id?: string;
  street: string;
  city: string;
  neighborhood: string;
  placeReference: string;
  label: string;
}
interface BankAccount {
  id: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
}
interface BankAccountFormData {
  id?: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
}

// --- Default Form States ---
const defaultAddressForm: AddressFormData = {
  street: "",
  city: "",
  neighborhood: "",
  placeReference: "",
  label: "",
};
const defaultBankAccountForm: BankAccountFormData = {
  bankName: "",
  accountHolderName: "",
  accountNumber: "",
  accountType: "",
};

export default defineComponent({
  name: "MyAccountView",
  setup() {
    // --- Local Storage Initialization ---
    const shippingAddressesStorage = new ReactiveLocalStorage<Address[]>(
      "shippingAddresses",
      []
    );
    const bankAccountsStorage = new ReactiveLocalStorage<BankAccount[]>(
      "bankAccounts",
      []
    );

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
    const currentAddressFormData = reactive<AddressFormData>({
      ...defaultAddressForm,
    });
    const currentBankAccountFormData = reactive<BankAccountFormData>({
      ...defaultBankAccountForm,
    });

    // --- Editing States ---
    const editingAddress = ref<Address | null>(null);
    const editingBankAccount = ref<BankAccount | null>(null);

    // --- Validation Rules ---
    const rules = {
      required: (value: string) => !!value || "El dato es requerido.",
      accountNumber: (value: string) =>
        /^\d+$/.test(value) || "Numero de cuenta no válido.",
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
        const index = shippingAddresses.value.findIndex(
          (addr) => addr.id === currentAddressFormData.id
        );
        if (index !== -1) {
          shippingAddresses.value = [
            ...shippingAddresses.value.slice(0, index),
            { ...currentAddressFormData } as Address,
            ...shippingAddresses.value.slice(index + 1),
          ];
        }
      } else {
        const newAddress: Address = {
          id: Date.now().toString(),
          ...currentAddressFormData,
        };
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
        shippingAddresses.value = shippingAddresses.value.filter(
          (addr) => addr.id !== addressToDelete.value!.id
        );
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
        const index = bankAccounts.value.findIndex(
          (acc) => acc.id === currentBankAccountFormData.id
        );
        if (index !== -1) {
          bankAccounts.value = [
            ...bankAccounts.value.slice(0, index),
            { ...currentBankAccountFormData } as BankAccount,
            ...bankAccounts.value.slice(index + 1),
          ];
        }
      } else {
        const newAccount: BankAccount = {
          id: Date.now().toString(),
          ...currentBankAccountFormData,
        };
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
        bankAccounts.value = bankAccounts.value.filter(
          (acc) => acc.id !== bankAccountToDelete.value!.id
        );
      }
      closeDeleteBankAccountDialog();
    };

    const bankList: string[] = [
      "Banco Nacional de Fomento (BNF)",
      "Banco Itaú Paraguay S.A.",
      "Banco Continental S.A.E.C.A.",
      "Sudameris Bank S.A.E.C.A.",
      "Banco Familiar S.A.E.C.A.",
      "Banco GNB Paraguay S.A.",
      "Banco Basa S.A.",
      "Ueno bank",
      "Banco Atlas S.A.",
      "Citibank N.A.",
      "Banco Rio S.A.E.C.A.",
      "Banco do Brasil S.A.",
      "Banco de la Nación Argentina",
    ];

    return {
      shippingAddresses,
      bankAccounts,
      bankList,
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
