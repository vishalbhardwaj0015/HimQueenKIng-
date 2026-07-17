import { Router } from "express";
import pool from "../config/db.js";
import auth from "../middleware/auth.js";

const router = Router();

// Submit a review (public)
router.post("/", async (req, res) => {
  try {
    const { name, location, tour, rating, text, photo } = req.body;
    if (!name || !rating || !text) {
      return res.status(400).json({ error: "Name, rating and review text are required" });
    }
    if (text.length > 1000) {
      return res.status(400).json({ error: "Review must be under 1000 characters" });
    }

    let photoData = null;
    if (photo) {
      if (photo.length > 3000000) {
        return res.status(400).json({ error: "Photo must be under 2MB" });
      }
      photoData = photo;
    }

    const [result] = await pool.query(
      "INSERT INTO reviews (name, location, tour, rating, text, photo) VALUES (?, ?, ?, ?, ?, ?)",
      [name, location || null, tour || null, rating, text, photoData]
    );

    res.json({ id: result.insertId, message: "Review submitted! It will appear after approval." });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get approved reviews (public)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, location, tour, rating, text, photo, created_at FROM reviews WHERE status = 'approved' ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get all reviews (admin)
router.get("/all", auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reviews ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update review status (admin)
router.put("/:id/status", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    await pool.query("UPDATE reviews SET status = ? WHERE id = ?", [status, id]);
    res.json({ message: "Status updated" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Delete review (admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM reviews WHERE id = ?", [id]);
    res.json({ message: "Review deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
