import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter} from "react-router";
import { AppProvider } from './components/context/AppContext.tsx';
import { UtilityProvider } from './components/context/UtilityContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UtilityProvider>
          <AppProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </AppProvider>
    </UtilityProvider>

  </StrictMode>,
)
