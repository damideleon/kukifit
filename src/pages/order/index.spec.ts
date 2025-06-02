import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import OrderPage from './index.vue'; // The component to test
import { defineComponent, ref, computed, h } from 'vue';
import type { Address } from '@/data/model/Address';
import { vi } from 'vitest';

// --- Mocks ---

// Mock vue-router
const mockRouterPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock ReactiveLocalStorage
const mockShippingAddressesState = ref<Address[]>([]);
vi.mock('@/persistence/ReactiveLocalStorage', () => ({
  ReactiveLocalStorage: class {
    state: typeof mockShippingAddressesState;
    constructor(key: string, defaultState: any) {
      if (key === 'shippingAddresses') {
        this.state = mockShippingAddressesState;
      } else {
        this.state = ref(defaultState); // Default mock for other instances
      }
    }
  },
}));

// Mock CartStore
vi.mock('@/stores/CartStore', () => ({
  useCartStore: () => ({
    items: new Map(),
    total: 0,
    // Add any other properties/methods from CartStore that OrderPage might use
  }),
}));

// Mock Child Components
const ShippingAddressMock = defineComponent({
  name: 'ShippingAddress',
  props: ['address'],
  template: '<div data-testid="shipping-address-mock">Shipping Address Mock</div>',
});

const PaymentMethodSelectorMock = defineComponent({
  name: 'PaymentMethodSelector',
  props: ['paymentMethods', 'amount'],
  template: '<div data-testid="payment-method-selector-mock">Payment Method Selector Mock</div>',
});

// Vuetify stubs (basic)
const VContainer = defineComponent({ name: 'VContainer', template: '<div><slot /></div>' });
const VRow = defineComponent({ name: 'VRow', template: '<div><slot /></div>' });
const VCol = defineComponent({ name: 'VCol', template: '<div><slot /></div>' });
const VAlert = defineComponent({ name: 'VAlert', props: ['type', 'variant'], template: '<div><slot /></div>' });
const VList = defineComponent({ name: 'VList', template: '<div><slot /></div>' });
const VListItem = defineComponent({ name: 'VListItem', template: '<div><slot /></div>' });
const VDivider = defineComponent({ name: 'VDivider', template: '<hr />' });
const VSelect = defineComponent({ name: 'VSelect', template: '<select><slot /></select>' });
const VCard = defineComponent({ name: 'VCard', template: '<div><slot /></div>' });
const VCardItem = defineComponent({ name: 'VCardItem', template: '<div><slot /></div>' });
const VBtn = defineComponent({ name: 'VBtn', template: '<button><slot /></button>' });


describe('OrderPage (src/pages/order/index.vue)', () => {
  let wrapper: any;

  const globalMountOptions = {
    global: {
      components: {
        ShippingAddress: ShippingAddressMock,
        PaymentMethodSelector: PaymentMethodSelectorMock,
        VContainer,
        VRow,
        VCol,
        VAlert,
        VList,
        VListItem,
        VDivider,
        VSelect,
        VCard,
        VCardItem,
        VBtn,
      },
      stubs: {
        // Use stubs for any other Vuetify components if they appear and cause issues
        // 'v-icon': true, // Example
      }
    },
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockRouterPush.mockClear();
    // Reset the mock state for shippingAddresses before each test
    mockShippingAddressesState.value = []; 
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    if (wrapper) {
      wrapper.unmount();
    }
  });

  const sampleAddress: Address = {
    id: 'addr1',
    street: '123 Test St',
    city: 'Testville',
    neighborhood: 'Testwood',
    placeReference: 'Near the test park',
    label: 'Test Home',
    state: 'TS',
    zipCode: '12345',
    country: 'Testland',
  };

  it('displays ShippingAddress component when addresses are available', async () => {
    mockShippingAddressesState.value = [sampleAddress];
    wrapper = mount(OrderPage, globalMountOptions);
    await flushPromises(); // Wait for Vue to process updates

    expect(wrapper.findComponent(ShippingAddressMock).exists()).toBe(true);
    expect(wrapper.find('[data-testid="shipping-address-mock"]').exists()).toBe(true);
    const alert = wrapper.findComponent(VAlert);
    // Check if the "no address" alert specifically is NOT rendered
    // This requires a more specific selector if there are multiple alerts.
    // For now, assuming the relevant alert is the one tied to 'displayAddress' being null.
    // A more robust way would be to check the text of the alert.
    const noAddressAlert = wrapper.findAllComponents(VAlert).find(a => a.text().includes('No hay dirección de envío disponible'));
    expect(noAddressAlert).toBeUndefined();
  });

  it('displays "no address" message and triggers redirection when no addresses are available', async () => {
    mockShippingAddressesState.value = []; // Ensure no addresses
    wrapper = mount(OrderPage, globalMountOptions);
    await flushPromises();

    const alert = wrapper.findAllComponents(VAlert).find(a => a.text().includes('No hay dirección de envío disponible'));
    expect(alert?.exists()).toBe(true);
    expect(wrapper.findComponent(ShippingAddressMock).exists()).toBe(false);

    // Fast-forward timers
    vi.advanceTimersByTime(200); // Past the 100ms timeout in watchEffect
    await flushPromises();

    expect(mockRouterPush).toHaveBeenCalledWith('/account');
  });
  
  it('displayAddress computed property processes the first address correctly', async () => {
    const address2: Address = { ...sampleAddress, id: 'addr2', street: '789 Universe Ave' };
    mockShippingAddressesState.value = [sampleAddress, address2];
    wrapper = mount(OrderPage, globalMountOptions);
    await flushPromises();

    // Accessing computed property directly is harder in <script setup> from tests.
    // We test its effect: the props passed to ShippingAddressMock.
    const shippingAddressComponent = wrapper.findComponent(ShippingAddressMock);
    expect(shippingAddressComponent.exists()).toBe(true);
    const props = shippingAddressComponent.props('address');

    expect(props).toEqual({
      street: sampleAddress.street,
      city: sampleAddress.city,
      state: sampleAddress.state || 'N/A',
      zipCode: sampleAddress.zipCode || 'N/A',
      country: sampleAddress.country || 'Paraguay',
      label: sampleAddress.label,
      neighborhood: sampleAddress.neighborhood,
      placeReference: sampleAddress.placeReference,
    });
  });

  it('displayAddress computed property is null when no addresses are available', async () => {
    mockShippingAddressesState.value = [];
    wrapper = mount(OrderPage, globalMountOptions);
    await flushPromises();
    
    // In this case, ShippingAddressMock should not be rendered.
    // The computed `displayAddress` would be null.
    // We can infer this by checking that ShippingAddressMock is not there,
    // and the alert is shown.
    expect(wrapper.findComponent(ShippingAddressMock).exists()).toBe(false);
    const alert = wrapper.findAllComponents(VAlert).find(a => a.text().includes('No hay dirección de envío disponible'));
    expect(alert?.exists()).toBe(true);

    // To be more direct (if possible, depends on how setup script exposes things, usually not directly):
    // if (wrapper.vm.displayAddress !== undefined) { // This usually doesn't work with <script setup>
    //   expect(wrapper.vm.displayAddress).toBeNull();
    // }
  });
});
