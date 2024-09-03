const express = require('express');
const pool = require('./db');
const router = express.Router();

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Add a new task
router.post('/tasks', async (req, res) => {
    try {
        const { description } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (description) VALUES ($1) RETURNING *',
            [description]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Mark task as complete
router.put('/tasks/:id/complete', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'UPDATE tasks SET completed_at = NOW() WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Edit a task
router.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const result = await pool.query(
            'UPDATE tasks SET description = $1 WHERE id = $2 RETURNING *',
            [description, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
