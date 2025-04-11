export async function generateWithGemini(prompt: string): Promise<string> {
  const url = "http://127.0.0.1:8082/completion";

  const requestBody = {
    prompt: prompt,
    n_predict: 64,
  };

  try {
    console.log("LLaMA Request URL:", url);
    console.log("LLaMA Request Body:", requestBody);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();

    console.log("LLaMA Response:", result);

    if (!result.content) {
      throw new Error("⚠️ No content returned from LLaMA server.");
    }

    return result.content.trim();
  } catch (error: any) {
    console.error("❌ LLaMA API Error:", error);
    const errorMessage = error.message || "Failed to generate text from LLaMA.";
    throw new Error(errorMessage);
  }
}
