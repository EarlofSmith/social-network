const router = require('express').Router();

const {
    getThoughts,
    getUserThoughts,
    createThought,
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

module.exports = router