const express = require('express');
const Note = require('../models/notes');
const middleware = require('../middleware/middleware');

const router = express.Router();

router.post('/add', middleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description are required" });
        }

        const newNote = new Note({
            title,
            description,
            userID: req.user.id
        });
        await newNote.save();
        return res.status(200).json({ success: true, message: "Note Created Successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error in adding note" });
    }
});


module.exports = router;
