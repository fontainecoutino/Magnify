const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

// EXPRESS
const app = express();
const port = 3000;

// CORS
app.use(cors());

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

// BODY PARSER
app.use(bodyParser.json());

// --- ROUTES ---
app.get('/', (req, res) => {
    res.send('Invalid endpoint')
});

const users = require('./routes/users/users.js');
app.use('/users', users);

// START SERVER
app.listen(port, () => {
    console.log('Server started on port ' + port)
})