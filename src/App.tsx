import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Quiz from './pages/Quiz'
import Resultado from './pages/Resultado'
import Checkout from './pages/Checkout'
import Upsell from './pages/Upsell'
import Obrigado from './pages/Obrigado'
import Protocolo from './pages/Protocolo'
import SonhosLanding from './pages/SonhosLanding'
import SonhosAnalise from './pages/SonhosAnalise'
import Relatorio from './pages/Relatorio'
import Admin from './pages/Admin'

export default function App() {
  const loc = useLocation()
  const showAdminLink = loc.pathname !== '/admin'
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/upsell" element={<Upsell />} />
        <Route path="/protocolo" element={<Protocolo />} />
        <Route path="/sonhos" element={<SonhosLanding />} />
        <Route path="/sonhos/analise" element={<SonhosAnalise />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/obrigado" element={<Obrigado />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Landing />} />
      </Routes>
      {showAdminLink && (
        <Link
          to="/admin"
          className="fixed bottom-4 right-4 z-50 rounded-full glass px-4 py-2 text-xs font-semibold text-white/70 hover:text-white"
        >
          ⚙️ Admin
        </Link>
      )}
    </div>
  )
}
