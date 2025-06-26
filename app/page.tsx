import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import PricingSection from "@/components/sections/pricing-section"
import WhyChooseSection from "@/components/sections/why-choose-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import FutureSection from "@/components/sections/future-section"
import CtaSection from "@/components/sections/cta-section"
import FaqSection from "@/components/sections/faq-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <FutureSection />
        <CtaSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
