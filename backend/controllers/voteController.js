const Vote = require('../models/Vote');
const Poll = require('../models/Poll');

exports.getVoteResults = async (req, res) => {
    const { pollId } = req.params; // Ensure pollId is passed

    // Check if pollId is valid
    if (!pollId) {
        return res.status(400).json({ error: 'Poll ID is required' });
    }

    console.log('Poll ID:', pollId); // Log the pollId to debug

    try {
        const poll = await Poll.findOne({
            where: { id: pollId },
            include: [{
                model: Vote,
                as: 'Votes', // Alias used in the association
                attributes: ['selected_option']
            }],
        });

        if (!poll) {
            return res.status(404).json({ error: 'Poll not found' });
        }

        const voteCounts = poll.Votes.reduce((acc, vote) => {
            acc[vote.selected_option] = (acc[vote.selected_option] || 0) + 1;
            return acc;
        }, {});

        // Parse options as JSON and prepare the response
        const options = JSON.parse(poll.options);

        const results = options.map(option => ({
            name: option,
            votes: voteCounts[option] || 0,
        }));

        res.status(200).json({
            poll: {
                id: poll.id,
                topic: poll.topic,
                question: poll.question,
                options: results,
                totalVotes: poll.Votes.length,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vote results' });
    }
};

exports.castVote = async (req, res) => {
    const pollId = req.params.pollId;
    const selected_option = req.body.selected_option;

    // Log the user information to ensure authentication is successful
    console.log('Authenticated User ID:', req.user.userId);  // Access userId from JWT

    if (!pollId) {
        return res.status(400).json({ message: "Poll ID is required" });
    }

    if (!selected_option) {
        return res.status(400).json({ message: "Selected option is required" });
    }

    try {
        const poll = await Poll.findOne({ where: { id: pollId } });
        if (!poll) {
            return res.status(404).json({ message: "Poll not found" });
        }

        // Check if the user has already voted
        const existingVote = await Vote.findOne({
            where: {
                poll_id: pollId,
                voter_id: req.user.userId  // Use userId here
            }
        });

        if (existingVote) {
            return res.status(400).json({ message: "You have already voted on this poll" });
        }

        // Create a new vote
        const vote = await Vote.create({
            poll_id: pollId,
            voter_id: req.user.userId,  // Use userId here
            selected_option
        });

        return res.status(201).json({ message: "Vote cast successfully", vote });
    } catch (err) {
        console.error('Error casting vote:', err);
        return res.status(500).json({ message: "An error occurred while casting your vote" });
    }
};
