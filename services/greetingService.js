// services/greetingService.js

require('dotenv').config();  // Load environment variables from .env file

// Import OpenAI SDK (Ensure you have the correct version installed)
const OpenAI = require('openai');  // Correct import for recent versions of the SDK

// Set up OpenAI API configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Ensure your API key is properly set
});

exports.generateGreeting = async (date, name, event) => {
    try {
        // Call OpenAI to generate a greeting based on the inputs
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: 'user', content: `Create a greeting for ${name} for the event of ${event} happening on ${date}.` }
            ],
            max_tokens: 50,
        });

        // Extract and return the generated greeting
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        throw new Error('Failed to generate greeting');
    }
};
