import { promises as fs } from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export async function getProjectBody(slug: string): Promise<string | null> {
  try {
    const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}
