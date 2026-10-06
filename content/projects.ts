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
    title: "YouTube Video to Humanoid: Whole-Body Control on a Simulated G1",
    status: "complete",
    period: "Oct 2026",
    summary:
      "An ordinary video goes in. A simulated Unitree G1 dances like the person (alien) in it. I wired NVIDIA's open perception and whole-body control models into one reproducible pipeline. Then I measured how closely the robot follows.",
    tags: ["Humanoid", "Whole-Body Control", "MuJoCo", "Pose Estimation", "Evaluation"],
    repo: "https://github.com/raoulbouri/YT-to-humanoid",
    cover: "/projects/yt-humanoid-card.mp4",
    highlights: [
      "A video-to-robot data pipeline: clip prep, 3D pose extraction, then frames streamed on a fixed real-time clock.",
      "The robot never fell in 7 replays. Human and robot limb angles correlate at 0.8 to 0.9, with 0.4 s of latency.",
      "A learned whole-body policy balances a 29-DoF humanoid in MuJoCo. The biggest error came from perception, not control.",
    ],
    featured: true,
    order: 0,
    category: ["robot-learning", "simulation"],
    start: "2026-10",
    end: "2026-10",
    oneLiner:
      "A simulated Unitree G1 copies the dancer in an ordinary video. I measured how closely it follows.",
    wide: true,
  },
  {
    slug: "f1tenth-autonomy",
    title: "F1TENTH Autonomy Stack (CMU 16-665)",
    status: "complete",
    period: "Aug 2026 to Sep 2026",
    summary:
      "A 1/10-scale race car, taken from emergency braking to planning around obstacles. Every step was tested on the real car, not just in simulation.",
    tags: ["ROS 2", "Pure Pursuit", "RRT", "Particle Filter", "LiDAR", "Hardware"],
    codeNote: "Code is private under course policy. Happy to walk through it on request.",
    // A .mp4 cover renders as a silent looping video (poster: same name, .jpg).
    cover: "/projects/f1tenth-pursuit-hardware-card.mp4",
    highlights: [
      "Four capabilities deployed on the real car: emergency braking, follow-the-gap, particle-filter pure pursuit and RRT detours.",
      "Every step went to simulation first, then to the car. The fixes that mattered came from hardware testing.",
      "RRT planner on a live LiDAR grid: 15 of 15 clean laps in simulation, then avoiding obstacles on the car.",
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
    period: "May 2026 to Jun 2026",
    summary:
      "Estimating contact torque on a robot arm from joint encoders alone. The dynamics model is deliberately wrong. A Kalman filter turns that error into a contact signal.",
    tags: ["EKF", "Residual Learning", "MuJoCo", "Estimation", "Python"],
    repo: "https://github.com/raoulbouri/proprioceptive-contact-detection",
    cover: "/projects/contact-detection-demo.gif",
    highlights: [
      "A deliberately wrong analytical model plus a neural-network correction trained only on contact-free motion.",
      "An augmented EKF turns model disagreement during contact into a torque estimate.",
      "ROC AUC 0.99 and about 17× detection SNR. It beats a classical momentum observer given perfect dynamics.",
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
    title: "Robot Learning in Sim (CS 285 + CMU 16-831)",
    status: "complete",
    period: "Feb 2026 to Sep 2026",
    summary:
      "Imitation learning, policy gradients, DQN and SAC, built from scratch across two courses. I ran them as controlled experiments: parallel sweeps and ablations, tracked and reproducible.",
    tags: ["Imitation Learning", "Policy Gradients", "SAC", "DQN", "PyTorch", "MuJoCo"],
    repo: "https://github.com/raoulbouri/uc_berkeley_CS-285",
    codeNote: "CMU 16-831 code is private under course policy. Available on request.",
    cover: "/projects/cs285-halfcheetah-sac.gif",
    highlights: [
      "50 policy-gradient runs launched in parallel and tracked in Weights & Biases, plus a 20-model imitation sweep.",
      "Runs are reproducible from launch scripts and fixed seeds. A repeated run matched its original exactly.",
      "DAgger matched the expert on Ant. SAC learned a HalfCheetah gait at about 4,200 return.",
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
    period: "Jul 2026 to Present",
    summary:
      "A self-designed 784 g biped with a Jetson on board. Validating its digital twin showed the simulator was 3.3× too slow to stabilize it. A missing back-EMF term had a control gain covering for it.",
    tags: ["MuJoCo", "Digital Twin", "System ID", "MPC", "Hardware"],
    repo: "https://github.com/raoulbouri/bipedal-walker",
    cover: "/projects/biped-hardware.jpg",
    highlights: [
      "Cross-checking system ID against modal analysis exposed a missing back-EMF damping term (0.05 vs 0.624 N·m·s/rad).",
      "The worst-case pose needs 1.86× the actuator bandwidth of standing. Analyze the whole envelope, not one pose.",
      "An RL policy with healthy training curves failed physical checks. Duty factor 1.00 means standing, not walking.",
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
