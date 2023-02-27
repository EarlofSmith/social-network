const { Thought, User } = require('../models');

module.exports = {

    // get all thoughts with reactions
    getThoughts(req,res) {
        Thought.find({})
            // .populate({path: 'reactions', select: '-__v' })
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


    // edit thought
    updateThought(req, res) {
        console.log(req.params)
        console.log(req.body)
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

    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then(user => {
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
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
    }

}