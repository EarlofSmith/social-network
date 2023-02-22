const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionbody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => moment(timeStamp).format('dddd, MMMM Do YYYY, h:mm:ss ')
        },
    },

    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

// initialzie model
const Reaction = model('reaction', reactionSchema);

//   exports model for axcess through mongoose
  model.exports = Reaction;