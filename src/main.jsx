import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DarkProvider } from './components/Context.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkProvider>
        <App />
    </DarkProvider>
  </StrictMode>
)
