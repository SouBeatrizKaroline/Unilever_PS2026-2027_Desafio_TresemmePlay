/* Main App Component - Handles routing (using react-router-dom), query client and other providers */
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { GameProvider } from './context/GameContext'
import Layout from './components/Layout'
import Index from './pages/Index'
import JourneyPage from './pages/JourneyPage'
import HomePage from './pages/HomePage'
import MissionDetailPage from './pages/MissionDetailPage'
import AboutPage from './pages/AboutPage'
import NotFound from './pages/NotFound'

const App = () => (
  <HashRouter>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/jornada" element={<JourneyPage />} />
            <Route path="/inicio" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/missao/:missionId" element={<MissionDetailPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </GameProvider>
  </HashRouter>
)

export default App
