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
        impact: "Microservice grounding LLM responses to enterprise source documents",
        bullets: [
          "Improved citation coverage by combining lexical methods with LLM-based extraction, reserving model inference for low-confidence cases to balance accuracy, latency and cost.",
          "Productionized the service for 100 RPS at p90 latency < 3s, enabling citation-backed Generative Search responses.",
        ],
      },
      {
        title: "Agent Registry and Custom Workflow Agents",
        impact: "Infrastructure for reusable agent workflows through a centralized registry",
        bullets: [
          "Established a centralized agent registry that standardized capability discovery, onboarding, and lifecycle management.",
          "Enabled 100+ agents to interoperate via a standardized REST API, serving over 30% of weekly search traffic.",
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
          "Developed an agentic analytics engine that translated natural-language queries into validated SQL through semantic retrieval and structured error recovery.",
          "Adopted by the Founder's Office and business leaders for weekly operational reviews, achieving 92% task success and 85% precision on an enterprise benchmark.",
        ],
      },
      {
        title: "Food Delivery Time Prediction",
        impact: "Improving customer experience by reducing delivery delays and cancellations",
        bullets: [
          "Built a streaming feature pipeline with continuous feature computation for real-time ETA prediction.",
          "Enabled the service with automated monitoring and drift detection to ensure reliable low-latency deployment.",
          "Achieved 95% ETA accuracy across 100k+ daily orders, reducing cancellations from 26% to 14%.",
        ],
      },
      {
        title: "OCR for Driver & Customer Onboarding",
        impact: "Accelerated onboarding and reduced manual verification costs across India",
        bullets: [
          "Developed a document processing pipeline that generalized across 15+ Indian government-issued documents through vision-based segmentation and OCR.",
          "Deployed the service to process 10k+ daily requests with 98% accuracy, enabling nationwide rollout and saving over INR 5 lakh/month.",
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
          "Implemented RGB-D SLAM for reliable indoor navigation in an assistive robot. Enhanced the perception stack with multimodal emotion recognition (74% weighted accuracy) and emotion-aware speech synthesis for natural human-robot interaction.",
        ],
      },
    ],
  },
];

export const education = [
  {
    school: "Carnegie Mellon University",
    degree: "MS, Robotic Systems Development",
    period: "2026 — 2028",
    detail: "Robo-Learning · Deep Learning · Advanced Computer Vision",
  },
  {
    school: "BITS Pilani",
    degree: "BE, Mechanical Engineering (AI Minor)",
    period: "2020 — 2024",
    detail: "CGPA 8.6/10 · Control Systems · Kinematics & Dynamics · ML/DL",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "C++", "SQL", "R", "MATLAB"],
  },
  {
    group: "ML / Robotics",
    items: ["PyTorch", "TensorFlow", "ROS", "MuJoCo", "Gazebo", "OpenCV", "EKF / State Estimation", "RL (SAC)"],
  },
  {
    group: "Systems / MLOps",
    items: ["FastAPI", "PySpark", "Kafka", "Redis", "Airflow", "Docker", "Ray", "MLflow", "AWS", "Grafana"],
  },
  {
    group: "LLM / Agents",
    items: ["LangGraph", "Fine-tuning (LLM/VLM)", "RAG", "Agentic workflows"],
  },
];
