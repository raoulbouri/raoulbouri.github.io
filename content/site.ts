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
  resume: "/rahul-bouri-cv.pdf",
  url: "https://raoulbouri.github.io",
  // Google Analytics 4 measurement ID ("G-XXXXXXXXXX", from GA Admin → Data
  // streams → your web stream). Empty = analytics off. See Analytics.tsx.
  gaMeasurementId: "",
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

// Section ids that the sticky nav observes for active-state highlighting.
export const sectionIds = ["home", "about", "projects", "experience", "research", "contact"];
