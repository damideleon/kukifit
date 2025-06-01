
<template>
  <div class="cash-payment">
    <p class="font-weight-bold">Pagas en efectivo al recibir el pedido.</p>
    <h4>Llevar vuelto de: <small>Dejar en 0 si tenes justito</small></h4>
    <v-text-field
      rounded="lg"
      variant="outlined"
      inputmode="numeric"
      @update:model-value="handleUpdate"
      :model-value="changeAmount"
    ></v-text-field>
  </div>
</template>
<script setup lang="ts">
import type { CashPaymentMethod } from "@/data/model/Payment";

defineProps<{
  method: CashPaymentMethod;
}>();

const changeAmount = ref('0');

function handleUpdate(value: string) {
  if (value === "") value = "0";
  const cleanValue = value.replace(/[^0-9]/g, "");

  if (cleanValue === "") {
    changeAmount.value = "0";
    return;
  }

  changeAmount.value = parseInt(cleanValue).toLocaleString();
}

</script>
