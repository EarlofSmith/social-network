const router = require('express').Router();
// gets all functions for routes from the specified controller
const {
    getThoughts,
    getUserThoughts,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
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


// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(createReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)


module.exports = router