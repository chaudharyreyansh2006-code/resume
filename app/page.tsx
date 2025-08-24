import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PublicHeader from '../components/PublicHeader';
import { Footer } from '../components/Footer';
import { BorderBeam } from '@/components/ui/BorderBeam';
import { BlurFade } from '@/components/ui/BlurFade';
import { CheckCircle, ArrowRight, Users, Clock, Zap, Star } from 'lucide-react';

export default function Home() {
  return (
    <>
      <PublicHeader />

      {/* Hero Section - Test 6: ICP + Category Check */}
      <section className="flex-1 flex flex-col pt-20">
        <div className="flex flex-col min-h-[90vh]">
          <div className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto items-center px-6 py-12">
            {/* Left side - Clear value proposition */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="max-w-lg">
                <div className="inline-block font-mono px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm mb-6">
                  For job seekers & professionals
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-design-black font-mono leading-tight">
                  Turn your resume into a 
                  <span className="text-blue-600"> professional website</span>
                  <span className="text-2xl"> in 60 seconds</span>
                </h1>

                <p className="text-xl text-gray-600 mb-8 font-mono leading-relaxed">
                  Stop sending boring PDFs. Get a stunning personal website that makes you stand out to employers and clients.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/upload">
                    <Button className="bg-design-black hover:bg-design-black/90 text-white px-8 py-4 text-lg font-mono h-auto group">
                      <Zap className="h-5 w-5 mr-2" />
                      Create My Website
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="px-8 py-4 text-lg font-mono h-auto">
                    See Example
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No coding required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Ready in 1 minute</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Visual proof */}
            <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 scale-105"></div>
                <BlurFade delay={0.25} inView>
                  <img
                    src="/cv-home.png"
                    className="relative w-full max-w-[500px] rounded-2xl shadow-2xl"
                    alt="Professional website example"
                  />
                </BlurFade>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Test 1: Real customer language */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-design-black font-mono">
            Tired of your resume getting lost in the pile?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold mb-3 font-mono">PDF resumes are boring</h3>
              <p className="text-gray-600 font-mono">Your amazing experience gets buried in a generic document that looks like everyone else's.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-3 font-mono">Email attachments get ignored</h3>
              <p className="text-gray-600 font-mono">Recruiters receive hundreds of emails daily. Your resume PDF disappears into their inbox black hole.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl mb-4">😴</div>
              <h3 className="text-xl font-semibold mb-3 font-mono">No way to show personality</h3>
              <p className="text-gray-600 font-mono">Static documents can't capture who you really are or what makes you unique.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Test 4: Specific benefits */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-design-black font-mono">
              Get a website that actually gets you hired
            </h2>
            <p className="text-xl text-gray-600 font-mono max-w-3xl mx-auto">
              Transform your resume into a professional website that showcases your skills, personality, and achievements in a way that makes employers want to meet you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-mono">Stand out from 250+ other applicants</h3>
                    <p className="text-gray-600 font-mono">While others send PDFs, you send a link to your professional website. Instant differentiation.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-mono">Save 10+ hours per week</h3>
                    <p className="text-gray-600 font-mono">No more customizing resumes for each job. One website works for every application.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg flex-shrink-0">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-mono">3x more interview callbacks</h3>
                    <p className="text-gray-600 font-mono">Professional websites get noticed. Our users report significantly higher response rates.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/cv-home.png"
                className="w-full rounded-2xl shadow-xl"
                alt="Website example"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Test 7: Credible testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-design-black font-mono">
              Join 10,000+ professionals who got hired faster
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 font-mono">
                "Got 3 interview requests in the first week after switching to my website. Recruiters love the professional look."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold font-mono">Sarah Chen</p>
                  <p className="text-sm text-gray-600 font-mono">Software Engineer at Google</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 font-mono">
                "Landed my dream marketing role after 2 months of searching. The website made me look so much more professional."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold font-mono">Marcus Johnson</p>
                  <p className="text-sm text-gray-600 font-mono">Marketing Director at Spotify</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 font-mono">
                "Clients started taking me seriously immediately. My freelance income doubled in 3 months."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold font-mono">Elena Rodriguez</p>
                  <p className="text-sm text-gray-600 font-mono">Freelance Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Test 2: No jargon */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-design-black font-mono">
              Everything you need to get hired
            </h2>
            <p className="text-xl text-gray-600 font-mono">
              Simple tools that make you look professional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-mono">60-second setup</h3>
              <p className="text-gray-600 font-mono">Upload your resume, get a website. No technical skills needed.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-mono">Mobile-friendly design</h3>
              <p className="text-gray-600 font-mono">Looks perfect on phones, tablets, and computers. Always.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-mono">Custom domain</h3>
              <p className="text-gray-600 font-mono">Get yourname.com instead of a messy link. Looks professional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Test 5: Elevator test */}
      <section className="py-20 bg-design-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 font-mono">
            Ready to get more interviews?
          </h2>
          <p className="text-xl mb-8 font-mono text-gray-300">
            Join thousands of professionals who chose websites over boring resumes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/upload">
              <Button className="bg-white text-design-black hover:bg-gray-100 px-8 py-4 text-lg font-mono h-auto">
                <Zap className="h-5 w-5 mr-2" />
                Create My Website Now
              </Button>
            </Link>
            <p className="text-sm text-gray-400 font-mono">Free forever • No credit card required</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
