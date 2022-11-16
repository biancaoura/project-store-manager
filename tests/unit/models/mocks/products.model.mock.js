const allProducts = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const newProduct = 'Manopla do Infinito';

const createdProduct = {
  name: newProduct,
};

const newName = 'Cetro do Loki';

const updatedProduct = {
  id: 1,
  name: newName,
}

const queryInput = 'mar';

const queryResult = [
  {
    id: 1,
    name: 'Martelo de Thor',
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