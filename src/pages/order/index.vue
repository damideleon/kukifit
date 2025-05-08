<template>
  <v-container class="pa-3">
    <h1>Pedido nuevo</h1>
    <h2>Productos</h2>
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
    <v-card color="secondary" class="pa-0 rounded-lg" v-if="orderDeliverySelection === 'pickup'">
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
    <v-card color="primary" class="pa-0 rounded-lg" v-if="orderDeliverySelection === 'delivery'">
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
  </v-container>
</template>

<script lang="ts" setup>
import { useCartStore } from "@/stores/CartStore";

const orderDeliverySelection = ref("delivery");

const router = useRouter();

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

const order = useCartStore();
</script>
