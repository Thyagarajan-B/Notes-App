const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth.js');
const note = require('./routes/note.js');
const connectDB = require('./DB/db.js');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/api/auth/', auth);
app.use('/api/note/', note);

app.listen(3001, () => {
    connectDB();
    console.log("Running on port 3001 🚀");
});
