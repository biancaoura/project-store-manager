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

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (name)
      VALUE (?)`,
    [name],
  );

  return insertId;
};

const updateProduct = async (id, name) => {
  await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
    [name, id],
  );

  return { id, name };
};

const deleteProduct = async (productId) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};