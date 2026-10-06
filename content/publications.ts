// Publications, verbatim from the CV bibliography. Keep author string, dates,
// venues, and links exact — this is citable, not marketing copy.

export type Publication = {
  authors: string;
  date: string;
  title: string;
  venue?: string;
  publisher?: string;
  pages?: string;
  arxiv?: { id: string; category: string };
  url: string;
  // One-line approach/result summary from the résumé.
  note?: string;
};

export const publications: Publication[] = [
  {
    authors: "Bouri, Rahul et al.",
    date: "July 2025",
    title: "Agentic LLMs for Question Answering over Tabular Data",
    venue: "Proceedings of the 19th International Workshop on Semantic Evaluation (SemEval-2025)",
    publisher: "Association for Computational Linguistics",
    pages: "2249-2255",
    url: "https://aclanthology.org/2025.semeval-1.292/",
    note: "Multi-stage NL-to-SQL agent with query verification and iterative refinement. It scored 70.5% on DataBench QA (Task 8), against a 26% baseline.",
  },
  {
    authors: "Bouri, Rahul et al.",
    date: "Sept. 2025",
    title: "From Data to Alloys: Predicting and Screening High Entropy Alloys for High Hardness Using Machine Learning",
    arxiv: { id: "2509.13479", category: "cond-mat.mtrl-sci" },
    url: "https://arxiv.org/abs/2509.13479",
  },
  {
    authors: "Bouri, Rahul et al.",
    date: "July 2025",
    title: "Improving Narrative Classification and Explanation via Fine Tuned Language Models",
    venue: "Proceedings of the 19th International Workshop on Semantic Evaluation (SemEval-2025)",
    publisher: "Association for Computational Linguistics",
    pages: "2233-2239",
    url: "https://aclanthology.org/2025.semeval-1.290/",
    note: "Recall-oriented BERT fine-tuning refined by GPT-4o, with ReAct retrieval prompting and taxonomy grounding to curb hallucinated justifications (Task 10).",
  },
];
