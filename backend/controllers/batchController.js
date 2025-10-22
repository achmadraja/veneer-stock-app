import pool from '../config/db.js';

// CREATE batch
export const createBatch = async (req, res) => {
  const { name, start_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO batches (name, start_date, is_active) VALUES ($1, $2, TRUE) RETURNING *',
      [name, start_date]
    );
    res.status(201).json({ message: 'Batch created', batch: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create batch' });
  }
};

// GET all batches
export const getBatches = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM batches ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
};

// CLOSE batch (set inactive)
export const closeBatch = async (req, res) => {
  const { id } = req.params;
  const { end_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE batches SET is_active=FALSE, end_date=$1 WHERE id=$2 RETURNING *',
      [end_date, id]
    );
    res.json({ message: 'Batch closed', batch: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to close batch' });
  }
};
