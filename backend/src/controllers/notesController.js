import Note from "../models/Note.js";

//create a note

export const createANote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and content are required" });

    const note = await Note.create({ user: req.user.id, title, content });

    // Broadcast via Socket.IO so all connected clients get real-time updates
    const io = req.app.get("io");
    io.emit("note:created", {
      _id: note._id,
      user: note.user,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    });

    return res.status(201).json(note);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//get all notes

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .sort({
        createdAt: -1,
      })
      .populate("user");

    return res.json(notes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
