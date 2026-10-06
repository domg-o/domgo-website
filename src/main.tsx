import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'
import './portfolio.css'
import './content-sections.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
