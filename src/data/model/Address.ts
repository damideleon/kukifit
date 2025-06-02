export interface Address {
  id: string;
  street: string;
  city: string;
  neighborhood: string;
  placeReference: string;
  label: string;
  // Optional fields that were considered for ShippingAddress.vue
  // It's better to add them here if they are truly part of a "complete" address concept
  // or handle them as view-specific properties in the components.
  // For now, keeping it aligned with MyAccountView.vue's definition.
  state?: string; 
  zipCode?: string; 
  country?: string; 
}
