import Hero from '../components/Hero'
import Services from '../components/sections/Services'
import WhyUs from '../components/sections/WhyUs'
import Process from '../components/sections/Process'
import About from '../components/sections/About'
import Videos from '../components/sections/Videos'
import Testimonials from '../components/sections/Testimonials'
import PlansBanner from '../components/sections/PlansBanner'
import Faq from '../components/sections/Faq'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <Process />
      <Videos />
      <Testimonials />
      <PlansBanner />
      <Faq />
      <Contact />
    </>
  )
}
