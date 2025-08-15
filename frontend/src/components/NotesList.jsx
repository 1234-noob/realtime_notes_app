export default function NotesList({ notes, loading }) {
  if (loading)
    return <div className="text-sm text-gray-500">Loading notes...</div>;
  if (!notes.length)
    return (
      <div className="text-sm text-gray-500">
        No notes yet. Add your first note!
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {notes.map((n) => (
        <div key={n._id} className="card">
          <h3 className="font-semibold text-black">{n.title}</h3>
          <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap break-all">
            {n.content}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            Created by {n.user.email}
          </p>
          <p className="mt-1 text-sm text-gray-700">
            Created {new Date(n.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
