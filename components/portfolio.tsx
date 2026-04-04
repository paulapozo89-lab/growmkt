import { Reveal } from './reveal'

export function Portfolio() {
  return (
    <section id="portafolio" className="relative py-28 md:py-36">
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-blue to-coral" />
            <span className="text-xs font-extrabold text-blue tracking-[3px] uppercase">
              Portafolio
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] leading-[1.05] mb-4">
            Casos de
            <br />
            <span className="text-gradient-static">éxito</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-white/40 text-base md:text-lg max-w-lg leading-relaxed mb-16">
            Marcas que han escalado con nosotros.
          </p>
        </Reveal>

        {/* Placeholder grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <div className="glass-card rounded-2xl overflow-hidden group cursor-pointer">
                {/* Placeholder image area */}
                <div className="aspect-[4/3] bg-gradient-to-br from-surface-200 to-surface-400 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-white/[0.06] flex items-center justify-center group-hover:border-cyan/20 transition-colors duration-500">
                      <svg className="w-6 h-6 text-white/10 group-hover:text-cyan/40 transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-white/20 font-semibold tracking-[2px] uppercase mb-2">Próximamente</p>
                  <p className="text-sm text-white/30">Nuevo caso en desarrollo</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
