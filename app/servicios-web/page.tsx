import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp'
import { ServiciosWebContent } from './content'

export const metadata: Metadata = {
  title: 'Desarrollo Web — GROW',
  description: 'Desarrollo web profesional con tecnología de última generación. Sitios ultra rápidos, SEO optimizado, hosting incluido.',
}

export default function ServiciosWebPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServiciosWebContent />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
