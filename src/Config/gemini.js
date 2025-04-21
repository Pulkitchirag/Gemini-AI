const apiKey = 'AIzaSyBsKf_9Oa8FPvU-bOGLytdHUN5f5JwcEjs'; // Replace with your actual API key

let requestCount = 0;
let requestStartTime = Date.now();
const MAX_REQUESTS_PER_MINUTE = 15;

async function main(prompt) {
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: 'text/plain',
  };

  const data = {
    generationConfig,
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
        ],
      },
    ],
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent?key=${apiKey}`;

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  let attempts = 0;
  const maxAttempts = 5; // Number of attempts before giving up
  let retryDelay = 1000; // Initial delay in milliseconds (1 second)

  while (attempts < maxAttempts) {
    const currentTime = Date.now();

    // Reset the request count every minute
    if (currentTime - requestStartTime >= 60000) {
      requestCount = 0;
      requestStartTime = currentTime;
    }

    // Check if we are within the limits
    if (requestCount < MAX_REQUESTS_PER_MINUTE) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.status === 429) {
          // If rate limit is exceeded, wait and retry
          throw new Error('Rate limit exceeded');
        }

        const result = await response.json();
        requestCount++; // Increment request count on successful request
        return result; // Exit on success
      } catch (error) {
        if (error.message === 'Rate limit exceeded' && attempts < maxAttempts) {
          console.log(`Rate limit exceeded. Retrying in ${retryDelay / 1000} seconds...`);
          attempts++;
          await delay(retryDelay); // Wait before retrying
          retryDelay *= 2; // Exponential backoff
        } else {
          console.error('Error calling Gemini API:', error);
          break; // Exit loop if there's any other error
        }
      }
    } else {
      console.log("Rate limit exceeded. Please wait before making more requests.");
      await delay(60000); // Wait for a minute before retrying
    }
  }
}

export default main;