const { Schema, model, } = require('mongoose');
const reactionSchema = require('./Reaction')
const moment = require('moment');
// creates schema for all thoughts to follow
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLenght: 1,
            maxLenght: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => moment(timeStamp).format('dddd, MMMM Do YYYY, h:mm:ss ')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,
    }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per post
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
// initialzie model
  const Thought = model('thought', thoughtSchema);

//   exports model for axcess through mongoose
  module.exports = Thought;