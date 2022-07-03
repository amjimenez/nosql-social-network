const mongoose = require('../config/connection')

// overly simple email regex
const emailRegEx = /^.+@.+/

const schema = new mongoose.Schema(
    {
        username: {
            lowercase: true,
            maxLength: 16,
            minLength: 4,
            required: true,
            trim: true,
            type: String,
            unique: true,
        },
        email: {
            lowercase: true,
            required: true,
            trim: true,
            type: String,
            unique: true,
            validate: {
                validator: function(v) {
                    return emailRegEx.test(v)
                },
            },
        },
        friends: {
            default: [],
            type: [String],
        },
        thoughts: {
            default: [],
            type: [String],
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true
        },
    },
)
schema.virtual('friendCount').get(function() {
    return this.friends.length
})
schema.virtual('thoughtCount').get(function() {
    return this.thoughts.length
})

const User = mongoose.model('User', schema)

module.exports = User