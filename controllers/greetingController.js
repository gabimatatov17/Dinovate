const greetingService = require('../services/greetingService');

exports.generateGreeting = async (req, res) => {
  const { date, name, event } = req.body;

  try {
    // Call the service to generate the greeting
    const greeting = await greetingService.generateGreeting(date, name, event);
    res.json({ greeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating the greeting' });
  }
};
