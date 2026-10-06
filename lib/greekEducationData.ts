// =============================================================
// Greek Educational Platform Data & Curriculum Engine
// ebooks.edu.gr (ΥΠΑΙΘΑ / ΙΕΠ) & Σχολικά Βιβλία / Λυσάρια
// Complete coverage of all 12 classes (Δημοτικό, Γυμνάσιο, Λύκειο)
// =============================================================

export interface GreekExercise {
  number: string;
  question: string;
  steps: string[];
  answer: string;
  tip?: string;
}

export interface GreekPageSolution {
  pageNumber: number;
  slug: string;
  title: string;
  unit: string;
  lesson: string;
  summary: string;
  exercises: GreekExercise[];
}

export interface GreekBook {
  id: string;
  gradeCode: string;
  gradeSlug: string;
  gradeName: string;
  level: 'dimotiko' | 'gymnasio' | 'lykeio';
  levelName: string;
  subject: string;
  subjectSlug: string;
  bookType: string;
  officialPdfUrl: string;
  officialEbooksUrl: string;
  coverBadge: string;
  coverColor: string;
  metaDescription: string;
  keywords: string[];
  chaptersCount: number;
  totalExercises: number;
  pages: GreekPageSolution[];
}

export interface GreekGradeCategory {
  slug: string;
  name: string;
  level: 'dimotiko' | 'gymnasio' | 'lykeio';
  levelName: string;
  shortDesc: string;
  books: {
    subject: string;
    subjectSlug: string;
    bookType: string;
    hasSolutions: boolean;
  }[];
}

export const GREEK_LEVELS = [
  {
    "slug": "dimotiko",
    "name": "Δημοτικό",
    "title": "Δημοτικό Σχολείο (Α' - ΣΤ' Τάξη)",
    "desc": "Αναλυτικές λύσεις, απαντήσεις και βοηθήματα για όλα τα μαθήματα του Δημοτικού: Μαθηματικά, Γλώσσα, Φυσικά, Ιστορία, Μελέτη Περιβάλλοντος.",
    "grades": [
      {
        "slug": "a-dimotikou",
        "name": "Α' Δημοτικού",
        "age": "6-7 ετών"
      },
      {
        "slug": "b-dimotikou",
        "name": "Β' Δημοτικού",
        "age": "7-8 ετών"
      },
      {
        "slug": "g-dimotikou",
        "name": "Γ' Δημοτικού",
        "age": "8-9 ετών"
      },
      {
        "slug": "d-dimotikou",
        "name": "Δ' Δημοτικού",
        "age": "9-10 ετών"
      },
      {
        "slug": "e-dimotikou",
        "name": "Ε' Δημοτικού",
        "age": "10-11 ετών"
      },
      {
        "slug": "st-dimotikou",
        "name": "ΣΤ' Δημοτικού",
        "age": "11-12 ετών"
      }
    ]
  },
  {
    "slug": "gymnasio",
    "name": "Γυμνάσιο",
    "title": "Γυμνάσιο (Α' - Γ' Τάξη)",
    "desc": "Πλήρη λυσάρια, ασκήσεις και αναλύσεις κειμένων για το Γυμνάσιο: Μαθηματικά, Νεοελληνική Γλώσσα, Αρχαία Ελληνικά, Φυσική, Χημεία, Βιολογία.",
    "grades": [
      {
        "slug": "a-gymnasiou",
        "name": "Α' Γυμνασίου",
        "age": "12-13 ετών"
      },
      {
        "slug": "b-gymnasiou",
        "name": "Β' Γυμνασίου",
        "age": "13-14 ετών"
      },
      {
        "slug": "g-gymnasiou",
        "name": "Γ' Γυμνασίου",
        "age": "14-15 ετών"
      }
    ]
  },
  {
    "slug": "lykeio",
    "name": "Λύκειο",
    "title": "Γενικό Λύκειο & Πανελλαδικές (Α' - Γ' Τάξη)",
    "desc": "Βοηθήματα, μεθοδολογία και λύσεις ασκήσεων για το Λύκειο και την προετοιμασία των Πανελλαδικών Εξετάσεων: Άλγεβρα, Γεωμετρία, Φυσική, Χημεία, Έκθεση.",
    "grades": [
      {
        "slug": "a-lykeiou",
        "name": "Α' Λυκείου",
        "age": "15-16 ετών"
      },
      {
        "slug": "b-lykeiou",
        "name": "Β' Λυκείου",
        "age": "16-17 ετών"
      },
      {
        "slug": "g-lykeiou",
        "name": "Γ' Λυκείου",
        "age": "17-18 ετών"
      }
    ]
  }
];

