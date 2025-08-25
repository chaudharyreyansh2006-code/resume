import { Star } from 'lucide-react';

export function SocialProofSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-design-black ">
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
            <p className="text-gray-700 mb-4 ">
              "Got 3 interview requests in the first week after switching to my website. Recruiters love the professional look."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="font-semibold ">Sarah Chen</p>
                <p className="text-sm text-gray-600 ">Software Engineer at Google</p>
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
            <p className="text-gray-700 mb-4 ">
              "Landed my dream marketing role after 2 months of searching. The website made me look so much more professional."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="font-semibold ">Marcus Johnson</p>
                <p className="text-sm text-gray-600 ">Marketing Director at Spotify</p>
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
            <p className="text-gray-700 mb-4 ">
              "Clients started taking me seriously immediately. My freelance income doubled in 3 months."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="font-semibold ">Elena Rodriguez</p>
                <p className="text-sm text-gray-600 ">Freelance Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}