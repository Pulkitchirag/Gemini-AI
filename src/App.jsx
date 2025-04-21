// import { useState } from 'react';
import './index.css';
import axios from 'axios';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/sidebar/Main/Main';
import { useQuestion } from './QuestionContext'; // Import the custom hook

function App() {
  const { question, setQuestion, setAnswer } = useQuestion(); // Use the context

  async function generateAnswer() {
    setAnswer("Loading...");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBQlPagU0qwwQInDCmPagrVpX7qMre9DZ8",
        method: "post",
        data: {
          "contents": [{
            "parts": [{ "text": question }]
          }]
        }
      });

      if (response.status === 200) {
        setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']); 
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        setAnswer("Error generating answer. Please try again.");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setAnswer("Error generating answer. Please try again.");
    }
  }

  return (
    <>
      <Sidebar />
      <Main />
      {/* Uncomment the following lines to enable user input */}
      {/* <h1>Chat-AI</h1> */}
      {/* <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows="10" cols="20"></textarea> */}
      {/* <button onClick={generateAnswer}>Generate</button> */}
      {/* <pre>{answer}</pre> */}
    </>
  );
}

export default App;