export const GREEK_BOOKS: GreekBook[] = [
  {
    "id": "a-dimotikou-mathimatika",
    "gradeCode": "K01",
    "gradeSlug": "a-dimotikou",
    "gradeName": "Α' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K01",
    "coverBadge": "Αριθμοί 1-20, Προσθέσεις, Σχήματα",
    "coverColor": "#0284c7",
    "metaDescription": "Λύσεις Μαθηματικών Α' Δημοτικού. Αναλυτικές επεξηγήσεις για αριθμούς 1-20, πράξεις και σχήματα.",
    "keywords": [
      "μαθηματικα α δημοτικου λυσεις",
      "λυσαρι μαθηματικων α δημοτικου",
      "ασκησεις α ταξη"
    ],
    "chaptersCount": 4,
    "totalExercises": 30,
    "pages": [
      {
        "pageNumber": 14,
        "slug": "selida-14",
        "title": "Σελίδα 14 - Αριθμοί 1 έως 5",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 2: Γραφή αριθμών 1-5",
        "summary": "Καταμέτρηση αντικειμένων και εξάσκηση στη γραφή των αριθμών.",
        "exercises": [
          {
            "number": "Δραστηριότητα 1",
            "question": "Μετρήστε τα μήλα και γράψτε τον αριθμό.",
            "steps": [
              "Μετράμε 1, 2, 3, 4 μήλα.",
              "Σημειώνουμε τον αριθμό 4."
            ],
            "answer": "Ο αριθμός είναι 4.",
            "tip": "Δείχνουμε με το δάχτυλο κάθε αντικείμενο."
          }
        ]
      },
      {
        "pageNumber": 28,
        "slug": "selida-28",
        "title": "Σελίδα 28 - Πρόσθεση μέχρι το 10",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα 8: Σύμβολο πρόσθεσης (+)",
        "summary": "Ενώνουμε ομάδες αντικειμένων και υπολογίζουμε το άθροισμα.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "3 μολύβια + 2 μολύβια = ;",
            "steps": [
              "Γράφουμε 3 + 2.",
              "Μετράμε 3 και άλλα 2: 4, 5."
            ],
            "answer": "3 + 2 = 5 μολύβια.",
            "tip": "Το '+' ενώνει ποσότητες."
          }
        ]
      },
      {
        "pageNumber": 42,
        "slug": "selida-42",
        "title": "Σελίδα 42 - Γεωμετρικά Σχήματα",
        "unit": "Ενότητα 3",
        "lesson": "Μάθημα 14: Κύκλος, Τρίγωνο, Τετράγωνο",
        "summary": "Αναγνώριση βασικών σχημάτων στο περιβάλλον.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Χρωματίστε τα τρίγωνα κόκκινα και τα τετράγωνα μπλε.",
            "steps": [
              "Εντοπίζουμε τα σχήματα με 3 πλευρές -> Τρίγωνα.",
              "Εντοπίζουμε τα σχήματα με 4 ίσες πλευρές -> Τετράγωνα."
            ],
            "answer": "3 τρίγωνα κόκκινα και 2 τετράγωνα μπλε.",
            "tip": "Το τετράγωνο έχει όλες τις πλευρές ίσες."
          }
        ]
      }
    ]
  },
  {
    "id": "a-dimotikou-glossa",
    "gradeCode": "K01",
    "gradeSlug": "a-dimotikou",
    "gradeName": "Α' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Γλώσσα",
    "subjectSlug": "glossa",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K01",
    "coverBadge": "Γράμματα, Συλλαβές, Πρώτη Ανάγνωση",
    "coverColor": "#059669",
    "metaDescription": "Λύσεις Γλώσσας Α' Δημοτικού. Πρώτη γραφή και ανάγνωση, φωνήεντα και σύμφωνα.",
    "keywords": [
      "γλωσσα α δημοτικου λυσεις",
      "λυσαρι γλωσσας α δημοτικου"
    ],
    "chaptersCount": 5,
    "totalExercises": 35,
    "pages": [
      {
        "pageNumber": 18,
        "slug": "selida-18",
        "title": "Σελίδα 18 - Το γράμμα Α α",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα: Το γράμμα Α, α",
        "summary": "Αναγνώριση του γράμματος Α και λέξεις που αρχίζουν από Α.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Κυκλώστε το Α, α στις λέξεις: αχλάδι, Άρης, γάτα.",
            "steps": [
              "αχλάδι: 1 άλφα",
              "Άρης: 1 κεφαλαίο Ά",
              "γάτα: 2 άλφα"
            ],
            "answer": "Βρέθηκαν 4 γράμματα άλφα.",
            "tip": "Το κεφαλαίο μπαίνει στα ονόματα."
          }
        ]
      },
      {
        "pageNumber": 34,
        "slug": "selida-34",
        "title": "Σελίδα 34 - Τα σύμφωνα Π π και Τ τ",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα: Πρώτες συλλαβές",
        "summary": "Σχηματισμός συλλαβών: πα, πο, τα, το.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Γράψτε τη λέξη: πίτα και τόπι.",
            "steps": [
              "Συλλαβίζουμε: πί-τα, τό-πι.",
              "Γράφουμε καθαρά με τόνο."
            ],
            "answer": "πίτα, τόπι.",
            "tip": "Μην ξεχνάτε τον τόνο!"
          }
        ]
      }
    ]
  },
  {
    "id": "a-dimotikou-meleti",
    "gradeCode": "K01",
    "gradeSlug": "a-dimotikou",
    "gradeName": "Α' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Μελέτη Περιβάλλοντος",
    "subjectSlug": "meleti-perivallontos",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K01",
    "coverBadge": "Το Σχολείο, Η Οικογένεια, Ζώα",
    "coverColor": "#d97706",
    "metaDescription": "Λύσεις Μελέτης Περιβάλλοντος Α' Δημοτικού. Απαντήσεις για το σχολείο και τη φύση.",
    "keywords": [
      "μελετη περιβαλλοντος α δημοτικου",
      "λυσαρι μελετης α ταξη"
    ],
    "chaptersCount": 4,
    "totalExercises": 25,
    "pages": [
      {
        "pageNumber": 16,
        "slug": "selida-16",
        "title": "Σελίδα 16 - Το Σχολείο μας",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα: Κανόνες τάξης",
        "summary": "Κανόνες ευγένειας και συνεργασίας.",
        "exercises": [
          {
            "number": "Ερώτηση 1",
            "question": "Ποιοι είναι οι κανόνες της τάξης μας;",
            "steps": [
              "1. Σηκώνουμε το χέρι για να μιλήσουμε.",
              "2. Σεβόμαστε τους συμμαθητές μας.",
              "3. Διατηρούμε την τάξη καθαρή."
            ],
            "answer": "Σηκώνουμε το χέρι, ακούμε με προσοχή και προσέχουμε τα πράγματά μας.",
            "tip": "Οι κανόνες κάνουν το σχολείο ασφαλές."
          }
        ]
      }
    ]
  },
  {
    "id": "b-dimotikou-mathimatika",
    "gradeCode": "K02",
    "gradeSlug": "b-dimotikou",
    "gradeName": "Β' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K02",
    "coverBadge": "Αριθμοί έως 100, Προπαίδεια",
    "coverColor": "#2563eb",
    "metaDescription": "Λύσεις Μαθηματικών Β' Δημοτικού. Προπαίδεια, κάθετες πράξεις και αριθμοί μέχρι το 100.",
    "keywords": [
      "μαθηματικα β δημοτικου λυσεις",
      "προπαιδεια β δημοτικου"
    ],
    "chaptersCount": 5,
    "totalExercises": 45,
    "pages": [
      {
        "pageNumber": 22,
        "slug": "selida-22",
        "title": "Σελίδα 22 - Αριθμοί μέχρι το 100",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 6: Δεκάδες και Μονάδες",
        "summary": "Ανάλυση διψήφιων αριθμών.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Αναλύστε τον αριθμό 75 σε δεκάδες και μονάδες.",
            "steps": [
              "7 δεκάδες = 70",
              "5 μονάδες = 5",
              "75 = 70 + 5."
            ],
            "answer": "75 = 7 δεκάδες και 5 μονάδες (70 + 5).",
            "tip": "Κάθε δεκάδα έχει 10 μονάδες."
          }
        ]
      },
      {
        "pageNumber": 48,
        "slug": "selida-48",
        "title": "Σελίδα 48 - Προπαίδεια του 2 και του 5",
        "unit": "Ενότητα 3",
        "lesson": "Μάθημα 15: Πολλαπλασιασμός",
        "summary": "Εκμάθηση προπαίδειας με επαναλαμβανόμενη πρόσθεση.",
        "exercises": [
          {
            "number": "Άσκηση 3",
            "question": "Υπολογίστε: 5 x 2 = ; και 4 x 5 = ;",
            "steps": [
              "5 x 2 = 2 + 2 + 2 + 2 + 2 = 10.",
              "4 x 5 = 5 + 5 + 5 + 5 = 20."
            ],
            "answer": "5 x 2 = 10 και 4 x 5 = 20.",
            "tip": "Η προπαίδεια του 5 τελειώνει πάντα σε 0 ή 5."
          }
        ]
      }
    ]
  },
  {
    "id": "b-dimotikou-glossa",
    "gradeCode": "K02",
    "gradeSlug": "b-dimotikou",
    "gradeName": "Β' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Γλώσσα",
    "subjectSlug": "glossa",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K02",
    "coverBadge": "Ορθογραφία, Ουσιαστικά, Ρήματα",
    "coverColor": "#10b981",
    "metaDescription": "Λύσεις Γλώσσας Β' Δημοτικού. Γένη ουσιαστικών, ρήματα και ορθογραφία.",
    "keywords": [
      "γλωσσα β δημοτικου λυσεις",
      "λυσαρι γλωσσας β"
    ],
    "chaptersCount": 5,
    "totalExercises": 40,
    "pages": [
      {
        "pageNumber": 26,
        "slug": "selida-26",
        "title": "Σελίδα 26 - Τα γένη των ουσιαστικών",
        "unit": "Ενότητα 3",
        "lesson": "Μάθημα: Άρθρα ο, η, το",
        "summary": "Διάκριση αρσενικών, θηλυκών και ουδέτερων.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Βάλτε άρθρο στις λέξεις: δέντρο, δάσκαλος, θάλασσα.",
            "steps": [
              "ο δάσκαλος (αρσενικό)",
              "η θάλασσα (θηλυκό)",
              "το δέντρο (ουδέτερο)"
            ],
            "answer": "ο δάσκαλος, η θάλασσα, το δέντρο.",
            "tip": "Δοκιμάστε ποιο άρθρο ταιριάζει μπροστά."
          }
        ]
      }
    ]
  },
  {
    "id": "b-dimotikou-meleti",
    "gradeCode": "K02",
    "gradeSlug": "b-dimotikou",
    "gradeName": "Β' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Μελέτη Περιβάλλοντος",
    "subjectSlug": "meleti-perivallontos",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K02",
    "coverBadge": "Η Πόλη, Το Χωριό, Επαγγέλματα",
    "coverColor": "#eab308",
    "metaDescription": "Λύσεις Μελέτης Περιβάλλοντος Β' Δημοτικού. Μέσα μεταφοράς και κυκλοφοριακή αγωγή.",
    "keywords": [
      "μελετη περιβαλλοντος β δημοτικου λυσεις"
    ],
    "chaptersCount": 4,
    "totalExercises": 30,
    "pages": [
      {
        "pageNumber": 20,
        "slug": "selida-20",
        "title": "Σελίδα 20 - Κυκλοφοριακή Αγωγή",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα: Φανάρια και πεζοί",
        "summary": "Κανόνες ασφάλειας στον δρόμο.",
        "exercises": [
          {
            "number": "Ερώτηση 1",
            "question": "Τι προσέχουμε όταν διασχίζουμε τον δρόμο;",
            "steps": [
              "1. Περνάμε μόνο από τη διάβαση πεζών.",
              "2. Ελέγχουμε δεξιά και αριστερά.",
              "3. Περνάμε μόνο με πράσινο φανάρι."
            ],
            "answer": "Διασχίζουμε τη διάβαση με πράσινο και ελέγχουμε προσεκτικά τον δρόμο.",
            "tip": "Δεν τρέχουμε ποτέ στον δρόμο."
          }
        ]
      }
    ]
  },
  {
    "id": "g-dimotikou-mathimatika",
    "gradeCode": "K03",
    "gradeSlug": "g-dimotikou",
    "gradeName": "Γ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K03",
    "coverBadge": "Αριθμοί έως 1.000, Διαίρεση, Κλάσματα",
    "coverColor": "#0369a1",
    "metaDescription": "Λύσεις Μαθηματικών Γ' Δημοτικού. Τριψήφιοι αριθμοί, κάθετος πολλαπλασιασμός και διαίρεση.",
    "keywords": [
      "μαθηματικα γ δημοτικου λυσεις",
      "διαιρεση γ δημοτικου"
    ],
    "chaptersCount": 5,
    "totalExercises": 50,
    "pages": [
      {
        "pageNumber": 24,
        "slug": "selida-24",
        "title": "Σελίδα 24 - Αριθμοί έως 1.000",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 7: Εκατοντάδες, Δεκάδες, Μονάδες",
        "summary": "Ανάλυση τριψήφιων αριθμών.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Συγκρίνετε: 458 ... 485 και 720 ... 702.",
            "steps": [
              "458 < 485 (5 δεκάδες < 8 δεκάδες)",
              "720 > 702 (2 δεκάδες > 0 δεκάδες)"
            ],
            "answer": "458 < 485 και 720 > 702.",
            "tip": "Κοιτάμε πρώτα τις εκατοντάδες και μετά τις δεκάδες."
          }
        ]
      },
      {
        "pageNumber": 54,
        "slug": "selida-54",
        "title": "Σελίδα 54 - Η Διαίρεση",
        "unit": "Ενότητα 3",
        "lesson": "Μάθημα 18: Πηλίκο και Υπόλοιπο",
        "summary": "Τέλεια και ατελής διαίρεση.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Μοιράζουμε 26 καραμέλες σε 4 παιδιά. Πόσες παίρνει το καθένα;",
            "steps": [
              "4 x 6 = 24.",
              "26 - 24 = 2."
            ],
            "answer": "Κάθε παιδί παίρνει 6 καραμέλες και περισσεύουν 2 (υπόλοιπο = 2).",
            "tip": "Το υπόλοιπο είναι πάντα μικρότερο από τον διαιρέτη."
          }
        ]
      }
    ]
  },
  {
    "id": "g-dimotikou-glossa",
    "gradeCode": "K03",
    "gradeSlug": "g-dimotikou",
    "gradeName": "Γ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Γλώσσα",
    "subjectSlug": "glossa",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K03",
    "coverBadge": "Πτώσεις, Χρόνοι Ρημάτων, Παράγραφος",
    "coverColor": "#047857",
    "metaDescription": "Λύσεις Γλώσσας Γ' Δημοτικού. Πτώσεις ουσιαστικών, χρόνοι ρημάτων και περιγραφικά κείμενα.",
    "keywords": [
      "γλωσσα γ δημοτικου λυσεις",
      "λυσαρι γλωσσας γ ταξη"
    ],
    "chaptersCount": 5,
    "totalExercises": 45,
    "pages": [
      {
        "pageNumber": 30,
        "slug": "selida-30",
        "title": "Σελίδα 30 - Πτώσεις Ουσιαστικών",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα: Ονομαστική, Γενική, Αιτιατική, Κλητική",
        "summary": "Κλίση ουσιαστικών.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Κλίνετε: ο μαθητής στον ενικό αριθμό.",
            "steps": [
              "Ονομαστική: ο μαθητής",
              "Γενική: του μαθητή",
              "Αιτιατική: τον μαθητή",
              "Κλητική: μαθητή!"
            ],
            "answer": "ο μαθητής, του μαθητή, τον μαθητή, μαθητή.",
            "tip": "Στην κλητική δεν βάζουμε άρθρο."
          }
        ]
      }
    ]
  },
  {
    "id": "g-dimotikou-istoria",
    "gradeCode": "K03",
    "gradeSlug": "g-dimotikou",
    "gradeName": "Γ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Ιστορία",
    "subjectSlug": "istoria",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K03",
    "coverBadge": "Ελληνική Μυθολογία, Θεοί, Ηρακλής, Τροία",
    "coverColor": "#b45309",
    "metaDescription": "Λύσεις Ιστορίας Γ' Δημοτικού. Μυθολογία, οι 12 Θεοί, άθλοι του Ηρακλή και Τρωικός Πόλεμος.",
    "keywords": [
      "ιστορια γ δημοτικου λυσεις",
      "μυθολογια γ δημοτικου"
    ],
    "chaptersCount": 5,
    "totalExercises": 45,
    "pages": [
      {
        "pageNumber": 18,
        "slug": "selida-18",
        "title": "Σελίδα 18 - Οι 12 Θεοί του Ολύμπου",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 3: Δίας και Αθηνά",
        "summary": "Ιδιότητες των θεών.",
        "exercises": [
          {
            "number": "Ερώτηση 1",
            "question": "Ποια ήταν τα σύμβολα του Δία και της Αθηνάς;",
            "steps": [
              "Δίας: κεραυνός και αετός (βασιλιάς θεών).",
              "Αθηνά: κουκουβάγια, δόρυ, ελιά (θεά σοφίας)."
            ],
            "answer": "Δίας: κεραυνός / Αθηνά: κουκουβάγια και κλαδί ελιάς.",
            "tip": "Η Αθηνά χάρισε την ελιά στην Αθήνα."
          }
        ]
      },
      {
        "pageNumber": 36,
        "slug": "selida-36",
        "title": "Σελίδα 36 - Ο Ηρακλής και η Λερναία Ύδρα",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα 7: Οι Άθλοι",
        "summary": "Ο δεύτερος άθλος του Ηρακλή.",
        "exercises": [
          {
            "number": "Ερώτηση 2",
            "question": "Πώς εξόντωσε ο Ηρακλής τη Λερναία Ύδρα;",
            "steps": [
              "Ο Ηρακλής έκοβε τα κεφάλια.",
              "Ο Ιόλαος έκαιγε τις πληγές με φωτιά για να μην ξαναβγούν."
            ],
            "answer": "Με τη βοήθεια του Ιόλαου που έκαιγε τις πληγές.",
            "tip": "Ο άθλος συμβόλιζε την αποξήρανση των ελών."
          }
        ]
      }
    ]
  },
  {
    "id": "d-dimotikou-mathimatika",
    "gradeCode": "K04",
    "gradeSlug": "d-dimotikou",
    "gradeName": "Δ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K04",
    "coverBadge": "Αριθμοί έως 100.000, Δεκαδικοί, Εμβαδόν",
    "coverColor": "#1d4ed8",
    "metaDescription": "Λύσεις Μαθηματικών Δ' Δημοτικού. Δεκαδικοί αριθμοί, μετατροπές μονάδων μέτρησης και εμβαδά.",
    "keywords": [
      "μαθηματικα δ δημοτικου λυσεις",
      "δεκαδικοι αριθμοι δ"
    ],
    "chaptersCount": 6,
    "totalExercises": 55,
    "pages": [
      {
        "pageNumber": 32,
        "slug": "selida-32",
        "title": "Σελίδα 32 - Δεκαδικοί Αριθμοί",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα 11: Δεκαδικά κλάσματα",
        "summary": "Μετατροπή κλασμάτων σε δεκαδικούς.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Γράψτε ως δεκαδικούς: 7/10, 45/100, 325/1000.",
            "steps": [
              "7/10 = 0,7 (δέκατα)",
              "45/100 = 0,45 (εκατοστά)",
              "325/1000 = 0,325 (χιλιοστά)"
            ],
            "answer": "0,7 | 0,45 | 0,325.",
            "tip": "Όσα μηδενικά στον παρονομαστή, τόσα δεκαδικά ψηφία."
          }
        ]
      },
      {
        "pageNumber": 64,
        "slug": "selida-64",
        "title": "Σελίδα 64 - Εμβαδόν Ορθογωνίου",
        "unit": "Ενότητα 4",
        "lesson": "Μάθημα 22: Τύπος εμβαδού Ε = β x υ",
        "summary": "Υπολογισμός εμβαδού σε τετραγωνικά εκατοστά (cm²).",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Ορθογώνιο έχει μήκος 8 cm και πλάτος 5 cm. Βρείτε το εμβαδόν.",
            "steps": [
              "Ε = μήκος x πλάτος = 8 x 5 = 40 cm²."
            ],
            "answer": "Ε = 40 cm².",
            "tip": "Το εμβαδόν μετριέται σε τετραγωνικές μονάδες (cm², m²)."
          }
        ]
      }
    ]
  },
  {
    "id": "d-dimotikou-istoria",
    "gradeCode": "K04",
    "gradeSlug": "d-dimotikou",
    "gradeName": "Δ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Ιστορία",
    "subjectSlug": "istoria",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K04",
    "coverBadge": "Αρχαία Ελλάδα, Μινωίτες, Περσικοί Πόλεμοι",
    "coverColor": "#9a3412",
    "metaDescription": "Λύσεις Ιστορίας Δ' Δημοτικού. Μινωικός, Μυκηναϊκός Πολιτισμός, Περσικοί Πόλεμοι και Περικλής.",
    "keywords": [
      "ιστορια δ δημοτικου λυσεις",
      "αρχαια ελλαδα δ ταξη"
    ],
    "chaptersCount": 5,
    "totalExercises": 45,
    "pages": [
      {
        "pageNumber": 28,
        "slug": "selida-28",
        "title": "Σελίδα 28 - Ο Μυκηναϊκός Πολιτισμός",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 6: Οι Μυκήνες",
        "summary": "Ακροπόλεις, κυκλώπεια τείχη και άνακτας.",
        "exercises": [
          {
            "number": "Ερώτηση 1",
            "question": "Ποια ήταν τα χαρακτηριστικά των μυκηναϊκών πόλεων;",
            "steps": [
              "Χτισμένες σε λόφους με κυκλώπεια τείχη για άμυνα.",
              "Στο κέντρο το ανάκτορο με ηγέτη τον άνακτα."
            ],
            "answer": "Οχυρωμένες ακροπόλεις με κυκλώπεια τείχη και κεντρικό ανάκτορο.",
            "tip": "Η Γραμμική Β ήταν η πρώτη ελληνική γραφή."
          }
        ]
      },
      {
        "pageNumber": 52,
        "slug": "selida-52",
        "title": "Σελίδα 52 - Η Μάχη του Μαραθώνα (490 π.Χ.)",
        "unit": "Ενότητα 3",
        "lesson": "Μάθημα 15: Περσικοί Πόλεμοι",
        "summary": "Η στρατηγική του Μιλτιάδη.",
        "exercises": [
          {
            "number": "Ερώτηση 2",
            "question": "Ποια τακτική ακολούθησε ο Μιλτιάδης στον Μαραθώνα;",
            "steps": [
              "Ενίσχυσε τα πλάγια κέρατα της παράταξης και άφησε ασθενές το κέντρο.",
              "Περικύκλωσε τους Πέρσες και πέτυχε λαμπρή νίκη."
            ],
            "answer": "Ενίσχυση των πτερύγων και περικύκλωση του αντιπάλου.",
            "tip": "Ο οπλίτης Φειδιππίδης έτρεξε στην Αθήνα αναγγέλλοντας: Νενικήκαμεν!"
          }
        ]
      }
    ]
  },
  {
    "id": "d-dimotikou-fysika",
    "gradeCode": "K04",
    "gradeSlug": "d-dimotikou",
    "gradeName": "Δ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Φυσικά",
    "subjectSlug": "fysika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K04",
    "coverBadge": "Ενέργεια, Ύλη, Φως, Ήχος",
    "coverColor": "#0d9488",
    "metaDescription": "Λύσεις Φυσικών Δ' Δημοτικού. Πειράματα διάδοσης φωτός, ενέργειας και ηχητικών κυμάτων.",
    "keywords": [
      "φυσικα δ δημοτικου λυσεις",
      "πειραματα φυσικα δ"
    ],
    "chaptersCount": 5,
    "totalExercises": 40,
    "pages": [
      {
        "pageNumber": 24,
        "slug": "selida-24",
        "title": "Σελίδα 24 - Το Φως και οι Σκιές",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα: Ευθύγραμμη διάδοση φωτός",
        "summary": "Πώς δημιουργούνται οι σκιές.",
        "exercises": [
          {
            "number": "Πείραμα 1",
            "question": "Γιατί σχηματίζεται σκιά πίσω από αδιαφανή σώματα;",
            "steps": [
              "Το φως ταξιδεύει σε ευθεία γραμμή.",
              "Τα αδιαφανή σώματα εμποδίζουν το φως, δημιουργώντας σκοτεινή περιοχή."
            ],
            "answer": "Επειδή το φως διαδίδεται ευθύγραμμα και δεν διαπερνά τα αδιαφανή σώματα.",
            "tip": "Αν πλησιάσουμε στην πηγή, η σκιά μεγαλώνει."
          }
        ]
      }
    ]
  },
  {
    "id": "e-dimotikou-mathimatika",
    "gradeCode": "K05",
    "gradeSlug": "e-dimotikou",
    "gradeName": "Ε' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K05",
    "coverBadge": "Κλάσματα, Ποσοστά, ΕΚΠ & ΜΚΔ, Εμβαδόν",
    "coverColor": "#1e40af",
    "metaDescription": "Λύσεις Μαθηματικών Ε' Δημοτικού. Πράξεις κλασμάτων, ΕΚΠ, ποσοστά και εμβαδά πολυγώνων.",
    "keywords": [
      "μαθηματικα ε δημοτικου λυσεις",
      "κλασματα ε δημοτικου"
    ],
    "chaptersCount": 6,
    "totalExercises": 60,
    "pages": [
      {
        "pageNumber": 36,
        "slug": "selida-36",
        "title": "Σελίδα 36 - Πρόσθεση Ετερώνυμων Κλασμάτων",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα 14: Εύρεση ΕΚΠ",
        "summary": "Μετατροπή σε ομώνυμα κλάσματα.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Υπολογίστε: 2/3 + 3/4 = ;",
            "steps": [
              "ΕΚΠ(3, 4) = 12.",
              "2/3 = 8/12 και 3/4 = 9/12.",
              "8/12 + 9/12 = 17/12 = 1 5/12."
            ],
            "answer": "17/12 (ή 1 5/12).",
            "tip": "Δεν προσθέτουμε ποτέ τους παρονομαστές!"
          }
        ]
      },
      {
        "pageNumber": 72,
        "slug": "selida-72",
        "title": "Σελίδα 72 - Ποσοστά και Εκπτώσεις",
        "unit": "Ενότητα 4",
        "lesson": "Μάθημα 28: Υπολογισμός ποσοστού %",
        "summary": "Εύρεση τελικής τιμής μετά από έκπτωση.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Μπουφάν αξίας 80 € έχει έκπτωση 20%. Πόσο θα πληρώσουμε;",
            "steps": [
              "Έκπτωση = 80 x 20/100 = 16 €.",
              "Τελική τιμή = 80 - 16 = 64 €."
            ],
            "answer": "Θα πληρώσουμε 64 €.",
            "tip": "Μπορούμε επίσης να πολλαπλασιάσουμε κατευθείαν: 80 x 0,80 = 64 €."
          }
        ]
      }
    ]
  },
  {
    "id": "e-dimotikou-istoria",
    "gradeCode": "K05",
    "gradeSlug": "e-dimotikou",
    "gradeName": "Ε' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Ιστορία",
    "subjectSlug": "istoria",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K05",
    "coverBadge": "Βυζαντινή Ιστορία, Κωνσταντινούπολη, Ιουστινιανός",
    "coverColor": "#7c2d12",
    "metaDescription": "Λύσεις Ιστορίας Ε' Δημοτικού. Βυζάντιο, Αγία Σοφία, νομοθεσία Ιουστινιανού και Άλωση.",
    "keywords": [
      "ιστορια ε δημοτικου λυσεις",
      "βυζαντιο ε δημοτικου"
    ],
    "chaptersCount": 5,
    "totalExercises": 45,
    "pages": [
      {
        "pageNumber": 30,
        "slug": "selida-30",
        "title": "Σελίδα 30 - Η Ανέγερση της Αγίας Σοφίας",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 5: Ανθέμιος και Ισίδωρος",
        "summary": "Ο ναός της Αγίας Σοφίας (537 μ.Χ.).",
        "exercises": [
          {
            "number": "Ερώτηση 1",
            "question": "Ποιος ρυθμός εφαρμόστηκε στην Αγία Σοφία;",
            "steps": [
              "Αρχιτέκτονες: Ανθέμιος και Ισίδωρος.",
              "Ρυθμός: Βασιλική με τρούλο."
            ],
            "answer": "Βασιλική με τρούλο από τους Ανθέμιο και Ισίδωρο (εγκαίνια 537 μ.Χ.).",
            "tip": "Ο Ιουστινιανός αναφώνησε: Νενίκηκά σε, Σολομών!"
          }
        ]
      },
      {
        "pageNumber": 68,
        "slug": "selida-68",
        "title": "Σελίδα 68 - Η Άλωση της Κωνσταντινούπολης (1453)",
        "unit": "Ενότητα 4",
        "lesson": "Μάθημα 25: 29 Μαΐου 1453",
        "summary": "Ο Κωνσταντίνος Παλαιολόγος και το τέλος της Αυτοκρατορίας.",
        "exercises": [
          {
            "number": "Ερώτηση 2",
            "question": "Ποια ήταν η απάντηση του Κωνσταντίνου Παλαιολόγου στον Μωάμεθ Β';",
            "steps": [
              "Ο σουλτάνος ζήτησε την παράδοση της πόλης.",
              "Ο αυτοκράτορας απάντησε: 'Το δε την πόλιν σοι δούναι ούτ' εμόν εστίν ούτ' άλλου των κατοικούντων εν ταύτη...'"
            ],
            "answer": "Αρνήθηκε να παραδώσει την Πόλη, επιλέγοντας να πολεμήσει μέχρι τέλους.",
            "tip": "Έπεσε μαχόμενος στην Πύλη του Αγίου Ρωμανού."
          }
        ]
      }
    ]
  },
  {
    "id": "st-dimotikou-mathimatika",
    "gradeCode": "K06",
    "gradeSlug": "st-dimotikou",
    "gradeName": "ΣΤ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K06",
    "coverBadge": "Αριθμοί, Κλάσματα, Εξισώσεις, Γεωμετρικά Στερεά",
    "coverColor": "#2563eb",
    "metaDescription": "Λύσεις Μαθηματικών ΣΤ' Δημοτικού. Αναλυτικές λύσεις για αναλογίες, εξισώσεις και γεωμετρία.",
    "keywords": [
      "μαθηματικα στ δημοτικου λυσεις",
      "λυσαρι μαθηματικων στ"
    ],
    "chaptersCount": 5,
    "totalExercises": 48,
    "pages": [
      {
        "pageNumber": 12,
        "slug": "selida-12",
        "title": "Σελίδα 12 - Οι Φυσικοί Αριθμοί",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 1: Αξία θέσης ψηφίου",
        "summary": "Ανάλυση θέσης ψηφίων έως 1.000.000.000.",
        "exercises": [
          {
            "number": "Δραστηριότητα 1",
            "question": "Γράψτε με ψηφία: 4 εκατοντάδες χιλιάδες, 6 δεκάδες χιλιάδες, 3 εκατοντάδες και 8 μονάδες.",
            "steps": [
              "400.000 + 60.000 + 300 + 8 = 460.308."
            ],
            "answer": "460.308.",
            "tip": "Χωρίζουμε τα ψηφία ανά τριάδες."
          }
        ]
      },
      {
        "pageNumber": 13,
        "slug": "selida-13",
        "title": "Σελίδα 13 - Στρογγυλοποίηση",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 2: Στρογγυλοποίηση φυσικών",
        "summary": "Κανόνες στρογγυλοποίησης.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Στρογγυλοποιήστε τον 84.675 σε δεκάδα και χιλιάδα.",
            "steps": [
              "Δεκάδα: 84.680 (επόμενο 5)",
              "Χιλιάδα: 85.000 (επόμενο 6)"
            ],
            "answer": "Δεκάδα: 84.680 | Χιλιάδα: 85.000.",
            "tip": "Αν το επόμενο είναι >= 5 αυξάνουμε κατά 1."
          }
        ]
      },
      {
        "pageNumber": 24,
        "slug": "selida-24",
        "title": "Σελίδα 24 - Πολλαπλασιασμός με 10, 100, 1000",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα 6: Σύντομες πράξεις",
        "summary": "Μετακίνηση υποδιαστολής.",
        "exercises": [
          {
            "number": "Εφαρμογή 1",
            "question": "Υπολογίστε: 3,45 x 100 και 56,2 : 10.",
            "steps": [
              "3,45 x 100 = 345 (2 θέσεις δεξιά)",
              "56,2 : 10 = 5,62 (1 θέση αριστερά)"
            ],
            "answer": "345 και 5,62.",
            "tip": "Πολλαπλασιασμός δεξιά, διαίρεση αριστερά."
          }
        ]
      }
    ]
  },
  {
    "id": "st-dimotikou-glossa",
    "gradeCode": "K06",
    "gradeSlug": "st-dimotikou",
    "gradeName": "ΣΤ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Γλώσσα",
    "subjectSlug": "glossa",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K06",
    "coverBadge": "Γραμματική, Συντακτικό, Παραγωγή Λόγου",
    "coverColor": "#059669",
    "metaDescription": "Λύσεις Γλώσσας ΣΤ' Δημοτικού. Κατανόηση κειμένου, χρόνοι ρημάτων και εκθέσεις.",
    "keywords": [
      "γλωσσα στ δημοτικου λυσεις",
      "λυσαρι γλωσσας στ"
    ],
    "chaptersCount": 6,
    "totalExercises": 52,
    "pages": [
      {
        "pageNumber": 10,
        "slug": "selida-10",
        "title": "Σελίδα 10 - Ταξίδια και Τόποι",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα: Κατανόηση κειμένου",
        "summary": "Ανάλυση περιγραφικών κειμένων.",
        "exercises": [
          {
            "number": "Ερώτηση 1",
            "question": "Ποια εκφραστικά μέσα χρησιμοποιεί ο συγγραφέας;",
            "steps": [
              "Οπτικές και ακουστικές εικόνες ('το σφύριγμα της μηχανής').",
              "Προσωποποιήσεις και μεταφορές."
            ],
            "answer": "Αισθητηριακές εικόνες και μεταφορικός λόγος.",
            "tip": "Εντοπίζουμε τα επίθετα και τις παρομοιώσεις."
          }
        ]
      }
    ]
  },
  {
    "id": "st-dimotikou-fysika",
    "gradeCode": "K06",
    "gradeSlug": "st-dimotikou",
    "gradeName": "ΣΤ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Φυσικά",
    "subjectSlug": "fysika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K06",
    "coverBadge": "Ηλεκτρισμός, Αναπνοή, Κυκλοφορικό, Οικολογία",
    "coverColor": "#0891b2",
    "metaDescription": "Λύσεις Φυσικών ΣΤ' Δημοτικού. Πειράματα ηλεκτρικών κυκλωμάτων και ανθρώπινο σώμα.",
    "keywords": [
      "φυσικα στ δημοτικου λυσεις",
      "πειραματα φυσικα στ"
    ],
    "chaptersCount": 5,
    "totalExercises": 44,
    "pages": [
      {
        "pageNumber": 18,
        "slug": "selida-18",
        "title": "Σελίδα 18 - Ηλεκτρικά Κυκλώματα",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα: Κλειστό κύκλωμα",
        "summary": "Ροή ηλεκτρικού ρεύματος.",
        "exercises": [
          {
            "number": "Πείραμα 1",
            "question": "Γιατί ανάβει ο λαμπτήρας μόνο σε κλειστό διακόπτη;",
            "steps": [
              "Απαιτείται συνεχής αγώγιμη διαδρομή.",
              "Σε κλειστό κύκλωμα τα ηλεκτρόνια κινούνται ανεμπόδιστα."
            ],
            "answer": "Επειδή επιτρέπεται η συνεχής ροή ηλεκτρικού ρεύματος.",
            "tip": "Κλειστός διακόπτης = αναμμένο φως."
          }
        ]
      }
    ]
  },
  {
    "id": "st-dimotikou-istoria",
    "gradeCode": "K06",
    "gradeSlug": "st-dimotikou",
    "gradeName": "ΣΤ' Δημοτικού",
    "level": "dimotiko",
    "levelName": "Δημοτικό",
    "subject": "Ιστορία",
    "subjectSlug": "istoria",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K06",
    "coverBadge": "Επανάσταση 1821, Καποδίστριας, Βαλκανικοί",
    "coverColor": "#b91c1c",
    "metaDescription": "Λύσεις Ιστορίας ΣΤ' Δημοτικού. Η Επανάσταση του 1821, η Φιλική Εταιρεία και η σύγχρονη Ελλάδα.",
    "keywords": [
      "ιστορια στ δημοτικου λυσεις",
      "επανασταση 1821 στ"
    ],
    "chaptersCount": 5,
    "totalExercises": 45,
    "pages": [
      {
        "pageNumber": 26,
        "slug": "selida-26",
        "title": "Σελίδα 26 - Η Φιλική Εταιρεία",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα: Ίδρυση στην Οδησσό (1814)",
        "summary": "Σκουφάς, Τσακάλωφ, Ξάνθος.",
        "exercises": [
          {
            "number": "Ερώτηση 1",
            "question": "Ποιος ήταν ο σκοπός της Φιλικής Εταιρείας;",
            "steps": [
              "Ιδρύθηκε το 1814 στην Οδησσό από τους Σκουφά, Τσακάλωφ, Ξάνθο.",
              "Σκοπός: Η οργάνωση ένοπλης επανάστασης για την απελευθέρωση."
            ],
            "answer": "Η προετοιμασία της επανάστασης των Ελλήνων.",
            "tip": "Χρησιμοποιούσαν μυστικούς κώδικες."
          }
        ]
      }
    ]
  },
  {
    "id": "a-gymnasiou-mathimatika",
    "gradeCode": "K07",
    "gradeSlug": "a-gymnasiou",
    "gradeName": "Α' Γυμνασίου",
    "level": "gymnasio",
    "levelName": "Γυμνάσιο",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K07",
    "coverBadge": "Φυσικοί, Ρητοί Αριθμοί, Εξισώσεις 1ου Βαθμού",
    "coverColor": "#4338ca",
    "metaDescription": "Λύσεις Μαθηματικών Α' Γυμνασίου. Πράξεις ρητών, πρόσημα, εξισώσεις και βασική γεωμετρία.",
    "keywords": [
      "μαθηματικα α γυμνασιου λυσεις",
      "ρητοι αριθμοι α γυμνασιου",
      "εξισωσεις α γυμνασιου"
    ],
    "chaptersCount": 7,
    "totalExercises": 65,
    "pages": [
      {
        "pageNumber": 28,
        "slug": "selida-28",
        "title": "Σελίδα 28 - Πράξεις με Ρητούς Αριθμούς",
        "unit": "Μέρος Α - Κεφάλαιο 1",
        "lesson": "Παράγραφος 1.4: Πρόσημα",
        "summary": "Κανόνες προσήμων σε πρόσθεση και αφαίρεση.",
        "exercises": [
          {
            "number": "Άσκηση 3",
            "question": "Υπολογίστε: (-7) + (+12) και (-15) + (-8).",
            "steps": [
              "(-7) + (+12) = +5 (ετερόσημοι, διαφορά 12-7=5 με πρόσημο +).",
              "(-15) + (-8) = -23 (ομόσημοι, άθροισμα με πρόσημο -)."
            ],
            "answer": "+5 και -23.",
            "tip": "Δύο πλην στη σειρά (- -) γίνονται συν (+)."
          }
        ]
      },
      {
        "pageNumber": 62,
        "slug": "selida-62",
        "title": "Σελίδα 62 - Εξισώσεις 1ου Βαθμού",
        "unit": "Μέρος Α - Κεφάλαιο 2",
        "lesson": "Παράγραφος 2.1: Επίλυση ax = b",
        "summary": "Χωρισμός γνωστών από αγνώστους.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Να λυθεί: 3x - 5 = 16.",
            "steps": [
              "3x = 16 + 5",
              "3x = 21",
              "x = 21 / 3 = 7."
            ],
            "answer": "x = 7.",
            "tip": "Επαλήθευση: 3*7 - 5 = 16 (σωστό!)."
          }
        ]
      }
    ]
  },
  {
    "id": "a-gymnasiou-arxaia",
    "gradeCode": "K07",
    "gradeSlug": "a-gymnasiou",
    "gradeName": "Α' Γυμνασίου",
    "level": "gymnasio",
    "levelName": "Γυμνάσιο",
    "subject": "Αρχαία Ελληνικά",
    "subjectSlug": "arxaia",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K07",
    "coverBadge": "Οδύσσεια, Γραμματική, Β' Κλίση Ουσιαστικών",
    "coverColor": "#b45309",
    "metaDescription": "Λύσεις Αρχαίων Α' Γυμνασίου. Μεταφράσεις, γραμματική β' κλίσης και ανάλυση Οδύσσειας.",
    "keywords": [
      "αρχαια α γυμνασιου λυσεις",
      "οδυσσεια α γυμνασιου",
      "β κλιση αρχαια"
    ],
    "chaptersCount": 6,
    "totalExercises": 45,
    "pages": [
      {
        "pageNumber": 16,
        "slug": "selida-16",
        "title": "Σελίδα 16 - Β' Κλίση Ουσιαστικών",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα: ὁ ἄνθρωπος, τὸ ἔργον",
        "summary": "Κλίση ουσιαστικών σε -ος και -ον.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Κλίνετε: ὁ ἄνθρωπος στον ενικό και πληθυντικό.",
            "steps": [
              "Ενικός: ὁ ἄνθρωπος, τοῦ ἀνθρώπου, τῷ ἀνθρώπῳ, τὸν ἄνθρωπον, ὦ ἄνθρωπε.",
              "Πληθυντικός: οἱ ἄνθρωποι, τῶν ἀνθρώπων, τοῖς ἀνθρώποις, τοὺς ἀνθρώπους, ὦ ἄνθρωποι."
            ],
            "answer": "ὁ ἄνθρωπος, τοῦ ἀνθρώπου, τῷ ἀνθρώπῳ, τὸν ἄνθρωπον, ὦ ἄνθρωπε.",
            "tip": "Στη γενική πληθυντικού ο τόνος κατεβαίνει: τῶν ἀνθρώπων."
          }
        ]
      }
    ]
  },
  {
    "id": "a-gymnasiou-viologia",
    "gradeCode": "K07",
    "gradeSlug": "a-gymnasiou",
    "gradeName": "Α' Γυμνασίου",
    "level": "gymnasio",
    "levelName": "Γυμνάσιο",
    "subject": "Βιολογία",
    "subjectSlug": "viologia",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K07",
    "coverBadge": "Το Κύτταρο, Οργάνωση της Ζωής, Οικολογία",
    "coverColor": "#15803d",
    "metaDescription": "Λύσεις Βιολογίας Α' Γυμνασίου. Δομή ευκαρυωτικού κυττάρου, φυτικά κύτταρα και φωτοσύνθεση.",
    "keywords": [
      "βιολογια α γυμνασιου λυσεις",
      "κυτταρο βιολογια α"
    ],
    "chaptersCount": 4,
    "totalExercises": 35,
    "pages": [
      {
        "pageNumber": 22,
        "slug": "selida-22",
        "title": "Σελίδα 22 - Φυτικό και Ζωικό Κύτταρο",
        "unit": "Ενότητα 1",
        "lesson": "Μάθημα 1.2: Δομή κυττάρου",
        "summary": "Διαφορές στα οργανίδια.",
        "exercises": [
          {
            "number": "Ερώτηση 1",
            "question": "Ποιες είναι οι διαφορές φυτικού και ζωικού κυττάρου;",
            "steps": [
              "1. Κυτταρικό τοίχωμα (μόνο στο φυτικό).",
              "2. Χλωροπλάστες για φωτοσύνθεση (μόνο στο φυτικό).",
              "3. Μεγάλο χυμοτόπιο (μόνο στο φυτικό)."
            ],
            "answer": "Το φυτικό κύτταρο διαθέτει κυτταρικό τοίχωμα, χλωροπλάστες και μεγάλο χυμοτόπιο.",
            "tip": "Και τα δύο διαθέτουν μιτοχόνδρια για ενέργεια."
          }
        ]
      }
    ]
  },
  {
    "id": "b-gymnasiou-mathimatika",
    "gradeCode": "K08",
    "gradeSlug": "b-gymnasiou",
    "gradeName": "Β' Γυμνασίου",
    "level": "gymnasio",
    "levelName": "Γυμνάσιο",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K08",
    "coverBadge": "Πυθαγόρειο Θεώρημα, Εμβαδά, Τριγωνομετρία",
    "coverColor": "#1d4ed8",
    "metaDescription": "Λύσεις Μαθηματικών Β' Γυμνασίου. Πυθαγόρειο θεώρημα, εξισώσεις 1ου βαθμού και τριγωνομετρία.",
    "keywords": [
      "μαθηματικα β γυμνασιου λυσεις",
      "πυθαγορειο θεωρημα β"
    ],
    "chaptersCount": 6,
    "totalExercises": 60,
    "pages": [
      {
        "pageNumber": 42,
        "slug": "selida-42",
        "title": "Σελίδα 42 - Το Πυθαγόρειο Θεώρημα",
        "unit": "Μέρος Β - Κεφάλαιο 1",
        "lesson": "Παράγραφος 1.4: α² = β² + γ²",
        "summary": "Εύρεση υποτείνουσας σε ορθογώνιο τρίγωνο.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Σε ορθογώνιο τρίγωνο ΑΒ = 6 cm, ΑΓ = 8 cm. Βρείτε τη ΒΓ.",
            "steps": [
              "ΒΓ² = ΑΒ² + ΑΓ² = 6² + 8² = 36 + 64 = 100.",
              "ΒΓ = √100 = 10 cm."
            ],
            "answer": "ΒΓ = 10 cm.",
            "tip": "Πυθαγόρεια τριάδα: (6, 8, 10)."
          }
        ]
      }
    ]
  },
  {
    "id": "b-gymnasiou-fysiki",
    "gradeCode": "K08",
    "gradeSlug": "b-gymnasiou",
    "gradeName": "Β' Γυμνασίου",
    "level": "gymnasio",
    "levelName": "Γυμνάσιο",
    "subject": "Φυσική",
    "subjectSlug": "fysiki",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K08",
    "coverBadge": "Κινήσεις, Ταχύτητα, Νόμοι Νεύτωνα, Πίεση",
    "coverColor": "#0284c7",
    "metaDescription": "Λύσεις Φυσικής Β' Γυμνασίου. Ευθύγραμμη ομαλή κίνηση, ταχύτητα (v=s/t) και δυνάμεις.",
    "keywords": [
      "φυσικη β γυμνασιου λυσεις",
      "ταχυτητα φυσικη β"
    ],
    "chaptersCount": 5,
    "totalExercises": 55,
    "pages": [
      {
        "pageNumber": 36,
        "slug": "selida-36",
        "title": "Σελίδα 36 - Ταχύτητα και Κίνηση",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα 2.2: v = s / t",
        "summary": "Μετατροπές km/h σε m/s.",
        "exercises": [
          {
            "number": "Άσκηση 3",
            "question": "Αυτοκίνητο κινείται με v = 72 km/h. Βρείτε το s σε t = 10 s.",
            "steps": [
              "v = 72 / 3,6 = 20 m/s.",
              "s = v * t = 20 * 10 = 200 m."
            ],
            "answer": "v = 20 m/s και s = 200 m.",
            "tip": "Διαιρούμε με το 3,6 για να πάμε από km/h σε m/s."
          }
        ]
      }
    ]
  },
  {
    "id": "b-gymnasiou-ximeia",
    "gradeCode": "K08",
    "gradeSlug": "b-gymnasiou",
    "gradeName": "Β' Γυμνασίου",
    "level": "gymnasio",
    "levelName": "Γυμνάσιο",
    "subject": "Χημεία",
    "subjectSlug": "ximeia",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K08",
    "coverBadge": "Διαλύματα, Περιεκτικότητα % w/w, Άτομα, Μόρια",
    "coverColor": "#059669",
    "metaDescription": "Λύσεις Χημείας Β' Γυμνασίου. Περιεκτικότητα διαλυμάτων στα εκατό κατά βάρος και δομή ατόμου.",
    "keywords": [
      "χημεια β γυμνασιου λυσεις",
      "διαλυματα β γυμνασιου"
    ],
    "chaptersCount": 4,
    "totalExercises": 40,
    "pages": [
      {
        "pageNumber": 24,
        "slug": "selida-24",
        "title": "Σελίδα 24 - Περιεκτικότητα Διαλύματος % w/w",
        "unit": "Ενότητα 1",
        "lesson": "Παράγραφος 1.4: % w/w",
        "summary": "Υπολογισμός συγκέντρωσης διαλύματος.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Διαλύουμε 20 g αλάτι σε 180 g νερό. Ποια η % w/w;",
            "steps": [
              "Μάζα διαλύματος = 20 + 180 = 200 g.",
              "% w/w = (20 / 200) * 100 = 10%."
            ],
            "answer": "10% w/w.",
            "tip": "Μάζα διαλύματος = ουσία + διαλύτης."
          }
        ]
      }
    ]
  },
  {
    "id": "g-gymnasiou-mathimatika",
    "gradeCode": "K09",
    "gradeSlug": "g-gymnasiou",
    "gradeName": "Γ' Γυμνασίου",
    "level": "gymnasio",
    "levelName": "Γυμνάσιο",
    "subject": "Μαθηματικά",
    "subjectSlug": "mathimatika",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K09",
    "coverBadge": "Ταυτότητες, Παραγοντοποίηση, Εξισώσεις 2ου Βαθμού",
    "coverColor": "#312e81",
    "metaDescription": "Λύσεις Μαθηματικών Γ' Γυμνασίου. Αξιοσημείωτες ταυτότητες, διακρίνουσα και όμοια τρίγωνα.",
    "keywords": [
      "μαθηματικα γ γυμνασιου λυσεις",
      "ταυτοτητες γ γυμνασιου",
      "εξισωσεις 2ου βαθμου γ"
    ],
    "chaptersCount": 6,
    "totalExercises": 65,
    "pages": [
      {
        "pageNumber": 38,
        "slug": "selida-38",
        "title": "Σελίδα 38 - Αξιοσημείωτες Ταυτότητες",
        "unit": "Μέρος Α - Κεφάλαιο 1",
        "lesson": "Παράγραφος 1.5: (α+β)², (α-β)², α²-β²",
        "summary": "Ανάπτυγμα ταυτοτήτων.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Αναπτύξτε: (2x + 3)² και (3x - 1)(3x + 1).",
            "steps": [
              "(2x + 3)² = (2x)² + 2*(2x)*3 + 3² = 4x² + 12x + 9.",
              "(3x - 1)(3x + 1) = (3x)² - 1² = 9x² - 1."
            ],
            "answer": "4x² + 12x + 9 και 9x² - 1.",
            "tip": "(2x)² = 4x² (όχι 2x²)."
          }
        ]
      },
      {
        "pageNumber": 74,
        "slug": "selida-74",
        "title": "Σελίδα 74 - Εξισώσεις 2ου Βαθμού",
        "unit": "Μέρος Α - Κεφάλαιο 2",
        "lesson": "Παράγραφος 2.2: Διακρίνουσα Δ",
        "summary": "Εύρεση ριζών τριωνύμου.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Λύστε: x² - 5x + 6 = 0.",
            "steps": [
              "Δ = (-5)² - 4*1*6 = 25 - 24 = 1 > 0.",
              "x = (5 ± 1) / 2 -> x₁ = 3, x₂ = 2."
            ],
            "answer": "x = 3 και x = 2.",
            "tip": "Το τριώνυμο γράφεται (x - 3)(x - 2) = 0."
          }
        ]
      }
    ]
  },
  {
    "id": "g-gymnasiou-fysiki",
    "gradeCode": "K09",
    "gradeSlug": "g-gymnasiou",
    "gradeName": "Γ' Γυμνασίου",
    "level": "gymnasio",
    "levelName": "Γυμνάσιο",
    "subject": "Φυσική",
    "subjectSlug": "fysiki",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K09",
    "coverBadge": "Ηλεκτρισμός, Νόμος Ohm, Αντιστάσεις, Κύματα",
    "coverColor": "#0369a1",
    "metaDescription": "Λύσεις Φυσικής Γ' Γυμνασίου. Νόμος του Ohm (I=V/R), αντιστάσεις και ηλεκτρική ενέργεια.",
    "keywords": [
      "φυσικη γ γυμνασιου λυσεις",
      "νομος ohm γ"
    ],
    "chaptersCount": 5,
    "totalExercises": 50,
    "pages": [
      {
        "pageNumber": 44,
        "slug": "selida-44",
        "title": "Σελίδα 44 - Νόμος του Ohm",
        "unit": "Ενότητα 2",
        "lesson": "Μάθημα 2.3: I = V / R",
        "summary": "Σχέση έντασης, τάσης και αντίστασης.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "R = 20 Ω, V = 100 V. Βρείτε το ρεύμα I και τη θερμότητα σε t = 10 s.",
            "steps": [
              "I = V / R = 100 / 20 = 5 A.",
              "Q = I² * R * t = 25 * 20 * 10 = 5.000 J (5 kJ)."
            ],
            "answer": "I = 5 A και Q = 5.000 J.",
            "tip": "Η αντίσταση μετριέται σε Ω και η θερμότητα σε Joules."
          }
        ]
      }
    ]
  },
  {
    "id": "a-lykeiou-algebra",
    "gradeCode": "K10",
    "gradeSlug": "a-lykeiou",
    "gradeName": "Α' Λυκείου",
    "level": "lykeio",
    "levelName": "Λύκειο",
    "subject": "Άλγεβρα",
    "subjectSlug": "algebra",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K10",
    "coverBadge": "Πραγματικοί Αριθμοί, Εξισώσεις 2ου Βαθμού, Ανισώσεις",
    "coverColor": "#4f46e5",
    "metaDescription": "Λύσεις Άλγεβρας Α' Λυκείου. Αναλυτικές αποδείξεις, διακρίνουσα, ανισώσεις και πρόσημο τριωνύμου.",
    "keywords": [
      "αλγεβρα α λυκειου λυσεις",
      "διακρινουσα α λυκειου",
      "ανισωσεις α λυκειου"
    ],
    "chaptersCount": 6,
    "totalExercises": 75,
    "pages": [
      {
        "pageNumber": 52,
        "slug": "selida-52",
        "title": "Σελίδα 52 - Εξισώσεις 2ου Βαθμού",
        "unit": "Κεφάλαιο 3",
        "lesson": "Παράγραφος 3.3: ax² + bx + c = 0",
        "summary": "Επίλυση με διακρίνουσα Δ = b² - 4ac.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Λύστε: 2x² - 5x + 2 = 0.",
            "steps": [
              "Δ = (-5)² - 4*2*2 = 25 - 16 = 9 > 0.",
              "x = (5 ± 3) / 4 -> x₁ = 2, x₂ = 1/2."
            ],
            "answer": "x = 2 και x = 1/2.",
            "tip": "Αν Δ > 0 έχουμε δύο άνισες πραγματικές ρίζες."
          }
        ]
      },
      {
        "pageNumber": 84,
        "slug": "selida-84",
        "title": "Σελίδα 84 - Πρόσημο Τριωνύμου",
        "unit": "Κεφάλαιο 4",
        "lesson": "Παράγραφος 4.2: Ανισώσεις 2ου βαθμού",
        "summary": "Επίλυση f(x) < 0.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Βρείτε για ποια x ισχύει: x² - 4x + 3 < 0.",
            "steps": [
              "Ρίζες: x₁ = 1, x₂ = 3.",
              "Συντελεστής a = 1 > 0.",
              "Ετερόσημο του a εντός των ριζών: 1 < x < 3."
            ],
            "answer": "x ∈ (1, 3).",
            "tip": "Εντός των ριζών το τριώνυμο είναι ετερόσημο του a."
          }
        ]
      }
    ]
  },
  {
    "id": "a-lykeiou-geometria",
    "gradeCode": "K10",
    "gradeSlug": "a-lykeiou",
    "gradeName": "Α' Λυκείου",
    "level": "lykeio",
    "levelName": "Λύκειο",
    "subject": "Γεωμετρία",
    "subjectSlug": "geometria",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K10",
    "coverBadge": "Ισότητα Τριγώνων, Παράλληλες, Παραλληλόγραμμα",
    "coverColor": "#4338ca",
    "metaDescription": "Λύσεις Γεωμετρίας Α' Λυκείου. Κριτήρια ισότητας τριγώνων (Π-Γ-Π, Γ-Π-Γ, Π-Π-Π) και αποδείξεις.",
    "keywords": [
      "γεωμετρια α λυκειου λυσεις",
      "ισοτητα τριγωνων α"
    ],
    "chaptersCount": 5,
    "totalExercises": 60,
    "pages": [
      {
        "pageNumber": 34,
        "slug": "selida-34",
        "title": "Σελίδα 34 - Κριτήρια Ισότητας Τριγώνων",
        "unit": "Κεφάλαιο 3",
        "lesson": "Παράγραφος 3.2: Κριτήριο Π-Γ-Π",
        "summary": "Απόδειξη ισότητας τριγώνων.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Σε ισοσκελές ΑΒΓ (ΑΒ=ΑΓ) φέρνουμε διχοτόμο ΑΔ. Δείξτε ότι ΑΒΔ = ΑΓΔ.",
            "steps": [
              "1. ΑΒ = ΑΓ (υπόθεση).",
              "2. ΒΑΔ = ΓΑΔ (ΑΔ διχοτόμος).",
              "3. ΑΔ κοινή πλευρά.",
              "Κατά το κριτήριο Π-Γ-Π τα τρίγωνα είναι ίσα."
            ],
            "answer": "Τα τρίγωνα είναι ίσα (Π-Γ-Π). Η διχοτόμος ισοσκελούς είναι και διάμεσος και ύψος.",
            "tip": "Βασική ιδιότητα ισοσκελούς τριγώνου."
          }
        ]
      }
    ]
  },
  {
    "id": "a-lykeiou-fysiki",
    "gradeCode": "K10",
    "gradeSlug": "a-lykeiou",
    "gradeName": "Α' Λυκείου",
    "level": "lykeio",
    "levelName": "Λύκειο",
    "subject": "Φυσική",
    "subjectSlug": "fysiki",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K10",
    "coverBadge": "Κινήσεις, Νόμοι Νεύτωνα, Έργο & Ενέργεια, ΘΜΚΕ",
    "coverColor": "#1d4ed8",
    "metaDescription": "Λύσεις Φυσικής Α' Λυκείου. 2ος Νόμος Νεύτωνα (ΣF=m*a), τριβή ολίσθησης και ΘΜΚΕ.",
    "keywords": [
      "φυσικη α λυκειου λυσεις",
      "νομοι νευτωνα α λυκειου"
    ],
    "chaptersCount": 5,
    "totalExercises": 65,
    "pages": [
      {
        "pageNumber": 48,
        "slug": "selida-48",
        "title": "Σελίδα 48 - 2ος Νόμος του Νεύτωνα",
        "unit": "Κεφάλαιο 2",
        "lesson": "Παράγραφος 2.2: ΣF = m * a",
        "summary": "Υπολογισμός επιτάχυνσης με τριβή.",
        "exercises": [
          {
            "number": "Άσκηση 3",
            "question": "m = 4 kg, μ = 0,2, F = 20 N, g = 10 m/s². Βρείτε την επιτάχυνση a.",
            "steps": [
              "B = N = m*g = 40 N.",
              "T = μ*N = 0,2*40 = 8 N.",
              "ΣFx = F - T = 20 - 8 = 12 N.",
              "a = ΣFx / m = 12 / 4 = 3 m/s²."
            ],
            "answer": "a = 3 m/s².",
            "tip": "Σχεδιάζουμε πάντα διάγραμμα ελεύθερου σώματος (FBD)."
          }
        ]
      }
    ]
  },
  {
    "id": "b-lykeiou-algebra",
    "gradeCode": "K11",
    "gradeSlug": "b-lykeiou",
    "gradeName": "Β' Λυκείου",
    "level": "lykeio",
    "levelName": "Λύκειο",
    "subject": "Άλγεβρα",
    "subjectSlug": "algebra",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K11",
    "coverBadge": "Τριγωνομετρία, Πολυώνυμα, Σχήμα Horner, Λογάριθμοι",
    "coverColor": "#6366f1",
    "metaDescription": "Λύσεις Άλγεβρας Β' Λυκείου. Τριγωνομετρικές εξισώσεις, σχήμα Horner και λογαριθμικές συναρτήσεις.",
    "keywords": [
      "αλγεβρα β λυκειου λυσεις",
      "τριγωνομετρια β λυκειου",
      "σχημα horner"
    ],
    "chaptersCount": 5,
    "totalExercises": 70,
    "pages": [
      {
        "pageNumber": 38,
        "slug": "selida-38",
        "title": "Σελίδα 38 - Τριγωνομετρικές Εξισώσεις",
        "unit": "Κεφάλαιο 3",
        "lesson": "Παράγραφος 3.3: ημx = ημα",
        "summary": "Γενικές λύσεις τριγωνομετρικών εξισώσεων.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "Λύστε: ημx = 1/2.",
            "steps": [
              "ημx = ημ(π/6).",
              "x = 2κπ + π/6 ή x = 2κπ + (π - π/6) = 2κπ + 5π/6, κ ∈ ℤ."
            ],
            "answer": "x = 2κπ + π/6 ή x = 2κπ + 5π/6 (κ ∈ ℤ).",
            "tip": "Δηλώνουμε πάντα κ ∈ ℤ."
          }
        ]
      },
      {
        "pageNumber": 72,
        "slug": "selida-72",
        "title": "Σελίδα 72 - Σχήμα Horner",
        "unit": "Κεφάλαιο 4",
        "lesson": "Παράγραφος 4.2: Διαίρεση με (x - ρ)",
        "summary": "Υπολογισμός πηλίκου και υπολοίπου.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Διαιρέστε: (2x³ - 5x² + x + 2) : (x - 2).",
            "steps": [
              "Συντελεστές: [2, -5, 1, 2] με ρ = 2.",
              "Horner: 2*2=4 -> -1, -1*2=-2 -> -1, -1*2=-2 -> υπόλοιπο 0.",
              "Π(x) = 2x² - x - 1."
            ],
            "answer": "Π(x) = 2x² - x - 1, υ = 0.",
            "tip": "Αφού υ = 0, το 2 είναι ρίζα του πολυωνύμου."
          }
        ]
      }
    ]
  },
  {
    "id": "b-lykeiou-math-prosanatolismou",
    "gradeCode": "K11",
    "gradeSlug": "b-lykeiou",
    "gradeName": "Β' Λυκείου",
    "level": "lykeio",
    "levelName": "Λύκειο",
    "subject": "Μαθηματικά Προσανατολισμού",
    "subjectSlug": "mathimatika-prosanatolismou",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K11",
    "coverBadge": "Διανύσματα, Ευθεία, Κωνικές Τομές (Κύκλος)",
    "coverColor": "#4338ca",
    "metaDescription": "Λύσεις Μαθηματικών Προσανατολισμού Β' Λυκείου. Εσωτερικό γινόμενο διανυσμάτων και εξισώσεις ευθειών.",
    "keywords": [
      "μαθηματικα προσανατολισμου β λυκειου",
      "διανυσματα β λυκειου"
    ],
    "chaptersCount": 4,
    "totalExercises": 60,
    "pages": [
      {
        "pageNumber": 32,
        "slug": "selida-32",
        "title": "Σελίδα 32 - Εσωτερικό Γινόμενο Διανυσμάτων",
        "unit": "Κεφάλαιο 1",
        "lesson": "Παράγραφος 1.4: u · v = 0",
        "summary": "Κριτήριο καθετότητας διανυσμάτων.",
        "exercises": [
          {
            "number": "Άσκηση 3",
            "question": "u = (3, -2), v = (4, k). Βρείτε το k ώστε u ⊥ v.",
            "steps": [
              "u · v = 0 <=> x₁*x₂ + y₁*y₂ = 0.",
              "3*4 + (-2)*k = 0 -> 12 - 2k = 0 -> k = 6."
            ],
            "answer": "k = 6.",
            "tip": "u · v = 0 σημαίνει γωνία 90°."
          }
        ]
      }
    ]
  },
  {
    "id": "g-lykeiou-math-prosanatolismou",
    "gradeCode": "K12",
    "gradeSlug": "g-lykeiou",
    "gradeName": "Γ' Λυκείου",
    "level": "lykeio",
    "levelName": "Λύκειο",
    "subject": "Μαθηματικά Προσανατολισμού",
    "subjectSlug": "mathimatika-prosanatolismou",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K12",
    "coverBadge": "Όρια, Παράγωγοι, ΘΜΤ, Ολοκληρώματα (Πανελλαδικές)",
    "coverColor": "#1e1b4b",
    "metaDescription": "Λύσεις Μαθηματικών Προσανατολισμού Γ' Λυκείου (Πανελλαδικές). Θεωρήματα Bolzano, Rolle, ΘΜΤ και ολοκληρώματα.",
    "keywords": [
      "μαθηματικα προσανατολισμου γ λυκειου λυσεις",
      "πανελλαδικες μαθηματικα",
      "θεωρημα bolzano γ λυκειου"
    ],
    "chaptersCount": 4,
    "totalExercises": 95,
    "pages": [
      {
        "pageNumber": 58,
        "slug": "selida-58",
        "title": "Σελίδα 58 - Θεώρημα Bolzano & Μοναδικότητα Ρίζας",
        "unit": "Κεφάλαιο 1",
        "lesson": "Παράγραφος 1.8: Ύπαρξη ρίζας",
        "summary": "Συνδυασμός Bolzano με μονοτονία.",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "Δείξτε ότι η x³ + 2x - 4 = 0 έχει μοναδική ρίζα στο (1, 2).",
            "steps": [
              "f(x) = x³ + 2x - 4 συνεχής στο [1, 2].",
              "f(1) = -1 < 0 και f(2) = 8 > 0 -> f(1)*f(2) < 0.",
              "Από Θ. Bolzano υπάρχει ρίζα x₀ ∈ (1, 2).",
              "f'(x) = 3x² + 2 > 0 -> f γνησίως αύξουσα, άρα η ρίζα είναι μοναδική!"
            ],
            "answer": "Αποδείχθηκε (ύπαρξη με Bolzano, μοναδικότητα με μονοτονία).",
            "tip": "Κλασικό θέμα Πανελλαδικών (Θέμα Β ή Γ)."
          }
        ]
      },
      {
        "pageNumber": 112,
        "slug": "selida-112",
        "title": "Σελίδα 112 - Θεώρημα Μέσης Τιμής (Θ.Μ.Τ.)",
        "unit": "Κεφάλαιο 2",
        "lesson": "Παράγραφος 2.5: Διαφορικός Λογισμός",
        "summary": "Εύρεση σημείου ξ ∈ (α, β).",
        "exercises": [
          {
            "number": "Άσκηση 3",
            "question": "f(x) = x² - 4x + 5 στο [1, 3]. Βρείτε το ξ του Θ.Μ.Τ.",
            "steps": [
              "(f(3) - f(1)) / (3 - 1) = (2 - 2) / 2 = 0.",
              "f'(x) = 2x - 4. Εξισώνουμε f'(ξ) = 0 -> 2ξ - 4 = 0 -> ξ = 2 ∈ (1, 3)."
            ],
            "answer": "ξ = 2.",
            "tip": "Η εφαπτομένη στο ξ είναι παράλληλη στη χορδή των άκρων."
          }
        ]
      }
    ]
  },
  {
    "id": "g-lykeiou-fysiki-prosanatolismou",
    "gradeCode": "K12",
    "gradeSlug": "g-lykeiou",
    "gradeName": "Γ' Λυκείου",
    "level": "lykeio",
    "levelName": "Λύκειο",
    "subject": "Φυσική Προσανατολισμού",
    "subjectSlug": "fysiki-prosanatolismou",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K12",
    "coverBadge": "ΑΑΤ, Κύματα, Μηχανική Στερεού, Κρούσεις (Πανελλαδικές)",
    "coverColor": "#0c4a6e",
    "metaDescription": "Λύσεις Φυσικής Προσανατολισμού Γ' Λυκείου. Απλή αρμονική ταλάντωση (ΑΑΤ), στάσιμα κύματα και στροφορμή.",
    "keywords": [
      "φυσικη προσανατολισμου γ λυκειου λυσεις",
      "αατ φυσικη γ λυκειου"
    ],
    "chaptersCount": 5,
    "totalExercises": 80,
    "pages": [
      {
        "pageNumber": 32,
        "slug": "selida-32",
        "title": "Σελίδα 32 - Απλή Αρμονική Ταλάντωση (Α.Α.Τ.)",
        "unit": "Κεφάλαιο 1",
        "lesson": "Παράγραφος 1.2: Εξισώσεις κίνησης & Ενέργεια",
        "summary": "Υπολογισμός v_max και ενέργειας ταλάντωσης.",
        "exercises": [
          {
            "number": "Άσκηση 1",
            "question": "m = 1 kg, k = 100 N/m, A = 0,2 m. Βρείτε ω, v_max, E.",
            "steps": [
              "ω = √(k/m) = √100 = 10 rad/s.",
              "v_max = ω*A = 10 * 0,2 = 2 m/s.",
              "E = 1/2 * k * A² = 0,5 * 100 * 0,04 = 2 J."
            ],
            "answer": "ω = 10 rad/s | v_max = 2 m/s | E = 2 J.",
            "tip": "Η ταχύτητα είναι μέγιστη στη θέση ισορροπίας (x = 0)."
          }
        ]
      }
    ]
  },
  {
    "id": "g-lykeiou-ximeia-prosanatolismou",
    "gradeCode": "K12",
    "gradeSlug": "g-lykeiou",
    "gradeName": "Γ' Λυκείου",
    "level": "lykeio",
    "levelName": "Λύκειο",
    "subject": "Χημεία Προσανατολισμού",
    "subjectSlug": "ximeia-prosanatolismou",
    "bookType": "Βιβλίο Μαθητή",
    "officialPdfUrl": "http://ebooks.edu.gr/ebooks/v2/allcourses.jsp",
    "officialEbooksUrl": "http://ebooks.edu.gr/ebooks/v2/class-main.jsp?classcode=K12",
    "coverBadge": "Διαμοριακές Δυνάμεις, Ιοντική Ισορροπία, pH, Ρυθμιστικά (Πανελλαδικές)",
    "coverColor": "#047857",
    "metaDescription": "Λύσεις Χημείας Προσανατολισμού Γ' Λυκείου. Υπολογισμοί pH ασθενών οξέων, ρυθμιστικά διαλύματα και Le Chatelier.",
    "keywords": [
      "χημεια προσανατολισμου γ λυκειου",
      "ρυθμιστικα διαλυματα ph"
    ],
    "chaptersCount": 5,
    "totalExercises": 75,
    "pages": [
      {
        "pageNumber": 64,
        "slug": "selida-64",
        "title": "Σελίδα 64 - Υπολογισμός pH Ασθενούς Οξέος",
        "unit": "Κεφάλαιο 3",
        "lesson": "Παράγραφος 3.4: Ιοντισμός HA (Ka)",
        "summary": "Τύπος [H3O+] = √(Ka * c).",
        "exercises": [
          {
            "number": "Άσκηση 2",
            "question": "HA συγκέντρωσης c = 0,1 M με Ka = 10⁻⁵. Βρείτε το pH.",
            "steps": [
              "Ka/c = 10⁻⁵/0,1 = 10⁻⁴ <= 0,01 (ισχύουν οι προσεγγίσεις).",
              "[H₃O⁺] = √(Ka * c) = √(10⁻⁶) = 10⁻³ M.",
              "pH = -log[H₃O⁺] = -log(10⁻³) = 3."
            ],
            "answer": "pH = 3.",
            "tip": "Ελέγχουμε πάντα αν ο βαθμός ιοντισμού α <= 0,05."
          }
        ]
      }
    ]
  }
];

// Helper functions
export function getAllGreekBooks(): GreekBook[] {
  return GREEK_BOOKS;
}

export function getGreekBook(gradeSlug: string, subjectSlug: string): GreekBook | undefined {
  return GREEK_BOOKS.find(
    (b) => b.gradeSlug === gradeSlug && b.subjectSlug === subjectSlug
  );
}

export function getGreekPageSolution(
  gradeSlug: string,
  subjectSlug: string,
  pageSlug: string
): { book: GreekBook; page: GreekPageSolution } | undefined {
  const book = getGreekBook(gradeSlug, subjectSlug);
  if (!book) return undefined;
  const page = book.pages.find((p) => p.slug === pageSlug);
  if (!page) return undefined;
  return { book, page };
}

export function getGreekLevel(levelSlug: string) {
  return GREEK_LEVELS.find((l) => l.slug === levelSlug);
}
