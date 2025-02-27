export interface ResearchFinding {
  id: number;
  text: string;
  source: string;
}

export interface ResearchParams {
  topic: string;
  audience?: string;
  purpose?: string;
  keyPoints: string[];
} 