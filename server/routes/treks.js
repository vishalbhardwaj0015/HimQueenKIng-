import { Router } from "express";
import pool from "../config/db.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM treks WHERE is_active = 1 ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/all", auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM treks ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM treks WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Trek not found" });
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description, price, image, difficulty, duration, altitude, best_time, region, is_active } = req.body;
    const [result] = await pool.query(
      "INSERT INTO treks (title, description, price, image, difficulty, duration, altitude, best_time, region, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, description, price, image, difficulty, duration, altitude, best_time, region, is_active ?? true]
    );
    res.json({ id: result.insertId, message: "Trek created" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, price, image, difficulty, duration, altitude, best_time, region, is_active } = req.body;
    await pool.query(
      "UPDATE treks SET title=?, description=?, price=?, image=?, difficulty=?, duration=?, altitude=?, best_time=?, region=?, is_active=? WHERE id=?",
      [title, description, price, image, difficulty, duration, altitude, best_time, region, is_active, req.params.id]
    );
    res.json({ message: "Trek updated" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await pool.query("DELETE FROM treks WHERE id = ?", [req.params.id]);
    res.json({ message: "Trek deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
