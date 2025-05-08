import type { ProductItem } from "../model/ProductItem";







const mockProducts: ProductItem[] = [
  {
    id: 'muffin-proteico',
    title: 'Muffin Proteico',
    subtitle: 'Opción saludable sin culpas',
    description: 'Muffin saludable sin azúcar ni harinas refinadas, con cobertura de frutos rojos',
    price: {
      amount: 8000,
      currency: 'G.',
      symbol: '₲'
    },
    discountPercentage: 10,
    rating: 4.7,
    stock: 15,
    brand: 'Delicias Saludables',
    category: new Set(['muffins', 'proteico', 'sin-azucar']),
    thumbnail: '/catalog-images/muffin-proteico.png',
    images: [
      '/catalog-images/muffin-proteico-1.png',
      '/catalog-images/muffin-proteico-2.png'
    ]
  },
  {
    id: 'muffin-cacao',
    title: 'Muffin de Cacao 100%',
    subtitle: 'Saludable y delicioso',
    description: 'Muffin con avena en copos y cacao puro, con chispas de chocolate sin azúcar',
    price: {
      amount: 8000,
      currency: 'G.',
      symbol: '₲'
    },
    rating: 4.9,
    stock: 20,
    brand: 'Delicias Saludables',
    category: new Set(['muffins', 'chocolate', 'sin-azucar']),
    thumbnail: '/catalog-images/muffin-cacao.png',
    images: [
      '/catalog-images/muffin-cacao-1.png',
      '/catalog-images/muffin-cacao-2.png'
    ]
  },
  {
    id: 'tortita-felicidad',
    title: 'Tortita de la Felicidad',
    subtitle: 'Energía en cada bocado',
    description: 'Tortita con avena, linaza, chía y sésamo negro, con chips de chocolate sin azúcar',
    price: {
      amount: 50000,
      currency: 'G.',
      symbol: '₲'
    },
    discountPercentage: 15,
    rating: 4.8,
    stock: 8,
    brand: 'Energía Natural',
    category: new Set(['tortas', 'energetica', 'semillas']),
    thumbnail: '/catalog-images/tortita-felicidad.png',
    images: [
      '/catalog-images/tortita-felicidad-1.png',
      '/catalog-images/tortita-felicidad-2.png',
      '/catalog-images/tortita-felicidad-3.png'
    ]
  },
  {
    id: 'carrot-cheesecake',
    title: 'Carrot Cheesecake Saludable',
    subtitle: 'Versión fit del clásico',
    description: 'Cheesecake de zanahoria con yogur griego, avena y queso crema, sin azúcar',
    price: {
      amount: 50000,
      currency: 'G.',
      symbol: '₲'
    },
    rating: 4.9,
    stock: 10,
    brand: 'Fit Delights',
    category: new Set(['tortas', 'proteico', 'zanahoria']),
    thumbnail: '/catalog-images/carrot-cheesecake.png',
    images: [
      '/catalog-images/carrot-cheesecake-1.png',
      '/catalog-images/carrot-cheesecake-2.png'
    ]
  },
  {
    id: 'tortita-frutos-secos',
    title: 'Tortita de Frutos Secos',
    subtitle: 'Magia en cada bocado',
    description: 'Tortita esponjosa con almendras, castañas de cajú, nueces y pasas de uva',
    price: {
      amount: 50000,
      currency: 'G.',
      symbol: '₲'
    },
    discountPercentage: 10,
    rating: 4.6,
    stock: 12,
    brand: 'Energía Natural',
    category: new Set(['tortas', 'frutos-secos', 'sin-azucar']),
    thumbnail: '/catalog-images/tortita-frutos-secos.png',
    images: [
      '/catalog-images/tortita-frutos-secos-1.png',
      '/catalog-images/tortita-frutos-secos-2.png'
    ]
  },
  {
    id: 'tortita-proteica',
    title: 'Tortita Proteica',
    subtitle: 'Sabor y nutrición',
    description: 'Tortita de avena, banana y huevos con dulce de leche sin azúcar y coco rallado',
    price: {
      amount: 50000,
      currency: 'G.',
      symbol: '₲'
    },
    rating: 4.7,
    stock: 7,
    brand: 'ProtePower',
    category: new Set(['tortas', 'proteico', 'banana']),
    thumbnail: '/catalog-images/tortita-proteica.png',
    images: [
      '/catalog-images/tortita-proteica-1.png',
      '/catalog-images/tortita-proteica-2.png'
    ]
  },
  {
    id: 'tortita-arandanos',
    title: 'Tortita de Avena y Arándanos',
    subtitle: 'Explosión de sabor',
    description: 'Tortita esponjosa sin harinas ni azúcar, con arándanos frescos',
    price: {
      amount: 50000,
      currency: 'G.',
      symbol: '₲'
    },
    discountPercentage: 5,
    rating: 4.8,
    stock: 9,
    brand: 'BerryGood',
    category: new Set(['tortas', 'arandanos', 'sin-azucar']),
    thumbnail: '/catalog-images/tortita-arandanos.png',
    images: [
      '/catalog-images/tortita-arandanos-1.png',
      '/catalog-images/tortita-arandanos-2.png'
    ]
  },
  {
    id: 'tortita-zarzamora',
    title: 'Tortita de Zarzamora',
    subtitle: 'Antioxidante natural',
    description: 'Tortita saludable con zarzamoras, sin azúcar ni harinas refinadas',
    price: {
      amount: 50000,
      currency: 'G.',
      symbol: '₲'
    },
    rating: 4.5,
    stock: 6,
    brand: 'BerryGood',
    category: new Set(['tortas', 'zarzamora', 'sin-azucar']),
    thumbnail: '/catalog-images/tortita-zarzamora.png',
    images: [
      '/catalog-images/tortita-zarzamora-1.png',
      '/catalog-images/tortita-zarzamora-2.png'
    ]
  },
  {
    id: 'tortita-banana-avena',
    title: 'Tortita de Banana y Avena',
    subtitle: 'Sabor natural sin azúcar añadida',
    description: 'Deliciosa tortita elaborada con avena y banana, sin harinas refinadas ni azúcar añadida, con textura suave y nutritiva',
    price: {
      amount: 50000,
      currency: 'G.',
      symbol: '₲'
    },
    discountPercentage: 10,  // Podrías ofrecer un 10% de descuento como promoción
    rating: 4.7,  // Un rating alto por ser un producto popular
    stock: 14,  // Buen stock disponible
    brand: 'Natural Delights',
    category: new Set(['tortas', 'banana', 'avena', 'sin-azucar', 'sin-harina']),
    thumbnail: '/catalog-images/tortita-banana-avena-thumb.png',
    images: [
      '/catalog-images/tortita-banana-avena-1.png',
      '/catalog-images/tortita-banana-avena-2.png',
      '/catalog-images/tortita-banana-avena-3.png'
    ]
  }
];

export default mockProducts;
