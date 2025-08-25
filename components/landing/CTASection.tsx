import { FramerButton } from "@/components/ui/framer-button"
import Link from "next/link"
import { Hammer } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-black via-gray-900 to-black p-16 overflow-hidden">
          {/* Pattern elements with low opacity */}
 
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right,rgba(224, 228, 232, 0.44) 1px, transparent 1px),
        linear-gradient(to bottom,rgba(226, 232, 240, 0.73) 1px, transparent 1px)
      `,
      backgroundSize: "20px 30px",
      WebkitMaskImage:
        "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
      maskImage:
        "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
    }}
  />
     
    

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to Stand Out?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Stop sending boring PDFs. Start sharing a professional website that gets you noticed.
            </p>

        
                        <Link href="/login">
                <FramerButton 
                  variant="primary" 
                  icon={<Hammer className="w-4 h-4" />} 
                  className="text-md py-6 group relative overflow-hidden"
                >
                  Create My Website
                </FramerButton>
              </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
