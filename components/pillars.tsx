import { Reveal } from './reveal'

const pillars = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: 'Estrategia',
    subtitle: 'Definir objetivos y rutas',
    description: 'Definimos objetivos claros, mensajes diferenciadores y un plan de acción estructurado que guía cada decisión.',
    accent: '#E5526C',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Creatividad',
    subtitle: 'Conceptos que conectan',
    description: 'Desarrollamos conceptos que conectan emocionalmente y están diseñados para convertir y generar resultados.',
    accent: '#2BAECC',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: 'Producción',
    subtitle: 'Ejecutar con calidad premium',
    description: 'Ejecutamos con estándares profesionales en cada pieza: desde spots hasta contenido social, siempre con calidad premium.',
    accent: '#2F95EA',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Performance',
    subtitle: 'Medir, optimizar y escalar',
    description: 'Distribuimos estratégicamente, optimizamos constantemente y escalamos lo que funciona. Todo basado en datos reales.',
    accent: '#E5526C',
  },
]

export function Pillars() {
  return (
    <section className="relative bg-[#F7F8FB] py-16 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="max-w-2xl mb-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-coral to-cyan" />
              <span className="text-xs font-extrabold text-coral tracking-[3px] uppercase">
                Qué hacemos
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[1] text-[#1A1A2E] mb-5">
              Los pilares del{' '}
              <span className="text-gradient-static">crecimiento</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[#6B6B80] text-lg leading-relaxed">
              Cuatro áreas integradas que trabajan juntas para escalar tu marca de forma sostenible y medible.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={0.15 + i * 0.12} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="light-card p-6 md:p-8 lg:p-10 h-full group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: `${pillar.accent}15`, color: pillar.accent }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-extrabold text-[#1A1A2E] mb-1.5 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold tracking-wide mb-4" style={{ color: pillar.accent }}>
                  {pillar.subtitle}
                </p>
                <p className="text-[#6B6B80] text-[15px] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
