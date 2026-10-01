// Featured-project metadata. Long-form case-study prose lives in
// /content/projects/<slug>.mdx — edit that for narrative; edit this for facts.

export type ProjectStatus = "complete" | "ongoing";

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
  featured: boolean;
  order: number;
};

export const projects: Project[] = [
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
    featured: true,
    order: 3,
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
    order: 4,
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
    featured: true,
    order: 2,
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
