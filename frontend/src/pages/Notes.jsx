import React, { useEffect, useState } from "react";
import api from "../api";
import socket from "../socket";
import NoteForm from "../components/NoteForm.jsx";
import NotesList from "../components/NotesList.jsx";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load notes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  console.log(notes);

  useEffect(() => {
    function onCreated(note) {
      setNotes((prev) => {
        const exists = prev.some((n) => n._id === note._id);
        if (exists) return prev;
        return [note, ...prev];
      });
    }

    socket.on("note:created", onCreated);
    return () => {
      socket.off("note:created", onCreated);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Notes</h1>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </header>

      {error && (
        <div className="rounded-lg bg-red-100 text-red-700 p-2 text-sm">
          {error}
        </div>
      )}

      <NoteForm
        onCreated={(n) =>
          setNotes((prev) =>
            prev.some((note) => note._id === n._id) ? prev : [n, ...prev]
          )
        }
      />

      <NotesList notes={notes} loading={loading} />
    </div>
  );
}
