<template>
  <div>
    <v-window v-model="currentItem" continuous>
      <template v-for="item in items" :key="item.id">
        <v-window-item :value="item.id" @click="onclick(item.id)">
          <div class="px-3">

            <v-card class="elevation-0">
              <div class="d-flex align-center">
                <div class="pa-3 d-none d-md-block" style="width: clamp(200px, 20vw, 800px)">
                  <h1>{{ item.title }}</h1>
                  <h3>
                    {{ item.price.currency }}
                    {{ item.price.amount.toLocaleString() }}
                  </h3>
                  <p class="mb-3" style="text-wrap: balance">
                    {{ item.description }}
                  </p>
                  <v-btn color="secondary" size="large" class="rounded-lg" @click.stop="addItem(item)">
                    <span class="text-white" > Quiero </span>
                  </v-btn>
                </div>
                <div class="flex-grow-1">
                  <v-img
                  class="bg-grey-lighten-4"
                  style="height: clamp(400px, 10vw, 500px)"
                  rounded="xl"
                  cover
                  :src="item.images[0]"
                  />
                </div>
              </div>
            </v-card>
          </div>
        </v-window-item>
      </template>
    </v-window>
    <div class="pa-3 d-block d-md-none" v-if="current">
      <h1 class="text-truncate">{{ current.title }}</h1>
      <h3>
        {{ current.price.currency }}
        {{ current.price.amount.toLocaleString() }}
      </h3>
      <p class="mb-3 text-truncate">{{ current.description }}</p>
      <v-btn color="secondary" size="large" class="rounded-lg" @click.stop="addItem(current)">
        <span class="text-white"> Quiero </span>
      </v-btn>
    </div>
    <div class="d-flex justify-center mt-3">
      <v-btn
        v-for="item in items"
        :key="item.id"
        :value="item.id"
        @click="currentItem = item.id"
        :color="currentItem === item.id ? 'primary' : 'grey-lighten-3'"
        size="x-small"
        class="mx-2 rounded-pill"
      >
      </v-btn>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ProductItem } from "@/data/model/ProductItem";

const currentItem = defineModel({
  type: String,
  required: false,
});

const emit = defineEmits<{
  click: [id: string];
  addItem: [item: ProductItem];
}>();

function onclick(id: string) {
  emit("click", id);
}

function addItem(item: ProductItem) {
  emit("addItem", item);
}

const props = defineProps({
  items: {
    type: Array as PropType<ProductItem[]>,
    required: false,
    default: () => [],
  },
});

const current = computed(() => {
  if (!currentItem.value) return undefined;
  return props.items.find((item) => item.id === currentItem.value);
});

</script>
