// Featured-project metadata. Long-form case-study prose lives in
// /content/projects/<slug>.mdx — edit that for narrative; edit this for facts.

export type ProjectStatus = "complete" | "ongoing";

// Curated categories for the filter on /projects (tags stay free-form).
export const categories = {
  hardware: "Hardware",
  "robot-learning": "Robot learning",
  simulation: "Simulation",
  "estimation-control": "Estimation & control",
} as const;
export type Category = keyof typeof categories;

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  // Shown on the card when known, e.g. "May 2026 — Jun 2026".
  period?: string;
  // One-line "what + the non-obvious decision", shown on the card.
  summary: string;
  tags: string[];
  // Public repository. Omit for private code (e.g. coursework), and set
  // `codeNote` to explain where the code is instead.
  repo?: string;
  codeNote?: string;
  // Path under /public.
  cover?: string;
  // Compact, verified result bullets for the card (no fabrication).
  highlights: string[];
  // Shown on the home page. Exactly 3 projects must be featured.
  featured: boolean;
  // Position among the featured projects on the home page.
  order: number;
  // Spans the full width of the projects grid (side-by-side layout on desktop).
  wide?: boolean;
  category: Category[];
  // Machine-readable dates ("YYYY-MM") for sorting; `period` is the display text.
  // Leave `end` out for work that is still going.
  start: string;
  end?: string;
  // Shorter summary for the dense /projects grid; falls back to `summary`.
  oneLiner?: string;
};

