import { mount } from '@vue/test-utils';
import ShippingAddress from './ShippingAddress.vue';
import { defineComponent } from 'vue';
import type { Address } from '@/data/model/Address';

// Vuetify basic stub for v-btn and v-icon to prevent console warnings
const VBtn = defineComponent({
  name: 'VBtn',
  template: '<button @click="$emit(\'click\', $event)"><slot /></button>',
});

const VIcon = defineComponent({
  name: 'VIcon',
  template: '<i><slot /></i>',
});

const globalPlugins = {
  components: {
    VBtn,
    VIcon,
  },
};

describe('ShippingAddress.vue', () => {
  const baseAddress: Address = {
    id: '1',
    street: '123 Main St',
    city: 'Anytown',
    neighborhood: 'Downtown',
    placeReference: 'Blue door',
    label: 'Home',
    state: 'CA',
    zipCode: '90210',
    country: 'USA',
  };

  it('renders all address details when provided', () => {
    const wrapper = mount(ShippingAddress, {
      props: { address: baseAddress },
      global: { plugins: [globalPlugins] },
    });

    expect(wrapper.text()).toContain('Dirección de Envío');
    expect(wrapper.text()).toContain('Referencia: Home');
    expect(wrapper.text()).toContain('Dirección: 123 Main St');
    expect(wrapper.text()).toContain('Barrio: Downtown');
    expect(wrapper.text()).toContain('Ciudad: Anytown');
    expect(wrapper.text()).toContain('Provincia/Estado: CA');
    expect(wrapper.text()).toContain('Código Postal: 90210');
    expect(wrapper.text()).toContain('País: USA');
    expect(wrapper.text()).toContain('Nota: Blue door');
  });

  it('renders manage addresses button when address is provided', () => {
    const wrapper = mount(ShippingAddress, {
      props: { address: baseAddress },
      global: { plugins: [globalPlugins] },
    });
    const button = wrapper.find('button'); // Finds v-btn
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('Gestionar Direcciones');
  });

  it('handles missing optional address details gracefully', () => {
    const partialAddress: Address = {
      id: '2',
      street: '456 Oak Ave',
      city: 'Otherville',
      // Missing: neighborhood, placeReference, label, state, zipCode, country
    };
    const wrapper = mount(ShippingAddress, {
      props: { address: partialAddress },
      global: { plugins: [globalPlugins] },
    });

    expect(wrapper.text()).toContain('Dirección: 456 Oak Ave');
    expect(wrapper.text()).toContain('Ciudad: Otherville');

    expect(wrapper.text()).not.toContain('Referencia:');
    expect(wrapper.text()).not.toContain('Barrio:');
    expect(wrapper.text()).not.toContain('Provincia/Estado:');
    expect(wrapper.text()).not.toContain('Código Postal:');
    expect(wrapper.text()).not.toContain('País:');
    expect(wrapper.text()).not.toContain('Nota:');
  });
  
  it('renders correctly when address prop is null', () => {
    const wrapper = mount(ShippingAddress, {
      props: { address: null },
      global: { plugins: [globalPlugins] },
    });

    expect(wrapper.text()).toContain('No se ha proporcionado una dirección.');
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('Ir a Mi Cuenta');
  });

  it('emits goToMyAccount method when button is clicked (address provided)', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const wrapper = mount(ShippingAddress, {
      props: { address: baseAddress },
      global: { plugins: [globalPlugins] },
    });

    const button = wrapper.find('button');
    button.trigger('click');
    
    expect(consoleSpy).toHaveBeenCalledWith('Navigate to MyAccount page for address:', '1');
    consoleSpy.mockRestore();
  });

  it('emits goToMyAccount method when button is clicked (address is null)', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const wrapper = mount(ShippingAddress, {
      props: { address: null },
      global: { plugins: [globalPlugins] },
    });

    const button = wrapper.find('button');
    button.trigger('click');
    
    expect(consoleSpy).toHaveBeenCalledWith('Navigate to MyAccount page for address:', 'N/A');
    consoleSpy.mockRestore();
  });
});
