import React, { createContext, useContext, useState } from 'react';

// Create a context
const QuestionContext = createContext();

// Create a provider component
export const QuestionProvider = ({ children }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(""); // Add answer state

  return (
    <QuestionContext.Provider value={{ question, setQuestion, answer, setAnswer }}>
      {children}
    </QuestionContext.Provider>
  );
};

// Create a custom hook to use the QuestionContext
export const useQuestion = () => {
  return useContext(QuestionContext);
};