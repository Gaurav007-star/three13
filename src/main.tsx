import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: '!bg-[#3D0000]/2 backdrop-blur-md !border !border-brand-dark/40 !shadow-sm !text-brand-dark font-sans rounded-xl p-4',
          title: 'font-semibold tracking-[0.1em] uppercase text-sm',
          description: '!text-brand-dark/70 text-xs mt-1',
          success: '!text-brand-light',
          error: '!bg-red-50/95 !border-red-200 !text-red-900',
          info: '!bg-blue-50/95 !border-blue-200 !text-blue-900',
          warning: '!bg-amber-50/95 !border-amber-200 !text-amber-900',
        }
      }}
    />
  </StrictMode>,
)
