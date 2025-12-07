import store from './store.js';

const sizes = [
  { id: 'sm', name: 'Small', basePrice: 8 },
  { id: 'lg', name: 'Large', basePrice: 12 },
  { id: 'xl', name: 'Extra Large', basePrice: 15 }
];

const ingredients = [
  { id: 'mozzarella', name: 'Mozzarella', extraPrice: 1.25 },
  { id: 'pepperoni', name: 'Pepperoni', extraPrice: 1.75 },
  { id: 'mushrooms', name: 'Mushrooms', extraPrice: 1.1 },
  { id: 'redOnion', name: 'Red Onion', extraPrice: 0.75 },
  { id: 'bellPepper', name: 'Bell Pepper', extraPrice: 0.85 },
  { id: 'blackOlives', name: 'Black Olives', extraPrice: 0.9 },
  { id: 'bacon', name: 'Bacon', extraPrice: 1.8 },
  { id: 'freshBasil', name: 'Fresh Basil', extraPrice: 0.6 },
  { id: 'garlic', name: 'Garlic', extraPrice: 0.5 },
  { id: 'jalapeno', name: 'Jalapeno', extraPrice: 0.7 }
];

const seedTable = (tableName, rows) => {
  const existing = store.read(tableName);
  if (existing.length) return;

  rows.forEach(row => store.write(tableName, row));
};

const seedDatabase = () => {
  seedTable('sizes', sizes);
  seedTable('ingredients', ingredients);
  console.log('Database seeded with initial data.');
};

export default seedDatabase;
