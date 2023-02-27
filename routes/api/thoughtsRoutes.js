const router = require('express').Router();

const {
    getThoughts,
    getUserThoughts,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController');


//  /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(createThought)


//  /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getUserThoughts)
    .put(updateThought)
    .delete(deleteThought)


module.exports = router