import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, Download, Sparkles, ChevronRight, CheckCircle2,
  AlertTriangle, BookOpen, Layers, Award, HelpCircle, ArrowRight,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Τράπεζα Θεμάτων ΙΕΠ: Θέματα & Αναλυτικές Λύσεις Α\', Β\', Γ\' Λυκείου (PDF)',
  description:
    'Πλήρης οδηγός και κατάλογος θεμάτων της Τράπεζας Θεμάτων του ΙΕΠ για την Α\', Β\' και Γ\' Λυκείου. Αναλυτικές βήμα-βήμα λύσεις στα Θέματα 2 και 4 σε Άλγεβρα, Γεωμετρία, Φυσική, Χημεία και Αρχαία, με κριτήρια βαθμολόγησης.',
  keywords: [
    'τραπεζα θεματων',
    'τραπεζα θεματων ιεπ',
    'τραπεζα θεματων α λυκειου λυσεις',
    'τραπεζα θεματων β λυκειου',
    'τραπεζα θεματων αλγεβρα α λυκειου',
    'τραπεζα θεματων γεωμετρια',
    'τραπεζα θεματων φυσικη',
    'θεματα τραπεζας ιεπ pdf',
    'θεμα 2 τραπεζα θεματων',
    'θεμα 4 τραπεζα θεματων λυσεις',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/gr/trapeza-thematon',
  },
  openGraph: {
    locale: 'el_GR',
    type: 'article',
    url: 'https://www.matemetrik.com/gr/trapeza-thematon',
    title: 'Τράπεζα Θεμάτων ΙΕΠ: Θέματα & Αναλυτικές Λύσεις | Matemetrik.gr',
    description:
      'Βρείτε υποδειγματικές λύσεις για τα θέματα 2 και 4 της Τράπεζας Θεμάτων του ΙΕΠ ανά τάξη και μάθημα.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Τράπεζα Θεμάτων ΙΕΠ θέματα και λύσεις ανά μάθημα Α Β Γ Λυκείου pdf',
      },
    ],
  },
};

const trapezaFaqs = [
  {
    q: 'Πώς λειτουργεί ο θεσμός της Τράπεζας Θεμάτων Διαβαθμισμένης Δυσκολίας του ΙΕΠ;',
    a: 'Σύμφωνα με τις οδηγίες του Υπουργείου Παιδείας (ΥΠΑΙΘΑ), στις προαγωγικές εξετάσεις της Α\' και Β\' Λυκείου καθώς και στις απολυτήριες της Γ\' Λυκείου, τα θέματα 2ο και 4ο κληρώνονται υποχρεωτικά από την επίσημη Τράπεζα Θεμάτων του ΙΕΠ το πρωί της ημέρας των εξετάσεων. Τα θέματα 1ο (θεωρία) και 3ο (άσκηση) ορίζονται από τους διδάσκοντες καθηγητές του σχολείου.',
  },
  {
    q: 'Ποια είναι η βαθμολογική βαρύτητα των θεμάτων της Τράπεζας;',
    a: 'Το Θέμα 2ο βαθμολογείται με 25 μονάδες και το Θέμα 4ο επίσης με 25 μονάδες στην κλίμακα του 100 (συνολικά 50% της γραπτής εξέτασης). Αντίστοιχα, τα θέματα του σχολείου (1ο και 3ο) καλύπτουν το υπόλοιπο 50% των μονάδων.',
  },
  {
    q: 'Ποια είναι η διαφορά φιλοσοφίας μεταξύ του Θέματος 2 και του Θέματος 4;',
    a: 'Το Θέμα 2ο εξετάζει βασικές έννοιες, ορισμούς και άμεση εφαρμογή της σχολικής μεθοδολογίας. Το Θέμα 4ο αποτελεί σύνθετο πρόβλημα αυξημένης δυσκολίας, με διαβαθμισμένα ερωτήματα που απαιτούν συνδυαστική σκέψη, διερεύνηση περιπτώσεων και βαθιά κατανόηση της ύλης.',
  },
  {
    q: 'Πώς βαθμολογούν οι καθηγητές τα βήματα της λύσης;',
    a: 'Η βαθμολόγηση γίνεται με αναλυτικό οδηγό (rubric). Κάθε υποερώτημα έχει προκαθορισμένες μονάδες. Ακόμη κι αν υπάρξει αριθμητικό λάθος στο τελικό αποτέλεσμα, η ορθή παράθεση των θεωρητικών τύπων και η λογική αλληλουχία των μαθηματικών βημάτων μοριοδοτούνται με τις αντίστοιχες μερικές μονάδες.',
  },
  {
    q: 'Μπορώ να κατεβάσω όλα τα θέματα και τις λύσεις σε μορφή PDF;',
    a: 'Ναι. Στην πλατφόρμα μας παρέχουμε συγκεντρωτικά πακέτα θεμάτων ανά μάθημα και ενότητα σε εκτυπώσιμη μορφή PDF, καθώς και συνδέσμους απευθείας προς το επίσημο αποθετήριο του ΙΕΠ (trapeza.iep.edu.gr).',
  },
];

