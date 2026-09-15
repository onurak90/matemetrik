import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

interface PlanSummary {
  id: string;
  grade: number;
  subject: string;
  sheet: string;
  title: string;
  weeksCount: number;
  defaultHours: string;
}

let cachedPlans: any[] | null = null;

function loadPlans(): any[] {
  if (!cachedPlans) {
    const filePath = path.join(process.cwd(), 'data', 'cerceve-plans.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      cachedPlans = JSON.parse(content);
    } else {
      cachedPlans = [];
    }
  }
  return cachedPlans || [];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const planId = searchParams.get('id');
    const gradeParam = searchParams.get('grade');
    const subjectParam = searchParams.get('subject');

    const plans = loadPlans();

    // If specific ID requested, return full plan
    if (planId) {
      const plan = plans.find((p) => p.id === planId);
      if (!plan) {
        return NextResponse.json({ error: 'Plan bulunamadı' }, { status: 404 });
      }
      return NextResponse.json(plan);
    }

    // If grade and subject requested, find best matching plan
    if (gradeParam && subjectParam) {
      const grade = parseInt(gradeParam, 10);
      const plan = plans.find(
        (p) => p.grade === grade && p.subject.toLowerCase() === subjectParam.toLowerCase()
      );
      if (plan) {
        return NextResponse.json(plan);
      }
    }

    // Otherwise return lightweight index/catalog
    const catalog: PlanSummary[] = plans.map((p) => ({
      id: p.id,
      grade: p.grade,
      subject: p.subject,
      sheet: p.sheet,
      title: p.title,
      weeksCount: p.weeksCount,
      defaultHours: p.defaultHours,
    }));

    return NextResponse.json({
      total: catalog.length,
      plans: catalog,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
