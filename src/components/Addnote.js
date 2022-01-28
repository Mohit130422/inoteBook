import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
    const [note, setNote] = useState({title:"",description:"", tag:""})
    const context = useContext(noteContext);
    // console.log(context);
    const { addNote } = context;
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title:"",description:"", tag:""})
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note in your inotebook..</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Notes Title</label>
                    <input type="text" className="form-control" id="title" name="title"  minLength={5} value={note.title} required onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" minLength={5} value={note.description} required onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Add Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
                </div>
                <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Create Note</button>
            </form>
        </div>
    )
}

export default Addnote
