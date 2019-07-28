import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import FolderBoundary from "../FolderBoundary";
import NoteBoundary from "../NoteBoundary";
import "./App.css";
import NoteContext from "../context/context";
import AddFolder from "../AddFolder";
import AddNote from "../AddNote";
import config from '../config'

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount = () => {
    
    const urls = {
      folders: `${config.API_ENDPOINT}/folders`,
      notes: `${config.API_ENDPOINT}/notes`
    };
    Promise.all(
      Object.keys(urls).map(key => {
        fetch(urls[key])
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then(data => {
            this.setState({
              [key]: data
            });
          })
          .catch(error => {
            this.setState({
              error: error.message
            });
          });
      })
    );
  };
  

  deleteNote = noteId => {
    let newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    });
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    });
  };

  addNote = note => {    
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  renderNavRoutes() {
    const { notes, folders } = this.state;

    return (
      <NoteContext.Provider
        value={{
          notes,
          folders,
          findFolder: (folders = [], folderId) =>
            folders.find(folder => folder.id == folderId),
          findNote: (notes = [], noteId) =>
            notes.find(note => note.id == noteId),
          addFolder: this.addFolder,
          addNote: this.addNote,         
          countNotesForFolder:  (notes=[], folderId) => notes.filter(note => note.folder_id == folderId).length
        }}
      >
        <>
          {["/", "/folder/:folderId"].map(path => (
            <Route exact key={path} path={path} component={NoteListNav} />
          ))}

          <Route path="/note/:noteId" component={NotePageNav} />
          <Route path="/add-folder" component={AddFolder} />
          <Route path="/add-note" component={AddNote} />
        </>
      </NoteContext.Provider>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;
    return (
      <NoteContext.Provider
        value={{
          notes,
          folders,
          getNotesForFolder: (notes = [], folderId) =>
            !folderId
              ? notes
              : notes.filter(note => note.folder_id == folderId),
          findFolder: (folders = [], folderId) =>
            folders.find(folder => folder.id == folderId),
          findNote: (notes = [], noteId) =>
            notes.find(note => note.id == noteId),
          deleteNote: this.deleteNote
        }}
      >
        <>
          {["/", "/folder/:folderId"].map(path => (
            <Route exact key={path} path={path} component={NoteListMain} />
          ))}
          <Route path="/note/:noteId" component={NotePageMain} />
        </>
      </NoteContext.Provider>
    );
  }

  render() {
    return (
      <div className="App">
        <FolderBoundary>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
        </FolderBoundary>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <NoteBoundary>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </NoteBoundary>
      </div>
    );
  }
}

export default App;
