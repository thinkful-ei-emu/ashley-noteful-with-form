import React from "react";

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  getNotesForFolder : (notes=[], folderId) => (
    (!folderId)
      ? notes
      : notes.filter(note => note.folderId === folderId)
  ),
  findNote : (notes=[], noteId) =>
  (notes.find(note => note.id === noteId))
  
});



export default NoteContext;