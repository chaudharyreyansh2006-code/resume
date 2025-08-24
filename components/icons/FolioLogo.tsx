export function FolioLogo({ className = "w-32 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="24"
        fontSize="24"
        fontWeight="bold"
        fill="#000000"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        folio.me
      </text>
    </svg>
  );
}