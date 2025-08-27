import PublicHeader from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';
import { Check, Crown, Sparkles, Upload } from 'lucide-react';
import Link from 'next/link';
import { FramerButton } from '@/components/ui/framer-button';

export const metadata = {
  title: 'Pricing - CVFolio.Me',
  description: 'Special launch pricing! Get lifetime access to Pro features for just $4.99 (normally $12).',
};

export default function PricingPage() {
  return (
    <>
      <PublicHeader />
      
      <main className="flex-1 pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 text-sm font-bold text-orange-700 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              LAUNCH WEEK SPECIAL - LIMITED TIME!
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-design-black font-mono mb-6">
              Launch Special Pricing
            </h1>
            <p className="text-xl text-gray-600 font-mono max-w-2xl mx-auto">
              Get 44% off our Pro plan for the Peerlist launch!
            </p>
          </div>

          {/* Pricing Cards */}
          <div className=" flex justify-center items-center mx-auto">
            {/* Pro Plan */}
            <div className="bg-white border-2 border-design-black rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-mono flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Launch Special
                </div>
              </div>

              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold text-design-black text-center font-mono mb-2">Pro</h3>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-400 line-through font-mono">$12</span>
                  <span className="text-4xl font-bold text-design-black font-mono">$4.99</span>
                  <span className="text-gray-600 font-mono ml-2">one-time</span>
                </div>
                <div className="text-center">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                    Save $8.00 (66% OFF)
                  </span>
                </div>
                <p className="text-gray-600 font-mono mt-2">One year access to all features</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="font-semibold">Unlimited website revisions</span>
                </li>
                <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>All premium themes</span>
                </li>
               <li className="flex items-center font-mono">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Upto 50k visits</span>
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
                  <span>All future features included</span>
                </li>
              </ul>

              <Link href="/preview">
                
                <FramerButton
                variant="primary"
                icon={<Upload className="w-4 h-4" />}
                className="text-md py-6 text-center group relative overflow-hidden w-full "
                iconClassName="ml-4 absolute flex items-center justify-center h-8 w-8 p-1 rounded-[0.5em] right-2 transition-all duration-300"
              >
                Get $4.99 Launch Price
              </FramerButton>
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
                  Yes! Pay once, use for a year. No monthly subscriptions, no hidden fees. Your $12 payment gives you one year access to all Pro features.
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
                  At $12 for yearly access, we believe our pricing is already very accessible. However, if you have special circumstances, feel free to reach out to our support team for a discount.
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