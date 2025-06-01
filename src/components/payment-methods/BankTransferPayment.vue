<template>
  <div class="card-payment">

    <v-alert icon="mdi-information" color="grey" variant="elevated" class="mb-3">
      Para agilizar tu compra te proporcinamos los datos de nuestra cuenta bancaria, no te olvides adjuntar el comprobante de transferencia
    </v-alert>


    <p>{{ method.fields.label }}</p>
    <v-select
      :items="accounts"
      item-value="value"
      item-title="label"
      variant="outlined"
      rounded="lg"
      v-model="selectedAccount"
    ></v-select>
    <template
      v-for="field in method.fields.accounts.filter(
        (a) => a.number === selectedAccount
      )"
      :key="field.number"
    >
      <h4>Titular de la cuenta</h4>
      <CopyableTextField
        :value="field.label"
        success-message="Titular de cuenta copiado"
      />

      <h4>Número de cuenta</h4>
      <CopyableTextField
        :value="field.number"
        success-message="Número de cuenta copiado"
      />

      <h4>Documento</h4>
      <CopyableTextField
        :value="field.document.number"
        :prefix="field.document.type.toLocaleUpperCase()"
        success-message="Número de documento copiado"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { BankTransferPaymentMethod } from "@/data/model/Payment";
import CopyableTextField from "../inputs/CopyableTextField.vue";

const props = defineProps<{
  method: BankTransferPaymentMethod;
}>();

const accounts = computed(() => {
  return props.method.fields.accounts.map((a) => {
    return {
      label: a.bank + " - " + a.label,
      value: a.number,
    };
  });
});

function writeToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

const selectedAccount = ref(accounts.value[0].value);
</script>
