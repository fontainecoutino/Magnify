const express = require('express');
const router = express.Router();

require('dotenv').config()

// AUTH
router.get('/authenticate', (req, res, next) => {
    var client_id = process.env.CLIENT_ID;
    var scope = 'user-read-private user-read-email'
    var redirect_uri = 'http://localhost:80';
    var state = generateRandomString(16);

    localStorage.setItem(stateKey, state);

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    
    res.send(client_id)
});

// PROFILE
router.get('/profile', (req, res, next) => {
    res.send('PROFILE')
});

// VALIDATE
router.get('/validate', (req, res, next) => {
    res.send('VALIDATE')
});

module.exports = router;