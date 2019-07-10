import React from "react";
import NoteContext from "./context/context";
import NotefulForm from "./NotefulForm/NotefulForm";


class AddFolder extends React.Component {
  static contextType = NoteContext;

  handleSubmit = event => {   
    event.preventDefault();
    const folder = {name: event.target['folder-name'].value}
    this.context.addFolder(folder);    
    this.props.history.push("/");

  }


  render() {    
    
    
    return (
      <NotefulForm onSubmit={this.handleSubmit}>
        <label>
          Folder Name:
          <input
            type="text"
            name="folder-name"
            id="folder-name-input" 
           />
        </label>        
        <button type='submit'>
          Add Folder
        </button>
      </NotefulForm>
    );
  }
}

export default AddFolder;
