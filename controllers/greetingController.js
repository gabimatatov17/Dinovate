const greetingService = require('../services/greetingService');

exports.generateGreeting = async (req, res) => {
    const { date, name, event, cardId } = req.body;

    try {
        const greeting = await greetingService.generateGreeting(date, name, event);
        res.json({ greeting });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating the greeting' });
    }
};

exports.saveGreeting = (req, res) => {
    const { cardId, greeting } = req.body;

    if (!req.session.greetings) {
        req.session.greetings = {};
    }

    // Save greeting for the specific card in the session
    req.session.greetings[cardId] = greeting;
    res.json({ success: true });
};
