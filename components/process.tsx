'use client'

import { Reveal } from './reveal'

const steps = [
  { num: '01', title: 'Diagnóstico', desc: 'Analizamos tu situación actual, mercado y objetivos para identificar oportunidades de crecimiento.', color: '#E5526C' },
  { num: '02', title: 'Plan', desc: 'Creamos una estrategia detallada y un plan de acción personalizado para alcanzar tus metas.', color: '#2BAECC' },
  { num: '03', title: 'Producción', desc: 'Desarrollamos creatividades y contenidos de alta calidad adaptados a cada plataforma.', color: '#2F95EA' },
  { num: '04', title: 'Lanzamiento', desc: 'Implementamos las campañas, monitoreamos resultados y optimizamos para un crecimiento constante.', color: '#E5526C' },
]

export function Process() {
  return (
    <section className="relative bg-[#050508] py-16 md:py-32 lg:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-cyan/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        <div className="text-center mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-coral to-cyan" />
              <span className="text-xs font-extrabold text-coral tracking-[3px] uppercase">
                Proceso
              </span>
              <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-cyan to-blue" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] leading-[1] text-white">
              Growth <span className="text-gradient-static">mode</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative">
          {/* Connection line — desktop */}
          <div className="hidden md:block absolute top-[52px] left-[12%] right-[12%] h-px">
            <div className="w-full h-full bg-gradient-to-r from-coral/30 via-cyan/30 to-blue/30" />
          </div>

          {steps.map((step, i) => (
            <Reveal key={step.num} delay={0.15 + i * 0.15} direction="scale">
              <div className="text-center relative group">
                {/* Step circle */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 mb-5 md:mb-7">
                  <div
                    className="absolute inset-0 rounded-full border-2 transition-all duration-500 group-hover:scale-110"
                    style={{ borderColor: `${step.color}25` }}
                  />
                  <div
                    className="absolute inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundColor: `${step.color}08` }}
                  />
                  <span className="text-xl md:text-3xl font-black text-gradient-static relative z-10">{step.num}</span>
                </div>

                <h3 className="text-lg font-extrabold text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-xs md:text-sm text-white/35 leading-relaxed md:max-w-[220px] mx-auto">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.8}>
          <p className="text-center text-sm text-white/25 mt-20 max-w-2xl mx-auto leading-relaxed">
            No creemos en acciones aisladas, sino en un sistema integrado que evoluciona con tu marca.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
