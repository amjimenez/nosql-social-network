const mongoose = require('../config/connection')
const moment = require("moment");

const reactionSchema = new mongoose.Schema(
    {
        reactionId: mongoose.ObjectId,
        reactionBody: {
            minLength: 1,
            maxLength: 280,
            required: true,
            type: String
        },
        username: {
            lowercase: true,
            maxLength: 16,
            minLength: 4,
            required: true,
            trim: true,
            type: String,
        },
        createdAt: {
            default: new Date(),
            type: Date,
            get: function(createdAt) {
                return moment(createdAt).format('LLL')
            },
        },
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
    },
)

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            minLength: 1,
            maxLength: 280,
            required: true,
            type: String
        },
        username: {
            lowercase: true,
            maxLength: 16,
            minLength: 4,
            required: true,
            trim: true,
            type: String,
        },
        reactions: {
            default: [],
            type: [reactionSchema],
        },
        createdAt: {
            default: new Date(),
            type: Date,
            get: function (createdAt) {
                return moment(createdAt).format('LLL')
            },
        },
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
    },
)
thoughtSchema.virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = Thought