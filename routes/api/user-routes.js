const router = require('express').Router()
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend, addThought, removeThought
} = require("../../controllers/api/UserController");

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

router.post('/:id/friends', addFriend)
router.delete('/:id/friends/:friend_id', removeFriend)
router.post('/:id/thoughts', addThought)
router.delete('/:id/thoughts/:thought_id', removeThought)

router.post

module.exports = router