import React, { createContext, useEffect, useState } from 'react';
import main from './../Config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
  const [generatedContent, setGeneratedContent] = useState(null);
  const [error, setError] = useState(null);

  const onSent = async (prompt) => {
    try {
      const result = await main(prompt);
      setGeneratedContent(result); // Store the generated content
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err); // Handle any errors
      console.error("Error generating content:", err);
    }
  };

  useEffect(() => {
    onSent("What is React JS");
  }, []);

  const contextValue = {
    generatedContent,
    error,
    onSent, // Expose the onSent function to the context
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;