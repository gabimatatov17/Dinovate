const { Configuration, OpenAIApi } = require('openai');

// Set up OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateGreeting = async (date, name, event) => {
  try {
    // Call OpenAI to generate a greeting based on the inputs
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create a greeting for ${name} for the event of ${event} happening on ${date}.`,
      max_tokens: 50,
    });

    // Extract and return the generated greeting
    return completion.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error('Failed to generate greeting');
  }
};
