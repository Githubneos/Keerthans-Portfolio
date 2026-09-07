import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Work } from './pages/Work'
import { Freelance } from './pages/Freelance'
import { Writing } from './pages/Writing'
import { Contact } from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="work" element={<Work />} />
        <Route path="freelance" element={<Freelance />} />
        <Route path="writing" element={<Writing />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
