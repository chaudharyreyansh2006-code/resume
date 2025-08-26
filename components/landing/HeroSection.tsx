import { FramerButton } from "@/components/ui/framer-button"
import { Upload, Sparkles, Eye } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative mx-auto pb-12 overflow-hidden min-h-screen">
      <div className="absolute hidden md:block left-20 top-35 w-72 h-96 z-1 opacity-60 rounded-lg">
        <div className="relative w-full h-full -rotate-12 transform origin-center rounded-lg">
          <img src="/gray-theme.png" alt="" className="w-full h-full object-cover object-top border border-gray-200 rounded-lg" />
          {/* Dissolving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white rounded-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent rounded-lg"></div>
        </div>
      </div>

      <div className="absolute hidden md:block right-20 top-35 w-72 h-96 z-1 opacity-60 rounded-lg">
        <div className="relative w-full h-full rotate-12 transform origin-center rounded-lg">
          <img src="/minimal-theme.png" alt="" className="w-full h-full object-cover object-top border border-gray-200 rounded-lg" />
          {/* Dissolving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white rounded-lg"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent rounded-lg"></div>
        </div>
      </div>

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
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      <div className="px-4 py-12 pt-32 max-w-6xl mx-auto text-center">
        <div className="relative z-10 space-y-6">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              CVFolio.Me
            </div>
            <h1 className="text-4xl sm:text-7xl font-bold text-gray-800 leading-[1.1]">
              Resume PDF to
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 font-[family-name:var(--font-instrument-serif)] tracking-normal leading-[1.05]">
                  Stunning Portfolio Website
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link href="/upload">
              <FramerButton
                variant="primary"
                icon={<Upload className="w-4 h-4" />}
                className="text-md py-6 group relative overflow-hidden w-full sm:w-auto "
                iconClassName="ml-4 absolute flex items-center justify-center h-8 w-8 p-1 rounded-[0.5em] right-2 transition-all duration-300"
              >
                Get $4.99 Launch Price
              </FramerButton>
            </Link>
            <Link href="/demo">
              <FramerButton
                variant="secondary"
                icon={<Eye className="w-4 h-4" />}
                className="text-md py-6 group relative overflow-hidden w-full sm:w-auto"
              >
                View Demo Portfolio              
                </FramerButton>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <img
                  src="/avatar5.webp"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/avatar3.webp"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/avatar2.webp"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/avatar6.webp"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/avatar1.webp"
                  alt="User avatar"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
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
            <p className="text-gray-600 font-medium">Trusted by professionals</p>
          </div>
          
          {/* Peerlist Badge */}
          <div className="flex justify-center mt-8">
            <a 
              href="https://peerlist.io/harvansh/project/cvfoliome" 
              target="_blank" 
              rel="noreferrer"
              className="transition-transform hover:scale-105"
            > 
              <img 
                src="https://peerlist.io/api/v1/projects/embed/PRJHJKNQBNGE7RO8GCRRPAK69ODGR8?showUpvote=true&theme=light" 
                alt="CVFolio.Me" 
                className="w-auto h-8 sm:h-10 md:h-12 lg:h-14" 
              /> 
            </a>
            <a href="https://www.producthunt.com/products/cvfolio-me?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-cvfolio&#0045;me" target="_blank"
            >
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1009472&theme=neutral&t=1756188473401" 
              alt="CVFolio&#0046;Me - Resume&#0032;pdf&#0032;to&#0032;stunning&#0032;portfolio&#0032;website&#0032;in&#0032;60&#0032;seconds | Product Hunt" 
              className="w-auto h-8 sm:h-10 md:h-12 lg:h-14 ml-4"  /></a>
          </div>
          
        </div>
      </div>
    </section>
  )
}
