import { Link } from 'react-router-dom'

const badges = [
  'Skills Development', 'HR Consulting', 'SETA Grants', 'B-BBEE Advisory',
  'Employment Equity', 'QCTO Accreditation', 'WSP & ATR', 'Tax Incentives',
]

const stats = [
  { num: 'Gov', label: 'Institutions' },
  { num: 'SME', label: 'Enterprises' },
  { num: "Int'l", label: 'Standards' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-navy flex flex-col justify-center px-[5%] pt-[120px] pb-20 relative overflow-hidden"
    >
      {/* Decorative circle */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[130%] rounded-full bg-gold/5 pointer-events-none" />
      {/* Gold bottom bar */}
      <div className="absolute bottom-0 right-0 w-2/5 h-2 bg-gold" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <div>
          <p className="flex items-center gap-3 text-gold font-semibold text-[11px] tracking-[4px] uppercase mb-5">
            <span className="block w-8 h-0.5 bg-gold" />
            Your Consulting Partner of Choice
          </p>
          <h1 className="font-extrabold text-white leading-tight mb-4" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}>
            Empowering People.<br />
            <span className="text-gold">Building</span> Futures.
          </h1>
          <p className="text-white/65 text-[15px] leading-relaxed mb-10 max-w-lg">
            Juba Consultants is a black female owned HR consultancy delivering world-class skills development, compliance, and training solutions across South Africa.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/services" className="btn-primary">Our Services</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:block">
          {/* Expertise badges */}
          <div className="bg-white/6 border border-white/12 rounded-xl p-9 mb-8">
            <p className="text-gold font-semibold text-[11px] tracking-[2px] uppercase mb-4">Core Expertise</p>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="bg-gold/15 border border-gold/30 text-gold-light text-[11px] font-medium px-3 py-1 rounded-full"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-white/10 border border-white/10 rounded-xl overflow-hidden bg-white/4">
            {stats.map((s) => (
              <div key={s.num} className="p-7 text-center bg-white/4">
                <span className="block text-[30px] font-extrabold text-gold leading-none">{s.num}</span>
                <span className="block text-[11px] text-white/50 font-medium mt-1 tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
