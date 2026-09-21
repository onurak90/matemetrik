import sqlite3
import random
import datetime
import re

FIRST_NAMES = [
    'Emirhan', 'Zeynep', 'Berkay', 'İrem', 'Hüseyin', 'Ece Naz', 'Merve', 'Barış',
    'Büşra', 'Kaan', 'Elif', 'Yusuf', 'Defne', 'Kerem', 'Yağmur', 'Arda', 'Selin',
    'Mehmet Ali', 'Duru', 'Ahmet', 'Ceren', 'Mustafa', 'Ayşe', 'Efe', 'Melisa',
    'Batuhan', 'Gamze', 'Burak', 'Fatma Zehra', 'Onur', 'Esra', 'Tolga', 'Nazlı'
]

LAST_NAMES = [
    'Demir', 'Yılmaz', 'Çelik', 'Kaya', 'Şahin', 'Korkmaz', 'Özkan', 'Yıldız',
    'Aydın', 'Öztürk', 'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara',
    'Koç', 'Kurt', 'Özdemir', 'Şimşek', 'Polat', 'Erdoğan', 'Yavuz', 'Güneş'
]

MATH_COMMENTS = [
    ("Hocam 3. soruda paydayı eşitlerken EKOK mu alıyoruz yoksa direkt çarparak mı sadeleştiriyoruz? Burası çok kafamı karıştırdı.", 
     "Evet canım öğrencim, işlem kolaylığı ve en küçük sayılarla çalışmak için önce EKOK alıyoruz. Böylece büyük sayılarla uğraşmadan sonuca ulaşırsın. Başarılar!"),
    ("Sayfa çözümlerindeki işlem basamakları çok açıklayıcı olmuş, hoca tahtaya kaldırdığında tam olarak buradaki gibi anlattım ve 100 aldım!", 
     "Tebrikler harika bir başarı! Adım adım mantığını kavrayarak ilerlemen çok sevindirici."),
    ("4. sorudaki işaret hatamı buraya bakınca fark ettim, parantez dışındaki eksi içeri dağılırken artı oluyormuş meğer. Teşekkürler.", 
     "Çok dikkatli olman gereken bir yerdi, eksinin paranteze dağılma kuralını fark etmen süper!"),
    ("Yarın matematik yazılımız var, bu sayfadaki sıra sizde soruları kesin çıkar mı hocalarım?", 
     "MEB müfredatında öğretmenlerin sınav havuzunda en çok kullandığı sorular 'Sıra Sizde' ve ünite sonu değerlendirme sorularıdır. Buradaki soru kalıplarını mutlaka pekiştirin."),
    ("Son sorunun cevabı 24 mü yoksa 36 mı çıkıyor arkadaşlar, ben ilk başta 24 bulmuştum ama çözümde 36 diyor.", 
     "Formülü uyguladıktan sonra sadeleştirme yaparken 3 ile çarpmayı unuttuysan 24 çıkabilir, işlem sırasına tekrar bak 36 doğru cevap."),
    ("Çok net ve temiz bir anlatım olmuş, emeğinize sağlık hocam.", None),
    ("Cebirsel ifadeler konusu gözümü korkutuyordu ama buradaki tablo yöntemiyle çok kolay anladım.", None),
    ("Hocam 2. etkinliğin b şıkkında formülü nasıl uyguladığımızı bir kez daha özetleyebilir misiniz?", 
     "Orada önce parantez içindeki işlemi tamamlayıp ardından üs alıyoruz, işlem önceliği kuralını (Üslü -> Parantez -> Çarpma/Bölme -> Toplama/Çıkarma) uyguladık."),
    ("Bizim okulda öğretmen bu alıştırmayı ödev vermişti, kontrol ettim hepsi doğru çıktı çok teşekkürler.", None),
    ("Arkadaşlar 5. soruda x'i yalnız bırakırken karşıya eksi olarak geçiyor dikkat edin.", None),
    ("Siteyi sınıf grubumuza attım herkes buradan çalışıyor, elinize sağlık.", "Faydalı olabildiysek ne mutlu bize, tüm sınıfa sınavlarında başarılar dilerim!")
]

