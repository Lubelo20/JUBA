import { Link } from 'react-router-dom'
import Hero from '../sections/Hero'
import Partners from '../sections/Partners'
import CTAStrip from '../sections/CTAStrip'
import FadeUp from '../components/FadeUp'
import { services } from '../data/services'

export default function Home() {
  return (
    <>
      <Hero />

      {/* About teaser */}
      <section className="bg-[#f8f7f4] py-24 px-[5%]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <p className="section-label">About Us</p>
            <h2 className="section-title">Strengthening Organisations Through People</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed mt-6 mb-8">
              Juba Skills Development Academy is a black female owned company providing comprehensive HR consultancy
              services and training across various domains. We serve government departments, private companies, and
              SMMEs — delivering solutions that are trusted, consistent, and impactful.
            </p>
            <Link to="/about" className="btn-navy">Learn More →</Link>
          </FadeUp>
          <FadeUp delay={150}>
            <div className="bg-navy rounded-xl p-11 text-white relative overflow-hidden">
              <div
                className="absolute bottom-0 right-0 w-28 h-20 bg-gold"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />
              <div className="text-[64px] font-extrabold text-gold leading-none mb-2">100%</div>
              <p className="text-white/70 text-[14px] mb-8">Committed to your growth</p>
              <p className="text-[16px] italic font-light text-white/90 leading-relaxed">
                &ldquo;Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.&rdquo;
              </p>
              <p className="mt-5 text-[13px] font-bold text-gold tracking-wide">
                — Sinenhlanhla Khathi, Managing Director
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Services preview — first 3 services */}
      <section className="bg-white py-24 px-[5%]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14">
              <div>
                <p className="section-label">What We Do</p>
                <h2 className="section-title">Our Core Services</h2>
              </div>
              <Link to="/services" className="btn-navy whitespace-nowrap">View All Services →</Link>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, i) => (
              <FadeUp key={service.id} delay={i * 60}>
                <div className="group border border-navy/10 rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(11,46,109,0.08)] hover:border-navy/20 bg-white h-full">
                  <span className="absolute top-0 left-0 w-full h-[3px] bg-gold scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  <div className="w-12 h-12 bg-navy/6 rounded-xl flex items-center justify-center text-[22px] mb-5">
                    {service.icon}
                  </div>
                  <h3 className="text-[14px] font-bold text-navy uppercase tracking-wide leading-snug mb-3">
                    {service.name}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{service.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Partners />
      <CTAStrip />
    </>
  )
}
