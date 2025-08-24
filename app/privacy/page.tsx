import PublicHeader from '@/components/PublicHeader';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy - CVFolio.Me',
  description: 'Privacy policy for CVFolio.Me explaining how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <PublicHeader />
      
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-design-black font-mono mb-8">
              Privacy Policy
            </h1>
            
            <div className="text-sm text-gray-600 font-mono mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <div className="prose prose-gray max-w-none font-mono text-design-black">
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <p className="mb-4 leading-relaxed">
                  When you create an account, we collect your email address and authentication information through our secure login system.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Resume and Profile Data</h3>
                <p className="mb-4 leading-relaxed">
                  We process the resume and LinkedIn profile information you upload to generate your website. This may include:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Professional experience and work history</li>
                  <li>Education and certifications</li>
                  <li>Skills and competencies</li>
                  <li>Contact information you choose to include</li>
                  <li>Profile pictures and other media</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Usage Data</h3>
                <p className="mb-4 leading-relaxed">
                  We automatically collect information about how you use our Service, including IP addresses, browser type, pages visited, and interaction patterns for analytics purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="mb-4 leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Generate and host your professional website</li>
                  <li>Process payments for premium features</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Improve our Service through analytics and user feedback</li>
                  <li>Send important updates about your account or our Service</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. Data Storage and Security</h2>
                <p className="mb-4 leading-relaxed">
                  We implement industry-standard security measures to protect your data:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Encrypted data transmission using HTTPS</li>
                  <li>Secure cloud storage with access controls</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal data on a need-to-know basis</li>
                </ul>
                <p className="mb-4 leading-relaxed">
                  Your uploaded files and generated websites are stored securely and are only accessible to you and our authorized systems.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
                <p className="mb-4 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety, or that of our users</li>
                  <li>With service providers who assist in operating our Service (under strict confidentiality agreements)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
                <p className="mb-4 leading-relaxed">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Maintain your login session</li>
                  <li>Remember your preferences</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Improve user experience</li>
                </ul>
                <p className="mb-4 leading-relaxed">
                  You can control cookie settings through your browser, but some features may not function properly if cookies are disabled.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Your Rights and Choices</h2>
                <p className="mb-4 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Access and review your personal data</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                  <li>Opt out of non-essential communications</li>
                </ul>
                <p className="mb-4 leading-relaxed">
                  To exercise these rights, please contact us through our support channels.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                <p className="mb-4 leading-relaxed">
                  We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this policy. When you delete your account, we will remove your personal data within 30 days, except where retention is required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
                <p className="mb-4 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
                <p className="mb-4 leading-relaxed">
                  Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
                <p className="mb-4 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
                <p className="mb-4 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us through our website support channels.
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