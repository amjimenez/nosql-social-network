const {Thought, User} = require('../../models')

module.exports.getAllThoughts = (req, res) => {
    Thought.find({}, (err, thoughts) => {
        res.json(thoughts)
    })
}

module.exports.getThoughtById = (req, res) => {
    Thought.findById(req.params.id, (err, thought) => {
        res.json(thought)
    })
}

module.exports.createThought = (req, res) => {
    const thought = new Thought(req.body)
    thought.save((err) => {
        let push = {
            $push: {
                thoughts: [thought.id],
            }
        }
        User.findByIdAndUpdate(req.body.userId, push, (err, user) => {
            User.findById(req.body.userId, (err, user) => {
                res.json(thought)
            })
        })
    })
}

module.exports.updateThought = (req, res) => {
    Thought.findByIdAndUpdate(req.params.id, req.body, (err, thought) => {
        User.findByIdAndUpdate(req.body.userId, pull, (err, user) => {
            User.findById(req.body.userId, (err, user) => {
                res.json(thought)
            })
        })
    })
}

module.exports.deleteThought = (req, res) => {
    Thought.findByIdAndDelete(req.params.id, (err, thought) => {
        let pull = {
            $pull: {
                thoughts: {'_id': req.params.thought_id},
            }
        }
    
        User.findByIdAndUpdate(req.body.userId, pull, (err, user) => {
            User.findById(req.body.userId, (err, user) => {
                res.json(thought)
            })
        })
    })
}

module.exports.addReaction = (req, res) => {
    let push = {
        $push: {
            reactions: [req.body],
        }
    }
    Thought.findByIdAndUpdate(req.params.id, push, (err, thought) => {
        Thought.findById(req.params.id, (err, thought) => {
            res.json(thought)
        })
    })
}

module.exports.removeReaction = (req, res) => {
    let pull = {
        $pull: {
            thoughts: {'_id': req.params.reaction_id},
        }
    }

    Thought.findByIdAndUpdate(req.params.id, pull, (err, thought) => {
        Thought.findById(req.params.id, (err, thought) => {
            res.json(thought)
        })
    })
}