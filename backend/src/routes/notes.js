import { Router } from "express";

import { auth } from "../middleware/auth.js";
import { createANote, getAllNotes } from "../controllers/notesController.js";

const router = Router();

// POST /notes - create a note
router.post("/notes-add", auth, createANote);

// GET /notes - all notes for logged-in user
router.get("/notes", auth, getAllNotes);

export default router;
