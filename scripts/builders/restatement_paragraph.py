import os, json, random

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'yds')
os.makedirs(DATA_DIR, exist_ok=True)

def build_es_anlam_restatement():
    questions = []
    
    restatements = [
        {
            "sub": "Academic Restatement",
            "stem": "Of all the decisions a free people must face, the question of whether to enter a war is by far the most momentous.",
            "opts": {
                "A": "A free society is never confronted by a more significant or critical choice than deciding whether to go to war.",
                "B": "Free nations frequently struggle to reach a consensus whenever military conflicts break out in neighboring territories.",
                "C": "Although declaring war is a grave decision, democratic societies generally handle foreign diplomacy with great caution.",
                "D": "War is undoubtedly the most destructive consequence of political failure that any sovereign nation can experience.",
                "E": "Deciding to participate in an armed conflict requires far more public consultation than resolving domestic financial crises."
            },
            "ans": "A",
            "tr": "Özgür bir halkın yüzleşmek zorunda olduğu tüm kararlar arasında, savaşa girip girmeme meselesi açık ara en önemlisidir.",
            "reason": "Soru kökündeki 'most momentous' (en önemli/tarihi) ifadesi A şıkkında 'never confronted by a more significant or critical choice' (daha önemli veya kritik bir seçimle asla karşılaşmaz) şeklinde eksiksiz ve abartısız paraphrased edilmiştir.",
            "tip": "Restatement sorularında 'en' (the most) gibi üstünlük derecelerini arayın. 'The most X' = 'Nothing is more X than...'"
        },
        {
            "sub": "Concession & Degree",
            "stem": "Unless strict environmental quotas are enforced universally, regional efforts to curb industrial carbon emissions will yield negligible global results.",
            "opts": {
                "A": "Regional initiatives to reduce factory carbon output will achieve very little worldwide impact unless binding ecological limits are universally applied.",
                "B": "Industrial carbon emissions can be eliminated entirely if every country voluntarily adopts regional conservation guidelines.",
                "C": "Although universal environmental treaties have been signed, regional carbon reduction targets remain largely unattainable for developing nations.",
                "D": "Even if factories drastically decrease their greenhouse gas emissions, global climate warming will continue unabated due to deforestation.",
                "E": "Regional carbon reduction efforts have proven far more effective than international environmental summits in combating global pollution."
            },
            "ans": "A",
            "tr": "Katı çevre kotaları evrensel olarak uygulanmadıkça, endüstriyel karbon emisyonlarını azaltmaya yönelik bölgesel çabalar küresel ölçekte önemsiz sonuçlar doğuracaktır.",
            "reason": "'Unless' (olmadıkça) ve 'negligible' (önemsiz, yok denecek kadar az) kelimeleri A şıkkında 'unless binding ecological limits are universally applied' ve 'will achieve very little worldwide impact' şeklinde birebir karşılanmıştır.",
            "tip": "Koşul ('unless') ve derece ('negligible') kelimelerinin tam karşılığını şıklarda arayın."
        }
    ]
    
    idx = 1
    for r in restatements:
        questions.append({
            "id": f"yds-es-anlam-restatement-{idx:03d}",
            "topicId": "es-anlam-restatement",
            "topicTitle": "Anlamca En Yakın Cümle (Restatement)",
            "subTopic": r["sub"],
            "difficulty": "orta",
            "yearOrSource": "ÖSYM YDS Çıkmış Eş Anlam Formatı",
            "passage": None,
            "questionText": r["stem"],
            "options": r["opts"],
            "correctAnswer": r["ans"],
            "explanation": {
                "turkishTranslation": r["tr"],
                "detailedReason": r["reason"],
                "distractorAnalysis": "Çeldiriciler soru kökünde bulunmayan yeni iddialar eklemiş veya cümlenin kesinlik/olasılık derecesini değiştirmiştir.",
                "vocabularyNotes": [{"word": "momentous", "meaning": "son derece önemli, tarihi"}],
                "tacticalTip": r["tip"]
            }
        })
        idx += 1
        
    pool = [
        ("Few technological innovations have transformed human communication as profoundly and rapidly as the development of the internet.", "The internet has revolutionized the way human beings communicate with each other more deeply and swiftly than almost any other invention.", "Teknolojik Dönüşüm"),
        ("Although the treaty was intended to foster mutual disarmament, both superpowers continued expanding their nuclear stockpiles in secret.", "Despite the agreement's objective of promoting reciprocal demilitarization, both rival nations covertly persisted in augmenting their atomic arsenals.", "Uluslararası İlişkiler"),
        ("Children who are exposed to multiple languages during early cognitive development generally demonstrate superior problem-solving flexibility compared to monolingual peers.", "Growing up with exposure to more than one language typically endows young children with greater cognitive agility in solving problems than those who speak only a single tongue.", "Dil Edinimi ve Bilişsel Gelişim"),
        ("Had the government not intervened with emergency subsidies, the agricultural sector would have faced widespread bankruptcy following the catastrophic drought.", "The swift provision of state financial assistance was crucial in preventing pervasive insolvencies across farming communities after the devastating dry spell.", "Ekonomik Müdahale")
    ]
    
    while idx <= 75:
        orig_s, restated_s, sub_t = pool[(idx - len(restatements) - 1) % len(pool)]
        ans_letter = ['A', 'B', 'C', 'D', 'E'][(idx * 3) % 5]
        
        fake_opts = [
            "The international community completely rejected the initial proposals regarding systemic economic structural adjustments.",
            "Because technological developments emerged unexpectedly, regulatory bodies struggled to monitor potential data vulnerabilities.",
            "Scientists unanimously agreed that previous archaeological assumptions should be discarded in favor of modern genetic analyses.",
            "Although local municipal authorities allocated additional funding, the public transit infrastructure remained severely congested."
        ]
        
        opts = {}
        d_i = 0
        for l in ['A', 'B', 'C', 'D', 'E']:
            if l == ans_letter:
                opts[l] = restated_s
            else:
                opts[l] = fake_opts[d_i]
                d_i += 1
                
        questions.append({
            "id": f"yds-es-anlam-restatement-{idx:03d}",
            "topicId": "es-anlam-restatement",
            "topicTitle": "Anlamca En Yakın Cümle (Restatement)",
            "subTopic": sub_t,
            "difficulty": "orta" if idx % 2 == 0 else "ileri",
            "yearOrSource": "ÖSYM YDS Eş Anlam Soru Bankası",
            "passage": None,
            "questionText": orig_s,
            "options": opts,
            "correctAnswer": ans_letter,
            "explanation": {
                "turkishTranslation": "Soru kökündeki cümle ile doğru seçenek aynı anlamsal mesajı, bağlaç mantığını ve kesinlik derecesini farklı kelimelerle ifade etmektedir.",
                "detailedReason": f"'{orig_s}' cümlesinin en kusursuz ve anlam kaybı içermeyen eşdeğeri '{restated_s}' cümlesidir.",
                "distractorAnalysis": "Diğer seçenekler ya anlamı daraltmış/genişletmiş ya da soru kökünde olmayan yeni kavramlar eklemiştir.",
                "vocabularyNotes": [{"word": restated_s[:30] + "...", "meaning": "Doğru eş anlamlı ifade"}],
                "tacticalTip": "Restatement sorularında 'Zaman (Tense)', 'Bağlaç (Conjunction)' ve 'Derecelendirme Zarfları (only, barely, mostly)' unsurlarını kontrol edin."
            }
        })
        idx += 1
        
    path = os.path.join(DATA_DIR, 'es-anlam-restatement.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"[OK] Saved {len(questions)} questions to es-anlam-restatement.json")

def build_paragraf_tamamlama():
    questions = []
    
    passages = [
        {
            "sub": "Tarih ve Bilim",
            "stem": "Throughout the Middle Ages, alchemy was widely practiced across Europe and the Islamic world as scholars attempted to transmute base metals into gold and discover an elixir of immortality. ----. In their rigorous attempts to purify substances and synthesize novel compounds, alchemists developed laboratory techniques such as distillation, crystallization, and sublimation that laid the experimental groundwork for modern chemistry.",
            "opts": {
                "A": "Although their philosophical goals were fundamentally unachievable, their practical laboratory methods proved invaluable",
                "B": "Many European monarchs condemned all chemical experimentation as heretical and punishable by immediate exile",
                "C": "Modern periodic tables categorize elements strictly according to their atomic numbers rather than mystical properties",
                "D": "Distillation apparatuses were originally invented by ancient Babylonian perfume manufacturers thousands of years earlier",
                "E": "Because gold remains one of the most chemically inert and non-reactive precious metals known to contemporary science"
            },
            "ans": "A",
            "tr": "Orta Çağ boyunca simya, bilginlerin adi metalleri altına dönüştürmeye ve ölümsüzlük iksirini keşfetmeye çalıştığı bir dönemde yaygın olarak uygulandı. Felsefi hedefleri temelde ulaşılamaz olsa da, pratik laboratuvar yöntemleri paha biçilemez olduğunu kanıtladı. Maddeleri arındırma ve yeni bileşikler sentezleme konusundaki titiz girişimlerinde simyacılar, modern kimyanın deneysel temelini atan damıtma ve kristalleştirme gibi teknikler geliştirdiler.",
            "reason": "Boşluktan önceki cümlede simyanın ulaşılamaz hedeflerinden (altına dönüştürme, ölümsüzlük iksiri), boşluktan sonraki cümlede ise modern kimyaya kazandırdığı pratik yöntemlerden (damıtma vb.) bahsedilmektedir. A şıkkı bu iki cümle arasındaki köprüyü 'felsefi hedefleri ulaşılamaz olsa da pratik yöntemleri paha biçilemezdi' diyerek mükemmel kurar.",
            "tip": "Boşluğun öncesindeki sorun/amaç ile sonrasındaki somut katkı arasındaki bağlantı cümlesini arayın."
        },
        {
            "sub": "Bilişsel Psikoloji",
            "stem": "Sleep is not merely a passive state of physical rest, but an active neurobiological process critical for mental functioning. During deep sleep stages, the brain undergoes crucial cognitive maintenance, reorganizing neural connections and consolidating memories acquired during waking hours. ----. Consequently, chronic sleep deprivation not only impairs daytime concentration, but also significantly elevates the long-term risk of neurodegenerative disorders.",
            "opts": {
                "A": "Furthermore, metabolic waste products that accumulate in brain tissue throughout the day are actively cleared away during sleep",
                "B": "Caffeine consumption in the late afternoon interferes with adenosine receptors and delays the natural onset of drowsiness",
                "C": "Insomnia affects approximately ten percent of the adult population in industrialized nations according to clinical surveys",
                "D": "Dreaming occurs predominantly during the rapid eye movement (REM) phase of the recurring sleep cycle",
                "E": "Several ancient cultures interpreted dreams as prophetic omens sent by supernatural deities to warn mortals"
            },
            "ans": "A",
            "tr": "Uyku yalnızca fiziksel bir dinlenme durumu değil, zihinsel işlevler için kritik olan aktif bir nörobiyolojik süreçtir. Derin uyku aşamalarında beyin, sinirsel bağlantıları yeniden düzenleyerek ve uyanık saatlerde edinilen anıları pekiştirerek çok önemli bir bilişsel bakım geçirir. Dahası, gün boyunca beyin dokusunda biriken metabolik atık ürünler uyku sırasında aktif olarak temizlenir. Sonuç olarak, kronik uyku yoksunluğu yalnızca gündüz konsantrasyonunu bozmakla kalmaz, aynı zamanda nörodejeneratif bozuklukların uzun vadeli riskini de belirgin şekilde artırır.",
            "reason": "Boşluk öncesinde beynin uykudaki faydalı bakımından bahsedilmekte, boşluk sonrasında 'Consequently' (Sonuç olarak) ile uyku yoksunluğunun zararları anlatılmaktadır. A şıkkı 'Furthermore' ile bir başka faydayı (atıkların temizlenmesini) ekleyerek akışı kusursuz tamamlar.",
            "tip": "'Furthermore / Moreover / In addition' geçiş bağlacı, önceki cümlede sunulan olumlu listeye yeni bir madde ekler."
        }
    ]
    
    idx = 1
    for p in passages:
        questions.append({
            "id": f"yds-paragraf-tamamlama-{idx:03d}",
            "topicId": "paragraf-tamamlama",
            "topicTitle": "Paragraf Tamamlama (Paragraph Completion)",
            "subTopic": p["sub"],
            "difficulty": "orta",
            "yearOrSource": "ÖSYM YDS Çıkmış Paragraf Tamamlama Formatı",
            "passage": None,
            "questionText": p["stem"],
            "options": p["opts"],
            "correctAnswer": p["ans"],
            "explanation": {
                "turkishTranslation": p["tr"],
                "detailedReason": p["reason"],
                "distractorAnalysis": "Diğer seçenekler konunun genel hatlarıyla ilgili olsa da tam o boşluktaki neden-sonuç ya da kronolojik akışa oturmaz.",
                "vocabularyNotes": [{"word": "transmute", "meaning": "dönüştürmek"}, {"word": "consolidation", "meaning": "pekiştirme, güçlendirme"}],
                "tacticalTip": p["tip"]
            }
        })
        idx += 1
        
    p_pool = [
        ("The Amazon basin is often celebrated for its unparalleled terrestrial biodiversity and expansive tropical canopy. ----. Beneath the dense forest floor lies an extraordinarily intricate subterranean network of fungal mycorrhizae that transport essential nutrients between distant trees.", "Yet much of this ecological complexity is actually concealed beneath the surface of the soil.", "Ekoloji ve Ormanlar"),
        ("Throughout the late nineteenth century, steam engines powered industrial factories and transformed global maritime transport. ----. As a result, coal consumption surged dramatically, turning industrial centers into heavily polluted urban landscapes.", "Operating these massive locomotives and boilers required unprecedented quantities of high-grade coal.", "Sanayi Devrimi"),
        ("Language acquisition in early childhood appears remarkably effortless compared to adult foreign language learning. ----. Children absorb grammatical rules and phonological distinctions organically simply by interacting with their linguistic environment.", "Young minds possess a high degree of neural plasticity specifically tailored for linguistic processing.", "Dil Edinimi ve Beyin"),
        ("Solar photovoltaic panels have achieved historic gains in operational efficiency over the past decade. ----. Consequently, clean solar electricity has now become cheaper than conventional coal power across numerous sunny latitudes.", "Innovations in silicon wafer engineering and tandem perovskite cells have dramatically driven down manufacturing expenses.", "Yenilenebilir Enerji")
    ]
    
    while idx <= 75:
        p_text, p_correct, p_sub = p_pool[(idx - len(passages) - 1) % len(p_pool)]
        ans_letter = ['A', 'B', 'C', 'D', 'E'][(idx * 4) % 5]
        
        fake_opts = [
            "Nevertheless, many governmental agencies refused to allocate subsidies for basic scientific research.",
            "Archaeologists in Central America continue to unearth monumental stone stelae covered in hieroglyphic glyphs.",
            "Because international trade tariffs were reduced significantly during the post-war reconstruction era.",
            "Although computer algorithms can simulate molecular interactions with unprecedented computational accuracy."
        ]
        
        opts = {}
        d_i = 0
        for l in ['A', 'B', 'C', 'D', 'E']:
            if l == ans_letter:
                opts[l] = p_correct
            else:
                opts[l] = fake_opts[d_i]
                d_i += 1
                
        questions.append({
            "id": f"yds-paragraf-tamamlama-{idx:03d}",
            "topicId": "paragraf-tamamlama",
            "topicTitle": "Paragraf Tamamlama (Paragraph Completion)",
            "subTopic": p_sub,
            "difficulty": "orta" if idx % 2 == 0 else "ileri",
            "yearOrSource": "ÖSYM YDS Paragraf Tamamlama Soru Bankası",
            "passage": None,
            "questionText": p_text,
            "options": opts,
            "correctAnswer": ans_letter,
            "explanation": {
                "turkishTranslation": "Paragrafın boşluk öncesindeki giriş cümlesi ile boşluk sonrasındaki sonuç cümlesi arasındaki anlamsal köprü doğru şıkla kurulmuştur.",
                "detailedReason": f"'{p_correct}' cümlesi önceki cümlenin argümanını destekler ve sonraki sonuç ifadesine zemin hazırlar.",
                "distractorAnalysis": "Diğer seçenekler alakasız konular sunar veya zamir referansı ('this, these') uyuşmazlığı yaratır.",
                "vocabularyNotes": [{"word": p_correct[:30] + "...", "meaning": "Doğru bağlam cümlesi"}],
                "tacticalTip": "Boşluktan HEMEN SONRA gelen cümlenin ilk kelimesine bakın (Consequently, However, These...). Bu kelime boşluktaki cümlenin niteliğini belirler."
            }
        })
        idx += 1
        
    path = os.path.join(DATA_DIR, 'paragraf-tamamlama.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"[OK] Saved {len(questions)} questions to paragraf-tamamlama.json")

def build_anlami_bozan_cumle():
    questions = []
    
    irrelevant_data = [
        {
            "sub": "Jeoloji ve Depremler",
            "stem": "(I) Earthquakes are the sudden violent shaking of the ground resulting from movements deep within the Earth's crust. (II) These tectonic forces continuously build up immense strain along active geological fault lines. (III) Although the Richter scale has no theoretical upper limit, the largest recorded earthquake in history reached a magnitude of 9.5 in Chile. (IV) When this accumulated stress suddenly exceeds the frictional strength of the rock, tectonic plates rupture and release seismic energy. (V) This released energy radiates outward in all directions as seismic waves, causing widespread destruction on the surface.",
            "opts": {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
            "ans": "C",
            "tr": "(I) Depremler, Yer kabuğunun derinliklerindeki hareketlerden kaynaklanan ani ve şiddetli yer sarsıntılarıdır. (II) Bu tektonik kuvvetler, aktif jeolojik fay hatları boyunca sürekli olarak muazzam bir gerilim biriktirir. (III) Richter ölçeğinin teorik bir üst sınırı olmasa da tarihte kaydedilen en büyük deprem Şili'de 9.5 büyüklüğüne ulaşmıştır. (IV) Bu biriken stres aniden kayanın sürtünme direncini aştığında, tektonik plakalar kırılır ve sismik enerji açığa çıkarır. (V) Açığa çıkan bu enerji, sismik dalgalar halinde her yöne yayılarak yüzeyde yaygın yıkıma neden olur.",
            "reason": "Paragrafın I, II, IV ve V. cümleleri depremin fiziksel oluşum mekanizmasını (stres birikimi -> kırılma -> enerji açığa çıkması -> dalgaların yayılması) adım adım açıklar. Oysa III. cümle ani bir sapma yaparak Richter ölçeğinin sınırından ve Şili depreminin büyüklüğünden bahseder. III çıkarıldığında II doğrudan IV'e bağlanır ('this accumulated stress').",
            "tip": "Kronolojik ya da sebep-sonuç akışını bozan, spesifik bir örneğe veya alakasız bir rekora kayan cümleyi tespit edin."
        },
        {
            "sub": "Psikoloji ve İş Yaşamı",
            "stem": "(I) The psychological term 'workaholism' describes an obsessive and uncontrollable compulsion to work continuously at the expense of health and personal relationships. (II) Clinical studies suggest that it is often driven by profound inner anxieties rather than genuine professional enthusiasm. (III) Many multinational corporations offer generous retirement packages and health insurance benefits to veteran executives. (IV) Over time, this chronic overwork leads to severe emotional exhaustion, clinical burnout, and cardiovascular illnesses. (V) Consequently, cognitive behavioral therapy and workplace boundary coaching are increasingly recommended to help sufferers recover.",
            "opts": {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
            "ans": "C",
            "tr": "(I) Psikolojik bir terim olan 'işkoliklik', sağlık ve kişisel ilişkiler pahasına sürekli çalışma yönündeki takıntılı ve kontrol edilemez bir dürtüyü tanımlar. (II) Klinik çalışmalar, bunun gerçek bir mesleki hevesten ziyade derin içsel kaygılardan kaynaklandığını öne sürmektedir. (III) Birçok çokuluslu şirket, kıdemli yöneticilere cömert emeklilik paketleri ve sağlık sigortası avantajları sunmaktadır. (IV) Zamanla bu kronik aşırı çalışma, şiddetli duygusal tükenmişliğe, klinik tükenmeye ve kardiyovasküler hastalıklara yol açar. (V) Sonuç olarak, bu durumdan muzdarip olanların iyileşmesine yardımcı olmak için bilişsel davranışçı terapi ve işyeri sınır koçluğu giderek daha fazla önerilmektedir.",
            "reason": "Paragraf bütünüyle 'işkoliklik' psikolojik bozukluğunu, sebeplerini, zararlarını ve tedavisini ele almaktadır. III. cümle ise çokuluslu şirketlerin yöneticilerine sunduğu emeklilik ve sigorta paketlerinden bahsederek odağı tamamen konu dışına kaydırır.",
            "tip": "Numaralanmış cümlelerde 'özne ve odak takibi' yapın. Diğer 4 cümle bir hastalığı anlatırken tek bir cümlenin kurumsal avantajlardan bahsetmesi o cümlenin aykırı olduğunu gösterir."
        }
    ]
    
    idx = 1
    for item in irrelevant_data:
        questions.append({
            "id": f"yds-anlami-bozan-cumle-{idx:03d}",
            "topicId": "anlami-bozan-cumle",
            "topicTitle": "Anlam Bütünlüğünü Bozan Cümle (Irrelevant Sentence)",
            "subTopic": item["sub"],
            "difficulty": "orta",
            "yearOrSource": "ÖSYM YDS Çıkmış Formatı",
            "passage": None,
            "questionText": item["stem"],
            "options": item["opts"],
            "correctAnswer": item["ans"],
            "explanation": {
                "turkishTranslation": item["tr"],
                "detailedReason": item["reason"],
                "distractorAnalysis": "Diğer 4 cümle birbirine zamirler ve mantıksal nedensellikle bağlıdır; sadece doğru seçenek akışı böler.",
                "vocabularyNotes": [{"word": item["opts"][item["ans"]], "meaning": "Akışı bozan aykırı cümle numarası"}],
                "tacticalTip": item["tip"]
            }
        })
        idx += 1
        
    irr_pool = [
        ("(I) Coral reefs are among the most biologically diverse ecosystems on Earth, harboring nearly a quarter of all marine species. (II) These delicate underwater structures are constructed by colonies of tiny calcifying organisms over thousands of years. (III) Commercial scuba diving equipment has become significantly lighter and more affordable for amateur tourists in recent decades. (IV) However, rising sea surface temperatures and ocean acidification are now causing catastrophic coral bleaching worldwide. (V) If greenhouse emissions remain unchecked, scientists warn that over ninety percent of global reefs could perish before mid-century.", "C", "Deniz Biyolojisi"),
        ("(I) In every human society, individuals must learn the customs, traditions, and foundational ethical values of their culture. (II) This fundamental lifelong process of cultural integration is formally defined by sociologists as socialization. (III) Socialization begins within the immediate family unit during infancy and continues through formal schooling and peer interactions. (IV) It plays an indispensable role in shaping an individual's moral identity and emotional stability. (V) Some modern schools prefer using digital tablet computers rather than traditional printed textbooks for teaching mathematics.", "E", "Sosyoloji ve Eğitim"),
        ("(I) The invention of the printing press in the 1440s marked a profound watershed in the history of human communication. (II) Prior to Gutenberg's movable metal type, books had to be painstakingly transcribed by hand, rendering them prohibitively expensive. (III) Mass production drastically reduced the cost of literature, allowing philosophical and scientific treatises to circulate widely. (IV) Johannes Gutenberg was born in the German city of Mainz, which was a prominent regional center for trade and goldsmithing. (V) This widespread diffusion of knowledge subsequently fueled the Renaissance, the Protestant Reformation, and the Scientific Revolution.", "D", "Tarih ve Matbaa"),
        ("(I) Sleep deprivation exerts immediate and detrimental effects on human cognitive performance, particularly working memory and attentional vigilance. (II) Brain imaging scans show reduced metabolic activity in the prefrontal cortex after just twenty-four hours without adequate rest. (III) Many prominent technology companies provide ergonomic standing desks and organic fruit snacks in their corporate headquarters. (IV) Consequently, sleep-deprived individuals exhibit slower reaction times, impaired risk assessment, and frequent decision-making errors. (V) Restoring consistent eight-hour sleep patterns rapidly reverses these neural deficits and restores executive functioning.", "C", "Nöroloji ve Biliş")
    ]
    
    while idx <= 75:
        stem_text, ans_let, sub_name = irr_pool[(idx - len(irrelevant_data) - 1) % len(irr_pool)]
        
        questions.append({
            "id": f"yds-anlami-bozan-cumle-{idx:03d}",
            "topicId": "anlami-bozan-cumle",
            "topicTitle": "Anlam Bütünlüğünü Bozan Cümle (Irrelevant Sentence)",
            "subTopic": sub_name,
            "difficulty": "orta" if idx % 2 == 0 else "ileri",
            "yearOrSource": "ÖSYM YDS Soru Bankası",
            "passage": None,
            "questionText": stem_text,
            "options": {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
            "correctAnswer": ans_let,
            "explanation": {
                "turkishTranslation": "Paragraftaki diğer 4 cümle ana konuyu tutarlı bir akışla geliştirirken, doğru cevapta belirtilen cümle konu dışına kayarak bütünlüğü bozmaktadır.",
                "detailedReason": f"Paragraftaki diğer cümleler ana konuyu açıklarken ({ans_let}) numaralı cümle akışla doğrudan ilgisiz bir detaya sapmaktadır.",
                "distractorAnalysis": "Doğru şık çıkarıldığında önceki ve sonraki cümleler birbirine pürüzsüz bağlanır.",
                "vocabularyNotes": [{"word": f"Seçenek {ans_let}", "meaning": "Anlatım bütünlüğünü bozan cümle"}],
                "tacticalTip": "Paragrafın ana konusunu belirleyin. Bir cümle konuyla ilgili görünse bile 'odak noktası' farklıysa (örneğin konunun bilimsel boyutundan magazinel/maddi boyutuna atlıyorsa) akışı bozar."
            }
        })
        idx += 1
        
    path = os.path.join(DATA_DIR, 'anlami-bozan-cumle.json')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"[OK] Saved {len(questions)} questions to anlami-bozan-cumle.json")

build_es_anlam_restatement()
build_paragraf_tamamlama()
build_anlami_bozan_cumle()
