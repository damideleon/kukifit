<template>
  <div class="pa-3">
    <v-row>
      <v-col cols="12" md="5">
        <v-card class="elevation-0">
          <v-img
            style="aspect-ratio: 4/3"
            class="rounded-xl"
            :src="product?.images[0]"
            cover
            max-height="900"
          />
        </v-card>
      </v-col>
      <v-col cols="12" md="7">
            <h3>{{ product?.subtitle }}</h3>
            <h1>{{ product?.title }}</h1>
            <h2>
              {{ product?.price.symbol }}
              {{ product?.price.amount.toLocaleString() }}
            </h2>
            <p>{{ product?.description }}</p>
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
                  {{
                    ((product?.price.amount ?? 0) * quantity).toLocaleString()
                  }}
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
          <v-snackbar
            v-model="onAdded"
            color="primary"
            location="top right"
            timeout="3000"
            vertical
          >
            <p>
              Se {{ quantity > 1 ? "agregaron" : "agregó" }} {{ quantity }}
              <b>{{ product?.title }}</b> al carrito
            </p>
          </v-snackbar>
          <pre v-if="false">{{ product }}</pre>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import KukifitInventory from "@/data/mocked/KukifitItems";
import type { ProductItem } from "@/data/model/ProductItem";
import { useCartStore } from "@/stores/CartStore";

const route = useRoute("/products/[id]");
const id = route.params.id;
const inventoryMap = new Map<string, ProductItem>(
  KukifitInventory.map((item) => [item.id, item])
);
const product = computed(() => inventoryMap.get(id));

const quantity = ref(1);

const cart = useCartStore();

const onAdded = ref(false);

function onWant() {
  if (!product.value) return;
  cart.setItem(product.value!, quantity.value);
  onAdded.value = true;
}
</script>
