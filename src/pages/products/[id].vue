<template>
  <v-card class="pa-3 elevation-0">
    <v-img
      style="aspect-ratio: 16/9"
      class="rounded-xl"
      :src="product?.images[0]"
      cover
      max-height="900"
    />
    <v-card-item>
      <h3>{{ product?.subtitle }}</h3>
      <h1>{{ product?.title }}</h1>
      <h2>
        {{ product?.price.symbol }} {{ product?.price.amount.toLocaleString() }}
      </h2>
      <p>{{ product?.description }}</p>
    </v-card-item>
    <v-card-item>
      <div class="d-flex align-center ga-3">
        <div class="flex-shrink-1" style="min-width: 8rem">
          <label for="quantity">
            <h4>Cantidad</h4>
          </label>

          <v-number-input
            control-variant="stacked"
            variant="outlined"
            hide-details
            :min="1"
            :max="10"
            v-model="quantity"
            rounded="lg"
            name="quantity"
            id="quantity"
          />
        </div>

        <div class="flex-grow-1 text-end">
          <label for="total">
            <h4>Total</h4>
          </label>
          <h2>
            {{ ((product?.price.amount ?? 0) * quantity).toLocaleString() }}
            {{ product?.price.symbol }}
          </h2>
        </div>
      </div>
      <v-btn
        color="secondary"
        size="large"
        height="56"
        class="font-weight-bold rounded-lg mt-3"
        block
        @click="onWant"
        >Quiero</v-btn
      >
    </v-card-item>
    <pre v-if="false">{{ product }}</pre>
  </v-card>
</template>
<script lang="ts" setup>
import type { RouteLocationNormalized } from "vue-router";
import type { RouteNamedMap } from "vue-router/auto-routes";
import KukifitInvetory from "@/data/mocked/KukifitItems";
import type { ProductItem } from "@/data/model/ProductItem";
import { useCartStore } from "@/stores/CartStore";

const route = useRoute("/products/[id]");
const id = route.params.id;
const inventoryMap = new Map<string, ProductItem>(
  KukifitInvetory.map((item) => [item.id, item])
);
const product = computed(() => inventoryMap.get(id));

const quantity = ref(1);


const cart = useCartStore();


function onWant() {
  if(!product.value) return;
  cart.setItem(product.value!, quantity.value);
}
</script>
