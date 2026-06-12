export type ProjectStatus = "building" | "beta" | "live" | "shipped"

export interface ProjectLink {
  label: string
  href: string
  external: boolean
}

export interface Project {
  name: string
  blurb: string
  status: ProjectStatus
  tags: string[]
  links: ProjectLink[]
}

export const featured: Project[] = [
  {
    name: "phonedown",
    blurb:
      "an app that helps you actually put your phone down. currently in private beta.",
    status: "beta",
    tags: ["react native", "expo"],
    links: [],
  },
  {
    name: "radial",
    blurb:
      "discover people and devices physically around you. being built in the open as a 100-day sprint.",
    status: "building",
    tags: ["location", "discovery"],
    links: [],
  },
  {
    name: "nowu",
    blurb:
      "if twitter and telegram had a baby — a tiny self-hosted feed for raw, realtime thoughts. it powers /now on this site.",
    status: "live",
    tags: ["typescript", "api", "telegram"],
    links: [
      { label: "github", href: "https://github.com/pranitmane/nowu", external: true },
      { label: "/now", href: "/now", external: false },
    ],
  },
  {
    name: "maptym",
    blurb:
      "your life, plotted — a personal timeline drawn on the map.",
    status: "building",
    tags: ["maps", "timeline"],
    links: [],
  },
]

export const more: Project[] = [
  {
    name: "learn-telugu",
    blurb: "flashcards for telugu alphabets",
    status: "live",
    tags: [],
    links: [
      { label: "telugu.pranit.dev", href: "https://telugu.pranit.dev", external: true },
      { label: "github", href: "https://github.com/pranitmane/learn-telugu", external: true },
    ],
  },
  {
    name: "spotify-cli-aliases",
    blurb: "spotify in the terminal — fzf search + play",
    status: "shipped",
    tags: [],
    links: [
      { label: "github", href: "https://github.com/pranitmane/spotify-cli-aliases", external: true },
    ],
  },
  {
    name: "ytm-remote",
    blurb: "control youtube music from any device over websockets",
    status: "shipped",
    tags: [],
    links: [
      { label: "github", href: "https://github.com/pranitmane/YTM-Remote", external: true },
    ],
  },
  {
    name: "pdf2csv",
    blurb: "turned thousands of student result pdfs into excel sheets, automatically",
    status: "shipped",
    tags: [],
    links: [
      { label: "github", href: "https://github.com/pranitmane/pdf2csv-backend", external: true },
    ],
  },
  {
    name: "pomo-dots",
    blurb: "a pomodoro timer, reimagined",
    status: "shipped",
    tags: [],
    links: [
      { label: "github", href: "https://github.com/pranitmane/pomo-dots", external: true },
    ],
  },
]

export const stack: { group: string; items: string[] }[] = [
  { group: "core", items: ["typescript", "react", "next.js", "node.js"] },
  { group: "apps", items: ["react native", "expo"] },
  { group: "data & apis", items: ["postgres", "rest", "websockets"] },
  { group: "ship it", items: ["tailwind", "github actions", "ansible", "vercel"] },
  { group: "daily drivers", items: ["claude code", "figma", "a lot of chai"] },
]
