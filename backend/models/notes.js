const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Note = mongoose.model("note", NoteSchema);

module.exports = Note;