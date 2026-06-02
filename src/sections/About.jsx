import FadeUp from '../components/FadeUp'

const pillars = [
  { name: 'Professional', desc: 'Strong, trustworthy brand identity built on excellence.' },
  { name: 'Consistent', desc: 'Unified solutions across all client touchpoints.' },
  { name: 'Impactful', desc: 'Measurable results that drive real organisational change.' },
  { name: 'Inclusive', desc: 'Aligned with B-BBEE and transformation objectives.' },
]

const badges = [
  { icon: '🏛', text: 'Government Trusted' },
  { icon: '🌍', text: 'Global Standards' },
  { icon: '🤝', text: 'Private Sector' },
]

export default function About() {
  return (
    <section id="about" className="bg-[#f8f7f4] py-24 px-[5%]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <FadeUp>
          <p className="section-label">About Us</p>
          <h2 className="section-title">Strengthening Organisations Through People</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed mt-6 mb-9">
            Juba Skills Development Academy is a black female owned company providing comprehensive HR consultancy services and training across various domains. We serve government departments, private companies, individuals, and Small, Medium, and Micro Enterprises (SMMEs) — delivering solutions that are trusted, consistent, and memorable.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.name} className="bg-white border-l-[3px] border-gold pl-4 py-4 pr-4 rounded-r-md">
                <p className="text-[12px] font-bold text-navy uppercase tracking-wide">{p.name}</p>
                <p className="text-[12px] text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Right */}
        <FadeUp delay={150}>
          <div className="bg-navy rounded-xl p-11 text-white relative overflow-hidden mb-5">
            {/* Gold corner triangle */}
            <div
              className="absolute bottom-0 right-0 w-28 h-20 bg-gold"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            />
            <div className="text-[64px] font-extrabold text-gold leading-none mb-2">100%</div>
            <p className="text-white/70 text-[14px] mb-8">Committed to your growth</p>
            <p className="text-[16px] italic font-light text-white/90 leading-relaxed">
              "Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training."
            </p>
            <p className="mt-5 text-[13px] font-bold text-gold tracking-wide">
              — Sinenhlanhla Khathi, Managing Director
            </p>
          </div>

          <div className="flex gap-3">
            {badges.map((b) => (
              <div key={b.text} className="bg-white border border-navy/10 rounded-md px-4 py-3.5 flex-1 text-center">
                <div className="text-2xl mb-1.5">{b.icon}</div>
                <div className="text-[11px] font-bold text-navy uppercase tracking-wide leading-tight">{b.text}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