interface SubjectCard {
  name: string;
  badge: string;
  topicsCount: string;
  description: string;
  keyUnits: string[];
  sampleTitle: string;
  sampleCode: string;
  sampleProblem: string;
  sampleSteps: string[];
  sampleResult: string;
  rubric: string;
  driveLink: string;
  iepUrl: string;
}

const LYKEIO_DATA: Record<string, { title: string; subtitle: string; subjects: SubjectCard[] }> = {
  'a-lykeiou': {
    title: 'Α\' Λυκείου — Τράπεζα Θεμάτων ΙΕΠ',
    subtitle: 'Προαγωγικές εξετάσεις: Άλγεβρα, Γεωμετρία, Φυσική, Χημεία, Αρχαία Ελληνικά',
    subjects: [
      {
        name: 'Άλγεβρα Α\' Λυκείου',
        badge: 'Βασικό Μάθημα • 25+25 Μονάδες',
        topicsCount: '180+ Λυμένα Θέματα',
        description: 'Απόλυτες τιμές, ρίζες, εξισώσεις 2ου βαθμού, ανισώσεις, πρόσημο τριωνύμου, αριθμητική και γεωμετρική πρόοδος, βασικές συναρτήσεις.',
        keyUnits: ['Εξισώσεις 2ου βαθμού & Διακρίνουσα', 'Ανισώσεις 2ου βαθμού & Πρόσημο', 'Αριθμητική & Γεωμετρική Πρόοδος', 'Συναρτήσεις & Γραφικές Παραστάσεις'],
        sampleTitle: 'Θέμα 2ο — Εξίσωση 2ου Βαθμού με Παράμετρο',
        sampleCode: 'ΙΕΠ ID: 14528',
        sampleProblem: 'Δίνεται η εξίσωση x² - (λ + 1)x + λ = 0, με παράμετρο λ ∈ ℝ.\nα) Να βρείτε τη διακρίνουσα Δ της εξίσωσης και να αποδείξετε ότι η εξίσωση έχει πραγματικές ρίζες για κάθε τιμή του λ.\nβ) Αν x₁, x₂ είναι οι ρίζες της εξίσωσης, να βρείτε την τιμή του λ ώστε να ισχύει: (x₁ - 1)(x₂ - 1) = 0.',
        sampleSteps: [
          'α) Υπολογισμός διακρίνουσας: Δ = β² - 4αγ = [-(λ + 1)]² - 4(1)(λ) = (λ + 1)² - 4λ = λ² + 2λ + 1 - 4λ = λ² - 2λ + 1 = (λ - 1)². Επειδή (λ - 1)² ≥ 0 για κάθε λ ∈ ℝ, η διακρίνουσα είναι μη αρνητική, επομένως η εξίσωση έχει πραγματικές ρίζες για κάθε τιμή της παραμέτρου (12 Μονάδες).',
          'β) Αναπτύσσουμε την παράσταση: (x₁ - 1)(x₂ - 1) = x₁x₂ - (x₁ + x₂) + 1 = 0. Από τους τύπους Vieta γνωρίζουμε: S = x₁ + x₂ = λ + 1 και P = x₁x₂ = λ. Αντικαθιστούμε: λ - (λ + 1) + 1 = λ - λ - 1 + 1 = 0. Η ισότητα ισχύει ως ταυτότητα για κάθε λ ∈ ℝ (13 Μονάδες).'
        ],
        sampleResult: 'α) Δ = (λ - 1)² ≥ 0 (πραγματικές ρίζες). β) Ισχύει για κάθε λ ∈ ℝ.',
        rubric: 'Διακρίνουσα: 12 μόρια. Τύποι Vieta & απόδειξη: 13 μόρια.',
        driveLink: 'https://drive.google.com/drive/folders/1xLZtk3JyiZniVrJYyC7w6IAusbp5A5up?usp=sharing',
        iepUrl: 'https://trapeza.iep.edu.gr/public/subjects.php',
      },
      {
        name: 'Γεωμετρία Α\' Λυκείου',
        badge: 'Αποδεικτικές Ασκήσεις',
        topicsCount: '140+ Λυμένα Θέματα',
        description: 'Ισότητα τριγώνων (κριτήρια Π-Γ-Π, Γ-Π-Γ, Π-Π-Π), ορθογώνια τρίγωνα, παράλληλες ευθείες, παραλληλόγραμμα, τραπέζια και διάμεσοι.',
        keyUnits: ['Κριτήρια Ισότητας Τριγώνων', 'Ιδιότητες Ορθογωνίων Τριγώνων', 'Παραλληλόγραμμα & Ορθογώνια', 'Συνθήκες Παραλληλίας'],
        sampleTitle: 'Θέμα 2ο — Ισότητα Τριγώνων σε Ισοσκελές Τρίγωνο',
        sampleCode: 'ΙΕΠ ID: 15302',
        sampleProblem: 'Δίνεται ισοσκελές τρίγωνο ΑΒΓ (ΑΒ = ΑΓ). Στις προεκτάσεις των πλευρών ΑΒ και ΑΓ (προς το μέρος του Α) θεωρούμε σημεία Δ και Ε αντίστοιχα, τέτοια ώστε ΑΔ = ΑΕ. Να αποδείξετε ότι:\nα) Τα τρίγωνα ΑΒΕ και ΑΓΔ είναι ίσα.\nβ) ΒΕ = ΓΔ.',
        sampleSteps: [
          'α) Συγκρίνουμε τα τρίγωνα ΑΒΕ και ΑΓΔ:\n1. ΑΒ = ΑΓ (από υπόθεση, καθώς το τρίγωνο ΑΒΓ είναι ισοσκελές).\n2. ΑΕ = ΑΔ (από υπόθεση).\n3. Η γωνία ∠ΒΑΕ είναι ίση με τη γωνία ∠ΓΑΔ ως κατακορυφήν (ή ως εφεξής συμπληρωματικές).\nΣυνεπώς, από το κριτήριο Πλευρά-Γωνία-Πλευρά (Π-Γ-Π), τα τρίγωνα ΑΒΕ και ΑΓΔ είναι ίσα (15 Μονάδες).',
          'β) Εφόσον τα τρίγωνα ΑΒΕ και ΑΓΔ είναι ίσα, όλα τα αντίστοιχα στοιχεία τους είναι ίσα. Επομένως, οι απέναντι πλευρές των ίσων γωνιών είναι ίσες: ΒΕ = ΓΔ (10 Μονάδες).'
        ],
        sampleResult: 'α) Ισότητα βάσει Π-Γ-Π. β) ΒΕ = ΓΔ ως ομόλογες πλευρές ίσων τριγώνων.',
        rubric: 'Σύγκριση στοιχείων και κριτήριο: 15 μόρια. Συμπέρασμα ισότητας πλευρών: 10 μόρια.',
        driveLink: 'https://drive.google.com/drive/folders/1lE8N4-AxIAjvR4NwiLMnXdsUtosuCl58?usp=sharing',
        iepUrl: 'https://trapeza.iep.edu.gr/public/subjects.php',
      },
      {
        name: 'Φυσική Α\' Λυκείου',
        badge: 'Μηχανική & Κινήσεις',
        topicsCount: '160+ Λυμένα Θέματα',
        description: 'Ευθύγραμμη ομαλή κίνηση, ευθύγραμμη ομαλά μεταβαλλόμενη κίνηση, νόμοι του Νεύτωνα, δύναμη τριβής, ελεύθερη πτώση, έργο και ενέργεια.',
        keyUnits: ['Εξισώσεις Κίνησης (x-t, v-t)', '2ος Νόμος Νεύτωνα (ΣF = m·a)', 'Τριβή Ολίσθησης (Τ = μ·Ν)', 'Θεώρημα Μεταβολής Κινητικής Ενέργειας (ΘΜΚΕ)'],
        sampleTitle: 'Θέμα 4ο — Κίνηση Σώματος σε Οριζόντιο Επίπεδο με Τριβή',
        sampleCode: 'ΙΕΠ ID: 16180',
        sampleProblem: 'Σώμα μάζας m = 4 kg ηρεμεί σε οριζόντιο επίπεδο. Τη χρονική στιγμή t = 0 ασκείται στο σώμα σταθερή οριζόντια δύναμη μέτρου F = 28 N. Ο συντελεστής τριβής ολίσθησης μεταξύ σώματος και επιπέδου είναι μ = 0,2. Δίνεται g = 10 m/s².\nα) Να υπολογίσετε το μέτρο της δύναμης της τριβής ολίσθησης.\nβ) Να βρείτε την επιτάχυνση με την οποία κινείται το σώμα.\nγ) Να υπολογίσετε την ταχύτητα του σώματος τη χρονική στιγμή t = 5 s.',
        sampleSteps: [
          'α) Στον κατακόρυφο άξονα ισχύει ισορροπία: ΣFy = 0 => N - W = 0 => N = m·g = 4 · 10 = 40 N. Η τριβή ολίσθησης δίνεται από: Τ = μ·N = 0,2 · 40 = 8 N (8 Μονάδες).',
          'β) Εφαρμόζουμε τον 2ο Νόμο του Νεύτωνα στον οριζόντιο άξονα κίνησης: ΣFx = m·a => F - T = m·a => 28 - 8 = 4·a => 20 = 4·a => a = 5 m/s² (9 Μονάδες).',
          'γ) Η κίνηση είναι ευθύγραμμη ομαλά επιταχυνόμενη χωρίς αρχική ταχύτητα (v0 = 0). Η εξίσωση ταχύτητας είναι: v = a·t. Για t = 5 s: v = 5 · 5 = 25 m/s (8 Μονάδες).'
        ],
        sampleResult: 'α) Τ = 8 N. β) a = 5 m/s². γ) v = 25 m/s.',
        rubric: 'Τριβή: 8 μόρια. 2ος Νόμος Νεύτωνα: 9 μόρια. Ταχύτητα με μονάδα μέτρησης: 8 μόρια.',
        driveLink: 'https://drive.google.com/file/d/1InvRSy-TLwTrLXZ7W4u3UuL06XVl2Aoj/view?usp=sharing',
        iepUrl: 'https://trapeza.iep.edu.gr/public/subjects.php',
      },
    ],
  },
  'b-lykeiou': {
    title: 'Β\' Λυκείου — Τράπεζα Θεμάτων ΙΕΠ',
    subtitle: 'Προαγωγικές εξετάσεις: Άλγεβρα, Γεωμετρία, Φυσική Προσανατολισμού, Χημεία',
    subjects: [
      {
        name: 'Άλγεβρα Β\' Λυκείου',
        badge: 'Τριγωνομετρία & Πολυώνυμα',
        topicsCount: '150+ Λυμένα Θέματα',
        description: 'Γραμμικά συστήματα, τριγωνομετρικοί αριθμοί, βασικές τριγωνομετρικές εξισώσεις, πολυώνυμα, διαίρεση πολυωνύμων, εκθετική και λογαριθμική συνάρτηση.',
        keyUnits: ['Τριγωνομετρικές Εξισώσεις (ημx, συνx, εφx)', 'Σχήμα Horner & Θεώρημα Bezout', 'Λογαριθμικές Εξισώσεις & Ιδιότητες', 'Εκθετικές Συναρτήσεις'],
        sampleTitle: 'Θέμα 4ο — Πολυωνυμική Εξίσωση με Horner',
        sampleCode: 'ΙΕΠ ID: 17290',
        sampleProblem: 'Δίνεται το πολυώνυμο P(x) = 2x³ - 5x² + x + 2.\nα) Να δείξετε ότι το x = 2 είναι ρίζα του πολυωνύμου P(x).\nβ) Να κάνετε τη διαίρεση του P(x) με το x - 2 χρησιμοποιώντας το σχήμα Horner και να γράψετε την ταυτότητα της διαίρεσης.\nγ) Να λύσετε την ανίσωση P(x) < 0.',
        sampleSteps: [
          'α) Υπολογίζουμε την τιμή P(2): P(2) = 2(2)³ - 5(2)² + 2 + 2 = 2(8) - 5(4) + 4 = 16 - 20 + 4 = 0. Άρα το x = 2 είναι πράγματι ρίζα του πολυωνύμου (6 Μονάδες).',
          'β) Εφαρμόζουμε το σχήμα Horner με διαιρέτη το 2:\nΣυντελεστές: [2, -5, 1, 2] με ρίζα 2 -> Πηλίκο π(x) = 2x² - x - 1 και υπόλοιπο υ = 0. Ταυτότητα διαίρεσης: P(x) = (x - 2)(2x² - x - 1) (9 Μονάδες).',
          'γ) Βρίσκουμε τις ρίζες του τριωνύμου 2x² - x - 1 = 0: Δ = (-1)² - 4(2)(-1) = 9. Οι ρίζες είναι x = (1 ± 3)/4 => x = 1 ή x = -1/2. Κατασκευάζουμε πίνακα προσήμων για τους παράγοντες (x - 2) και (2x² - x - 1). Προκύπτει P(x) < 0 για x ∈ (-∞, -1/2) ∪ (1, 2) (10 Μονάδες).'
        ],
        sampleResult: 'α) P(2) = 0. β) P(x) = (x - 2)(2x² - x - 1). γ) x ∈ (-∞, -1/2) ∪ (1, 2).',
        rubric: 'Υπολογισμός P(2): 6 μόρια. Σχήμα Horner: 9 μόρια. Πίνακας προσήμων & διάστημα: 10 μόρια.',
        driveLink: 'https://drive.google.com/file/d/1GgnUT_s7x57hKs4jpO63cRumNsw9risv/view?usp=sharing',
        iepUrl: 'https://trapeza.iep.edu.gr/public/subjects.php',
      },
      {
        name: 'Φυσική Προσανατολισμού Β\' Λυκείου',
        badge: 'Ορμή & Ηλεκτροστατική',
        topicsCount: '130+ Λυμένα Θέματα',
        description: 'Ορμή και διατήρηση ορμής, πλαστική και ελαστική κρούση, νόμος Coulomb, ένταση και δυναμικό ηλεκτρικού πεδίου, πυκνωτές και ρεύμα.',
        keyUnits: ['Αρχή Διατήρησης Ορμής (ΑΔΟ)', 'Μηχανική Ενέργεια σε Κρούσεις', 'Νόμος Coulomb & Δυναμικές Γραμμές', 'Κίνηση Φορτίων σε Ομογενές Πεδίο'],
        sampleTitle: 'Θέμα 4ο — Κεντρική Πλαστική Κρούση',
        sampleCode: 'ΙΕΠ ID: 18450',
        sampleProblem: 'Σώμα Σ₁ μάζας m₁ = 2 kg κινείται σε λείο οριζόντιο επίπεδο με ταχύτητα v₁ = 12 m/s και συγκρούεται πλαστικά με ακίνητο σώμα Σ₂ μάζας m₂ = 4 kg. Να βρείτε:\nα) Την κοινή ταχύτητα V του συσσωματώματος αμέσως μετά την κρούση.\nβ) Την απώλεια μηχανικής ενέργειας του συστήματος κατά την κρούση.\nγ) Το ποσοστό (%) της αρχικής κινητικής ενέργειας που μετατράπηκε σε θερμότητα.',
        sampleSteps: [
          'α) Το σύστημα είναι μονωμένο κατά την κρούση. Εφαρμόζουμε την Αρχή Διατήρησης της Ορμής (ΑΔΟ): P_πριν = P_μετά => m₁·v₁ + m₂·v₂ = (m₁ + m₂)·V => 2 · 12 + 0 = (2 + 4)·V => 24 = 6·V => V = 4 m/s (8 Μονάδες).',
          'β) Αρχική κινητική ενέργεια: K_αρχ = 1/2 · m₁ · v₁² = 1/2 · 2 · 12² = 144 J. Τελική κινητική ενέργεια συσσωματώματος: K_τελ = 1/2 · (m₁ + m₂) · V² = 1/2 · 6 · 4² = 48 J. Απώλεια ενέργειας: ΔΕ_απώλεια = K_αρχ - K_τελ = 144 - 48 = 96 Joule (9 Μονάδες).',
          'γ) Ποσοστό απώλειας: Π% = (ΔΕ_απώλεια / K_αρχ) · 100% = (96 / 144) · 100% = (2/3) · 100% ≈ 66,67% (8 Μονάδες).'
        ],
        sampleResult: 'α) V = 4 m/s. β) ΔΕ = 96 J. γ) Ποσοστό: 66,67%.',
        rubric: 'ΑΔΟ: 8 μόρια. Ενέργειες & απώλεια: 9 μόρια. Ποσοστό: 8 μόρια.',
        driveLink: 'https://drive.google.com/file/d/1KNAQ2-WlKQwemvKQJLDIsPOtc0dXCRyA/view?usp=sharing',
        iepUrl: 'https://trapeza.iep.edu.gr/public/subjects.php',
      },
    ],
  },
};