SCIENCE_COMMENTS = [
    ("Hocam deney kısmındaki hipotez cümlesi öğretmenimizin derste yazdırdığıyla birebir aynı, çok teşekkürler.", 
     "Rica ederim, MEB kazanımlarına birebir uyumlu hazırladığımız için ders içi etkinliklerle tam örtüşür."),
    ("Bileşke kuvvet sorularında zıt yönlü olunca çıkartıyoruz değil mi arkadaşlar, emin olmak istedim.", 
     "Aynen öyle, aynı yönlü kuvvetler toplanır, zıt yönlü kuvvetlerin ise farkı alınır ve büyük kuvvetin yönünde hareket eder."),
    ("Sayfadaki grafik çizimi çok pratik anlatılmış, ödevimi eksiksiz tamamladım.", None),
    ("Mitoz ve mayoz bölünme farklarını buradaki maddelerle ezberledim, yazılıda tam puan aldım hocamm.", 
     "Harikasın! Hücre bölünmelerindeki kromozom sayısı değişimini de unutma, başarılar dilerim."),
    ("Güneş ve Ay tutulması arasındaki farkı şekil üzerinde çok iyi açıklamışsınız, elinize sağlık.", None),
    ("Denetleyici ve düzenleyici sistemler tablosu çok akılda kalıcı olmuş teşekkür ederiz.", None),
    ("Hocam 4. soruda bağımsız değişken hangisi oluyor?", 
     "Deneyde bizim isteğimize bağlı olarak değiştirdiğimiz faktör bağımsız değişkendir. Burada sıcaklık değerini biz değiştirdiğimiz için bağımsız değişkendir.")
]

TURKISH_COMMENTS = [
    ("Metin anlama sorularındaki ana fikir cümlesini çok güzel özetlemişsiniz, öğretmenimiz çok beğendi.", 
     "Geri bildirimin için teşekkürler! Paragraf sorularında yazarın vermek istediği asıl mesaja odaklanmak her zaman doğru cevaba götürür."),
    ("Deyimler ve atasözleri etkinliğindeki eşleştirmeleri yapamamıştım, buradaki açıklamalar tam oturdu.", None),
    ("Hocam fiillerde kip ve kişi ekleri tablosu inanılmaz faydalı oldu, çok teşekkürler.", 
     "Rica ederim! Haber ve dilek kiplerinin eklerini karıştırmadığın sürece bu konudan soru kaçırmazsın."),
    ("Metindeki söz sanatlarını bulma etkinliğinde kişileştirme ve benzetme örnekleri çok net verilmiş.", None),
    ("Tema sonu değerlendirme sorularının tamamının açıklamalı olması harika bir olay, dershaneye gitmeye gerek kalmıyor.", None),
    ("5. etkinlikteki kompozisyon taslağını kendi cümlelerimle geliştirdim, öğretmenim panoya astı teşekkürler!", 
     "Tebrik ederim, kendi özgün yorumunu katarak geliştirmen en doğru çalışma yöntemidir!")
]

GENERAL_COMMENTS = [
    ("Sayfa sayfa ayrılmış olması aradığımızı saniyeler içinde bulmamızı sağlıyor, çok başarılı bir site.", None),
    ("Öğretmenimiz ödevi kontrol ederken adımları tek tek inceledi ve tam not verdi, teşekkürler Matemetrik!", "Başarılarının devamını dilerim!"),
    ("Diğer siteler gibi gereksiz reklamlarla boğmuyor, doğrudan sorunun cevabı ve mantığı var. Harika iş.", None),
    ("Bu sitenin konu anlatımları ve kitap çözümleri sayesinde notlarım 60'tan 90'a çıktı, iyi ki varsınız.", "Senin gayretin ve emeğin sayesinde! Tebrik eder, daima başarılar dileriz.")
]

def generate_avatar(name):
    seed = re.sub(r'[^a-zA-Z0-9]', '', name)
    return f"https://api.dicebear.com/7.x/avataaars/svg?seed={seed}"

def generate_email(first, last):
    clean_f = first.lower().replace('ç', 'c').replace('ğ', 'g').replace('ı', 'i').replace('ö', 'o').replace('ş', 's').replace('ü', 'u').replace(' ', '')
    clean_l = last.lower().replace('ç', 'c').replace('ğ', 'g').replace('ı', 'i').replace('ö', 'o').replace('ş', 's').replace('ü', 'u')
    num = random.randint(10, 99)
    domains = ['gmail.com', 'gmail.com', 'gmail.com', 'hotmail.com']
    return f"{clean_f}.{clean_l}{num}@{random.choice(domains)}"

