'use client'

import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { useEffect, useRef, useState } from 'react'

function SpeedBar({ label, color, targetWidth, time, barClass }: {
  label: string; color: string; targetWidth: string; time: string; barClass: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex items-center gap-4 mb-4">
      <span className={`font-bold text-xs min-w-[80px] text-right ${color}`}>{label}</span>
      <div className="flex-1 h-8 bg-white/[0.03] rounded-lg overflow-hidden border border-white/[0.04]">
        <div
          className={`h-full rounded-lg flex items-center justify-end pr-3 text-[11px] font-extrabold text-white transition-all duration-[1500ms] ease-out ${barClass}`}
          style={{ width: animate ? targetWidth : '0%' }}
        >
          {time}
        </div>
      </div>
    </div>
  )
}

const whyCards = [
  { icon: '🏪', title: 'Punto de venta 24/7', desc: 'Tu web trabaja mientras tú duermes. Recibe cotizaciones, agenda citas y vende a cualquier hora — sin depender de que alguien conteste mensajes.', color: 'coral' },
  { icon: '🔍', title: 'SEO = tráfico que no pagas', desc: 'Cada página bien optimizada se posiciona en Google de forma orgánica. Mientras tus competidores pagan por cada clic, tu web atrae clientes gratis.', color: 'cyan' },
  { icon: '📊', title: 'Inteligencia de negocio real', desc: 'Google Analytics te dice exactamente quién visita tu web, de dónde viene, qué busca y qué le interesa. Información que las redes sociales no dan.', color: 'blue' },
  { icon: '🎯', title: 'Centraliza todo tu negocio', desc: 'Servicios, precios, ubicación, testimonios, portafolio, contacto — todo en un solo lugar. Tus clientes encuentran todo sin buscar entre stories.', color: 'coral' },
  { icon: '🚀', title: 'Funciones que las redes no tienen', desc: 'Formularios de cotización, sistemas de agendamiento, catálogos interactivos, cotizadores automáticos, pasarelas de pago, chatbots con IA.', color: 'cyan' },
  { icon: '📈', title: 'Escala a tu ritmo', desc: 'A diferencia de las redes donde el alcance depende de un algoritmo, tu web + SEO genera tráfico que crece con el tiempo permanentemente.', color: 'blue' },
]

const trustCards = [
  { num: '75%', title: 'Juzgan por el diseño', desc: 'De los usuarios admite que juzga la credibilidad de un negocio por el diseño de su sitio web.' },
  { num: '.com', title: 'Dominio propio = seriedad', desc: 'tunegocio.com transmite profesionalismo. Un link de Instagram como único contacto se percibe como informal.' },
  { num: '🏆', title: 'Ventaja sobre competidores', desc: 'Si tu competencia tiene web profesional y tú no, se ven más establecidos aunque tú ofrezcas mejor servicio.' },
  { num: '🚩', title: 'Red flag para clientes serios', desc: 'Para clientes corporativos, no tener web es una señal de alerta. Un proveedor sin sitio difícilmente pasa un filtro formal.' },
  { num: '🔒', title: 'Seguridad y transparencia', desc: 'Una web con SSL, aviso de privacidad y datos fiscales genera confianza legal.' },
  { num: '⭐', title: 'Testimonios con peso', desc: 'Los testimonios en tu web, con nombre, foto y contexto, pesan más que reseñas sueltas en redes.' },
]

const comparison = [
  { feat: 'Velocidad de carga', grow: '< 1 segundo', other: '3-8 segundos', growGood: true, otherBad: true },
  { feat: 'Google PageSpeed', grow: '95-100', other: '40-70', growGood: true, otherBad: false },
  { feat: 'SEO técnico', grow: '✓ Optimizado', other: 'Parcial', growGood: true, otherBad: false },
  { feat: 'Seguridad', grow: '✓ Sin plugins vulnerables', other: '✗ Hackeos comunes', growGood: true, otherBad: true },
  { feat: 'Actualizaciones', grow: 'Automáticas', other: 'Manuales', growGood: true, otherBad: true },
  { feat: 'Diseño personalizado', grow: '✓ 100%', other: 'Templates limitados', growGood: true, otherBad: false },
  { feat: 'Hosting incluido', grow: '✓ Vercel CDN global', other: '$50-150 USD/año extra', growGood: true, otherBad: true },
  { feat: 'Costo de plataforma', grow: '$0/mes', other: '$12-40 USD/mes', growGood: true, otherBad: true },
  { feat: 'Mobile-first', grow: '✓', other: 'Responsive básico', growGood: true, otherBad: false },
  { feat: 'IA integrada', grow: '✓ Chatbot, SEO, análisis', other: 'Plugins de terceros', growGood: true, otherBad: true },
]

