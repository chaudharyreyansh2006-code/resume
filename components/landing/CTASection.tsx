import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export function CTASection() {
  return (
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
  );
}