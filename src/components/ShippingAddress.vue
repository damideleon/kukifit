<template>
  <div class="shipping-address pa-4 rounded-lg" :class="{ 'elevation-2': !!address }" v-if="address">
    <h2 class="text-h6 mb-3">Dirección de Envío</h2>
    <div class="address-details">
      <p v-if="address.label"><strong>Referencia:</strong> {{ address.label }}</p>
      <p><strong>Dirección:</strong> {{ address.street }}</p>
      <p v-if="address.neighborhood"><strong>Barrio:</strong> {{ address.neighborhood }}</p>
      <p><strong>Ciudad:</strong> {{ address.city }}</p>
      <p v-if="address.state"><strong>Provincia/Estado:</strong> {{ address.state }}</p>
      <p v-if="address.zipCode"><strong>Código Postal:</strong> {{ address.zipCode }}</p>
      <p v-if="address.country"><strong>País:</strong> {{ address.country }}</p>
      <p v-if="address.placeReference" class="text-caption mt-2"><em>Nota: {{ address.placeReference }}</em></p>
    </div>
    <v-btn @click="goToMyAccount" color="primary" variant="text" small class="mt-4">
      Gestionar Direcciones
      <v-icon end icon="mdi-pencil"></v-icon>
    </v-btn>
  </div>
  <div v-else class="shipping-address-null pa-4 text-center border rounded-lg">
    <p class="mb-3 text-grey-darken-1">No se ha proporcionado una dirección.</p>
    <v-btn @click="goToMyAccount" color="primary" variant="outlined" small>
      Ir a Mi Cuenta
      <v-icon end icon="mdi-account-arrow-right"></v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Address } from '@/data/model/Address'; // Import the Address type

export default defineComponent({
  name: 'ShippingAddress',
  props: {
    address: {
      type: Object as PropType<Address | null>,
      required: true,
    },
  },
  methods: {
    goToMyAccount() {
      // This would typically navigate to the MyAccount page
      // For now, it can just log a message or be a placeholder
      console.log('Navigate to MyAccount page for address:', this.address ? this.address.id : 'N/A');
      // Example navigation (if using Vue Router):
      // if (this.$router) { this.$router.push({ name: 'MyAccount' }); }
    },
  },
});
</script>

<style scoped>
/* Using Vuetify classes for padding, border, and elevation mostly. */
.shipping-address {
  margin-bottom: 16px;
}
.shipping-address-null {
  /* border-color: #ddd; Using Vuetify 'border' class */
}
.address-details p {
  margin: 6px 0; 
  font-size: 0.95rem;
}
.address-details p strong {
  font-weight: 500; /* Vuetify might handle this, but explicit is fine */
}
.text-caption { /* Applied to placeReference */
  font-size: 0.8rem;
  color: #555; /* Softer color for caption */
}
.text-grey-darken-1 { /* For null state message */
  color: #757575; /* Example Vuetify color */
}
.mb-3 { margin-bottom: 1rem !important; } /* Vuetify spacing */
.mt-4 { margin-top: 1.5rem !important; } /* Vuetify spacing */
.mt-2 { margin-top: 0.5rem !important; } /* Vuetify spacing */
</style>
