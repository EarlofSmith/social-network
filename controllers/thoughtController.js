const { Thought, User, Reaction } = require('../models');

module.exports = {

    // get all thoughts with reactions
    getThoughts(req,res) {
        Thought.find({})
            // .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((user) =>
                !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // get thoughts by id
    getUserThoughts (req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            // .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then((thought) =>
                !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(userThought => {
                 console.log(req.body)
                User.findOneAndUpdate(
                   
                    { _id: req.body.userId },
                    { $push: {thoughts: userThought._id} },
                    { runValidators: true, new: true }
                )
                    .then((user)=>
                    !user
                        ? res.status(404).json({message:'No user with that ID'})
                        :res.json(user)
                    )
                    .catch(err => res.status(500).json(err));
            })
    },


    // edit thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body },
            {new:true}
        )
            .then((user)=>
            !user
            ? res.status(404).json({message:'No  with that ID'})
            :res.json(user)
            )
            .catch(err => res.status(500).json(err));
    },

    // delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then(user => {
            !user
                ? res.status(404).json({ message: 'No user with this ID!' })
                : User.findOneAndUpdate(
                  { username: user.username },
                  { $pull: {thoughts: req.params.thoughtId} },
                  { runValidators: true, new: true },
                )
                .then((user) =>
                  !user
                    ? res.status(404).json({ message: 'Thought has been deleted!' })
                    : res.json(user)
                )
                .catch((err) => {
                  console.log(err);
                  res.status(500).json(err);
                });
           })
          .catch((err) => res.status(500).json(err));
    },

    // create a reaction
    createReaction(req, res) {
        console.log(req.body)
        console.log(req.params)
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            { runValidators: true, new: true },
        )
            .then((user) =>
            !user
            ? res.status(404).json({ message: 'No thought with this ID!' })
            : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
             });
    },

    // delete a reaction
    deleteReaction(req, res) {
        console.log(req.params)
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {new:true},
        )
            .then((user) =>
            !user
            ? res.status(404).json({ message: 'No thought with this ID!' })
            : res.json({message: 'Reaction successfully deleted!'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
             });
    }
}