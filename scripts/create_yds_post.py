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

    theme_styles = {
        'emerald': {
            'bg': 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
            'shadow': '0 4px 14px rgba(5, 150, 105, 0.35)',
            'border': 'rgba(255, 255, 255, 0.25)',
            'badge_bg': '#d1fae5',
            'badge_text': '#065f46',
            'badge_border': '#a7f3d0'
        },
        'teal': {
            'bg': 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
            'shadow': '0 4px 14px rgba(13, 148, 136, 0.35)',
            'border': 'rgba(255, 255, 255, 0.25)',
            'badge_bg': '#ccfbf1',
            'badge_text': '#115e59',
            'badge_border': '#99f6e4'
        },
        'indigo': {
            'bg': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            'shadow': '0 4px 14px rgba(79, 70, 229, 0.35)',
            'border': 'rgba(255, 255, 255, 0.25)',
            'badge_bg': '#e0e7ff',
            'badge_text': '#3730a3',
            'badge_border': '#c7d2fe'
        },
        'blue': {
            'bg': 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
            'shadow': '0 4px 14px rgba(37, 99, 235, 0.35)',
            'border': 'rgba(255, 255, 255, 0.25)',
            'badge_bg': '#dbeafe',
            'badge_text': '#1e40af',
            'badge_border': '#bfdbfe'
        },
        'cyan': {
            'bg': 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
            'shadow': '0 4px 14px rgba(2, 132, 199, 0.35)',
            'border': 'rgba(255, 255, 255, 0.25)',
            'badge_bg': '#cffafe',
            'badge_text': '#155e75',
            'badge_border': '#a5f3fc'
        },
        'amber': {
            'bg': 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
            'shadow': '0 4px 14px rgba(217, 119, 6, 0.35)',
            'border': 'rgba(255, 255, 255, 0.25)',
            'badge_bg': '#fef3c7',
            'badge_text': '#92400e',
            'badge_border': '#fde68a'
        },
        'slate': {
            'bg': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            'shadow': '0 4px 14px rgba(15, 23, 42, 0.35)',
            'border': 'rgba(255, 255, 255, 0.2)',
            'badge_bg': '#f1f5f9',
            'badge_text': '#334155',
            'badge_border': '#cbd5e1'
        }
    }

    def render_button(sess):
        thm = theme_styles.get(sess.get('theme', 'slate'), theme_styles['slate'])
        return f'''
        <a
          href="{sess['url']}"
          target="_blank"
          rel="noopener noreferrer"
          style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; margin-bottom: 8px; border-radius: 14px; background: {thm['bg']}; color: #ffffff !important; text-decoration: none !important; font-weight: 700; font-size: 13.5px; box-shadow: {thm['shadow']}; border: 1px solid {thm['border']}; transition: transform 0.15s ease;"
        >
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
            <span style="width: 32px; height: 32px; border-radius: 10px; background: rgba(255, 255, 255, 0.22); display: flex; align-items: center; justify-content: center; color: #ffffff; flex-shrink: 0;">
              <svg style="width: 17px; height: 17px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </span>
            <span style="color: #ffffff !important; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{sess['name']}</span>
          </div>
          <span style="padding: 4px 10px; border-radius: 8px; background: rgba(255, 255, 255, 0.25); font-size: 11px; font-weight: 900; color: #ffffff !important; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid rgba(255, 255, 255, 0.35); flex-shrink: 0; display: flex; align-items: center; gap: 4px;">
            <span style="color: #ffffff !important;">PDF</span>
            <span style="font-size: 10px; color: #ffffff !important;">&rarr;</span>
          </span>
        </a>
        '''

    cards_html = []
    for item in years_data:
        buttons = ''.join([render_button(s) for s in item['sessions']])
        thm = theme_styles.get(item.get('color', 'slate'), theme_styles['slate'])
        card = f'''
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.04); display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 12px;">
        <div style="margin-bottom: 14px;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid #f1f5f9; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #0d9488;"></span>
              <span style="font-size: 18px; font-weight: 900; color: #0f172a;">{item['year']} YDS Soruları</span>
            </div>
            <span style="font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 20px; background: {thm['badge_bg']}; color: {thm['badge_text']}; border: 1px solid {thm['badge_border']};">
              {item['badge']}
            </span>
          </div>
          <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin: 0;">
            {item['desc']}
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          {buttons}
        </div>
      </div>
        '''
        cards_html.append(card)

    years_grid = f'''
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 24px 0;" class="not-prose">
    {''.join(cards_html)}
    </div>
    '''

    other_exams_html = '''
    <div style="margin: 32px 0; padding: 24px; border-radius: 24px; background: #0f172a; color: #ffffff; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);" class="not-prose">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
        <div>
          <span style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 20px; background: rgba(20, 184, 166, 0.2); color: #2dd4bf; border: 1px solid rgba(20, 184, 166, 0.4);">
            ÖSYM DİĞER AKADEMİK &amp; DİL SINAVLARI
          </span>
          <h3 style="font-size: 19px; font-weight: 900; color: #ffffff; margin: 6px 0 0 0;">
            İlgili Diğer Çıkmış Sınav Soru Kitapçıkları
          </h3>
        </div>
        <span style="font-size: 12px; color: #94a3b8;">ÖSYM Resmî Arşiv Bağlantıları</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px;">
        <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" style="display: block; padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); text-align: center; text-decoration: none !important; color: #ffffff !important;">
          <div style="font-size: 13px; font-weight: 900; color: #ffffff !important;">YÖKDİL</div>
          <div style="font-size: 11px; color: #2dd4bf; margin-top: 3px;">Çıkmış Sorular &rarr;</div>
        </a>
        <a href="/kategori/ales" style="display: block; padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); text-align: center; text-decoration: none !important; color: #ffffff !important;">
          <div style="font-size: 13px; font-weight: 900; color: #ffffff !important;">ALES</div>
          <div style="font-size: 11px; color: #a78bfa; margin-top: 3px;">Sayısal &amp; Sözel &rarr;</div>
        </a>
        <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" style="display: block; padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); text-align: center; text-decoration: none !important; color: #ffffff !important;">
          <div style="font-size: 13px; font-weight: 900; color: #ffffff !important;">KPDS / ÜDS</div>
          <div style="font-size: 11px; color: #60a5fa; margin-top: 3px;">Eski Arşiv &rarr;</div>
        </a>
        <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" style="display: block; padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); text-align: center; text-decoration: none !important; color: #ffffff !important;">
          <div style="font-size: 13px; font-weight: 900; color: #ffffff !important;">DGS</div>
          <div style="font-size: 11px; color: #34d399; margin-top: 3px;">Çıkmış Sorular &rarr;</div>
        </a>
        <a href="https://www.osym.gov.tr" target="_blank" rel="noopener noreferrer" style="display: block; padding: 12px; border-radius: 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); text-align: center; text-decoration: none !important; color: #ffffff !important;">
          <div style="font-size: 13px; font-weight: 900; color: #ffffff !important;">TUS / DUS</div>
          <div style="font-size: 11px; color: #fb7185; margin-top: 3px;">Tıp &amp; Diş &rarr;</div>
        </a>
        <a href="/sinav-hazirlama-robotu" style="display: block; padding: 12px; border-radius: 14px; background: rgba(13, 148, 136, 0.25); border: 1px solid rgba(20, 184, 166, 0.5); text-align: center; text-decoration: none !important; color: #ffffff !important;">
          <div style="font-size: 13px; font-weight: 900; color: #2dd4bf !important;">Sınav Robotu</div>
          <div style="font-size: 11px; color: #ccfbf1; margin-top: 3px;">Yazılı Hazırla &rarr;</div>
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
    <div style="padding: 24px; margin: 32px 0; border-radius: 24px; background: linear-gradient(135deg, #042f2e 0%, #0f172a 50%, #1e1b4b 100%); color: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" class="not-prose">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">
        <div style="max-width: 650px;">
          <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(20, 184, 166, 0.3); color: #5eead4; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid rgba(20, 184, 166, 0.4); margin-bottom: 8px;">
            ÖSYM Resmî Doküman Havuzu
          </span>
          <h3 style="font-size: 22px; font-weight: 900; color: #ffffff; margin: 0 0 8px 0;">
            Tüm Yılların YDS Çıkmış Soru Kitapçıkları (Orijinal PDF)
          </h3>
          <p style="font-size: 13px; color: #cbd5e1; line-height: 1.6; margin: 0;">
            Aşağıdaki listeden dilediğiniz yılı ve sınav oturumunu seçerek doğrudan ÖSYM sunucularındaki orijinal PDF soru kitapçığını tek tıkla görüntüleyebilir ve indirebilirsiniz.
          </p>
        </div>
        <div style="padding: 12px 20px; border-radius: 16px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15); text-align: center;">
          <div style="font-size: 11px; color: #2dd4bf; font-weight: 800; text-transform: uppercase;">Sınav Sayısı</div>
          <div style="font-size: 24px; font-weight: 900; color: #ffffff;">27+ Kitapçık</div>
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
