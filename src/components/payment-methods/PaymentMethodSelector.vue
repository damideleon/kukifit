<template>
  <div class="payment-method-selector">
    <h2>¿Cómo preferís pagar?</h2>
    <v-select
      :items="paymentMethods"
      v-model="selectedMethod"
      item-value="name"
      item-title="description"
      variant="outlined"
      placeholder="Seleccionar método de pago"
      rounded="lg"
      :menu-props="{ maxHeight: '400' }"
    >
      <template #item="{ props: itemProps, item }">
        <v-list-item v-bind="itemProps">
          <template #prepend>
            <v-icon :icon="item.raw.icon" class="mr-3"></v-icon>
          </template>
        </v-list-item>
      </template>
    </v-select>

    <div v-if="selectedMethod" class="ps-3 border-s-md mt-4">
      <CashPayment v-if="cashPayMethod" :method="cashPayMethod" />
      <BankTransferPayment
        v-if="bankTransferPayMethod"
        :method="bankTransferPayMethod"
      />
      <ElectronicWalletPayment
        v-if="electronicWalletPayMethod"
        :method="electronicWalletPayMethod"
      />

      <h4>Monto total</h4>
      <CopyableTextField
        :display-value="displayAmount"
        :value="amount.toString()"
        success-message="Monto total copiado"
      />
    </div>
    <v-btn size="large" color="secondary" block class="mt-4" @click="confirmPayment">
      {{ selectedMethod === PaymentMethodName.CASH ? "Confirmar pedido" : "Adjuntar comprobante" }}
    </v-btn>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import {
  PaymentMethodName,
  type BankTransferPaymentMethod,
  type CashPaymentMethod,
  type ElectronicWalletPaymentMethod,
  type PaymentMethod,
  type QRPaymentMethod,
} from "@/data/model/Payment";
import CashPayment from "./CashPayment.vue";
import ElectronicWalletPayment from "./ElectronicWalletPayment.vue";
import CopyableTextField from "../inputs/CopyableTextField.vue";

const props = defineProps<{
  paymentMethods: PaymentMethod[];
  amount: number;
}>();

const emit = defineEmits<{
  (e: "payment-confirmed", method: string, data: any): void;
  (e: "payment-data-updated", method: string, data: any): void;
}>();

const selectedMethod = ref<string | null>(PaymentMethodName.CASH);
const formData = ref<Record<string, any>>({});

const currentMethod = computed(() => {
  return props.paymentMethods.find((m) => m.name === selectedMethod.value);
});

const cashPayMethod = computed(() => {
  if (selectedMethod.value !== "cash") return undefined;
  return currentMethod.value as CashPaymentMethod;
});

const bankTransferPayMethod = computed(() => {
  if (selectedMethod.value !== PaymentMethodName.BANK_TRANSFER)
    return undefined;
  return currentMethod.value as BankTransferPaymentMethod;
});

const qrPayMethod = computed(() => {
  if (selectedMethod.value !== "qr") return undefined;
  return currentMethod.value as QRPaymentMethod;
});

const electronicWalletPayMethod = computed(() => {
  if (selectedMethod.value !== "electronic-wallet") return undefined;
  return currentMethod.value as ElectronicWalletPaymentMethod;
});

const displayAmount = computed(() => {
  return props.amount.toLocaleString();
});


function confirmPayment() {
  console.log("confirmPayment", selectedMethod.value);
}


</script>

<style scoped>
.border-s-md {
  border-left: 3px solid rgba(0, 0, 0, 0.12);
  padding-left: 16px;
}
</style>
