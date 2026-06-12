import { fetchPosts, type Post } from "@/lib/nowu"
import { featured, more, stack, type Project } from "@/lib/projects"
import SpinCube from "@/components/SpinCube"

const socials = [
  { label: "x", href: "https://x.com/pranitbmane", external: true },
  { label: "github", href: "https://github.com/pranitmane", external: true },
  { label: "youtube", href: "https://youtube.com/@pranitmane", external: true },
  { label: "/now", href: "/now", external: false },
]

const statusStyle: Record<Project["status"], { dot: string; text: string }> = {
  live: { dot: "bg-accent", text: "text-accent" },
  beta: { dot: "bg-chai", text: "text-chai" },
  building: { dot: "bg-chai animate-pulse", text: "text-chai" },
  shipped: { dot: "bg-faint", text: "text-faint" },
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "Asia/Kolkata",
  })
}

function SectionLabel({ children, delay }: { children: string; delay: number }) {
  return (
    <h2
      className="rise mb-6 font-mono text-xs tracking-[0.2em] text-faint"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-accent">~/</span>
      {children}
    </h2>
  )
}

function StatusChip({ status }: { status: Project["status"] }) {
  const s = statusStyle[status]
  return (
    <span className={`flex shrink-0 items-center gap-1.5 font-mono text-[11px] ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-lg border border-line bg-white/[0.02] p-5 transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.04]">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-base text-foreground">{project.name}</h3>
        <StatusChip status={project.status} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.blurb}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-[11px] text-faint">
            {tag}
          </span>
        ))}
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-[11px] text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </article>
  )
}

export default async function Home() {
  let posts: Post[] = []
  try {
    posts = (await fetchPosts(0, 3)).items.slice(0, 3)
  } catch {
    // home should never crash because the feed is down
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:100%_56px]" />
      </div>

      <main className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28">
        {/* hero */}
        <header className="relative">
          <span
            className="rise pointer-events-none absolute -top-14 right-0 select-none font-serif text-[7rem] italic leading-none text-foreground/4 sm:-top-20 sm:text-[10rem]"
            aria-hidden
            style={{ animationDelay: "500ms" }}
          >
            अनंत
          </span>

          <div
            className="rise absolute right-2 top-32 hidden sm:block"
            style={{ animationDelay: "600ms" }}
          >
            <SpinCube />
          </div>

          <p className="rise font-mono text-xs text-faint" style={{ animationDelay: "0ms" }}>
            <span className="text-accent">pranit@dev</span>:~$ whoami
          </p>

          <h1
            className="rise mt-4 font-serif text-5xl italic tracking-tight text-foreground sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            pranit mane
          </h1>

          <p
            className="rise mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            i build things and think out loud. software engineer by day, indie
            builder at night — currently all-in on{" "}
            <span className="text-foreground">phonedown</span>,{" "}
            <span className="text-foreground">radial</span> &{" "}
            <span className="text-foreground">maptym</span>, shipping every
            thought to <a href="/now" className="text-accent underline underline-offset-4 hover:text-foreground transition-colors">/now</a> while at it.
            <span className="cursor-blink ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent" aria-hidden />
          </p>

          <nav
            className="rise mt-8 flex flex-wrap gap-2"
            style={{ animationDelay: "240ms" }}
            aria-label="social links"
          >
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
                {...(link.external
                  ? { target: "_blank", rel: "me noopener noreferrer" }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        {/* projects */}
        <section className="mt-24">
          <SectionLabel delay={320}>projects</SectionLabel>
          <div
            className="rise grid gap-4 sm:grid-cols-2"
            style={{ animationDelay: "400ms" }}
          >
            {featured.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          <ul className="rise mt-8 space-y-1" style={{ animationDelay: "480ms" }}>
            {more.map((project) => (
              <li
                key={project.name}
                className="group flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-md px-2 py-2 transition-colors hover:bg-white/[0.03] sm:flex-nowrap"
              >
                <span className="shrink-0 font-mono text-sm text-foreground">
                  {project.name}
                </span>
                <span className="hidden grow border-b border-dashed border-line sm:block" />
                <span className="text-sm text-muted sm:shrink-0">{project.blurb}</span>
                {project.links[0] && (
                  <a
                    href={project.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 font-mono text-[11px] text-faint transition-colors hover:text-accent"
                  >
                    ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* stack */}
        <section className="mt-24">
          <SectionLabel delay={560}>stack</SectionLabel>
          <dl className="rise space-y-3" style={{ animationDelay: "640ms" }}>
            {stack.map(({ group, items }) => (
              <div key={group} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <dt className="w-28 shrink-0 font-mono text-xs text-faint">{group}</dt>
                <dd className="flex flex-wrap gap-x-2 gap-y-1">
                  {items.map((item, i) => (
                    <span key={item} className="font-mono text-sm text-muted">
                      {item}
                      {i < items.length - 1 && <span className="ml-2 text-faint">·</span>}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* now */}
        <section className="mt-24">
          <SectionLabel delay={720}>now</SectionLabel>
          <div className="rise" style={{ animationDelay: "800ms" }}>
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <a
                    key={post.uid}
                    href={`/now#${post.uid}`}
                    className="group block border-l border-line pl-4 transition-colors duration-300 hover:border-accent/60"
                  >
                    <p className="line-clamp-3 whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted transition-colors group-hover:text-foreground">
                      {post.content}
                    </p>
                    <time className="mt-2 block font-mono text-xs text-faint">
                      {timeAgo(post.createdAt)} · {post.origin}
                    </time>
                  </a>
                ))}
              </div>
            ) : (
              <p className="font-mono text-sm text-faint">
                feed unreachable rn — try{" "}
                <a href="/now" className="text-accent hover:underline">
                  /now
                </a>{" "}
                directly.
              </p>
            )}
            <a
              href="/now"
              className="mt-8 inline-block font-mono text-xs text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              read the full feed →
            </a>
          </div>
        </section>

        {/* footer */}
        <footer className="mt-28 border-t border-line pt-10">
          <p className="rise font-serif text-2xl italic text-foreground/80" style={{ animationDelay: "880ms" }}>
            transparent as hell.
          </p>
          <div className="rise mt-6 flex flex-wrap items-center justify-between gap-4" style={{ animationDelay: "920ms" }}>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-accent"
                  {...(link.external
                    ? { target: "_blank", rel: "me noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="font-mono text-xs text-faint">© {new Date().getFullYear()} pranit mane · fueled by chai</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
