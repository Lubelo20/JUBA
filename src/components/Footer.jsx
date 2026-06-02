import { contact } from '../data/services'

const serviceLinks = [
  'Skills Audit', 'WSP & ATR', 'Employment Equity',
  'SETA Grants', 'B-BBEE Advisory', 'QCTO Accreditation',
]

export default function Footer() {
  return (
    <footer className="bg-[#071d45] text-white pt-16 pb-8 px-[5%]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="text-[24px] font-extrabold tracking-[4px] mb-1">JUBA</div>
          <div className="text-[8px] font-semibold text-gold tracking-[3px] border-t border-b border-gold py-0.5 inline-block mb-4 uppercase">
            Consultants
          </div>
          <p className="text-white/50 text-[13px] leading-relaxed mb-6">
            Empowering Excellence. Nurturing Potential. Your Gateway to Strategic HR Solutions and Professional Training.
          </p>
          <div className="flex gap-2">
            {['in', 'fb', 'tw'].map((s) => (
              <a
                key={s}
                href="#"
                className="w-9 h-9 bg-white/10 rounded flex items-center justify-center text-white/60 text-xs font-bold hover:bg-gold hover:text-navy transition-all duration-200"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-[11px] font-bold text-gold tracking-[2px] uppercase mb-5">Services</p>
          <ul className="flex flex-col gap-2.5">
            {serviceLinks.map((s) => (
              <li key={s}>
                <a href="#services" className="text-white/50 text-[13px] hover:text-gold transition-colors duration-200">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-[11px] font-bold text-gold tracking-[2px] uppercase mb-5">Company</p>
          <ul className="flex flex-col gap-2.5">
            {['About Us', 'Our Partners', 'Contact'].map((s) => (
              <li key={s}>
                <a href={`#${s.toLowerCase().replace(' ', '')}`} className="text-white/50 text-[13px] hover:text-gold transition-colors duration-200">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[11px] font-bold text-gold tracking-[2px] uppercase mb-5">Contact</p>
          <ul className="flex flex-col gap-2.5">
            <li><a href={`tel:${contact.phone}`} className="text-white/50 text-[13px] hover:text-gold transition-colors">{contact.phone}</a></li>
            <li><a href={`mailto:${contact.email}`} className="text-white/50 text-[13px] hover:text-gold transition-colors">{contact.email}</a></li>
            <li><span className="text-white/50 text-[13px]">{contact.address}</span></li>
            <li><a href="#" className="text-white/50 text-[13px] hover:text-gold transition-colors">{contact.website}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-[12px] text-white/35">
        <span>© {new Date().getFullYear()} Juba Consultants (Pty) Ltd. All rights reserved.</span>
        <span>Juba Skills Development Academy</span>
      </div>
    </footer>
  )
}