export const projects: Project[] = [
  {
    slug: "yt-to-humanoid",
    title: "Video to Humanoid — Whole-Body Imitation on a Simulated G1",
    status: "complete",
    period: "Oct 2026",
    summary:
      "An ordinary video goes in; a simulated Unitree G1 dances like the person in it. I wired NVIDIA's open perception and whole-body control models into one reproducible pipeline — and measured how faithfully the robot actually follows.",
    tags: ["Humanoid", "Whole-Body Control", "MuJoCo", "Pose Estimation", "Evaluation"],
    repo: "https://github.com/raoulbouri/YT-to-humanoid",
    cover: "/projects/yt-humanoid-card.mp4",
    highlights: [
      "End to end: video → 3D human pose → streamed joint targets → a learned whole-body policy balancing a 29-DoF humanoid in MuJoCo",
      "Robot never fell across 7 replays; human-vs-robot limb angles correlate 0.8–0.9, with 0.4 s measured latency",
      "Evaluation traced the biggest error to perception, not control — side-on video hides how far apart the hands are",
    ],
    featured: true,
    order: 0,
    category: ["robot-learning", "simulation"],
    start: "2026-10",
    end: "2026-10",
    oneLiner:
      "An ordinary video in, a simulated Unitree G1 dancing like the person in it, plus measurements of how faithfully it follows.",
    wide: true,
  },
  {
    slug: "f1tenth-autonomy",
    title: "F1TENTH Autonomy Stack — CMU 16-665",
    status: "complete",
    period: "Aug 2026 — Sep 2026",
    summary:
      "Taking a 1/10-scale race car from emergency braking to planning around obstacles, one capability at a time — and running every step on the real car, not just in simulation.",
    tags: ["ROS 2", "Pure Pursuit", "RRT", "Particle Filter", "LiDAR", "Hardware"],
    codeNote: "Code is private under course policy — happy to walk through it on request.",
    // A .mp4 cover renders as a silent looping video (poster: same name, .jpg).
    cover: "/projects/f1tenth-pursuit-hardware-card.mp4",
    highlights: [
      "Four steps on the real car: wall following with emergency braking → follow-the-gap → particle-filter pure pursuit → RRT detours",
      "Pure pursuit lookahead swept 0.3–2.0 m in sim against wall clearance; kept 0.6 m to tolerate particle-filter pose noise on the car",
      "RRT local planner on a LiDAR occupancy grid: 15/15 clean simulated laps, with a full detour flown on every run",
    ],
    featured: true,
    order: 1,
    category: ["hardware", "estimation-control"],
    start: "2026-08",
    end: "2026-09",
    oneLiner:
      "A 1/10-scale race car taken from emergency braking to planning around obstacles, every step run on the real car.",
  },
  {
    slug: "proprioceptive-contact-detection",
    title: "Proprioceptive Contact Estimation",
    status: "complete",
    period: "May 2026 — Jun 2026",
    summary:
      "Estimating external contact torque on a robot arm from joint encoders alone — by admitting the dynamics model is wrong and letting a Kalman filter turn that disagreement into signal.",
    tags: ["EKF", "Residual Learning", "MuJoCo", "Estimation", "Python"],
    repo: "https://github.com/raoulbouri/proprioceptive-contact-detection",
    cover: "/projects/contact-detection-demo.gif",
    highlights: [
      "Deliberately-wrong analytical model + NN residual trained only on contact-free data",
      "Augmented EKF: model disagreement during contact becomes the external-torque estimate",
      "AUC 0.99, detection SNR ~17×, faster than a classical momentum observer with perfect dynamics",
    ],
    featured: false,
    order: 4,
    category: ["estimation-control", "simulation"],
    start: "2026-05",
    end: "2026-06",
    oneLiner:
      "Contact torque on a robot arm from joint encoders alone, by turning dynamics-model errors into a signal.",
  },
  {
    slug: "deep-rl-cs285",
    title: "Robot Learning in Sim — CS 285 + CMU 16-831",
    status: "complete",
    period: "Feb 2026 — Sep 2026",
    summary:
      "Imitation learning, policy gradients, DQN and SAC built from scratch across two courses — and run as controlled experiments, with sweeps and ablations read through one idea about where learning goes wrong.",
    tags: ["Imitation Learning", "Policy Gradients", "SAC", "DQN", "PyTorch", "MuJoCo"],
    repo: "https://github.com/raoulbouri/uc_berkeley_CS-285",
    codeNote: "CMU 16-831 code is private under course policy — available on request.",
    cover: "/projects/cs285-halfcheetah-sac.gif",
    highlights: [
      "DAgger closes the gap to the expert on Ant (BC 3,316 → 4,766 vs expert 4,752) — but not on Humanoid, where a 20-model sweep showed the limit was data, not drift",
      "50 policy-gradient runs ablating reward-to-go, baselines and GAE across CartPole, LunarLander, HalfCheetah and Hopper",
      "SAC from scratch learns a HalfCheetah gait (~4,200 eval return); two robotics papers (ACT, HORA) tied back to the methods",
    ],
    featured: true,
    order: 2,
    category: ["robot-learning", "simulation"],
    start: "2026-02",
    end: "2026-09",
    oneLiner:
      "Imitation learning, policy gradients, DQN and SAC built from scratch and run as controlled experiments.",
  },
  {
    slug: "bipedal-walker",
    title: "Self-Designed Bipedal Walker",
    status: "ongoing",
    period: "Jul 2026 — Present",
    summary:
      "A 784 g Jetson-class biped, and the validation work that found the simulator was 3.3× too slow to stabilize it — because a missing back-EMF term had a control gain impersonating physics.",
    tags: ["MuJoCo", "Digital Twin", "System ID", "MPC", "Hardware"],
    repo: "https://github.com/raoulbouri/bipedal-walker",
    cover: "/projects/biped-hardware.jpg",
    highlights: [
      "Cross-checking system ID against modal analysis exposed a missing back-EMF damping term (0.05 vs 0.624 N·m·s/rad)",
      "Worst-case pose needs 1.86× the actuator bandwidth of the nominal stand pose — analyze the envelope, not one pose",
      "An RL policy with healthy training curves failed physical gates: duty factor 1.00 means standing, not walking",
    ],
    featured: false,
    order: 3,
    category: ["hardware", "simulation", "estimation-control"],
    start: "2026-07",
    oneLiner:
      "A self-designed 784 g biped, and the digital-twin validation that caught a simulator too slow to stabilize it.",
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

if (featuredProjects.length !== 3) {
  throw new Error(
    `content/projects.ts: exactly 3 projects must have featured: true (found ${featuredProjects.length}).`
  );
}

// /projects order: in-progress work first, then newest first by end date.
export const allProjects = [...projects].sort((a, b) => {
  if (a.status !== b.status) return a.status === "ongoing" ? -1 : 1;
  const endA = a.end ?? "9999-99";
  const endB = b.end ?? "9999-99";
  if (endA !== endB) return endB.localeCompare(endA);
  return b.start.localeCompare(a.start);
});

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
