// C:\Users\KIIT\WebstormProjects\PollPixel\backend\routes\pollRoutes.js
const express = require('express');
const pollController = require('../controllers/pollController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/create', authenticate, pollController.createPoll);
router.get('/ongoing', authenticate, pollController.getOngoingPolls);
router.get('/:pollId', authenticate, pollController.getPollById);
router.get('/results/:pollId', authenticate, pollController.getPollResults);
router.delete('/:pollId', authenticate, pollController.deletePoll);

module.exports = router;
