const connection = require('./database/connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return products;
};

const getProductById = async (productId) => {
  const [[product]] = await connection.execute(
    `SELECT * FROM StoreManager.products
      WHERE id = ?`,
    [productId],
  );

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};