def main():
    conn = sqlite3.connect('data/matemetrik.db')
    cur = conn.cursor()

    # Clear previous mock comments if any, or keep existing real comments
    cur.execute('SELECT COUNT(*) FROM comments')
    initial_count = cur.fetchone()[0]
    print(f'Starting with {initial_count} existing comments.')

    # Get all page solutions
    cur.execute('''
        SELECT id, title, slug, category 
        FROM posts 
        WHERE slug LIKE "%-sayfa-%" AND is_published = 1
    ''')
    all_pages = cur.fetchall()

    # Group by base book slug
    books = {}
    for p in all_pages:
        pid, title, slug, cat = p
        base_slug = re.sub(r'-sayfa-\d+.*$', '', slug)
        if base_slug not in books:
            books[base_slug] = []
        books[base_slug].append((pid, title, slug, cat))

    print(f'Found {len(books)} distinct book series.')

    # We want between 1000 and 2000 total comments.
    # Total pages to comment on = ~160 pages.
    # Each page will get 8 to 10 comments (including 2 to 3 replies).
    # 160 * 9 ≈ 1440 comments.
    selected_pages = []
    for base_slug, pages_list in books.items():
        # Pick 2-4 random pages per book
        num_to_pick = min(len(pages_list), random.randint(2, 4))
        picked = random.sample(pages_list, num_to_pick)
        selected_pages.extend(picked)

    random.shuffle(selected_pages)
    # Cap around 160 pages
    selected_pages = selected_pages[:165]
    print(f'Selected {len(selected_pages)} unique solution pages across all books.')

    total_inserted = 0
    now = datetime.datetime.now()

    for pid, title, slug, cat in selected_pages:
        # Determine subject category
        is_math = 'matematik' in slug.lower() or 'matematik' in cat.lower()
        is_science = 'fen' in slug.lower() or 'fizik' in slug.lower() or 'kimya' in slug.lower() or 'biyoloji' in slug.lower()
        is_turkish = 'turkce' in slug.lower() or 'edebiyat' in slug.lower()

        if is_math:
            pool = MATH_COMMENTS + GENERAL_COMMENTS
        elif is_science:
            pool = SCIENCE_COMMENTS + GENERAL_COMMENTS
        elif is_turkish:
            pool = TURKISH_COMMENTS + GENERAL_COMMENTS
        else:
            pool = MATH_COMMENTS + GENERAL_COMMENTS

        # Random 8 to 10 comments per page
        num_comments = random.randint(8, 10)
        chosen_items = random.sample(pool, min(num_comments, len(pool)))

        page_created_days_ago = random.randint(2, 40)

        for item in chosen_items:
            student_comment, teacher_reply = item
            
            # Generate student info
            fn = random.choice(FIRST_NAMES)
            ln = random.choice(LAST_NAMES)
            student_name = f"{fn} {ln}"
            student_email = generate_email(fn, ln)
            student_avatar = generate_avatar(student_name)

            comment_time = now - datetime.timedelta(
                days=page_created_days_ago,
                hours=random.randint(1, 23),
                minutes=random.randint(1, 59)
            )
            comment_time_str = comment_time.strftime('%Y-%m-%d %H:%M:%S')

            # Insert parent comment
            cur.execute('''
                INSERT INTO comments (post_id, parent_id, author_name, author_email, author_avatar, content, is_approved, is_admin, created_at)
                VALUES (?, NULL, ?, ?, ?, ?, 1, 0, ?)
            ''', (pid, student_name, student_email, student_avatar, student_comment, comment_time_str))
            parent_id = cur.lastrowid
            total_inserted += 1

            # If this comment has a teacher or classmate reply
            if teacher_reply:
                reply_time = comment_time + datetime.timedelta(hours=random.randint(1, 14), minutes=random.randint(5, 45))
                reply_time_str = reply_time.strftime('%Y-%m-%d %H:%M:%S')

                is_teacher = random.random() < 0.75
                if is_teacher:
                    reply_author = "Cavenaghi (Editör & Öğretmen)"
                    reply_email = "cavenaghi@matemetrik.com"
                    reply_avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=cavenaghi"
                    is_admin_flag = 1
                else:
                    rf = random.choice(FIRST_NAMES)
                    rl = random.choice(LAST_NAMES)
                    reply_author = f"{rf} {rl}"
                    reply_email = generate_email(rf, rl)
                    reply_avatar = generate_avatar(reply_author)
                    is_admin_flag = 0

                cur.execute('''
                    INSERT INTO comments (post_id, parent_id, author_name, author_email, author_avatar, content, is_approved, is_admin, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
                ''', (pid, parent_id, reply_author, reply_email, reply_avatar, teacher_reply, is_admin_flag, reply_time_str))
                total_inserted += 1

    conn.commit()

    cur.execute('SELECT COUNT(*) FROM comments')
    final_count = cur.fetchone()[0]
    cur.execute('SELECT COUNT(*) FROM comments WHERE is_admin = 1')
    admin_replies = cur.fetchone()[0]
    cur.execute('SELECT COUNT(*) FROM comments WHERE parent_id IS NOT NULL')
    total_replies = cur.fetchone()[0]

    print(f'Successfully inserted {total_inserted} comments & replies.')
    print(f'Total comments in database: {final_count} (Replies: {total_replies}, Admin replies: {admin_replies}).')
    conn.close()

if __name__ == '__main__':
    main()
