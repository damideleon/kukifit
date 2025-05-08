<template>
  <ProductsCarrousel style="max-width: 70rem;" class="mt-3 mx-auto" :items="products" @click="goToProduct"  @add-item="addItem"/>
  <div class="ps-3 ps-md-6">
    <v-divider class="my-4" thickness="2" color="secondary"></v-divider>
    <h3>Más ofertas</h3>
  </div>

  <v-chip-group
    mandatory
    color="secondary"
    variant="elevated"
    base-color="grey-lighten-2"
    v-model="selectedCategory"
    class="ps-3 ps-md-6"
  >
    <v-chip
      v-for="[category, name] in categories"
      :key="category"
      :value="category"
    >
      <div class="text-center text-uppercase d-block" style="min-width: 8rem">
        {{ name }}
      </div>
    </v-chip>
  </v-chip-group>
  <HorizontalScroll class="mt-3 ps-3 ps-md-6">
    <template v-for="item in products" :key="item.id">
      <v-card width="16rem" elevation="0">
        <v-img
          class="rounded-xl d-flex flex-column align-end justify-end pa-3"
          height="18rem"
          cover
          :src="item.images[0]"
        >
          <v-btn
            :icon="favItems.has(item.id) ? 'mdi-heart' : 'mdi-heart-outline'"
            color="white"
            variant="text"
            size="large"
            @click="toggleFav(item.id)"
          />
        </v-img>
        <v-card-text>
          <h2>{{ item.title }}</h2>
          <h3>
            {{ item.price.symbol }} {{ item.price.amount.toLocaleString() }}
          </h3>
          <p class="text-truncate">
            {{ item.description }}
          </p>
        </v-card-text>
      </v-card>
    </template>
  </HorizontalScroll>
</template>
<script lang="ts" setup>

import products from "@/data/mocked/KukifitItems";
import type { ProductItem } from "@/data/model/ProductItem";
import { useCartStore } from "@/stores/CartStore";

enum Category {
  ALL = "all",
  GLUTEN_FREE = "gluten-free",
  SUGAR_FREE = "sugar-free",
  KETO = "keto",
}

const selectedCategory = ref(Category.ALL);

const favItems = new Set<string>();

const categories = [
  [Category.ALL, "Todos"],
  [Category.GLUTEN_FREE, "Sin gluten"],
  [Category.SUGAR_FREE, "Sin azúcar"],
  [Category.KETO, "Keto"],
];

function toggleFav(id: string) {
  if (favItems.has(id)) {
    favItems.delete(id);
  } else {
    favItems.add(id);
  }
}

const router = useRouter();

function goToProduct(id: string) {
  router.push("/products/:id".replace(":id", id));
}

function addItem(id: ProductItem) {
  useCartStore().setItem(id, 1);
}

</script>
