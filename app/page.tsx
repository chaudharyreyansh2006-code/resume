
import PublicHeader from '@/components/PublicHeader'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/components/landing/HeroSection'
import { ProblemSection } from '@/components/landing/ProblemSection'
import { SocialProofSection } from '@/components/landing/SocialProofSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import PricingSection from '@/components/landing/PricingSection'
import { CTASection } from '@/components/landing/CTASection'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <SocialProofSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
