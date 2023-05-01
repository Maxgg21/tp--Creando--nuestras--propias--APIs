const express = require('express');
const router = express.Router();
const genresController = require('../../controllers/api/genresController');

router
    .get('/genres', genresController.list)
    .get('/genres/detail/:id', genresController.detail)

module.exports = router;