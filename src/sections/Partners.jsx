import FadeUp from '../components/FadeUp'
import { partners } from '../data/services'

export default function Partners() {
  return (
    <section id="partners" className="bg-[#f8f7f4] py-24 px-[5%]">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="section-label justify-center">Who We Serve</p>
            <h2 className="section-title">We Partner With</h2>
            <p className="section-sub mx-auto">
              Delivering tailored solutions across government, private sector, and international organisations to drive sustainable transformation.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {partners.map((p, i) => (
            <FadeUp key={p.title} delay={i * 100}>
              <div className="bg-white rounded-xl p-9 text-center border border-navy/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(11,46,109,0.08)] h-full">
                <div className="w-16 h-16 bg-navy/7 rounded-full flex items-center justify-center text-[28px] mx-auto mb-5">
                  {p.icon}
                </div>
                <h3 className="text-[15px] font-bold text-navy uppercase tracking-wide mb-3">{p.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{p.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
