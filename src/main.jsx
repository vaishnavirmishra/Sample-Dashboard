import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Root(){

  return (
    <StrictMode>
      <div className='hidden lg:block'>
        <App />
      </div>
      <div className='lg:hidden flex items-center justify-center flex-col h-screen'>
        <img src="/logo.png" alt="logo image" />
        Please Access this page on desktop
      </div>
      {/* <App/> */}
    </StrictMode> 
  )
}

createRoot(document.getElementById('root')).render(<Root />)
