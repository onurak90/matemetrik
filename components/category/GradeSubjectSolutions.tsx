import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, CheckCircle2, Sparkles, Filter, X } from 'lucide-react';

export interface SubjectItem {
  key: string;
  name: string;
  bookTitle: string;
  icon: string;
  color: string;
  badge: string;
  bookSlug?: string;
  filterQuery: string;
  description: string;
}

// Map of subjects for every grade (1-12)
export const GRADE_SUBJECTS_MAP: Record<string, SubjectItem[]> = {
  '1-sinif': [
    {
      key: 'matematik',
      name: 'Matematik',
      bookTitle: '1. Sınıf Matematik MEB Ders Kitabı',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-1-sinif-matematik-ders-kitabi-cevaplari',
      filterQuery: 'matematik',
      description: 'Uzamsal ilişkiler, paralarımız, doğal sayılar ve temel toplama-çıkarma çözümleri.'
    },
    {
      key: 'turkce',
      name: 'Türkçe',
      bookTitle: '1. Sınıf Türkçe MEB Ders Kitabı',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-1-sinif-turkce-ders-kitabi-cevaplari',
      filterQuery: 'turkce',
      description: 'İlk okuma yazma, hece, kelime, cümle kurma ve okuduğunu anlama metinleri.'
    },
    {
      key: 'hayat-bilgisi',
      name: 'Hayat Bilgisi',
      bookTitle: '1. Sınıf Hayat Bilgisi',
      icon: '🌿',
      color: 'from-emerald-600 to-teal-600',
      badge: 'MEB Müfredatı',
      filterQuery: 'hayat',
      description: 'Okulumuzda hayat, evimizde hayat ve sağlıklı yaşam etkinlikleri.'
    }
  ],
  '2-sinif': [
    {
      key: 'matematik',
      name: 'Matematik',
      bookTitle: '2. Sınıf Matematik MEB Ders Kitabı',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-2-sinif-matematik-ders-kitabi-cevaplari',
      filterQuery: 'matematik',
      description: 'Doğal sayılar, eldeli toplama, çıkarma, çarpma ve kesirler sayfa çözümleri.'
    },
    {
      key: 'turkce',
      name: 'Türkçe',
      bookTitle: '2. Sınıf Türkçe MEB Ders Kitabı',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-2-sinif-turkce-ders-kitabi-cevaplari',
      filterQuery: 'turkce',
      description: 'Eş-zıt anlamlı kelimeler, soru ekleri, yazım ve noktalama etkinlik cevapları.'
    },
    {
      key: 'hayat-bilgisi',
      name: 'Hayat Bilgisi',
      bookTitle: '2. Sınıf Hayat Bilgisi',
      icon: '🌿',
      color: 'from-emerald-600 to-teal-600',
      badge: 'MEB Müfredatı',
      filterQuery: 'hayat',
      description: 'Tasarruf, temizlik, doğa ve çevre bilinci etkinlik alıştırmaları.'
    }
  ],
  '3-sinif': [
    {
      key: 'matematik',
      name: 'Matematik',
      bookTitle: '3. Sınıf Matematik MEB Ders Kitabı',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-3-sinif-matematik-ders-kitabi-cevaplari',
      filterQuery: 'matematik',
      description: 'Üç basamaklı sayılar, çarpma, bölme, kesirler ve zaman ölçüleri çözümleri.'
    },
    {
      key: 'fen-bilimleri',
      name: 'Fen Bilimleri',
      bookTitle: '3. Sınıf Fen Bilimleri MEB Kitabı',
      icon: '🔬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-3-sinif-fen-bilimleri-ders-kitabi-cevaplari',
      filterQuery: 'fen',
      description: 'Gezegenimiz, beş duyumuz, kuvvetin etkileri ve maddeyi tanıyalım alıştırmaları.'
    },
    {
      key: 'turkce',
      name: 'Türkçe',
      bookTitle: '3. Sınıf Türkçe MEB Kitabı',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: 'MEB Müfredatı',
      filterQuery: 'turkce',
      description: 'Okuma-anlama, ana fikir, eş sesli kelimeler ve noktalama işaretleri.'
    }
  ],
  '4-sinif': [
    {
      key: 'matematik',
      name: 'Matematik',
      bookTitle: '4. Sınıf Matematik MEB Ders Kitabı',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-4-sinif-matematik-ders-kitabi-cevaplari',
      filterQuery: 'matematik',
      description: 'Dört-altı basamaklı sayılar, açılar, kesirlerle işlemler ve problem çözümleri.'
    },
    {
      key: 'fen-bilimleri',
      name: 'Fen Bilimleri',
      bookTitle: '4. Sınıf Fen Bilimleri MEB Kitabı',
      icon: '🔬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-4-sinif-fen-bilimleri-ders-kitabi-cevaplari',
      filterQuery: 'fen',
      description: 'Dünya’mızın hareketleri, besinlerimiz, kuvvet ve aydınlatma teknolojileri.'
    },
    {
      key: 'sosyal-bilgiler',
      name: 'Sosyal Bilgiler',
      bookTitle: '4. Sınıf Sosyal Bilgiler MEB Kitabı',
      icon: '🌍',
      color: 'from-amber-600 to-orange-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-4-sinif-sosyal-bilgiler-ders-kitabi-cevaplari',
      filterQuery: 'sosyal',
      description: 'Birey ve toplum, kültür ve mirasımız, üretim ve tüketim sayfa çözümleri.'
    }
  ],
  '5-sinif': [
    {
      key: 'matematik',
      name: 'Matematik',
      bookTitle: '5. Sınıf Matematik MEB Ders Kitabı',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: 'Maarif Modeli',
      bookSlug: '2026-2027-meb-5-sinif-matematik-ders-kitabi-cevaplari',
      filterQuery: 'matematik',
      description: 'Doğal sayılar, üslü ifadeler, kesirler, ondalık gösterim, yüzdeler ve geometri çözümleri.'
    },
    {
      key: 'fen-bilimleri',
      name: 'Fen Bilimleri',
      bookTitle: '5. Sınıf Fen Bilimleri MEB Kitabı',
      icon: '🔬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'Maarif Modeli',
      bookSlug: '2026-2027-meb-5-sinif-fen-bilimleri-ders-kitabi-cevaplari',
      filterQuery: 'fen',
      description: 'Güneş-Dünya-Ay, Canlılar Dünyası, Kuvvetin Ölçülmesi, Madde ve Değişim çözümleri.'
    },
    {
      key: 'turkce',
      name: 'Türkçe',
      bookTitle: '5. Sınıf Türkçe MEB Kitabı',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: 'Maarif Modeli',
      bookSlug: '2026-2027-meb-5-sinif-turkce-ders-kitabi-cevaplari',
      filterQuery: 'turkce',
      description: 'Sözcükte ve cümlede anlam, metin türleri, kök-ek bilgisi ve tema sonu soruları.'
    },
    {
      key: 'sosyal-bilgiler',
      name: 'Sosyal Bilgiler',
      bookTitle: '5. Sınıf Sosyal Bilgiler MEB Kitabı',
      icon: '🌍',
      color: 'from-amber-600 to-orange-600',
      badge: 'Maarif Modeli',
      bookSlug: '2026-2027-meb-5-sinif-sosyal-bilgiler-ders-kitabi-cevaplari',
      filterQuery: 'sosyal',
      description: 'Birlikte Yaşıyoruz, Evimiz Dünya, Anadolu Uygarlıkları ve Demokrasimiz çözümleri.'
    },
    {
      key: 'ingilizce',
      name: 'İngilizce',
      bookTitle: '5. Sınıf İngilizce MEB Kitabı',
      icon: '🇬🇧',
      color: 'from-sky-600 to-blue-600',
      badge: 'Maarif Modeli',
      bookSlug: '2026-2027-meb-5-sinif-ingilizce-ders-kitabi-cevaplari',
      filterQuery: 'ingilizce',
      description: 'Hello, My Town, Daily Routine, Health, Movies ve Party Time ünite alıştırmaları.'
    }
  ],
  '6-sinif': [
    {
      key: 'matematik',
      name: 'Matematik (1. Kitap)',
      bookTitle: '6. Sınıf Matematik MEB 1. Kitap',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: '119 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-matematik-ders-kitabi-cevaplari-6-sinif-1-kitap',
      filterQuery: 'matematik',
      description: 'Doğal sayılar, çarpanlar ve katlar, açılar, oran ve kesirler sayfa sayfa çözümleri.'
    },
    {
      key: 'fen-1',
      name: 'Fen Bilimleri (1. Kitap)',
      bookTitle: '6. Sınıf Fen Bilimleri 1. Kitap',
      icon: '🔬',
      color: 'from-emerald-600 to-teal-600',
      badge: '169 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-fen-bilimleri-ders-kitabi-cevaplari-6-sinif-1-kitap',
      filterQuery: 'fen',
      description: 'Güneş sistemi, tutulmalar, vücut sistemleri, bileşke kuvvet ve sabit süratli hareket.'
    },
    {
      key: 'fen-2',
      name: 'Fen Bilimleri (2. Kitap)',
      bookTitle: '6. Sınıf Fen Bilimleri 2. Kitap',
      icon: '🔬',
      color: 'from-emerald-600 to-teal-600',
      badge: '111 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-fen-bilimleri-ders-kitabi-cevaplari-6-sinif-2-kitap',
      filterQuery: 'fen',
      description: 'Genleşme-büzülme, yoğunluk, elektriğin iletimi, direnç ve denetleyici sistemler.'
    },
    {
      key: 'turkce-1',
      name: 'Türkçe (1. Kitap)',
      bookTitle: '6. Sınıf Türkçe MEB 1. Kitap',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: '131 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-turkce-ders-kitabi-cevaplari-6-sinif-1-kitap',
      filterQuery: 'turkce',
      description: 'Dilimizin Zenginliği, Millî Mücadele ve Doğa-Evren temaları tüm metin ve etkinlik çözümleri.'
    },
    {
      key: 'turkce-2',
      name: 'Türkçe (2. Kitap)',
      bookTitle: '6. Sınıf Türkçe MEB 2. Kitap',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: '125 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-turkce-ders-kitabi-cevaplari-6-sinif-2-kitap',
      filterQuery: 'turkce',
      description: 'İletişim, Bilim ve Teknoloji, Sanat temaları etkinlikleri ve dil bilgisi sayfa çözümleri.'
    }
  ],
  '7-sinif': [
    {
      key: 'matematik-1',
      name: 'Matematik (1. Kitap)',
      bookTitle: '7. Sınıf Matematik MEB 1. Kitap',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: '88 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-matematik-ders-kitabi-cevaplari-7-sinif-1-kitap',
      filterQuery: 'matematik',
      description: 'Tam sayılarla işlemler, rasyonel sayılar, cebirsel ifadeler ve birinci dereceden denklemler.'
    },
    {
      key: 'matematik-2',
      name: 'Matematik (2. Kitap)',
      bookTitle: '7. Sınıf Matematik MEB 2. Kitap',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: '182 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-matematik-ders-kitabi-cevaplari-7-sinif-2-kitap',
      filterQuery: 'matematik',
      description: 'Oran-orantı, yüzdeler, doğrular ve açılar, çokgenler, çember-daire ve veri analizi çözümleri.'
    },
    {
      key: 'fen-bilimleri',
      name: 'Fen Bilimleri',
      bookTitle: '7. Sınıf Fen Bilimleri MEB Kitabı',
      icon: '🔬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-7-sinif-fen-bilimleri-ders-kitabi-cevaplari',
      filterQuery: 'fen',
      description: 'Uzay araştırmaları, hücre, mitoz-mayoz bölünme, kuvvet-iş-enerji dönüşümleri.'
    },
    {
      key: 'turkce-1',
      name: 'Türkçe (1. Kitap)',
      bookTitle: '7. Sınıf Türkçe MEB 1. Kitap',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: '148 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-turkce-ders-kitabi-cevaplari-7-sinif-1-kitap',
      filterQuery: 'turkce',
      description: 'Hayat Boyu Gelişim, Millî Kültürümüz ve Doğa temaları metin analizi, etkinlik ve dil bilgisi.'
    },
    {
      key: 'turkce-2',
      name: 'Türkçe (2. Kitap)',
      bookTitle: '7. Sınıf Türkçe MEB 2. Kitap',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: '143 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-turkce-ders-kitabi-cevaplari-7-sinif-2-kitap',
      filterQuery: 'turkce',
      description: 'Bilim ve Gelecek, Erdemler, Zaman ve Mekan temaları tüm sayfa alıştırmaları ve çözümleri.'
    }
  ],
  '8-sinif': [
    {
      key: 'matematik',
      name: 'LGS Matematik',
      bookTitle: '8. Sınıf Matematik MEB Kitabı (LGS)',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: 'LGS 2026-2027',
      bookSlug: '2026-2027-meb-8-sinif-matematik-ders-kitabi-cevaplari',
      filterQuery: 'matematik',
      description: 'Çarpanlar ve katlar, üslü-köklü sayılar, olasılık, doğrusal denklemler ve üçgenler.'
    },
    {
      key: 'fen-bilimleri',
      name: 'LGS Fen Bilimleri',
      bookTitle: '8. Sınıf Fen Bilimleri MEB Kitabı',
      icon: '🔬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'LGS 2026-2027',
      bookSlug: '2026-2027-meb-8-sinif-fen-bilimleri-ders-kitabi-cevaplari',
      filterQuery: 'fen',
      description: 'Mevsimler ve iklim, DNA ve genetik kod, basınç, periyodik sistem ve basit makineler.'
    },
    {
      key: 'turkce',
      name: 'LGS Türkçe',
      bookTitle: '8. Sınıf Türkçe MEB Kitabı',
      icon: '📖',
      color: 'from-rose-600 to-pink-600',
      badge: 'LGS 2026-2027',
      bookSlug: '2026-2027-meb-8-sinif-turkce-ders-kitabi-cevaplari',
      filterQuery: 'turkce',
      description: 'Fiilimsiler, cümlenin öğeleri, fiilde çatı, cümle türleri ve sözel mantık çözümleri.'
    },
    {
      key: 'inkilap',
      name: 'T.C. İnkılap Tarihi',
      bookTitle: '8. Sınıf İnkılap Tarihi MEB Kitabı',
      icon: '🇹🇷',
      color: 'from-red-600 to-rose-600',
      badge: 'LGS 2026-2027',
      bookSlug: '2026-2027-meb-8-sinif-inkilap-tarihi-ders-kitabi-cevaplari',
      filterQuery: 'inkilap',
      description: 'Bir Kahraman Doğuyor, Millî Uyanış, Kurtuluş Savaşı cepheleri ve Atatürk ilkeleri.'
    },
    {
      key: 'ingilizce',
      name: 'LGS İngilizce',
      bookTitle: '8. Sınıf İngilizce MEB Kitabı',
      icon: '🇬🇧',
      color: 'from-sky-600 to-blue-600',
      badge: 'LGS 2026-2027',
      bookSlug: '2026-2027-meb-8-sinif-ingilizce-ders-kitabi-cevaplari',
      filterQuery: 'ingilizce',
      description: 'Friendship, Teen Life, In the Kitchen, On the Phone ve The Internet çözümleri.'
    }
  ],
  '9-sinif': [
    {
      key: 'matematik-1',
      name: 'Matematik (1. Kitap)',
      bookTitle: '9. Sınıf Matematik MEB 1. Kitap',
      icon: '📐',
      color: 'from-indigo-600 to-purple-600',
      badge: '63 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-matematik-ders-kitabi-cevaplari',
      filterQuery: 'matematik',
      description: 'Mantık ve önermeler, kümeler ve işlemler, denklem ve eşitsizlikler.'
    },
    {
      key: 'matematik-2',
      name: 'Matematik (2. Kitap)',
      bookTitle: '9. Sınıf Matematik MEB 2. Kitap',
      icon: '📐',
      color: 'from-indigo-600 to-purple-600',
      badge: '88 Sayfa Çözüm',
      bookSlug: '2026-2027-meb-matematik-ders-kitabi-cevaplari-9-sinif-2-kitap',
      filterQuery: 'matematik',
      description: 'Üçgenler, açı-kenar bağıntıları, eşlik-benzerlik ve trigonometri temelleri.'
    },
    {
      key: 'fizik',
      name: 'Fizik',
      bookTitle: '9. Sınıf Fizik MEB Ders Kitabı',
      icon: '⚡',
      color: 'from-violet-600 to-indigo-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-fizik-ders-kitabi-cevaplari-9-sinif',
      filterQuery: 'fizik',
      description: 'Fizik bilimine giriş, madde ve özkütle, kuvvet ve hareket, enerji üniteleri.'
    },
    {
      key: 'kimya',
      name: 'Kimya',
      bookTitle: '9. Sınıf Kimya MEB Ders Kitabı',
      icon: '🧪',
      color: 'from-cyan-600 to-blue-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-kimya-ders-kitabi-cevaplari-9-sinif',
      filterQuery: 'kimya',
      description: 'Kimya bilimi, atom ve periyodik sistem, kimyasal türler arası etkileşimler.'
    },
    {
      key: 'biyoloji',
      name: 'Biyoloji',
      bookTitle: '9. Sınıf Biyoloji MEB Ders Kitabı',
      icon: '🧬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-biyoloji-ders-kitabi-cevaplari-9-sinif',
      filterQuery: 'biyoloji',
      description: 'Yaşam bilimi biyoloji, canlıların temel bileşenleri, hücre ve yapısı.'
    },
    {
      key: 'cografya',
      name: 'Coğrafya',
      bookTitle: '9. Sınıf Coğrafya MEB Kitabı',
      icon: '🌍',
      color: 'from-amber-600 to-orange-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-cografya-ders-kitabi-cevaplari-9-sinif',
      filterQuery: 'cografya',
      description: 'Doğa ve insan, coğrafi koordinat sistemi, harita bilgisi ve iklim elemanları.'
    },
    {
      key: 'ingilizce',
      name: 'İngilizce',
      bookTitle: '9. Sınıf İngilizce Çalışma Kitabı',
      icon: '🇬🇧',
      color: 'from-sky-600 to-blue-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-ingilizce-calisma-kitabi-cevaplari-9-sinif',
      filterQuery: 'ingilizce',
      description: 'Theme 1-10 tüm Workbook alıştırmaları, okuma parçaları ve gramer testleri.'
    }
  ],
  '10-sinif': [
    {
      key: 'matematik',
      name: 'Matematik',
      bookTitle: '10. Sınıf Matematik MEB Kitabı',
      icon: '📐',
      color: 'from-indigo-600 to-purple-600',
      badge: '180+ Sayfa',
      bookSlug: '10-sinif-matematik-ders-kitabi-cevaplari-meb',
      filterQuery: 'matematik',
      description: 'Sayma ve olasılık, fonksiyonlar, polinomlar, ikinci dereceden denklemler ve çokgenler.'
    },
    {
      key: 'fizik',
      name: 'Fizik',
      bookTitle: '10. Sınıf Fizik MEB Kitabı',
      icon: '⚡',
      color: 'from-violet-600 to-indigo-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-fizik-ders-kitabi-cevaplari-10-sinif',
      filterQuery: 'fizik',
      description: 'Elektrik ve manyetizma, basınç ve kaldırma kuvveti, dalgalar ve optik.'
    },
    {
      key: 'kimya',
      name: 'Kimya',
      bookTitle: '10. Sınıf Kimya MEB Kitabı',
      icon: '🧪',
      color: 'from-cyan-600 to-blue-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-kimya-ders-kitabi-cevaplari-10-sinif',
      filterQuery: 'kimya',
      description: 'Kimyanın temel kanunları, mol kavramı, kimyasal hesaplamalar, karışımlar ve asit-bazlar.'
    },
    {
      key: 'biyoloji',
      name: 'Biyoloji',
      bookTitle: '10. Sınıf Biyoloji MEB Kitabı',
      icon: '🧬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-biyoloji-ders-kitabi-cevaplari-10-sinif',
      filterQuery: 'biyoloji',
      description: 'Mitoz ve mayoz bölünme, kalıtımın genel ilkeleri ve ekosistem ekolojisi.'
    },
    {
      key: 'cografya',
      name: 'Coğrafya',
      bookTitle: '10. Sınıf Coğrafya MEB Kitabı',
      icon: '🌍',
      color: 'from-amber-600 to-orange-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-cografya-ders-kitabi-cevaplari-10-sinif',
      filterQuery: 'cografya',
      description: 'Dünya’nın tektonik yapısı, jeolojik zamanlar, iç ve dış kuvvetler, su-toprak-bitki.'
    },
    {
      key: 'ingilizce',
      name: 'İngilizce',
      bookTitle: '10. Sınıf İngilizce Çalışma Kitabı',
      icon: '🇬🇧',
      color: 'from-sky-600 to-blue-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-ingilizce-calisma-kitabi-cevaplari-10-sinif',
      filterQuery: 'ingilizce',
      description: 'School Life, Plans, Legendary Figures, Traditions and Travel çalışma sayfaları.'
    }
  ],
  '11-sinif': [
    {
      key: 'matematik',
      name: 'İleri Matematik',
      bookTitle: '11. Sınıf Matematik MEB Kitabı',
      icon: '📐',
      color: 'from-indigo-600 to-purple-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-matematik-ders-kitabi-cevaplari-11-sinif',
      filterQuery: 'matematik',
      description: 'Trigonometri, analitik geometri, fonksiyonlarda uygulamalar, denklem ve eşitsizlik sistemleri.'
    },
    {
      key: 'temel-matematik',
      name: 'Temel Matematik',
      bookTitle: '11. Sınıf Temel Matematik Kitabı',
      icon: '📐',
      color: 'from-blue-600 to-indigo-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-temel-matematik-ders-kitabi-cevaplari-11-sinif',
      filterQuery: 'temel matematik',
      description: 'Sayı kümeleri, bölünebilme kuralları, oran-orantı ve denklem çözümleri.'
    },
    {
      key: 'fizik',
      name: 'Fizik',
      bookTitle: '11. Sınıf Fizik MEB Kitabı',
      icon: '⚡',
      color: 'from-violet-600 to-indigo-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-fizik-ders-kitabi-cevaplari-11-sinif',
      filterQuery: 'fizik',
      description: 'Vektörler, iki boyutta sabit ivmeli hareket, Newton hareket yasaları, iş-enerji ve elektrik.'
    },
    {
      key: 'kimya',
      name: 'Kimya',
      bookTitle: '11. Sınıf Kimya MEB Kitabı',
      icon: '🧪',
      color: 'from-cyan-600 to-blue-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-kimya-ders-kitabi-cevaplari-11-sinif',
      filterQuery: 'kimya',
      description: 'Modern atom teorisi, gazlar, sıvı çözeltiler, kimyasal tepkimelerde enerji ve hız, denge.'
    },
    {
      key: 'biyoloji',
      name: 'Biyoloji',
      bookTitle: '11. Sınıf Biyoloji MEB Kitabı',
      icon: '🧬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-biyoloji-ders-kitabi-cevaplari-11-sinif',
      filterQuery: 'biyoloji',
      description: 'İnsan fizyolojisi (sinir, endokrin, duyu, destek-hareket, dolaşım vb.) ve komünite ekolojisi.'
    },
    {
      key: 'cografya',
      name: 'Coğrafya',
      bookTitle: '11. Sınıf Coğrafya MEB Kitabı',
      icon: '🌍',
      color: 'from-amber-600 to-orange-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-cografya-ders-kitabi-cevaplari-11-sinif',
      filterQuery: 'cografya',
      description: 'Biyoçeşitlilik, madde döngüleri, nüfus politikaları, şehirlerin fonksiyonları ve ekonomik faaliyetler.'
    }
  ],
  '12-sinif': [
    {
      key: 'matematik',
      name: 'YKS Matematik',
      bookTitle: '12. Sınıf Matematik MEB Kitabı (AYT)',
      icon: '📐',
      color: 'from-indigo-600 to-purple-600',
      badge: 'AYT & YKS 2026-2027',
      bookSlug: '2026-2027-meb-12-sinif-matematik-ders-kitabi-cevaplari',
      filterQuery: 'matematik',
      description: 'Logaritma, diziler, trigonometri yarım açı, türev, integral ve çemberin analitiği.'
    },
    {
      key: 'fizik',
      name: 'YKS Fizik',
      bookTitle: '12. Sınıf Fizik MEB Kitabı (AYT)',
      icon: '⚡',
      color: 'from-violet-600 to-indigo-600',
      badge: 'AYT & YKS 2026-2027',
      bookSlug: '2026-2027-meb-12-sinif-fizik-ders-kitabi-cevaplari',
      filterQuery: 'fizik',
      description: 'Çembersel hareket, harmonik hareket, dalga mekaniği, atom fiziği ve modern fizik.'
    },
    {
      key: 'kimya',
      name: 'YKS Kimya',
      bookTitle: '12. Sınıf Kimya MEB Kitabı (AYT)',
      icon: '🧪',
      color: 'from-cyan-600 to-blue-600',
      badge: 'AYT & YKS 2026-2027',
      bookSlug: '2026-2027-meb-12-sinif-kimya-ders-kitabi-cevaplari',
      filterQuery: 'kimya',
      description: 'Kimya ve elektrik (piller, elektroliz), karbon kimyasına giriş ve organik kimya bileşikleri.'
    },
    {
      key: 'biyoloji',
      name: 'YKS Biyoloji',
      bookTitle: '12. Sınıf Biyoloji MEB Kitabı (AYT)',
      icon: '🧬',
      color: 'from-emerald-600 to-teal-600',
      badge: 'AYT & YKS 2026-2027',
      bookSlug: '2026-2027-meb-12-sinif-biyoloji-ders-kitabi-cevaplari',
      filterQuery: 'biyoloji',
      description: 'Genden proteine (DNA, RNA, protein sentezi), fotosentez, solunum ve bitki biyolojisi.'
    },
    {
      key: 'edebiyat',
      name: 'Türk Dili ve Edebiyatı',
      bookTitle: '12. Sınıf Edebiyat MEB Kitabı',
      icon: '📚',
      color: 'from-rose-600 to-pink-600',
      badge: 'MEB Yayınları',
      bookSlug: '2026-2027-meb-12-sinif-turk-dili-ve-edebiyati-ders-kitabi-cevaplari',
      filterQuery: 'edebiyat',
      description: 'Cumhuriyet dönemi Türk şiiri, romanı, tiyatrosu ve deneme-söylev metin tahlilleri.'
    }
  ]
};

