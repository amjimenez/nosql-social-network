const {User} = require('../../models')

module.exports.getAllUsers = function(req, res) {
    User.find({}, (err, users) => {
        res.json(users)
    })
}

module.exports.getUserById = function(req, res) {
    User.findById(req.params.id, (err, user) => {
        res.json(user)
    })
}

module.exports.createUser = function(req, res) {
    const user = new User(req.body)
    user.save((err) => {
        res.json(user)
    })
}

module.exports.updateUser = function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    })
}

module.exports.deleteUser = function(req, res) {
    User.findByIdAndDelete(req.params.id, (err, user) => {
        res.json({"deleted": true})
    })
}

module.exports.addFriend = (req, res) => {
    let push = {
        $push: {
            friends: [req.body._id],
        }
    }
    User.findByIdAndUpdate(req.params.id, push, (err, user) => {
        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    })
}

module.exports.removeFriend = (req, res) => {
    let pull = {
        $pull: {
            friends: {'_id': req.params.friend_id},
        }
    }
    User.findByIdAndUpdate(req.params.id, pull, (err, user) => {
        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    })
}

module.exports.addThought = (req, res) => {
    let push = {
        $push: {
            thoughts: [req.body._id],
        }
    }
    User.findByIdAndUpdate(req.params.id, push, (err, user) => {
        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    })
}

module.exports.removeThought = (req, res) => {
    let pull = {
        $pull: {
            thoughts: {'_id': req.params.thought_id},
        }
    }

    User.findByIdAndUpdate(req.params.id, pull, (err, user) => {
        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    })
}