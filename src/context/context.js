import React from "react";

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  getNotesForFolder: () => {},
  findNote: () => {},
  findFolder: () => {},
  countNotesForFolder: () => {},
  deleteNote: () => {}
});

export default NoteContext;
