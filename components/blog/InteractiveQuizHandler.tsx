'use client';

import { useEffect } from 'react';

export default function InteractiveQuizHandler() {
  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest('.quiz-option') as HTMLButtonElement | null;
      if (!btn) return;

      const card = btn.closest('.quiz-card') as HTMLElement | null;
      if (!card) return;

      if (card.getAttribute('data-answered') === 'true') {
        return;
      }
      card.setAttribute('data-answered', 'true');

      const selectedOpt = (btn.getAttribute('data-opt') || '').trim().toUpperCase();
      const correctOpt = (card.getAttribute('data-correct') || '').trim().toUpperCase();
      const isCorrect = selectedOpt === correctOpt;

      const allBtns = card.querySelectorAll('.quiz-option') as NodeListOf<HTMLButtonElement>;

      allBtns.forEach((optBtn) => {
        optBtn.style.pointerEvents = 'none';
        optBtn.classList.remove('hover:bg-indigo-50/70', 'hover:border-indigo-300', 'cursor-pointer');
        
        const optVal = (optBtn.getAttribute('data-opt') || '').trim().toUpperCase();
        const badge = optBtn.querySelector('.opt-badge') as HTMLElement | null;
        const feedback = optBtn.querySelector('.opt-feedback') as HTMLElement | null;

        if (optVal === correctOpt) {
          // Highlight correct answer in GREEN
          optBtn.classList.remove('bg-slate-50', 'border-slate-200');
          optBtn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-950', 'ring-2', 'ring-emerald-500', 'shadow-sm');
          if (badge) {
            badge.classList.remove('bg-slate-200', 'text-slate-700');
            badge.classList.add('bg-emerald-600', 'text-white');
          }
          if (feedback) {
            feedback.classList.remove('hidden');
            feedback.className = 'opt-feedback ml-auto inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md';
            feedback.textContent = '✓ Doğru Cevap';
          }
        } else if (optVal === selectedOpt) {
          // Highlight wrong clicked answer in RED
          optBtn.classList.remove('bg-slate-50', 'border-slate-200');
          optBtn.classList.add('bg-rose-50', 'border-rose-500', 'text-rose-950', 'ring-2', 'ring-rose-500', 'shadow-sm');
          if (badge) {
            badge.classList.remove('bg-slate-200', 'text-slate-700');
            badge.classList.add('bg-rose-600', 'text-white');
          }
          if (feedback) {
            feedback.classList.remove('hidden');
            feedback.className = 'opt-feedback ml-auto inline-flex items-center gap-1 text-xs font-black text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md';
            feedback.textContent = '✗ Yanlış';
          }
        } else {
          optBtn.classList.add('opacity-40');
        }
      });

      // Show solution link hint
      const hint = card.querySelector('.quiz-solution-hint') as HTMLElement | null;
      if (hint) {
        hint.classList.remove('hidden');
        const hintText = hint.querySelector('.hint-text') as HTMLElement | null;
        if (hintText) {
          if (isCorrect) {
            hintText.innerHTML = `<span class="text-emerald-700 font-extrabold flex items-center gap-1">🎉 Harika! Doğru Seçenek: <strong>${correctOpt}</strong></span>`;
          } else {
            hintText.innerHTML = `<span class="text-rose-700 font-extrabold flex items-center gap-1">❌ Hatalı Yanıt! Doğru Seçenek: <strong class="underline ml-1">${correctOpt}</strong></span>`;
          }
        }
      }
    }

    document.addEventListener('click', onDocumentClick);
    return () => {
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  return null;
}
