import FadeUp from '../components/FadeUp'
import { contact } from '../data/services'
import { useState } from 'react'

const serviceOptions = [
  'Skills Audit',
  'Employment Skills Plan (WSP)',
  'Employment Equity Plan & Reporting',
  'SETA Grant Application',
  'B-BBEE Advisory',
  'QCTO Accreditation',
  'Tax Incentives',
  'Other / General Enquiry',
]

const details = [
  { icon: '📍', label: 'Address', value: `${contact.address}` },
  { icon: '📞', label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
  { icon: '✉️', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: '🌐', label: 'Website', value: contact.website, href: '#' },
]

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to your backend / email service
    setSent(true)
  }

  return (
    <section id="contact" className="bg-white py-24 px-[5%]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <FadeUp>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let&apos;s Start the Conversation</h2>
          <p className="section-sub mb-9">
            Whether you need skills development support, SETA grant assistance, or a full HR compliance overhaul — we&apos;re here to help.
          </p>

          {details.map((d) => (
            <div key={d.label} className="flex items-start gap-4 py-5 border-b border-navy/8 last:border-b-0">
              <div className="w-11 h-11 bg-navy/7 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                {d.icon}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gold tracking-[2px] uppercase mb-1">{d.label}</p>
                {d.href ? (
                  <a href={d.href} className="text-[14px] text-navy font-medium hover:text-gold transition-colors">{d.value}</a>
                ) : (
                  <p className="text-[14px] text-navy font-medium leading-relaxed">{d.value}</p>
                )}
              </div>
            </div>
          ))}
        </FadeUp>

        {/* Right - Form */}
        <FadeUp delay={150}>
          <div className="bg-[#f8f7f4] rounded-xl p-10">
            <p className="text-[18px] font-bold text-navy mb-7">Send Us a Message</p>

            {sent ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-navy font-bold text-lg mb-2">Message Sent!</p>
                <p className="text-slate-500 text-sm">We&apos;ll get back to you as soon as possible.</p>
                <button onClick={() => setSent(false)} className="btn-navy mt-6">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {[['firstName', 'First Name', 'Your first name'], ['lastName', 'Last Name', 'Your last name']].map(([field, label, ph]) => (
                    <div key={field}>
                      <label className="block text-[12px] font-semibold text-navy uppercase tracking-wide mb-2">{label}</label>
                      <input
                        type="text"
                        placeholder={ph}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full px-4 py-3 border-[1.5px] border-navy/15 rounded-md text-[14px] font-poppins text-slate-800 bg-white focus:outline-none focus:border-navy transition-colors"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <label className="block text-[12px] font-semibold text-navy uppercase tracking-wide mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 border-[1.5px] border-navy/15 rounded-md text-[14px] font-poppins text-slate-800 bg-white focus:outline-none focus:border-navy transition-colors"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[12px] font-semibold text-navy uppercase tracking-wide mb-2">Service of Interest</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 border-[1.5px] border-navy/15 rounded-md text-[14px] font-poppins text-slate-700 bg-white focus:outline-none focus:border-navy transition-colors"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-[12px] font-semibold text-navy uppercase tracking-wide mb-2">Message</label>
                  <textarea
                    placeholder="Tell us about your organisation and what you need..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border-[1.5px] border-navy/15 rounded-md text-[14px] font-poppins text-slate-800 bg-white focus:outline-none focus:border-navy transition-colors min-h-[120px] resize-y"
                    required
                  />
                </div>

                <button type="submit" className="btn-navy w-full">Send Message</button>
              </form>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
