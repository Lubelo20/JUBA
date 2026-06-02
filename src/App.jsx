import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Partners from './sections/Partners'
import CTAStrip from './sections/CTAStrip'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="font-poppins">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Partners />
        <CTAStrip />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
