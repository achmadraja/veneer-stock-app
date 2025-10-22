import pool from "../config/db.js";

export const getLastStock = async (productId) => {
  const result = await pool.query(
    `SELECT total_stock FROM stocks WHERE product_id=$1 ORDER BY date DESC LIMIT 1`,
    [productId]
  );
  return result.rows[0]?.total_stock || 0;
};

export const addStock = async (req, res) => {
  try {
    const { product_id, production_today } = req.body;
    const today = new Date().toISOString().split("T")[0];

    const last_stock = await getLastStock(product_id);

    const total_stock = last_stock + production_today;

    const result = await pool.query(
      `INSERT INTO stocks (product_id, date, last_stock, production_today, total_stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [product_id, today, last_stock, production_today, total_stock]
    );

    res.json({
      message: "Stok harian berhasil ditambahkan",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menambahkan stok harian" });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, p.name AS product_name
      FROM stocks s
      JOIN products p ON s.product_id = p.id
      ORDER BY s.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data stok" });
  }
};

export const getStockByProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const result = await pool.query(
      `SELECT * FROM stocks WHERE product_id=$1 ORDER BY date DESC`,
      [product_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data stok produk" });
  }
};
