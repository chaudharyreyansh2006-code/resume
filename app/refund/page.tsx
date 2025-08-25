import PublicHeader from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Refund Policy - CVFolio.Me',
  description: 'Refund policy for CVFolio.Me Pro Plan purchases.',
};

export default function RefundPage() {
  return (
    <>
      <PublicHeader />
      
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-design-black font-mono mb-8">
              Refund Policy
            </h1>
            
            <div className="text-sm text-gray-600 font-mono mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <div className="prose prose-gray max-w-none font-mono text-design-black">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Overview</h2>
                <p className="mb-4 leading-relaxed">
                  This Refund Policy explains the terms and conditions for refunds of payments made for CVFolio.Me Pro Plan ($12.00 USD one-time payment).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. 30-Day Money-Back Guarantee</h2>
                <p className="mb-4 leading-relaxed">
                  We offer a 30-day money-back guarantee for all Pro Plan purchases. If you are not satisfied with our Service, you may request a full refund within 30 days of your purchase date.
                </p>
                <p className="mb-4 leading-relaxed">
                  To be eligible for a refund, you must:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Request the refund within 30 days of purchase</li>
                  <li>Provide a valid reason for the refund request</li>
                  <li>Have made a good faith effort to use the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Refund Process</h2>
                <p className="mb-4 leading-relaxed">
                  To request a refund:
                </p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li>Contact our support team through our website</li>
                  <li>Provide your purchase details and reason for refund</li>
                  <li>Allow up to 5 business days for review</li>
                  <li>If approved, refunds will be processed within 7-10 business days</li>
                </ol>
                <p className="mb-4 leading-relaxed">
                  Refunds will be issued to the original payment method used for the purchase.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Non-Refundable Circumstances</h2>
                <p className="mb-4 leading-relaxed">
                  Refunds will not be provided in the following cases:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Requests made after the 30-day period</li>
                  <li>Violation of our Terms of Service</li>
                  <li>Abuse or misuse of the refund policy</li>
                  <li>Technical issues on the user's end (browser compatibility, internet connectivity)</li>
                  <li>Change of mind after the 30-day period</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Service Interruptions</h2>
                <p className="mb-4 leading-relaxed">
                  In case of extended service outages or technical issues that prevent you from using the Service, we may offer:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Service credits</li>
                  <li>Extended access period</li>
                  <li>Full or partial refunds at our discretion</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Chargeback Policy</h2>
                <p className="mb-4 leading-relaxed">
                  We encourage customers to contact us directly before initiating a chargeback with their bank or credit card company. Chargebacks may result in account suspension and additional fees.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Processing Time</h2>
                <p className="mb-4 leading-relaxed">
                  Once a refund is approved:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Credit card refunds: 5-10 business days</li>
                  <li>PayPal refunds: 3-5 business days</li>
                  <li>Bank transfers: 7-14 business days</li>
                </ul>
                <p className="mb-4 leading-relaxed">
                  Processing times may vary depending on your financial institution.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Account Access After Refund</h2>
                <p className="mb-4 leading-relaxed">
                  Upon processing a refund, your Pro Plan access will be revoked, and your account will revert to the free tier. Any websites generated during your Pro Plan period will remain accessible.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
                <p className="mb-4 leading-relaxed">
                  For refund requests or questions about this policy, please contact our support team through our website. We aim to respond to all refund requests within 24 hours.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Policy Changes</h2>
                <p className="mb-4 leading-relaxed">
                  We reserve the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated revision date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}