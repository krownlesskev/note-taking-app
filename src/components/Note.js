import React, { useState } from "react";

const Note = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note.title);

  const handleSave = () => {
    onEdit(note.id, editedNote);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedNote(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedNote}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <button onClick={handleSave}> Save</button>
        </div>
      ) : (
        <div>
          <p>{note.title}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Note;
