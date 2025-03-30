const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const Note = require('../models/notes');
const middleware = require('../middleware/middleware');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(401).json({ success: false, message: "User Already Exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, email, password: hashPassword
        });

        await newUser.save();
        return res.status(200).json({ success: true, message: "Account Created Successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error in adding user" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "User not Exists" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Wrong Credentials" });
        }

        const token = jwt.sign({ id: user._id }, "s123", { expiresIn: "5h" });

        return res.status(200).json({ success: true, token, user: { name: user.name }, message: "Login Successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error in login server" });
    }
});

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
        return res.status(200).json({ success: true, message: "Note Created Successfully", note: newNote });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Error in adding note" });
    }
});

router.get('/', middleware, async (req, res) => {
    try {
        const notes = await Note.find({ userID: req.user.id });
        return res.status(200).json({ success: true, notes });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Can't retrieve notes" });
    }
});

router.put("/:id", middleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        return res.status(200).json({ success: true, message: "Note Updated Successfully", note: updatedNote });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Can't update note" });
    }
});

router.delete("/:id", middleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNote = await Note.findByIdAndDelete(id, req.body, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        return res.status(200).json({ success: true, message: "Note Updated Successfully", note: updatedNote });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Can't delete note" });
    }
});

router.get('/verify', middleware, async(req, res)=>{
    return res.status(200).json.apply({success: true, user:req.user})
})

module.exports = router;