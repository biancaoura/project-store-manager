const allProducts = [
  {
    id: 1,
    name: 'Thor\'s Hammer',
  },
  {
    id: 2,
    name: 'Ion Cannon',
  },
  {
    id: 3,
    name: 'Captain America\'s Shield',
  },
];

const newProduct = 'Infinity Gauntlet';

const createdProduct = {
  name: newProduct,
};

const newName = 'Panther Habit';

const updatedProduct = {
  id: 1,
  name: newName,
}

const queryInput = 'ham';

const queryResult = [
  {
    id: 1,
    name: 'Thor\'s Hammer',
  },
];

module.exports = {
  allProducts,
  newProduct,
  createdProduct,
  newName,
  updatedProduct,
  queryInput,
  queryResult,
};