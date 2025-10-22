import pool from '../config/db.js';

// CREATE production + update stock
export const createProduction = async (req, res) => {
  const { batch_id, product_id, quantity } = req.body;

  try {
    // 1️⃣ Catat produksi harian
    const production = await pool.query(
      `INSERT INTO productions (batch_id, product_id, quantity)
       VALUES ($1, $2, $3) RETURNING *`,
      [batch_id, product_id, quantity]
    );

    // 2️⃣ Cek stok terakhir produk ini
    const today = new Date().toISOString().split('T')[0];
    const stockCheck = await pool.query(
      `SELECT * FROM stocks WHERE product_id=$1 ORDER BY date DESC LIMIT 1`,
      [product_id]
    );

    let last_stock = 0;
    if (stockCheck.rows.length > 0) last_stock = stockCheck.rows[0].total_stock;

    const total_stock = last_stock + quantity;

    // 3️⃣ Insert/update stok hari ini
    const todayStock = await pool.query(
      `SELECT * FROM stocks WHERE product_id=$1 AND date=$2`,
      [product_id, today]
    );

    if (todayStock.rows.length > 0) {
      // update existing stock record for today
      const update = await pool.query(
        `UPDATE stocks
         SET production_today = production_today + $1,
             total_stock = total_stock + $1
         WHERE product_id=$2 AND date=$3
         RETURNING *`,
        [quantity, product_id, today]
      );
      res.json({ message: 'Production updated', production: production.rows[0], stock: update.rows[0] });
    } else {
      // insert new stock record for today
      const insert = await pool.query(
        `INSERT INTO stocks (product_id, date, last_stock, production_today, total_stock)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [product_id, today, last_stock, quantity, total_stock]
      );
      res.status(201).json({ message: 'Production added', production: production.rows[0], stock: insert.rows[0] });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record production' });
  }
};

// GET daily report
export const getDailyStockReport = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.date, p.name AS product_name,
             s.last_stock, s.production_today, s.total_stock
      FROM stocks s
      JOIN products p ON s.product_id = p.id
      ORDER BY s.date DESC, p.name ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch daily stock report' });
  }
};

// GET total production per batch
export const getBatchProductionReport = async (req, res) => {
  const { batch_id } = req.params;
  try {
    const result = await pool.query(`
      SELECT b.name AS batch_name, p.name AS product_name, SUM(pr.quantity) AS total_quantity
      FROM productions pr
      JOIN products p ON pr.product_id = p.id
      JOIN batches b ON pr.batch_id = b.id
      WHERE b.id = $1
      GROUP BY b.name, p.name
      ORDER BY p.name ASC
    `, [batch_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch batch report' });
  }
};
