import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteContext from "../context/context";
import './Note.css'
import ErrorBoundries from "../ErrorBoundries";
import PropTypes from 'prop-types';

export default class Note extends React.Component {
  static contextType = NoteContext;
  handleDelete = e => {
    e.preventDefault();
    this.context.deleteNote(this.props.id);  
    this.props.history.push("/");
  }

  render() {
       
    return (
      <div className='Note'>
            <ErrorBoundries>
        <h2 className='Note__title'>      
          <Link to={`/note/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <button onClick= {this.handleDelete}  className='Note__delete' type='button'>
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(this.props.modified, 'Do MMM YYYY')}
            </span>
          </div>
        </div>
        </ErrorBoundries>
      </div>
    )
  }
}
Note.propTypes = {  
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,  
  
}

 
  
