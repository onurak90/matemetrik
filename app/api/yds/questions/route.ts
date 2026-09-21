import { NextResponse } from 'next/server';
import { getYdsQuestions, getYdsTopics, getYdsSummary } from '@/lib/yds';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('topic');
    const difficulty = searchParams.get('difficulty');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    if (!topic) {
      const summary = getYdsSummary();
      const topics = getYdsTopics();
      return NextResponse.json({
        summary,
        topics,
      });
    }

    let questions = getYdsQuestions(topic);
    if (difficulty && ['kolay', 'orta', 'ileri'].includes(difficulty)) {
      questions = questions.filter((q) => q.difficulty === difficulty);
    }

    if (limit && limit > 0) {
      questions = questions.slice(0, limit);
    }

    return NextResponse.json({
      topic,
      total: questions.length,
      questions,
    });
  } catch (error) {
    console.error('Error fetching YDS questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
