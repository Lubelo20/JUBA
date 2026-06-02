export default function PageBanner({ label, title }) {
  return (
    <div className="pt-[72px] bg-white px-[5%]">
      <div className="max-w-6xl mx-auto py-12 border-l-4 border-gold pl-8">
        <p className="section-label">{label}</p>
        <h1 className="section-title mb-0">{title}</h1>
      </div>
    </div>
  )
}