const pricingTiers = [
  {
    tier: 'Starter',
    name: 'Landing Page',
    desc: 'Perfecta para profesionistas, negocios nuevos o campañas que necesitan presencia web rápida.',
    price: '$8,000 — $12,000',
    domain: 'Si no tienes uno, lo compramos y configuramos por ti (~$250-400 MXN/año).',
    time: '3-5 días hábiles',
    features: [
      'Diseño one-page personalizado (3-5 secciones)',
      '100% responsive (móvil, tablet, desktop)',
      'Formulario de contacto integrado',
      'Optimización SEO básica',
      'Google Analytics configurado',
      'Hosting en Vercel incluido (CDN global)',
      'Certificado SSL (https) incluido',
      'Carga ultra rápida (<1 segundo)',
    ],
    featured: false,
  },
  {
    tier: 'Profesional',
    name: 'Sitio Completo',
    desc: 'Para negocios establecidos que necesitan un sitio robusto con múltiples páginas y funcionalidades.',
    price: '$15,000 — $25,000',
    domain: 'Usamos tu dominio existente o lo adquirimos por ti. Incluye configuración DNS completa.',
    time: '7-12 días hábiles',
    features: [
      'Diseño personalizado (4-8 páginas)',
      'CMS administrable (edita sin código)',
      'SEO técnico completo (meta tags, sitemap, schema)',
      'Integración con redes sociales',
      'Google Analytics + Search Console',
      'Formularios avanzados (cotizaciones, citas)',
      'Galería de productos/servicios',
      'WhatsApp Business integrado',
      'Hosting premium en Vercel incluido',
      'Capacitación para administrar tu sitio',
    ],
    featured: true,
  },
  {
    tier: 'Premium',
    name: 'Rediseño Total',
    desc: 'Para empresas que ya tienen web pero necesitan un salto tecnológico. Migración completa + optimización.',
    price: '$30,000 — $50,000',
    domain: 'Migramos tu dominio actual sin downtime. Sin costo adicional.',
    time: '15-20 días hábiles',
    features: [
      'Rediseño completo desde cero (8+ páginas)',
      'CMS robusto con panel administrativo',
      'SEO técnico + copywriting estratégico',
      'Migración de contenido existente',
      'Chatbot con inteligencia artificial',
      'Dashboard de analíticos personalizado',
      'Integración con CRM y email marketing',
      'Optimización de velocidad extrema',
      'Estrategia de conversión implementada',
      'Soporte prioritario por 30 días',
    ],
    featured: false,
  },
]

const iconColor: Record<string, string> = {
  coral: 'bg-coral/[0.12]',
  cyan: 'bg-cyan/[0.12]',
  blue: 'bg-blue/[0.12]',
}

