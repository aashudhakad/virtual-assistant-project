import axios from "axios"
import dotenv from "dotenv";
dotenv.config();
const geminiResponse=async (command,assistantName,userName)=>{
try {
    const apiUrl=process.env.GEMINI_API_URL
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month"|"calculator-open" | "instagram-open" |"facebook-open" |"weather-show"
  ,
  "userInput": "<original user input>" {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search karne ko bola hai to userInput me only bo search baala text jaye,

  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": determine the intent of the user.
- "userinput": original sentence the user spoke.
- "response": A short voice-friendly reply, e.g., "Sure, playing it now", "Here's what I found", "Today is Tuesday", etc.

Type meanings:
- "general": if it's a factual or informational question. aur agar koi aisa question puchta hai jiska answer tume pata hai usko bhi general ki category me rakho bas short answer dena
- "google-search": if user wants to search something on Google .
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play a video or song.
- "calculator-open": if user wants to  open a calculator .
- "instagram-open": if user wants to  open instagram .
- "facebook-open": if user wants to open facebook.
-"weather-show": if user wants to know weather
- "get-time": if user asks for current time.
- "get-date": if user asks for today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks for the current month.

Important:
- Use ${userName} agar koi puche tume kisne banaya 
- Only respond with the JSON object, nothing else.


now your userInput- ${command}
`;





    const result=await axios.post(apiUrl,{
    "contents": [{
    "parts":[{"text": prompt}]
    }]
    })
return result.data.candidates[0].content.parts[0].text
} catch (error) {
    console.log(error)
}
}

export default geminiResponse

// export default async function geminiResponse(command, assistantName, userName) {
//   try {
//     const apiUrl = process.env.GEMINI_API_URL;
    // Remove assistant name from the command for cleaner parsing
//     const cleanCommand = command.replace(new RegExp(assistantName, 'i'), '').trim();

//     const prompt = `You are a voice-enabled assistant named ${assistantName}, created by ${userName}.\n` +
//       `Parse the following user input and return **only** a JSON object with keys:\n` +
//       `  type: one of [general, google-search, youtube-search, youtube-play, get-time, get-date, get-day, get-month, calculator-open, instagram-open, facebook-open, weather-show]\n` +
//       `  userInput: the exact text to send to external services (e.g. "IIIT Gwalior"), omit your name.\n` +
//       `  response: a short voice-friendly reply.\n` +
//       `Example output:\n` +
//       `{
// ` +
//       `  "type": "youtube-search",
// ` +
//       `  "userInput": "IIIT Gwalior",
// ` +
//       `  "response": "Sure, searching YouTube for IIIT Gwalior now."
// ` +
//       `}\n` +
//       `Now parse this input: ${cleanCommand}`;

//     const apiRes = await axios.post(apiUrl, { contents: [{ parts: [{ text: prompt }] }] });
//     return apiRes.data.candidates[0].content.parts[0].text;
//   } catch (err) {
//     console.error("Gemini API error", err);
//     throw err;
//   }
// }