import Image from "next/image"

export function FolioLogo({ className = "w-32 h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logocvflat.png"
        alt="CVFolio.Me Logo"
        width={24}
        height={24}
        className="w-6 h-6"
      />
      <span className="text-lg font-bold text-gray-700 font-mono">
        Folio.Me
      </span>
    </div>
  )
}