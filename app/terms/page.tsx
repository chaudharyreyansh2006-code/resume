import PublicHeader from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service - CVFolio.Me',
  description: 'Terms of service for CVFolio.Me resume to website conversion service.',
};

export default function TermsPage() {
  return (
    <>
      <PublicHeader />
      
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-design-black font-mono mb-8">
              Terms of Service
            </h1>
            
            <div className="text-sm text-gray-600 font-mono mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <div className="prose prose-gray max-w-none font-mono text-design-black">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4 leading-relaxed">
                  By accessing and using CVFolio.Me ("Service"), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                <p className="mb-4 leading-relaxed">
                  CVFolio.Me is a web-based service that converts resumes and LinkedIn profiles into professional websites. We offer both free and premium features.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. User Accounts and Registration</h2>
                <p className="mb-4 leading-relaxed">
                  To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
                <p className="mb-4 leading-relaxed">
                  Our Pro Plan is available for a one-time payment of $9.00 USD. This grants lifetime access to premium features including unlimited website generation.
                </p>
                <p className="mb-4 leading-relaxed">
                  All payments are processed securely through our payment processor. By making a purchase, you agree to provide accurate payment information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
                <p className="mb-4 leading-relaxed">
                  You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Upload content that is illegal, harmful, or violates others' rights</li>
                  <li>Attempt to gain unauthorized access to the Service</li>
                  <li>Use the Service to spam or distribute malware</li>
                  <li>Reverse engineer or attempt to extract source code</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Content and Intellectual Property</h2>
                <p className="mb-4 leading-relaxed">
                  You retain ownership of the content you upload. By using our Service, you grant us a limited license to process and display your content for the purpose of providing the Service.
                </p>
                <p className="mb-4 leading-relaxed">
                  The Service and its original content, features, and functionality are owned by CVFolio.Me and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Privacy and Data Protection</h2>
                <p className="mb-4 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. Service Availability</h2>
                <p className="mb-4 leading-relaxed">
                  We strive to maintain high availability but do not guarantee uninterrupted access to the Service. We may temporarily suspend the Service for maintenance or updates.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="mb-4 leading-relaxed">
                  To the maximum extent permitted by law, CVFolio.Me shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
                <p className="mb-4 leading-relaxed">
                  We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="mb-4 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page with an updated revision date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
                <p className="mb-4 leading-relaxed">
                  If you have any questions about these Terms, please contact us through our website or support channels.
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