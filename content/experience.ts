// Work timeline. Projects are nested under each role to preserve the hierarchy
// from the LaTeX resume.

export type Project = {
  title: string;
  impact: string;
  bullets: string[];
};

export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  projects: Project[];
};

export const experience: Role[] = [
  {
    company: "AlphaSense",
    title: "AI Research Engineer",
    location: "Bangalore, India",
    period: "Dec 2025 — Jul 2026",
    projects: [
      {
        title: "Citation Service for Generative Search",
        impact: "Document-grounding service tying LLM responses to enterprise source documents",
        bullets: [
          "Combined lexical methods with LLM-based extraction using confidence-aware inference, reserving model calls for low-confidence cases to balance accuracy, latency and cost.",
          "Containerized the FastAPI service with Docker and deployed it on AWS, achieving p90 latency < 3s at 100 RPS for citation-backed Generative Search responses.",
        ],
      },
      {
        title: "Agent Registry and Custom Workflow Agents",
        impact: "Infrastructure for reusable agent workflows through a centralized registry",
        bullets: [
          "Established a centralized registry and standardized interface that unified capability discovery, onboarding, and lifecycle management.",
          "Enabled 100+ agent workflows to interoperate via a standardized REST API, handling 30% of production traffic.",
        ],
      },
    ],
  },
  {
    company: "OLA Cabs",
    title: "Machine Learning Engineer",
    location: "Bangalore, India",
    period: "Aug 2024 — Nov 2025",
    projects: [
      {
        title: "Enterprise Agentic Query Engine",
        impact: "Enabled leadership to monitor organization performance via natural language queries",
        bullets: [
          "Built fault-tolerant data pipelines with checkpointing to continuously ingest operational metrics while minimizing cost.",
          "Developed a natural-language analytics system using semantic retrieval, SQL generation with validation, and structured error recovery.",
          "Adopted by the Founder's Office and business leaders for weekly operational reviews, achieving 92% task success in human-verified evaluations.",
        ],
      },
      {
        title: "Food Delivery Time Prediction",
        impact: "Improving customer experience by reducing delivery delays and cancellations",
        bullets: [
          "Productionized an ETA prediction pipeline with real-time feature generation for 100K+ daily orders.",
          "Added automated monitoring and model drift detection to keep the low-latency service reliable in production.",
          "Achieved 95% of deliveries within ±2 minutes of the predicted ETA, reducing cancellations from 26% to 14%.",
        ],
      },
      {
        title: "OCR for Driver & Customer Onboarding",
        impact: "Accelerated onboarding and reduced manual verification costs across India",
        bullets: [
          "Developed an image segmentation and OCR pipeline that generalized across 15+ Indian government-issued documents.",
          "Deployed the service to process 10K+ daily requests at 98% accuracy, enabling nationwide rollout and reducing manual verification costs by INR 5 lakh+/month.",
        ],
      },
    ],
  },
  {
    company: "PwC USA",
    title: "Data Science Intern",
    location: "Bangalore, India",
    period: "Jan 2024 — Jun 2024",
    projects: [
      {
        title: "Agentic Retrieval Framework for Tax Systems",
        impact: "",
        bullets: [
          "Developed an agentic retrieval framework combining vector search, a knowledge graph, and a fine-tuned Llama-13B, improving retrieval precision by 30%, reducing token usage by 75%, and achieving 71% task accuracy on Indian tax documents.",
        ],
      },
    ],
  },
  {
    company: "TCS Research",
    title: "Robotics Intern",
    location: "New Delhi, India",
    period: "Jun 2023 — Dec 2023",
    projects: [
      {
        title: "Perception and Autonomy for Assistive Robotics",
        impact: "",
        bullets: [
          "Implemented RGB-D and LiDAR-based SLAM in ROS2 for autonomous indoor localization and navigation of an assistive robot.",
          "Built a multimodal emotion recognition pipeline in PyTorch (74% weighted accuracy) and integrated predicted emotions into a speech synthesis module for adaptive human-robot interaction.",
        ],
      },
    ],
  },
];

export const education = [
  {
    school: "Carnegie Mellon University",
    degree: "MS, Robotic Systems Development",
    period: "Aug 2026 — May 2028",
    detail: "Robot Learning · Planning & Decision Making · Robot Autonomy · Systems Engineering",
  },
  {
    school: "BITS Pilani",
    degree: "BE, Mechanical Engineering (AI Minor)",
    period: "Aug 2020 — May 2024",
    detail: "CGPA 8.6/10 · Control Systems · Mechanisms & Machines · Machine Learning · Deep Learning",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Robotics & Simulation",
    items: [
      "ROS2 (MoveIt2, Nav2, SLAM Toolbox, ROS2 Control)",
      "MuJoCo",
      "Isaac Sim / Lab",
      "OpenAI Gym",
      "EKF / State Estimation",
      "Reinforcement Learning",
      "System ID",
      "MATLAB",
      "CAD",
    ],
  },
  {
    group: "ML & Data",
    items: ["Python", "C++", "PyTorch", "SQL", "PySpark", "Ray", "Airflow", "MLflow", "Weights & Biases", "Multimodal ML"],
  },
  {
    group: "LLM & Agents",
    items: ["Fine-tuning (LLM/VLM)", "RAG", "Agentic workflows", "LangGraph"],
  },
  {
    group: "Infrastructure",
    items: ["Docker", "Kubernetes", "AWS / GCP", "FastAPI", "Redis", "Grafana", "Linux", "Git"],
  },
];
