import { Fragment } from "react"

const links = [
  { label: "x", href: "https://x.com/pranitbmane", external: true },
  { label: "yt", href: "https://youtube.com/@pranitmane", external: true },
  { label: "gh", href: "https://github.com/pranitmane", external: true },
  { label: "web", href: "https://pranit.dev", external: true },
  { label: "nowu", href: "/now", external: false },
]

export default function Socials({ className }: { className?: string }) {
  return (
    <div className={`text-xs sm:text-sm font-mono text-gray-400 tracking-wide text-center px-4 ${className ?? ""}`}>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {links.map((link, i) => (
          <Fragment key={link.label}>
            {i > 0 && <span>/</span>}
            <a
              href={link.href}
              className="hover:text-white transition-colors duration-300"
              {...(link.external
                ? { target: "_blank", rel: "me noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
