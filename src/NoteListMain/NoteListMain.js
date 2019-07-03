import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import NoteContext from '../context/context';


export default class NoteListMain extends React.Component {
 
   static contextType= NoteContext;
        
  
  render(){
    const {notes, getNotesForFolder} = this.context;
    const {folderId} = this.props.match.params;
    const notesForFolder = getNotesForFolder(
        notes,
        folderId
    );
    console.log(this.props.history)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
                history={this.props.history}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
  
  }
  
  
