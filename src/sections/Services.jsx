import FadeUp from '../components/FadeUp'
import { services, additionalServices } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="bg-white py-24 px-[5%]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14">
            <div>
              <p className="section-label">What We Do</p>
              <h2 className="section-title">Comprehensive HR & Skills Solutions</h2>
            </div>
            <p className="section-sub max-w-xs">
              End-to-end services covering every aspect of workforce development, compliance, and organisational growth.
            </p>
          </div>
        </FadeUp>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service, i) => (
            <FadeUp key={service.id} delay={i * 60}>
              <div className="group border border-navy/10 rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(11,46,109,0.08)] hover:border-navy/20 bg-white h-full">
                {/* Top gold bar on hover */}
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

        {/* Additional services banner */}
        <FadeUp>
          <div className="bg-navy rounded-xl px-10 py-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalServices.map((s) => (
              <div key={s} className="flex items-start gap-2.5 text-white/80 text-[12.5px] font-medium leading-snug">
                <span className="text-gold font-bold mt-0.5">✓</span>
                {s}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
