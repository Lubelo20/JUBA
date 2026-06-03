import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/About'
import ServicesPage from './pages/Services'
import PartnersPage from './pages/Partners'
import ContactPage from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
