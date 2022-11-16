const { newName } = require('../../models/mocks/products.model.mock');

const validNewName = { name: newName };

const invalidNameLen = { name: 'abc' };

module.exports = {
  validNewName,
  invalidNameLen,
};