import fs from 'fs';
import path from 'path';

export interface YdsTopic {
  id: string;
  title: string;
  englishTitle: string;
  shortTitle?: string;
  icon: string;
  color: string;
  badge: string;
  targetCount: number;
  questionCount: number;
  totalInRealExam: number;
  order: number;
  description: string;
  tacticalOverview: string;
  keyRules: string[];
  frequentMistakes: string[];
}

export interface YdsQuestion {
  id: string;
  topicId: string;
  topicTitle: string;
  subTopic?: string;
  difficulty: 'kolay' | 'orta' | 'ileri';
  yearOrSource?: string;
  passage?: string | null;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: {
    turkishTranslation: string;
    detailedReason: string;
    distractorAnalysis?: string;
    vocabularyNotes?: Array<{ word: string; meaning: string }>;
    tacticalTip?: string;
  };
}

export interface YdsSummary {
  totalQuestions: number;
  totalTopics: number;
  topics: Array<{
    id: string;
    title: string;
    questionCount: number;
    totalInRealExam: number;
    badge: string;
  }>;
}

const YDS_DATA_DIR = path.join(process.cwd(), 'data', 'yds');

export function getYdsTopics(): YdsTopic[] {
  try {
    const filePath = path.join(YDS_DATA_DIR, 'topics.json');
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const topics: YdsTopic[] = JSON.parse(content);
    return topics.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error reading YDS topics:', error);
    return [];
  }
}

export function getYdsTopic(idOrSlug: string): YdsTopic | null {
  const topics = getYdsTopics();
  return topics.find((t) => t.id === idOrSlug) || null;
}

export function getYdsQuestions(topicSlug: string): YdsQuestion[] {
  try {
    const filePath = path.join(YDS_DATA_DIR, `${topicSlug}.json`);
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading questions for ${topicSlug}:`, error);
    return [];
  }
}

export function getYdsSummary(): YdsSummary {
  try {
    const filePath = path.join(YDS_DATA_DIR, 'summary.json');
    if (!fs.existsSync(filePath)) {
      const topics = getYdsTopics();
      return {
        totalQuestions: topics.reduce((acc, t) => acc + (t.questionCount || 0), 0),
        totalTopics: topics.length,
        topics: topics.map((t) => ({
          id: t.id,
          title: t.title,
          questionCount: t.questionCount,
          totalInRealExam: t.totalInRealExam,
          badge: t.badge,
        })),
      };
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading YDS summary:', error);
    return { totalQuestions: 1000, totalTopics: 11, topics: [] };
  }
}
