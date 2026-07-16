import { Router } from "express";
import pool from "../config/db.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const [contacts] = await pool.query("SELECT *, 'contact' as type FROM contact_requests ORDER BY created_at DESC");
    const [dreams] = await pool.query("SELECT *, 'dream' as type FROM dream_requests ORDER BY created_at DESC");
    const all = [...contacts, ...dreams].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.json(all);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get("/stats", auth, async (req, res) => {
  try {
    const [tourCount] = await pool.query("SELECT COUNT(*) as count FROM tours");
    const [trekCount] = await pool.query("SELECT COUNT(*) as count FROM treks");
    const [hotelCount] = await pool.query("SELECT COUNT(*) as count FROM hotels");
    const [pkgCount] = await pool.query("SELECT COUNT(*) as count FROM packages");
    const [contactCount] = await pool.query("SELECT COUNT(*) as count FROM contact_requests");
    const [dreamCount] = await pool.query("SELECT COUNT(*) as count FROM dream_requests");
    const [pendingContacts] = await pool.query("SELECT COUNT(*) as count FROM contact_requests WHERE status='pending'");
    const [pendingDreams] = await pool.query("SELECT COUNT(*) as count FROM dream_requests WHERE status='pending'");
    const [recentContacts] = await pool.query("SELECT *, 'contact' as type FROM contact_requests ORDER BY created_at DESC LIMIT 5");
    const [recentDreams] = await pool.query("SELECT *, 'dream' as type FROM dream_requests ORDER BY created_at DESC LIMIT 5");

    res.json({
      tours: tourCount[0].count,
      treks: trekCount[0].count,
      hotels: hotelCount[0].count,
      packages: pkgCount[0].count,
      contacts: contactCount[0].count,
      dreams: dreamCount[0].count,
      pendingContacts: pendingContacts[0].count,
      pendingDreams: pendingDreams[0].count,
      recentRequests: [...recentContacts, ...recentDreams].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5),
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put("/:type/:id/status", auth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;
    const table = type === "contact" ? "contact_requests" : "dream_requests";
    await pool.query(`UPDATE ${table} SET status = ? WHERE id = ?`, [status, id]);
    res.json({ message: "Status updated" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
