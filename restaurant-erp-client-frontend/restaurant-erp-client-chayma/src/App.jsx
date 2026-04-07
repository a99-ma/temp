import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Reservation from './pages/Reservation'
import Menu from './pages/Menu'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/about" element={<About />} />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
  )
}

export default App