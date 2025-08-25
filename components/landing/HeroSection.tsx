import { FramerButton } from "@/components/ui/framer-button"
import { Upload, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative mx-auto pb-12 overflow-hidden">
  {/* Circuit Board - Light Pattern */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
      backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
    }}
  />

      <div className="px-4 py-12 pt-32 max-w-6xl mx-auto text-center">
        <div className="relative z-10 space-y-6">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              CVFolio.Me
            </div>
            <h1 className="text-5xl sm:text-7xl  font-bold text-gray-800 leading-[1.1]">
  Resume PDF to
  <br />
  <span className="relative inline-block">
    <span className="relative z-10 font-[family-name:var(--font-instrument-serif)] tracking-normal leading-[1.05]">
      Stunning Website
    </span>
  </span>
  <br />
  in 60 seconds
</h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-tight">
              Create a professional resume website that stands out. No coding, no design skills needed. Just upload your
              PDF and watch the magic happen.
            </p>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            <Link href="/upload">
              <FramerButton
                variant="primary"
                icon={<Upload className="w-4 h-4" />}
                className="text-md py-6 group relative overflow-hidden w-full sm:w-auto"
              >
                Convert Now 
              </FramerButton>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">12+</span>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 font-medium">Trusted by professionals worldwide</p>
          </div>
          
        </div>
      </div>
    </section>
  )
}
