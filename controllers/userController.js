const { Thought, User } = require('../models');

module.exports = {
    // get all users
  getUsers(req, res) {
    User.find({})
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
//   get user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate([
        {path: 'thoughts', select: '-__v'},
        {path: 'friends', select: '-__v'}
      ])
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.status(500).json(err));
  },
//   update user
updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//   delete user
deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : User.updateMany(
              { _id: { $in: user.friends } },
              { $pull: { friends: req.params.userId } },
            )
      )
      .then((user) =>
        !user
          ? res.status(404)
          : Thought.deleteMany({username: user.username})
          .then(()=> {
          res.json({ message: 'User successfully deleted!' })
          })
          
      )
      .catch((err) => res.status(500).json(err));
  },
// add a friend
  addFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {$addToSet: {friends: req.params.friendId}},
      { runValidators: true, new: true },
    )
    .then(user => {
      !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId} },
            { runValidators: true, new: true },
          )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
     })
    .catch((err) => res.status(500).json(err));
  },

  // remove a friend
  deleteFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {$pull: {friends: req.params.friendId}},
      { runValidators: true, new: true },
    )
    .then(user => {
      !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId} },
            { runValidators: true, new: true },
          )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
     })
    .catch((err) => res.status(500).json(err));
  },
  
};
