const { Product } = require('../models/index');
console.log(Product)
const productData = [
  {
    product_name: 'Golf Button Down',
    price: 29.99,
    stock: 20,
    category_id: 1,
  },
  {
    product_name: 'Golf Shoes',
    price: 129.99,
    stock: 20,
    category_id: 5,
  },
  {
    product_name: 'Titlest Hat',
    price: 29.99,
    stock: 12,
    category_id: 4,
  },
  {
    product_name: 'Titlest Prov1X',
    price: 69.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Golf Shorts',
    price: 49.99,
    stock: 20,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;