// C:\Users\KIIT\WebstormProjects\PollPixel\backend\routes\voteRoutes.js
const express = require('express');
const voteController = require('../controllers/voteController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/:pollId/cast', authenticate, voteController.castVote);
router.get('/:pollId/results', authenticate, voteController.getVoteResults);

module.exports = router;
