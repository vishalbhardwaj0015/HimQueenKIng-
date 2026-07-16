import { Router } from "express";
import pool from "../config/db.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM hotels WHERE is_active = 1 ORDER BY created_at DESC");
    rows.forEach((r) => { if (r.amenities) r.amenities = JSON.parse(r.amenities); });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/all", auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM hotels ORDER BY created_at DESC");
    rows.forEach((r) => { if (r.amenities) r.amenities = JSON.parse(r.amenities); });
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM hotels WHERE id = ?", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Hotel not found" });
    if (rows[0].amenities) rows[0].amenities = JSON.parse(rows[0].amenities);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, location, description, price, image, amenities, badge, is_active } = req.body;
    const [result] = await pool.query(
      "INSERT INTO hotels (name, location, description, price, image, amenities, badge, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, location, description, price, image, JSON.stringify(amenities), badge, is_active ?? true]
    );
    res.json({ id: result.insertId, message: "Hotel created" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, location, description, price, image, amenities, badge, is_active } = req.body;
    await pool.query(
      "UPDATE hotels SET name=?, location=?, description=?, price=?, image=?, amenities=?, badge=?, is_active=? WHERE id=?",
      [name, location, description, price, image, JSON.stringify(amenities), badge, is_active, req.params.id]
    );
    res.json({ message: "Hotel updated" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await pool.query("DELETE FROM hotels WHERE id = ?", [req.params.id]);
    res.json({ message: "Hotel deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
