import React from "react";
import NoteContext from "./context/context";
import NotefulForm from "./NotefulForm/NotefulForm";

class AddFolder extends React.Component {
  static contextType = NoteContext;

  handleSubmit = event => {
    event.preventDefault();
    const folder = { name: event.target["folder-name"].value };

    fetch(`http://localhost:9090/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(folder)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push(`/`);
      })
      .catch(error => error(error.message));
  };

  render() {
    return (
      <NotefulForm onSubmit={this.handleSubmit}>
        <label>
          Folder Name:
          <input
            type="text"
            name="folder-name"
            id="folder-name-input"
            required
          />
        </label>
        <button type="submit">Add Folder</button>
      </NotefulForm>
    );
  }
}

export default AddFolder;
