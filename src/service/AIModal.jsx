import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

async function main() {
  const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
        parts: [
          {
            text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. 
            Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, 
            rating, descriptions and Suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, 
            ticket Pricing, rating,  time travel for each of the location for 3 days, with best time to visit in JSON format.`,
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage('Please provide the travel plan JSON again.');
  const responseText = result.response.text();

  console.log(responseText);
}

main().catch(console.error);
