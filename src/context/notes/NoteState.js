import React from 'react';
import NoteContext from './noteContext';
import { useState } from 'react';



const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //fetch All Notes
    const fetchNote = async () => {
        //ToDo api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5Njk5Yzk0MTJjM2EwNWU2NTAzN2E0In0sImlhdCI6MTYzNzM4NzY3NH0.7LkM9sq7KqfT9Pd0HP3_n7D3-lEko5kzaUPDRZkZ77I'

            },
        });
        const json = await response.json();
        setNotes(json)

    }
    //Add Note
    const addNote = async (title, description, tag) => {
        //ToDo api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5Njk5Yzk0MTJjM2EwNWU2NTAzN2E0In0sImlhdCI6MTYzNzM4NzY3NH0.7LkM9sq7KqfT9Pd0HP3_n7D3-lEko5kzaUPDRZkZ77I'

            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }



    //Update Note
    const editNote = async (id, title, description, tag) => {
        //TODO Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5Njk5Yzk0MTJjM2EwNWU2NTAzN2E0In0sImlhdCI6MTYzNzM4NzY3NH0.7LkM9sq7KqfT9Pd0HP3_n7D3-lEko5kzaUPDRZkZ77I'

            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        // console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        //logic edit note by client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag
                break;
            }
        }
        setNotes(newNotes);
    }


    //Delete Note
    const deleteNote = async(id) => {
          //TODO Api call
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5Njk5Yzk0MTJjM2EwNWU2NTAzN2E0In0sImlhdCI6MTYzNzM4NzY3NH0.7LkM9sq7KqfT9Pd0HP3_n7D3-lEko5kzaUPDRZkZ77I'

            },
        });
        const json = response.json();
        // console.log(json);
        // console.log("Deleting the Note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }




    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,fetchNote, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState