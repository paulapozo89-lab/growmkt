import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Pillars } from '@/components/pillars'
import { Process } from '@/components/process'
import { Services } from '@/components/services'
import { Packages } from '@/components/packages'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <Process />
        <Services />
        <Packages />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
