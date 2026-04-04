import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative bg-[#050508] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/grow_logo_color.png"
              alt="GROW"
              width={1975}
              height={514}
              className="h-9 w-auto mb-5"
            />
            <p className="text-sm text-white/25 leading-relaxed max-w-sm mb-8">
              Tu Growth Partner. Integramos estrategia, creatividad, producción y performance para escalar tu marca de forma sostenible.
            </p>
            <p className="text-xl font-black text-gradient-static tracking-tight">
              You grow, we grow.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] font-extrabold text-white/40 tracking-[3px] uppercase mb-6">
              Navegación
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { href: '/#que-hacemos', label: 'Qué hacemos' },
                { href: '/#servicios', label: 'Servicios' },
                { href: '/servicios-web', label: 'Desarrollo Web' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/25 hover:text-white/60 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-extrabold text-white/40 tracking-[3px] uppercase mb-6">
              Contacto
            </h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:contacto@growmkt.mx" className="text-sm text-white/25 hover:text-white/60 transition-colors duration-300">
                contacto@growmkt.mx
              </a>
              <a href="https://wa.me/524428171042" target="_blank" rel="noopener noreferrer" className="text-sm text-white/25 hover:text-white/60 transition-colors duration-300">
                +52 442 817 1042
              </a>
              <p className="text-sm text-white/15">Querétaro, México</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/10">
            © {new Date().getFullYear()} GROW. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/10 hover:text-white/40 transition-colors duration-300" aria-label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="text-white/10 hover:text-white/40 transition-colors duration-300" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
