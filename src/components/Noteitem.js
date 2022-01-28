import React, { useContext} from 'react'
import noteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
    const context = useContext(noteContext);
    // console.log(context);
    const {deleteNote} = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fas fa-pen-square mx-2" onClick={()=>{updateNote(note)}}></i>
                        <i className="fas fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>                        
                    </div>

                    <p className="card-text">{note.description}</p>
                    <p className="card-text"><i className="fas fa-tag mx-2"></i>{note.tag}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
