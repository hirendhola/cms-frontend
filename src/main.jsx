import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
    <Analytics />
    <SpeedInsights />
  </Router>
)
