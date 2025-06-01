<template>
  <div class="electronic-wallet-payment">
    <v-radio-group
      v-model="formData.selectedWallet"
    >
      <template v-for="(account, index) in method.accounts" :key="index">
        <v-radio :value="account.number">
          <template v-slot:label>
            <div>
              <strong>{{ account.label }}</strong
              ><br />
              Número: {{ account.number }}
            </div>
          </template>
        </v-radio>
        <v-divider
          v-if="index < method.accounts.length - 1"
          class="my-2"
        ></v-divider>
      </template>
    </v-radio-group>

    <v-file-input
      v-model="formData.receipt"
      label="Comprobante de pago"
      prepend-icon="mdi-paperclip"
      class="mt-4"
    ></v-file-input>


  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  PaymentMethodName,
  type ElectronicWalletPaymentMethod,
} from "@/data/model/Payment";

defineProps<{
  method: ElectronicWalletPaymentMethod;
}>();


const formData = ref({
  selectedWallet: null,
  receipt: null,
});

</script>
