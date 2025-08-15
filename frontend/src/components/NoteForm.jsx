import React, { useState } from "react";
import api from "../api";

export default function NoteForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/notes-add", { title, content });
      setTitle("");
      setContent("");
      onCreated?.(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card space-y-2" onSubmit={handleSubmit}>
      <h2 className="text-lg font-medium text-black">Add a Note</h2>
      {error && (
        <div className="rounded-lg bg-red-100 text-red-700 p-2 text-sm">
          {error}
        </div>
      )}
      <input
        className="input text-black bg-white placeholder:text-gray-700"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="input h-28 text-black bg-white placeholder:text-gray-700"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Adding..." : "Add Note"}
      </button>
    </form>
  );
}
