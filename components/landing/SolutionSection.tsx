import { Users, Clock, Zap } from 'lucide-react';

export function SolutionSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-design-black ">
            Get a website that actually gets you hired
          </h2>
          <p className="text-xl text-gray-600  max-w-3xl mx-auto">
            Transform your resume into a professional website that showcases your skills, personality, and achievements in a way that makes employers want to meet you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 ">Stand out from 250+ other applicants</h3>
                  <p className="text-gray-600 ">While others send PDFs, you send a link to your professional website. Instant differentiation.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                  <Clock className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 ">Save 10+ hours per week</h3>
                  <p className="text-gray-600 ">No more customizing resumes for each job. One website works for every application.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-gray-100 p-3 rounded-lg flex-shrink-0">
                  <Zap className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 ">3x more interview callbacks</h3>
                  <p className="text-gray-600 ">Professional websites get noticed. Our users report significantly higher response rates.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="/cv-home.png"
              className="w-full max-w-[500px]"
              alt="Website example"
            />
          </div>
        </div>
      </div>
    </section>
  );
}