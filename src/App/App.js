import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import { getNotesForFolder, findNote, findFolder } from "../notes-helpers";
import "./App.css";
import NoteContext from "../context/context";
import { Redirect } from "react-router-dom";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    const urls = {
      folders: "http://localhost:9090/folders",
      notes: "http://localhost:9090/notes"
    };
    Promise.all(
      Object.keys(urls).map(key => {
        console.log(key);
        fetch(urls[key])
          .then(response => {
            console.log(response);
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
  }

  deleteNote = (noteId) => {
    console.log("noteId in deleteNote", noteId);
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      let newNotes = this.state.notes.filter(note => note.id !== noteId);
      this.setState(
        {
          notes: newNotes
        }
        
      );
    });
  };

  renderNavRoutes() {
    const { notes, folders } = this.state;
    console.log(notes, folders);

    return (
      <NoteContext.Provider
        value={{
          notes,
          folders,
          findNote,
          findFolder
        }}
      >
        <>
          {["/", "/folder/:folderId"].map(path => (
            <Route exact key={path} path={path} component={NoteListNav} />
          ))}

          <Route path="/note/:noteId" component={NotePageNav} />
          <Route path="/add-folder" component={NotePageNav} />
          <Route path="/add-note" component={NotePageNav} />
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
              : notes.filter(note => note.folderId === folderId),
          findFolder: (folders = [], folderId) =>
            folders.find(folder => folder.id === folderId),
          findNote: (notes = [], noteId) =>
            notes.find(note => note.id === noteId),
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
        <nav className="App__nav">{this.renderNavRoutes()}</nav>
        <header className="App__header">
          <h1>
            <Link to="/">Noteful</Link> <FontAwesomeIcon icon="check-double" />
          </h1>
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
