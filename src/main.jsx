import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PlayerContextProvider from './context/PlayerContext.jsx'
import ToastProvider from './context/ToastContext.jsx'

import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PlayerContextProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </PlayerContextProvider>
    </BrowserRouter>
  </StrictMode>
)
