import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/ui/BlurFade';
import { CheckCircle, ArrowRight, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="flex-1 flex flex-col pt-20">
      <div className="flex flex-col min-h-[90vh]">
        <div className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto items-center px-6 py-12">
          {/* Left side - Clear value proposition */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="max-w-lg">
              <div className="inline-block font-mono px-3 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm mb-6">
                For job seekers & professionals
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-design-black font-mono leading-tight">
                Turn your resume into a 
                <span className="text-design-black"> professional website</span>
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
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  <span>No coding required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  <span>Ready in 1 minute</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Visual proof */}
          <div className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
            <div className="relative">
              <BlurFade delay={0.25} inView>
                <img
                  src="/cv-home.png"
                  className="relative w-full max-w-[500px]"
                  alt="Professional website example"
                />
              </BlurFade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}