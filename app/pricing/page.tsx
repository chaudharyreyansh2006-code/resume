import PublicHeader from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { BorderBeam } from '@/components/ui/BorderBeam';

export const metadata = {
  title: 'Pricing - CVFolio.Me',
  description: 'Simple, transparent pricing for CVFolio.Me. Get lifetime access to Pro features for just $9.',
};

export default function PricingPage() {
  return (
    <>
      <PublicHeader />
      
      <main className="flex-1 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-design-black font-mono mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 font-mono max-w-2xl mx-auto">
              Choose the plan that works for you. Upgrade anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-design-black font-mono mb-2">Free</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-design-black font-mono">$0</span>
                  <span className="text-gray-600 font-mono ml-2">forever</span>
                </div>
                <p className="text-gray-600 font-mono">Perfect for trying out our service</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>1 website generation</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Basic templates</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>PDF upload support</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Public website hosting</span>
                </li>
              </ul>

              <Link href="/upload">
                <Button variant="outline" className="w-full font-mono">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border-2 border-design-black rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-design-black text-white px-4 py-2 rounded-full text-sm font-mono flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Most Popular
                </div>
              </div>

              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold text-design-black font-mono mb-2">Pro</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-design-black font-mono">$9</span>
                  <span className="text-gray-600 font-mono ml-2">one-time</span>
                </div>
                <p className="text-gray-600 font-mono">Lifetime access to all features</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="font-semibold">Unlimited website generation</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>All premium templates</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Custom domain support</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Advanced customization</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>No CVFolio.me branding</span>
                </li>
              </ul>

              <Link href="/upload">
                <Button className="w-full bg-design-black hover:bg-design-black/90 text-white font-mono relative overflow-hidden group">
                  <div className="h-[120px] w-10 bg-gradient-to-r from-white/10 via-white/50 to-white/10 absolute blur-xs -rotate-45 -left-16 group-hover:left-[150%] duration-500 delay-200" />
                  <Sparkles className="h-4 w-4 mr-2 relative" />
                  <span className="relative">Upgrade to Pro</span>
                  <BorderBeam colorFrom="#5d5d5d" colorTo="#ffffff" />
                </Button>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-design-black font-mono text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-design-black font-mono mb-3">
                  Is this really a one-time payment?
                </h3>
                <p className="text-gray-600 font-mono leading-relaxed">
                  Yes! Pay once, use forever. No monthly subscriptions, no hidden fees. Your $9 payment gives you lifetime access to all Pro features.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-design-black font-mono mb-3">
                  Can I try before I buy?
                </h3>
                <p className="text-gray-600 font-mono leading-relaxed">
                  Absolutely! Start with our free plan to generate your first website. You can upgrade to Pro anytime to unlock unlimited generations and premium features.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-design-black font-mono mb-3">
                  What if I'm not satisfied?
                </h3>
                <p className="text-gray-600 font-mono leading-relaxed">
                  We offer a 30-day money-back guarantee. If you're not completely satisfied with CVFolio.Me Pro, we'll refund your payment, no questions asked.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-design-black font-mono mb-3">
                  Do you offer discounts for students or nonprofits?
                </h3>
                <p className="text-gray-600 font-mono leading-relaxed">
                  At $9 for lifetime access, we believe our pricing is already very accessible. However, if you have special circumstances, feel free to reach out to our support team.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-design-black font-mono mb-3">
                  How do I upgrade from free to Pro?
                </h3>
                <p className="text-gray-600 font-mono leading-relaxed">
                  Simply click the "Upgrade to Pro" button on any page, or visit your account settings. The upgrade is instant and you'll immediately have access to all Pro features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}