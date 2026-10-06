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
let cachedKzPlans: any[] | null = null;

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

function loadKzPlans(): any[] {
  if (!cachedKzPlans) {
    const filePath = path.join(process.cwd(), 'data', 'kazanimcepte-daily-plans.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      cachedKzPlans = JSON.parse(content);
    } else {
      cachedKzPlans = [];
    }
  }
  return cachedKzPlans || [];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const planId = searchParams.get('id');
    const gradeParam = searchParams.get('grade');
    const subjectParam = searchParams.get('subject');

    const plans = loadPlans();
    const kzPlans = loadKzPlans();

    // If specific ID requested, return full plan
    if (planId) {
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        return NextResponse.json(plan);
      }
      const kzPlan = kzPlans.find((p) => `kz-${p.outcomeId}` === planId);
      if (kzPlan) {
        return NextResponse.json({
          id: `kz-${kzPlan.outcomeId}`,
          grade: kzPlan.grade,
          subject: kzPlan.courseName,
          title: kzPlan.outcomeTitle,
          defaultHours: '4',
          dailyExtraWeeks: kzPlan.dailyWeeks || [],
          weeks: (kzPlan.fullWeeks || []).map((w: any, idx: number) => ({
            month: '',
            week: w.content ? w.content.split('|')[0] || `${idx + 1}. Hafta` : `${idx + 1}. Hafta`,
            hours: '4',
            unit: w.unit || '',
            topic: w.subject || '',
            outcomes: w.content ? w.content.split('|')[2] || w.content : '',
            components: w.description || '',
            assessment: 'Gözlem formu, kontrol listesi',
            values: 'Çalışkanlık, Sorumluluk',
            specialDays: '',
          })),
        });
      }
      return NextResponse.json({ error: 'Plan bulunamadı' }, { status: 404 });
    }

    // If grade and subject requested, find best matching plan
    if (gradeParam && subjectParam) {
      const grade = parseInt(gradeParam, 10);
      const subNorm = subjectParam.toLowerCase().trim();

      const plan = plans.find(
        (p) => p.grade === grade && p.subject.toLowerCase().trim() === subNorm
      );

      const kzMatch = kzPlans.find(
        (kz) =>
          kz.grade === grade &&
          (kz.courseName.toLowerCase().trim() === subNorm ||
            kz.courseSlug.toLowerCase() === subNorm ||
            subNorm.includes(kz.courseName.toLowerCase().trim()))
      );

      if (plan) {
        return NextResponse.json({
          ...plan,
          dailyExtraWeeks: kzMatch?.dailyWeeks || [],
        });
      }

      if (kzMatch) {
        return NextResponse.json({
          id: `kz-${kzMatch.outcomeId}`,
          grade: kzMatch.grade,
          subject: kzMatch.courseName,
          title: kzMatch.outcomeTitle,
          defaultHours: '4',
          dailyExtraWeeks: kzMatch.dailyWeeks || [],
          weeks: (kzMatch.fullWeeks || []).map((w: any, idx: number) => ({
            month: '',
            week: w.content ? w.content.split('|')[0] || `${idx + 1}. Hafta` : `${idx + 1}. Hafta`,
            hours: '4',
            unit: w.unit || '',
            topic: w.subject || '',
            outcomes: w.content ? w.content.split('|')[2] || w.content : '',
            components: w.description || '',
            assessment: 'Gözlem formu, kontrol listesi',
            values: 'Çalışkanlık, Sorumluluk',
            specialDays: '',
          })),
        });
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

    // Add unique extra courses from KazanımCepte
    kzPlans.forEach((kz) => {
      const alreadyInCatalog = catalog.some(
        (c) => c.grade === kz.grade && c.subject.toLowerCase() === kz.courseName.toLowerCase()
      );
      if (!alreadyInCatalog) {
        catalog.push({
          id: `kz-${kz.outcomeId}`,
          grade: kz.grade,
          subject: kz.courseName,
          sheet: kz.courseSlug,
          title: kz.outcomeTitle,
          weeksCount: kz.fullWeeksCount || 36,
          defaultHours: '4',
        });
      }
    });

    return NextResponse.json({
      total: catalog.length,
      plans: catalog,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
