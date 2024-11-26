// C:\Users\KIIT\WebstormProjects\PollPixel\backend\controllers\pollController.js
const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const { Op } = require('sequelize');

// Get Poll by ID
exports.getPollById = async (req, res) => {
    const { pollId } = req.params;

    try {
        const poll = await Poll.findOne({ where: { id: pollId } });

        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        res.status(200).json({
            id: poll.id,
            topic: poll.topic,
            question: poll.question,
            options: poll.options, // Poll model ensures `options` is an array
            totalVotes: await Vote.count({ where: { poll_id: pollId } }),
            end_time: poll.end_time,
        });
    } catch (error) {
        console.error('Failed to fetch poll:', error);
        res.status(500).json({ error: 'Failed to fetch poll' });
    }
};
// Delete Poll
exports.deletePoll = async (req, res) => {
    const { pollId } = req.params;

    try {
        const poll = await Poll.findOne({ where: { id: pollId } });

        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        await poll.destroy();
        res.status(200).json({ message: 'Poll deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete poll' });
    }
};

// Create Poll
exports.createPoll = async (req, res) => {
    const { topic, question, options, endDate, endTime } = req.body;

    try {
        // Combine endDate and endTime into a single ISO timestamp
        const end_time = new Date(`${endDate}T${endTime}`);

        // Ensure options are valid
        if (!topic || !question || !options || options.length < 2) {
            return res.status(400).json({ error: 'Poll must have a topic, question, and at least two options.' });
        }

        // Check if the end time is valid
        if (isNaN(end_time.getTime())) {
            return res.status(400).json({ error: 'Invalid end date or time format.' });
        }

        // Create Poll
        const poll = await Poll.create({
            topic,
            question,
            options,
            end_time, // Store combined timestamp
        });

        res.status(201).json({ message: 'Poll created successfully', poll });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create poll' });
    }
};


// Get Ongoing Polls
exports.getOngoingPolls = async (req, res) => {
    try {
        const polls = await Poll.findAll({
            where: { end_time: { [Op.gt]: new Date() } },
        });
        res.status(200).json(polls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch polls' });
    }
};

// Get Poll Results
exports.getPollResults = async (req, res) => {
    const { pollId } = req.params;

    try {
        const poll = await Poll.findOne({
            where: { id: pollId },
            include: [{ model: Vote, as: 'Votes' }],
        });

        if (!poll) return res.status(404).json({ error: 'Poll not found' });

        const results = JSON.parse(poll.options).map((option) => ({
            option,
            votes: poll.Votes.filter((v) => v.selected_option === option).length,
        }));

        res.status(200).json({
            topic: poll.topic,
            question: poll.question,
            results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
};
