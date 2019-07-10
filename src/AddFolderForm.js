import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoteContext from "./context/context";


class AddFolderForm extends React.Component {
  static contextType = NoteContext;
  handleSubmit = event => {
    event.preventDefault();
    this.context.addFolder(event.target.value);
  }




  handleSubmit= event => {
    event.preventDefault();
  }


  render() {

    const {folders} = this.context;
   
    
    
    
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Folder Name:
          <input
            type="text"
            name="folder-name" 
           />
        </label>        
        <button type='submit'>
          Add Folder
        </button>
      </form>
    );
  }
}

export default AddFolderForm;
