import { Reveal } from './reveal'

export function CTA() {
  return (
    <section className="relative bg-[#050508] py-20 md:py-36 lg:py-48 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-coral/[0.05] to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-cyan/[0.04] to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-12 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] leading-[0.95] mb-7 text-white">
            Si tu objetivo es
            <br />
            <span className="text-gradient">crecer de verdad</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-5">
            No vendemos servicios aislados — construimos alianzas estratégicas de crecimiento.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="text-white/25 text-base max-w-md mx-auto leading-relaxed mb-12">
            Agenda un diagnóstico sin compromiso. Te entregaremos una propuesta personalizada y un roadmap inicial.
          </p>
        </Reveal>

        <Reveal delay={0.35} direction="scale">
          <a
            href="https://wa.me/524428171042?text=Hola%20GROW%2C%20me%20interesa%20agendar%20un%20diagn%C3%B3stico"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 btn-gradient text-white font-extrabold text-base md:text-lg lg:text-xl px-8 py-4 md:px-14 md:py-6 rounded-full hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(229,82,108,0.25)] transition-all duration-500"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Agenda por WhatsApp
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/20 font-medium">
            <span>Sin compromiso</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>Respuesta en &lt;2 hrs</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span>100% personalizado</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
