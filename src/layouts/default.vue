<template>
  <v-app-bar color="primary" class="elevation-0" height="80">
    <template #append>
      <v-menu v-model="showCart">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-badge
              :model-value="items.size > 0"
              dot
              color="red-lighten-2"
              offset-y="2"
            >
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card min-width="20rem" class="pa-0 elevation-4 rounded-lg">
          <!-- <pre>{{ items }}</pre> -->
          <div class="pa-2 bg-primary">
            <h3 class="px-3">Lista de compra</h3>
          </div>
          <v-card-text style="max-height: 15rem; overflow-y: auto" class="pa-0">
            <template v-for="[id, item] in items" :key="item.id">
              <v-card-item :id="'cart-item-' + id" class="pa-3">
                <template #prepend>
                  {{ item.quantity }}
                </template>
                <template #append>
                  <p class="text-end">
                    {{ item.price.amount.toLocaleString() }}
                  </p>
                </template>
                <h4>{{ item.name }}</h4>
              </v-card-item>
            </template>
          </v-card-text>
          <v-card-item class="pa-3">
            <template #append>
              <p class="text-end">
                {{ total.toLocaleString() }}
              </p>
            </template>
            <h4>Total</h4>
          </v-card-item>
          <v-card-item class="pa-3">
            <v-btn
              color="secondary"
              block
              class="rounded-lg font-weight-bold"
              @click="route.push('/order')"
            >
              Ir al carrito
            </v-btn>
          </v-card-item>
        </v-card>
      </v-menu>
      <v-menu>
        <template #activator="{ props }">
          <v-app-bar-nav-icon v-bind="props" />
        </template>

        <v-list>
          <v-list-item prepend-icon="mdi-account" @click="route.push('/account')">Mi cuenta</v-list-item>
          <v-list-item prepend-icon="mdi-history">
            Pedidos realizados
            </v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item prepend-icon="mdi-logout">Cerrar sesión</v-list-item>
        </v-list>
      </v-menu>
    </template>
    <template #prepend>
      <template v-if="route.currentRoute.value.name === '/'">
        <v-img
          alt="Kukifit Logo"
          src="@/assets/kukifit-logo.png"
          width="7rem"
          :cover="false"
          class="ms-3"
        />
      </template>
      <template v-else>
        <v-btn icon @click="route.back()"
          ><v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
    </template>
    <h3 class="text-uppercase d-none d-md-inline font-weight-bold">
      Sabor y Bienestar
    </h3>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>
  <AppFooter />
</template>

<script lang="ts" setup>
import { useCartStore } from "@/stores/CartStore";

const route = useRouter();

const { items, total } = storeToRefs(useCartStore());


const showCart = ref(false);

watch(() => items.value.size, () => {

  showCart.value = true;

  setTimeout(() => {
    showCart.value = false;
  }, 3000);

});
</script>
