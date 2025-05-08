/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'


const kukifitLightTheme = {
  dark: false,
  colors: {
    // Colores principales basados en la captura de pantalla
    primary: '#F7E8D3', // Un color melocotón/naranja pálido para el header
    'on-primary': '#212121', // Texto oscuro sobre el color primary

    secondary: '#CBA17A', // Un color terracota/marrón claro para botones de acción
    'on-secondary': '#FFFFFF', // Texto blanco sobre el color secondary

    background: '#FFFFFF', // Un gris muy claro para el fondo general
    surface: '#FFFFFF', // Blanco para tarjetas y superficies principales
    'on-surface': '#212121', // Texto oscuro sobre superficies

    // Otros colores que podrías necesitar o ajustar
    'surface-bright': '#FFFFFF',
    'surface-light': '#E0E0E0', // Gris claro para placeholders o elementos menos importantes
    'surface-variant': '#424242', // Podrías mantener o ajustar este si lo usas
    'on-surface-variant': '#EEEEEE', // Podrías mantener o ajustar este si lo usas

    // Colores estándar que es bueno definir
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  variables: {
    rounded: '4px',
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'kukifitLightTheme',
    themes: {
      kukifitLightTheme,
    },
  },
})
