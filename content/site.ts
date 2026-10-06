// Central site metadata + navigation. Single source of truth for links.

export const site = {
  name: "Rahul Bouri",
  role: "ML & Robotics Research Engineer",
  tagline: "Robot learning, foundation models, and scalable ML systems for Physical AI.",
  // Split so the real address never appears verbatim in server-rendered HTML —
  // ObfuscatedEmail assembles the mailto: link client-side after hydration.
  emailUser: "rahulbouri16",
  emailDomain: "gmail.com",
  emailDisplay: "rahulbouri16 [at] gmail [dot] com",
  location: "Pittsburgh, Pennsylvania",
  github: "https://github.com/raoulbouri",
  githubHandle: "raoulbouri",
  linkedin: "https://www.linkedin.com/in/raoulbouri/",
  linkedinHandle: "raoulbouri",
  // Résumé lives on Google Drive so it can be updated without a redeploy;
  // raoulbouri.github.io/resume redirects here (src/app/resume/page.tsx).
  resume: "https://drive.google.com/file/d/1k710PB1xyok_TsraOhDMqbm6Anq6OuuO/view?usp=sharing",
  url: "https://raoulbouri.github.io",
  // Google Analytics 4 measurement ID ("G-XXXXXXXXXX", from GA Admin → Data
  // streams → your web stream). Empty = analytics off. See Analytics.tsx.
  gaMeasurementId: "G-YGQK2FFCLB",
};

// `href` is absolute so links work from every page; `section` is the home-page
// section id used to highlight the link while scrolling the home page.
export type NavItem = { label: string; href: string; section: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "Projects", href: "/projects", section: "projects" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Research", href: "/#research", section: "research" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

// Section ids that the sticky nav observes for active-state highlighting.
export const sectionIds = ["home", "about", "projects", "experience", "research", "contact"];
