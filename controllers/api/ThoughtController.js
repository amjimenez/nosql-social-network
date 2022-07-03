const {Thought} = require('../../models')

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
        res.json(thought)
    })
}

module.exports.updateThought = (req, res) => {
    Thought.findByIdAndUpdate(req.params.id, req.body, (err, thought) => {
        Thought.findById(req.params.id, (err, thought) => {
            res.json(thought)
        })
    })
}

module.exports.deleteThought = (req, res) => {
    Thought.findByIdAndDelete(req.params.id, (err, thought) => {
        res.json({"deleted": true})
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