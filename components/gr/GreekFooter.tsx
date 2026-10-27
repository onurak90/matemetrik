import React from 'react';
import Link from 'next/link';
import { BookOpen, ExternalLink, Shield, Heart } from 'lucide-react';

export default function GreekFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Col 1: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/gr" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                &pi;
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                matemetrik<span className="text-blue-400">.gr</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Το <strong>matemetrik.gr</strong> αποτελεί την ανεξάρτητη εκπαιδευτική πλατφόρμα ψηφιακής βοήθειας για μαθητές και εκπαιδευτικούς στην Ελλάδα. Παρέχουμε αναλυτικές λύσεις και απαντήσεις στα σχολικά βιβλία του ΥΠΑΙΘΑ (Δημοτικό, Γυμνάσιο, Λύκειο) με πλήρη παιδαγωγική τεκμηρίωση.
            </p>
            <div className="text-xs text-slate-500 space-y-1 pt-1">
              <p>📍 Αθήνα, Ελλάδα &bull; Ψηφιακή Εκπαίδευση</p>
              <p>📧 Επικοινωνία: contact@matemetrik.com</p>
            </div>
          </div>

          {/* Col 2: Δημοτικό */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Δημοτικό Σχολείο
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/gr/dimotiko#a-dimotikou" className="hover:text-white transition-colors">
                  Α\' Δημοτικού (Μαθηματικά &amp; Γλώσσα)
                </Link>
              </li>
              <li>
                <Link href="/gr/dimotiko#b-dimotikou" className="hover:text-white transition-colors">
                  Β\' Δημοτικού
                </Link>
              </li>
              <li>
                <Link href="/gr/dimotiko#g-dimotikou" className="hover:text-white transition-colors">
                  Γ\' Δημοτικού
                </Link>
              </li>
              <li>
                <Link href="/gr/dimotiko#d-dimotikou" className="hover:text-white transition-colors">
                  Δ\' Δημοτικού
                </Link>
              </li>
              <li>
                <Link href="/gr/dimotiko#e-dimotikou" className="hover:text-white transition-colors">
                  Ε\' Δημοτικού (Φυσικά &amp; Ιστορία)
                </Link>
              </li>
              <li>
                <Link href="/gr/dimotiko#st-dimotikou" className="hover:text-blue-400 transition-colors font-semibold">
                  ΣΤ\' Δημοτικού (Λυσάρια &amp; Ασκήσεις)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Γυμνάσιο & Λύκειο */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Γυμνάσιο &amp; Λύκειο
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/gr/gymnasio#a-gymnasiou" className="hover:text-white transition-colors">
                  Α\' Γυμνασίου (Μαθηματικά, Αρχαία, Φυσική)
                </Link>
              </li>
              <li>
                <Link href="/gr/gymnasio#b-gymnasiou" className="hover:text-white transition-colors">
                  Β\' Γυμνασίου
                </Link>
              </li>
              <li>
                <Link href="/gr/gymnasio#g-gymnasiou" className="hover:text-white transition-colors">
                  Γ\' Γυμνασίου (Χημεία &amp; Βιολογία)
                </Link>
              </li>
              <li>
                <Link href="/gr/lykeio#a-lykeiou" className="hover:text-white transition-colors">
                  Α\' Λυκείου (Άλγεβρα &amp; Γεωμετρία)
                </Link>
              </li>
              <li>
                <Link href="/gr/lykeio#b-lykeiou" className="hover:text-white transition-colors">
                  Β\' Λυκείου
                </Link>
              </li>
              <li>
                <Link href="/gr/lykeio#g-lykeiou" className="hover:text-emerald-400 transition-colors font-semibold">
                  Γ\' Λυκείου (Πανελλαδικές Εξετάσεις)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Εξετάσεις & Εργαλεία */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Εξετάσεις &amp; Εργαλεία
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/gr/trapeza-thematon" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                  <span>Τράπεζα Θεμάτων (ΙΕΠ)</span>
                  <span className="text-[9px] bg-blue-900/60 text-blue-300 px-1 rounded font-bold">Λύσεις</span>
                </Link>
              </li>
              <li>
                <Link href="/gr/panelladikes" className="hover:text-purple-400 transition-colors font-medium">
                  Πανελλαδικές Εξετάσεις &amp; ΟΕΦΕ
                </Link>
              </li>
              <li>
                <Link href="/gr/ypologistis-morion" className="hover:text-indigo-400 transition-colors font-medium">
                  Υπολογιστής Μορίων 2026
                </Link>
              </li>
              <li>
                <Link href="/gr/diagonismata" className="hover:text-amber-400 transition-colors font-medium">
                  Διαγωνίσματα Α\' &amp; Β\' Τετραμήνου
                </Link>
              </li>
              <li>
                <Link href="/gr/pdf-vivlia" className="hover:text-white transition-colors">
                  Επίσημα Βιβλία PDF (ebooks)
                </Link>
              </li>
              <li>
                <Link href="/gr/eidiseis" className="hover:text-emerald-400 transition-colors">
                  Εκπαιδευτικές Ειδήσεις
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Επίσημοι Σύνδεσμοι Εκπαίδευσης */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Επίσημοι Φορείς
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="http://ebooks.edu.gr/ebooks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>ebooks.edu.gr (Ψηφιακά Βιβλία)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.minedu.gov.gr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>Υπουργείο Παιδείας (ΥΠΑΙΘΑ)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="http://iep.edu.gr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>ΙΕΠ (Ινστιτούτο Εκπαιδευτικής Πολιτικής)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.sch.gr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>Πανελλήνιο Σχολικό Δίκτυο (ΠΣΔ)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://dschool.edu.gr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  <span>Ψηφιακό Σχολείο (dschool)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Matemetrik.gr &bull; Όλα τα δικαιώματα διατηρούνται. Τα σχολικά βιβλία ανήκουν στο Υπουργείο Παιδείας, Θρησκευμάτων &amp; Αθλητισμού / ΙΤΥΕ «ΔΙΟΦΑΝΤΟΣ».
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/gr/trapeza-thematon" className="hover:text-slate-300 transition-colors">
              Τράπεζα Θεμάτων
            </Link>
            <Link href="/gr/panelladikes" className="hover:text-slate-300 transition-colors">
              Πανελλαδικές
            </Link>
            <Link href="/gr/ypologistis-morion" className="hover:text-slate-300 transition-colors">
              Μόρια 2026
            </Link>
            <Link href="/gr/diagonismata" className="hover:text-slate-300 transition-colors">
              Διαγωνίσματα
            </Link>
            <Link href="/gr/pdf-vivlia" className="hover:text-slate-300 transition-colors">
              Βιβλία PDF
            </Link>
            <Link href="/gr/eidiseis" className="hover:text-slate-300 transition-colors">
              Ειδήσεις
            </Link>
            <Link href="/" className="hover:text-slate-300 transition-colors">
              🇹🇷 Türkiye Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
