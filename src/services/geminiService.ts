import { Groq } from 'groq-sdk';

export async function generateWithGemini(prompt: string): Promise<string> {
  // Initialize the Groq client with your API key
  const groq = new Groq({ apiKey: process.env.YOUR_SECRET });

  // Define the messages array with explicit typing for Groq SDK compatibility
  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: "user", content: prompt }
  ];

  // Set up the request parameters
  const requestParams = {
    model: "llama-3.3-70b-versatile", // Specify the model (verify availability with your API key)
    messages: messages,
    max_completion_tokens: 64 // Limits the response length
  };

  try {
    // Log the request for debugging (optional)
    console.log("Groq Request:", requestParams);

    // Make the API call to Groq
    const response = await groq.chat.completions.create(requestParams);

    // Log the response for debugging (optional)
    console.log("Groq Response:", response);

    // Extract the generated content
    const content = response.choices[0].message.content;

    // Check if content exists
    if (!content) {
      throw new Error("⚠️ No content returned from Groq API.");
    }

    // Return the trimmed content
    return content.trim();
  } catch (error: any) {
    // Handle and log any errors
    console.error("❌ Groq API Error:", error);
    const errorMessage = error.message || "Failed to generate text from Groq API.";
    throw new Error(errorMessage);
  }
}