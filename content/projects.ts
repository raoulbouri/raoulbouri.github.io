// Featured-project metadata. Long-form case-study prose lives in
// /content/projects/<slug>.mdx — edit that for narrative; edit this for facts.
// Only verified facts from the repos are prefilled. Prose is TODO(Rahul).

export type ProjectStatus = "complete" | "ongoing";

export type Project = {
  slug: string;
  title: string;
  status: ProjectStatus;
  // One-line "what + the non-obvious decision", shown on the card.
  summary: string;
  tags: string[];
  repo: string;
  // Path under /public. TODO(Rahul): drop the real cover asset in place.
  cover?: string;
  // Compact, verified result bullets for the card (no fabrication).
  highlights: string[];
  featured: boolean;
  order: number;
};

export const projects: Project[] = [
  {
    slug: "proprioceptive-contact-detection",
    title: "Proprioceptive Contact Detection",
    status: "complete",
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
    order: 1,
  },
  {
    slug: "franka-panda-sac",
    title: "Hierarchical SAC for Pick-and-Place",
    status: "complete",
    summary:
      "A two-tier RL controller for a Franka Panda in ROS + Gazebo — and an honest account of why symbolic Lagrangian priors broke and residual RL didn't.",
    tags: ["Reinforcement Learning", "SAC", "ROS", "Gazebo", "PyTorch"],
    repo: "https://github.com/raoulbouri/Franka_Panda_SAC_using_ROS_and_Gazebo",
    // TODO(Rahul): add a real cover asset — falls back to the schematic placeholder until then.
    highlights: [
      "High-level SAC sequences Approach → Grasp → Transport → Place over low-level controllers",
      "DeLaN / symbolic Lagrangian caused numerical instability → pivoted to residual RL",
      "Gazebo contact fidelity forced heavy domain randomization; candid failure writeup",
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "bipedal-walker",
    title: "Bipedal Walker — Sim-to-Real Pipeline",
    status: "ongoing",
    summary:
      "An Onshape → URDF → MuJoCo pipeline for a 784g Jetson-class biped. The build system is done; the balance controller is what I'm building now.",
    tags: ["MuJoCo", "Sim-to-Real", "URDF/MJCF", "Hardware", "In progress"],
    repo: "https://github.com/raoulbouri/bipedal-walker",
    // TODO(Rahul): add a real cover asset — falls back to the schematic placeholder until then.
    highlights: [
      "Automated CAD→sim pipeline: Onshape URDF export → MJCF compile → RL-ready postprocess",
      "784g biped, 6 actuated joints, 24 sensors, Jetson Orin Nano + ST3215 servos",
      "Next up: balance / gait control (RL or classical) — currently the robot topples",
    ],
    featured: true,
    order: 3,
  },
];

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
