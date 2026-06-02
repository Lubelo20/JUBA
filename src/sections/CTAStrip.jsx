export default function CTAStrip() {
  return (
    <div className="bg-navy py-20 px-[5%] relative overflow-hidden">
      {/* Decorative polygon */}
      <div
        className="absolute top-0 right-0 w-72 h-full bg-gold opacity-10"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative">
        <div>
          <h2 className="font-extrabold text-white mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
            Ready to Maximise Your SETA Benefits?
          </h2>
          <p className="text-white/60 text-[14px]">
            Upskill your workforce. Claim back what you're entitled to. Let's grow together.
          </p>
        </div>
        <a href="#contact" className="btn-primary whitespace-nowrap flex-shrink-0">
          Let's Grow Together
        </a>
      </div>
    </div>
  )
}
