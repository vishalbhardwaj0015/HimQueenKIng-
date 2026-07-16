import { Router } from "express";
import pool from "../config/db.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM packages WHERE is_active = 1 ORDER BY created_at DESC");
    rows.forEach((r) => { if (r.includes) r.includes = JSON.parse(r.includes); if (r.highlights) r.highlights = JSON.parse(r.highlights); });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/all", auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM packages ORDER BY created_at DESC");
    rows.forEach((r) => { if (r.includes) r.includes = JSON.parse(r.includes); if (r.highlights) r.highlights = JSON.parse(r.highlights); });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM packages WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Package not found" });
    const r = rows[0];
    if (r.includes) r.includes = JSON.parse(r.includes);
    if (r.highlights) r.highlights = JSON.parse(r.highlights);
    res.json(r);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, destination, description, price, original_price, image, duration, group_size, difficulty, includes, highlights, badge, is_active } = req.body;
    const [result] = await pool.query(
      "INSERT INTO packages (title, destination, description, price, original_price, image, duration, group_size, difficulty, includes, highlights, badge, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, destination, description, price, original_price, image, duration, group_size, difficulty, JSON.stringify(includes), JSON.stringify(highlights), badge, is_active ?? true]
    );
    res.json({ id: result.insertId, message: "Package created" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { title, destination, description, price, original_price, image, duration, group_size, difficulty, includes, highlights, badge, is_active } = req.body;
    await pool.query(
      "UPDATE packages SET title=?, destination=?, description=?, price=?, original_price=?, image=?, duration=?, group_size=?, difficulty=?, includes=?, highlights=?, badge=?, is_active=? WHERE id=?",
      [title, destination, description, price, original_price, image, duration, group_size, difficulty, JSON.stringify(includes), JSON.stringify(highlights), badge, is_active, req.params.id]
    );
    res.json({ message: "Package updated" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await pool.query("DELETE FROM packages WHERE id = ?", [req.params.id]);
    res.json({ message: "Package deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
