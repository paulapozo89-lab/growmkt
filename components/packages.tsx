import { Reveal } from './reveal'

const packages = [
  {
    title: 'Por proyecto',
    desc: 'Ideal para necesidades puntuales: un spot, video institucional, cobertura de evento o producción específica con alcance definido.',
    accent: '#E5526C',
    features: [
      'Alcance y entregables definidos',
      'Precio fijo por proyecto',
      'Ideal para producciones específicas',
    ],
  },
  {
    title: 'Retainer mensual',
    desc: 'Para marcas que necesitan presencia constante: contenido continuo, campañas always-on y producción regular durante todo el año.',
    accent: '#2BAECC',
    features: [
      'Contenido y producción continua',
      'Equipo dedicado a tu marca',
      'Optimización mensual constante',
    ],
  },
  {
    title: 'Campaña completa',
    desc: 'Solución integral: desde el concepto estratégico hasta la producción de todas las piezas, adaptaciones y gestión de performance.',
    accent: '#2F95EA',
    features: [
      'Estrategia + creatividad + producción',
      'Gestión de pauta incluida',
      'Reporting y optimización de resultados',
    ],
  },
]

export function Packages() {
  return (
    <section className="relative bg-[#050508] py-16 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue/[0.03] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        <div className="text-center mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-coral to-cyan" />
              <span className="text-xs font-extrabold text-coral tracking-[3px] uppercase">
                Modelos de trabajo
              </span>
              <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-cyan to-blue" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[1] text-white mb-5">
              Adaptamos el formato{' '}
              <span className="text-gradient-static">a tu marca</span>
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-white/35 text-lg max-w-lg mx-auto leading-relaxed">
              Tres formas de trabajar juntos, según lo que tu negocio necesita.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.title} delay={0.15 + i * 0.12} direction="scale">
              <div className="glass-card glow-border rounded-2xl p-6 md:p-8 lg:p-9 h-full group flex flex-col">
                {/* Accent line */}
                <div
                  className="w-12 h-1 rounded-full mb-7 transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: pkg.accent }}
                />

                <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight">
                  {pkg.title}
                </h3>

                <p className="text-sm text-white/35 leading-relaxed mb-8 flex-1">
                  {pkg.desc}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/[0.06]">
                  {pkg.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pkg.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-white/50 leading-relaxed">{feat}</span>
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
