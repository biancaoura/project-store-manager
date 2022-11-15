const camelize = require('camelize');
const connection = require('./database/connection');

const getAllSales = async () => {
  const [sales] = await connection.execute(
    `SELECT s.id as sale_id, s.date, sp.product_id, sp.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp
        ON s.id = sp.sale_id;`, 
  );

  return camelize(sales);
};

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
  getAllSales,
  getSaleById,
  createProductSale,
};