const connection = require('./database/connection');

const getSaleById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT * FROM StoreManager.sales_products
      WHERE sale_id = ?`,
    [saleId],
  );

  return sale;
};

const createLastSaleDate = async () => {
  const date = new Date();

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales (date)
      VALUE (?)`,
    [date],
  );

  return insertId;
};

const createProductSale = async (sale) => {
  const saleId = await createLastSaleDate();

  const values = sale.map((product) => (`(${saleId}, ${Object.values(product).join(', ')})`));
  
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES ${values}`,
    );
  
  return { id: saleId, itemsSold: sale };
};

module.exports = {
  getSaleById,
  createProductSale,
};