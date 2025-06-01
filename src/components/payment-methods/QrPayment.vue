
<template>
  <div class="qr-payment">
    <p>{{ method.fields.label }}</p>

    <v-btn
      color="primary"
      class="mt-4"
    >
      {{ method.action.label }}
    </v-btn>

    <!-- Espacio para mostrar el QR cuando se implemente -->
    <div v-if="false" class="qr-container mt-4 text-center">
      <v-icon icon="mdi-qrcode" size="128"></v-icon>
      <p class="mt-2">Escanea este código para completar el pago</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { QRPaymentMethod } from "@/data/model/Payment";

defineProps<{
  method: QRPaymentMethod;
}>();

</script>