interface GradeSubjectSolutionsProps {
  gradeSlug: string;
  categoryName: string;
  currentDers?: string;
  totalPosts: number;
}

export default function GradeSubjectSolutions({
  gradeSlug,
  categoryName,
  currentDers,
  totalPosts
}: GradeSubjectSolutionsProps) {
  const subjects = GRADE_SUBJECTS_MAP[gradeSlug];

  // If this category is not one of 1-sinif ... 12-sinif, do not render
  if (!subjects || subjects.length === 0) {
    return null;
  }

  const activeSubject = subjects.find(
    (s) => s.filterQuery.toLowerCase() === currentDers?.toLowerCase()
  );

  return (
    <div className="space-y-6">
      {/* Main Showcase Container */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                2026 - 2027 GÜNCEL
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                {categoryName} MEB KİTAP ÇÖZÜMLERİ
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              {categoryName} Ders Ders Kitap Çözümleri
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Aşağıdaki derslerden dilediğinizi seçerek MEB ders ve çalışma kitabı sayfa çözümlerine, alıştırma cevaplarına ve ünite değerlendirmelerine anında ulaşabilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
            <Link
              href="/kategori/meb-ders-kitabi-cevaplari"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-indigo-200 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Tüm Sınıflar &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Ders Ders Kitap Çözüm Butonları / Kartları Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => {
            const hasBook = Boolean(subject.bookSlug);
            const bookHref = hasBook ? `/post/${subject.bookSlug}` : `/kategori/${gradeSlug}?ders=${subject.filterQuery}`;
            const isFilterActive = currentDers?.toLowerCase() === subject.filterQuery.toLowerCase();

            return (
              <div
                key={subject.key}
                className={`bg-white/5 hover:bg-white/[0.08] rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group ${
                  isFilterActive ? 'border-indigo-400 ring-2 ring-indigo-500/30 bg-white/[0.09]' : 'border-white/10 hover:border-indigo-400/40'
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">
                        {subject.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-wide group-hover:text-indigo-200 transition-colors">
                          {subject.name}
                        </h3>
                        <div className="text-[11px] text-slate-300 truncate max-w-[180px]">
                          {subject.bookTitle}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/25 whitespace-nowrap">
                      {subject.badge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {subject.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <Link
                    href={bookHref}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-950/40 transition-all group/btn"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-indigo-200" />
                      Kitap Çözümlerini Aç
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/kategori/${gradeSlug}?ders=${subject.filterQuery}`}
                    className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                      isFilterActive
                        ? 'bg-indigo-400/20 text-indigo-200 border border-indigo-400/30'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>Yazıları &amp; Testleri Listele</span>
                    <span className="text-indigo-400">&darr;</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ders Hızlı Filtreleme Sekmeleri (Filter Pills Bar) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Derse Göre İçerikleri Filtrele:</span>
          </div>

          {currentDers && (
            <Link
              href={`/kategori/${gradeSlug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline"
            >
              <X className="w-3.5 h-3.5" />
              Filtreyi Temizle (Tümünü Göster)
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <Link
            href={`/kategori/${gradeSlug}`}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              !currentDers
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Tüm {categoryName} İçerikleri ({totalPosts})
          </Link>

          {subjects.map((sub) => {
            const isSelected = currentDers?.toLowerCase() === sub.filterQuery.toLowerCase();
            return (
              <Link
                key={sub.key}
                href={`/kategori/${gradeSlug}?ders=${sub.filterQuery}`}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
              </Link>
            );
          })}
        </div>

        {activeSubject && (
          <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5 border-t border-slate-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Şu anda sadece <strong>{activeSubject.name}</strong> dersine ait yazılar ve MEB çözümleri listelenmektedir.</span>
          </div>
        )}
      </div>
    </div>
  );
}
