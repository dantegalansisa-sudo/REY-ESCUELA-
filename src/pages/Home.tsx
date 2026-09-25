import Hero from '../components/Hero'
import Services from '../components/sections/Services'
import WhyUs from '../components/sections/WhyUs'
import Process from '../components/sections/Process'
import Testimonials from '../components/sections/Testimonials'
import PlansBanner from '../components/sections/PlansBanner'
import Faq from '../components/sections/Faq'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <Testimonials />
      <PlansBanner />
      <Faq />
      <Contact />
    </>
  )
}
