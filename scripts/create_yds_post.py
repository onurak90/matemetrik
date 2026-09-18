import sqlite3
import json
import datetime

def main():
    conn = sqlite3.connect('data/matemetrik.db')
    cur = conn.cursor()

    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    faq_items = [
        {
            'question': 'YDS çıkmış soruları nereden ve nasıl indirebilirim?',
            'answer': 'YDS çıkmış soru kitapçıkları ÖSYM resmî web sitesi (osym.gov.tr ve dokuman.osym.gov.tr) üzerinden yayımlanmaktadır. Sayfamızdaki butonlar aracılığıyla 2013-2025 yılları arasındaki tüm İlkbahar, Sonbahar ve e-YDS resmî PDF kitapçıklarına doğrudan ve reklamsız olarak erişebilirsiniz.'
        },
        {
            'question': 'YDS\'de toplam kaç soru var ve sınav süresi ne kadardır?',
            'answer': 'YDS (Yabancı Dil Bilgisi Seviye Tespit Sınavı) toplam 80 çoktan seçmeli sorudan oluşur. Sınav süresi 180 dakikadır (3 saat). Sınavda yanlış cevaplar doğru cevapları götürmez (net hesabı yapılmaz; her doğru soru 1.25 puan değerindedir).'
        },
        {
            'question': 'YDS puan baremleri ve seviyeleri nelerdir?',
            'answer': 'YDS puan baremleri: 90-100 puan arası A Seviyesi, 80-89 puan arası B Seviyesi, 70-79 puan arası C Seviyesi, 60-69 puan arası D Seviyesi, 50-59 puan arası E Seviyesidir. Akademik kadro başvurularında genellikle en az 65 veya 70 puan şartı aranır.'
        },
        {
            'question': 'e-YDS ile basılı YDS sorularının zorluğu aynı mıdır?',
            'answer': 'Evet. e-YDS ile basılı YDS sınavları aynı soru havuzundan ve eşdeğer zorluk standartlarına göre hazırlanır. Her iki sınavın geçerliliği ve puan karşılığı tamamen eşittir.'
        },
        {
            'question': 'YDS çıkmış soruları çözmek puanı ne kadar artırır?',
            'answer': 'ÖSYM\'nin soru hazırlama metodolojisi belirli akademik kelime aileleri ve kalıplar üzerine kuruludur. Son 5-10 yılın çıkmış sorularını analiz ederek, bilmediğiniz kelimeleri ve bağlaçları çıkararak çözmek sınav puanınızı ortalama 15-25 puan artırmaktadır.'
        },
        {
            'question': 'YDS puanı kaç yıl geçerlidir?',
            'answer': 'ÖSYM mevzuatına göre YDS sonuçları sınav tarihinden itibaren 5 yıl süreyle geçerlidir. Ancak bazı kurumlar ve üniversiteler kendi mevzuatlarında daha kısa bir süre (2 veya 3 yıl) talep edebilir.'
        }
    ]

    faq_schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': item['question'],
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': item['answer']
                }
            } for item in faq_items
        ]
    }

    faq_script = f'<script type="application/ld+json">{json.dumps(faq_schema, ensure_ascii=False)}</script>'

    years_data = [
        {
            'year': '2025',
            'badge': 'En Son Sınavlar',
            'color': 'emerald',
            'desc': 'ÖSYM tarafından uygulanan en güncel 2025 YDS temel soru kitapçıkları.',
            'sessions': [
                {'name': '2025 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2025/YDS-1/TSK/ing_yd1d09032025.pdf', 'theme': 'emerald'},
                {'name': '2025 Temmuz YDS', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2025/YDS-INGILIZCE/yds_ing_kitapcik05072025.pdf', 'theme': 'teal'}
            ]
        },
        {
            'year': '2024',
            'badge': '2024 Arşivi',
            'color': 'indigo',
            'desc': '2024 İlkbahar (Mart) ve Sonbahar (Kasım) oturumları soru kitapçıkları.',
            'sessions': [
                {'name': '2024 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2024/YDS-1/ing_ydd24032024.pdf', 'theme': 'indigo'},
                {'name': '2024 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2024/YDS-2/ingilizce_tskpd03112024.pdf', 'theme': 'blue'}
            ]
        },
        {
            'year': '2023',
            'badge': '2023 Arşivi',
            'color': 'blue',
            'desc': '2023 YDS/1 (Nisan) ve 2023 YDS/2 (Ekim) resmî temel soru kitapçıkları.',
            'sessions': [
                {'name': '2023 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2023/YDS-1/ingilizce09042023.pdf', 'theme': 'blue'},
                {'name': '2023 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2023/YDS-2/ingilizce_tsk_22102023.pdf', 'theme': 'cyan'}
            ]
        },
        {
            'year': '2022',
            'badge': '2022 Arşivi',
            'color': 'slate',
            'desc': '2022 İlkbahar ve Sonbahar YDS İngilizce soru kitapçığı dökümanları.',
            'sessions': [
                {'name': '2022 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2022/YDS-1/yds1_ingilizce_tsk_10042022.pdf', 'theme': 'slate'},
                {'name': '2022 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2022/YDS-2/ingilizce_tsk_23102022.pdf', 'theme': 'slate'}
            ]
        },
        {
            'year': '2021',
            'badge': '2021 Arşivi',
            'color': 'slate',
            'desc': '2021 YDS/1 ve YDS/2 oturumları soru ve cevap anahtarları.',
            'sessions': [
                {'name': '2021 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2021/YDS-1/CS/YDS1_ingilizce.pdf', 'theme': 'slate'},
                {'name': '2021 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2021/YDS-2/CS/YDS2_ingilizce.pdf', 'theme': 'slate'}
            ]
        },
        {
            'year': '2020',
            'badge': '2020 Arşivi',
            'color': 'amber',
            'desc': '2020 Eylül ayında uygulanan YDS oturumu soru kitapçığı.',
            'sessions': [
                {'name': '2020 YDS Soru Kitapçığı', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2020/YDS-1/CS/YDS1_ingilizce.pdf', 'theme': 'amber'}
            ]
        },
        {
            'year': '2019',
            'badge': '3 Oturum',
            'color': 'teal',
            'desc': '2019 İlkbahar, Sonbahar ve Kış (Aralık) 3 farklı YDS kitapçığı.',
            'sessions': [
                {'name': '2019 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2019/YDS-1/CS/YDS1_ingilizce.pdf', 'theme': 'teal'},
                {'name': '2019 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2019/YDS-2/CS/YDS2_ingilizce.pdf', 'theme': 'emerald'},
                {'name': '2019 Aralık (YDS/3)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2019/YDS-3/CS/YDS3_kitapcik.pdf', 'theme': 'cyan'}
            ]
        },
        {
            'year': '2018',
            'badge': '3 Oturum',
            'color': 'teal',
            'desc': '2018 İlkbahar, Sonbahar ve Aralık YDS sınav kitapçıkları.',
            'sessions': [
                {'name': '2018 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2018/YDSILKBAHAR/CS/ING24072018.pdf', 'theme': 'teal'},
                {'name': '2018 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2018/YDSSONBAHAR/CS/yds_sonbahar_ingilizce12112019.pdf', 'theme': 'emerald'},
                {'name': '2018 Aralık (YDS/3)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2018/YDS-3/yds3_ingilizce12112019.pdf', 'theme': 'cyan'}
            ]
        },
        {
            'year': '2017',
            'badge': '2017 Arşivi',
            'color': 'slate',
            'desc': '2017 İlkbahar ve Sonbahar YDS resmî soru dökümanları.',
            'sessions': [
                {'name': '2017 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2017/YDSILKBAHAR/2017_YDS_Ilkbahar_Ingilizce.pdf', 'theme': 'slate'},
                {'name': '2017 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2017/YDSSONBAHAR/2017_YDS_Sonbahar_Ingilizce.pdf', 'theme': 'slate'}
            ]
        },
        {
            'year': '2016',
            'badge': '2016 Arşivi',
            'color': 'slate',
            'desc': '2016 İlkbahar ve Sonbahar YDS sınav kitapçıkları.',
            'sessions': [
                {'name': '2016 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2016/YDSILKBAHAR/2016_YDS_ILKBAHAR_INGILIZCE.pdf', 'theme': 'slate'},
                {'name': '2016 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2016/YDSSONBAHAR/2016_YDS_Sonbahar_Ingilizce.pdf', 'theme': 'slate'}
            ]
        },
        {
            'year': '2015',
            'badge': '2015 Arşivi',
            'color': 'slate',
            'desc': '2015 İlkbahar ve Sonbahar YDS soru ve cevap anahtarları.',
            'sessions': [
                {'name': '2015 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2015/YDSILKBAHAR/2015_YDS_ILKBAHAR_INGILIZCE.pdf', 'theme': 'slate'},
                {'name': '2015 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2015/YDSSONBAHAR/2015_YDS_SONBAHAR_INGILIZCE.pdf', 'theme': 'slate'}
            ]
        },
        {
            'year': '2014',
            'badge': '2014 Arşivi',
            'color': 'slate',
            'desc': '2014 İlkbahar ve Sonbahar YDS temel soru kitapçıkları.',
            'sessions': [
                {'name': '2014 İlkbahar (YDS/1)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2014/YDS/2014_YDS_ILKBAHAR_INGILIZCE.pdf', 'theme': 'slate'},
                {'name': '2014 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2014/YDS/sonbahar/2014_YDS_SONBAHAR_INGILIZCE.pdf', 'theme': 'slate'}
            ]
        },
        {
            'year': '2013',
            'badge': 'İlk YDS',
            'color': 'slate',
            'desc': '2013 İlkbahar ve Sonbahar dönemi ilk YDS soru kitapçıkları.',
            'sessions': [
                {'name': '2013 İlkbahar (YDS/1)', 'url': 'https://www.osym.gov.tr/Eklenti/2434,ingilizcepdf.pdf?0', 'theme': 'slate'},
                {'name': '2013 Sonbahar (YDS/2)', 'url': 'https://dokuman.osym.gov.tr/pdfdokuman/2013/YDS/SONBAHAR/2013_YDS_SONBAHAR_INGILIZCE.pdf', 'theme': 'slate'}
            ]
        }
    ]

    def render_button(sess):
        theme_classes = {
            'emerald': 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-700/25',
            'teal': 'from-teal-600 to-cyan-700 hover:from-teal-500 hover:to-cyan-600 text-white shadow-teal-700/25',
            'indigo': 'from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-700/25',
            'blue': 'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-700/25',
            'cyan': 'from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-700/25',
            'amber': 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-700/25',
            'slate': 'from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white shadow-slate-900/20'
        }
        btn_cls = theme_classes.get(sess.get('theme', 'slate'), theme_classes['slate'])
        return f'''
        <a
          href="{sess['url']}"
          target="_blank"
          rel="noopener noreferrer"
          class="group/btn flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r {btn_cls} font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/10"
        >
          <div class="flex items-center gap-2.5 min-w-0 pr-2">
            <span class="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover/btn:rotate-6 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </span>
            <span class="truncate">{sess['name']}</span>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-white/20 text-[11px] font-black uppercase tracking-wider text-white border border-white/25 shrink-0 flex items-center gap-1">
            <span>PDF</span>
            <span class="text-[10px] opacity-80">&rarr;</span>
          </span>
        </a>
        '''

    cards_html = []
    for item in years_data:
        buttons = ''.join([render_button(s) for s in item['sessions']])
        badge_bg = 'bg-emerald-100 text-emerald-800 border-emerald-200' if item['color'] == 'emerald' else ('bg-indigo-100 text-indigo-800 border-indigo-200' if item['color'] == 'indigo' else 'bg-slate-100 text-slate-700 border-slate-200')
        card = f'''
      <div class="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-white to-slate-50/80 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-400/80 transition-all duration-300 flex flex-col justify-between space-y-4 group">
        <div class="space-y-2">
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-teal-500 group-hover:scale-125 transition-transform"></span>
              <span class="text-xl font-black text-slate-900 group-hover:text-teal-700 transition-colors">{item['year']} YDS Soruları</span>
            </div>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full font-bold border {badge_bg}">
              {item['badge']}
            </span>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">
            {item['desc']}
          </p>
        </div>

        <div class="flex flex-col gap-2.5 pt-1">
          {buttons}
        </div>
      </div>
        '''
        cards_html.append(card)

    years_grid = f'''
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-8 not-prose">
    {''.join(cards_html)}
    </div>
    '''

    other_exams_html = '''
    <div class="my-10 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl not-prose space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span class="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
            ÖSYM DİĞER AKADEMİK &amp; DİL SINAVLARI
          </span>
          <h3 class="text-xl font-black text-white mt-1">
            İlgili Diğer Çıkmış Sınav Soru Kitapçıkları
          </h3>
        </div>
        <span class="text-xs text-slate-400">ÖSYM Resmî Arşiv Bağlantıları</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="p-3 rounded-2xl bg-white/5 hover:bg-teal-600 border border-white/10 hover:border-teal-400 text-center transition-all group">
          <div class="text-xs font-black text-white">YÖKDİL</div>
          <div class="text-[11px] text-slate-400 group-hover:text-teal-100">Çıkmış Sorular &rarr;</div>
        </a>
        <a href="/kategori/ales" class="p-3 rounded-2xl bg-white/5 hover:bg-violet-600 border border-white/10 hover:border-violet-400 text-center transition-all group">
          <div class="text-xs font-black text-white">ALES</div>
          <div class="text-[11px] text-slate-400 group-hover:text-violet-100">Sayısal &amp; Sözel &rarr;</div>
        </a>
        <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="p-3 rounded-2xl bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-400 text-center transition-all group">
          <div class="text-xs font-black text-white">KPDS / ÜDS</div>
          <div class="text-[11px] text-slate-400 group-hover:text-blue-100">Eski Arşiv &rarr;</div>
        </a>
        <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="p-3 rounded-2xl bg-white/5 hover:bg-emerald-600 border border-white/10 hover:border-emerald-400 text-center transition-all group">
          <div class="text-xs font-black text-white">DGS</div>
          <div class="text-[11px] text-slate-400 group-hover:text-emerald-100">Çıkmış Sorular &rarr;</div>
        </a>
        <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" class="p-3 rounded-2xl bg-white/5 hover:bg-rose-600 border border-white/10 hover:border-rose-400 text-center transition-all group">
          <div class="text-xs font-black text-white">TUS / DUS</div>
          <div class="text-[11px] text-slate-400 group-hover:text-rose-100">Tıp &amp; Diş &rarr;</div>
        </a>
        <a href="/sinav-hazirlama-robotu" class="p-3 rounded-2xl bg-teal-500/20 hover:bg-teal-600 border border-teal-400/30 text-center transition-all group">
          <div class="text-xs font-black text-teal-300 group-hover:text-white">Sınav Robotu</div>
          <div class="text-[11px] text-teal-200/70 group-hover:text-white">Yazılı Hazırla &rarr;</div>
        </a>
      </div>
    </div>
    '''

    table_breakdown_html = '''
    <h2>YDS Soru Dağılımı ve Soru Tipleri Tablosu (80 Soru)</h2>
    <p>
      YDS sınavında başarıya ulaşmak için hangi soru tipinden kaç soru geldiğini bilmek ve stratejinizi bu ağırlıklara göre belirlemek şarttır:
    </p>

    <div class="overflow-x-auto my-6 not-prose">
      <table class="min-w-full divide-y divide-slate-200 rounded-2xl overflow-hidden border border-slate-200 bg-white text-left text-sm shadow-sm">
        <thead class="bg-slate-900 text-white">
          <tr>
            <th class="py-3.5 px-4 font-bold">Soru Numaraları</th>
            <th class="py-3.5 px-4 font-bold">Soru Tipi / Bölüm</th>
            <th class="py-3.5 px-4 font-bold">Soru Sayısı</th>
            <th class="py-3.5 px-4 font-bold">Önerilen Süre</th>
            <th class="py-3.5 px-4 font-bold">Kritik Çözüm Stratejisi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-700">
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">1 - 6</td>
            <td class="py-3 px-4 font-medium text-slate-900">Kelime Bilgisi (Vocabulary)</td>
            <td class="py-3 px-4 font-bold">6 Soru</td>
            <td class="py-3 px-4">8 - 10 Dk.</td>
            <td class="py-3 px-4 text-xs">İsim, sıfat, zarf, fiil ve phrasal verb kökleri taranır; bağlam ipucu aranır.</td>
          </tr>
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">7 - 16</td>
            <td class="py-3 px-4 font-medium text-slate-900">Gramer &amp; Edatlar (Tense, Preposition, Conjunction)</td>
            <td class="py-3 px-4 font-bold">10 Soru</td>
            <td class="py-3 px-4">12 - 15 Dk.</td>
            <td class="py-3 px-4 text-xs">Zaman uyumu, zıtlık/sebep bağlaçları ve fiil-edat (dependent prep) kombinasyonları.</td>
          </tr>
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">17 - 26</td>
            <td class="py-3 px-4 font-medium text-slate-900">Cloze Test (2 Farklı Paragraf)</td>
            <td class="py-3 px-4 font-bold">10 Soru (2 x 5)</td>
            <td class="py-3 px-4">15 - 18 Dk.</td>
            <td class="py-3 px-4 text-xs">Metnin ana fikrini yakalayıp boşluktan önceki ve sonraki bağlaç ve kelimeler incelenir.</td>
          </tr>
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">27 - 36</td>
            <td class="py-3 px-4 font-medium text-slate-900">Cümle Tamamlama (Sentence Completion)</td>
            <td class="py-3 px-4 font-bold">10 Soru</td>
            <td class="py-3 px-4">20 - 25 Dk.</td>
            <td class="py-3 px-4 text-xs">Özne-zamir referansı ve neden-sonuç / zıtlık mantık ilişkisine bakılır.</td>
          </tr>
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">37 - 42</td>
            <td class="py-3 px-4 font-medium text-slate-900">Çeviri Soruları (İng-Tür &amp; Tür-İng)</td>
            <td class="py-3 px-4 font-bold">6 Soru (3 + 3)</td>
            <td class="py-3 px-4">8 - 10 Dk.</td>
            <td class="py-3 px-4 text-xs">Temel cümlenin <strong>yüklemini ve asıl öznesini</strong> belirlemek şıkları 2 saniyede eler.</td>
          </tr>
          <tr class="hover:bg-slate-50/80 bg-teal-50/30">
            <td class="py-3 px-4 font-mono font-bold text-teal-700">43 - 62</td>
            <td class="py-3 px-4 font-bold text-slate-900">Paragraf Okuma (Reading Comprehension)</td>
            <td class="py-3 px-4 font-black text-teal-800">20 Soru (5 x 4)</td>
            <td class="py-3 px-4 font-bold">50 - 60 Dk.</td>
            <td class="py-3 px-4 text-xs">Önce soru kökleri okunur; ana fikir, çıkarım ve metinde geçen doğrudan bilgiler taranır.</td>
          </tr>
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">63 - 67</td>
            <td class="py-3 px-4 font-medium text-slate-900">Diyalog Tamamlama</td>
            <td class="py-3 px-4 font-bold">5 Soru</td>
            <td class="py-3 px-4">8 - 10 Dk.</td>
            <td class="py-3 px-4 text-xs">Boşluktan bir önceki ve hemen sonraki cümlenin duygu ve mantık tutarlılığı incelenir.</td>
          </tr>
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">68 - 71</td>
            <td class="py-3 px-4 font-medium text-slate-900">Anlamca En Yakın Cümle (Restatement)</td>
            <td class="py-3 px-4 font-bold">4 Soru</td>
            <td class="py-3 px-4">8 - 10 Dk.</td>
            <td class="py-3 px-4 text-xs">Orijinal cümledeki miktar belirteçleri (only, all, hardly) ve koşul yapıları eşleştirilir.</td>
          </tr>
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">72 - 75</td>
            <td class="py-3 px-4 font-medium text-slate-900">Verilen Duruma Uygun İfade (Situation)</td>
            <td class="py-3 px-4 font-bold">4 Soru</td>
            <td class="py-3 px-4">6 - 8 Dk.</td>
            <td class="py-3 px-4 text-xs">Kişinin konumu, karşısındakine duyduğu nezaket/resmiyet veya tepki derecesi test edilir.</td>
          </tr>
          <tr class="hover:bg-slate-50/80">
            <td class="py-3 px-4 font-mono font-bold text-teal-600">76 - 80</td>
            <td class="py-3 px-4 font-medium text-slate-900">Anlatım Bütünlüğünü Bozan Cümle (Irrelevant)</td>
            <td class="py-3 px-4 font-bold">5 Soru</td>
            <td class="py-3 px-4">8 - 10 Dk.</td>
            <td class="py-3 px-4 text-xs">Paragrafın genel akışından sapan, fazla özele inen ya da konu dışı olan cümle tespit edilir.</td>
          </tr>
          <tr class="bg-slate-100 font-black text-slate-900">
            <td class="py-3.5 px-4 font-mono">1 - 80</td>
            <td class="py-3.5 px-4">TOPLAM YDS SINAVI</td>
            <td class="py-3.5 px-4 text-teal-700">80 Soru</td>
            <td class="py-3.5 px-4">180 Dakika</td>
            <td class="py-3.5 px-4 text-xs">Her doğru soru 1.25 puandır; yanlış doğruyu götürmez.</td>
          </tr>
        </tbody>
      </table>
    </div>
    '''

    faq_accordion_html = '''
    <h2>YDS Çıkmış Sorular Hakkında Sıkça Sorulan Sorular (SSS)</h2>
    <div class="space-y-4 my-8 not-prose">
    '''
    for idx, f in enumerate(faq_items, 1):
        faq_accordion_html += f'''
      <details class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm group">
        <summary class="font-bold text-slate-900 cursor-pointer flex items-center justify-between text-base group-open:text-teal-600 transition-colors list-none">
          <span class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-xs font-black shrink-0">?</span>
            {f['question']}
          </span>
          <span class="text-slate-400 group-open:rotate-180 transition-transform font-bold text-lg">&darr;</span>
        </summary>
        <div class="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed pl-9">
          {f['answer']}
        </div>
      </details>
        '''
    faq_accordion_html += '</div>'

    disclaimer_html = '''
    <div class="my-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 flex items-start gap-3 not-prose shadow-sm">
      <span class="text-2xl shrink-0">⚠️</span>
      <div class="text-xs sm:text-sm leading-relaxed">
        <strong class="font-bold text-amber-900">Yasal ve Eğitsel Bilgilendirme:</strong> Bu sayfada yer alan tüm YDS ve yabancı dil sınavı soru kitapçıkları ile cevap anahtarları bağlantıları, ÖSYM (Ölçme, Seçme ve Yerleştirme Merkezi) tarafından kamuya açık olarak yayımlanan resmî belgelerdir. Bağlantılar doğrudan ÖSYM sunucularındaki orijinal PDF dökümanlarına yönlendirmekte olup yalnızca öğrencilerin ve adayların seviyelerini belirleme, çıkmış soruları karşılaştırma ve sınav formatını öğrenme amacıyla derlenmiştir.
      </div>
    </div>
    '''

    full_html = f'''{faq_script}
    <p class="lead text-lg text-slate-700 leading-relaxed font-medium">
      <strong>Yabancı Dil Bilgisi Seviye Tespit Sınavı (YDS)</strong> ve elektronik ortamda uygulanan <strong>e-YDS</strong>, akademik kariyer hedefleyen lisansüstü adayları, doçent adayları, TUS/DUS hekimleri ve kamu personeli için en kritik dil yeterlilik ölçütüdür. ÖSYM sınav mantığını kavramanın, soru tiplerine aşina olmanın ve hedeflediğiniz (70+, 80+, 90+) puana ulaşmanın en kesin yolu <strong>YDS çıkmış sorularını detaylı analiz ederek çözmektir</strong>.
    </p>

    {disclaimer_html}

    <!-- HIGHLIGHT ALERT CARD -->
    <div class="p-6 sm:p-8 my-8 rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-indigo-950 text-white shadow-xl not-prose">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-2 max-w-2xl">
          <span class="inline-block px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 text-xs font-black uppercase tracking-wider border border-teal-400/30">
            ÖSYM Resmî Doküman Havuzu
          </span>
          <h3 class="text-xl sm:text-2xl font-black text-white">
            Tüm Yılların YDS Çıkmış Soru Kitapçıkları (Orijinal PDF)
          </h3>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Aşağıdaki listeden dilediğiniz yılı ve sınav oturumunu seçerek doğrudan ÖSYM sunucularındaki orijinal PDF soru kitapçığını tek tıkla görüntüleyebilir ve indirebilirsiniz.
          </p>
        </div>
        <div class="px-5 py-3 rounded-2xl bg-white/10 border border-white/15 text-center shrink-0 self-start sm:self-center">
          <div class="text-xs text-teal-300 font-bold uppercase">Sınav Sayısı</div>
          <div class="text-2xl font-black text-white">27+ Kitapçık</div>
        </div>
      </div>
    </div>

    <h2>Yıllara Göre YDS Çıkmış Sorular ve Temel Soru Kitapçıkları (PDF)</h2>
    <p>
      Aşağıdaki modern buton paneli üzerinden 2025'ten 2013'e kadar tüm İlkbahar, Sonbahar ve kış oturumlarına ait ÖSYM dökümanlarına doğrudan erişebilirsiniz:
    </p>

    {years_grid}

    {other_exams_html}

    {table_breakdown_html}

    {faq_accordion_html}
    '''

    cur.execute("""
        UPDATE posts 
        SET content = ?, updated_at = ? 
        WHERE slug = 'yds-cikmis-sorular-ve-cevap-anahtarlari-pdf-indir'
    """, (full_html, now))

    conn.commit()
    cur.execute('PRAGMA wal_checkpoint(TRUNCATE);')
    conn.close()
    print('Updated scripts/create_yds_post.py and database successfully!')

if __name__ == '__main__':
    main()
