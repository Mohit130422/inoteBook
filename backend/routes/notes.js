const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//ROUTE 1:- fetch Login User all notes: GET /api/notes/fetchallnotes/ "login required.."
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);

    } catch (error) {  //catch error
        console.error(error.message)
        res.status(500).send("Internal Server Errors");
    }

})

//ROUTE 2:- Save Login User all notes: POST /api/notes/addnote/ "login required.."
router.get('/addnote', fetchuser, [
    body('title', 'Enter Valid Title').isLength({ min: 3 }),
    body('description', 'Description must be Atleast have 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        //distructuring of object
        const { title, description, tag } = req.body;
        //If there are errors, Return Bad Request and the errors....
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {  //catch error
        console.error(error.message)
        res.status(500).send("Internal Server Errors");
    }
})

//ROUTE 3:- Update existing login user notes: PUT /api/notes/updatenote/ "login required.."

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    //distructuring of object
    const { title, description, tag } = req.body;
    //create a new note object...
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it...
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {  //catch error
        console.error(error.message)
        res.status(500).send("Internal Server Errors");
    }
})

//ROUTE 4:- delete an existing login user notes: DELETE /api/notes/deletenote/:id "login required.."
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //find the note to be deleted and delete it...
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found")
        }

        //Allow deletion only if user owns this note...
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted Successfully", note: note });

    } catch (error) {  //catch error
        console.error(error.message)
        res.status(500).send("Internal Server Errors");
    }

})

module.exports = router