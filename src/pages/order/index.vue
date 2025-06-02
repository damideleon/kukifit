<template>
  <v-container class="pa-3">
    <h1>Pedido nuevo</h1>

    <!-- Shipping Address Section -->
    <h2 class="mt-6 mb-2">Dirección de Envío</h2>
    <ShippingAddress v-if="displayAddress" :address="displayAddress" />
    <v-alert v-else type="info" variant="tonal" class="mb-4">
      No hay dirección de envío disponible. Por favor, agregue una en "Mi Cuenta".
    </v-alert>

    <h2 class="mt-6">Productos</h2>
    <v-list class="pa-0">
      <template v-for="[id, item] in order.items" :key="id">
        <v-divider></v-divider>
        <v-list-item class="pa-3" @click="router.push('/products/' + item.id)">
          <template #prepend>
            <div style="width: 2rem">
              {{ item.quantity }}
            </div>
          </template>
          {{ item.name }}
          <template #append>
            <p class="text-end">
              {{ item.price.amount.toLocaleString() }}
            </p>
          </template>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <v-list-item class="pa-3">
        <p>Sub Total en productos</p>
        <template #append>
          <h4 class="text-end font-weight-bold">
            {{ order.total.toLocaleString() }}
          </h4>
        </template>
      </v-list-item>
    </v-list>

    <h2>Modo de entrega</h2>
    <v-select
      :items="orderDeliveryModes"
      v-model="orderDeliverySelection"
      item-value="name"
      item-title="description"
      variant="outlined"
      placeholder="Seleccionar modo de entrega"
      rounded="lg"
    >
    </v-select>
    <v-card
      color="secondary"
      class="pa-0 rounded-lg"
      v-if="orderDeliverySelection === 'pickup'"
    >
      <v-card-item class="pa-3">
        <h3 class="font-weight-bold">Kukifit (Casa matriz)</h3>
        <p>Dirección: Calle #123, Capiatá, Paraguay</p>
      </v-card-item>
      <v-card-item>
        <div class="text-end font-weight-bold">
          <p>Total: GRATIS</p>
        </div>
      </v-card-item>
    </v-card>
    <v-card
      color="primary"
      class="pa-0 rounded-lg mb-3"
      v-if="orderDeliverySelection === 'delivery'"
    >
      <v-card-item class="pa-3">
        <template #append>
          <v-btn icon variant="text">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <h3 class="font-weight-bold">Mi casa</h3>
        <p>Dirección: Calle #123, Capiatá, Paraguay</p>
      </v-card-item>
      <v-card-item>
        <div class="text-end font-weight-bold">
          <p>Total: {{ (20_000).toLocaleString() }}</p>
        </div>
      </v-card-item>
    </v-card>

    <PaymentMethodSelector
      :payment-methods="paymentMethods"
      :amount="order.total"
    ></PaymentMethodSelector>

    <!-- <h2>Como preferís pagar?</h2>
    <v-select
      :items="payMethods"
      v-model="payMethodSelection"
      item-value="name"
      item-title="description"
      variant="outlined"
      placeholder="Seleccionar modo de entrega"
      rounded="lg"
    >
    </v-select>
    <div v-if="payMethodSelection === 'cash'" class="ps-3 border-s-md">
      <p>Pagas en efectivo al recibir el pedido.</p>
      <h4>Llevar vuelto de: <small>Dejar en 0 si tenes justito</small></h4>
      <v-text-field
        variant="outlined"
        inputmode="numeric"
        :model-value="moneySubmit"
        @update:model-value="onUpdateMoney"
        pattern="[0-9]*"
      ></v-text-field>
    </div> -->
  </v-container>
</template>

<script lang="ts" setup>
import PaymentMethodSelector from "@/components/payment-methods/PaymentMethodSelector.vue";
import {
  PaymentMethodName,
  type BankTransferPaymentMethod,
  type CashPaymentMethod,
} from "@/data/model/Payment";



import { useCartStore } from "@/stores/CartStore";
import { computed, watchEffect, ref } from "vue"; // Added watchEffect and ref (ref already present)
import ShippingAddress from "@/components/ShippingAddress.vue"; // Added ShippingAddress component
import { ReactiveLocalStorage } from "@/persistence/ReactiveLocalStorage"; // Added ReactiveLocalStorage
import { useRouter } from "vue-router"; // Ensure useRouter is explicitly imported for clarity
import type { Address } from "@/data/model/Address"; // Import the Address interface


// Define the Address interface (copied from MyAccountView.vue for now)
// interface Address { // Removed local definition
//   id: string;
//   street: string;
//   city: string;
//   state?: string; 
//   zipCode?: string; 
//   country?: string; 
//   neighborhood: string; 
//   placeReference: string; 
//   label: string; 
// }

const orderDeliverySelection = ref("delivery");
const payMethodSelection = ref("cash");

const router = useRouter(); // Instance already created

const orderDeliveryModes = [
  {
    name: "delivery",
    description: "Delivery a domicilio",
    icon: "mdi-truck-delivery",
  },
  {
    name: "pickup",
    description: "Retiro en tienda",
    icon: "mdi-store",
  },
];

const cashPaymentMethod: CashPaymentMethod = {
  name: PaymentMethodName.CASH,
  description: "Pago en efectivo al recibir",
  icon: "mdi-cash",
  fields: [
    {
      name: "amount",
      label: "Monto a pagar",
      readonly: true,
      type: "numeric",
      format: "money",
    },
    {
      name: "change",
      label: "Llevar vuelto de",
      type: "numeric",
      format: "money",
      hint: "Indica el monto con el que pagarás para calcular tu vuelto",
      readonly: false,
    },
  ],
  action: {
    type: "confirm",
    label: "Confirmar pago en efectivo",
  },
};

const bankAccountPaymentMethod: BankTransferPaymentMethod = {
  name: PaymentMethodName.BANK_TRANSFER,
  description: "Transferencia bancaria",
  icon: "mdi-bank-transfer",
  fields: {
    type: "bank-accounts",
    label: "Selecciona la cuenta bancaria",
    hint: "Realiza la transferencia y adjunta el comprobante",
    accounts: [
      {
        label: "Jazmín Vidal",
        number: "619115076",
        bank: "Ueno Bank",
        document: {
          type: "ci",
          number: "4467531",
        },
      },
      {
        label: "Damian De León",
        number: "619115067",
        bank: "Ueno Bank",
        document: {
          type: "ci",
          number: "4097105",
        },
      },
    ],
  },
  action: {
    type: "add-file-confirm",
    label: "Adjuntar comprobante y confirmar",
  },
};

const paymentMethods = [cashPaymentMethod, bankAccountPaymentMethod];

const moneySubmit = ref("0");
// const moneyDisplay = ref("0"); // moneyDisplay seems unused, commented out. If needed, please uncomment.
function onUpdateMoney(value: string) {
  const cleanValue = value.replace(/[^0-9]/g, "");
  if (cleanValue === "") {
    moneySubmit.value = "0";
    return;
  }

  moneySubmit.value = parseInt(cleanValue).toLocaleString();
}

const order = useCartStore();

// Shipping Address Logic
const shippingAddressesStorage = new ReactiveLocalStorage<Address[]>(
  "shippingAddresses",
  []
);
const shippingAddresses = shippingAddressesStorage.state;

const displayAddress = computed(() => {
  if (shippingAddresses.value && shippingAddresses.value.length > 0) {
    const firstAddress = shippingAddresses.value[0];
    // Map data to what ShippingAddress.vue component expects.
    const firstAddressTyped = firstAddress as Address; // Ensure type for autocompletion
    return {
      street: firstAddressTyped.street,
      city: firstAddressTyped.city,
      state: firstAddressTyped.state || 'N/A', 
      zipCode: firstAddressTyped.zipCode || 'N/A', 
      country: firstAddressTyped.country || 'Paraguay', 
      label: firstAddressTyped.label, // Pass label
      neighborhood: firstAddressTyped.neighborhood, // Pass neighborhood
      placeReference: firstAddressTyped.placeReference, // Pass placeReference
    };
  }
  return null;
});

// Watch for changes in shipping addresses and redirect if none are available
watchEffect(() => {
  // Check if shippingAddresses has been initialized and is empty
  // ReactiveLocalStorage initializes with default [] if nothing is in localStorage
  if (shippingAddresses.value && shippingAddresses.value.length === 0) {
    // Small delay to allow UI to update before redirecting, preventing flash of "no address" message
    // This might not be strictly necessary depending on UX preference
    setTimeout(() => {
        if (shippingAddresses.value.length === 0) { // Double check after timeout
            router.push('/account'); 
        }
    }, 100); // 100ms delay, adjust as needed or remove
  }
});

</script>
