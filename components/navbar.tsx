'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '#que-hacemos', label: 'Qué hacemos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '/servicios-web', label: 'Desarrollo Web' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return

    e.preventDefault()
    setMenuOpen(false)

    // If not on homepage, navigate there first
    if (pathname !== '/') {
      window.location.href = '/' + href
      return
    }

    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-2xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="relative z-10">
          <Image
            src="/grow_logo_color.png"
            alt="GROW"
            width={1975}
            height={514}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) =>
            link.href.startsWith('#') ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-white/50 text-sm font-semibold tracking-wide hover:text-coral transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/50 text-sm font-semibold tracking-wide hover:text-coral transition-colors duration-300"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://wa.me/524428171042?text=Hola%20GROW%2C%20me%20interesa%20agendar%20un%20diagn%C3%B3stico"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient text-white text-sm font-bold px-6 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-coral/20 transition-all duration-300"
          >
            Agenda tu diagnóstico
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-10 w-8 h-8 flex flex-col justify-center gap-1.5"
          aria-label="Menu"
        >
          <span className={`w-full h-0.5 bg-white/70 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-white/70 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-white/70 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile menu */}
        <div className={`fixed inset-0 bg-surface/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          {links.map((link) =>
            link.href.startsWith('#') ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-white/70 text-2xl font-bold hover:text-coral transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-white/70 text-2xl font-bold hover:text-coral transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://wa.me/524428171042?text=Hola%20GROW%2C%20me%20interesa%20agendar%20un%20diagn%C3%B3stico"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient text-white text-lg font-bold px-10 py-4 rounded-full mt-4"
          >
            Agenda tu diagnóstico
          </a>
        </div>
      </div>
    </nav>
  )
}
