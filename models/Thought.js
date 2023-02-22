const { Schema, model } = require('mongoose');

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
        reactions: [{type: Schema.Types.ObjectId, ref: 'reaction'}],
    },
    {
        toJSON: {
            virtuals: true,
          },
          id: false,
    }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per post
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

  const Thought = model('thought', thoughtSchema);

  model.exports = Thought;