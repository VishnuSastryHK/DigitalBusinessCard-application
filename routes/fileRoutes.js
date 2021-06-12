const express = require('express');
const router = express.Router();

router.get('/editAbout', (request, response) => {
    response.render('editAbout');
});