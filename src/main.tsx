import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.scss'
import App from './App.tsx'
import AccountsProvider from './contexts/AccountsContext/AccountsProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccountsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AccountsProvider>
  </StrictMode>,
)
