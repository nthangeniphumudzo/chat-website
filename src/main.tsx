import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Fire-and-forget visitor tracking — must never throw or block rendering
fetch('https://chatopscontainer.grayplant-ccb9b969.southafricanorth.azurecontainerapps.io/api/website-visitors/track', {
  method: 'POST',
  keepalive: true,
}).catch(() => {})
/* eslint-disable @typescript-eslint/no-non-null-assertion */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
