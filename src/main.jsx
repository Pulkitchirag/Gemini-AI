import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextProvider from './context/Context'
import { QuestionProvider } from './QuestionContext';

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <QuestionProvider>
    <App />
    </QuestionProvider>
  </ContextProvider>
)
