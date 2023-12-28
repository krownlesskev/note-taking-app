import NoteList from "./components/NoteList";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes
      ? JSON.parse(storedNotes)
      : [
          { id: 1, title: "Note 1" },
          { id: 2, title: "Note 2" },
        ];
  });

  const [newNote, setNewNote] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  });

  const handleDelete = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleEdit = (noteId, newTitle) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, title: newTitle } : note
      )
    );
  };

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, { id: Date.now(), title: newNote }]);
      setNewNote("");
    }
  };
  const handleInputChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNote();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", darkMode);
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white"
      } rounded shadow transition-all`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
          {darkMode ? "Night Taker" : "Note Taker"}
        </h1>
        <button
          className={`bg-${
            darkMode ? "gray-600" : "blue-500"
          } text-white py-2 px-4 rounded`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded py-2 px-3 mr-2 w-2/3"
          placeholder="New Note"
          value={newNote}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button
          className={`bg-${
            darkMode ? "gray-600" : "blue-500"
          } text-white py-2 px-4 rounded`}
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </div>
      <NoteList notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default App;
// className={`bg-${
//   darkMode ? "gray-700" : "blue-500"
// } text-white py-2 px-4 rounded`}
// className={`bg-${
//   darkMode ? "gray-700" : "blue-500"
// } text-white py-2 px-4 rounded`}
