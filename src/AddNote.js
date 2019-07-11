import React from "react";
import NoteContext from "./context/context";
import NotefulForm from "./NotefulForm/NotefulForm";


export default class AddNote extends React.Component {
  static contextType = NoteContext;

  handleSubmit = event => {
    event.preventDefault();
    const note = {
      name: event.target["note-name"].value,
      folderId: event.target["note-folder-id"].value,
      content: event.target["note-content"].value,
      modified: new Date (),
    };
    fetch(`http://localhost:9090/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(note),
    }).then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      } 
      return res.json()
         
      
    }).then(note => {
      this.context.addNote(note);
      this.props.history.push("/");
    }).catch(error => {
      console.log(error.message)
    })
    
    
  };

  render() {
    const { folders } = this.context;

    return (
      <NotefulForm onSubmit={this.handleSubmit}>
        <label>Note Name:</label>
        <input type="text" name="note-name" id="note-name-input" required />
        <label>Content:</label>
        <textarea type="text" name="note-content" id="note-content-textarea" />
        <select id="note-folder-select" name="note-folder-id">
          <option value={null}>Select a Folder</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>{folder.name}</option>
          ))}
        </select>
        <button type="submit">Add Note</button>
      </NotefulForm>
    );
  }
}



