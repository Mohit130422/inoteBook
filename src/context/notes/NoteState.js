import React from 'react';
import NoteContext from './noteContext';
import { useState } from 'react';



const NoteState = (props) => {
    // const s1 = {
    //     "name": "stepo",
    //     "class": "5b"

    // }
    // const [state, setState] = useState(s1)
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Steve",
    //             "class": "10b"
    //         })

    //     }, 1000);
    // }
    const notesInitial = [
        {
            "_id": "6198fb4edaf5d839bb8d116d",
            "user": "619699c9412c3a05e65037a4",
            "title": "Stepo Coder updated",
            "description": "Please Like and subscribe our channel and press the bell icon",
            "tag": "Youtube and instagram",
            "date": "2021-11-20T13:42:38.864Z",
            "__v": 0
        },
        {
            "_id": "6198fba8daf5d839bb8d1173",
            "user": "619699c9412c3a05e65037a4",
            "title": "My Title",
            "description": "Please Wake Up Early in the Morning.",
            "tag": "Personal ",
            "date": "2021-11-20T13:44:08.406Z",
            "__v": 0
        },
        {
            "_id": "6198fba8daf5d839bb8d1175",
            "user": "619699c9412c3a05e65037a4",
            "title": "jarvis Note",
            "description": "Hello world!, sir may i help you.",
            "tag": "By Artificial Intellegence",
            "date": "2021-11-20T13:44:08.634Z",
            "__v": 0
        },
        {
            "_id": "6198fba8daf5d839bb8d1173",
            "user": "619699c9412c3a05e65037a4",
            "title": "My Title",
            "description": "Please Wake Up Early in the Morning.",
            "tag": "Personal ",
            "date": "2021-11-20T13:44:08.406Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState