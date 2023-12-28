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

  return <div></div>;
};

export default Note;
