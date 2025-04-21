import React from 'react';
import './Main.css';
import { assets } from '../../../assets/assets';
import { useQuestion } from '../../../QuestionContext'; // Import the custom hook

const Main = () => {
  const { question, setQuestion, setAnswer } = useQuestion(); // Use the context

  const handleGenerateAnswer = () => {
    // Call the function to generate an answer
    setAnswer("Generating answer..."); // Optional: Set a loading state
    // Here you would typically call the function to generate the answer
    // For example, you could lift the generateAnswer function to the context or pass it down from App
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" className='img' />
      </div>
      <div className="main-container">
        <div className="greet">
          <p><span>Hello, Dev</span></p>
          <p>How can I help you today?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest top 10 best action anime</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>yokoso, watashino soul society</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>How to copy and import crosshair in valo</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Best places to visit in Jaipur</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Ask Gemini"
              value={question} // Set the input value to the question state
              onChange={(e) => setQuestion(e.target.value)} // Update the question state on change
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="" onClick={handleGenerateAnswer} /> {/* Call the function on click */}
            </div>
          </div>
          <p className='bottom-info'>Gemini may display inaccurate info, including people, so double-check its responses. Your privacy and Gemini Apps</p>
        </div>
      </div>
    </div>
  );
}

export default Main;