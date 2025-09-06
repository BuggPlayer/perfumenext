export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  rating: number;
  reviewCount: number;
  size: string;
  inStock: boolean;
  fragranceNotes: string[];
  featured?: boolean;
  bestSeller?: boolean;
}

export const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Chanel N°5 Eau de Parfum',
    brand: 'Chanel',
    category: 'Women',
    price: 135.00,
    originalPrice: 150.00,
    description: 'The world\'s most famous fragrance. A timeless classic with notes of rose, jasmine, and vanilla that creates an unforgettable signature scent.',
    images: [
      '/images/products/chanel-no5-1.jpg',
      '/images/products/chanel-no5-2.jpg',
      '/images/products/chanel-no5-3.jpg'
    ],
    rating: 4.8,
    reviewCount: 1247,
    size: '100ml',
    inStock: true,
    fragranceNotes: ['Rose', 'Jasmine', 'Vanilla', 'Aldehydes', 'Sandalwood'],
    featured: true,
    bestSeller: true
  },
  {
    id: '2',
    name: 'Dior Sauvage Eau de Parfum',
    brand: 'Dior',
    category: 'Men',
    price: 145.00,
    originalPrice: 165.00,
    description: 'A powerful and fresh fragrance that embodies the spirit of freedom and adventure. Perfect for the modern, confident man.',
    images: [
      '/images/products/dior-sauvage-1.jpg',
      '/images/products/dior-sauvage-2.jpg',
      '/images/products/dior-sauvage-3.jpg'
    ],
    rating: 4.9,
    reviewCount: 2156,
    size: '100ml',
    inStock: true,
    fragranceNotes: ['Bergamot', 'Pink Pepper', 'Ambroxan', 'Vetiver', 'Cedar'],
    featured: true,
    bestSeller: true
  },
  {
    id: '3',
    name: 'Lancôme La Vie Est Belle',
    brand: 'Lancôme',
    category: 'Women',
    price: 125.00,
    description: 'A joyful fragrance that celebrates happiness and the beauty of life. A blend of iris, jasmine, and praline that radiates positivity.',
    images: [
      '/images/products/lancome-la-vie-1.jpg',
      '/images/products/lancome-la-vie-2.jpg'
    ],
    rating: 4.7,
    reviewCount: 892,
    size: '100ml',
    inStock: true,
    fragranceNotes: ['Iris', 'Jasmine', 'Praline', 'Vanilla', 'Patchouli'],
    featured: true
  },
  {
    id: '4',
    name: 'YSL Black Opium Eau de Parfum',
    brand: 'Yves Saint Laurent',
    category: 'Women',
    price: 155.00,
    description: 'An addictive gourmand fragrance with notes of coffee, vanilla, and white flowers. Bold, mysterious, and utterly captivating.',
    images: [
      '/images/products/ysl-black-opium-1.jpg',
      '/images/products/ysl-black-opium-2.jpg'
    ],
    rating: 4.6,
    reviewCount: 743,
    size: '90ml',
    inStock: true,
    fragranceNotes: ['Coffee', 'Vanilla', 'White Flowers', 'Pink Pepper', 'Patchouli']
  },
  {
    id: '5',
    name: 'Giorgio Armani Acqua di Gio',
    brand: 'Giorgio Armani',
    category: 'Men',
    price: 135.00,
    description: 'A fresh aquatic fragrance inspired by the Mediterranean Sea. Clean, sophisticated, and perfect for everyday wear.',
    images: [
      '/images/products/armani-acqua-1.jpg',
      '/images/products/armani-acqua-2.jpg'
    ],
    rating: 4.5,
    reviewCount: 1567,
    size: '100ml',
    inStock: true,
    fragranceNotes: ['Bergamot', 'Neroli', 'Marine Notes', 'Jasmine', 'Cedar'],
    bestSeller: true
  },
  {
    id: '6',
    name: 'Carolina Herrera Good Girl',
    brand: 'Carolina Herrera',
    category: 'Women',
    price: 165.00,
    description: 'A seductive and mysterious fragrance housed in a stunning stiletto bottle. Notes of jasmine, cocoa, and tonka bean create an irresistible allure.',
    images: [
      '/images/products/herrera-good-girl-1.jpg',
      '/images/products/herrera-good-girl-2.jpg'
    ],
    rating: 4.7,
    reviewCount: 634,
    size: '80ml',
    inStock: true,
    fragranceNotes: ['Jasmine', 'Cocoa', 'Tonka Bean', 'Coffee', 'Vanilla']
  },
  {
    id: '7',
    name: 'Tom Ford Tobacco Vanille',
    brand: 'Tom Ford',
    category: 'Unisex',
    price: 285.00,
    description: 'A sophisticated and warm fragrance that combines the richness of tobacco with the sweetness of vanilla. Perfect for evening wear.',
    images: [
      '/images/products/tom-ford-tobacco-1.jpg',
      '/images/products/tom-ford-tobacco-2.jpg'
    ],
    rating: 4.9,
    reviewCount: 445,
    size: '100ml',
    inStock: true,
    fragranceNotes: ['Tobacco', 'Vanilla', 'Tonka Bean', 'Cocoa', 'Cinnamon'],
    featured: true
  },
  {
    id: '8',
    name: 'Jo Malone London Wood Sage & Sea Salt',
    brand: 'Jo Malone London',
    category: 'Unisex',
    price: 145.00,
    description: 'A fresh and mineral scent that captures the essence of the British coast. Clean, crisp, and perfect for layering.',
    images: [
      '/images/products/jo-malone-wood-sage-1.jpg',
      '/images/products/jo-malone-wood-sage-2.jpg'
    ],
    rating: 4.6,
    reviewCount: 789,
    size: '100ml',
    inStock: true,
    fragranceNotes: ['Sea Salt', 'Wood Sage', 'Mineral Notes', 'Ambroxan', 'Cedar']
  }
];

export const categories = ['All', 'Women', 'Men', 'Unisex', 'Niche', 'Limited Edition'];

export const brands = ['All', 'Chanel', 'Dior', 'Lancôme', 'Yves Saint Laurent', 'Giorgio Armani', 'Carolina Herrera', 'Tom Ford', 'Jo Malone London'];

export const fragranceNotes = [
  'Rose', 'Jasmine', 'Vanilla', 'Bergamot', 'Cedar', 'Sandalwood', 'Patchouli',
  'Ambroxan', 'Vetiver', 'Pink Pepper', 'Iris', 'Praline', 'Coffee', 'White Flowers',
  'Neroli', 'Marine Notes', 'Cocoa', 'Tonka Bean', 'Tobacco', 'Cinnamon', 'Sea Salt',
  'Wood Sage', 'Mineral Notes', 'Aldehydes'
];