export default function TrapezaThematonHubPage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Τράπεζα Θεμάτων ΙΕΠ | Θέματα και Λύσεις Α, Β, Γ Λυκείου',
    url: 'https://www.matemetrik.com/gr/trapeza-thematon',
    inLanguage: 'el-GR',
    description: 'Επίσημα θέματα της Τράπεζας Θεμάτων του ΙΕΠ με βήμα-βήμα λύσεις και κριτήρια βαθμολόγησης.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: trapezaFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="space-y-12 pb-24 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/gr" className="hover:text-blue-600 transition-colors">
              Αρχική (Ελλάδα)
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/gr/lykeio" className="hover:text-blue-600 transition-colors">
              Λύκειο
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-bold">
              Τράπεζα Θεμάτων ΙΕΠ
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-blue-900/50">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ΙΕΠ &bull; ΤΡΑΠΕΖΑ ΘΕΜΑΤΩΝ ΔΙΑΒΑΘΜΙΣΜΕΝΗΣ ΔΥΣΚΟΛΙΑΣ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Τράπεζα Θεμάτων ΙΕΠ: Θέματα &amp; Αναλυτικές Λύσεις (PDF)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Αναλυτικές λύσεις για τα <strong>Θέματα 2ο και 4ο</strong> της Τράπεζας Θεμάτων του Ινστιτούτου Εκπαιδευτικής Πολιτικής (ΙΕΠ) για την Α\' και Β\' Λυκείου. Βήμα προς βήμα μεθοδολογία, σχόλια αποφυγής λαθών και επίσημα κριτήρια βαθμολόγησης από έμπειρους εκπαιδευτικούς.
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-blue-200 pt-2">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ 100% Συμβατότητα με ΙΕΠ
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ Αναλυτική Μεθοδολογία &amp; Rubric
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ Δωρεάν Κατέβασμα PDF
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Guide: How the Bank Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Οδηγός Εκπαιδευτικού για τις Εξετάσεις</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Πώς να εξασφαλίσετε το Άριστα (20) στα Θέματα της Τράπεζας
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Οι προαγωγικές εξετάσεις του Λυκείου απαιτούν στρατηγική μελέτη και ακριβή διατύπωση.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Καταγραφή Θεωρητικών Τύπων</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Στα μαθηματικά και τη φυσική, η παράθεση του γενικού τύπου (π.χ. διακρίνουσα, νόμος Νεύτωνα) κατοχυρώνει μερικές μονάδες ακόμη κι αν υπάρξει υπολογιστικό σφάλμα στη συνέχεια.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Σύνολο Ορισμού &amp; Περιορισμοί</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Σε εξισώσεις με ρίζες, κλάσματα ή λογαρίθμους, η εύρεση του πεδίου ορισμού στην αρχή είναι υποχρεωτική. Η παράλειψή της αφαιρεί από 2 έως 5 μονάδες.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">Μονάδες Μέτρησης &amp; Σχήματα</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Στη Φυσική, το τελικό αποτέλεσμα χωρίς μονάδα (SI) στερείται βαθμολογίας. Στη Γεωμετρία, ένα καθαρό και μεγάλο σχήμα βοηθά καθοριστικά στην εποπτεία της απόδειξης.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Lykeio Subjects & Topics */}
      {Object.entries(LYKEIO_DATA).map(([gradeKey, gradeData]) => (
        <section key={gradeKey} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {gradeData.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {gradeData.subtitle}
              </p>
            </div>
            <a
              href="https://trapeza.iep.edu.gr/public/subjects.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Επίσημο Αποθετήριο ΙΕΠ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-6">
            {gradeData.subjects.map((subj) => (
              <div
                key={subj.name}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {subj.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {subj.topicsCount}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {subj.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={subj.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Κατέβασμα PDF Θεμάτων</span>
                    </a>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {subj.description}
                </p>

                {/* Key Units Grid */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Κυριότερες Ενότητες Εξέτασης:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {subj.keyUnits.map((unit) => (
                      <div
                        key={unit}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solved Sample Topic */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {subj.sampleTitle}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
                      {subj.sampleCode}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                      Εκφώνηση Θέματος:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line font-medium leading-relaxed">
                      {subj.sampleProblem}
                    </p>
                  </div>

                  {/* Solution Steps */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                      Αναλυτική Επίλυση Βήμα προς Βήμα:
                    </span>
                    <div className="space-y-2">
                      {subj.sampleSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/60 dark:border-emerald-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans"
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result & Marking Guide */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <div>
                      <strong className="text-emerald-800 dark:text-emerald-300">Τελικό Αποτέλεσμα:</strong>{' '}
                      <span className="text-emerald-900 dark:text-emerald-200">{subj.sampleResult}</span>
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-300 font-semibold">
                      <strong>Βαθμολογία (Rubric):</strong> {subj.rubric}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* FAQs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Συχνές Ερωτήσεις για την Τράπεζα Θεμάτων
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Όλα όσα πρέπει να γνωρίζουν οι μαθητές και οι γονείς για τη διαδικασία των εξετάσεων.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {trapezaFaqs.map((faq, i) => (
              <div key={i} className="py-4 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
