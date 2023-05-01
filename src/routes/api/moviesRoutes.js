const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/api/moviesController');

router
    .get('/movies', moviesController.list)
    .get('/movies/detail/:id', moviesController.detail)
    .get('/movies/newMovies', moviesController.new)
    .post('/movies/create', moviesController.create)
    .delete('/movies/delete/:id', moviesController.destroy)
    

module.exports = router;