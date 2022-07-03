const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require("../../controllers/api/ThoughtController");
const router = require('express').Router()

router.get('/', getAllThoughts)
router.get('/:id', getThoughtById)
router.post('/', createThought)
router.put('/:id', updateThought)
router.delete('/:id', deleteThought)

router.post('/:id/reactions', addReaction)
router.delete('/:id/reactions/:reaction_id', removeReaction)

module.exports = router