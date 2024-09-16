import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"


createRoot(document.getElementById('root')).render(
  <Router>
    <App />
    <Analytics />
  </Router>
)
