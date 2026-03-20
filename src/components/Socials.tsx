const links = [
  { label: "x", href: "https://x.com/pranitbmane" },
  { label: "yt", href: "https://youtube.com/@pranitmane" },
  { label: "gh", href: "https://github.com/pranitmane" },
  { label: "web", href: "https://pranitmane.com" },
  { label: "nowu", href: "/now" },
]

export default function Socials({ className }: { className?: string }) {
  return (
    <div className={`text-xs sm:text-sm font-mono text-gray-400 tracking-wide text-center px-4 ${className ?? ""}`}>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {links.map((link, i) => (
          <>
            {i > 0 && <span key={`sep-${i}`}>/</span>}
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          </>
        ))}
      </div>
    </div>
  )
}
