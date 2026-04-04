'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 2200
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [started, target])

  return <span>{count}{suffix}</span>
}

export function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-[#050508]">
      {/* Aurora orbs */}
      <div className="aurora-orb w-[300px] h-[300px] md:w-[700px] md:h-[700px] -top-48 -right-56 bg-cyan/[0.07] animate-float" />
      <div className="aurora-orb w-[250px] h-[250px] md:w-[500px] md:h-[500px] -bottom-40 -left-44 bg-coral/[0.05] animate-float-delayed" />
      <div className="aurora-orb w-[200px] h-[200px] md:w-[400px] md:h-[400px] top-1/3 left-1/2 -translate-x-1/2 bg-blue/[0.04] animate-pulse-glow" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      {/* Noise */}
      <div className="absolute inset-0 noise" />

      {/* Horizontal accent lines */}
      <div className="absolute top-[28%] left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/[0.08] to-transparent" />
      <div className="absolute bottom-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-coral/[0.06] to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-5 md:px-6 max-w-5xl mx-auto pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Logo */}
        <div
          className="mb-12"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          <Image
            src="/grow_logo_color.png"
            alt="GROW"
            width={1975}
            height={514}
            className="mx-auto h-20 md:h-32 lg:h-36 w-auto"
            priority
          />
        </div>

        {/* Badge */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-cyan/[0.08] border border-cyan/[0.12] rounded-full text-[11px] font-bold text-cyan tracking-[2.5px] uppercase">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            Tu Growth Partner
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.05em] leading-[0.92] mb-7"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          {"Let's "}
          <span className="text-gradient">GROW</span>
          <br />
          together
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
          }}
        >
          Integramos estrategia, creatividad, producción y performance para escalar tu marca.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.85s',
          }}
        >
          <a
            href="https://wa.me/524428171042?text=Hola%20GROW%2C%20me%20interesa%20agendar%20un%20diagn%C3%B3stico"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 btn-gradient text-white font-bold text-base md:text-lg px-10 py-4.5 rounded-full hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-coral/25 transition-all duration-500"
          >
            Agenda tu diagnóstico
            <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <div className="w-5 h-9 border-2 border-white/10 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-white/25 rounded-full" />
        </div>
      </div>
    </section>
  )
}