export function ServiciosWebContent() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="aurora-orb w-[250px] h-[250px] md:w-[500px] md:h-[500px] -top-32 -right-40 bg-cyan/[0.06] animate-float" />
        <div className="aurora-orb w-[200px] h-[200px] md:w-[400px] md:h-[400px] -bottom-24 -left-32 bg-coral/[0.04] animate-float-delayed" />
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="absolute inset-0 noise" />

        <div className="relative z-10 px-5 md:px-6 max-w-4xl mx-auto pt-20 pb-12 md:pt-28 md:pb-20">
          <div className="mb-8 animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <Image src="/grow_logo_color.png" alt="GROW" width={1975} height={514} className="mx-auto h-16 w-auto" priority />
          </div>

          <div className="animate-fade-up opacity-0 mb-6" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 bg-cyan/[0.08] border border-cyan/[0.12] rounded-full text-xs font-bold text-cyan tracking-[2px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
              Desarrollo web de nueva generación
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] mb-6 animate-fade-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Tu negocio merece
            <br />
            una web <span className="text-gradient">que venda</span>
          </h1>

          <p className="text-white/40 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Sitios ultra rápidos, SEO optimizado, diseño premium. Sin WordPress, sin Wix, sin límites.
          </p>

          <div className="flex justify-center gap-6 md:gap-12 lg:gap-20 animate-fade-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {[
              { num: '<1s', label: 'Carga' },
              { num: '100', label: 'PageSpeed' },
              { num: '$0', label: 'Hosting/mes' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-gradient-static">{s.num}</div>
                <div className="text-[10px] text-white/30 font-semibold tracking-[2px] uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WEB */}
      <section className="py-14 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-coral to-cyan" />
              <span className="text-xs font-extrabold text-coral tracking-[3px] uppercase">¿Por qué una web?</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05] mb-4">
              Tu negocio necesita más <span className="text-gradient-static">que redes sociales</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-white/40 text-base max-w-lg leading-relaxed mb-14">
              Una web profesional es la base de tu presencia digital.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyCards.map((card, i) => (
              <Reveal key={card.title} delay={0.1 + i * 0.08}>
                <div className="glass-card glow-border rounded-2xl p-7 h-full">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-4 ${iconColor[card.color]}`}>
                    {card.icon}
                  </div>
                  <h3 className="text-base font-extrabold mb-2">{card.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-14 md:py-24 lg:py-32 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-extrabold text-cyan tracking-[3px] uppercase">Confianza y credibilidad</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05] mt-3 mb-3">
                Tu web es tu primera <span className="text-gradient-static">impresión profesional</span>
              </h2>
              <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
                Antes de comprarte, tu cliente te busca en Google. Lo que encuentre define si confía en ti.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trustCards.map((card, i) => (
              <Reveal key={card.title} delay={0.1 + i * 0.06}>
                <div className="glass-card rounded-2xl p-7 h-full hover:border-cyan/15">
                  <div className="text-3xl font-black text-gradient-static mb-3">{card.num}</div>
                  <h4 className="text-sm font-extrabold mb-2">{card.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-14 md:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-extrabold text-coral tracking-[3px] uppercase">Tecnología</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] mt-3 mb-3">
                GROW Stack vs. <span className="text-gradient-static">el mercado</span>
              </h2>
              <p className="text-white/40 text-base max-w-md mx-auto">No todas las webs son iguales. La tecnología importa.</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass-card rounded-2xl overflow-x-auto">
              <div className="min-w-[520px]">
              {/* Header */}
              <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-white/[0.06]">
                <div className="p-4 text-xs font-extrabold text-white/50">Característica</div>
                <div className="p-4 text-xs font-extrabold text-cyan text-center bg-cyan/[0.04]">GROW</div>
                <div className="p-4 text-xs font-extrabold text-white/30 text-center">WordPress / Wix</div>
              </div>
              {/* Rows */}
              {comparison.map((row) => (
                <div key={row.feat} className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01] transition-colors">
                  <div className="p-3 px-4 text-sm font-semibold text-white/70">{row.feat}</div>
                  <div className="p-3 text-sm font-extrabold text-cyan text-center bg-cyan/[0.02]">{row.grow}</div>
                  <div className={`p-3 text-sm text-center ${row.otherBad ? 'text-white/20' : 'text-amber-400/70'}`}>{row.other}</div>
                </div>
              ))}
            </div>
            </div>
          </Reveal>

          {/* Speed bars */}
          <Reveal delay={0.2}>
            <div className="mt-14 max-w-xl mx-auto">
              <h3 className="text-center text-base font-extrabold mb-8">Tiempo de carga promedio</h3>
              <SpeedBar label="GROW" color="text-cyan" targetWidth="15%" time="0.8s" barClass="btn-gradient" />
              <SpeedBar label="WordPress" color="text-white/30" targetWidth="72%" time="4.2s" barClass="bg-white/10" />
              <SpeedBar label="Wix" color="text-white/25" targetWidth="58%" time="3.5s" barClass="bg-white/[0.07]" />
              <div className="mt-6 text-center p-4 bg-cyan/[0.04] rounded-xl border border-cyan/[0.08]">
                <p className="text-sm"><strong className="text-cyan">Tu web carga hasta 5x más rápido.</strong></p>
                <p className="text-xs text-white/40 mt-1">Cada segundo extra de carga = 7% menos conversiones.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-14 md:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-extrabold text-coral tracking-[3px] uppercase">Inversión</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] mt-3 mb-3">
                Paquetes de <span className="text-gradient-static">desarrollo web</span>
              </h2>
              <p className="text-white/40 text-base">Elige el plan que se adapte a tu negocio.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.tier} delay={0.1 + i * 0.1}>
                <div className={`glass-card rounded-3xl p-8 h-full flex flex-col relative ${
                  tier.featured
                    ? 'border-cyan/20 bg-gradient-to-b from-cyan/[0.04] to-transparent'
                    : ''
                }`}>
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-gradient text-white text-[10px] font-extrabold tracking-[2px] px-5 py-1.5 rounded-full uppercase">
                      Más popular
                    </div>
                  )}

                  <div className="text-[10px] font-extrabold text-coral tracking-[3px] uppercase mb-1">{tier.tier}</div>
                  <h3 className="text-xl font-black mb-2 tracking-tight">{tier.name}</h3>
                  <p className="text-xs text-white/40 leading-relaxed mb-5">{tier.desc}</p>

                  <div className="text-3xl font-black mb-0.5">{tier.price} <span className="text-sm font-medium text-white/40">MXN</span></div>
                  <p className="text-[11px] text-white/30 mb-5">Pago único</p>

                  <div className="text-xs text-cyan/80 bg-cyan/[0.04] p-3 rounded-xl border-l-2 border-cyan mb-5 leading-relaxed">
                    <strong className="text-white/80">Dominio:</strong> {tier.domain}
                  </div>

                  <ul className="flex-1 mb-6 space-y-2">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm text-white/60 leading-relaxed">
                        <span className="text-cyan font-extrabold flex-shrink-0">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-white/30 text-center mb-4 font-semibold">⏱ Entrega: {tier.time}</p>

                  <a
                    href={`https://wa.me/524428171042?text=Hola%20GROW%2C%20me%20interesa%20cotizar%20el%20paquete%20${encodeURIComponent(tier.tier)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                      tier.featured
                        ? 'btn-gradient text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/20'
                        : 'bg-white/[0.04] text-white/80 border border-white/[0.06] hover:bg-cyan/[0.06] hover:border-cyan/20'
                    }`}
                  >
                    Cotizar {tier.tier}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAIN */}
      <section className="py-14 md:py-24 lg:py-32 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-extrabold text-cyan tracking-[3px] uppercase">Dominio</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] mt-3 mb-3">
                ¿Qué pasa con el <span className="text-gradient-static">dominio</span>?
              </h2>
              <p className="text-white/40 text-base">Tú eliges. En ambos casos, tu dominio es 100% tuyo siempre.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Reveal delay={0.1}>
              <div className="glass-card rounded-2xl p-8 h-full hover:border-cyan/15">
                <h3 className="text-base font-extrabold mb-1">🌐 Ya tengo dominio</h3>
                <div className="text-2xl font-black text-gradient-static mb-5">$0 adicional</div>
                <ul className="space-y-2.5">
                  {[
                    'Configuramos los DNS para apuntar a tu nueva web',
                    'Sin costo extra — incluido en tu paquete',
                    'Compatible con GoDaddy, Namecheap y cualquier registrar',
                    'Si estás en Wix/Squarespace, te ayudamos a liberar tu dominio',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50 leading-relaxed">
                      <span className="text-cyan font-bold flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass-card rounded-2xl p-8 h-full hover:border-cyan/15">
                <h3 className="text-base font-extrabold mb-1">🛒 Necesito un dominio</h3>
                <div className="text-2xl font-black text-gradient-static mb-5">~$250-400 MXN/año</div>
                <ul className="space-y-2.5">
                  {[
                    'Lo compramos y registramos a TU nombre (es tuyo, no nuestro)',
                    'Recomendamos .com o .com.mx según tu negocio',
                    'Incluye configuración completa de DNS, SSL y correo',
                    'Te entregamos las credenciales de acceso',
                    'Renovación anual sencilla (te avisamos antes)',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50 leading-relaxed">
                      <span className="text-cyan font-bold flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MAINTENANCE */}
      <section className="py-14 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <span className="text-xs font-extrabold text-coral tracking-[3px] uppercase">Post-lanzamiento</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] mt-3 mb-10">
              Mantenimiento <span className="text-gradient-static">mensual</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass-card rounded-3xl p-10">
              <div className="text-3xl font-black mb-1">
                <span className="text-gradient-static">$800 — $2,000</span> MXN/mes
              </div>
              <p className="text-sm text-white/40 mb-8">Según el paquete contratado</p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {[
                  'Hosting gestionado en Vercel',
                  'Actualizaciones de contenido (4/mes)',
                  'Monitoreo de uptime 24/7',
                  'Backup automático mensual',
                  'Soporte técnico por WhatsApp',
                  'Reporte mensual de analíticos',
                  'Optimización continua de velocidad',
                  'Certificado SSL siempre activo',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                    <span className="text-cyan font-extrabold flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xs text-white/20 mt-6">Tu web no es &ldquo;fire and forget&rdquo;. Mantenla optimizada y actualizada.</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-28 lg:py-36 overflow-hidden">
        <div className="section-divider absolute top-0 left-0 w-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-coral/[0.04] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] leading-[1.05] mb-4">
              ¿Lista para tener la web
              <br />
              <span className="text-gradient">que tu negocio merece?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/40 text-base mb-8">Agenda una videollamada de 15 minutos. Sin compromiso.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="https://wa.me/524428171042?text=Hola%20GROW%2C%20me%20interesa%20cotizar%20una%20p%C3%A1gina%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 btn-gradient text-white font-extrabold text-lg px-12 py-5 rounded-full hover:-translate-y-1 hover:shadow-2xl hover:shadow-coral/20 transition-all duration-300"
            >
              💬 Cotizar por WhatsApp
            </a>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xs text-white/25 mt-6">Respuesta en menos de 2 horas en horario laboral</p>
          </Reveal>
        </div>
      </section>

      {/* Footer note */}
      <div className="text-center pb-8">
        <p className="text-[10px] text-white/10">Precios en MXN · IVA no incluido · Precios vigentes 2026</p>
      </div>
    </>
  )
}
