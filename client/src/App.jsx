import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lifecycle data ingestion: fetch all notes on initial mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setNotes(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Could not load notes. Is the server running on port 5000?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Please fill in both the title and content.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(API_URL, { title, content });
      // Update displayed list immediately, newest first, no refresh needed
      setNotes((prevNotes) => [response.data, ...prevNotes]);
      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Could not save the note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Sync local state so the deleted note disappears without a refresh
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Could not delete the note. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="app-container">
      <header>
        <h1>📝 Notes</h1>
        <p className="subtitle">a simple app designed to save your notes</p>
      </header>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Note"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <main className="notes-list">
        {isLoading ? (
          <p className="status-message">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="status-message">No notes yet — add one above!</p>
        ) : (
          notes.map((note) => (
            <div className="note-card" key={note._id}>
              <div className="note-card-header">
                <h3>{note.title}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(note._id)}
                  aria-label="Delete note"
                >
                  Delete
                </button>
              </div>
              <p className="note-content">{note.content}</p>
              <span className="note-date">{formatDate(note.createdAt)}</span>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;
