import { Reveal } from './reveal'

const categories = [
  {
    title: 'Estrategia',
    accent: '#E5526C',
    items: [
      'Narrativa de marca y posicionamiento',
      'Diseño de campañas integradas',
      'Roadmap de contenido y acciones',
      'Arquitectura de funnel de conversión',
    ],
  },
  {
    title: 'Creatividad & Diseño',
    accent: '#2BAECC',
    items: [
      'Conceptos creativos diferenciadores',
      'Key visuals y sistemas de identidad',
      'Copywriting estratégico',
      'Guiones para video y audio',
    ],
  },
  {
    title: 'Producción Audiovisual',
    accent: '#2F95EA',
    items: [
      'Spots profesionales (15s/30s/60s)',
      'Social content (Reels, TikTok, Shorts)',
      'Videos institucionales y corporativos',
      'Testimoniales y casos de éxito',
      'Cobertura de eventos',
      'Post-producción completa',
    ],
  },
  {
    title: 'Performance Marketing',
    accent: '#E5526C',
    items: [
      'Gestión de pauta digital',
      'Testing creativo continuo',
      'Optimización basada en datos',
      'Maximización de ROI y escalabilidad',
    ],
  },
]

export function Services() {
  return (
    <section id="servicios" className="relative bg-[#F7F8FB] py-16 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="max-w-2xl mb-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-cyan to-blue" />
              <span className="text-xs font-extrabold text-cyan tracking-[3px] uppercase">
                Servicios
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[1] text-[#1A1A2E] mb-5">
              Soluciones{' '}
              <span className="text-gradient-static">integrales</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[#6B6B80] text-lg leading-relaxed">
              Diseñadas para impulsar tu marca al siguiente nivel.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={0.15 + i * 0.1}>
              <div className="light-card p-6 md:p-8 lg:p-10 h-full group">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-3 h-3 rounded-full transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: cat.accent }} />
                  <h3 className="text-xl font-extrabold text-[#1A1A2E] tracking-tight">{cat.title}</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {cat.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 group/item">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 transition-colors duration-300" style={{ color: `${cat.accent}40` }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-[15px] text-[#6B6B80] leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
