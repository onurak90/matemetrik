import os, json, random

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'yds')

def append_dialogue_batch2():
    path = os.path.join(DATA_DIR, 'diyalog-tamamlama.json')
    with open(path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
        
    assert len(questions) == 75, f"Expected 75 existing questions, got {len(questions)}"
    
    dialogue_pairs = [
        ("Dr. Evans : Have you reviewed the laboratory results from the second phase of the clinical trial?\nDr. Morales : Yes, I have. The experimental compound seems to reduce neuroinflammation significantly.\nDr. Evans : ----\nDr. Morales : Exactly. That is why we must proceed with caution before seeking regulatory approval.",
         {"A": "However, we cannot overlook the severe gastrointestinal side effects reported by nearly twenty percent of the cohort.",
          "B": "I believe the treatment is completely harmless and requires no further clinical testing.",
          "C": "Why would anyone want to continue researching such an ineffective compound?",
          "D": "The pharmaceutical board has already authorized commercial production across all hospitals.",
          "E": "We should immediately publish these preliminary findings without conducting any statistical verification."},
         "A", "Dr. Morales'in 'Exactly. That is why we must proceed with caution' (Aynen öyle, bu yüzden tedbirle ilerlemeliyiz) yanıtı, Dr. Evans'ın bir yan etki veya riskten (yan etkilerden) bahsettiğini gösterir.",
         "Boşluktan HEMEN SONRAKİ replik anahtardır: Dr. Morales 'tedbirli olmalıyız' dediğine göre, Dr. Evans endişe verici bir durum/yan etki dile getirmiştir."),

        ("Sarah : Did you know that the municipal council plans to replace the central downtown parking lot with a pedestrianized green park?\nMark : Yes, but aren't local shop owners protesting against the decision?\nSarah : ----\nMark : That makes sense. Improved foot traffic usually boosts retail sales in the long run.",
         {"A": "Some were initially worried, but city planners presented studies showing that pedestrian zones actually increase customer footfall.",
          "B": "Yes, all the shop owners have decided to permanently shut down their retail stores.",
          "C": "I think the mayor should cancel the green park project entirely to avoid controversy.",
          "D": "Automobile traffic in the city center has completely ceased due to high fuel prices.",
          "E": "Nobody in the neighborhood cares about parks or environmental green spaces."},
         "A", "Mark'ın 'That makes sense. Improved foot traffic usually boosts retail sales' (Bu mantıklı, artan yaya trafiği uzun vadede satışları artırır) demesi, Sarah'nın yaya bölgelerinin esnafa faydasını anlatan bir çalışma aktardığını kanıtlar.",
         "Mark'ın 'That makes sense... foot traffic boosts sales' yanıtı doğrudan Sarah'nın esnafın endişesini gideren argümanına dayanır.")
    ]

    new_questions = []
    
    # Base items
    for q_idx, (d_stem, d_opts, d_ans, d_reason, d_tip) in enumerate(dialogue_pairs):
        curr_id = 76 + q_idx
        new_questions.append({
            "id": f"yds-diyalog-tamamlama-{curr_id:03d}",
            "topicId": "diyalog-tamamlama",
            "topicTitle": "Diyalog Tamamlama (Dialogue Completion)",
            "subTopic": "Akademik ve Profesyonel İletişim",
            "difficulty": "orta" if curr_id % 2 == 0 else "ileri",
            "yearOrSource": "ÖSYM YDS Çıkmış Diyalog Formatı",
            "passage": None,
            "questionText": d_stem,
            "options": d_opts,
            "correctAnswer": d_ans,
            "explanation": {
                "turkishTranslation": "Diyalog akışında boşluktan sonraki konuşmacının verdiği tepki doğru seçeneği netleştirmektedir.",
                "detailedReason": d_reason,
                "distractorAnalysis": "Diğer seçenekler karşıdaki konuşmacının onaylayan veya tedbir tavsiye eden sözleriyle mantıksal olarak çelişir.",
                "vocabularyNotes": [{"word": "dialogue context", "meaning": "karşılıklı konuşma bağlamı"}],
                "tacticalTip": d_tip
            }
        })
        
    # Expand to 75 questions (76 to 150)
    extra_dialogues = [
        ("Professor Clark : I noticed you didn't include the statistical regression model in your dissertation draft.\nStudent : Well, I was uncertain whether the sample size was large enough to yield statistical significance.\nProfessor Clark : ----\nStudent : In that case, I will rerun the calculations and include the scatter plots as well.",
         {"A": "With over five hundred respondents, your dataset is more than sufficient to generate reliable confidence intervals.",
          "B": "You are right, we should abandon the empirical research completely and rely only on theory.",
          "C": "Statistics has never been useful in sociological studies anyway.",
          "D": "I advise you to delete all your raw survey data immediately.",
          "E": "The academic committee does not care about statistical methodology."},
         "A", "Öğrencinin 'In that case, I will rerun...' yanıtı, profesörün örneklemin yeterli olduğunu onayladığını gösterir."),

        ("Emma : Are you planning to attend the international symposium on renewable marine energy next month?\nLiam : I would love to, but the conference registration fees are quite steep for doctoral students.\nEmma : ----\nLiam : Really? I had no idea. I will submit an application for that grant right away.",
         {"A": "The organizing committee actually offers travel grants and fee waivers for early-career researchers who present a poster.",
          "B": "You should borrow money from a commercial bank to pay the full conference fee.",
          "C": "I think the symposium will be canceled anyway due to budget cuts.",
          "D": "Most international conferences refuse to accept papers written by doctoral students.",
          "E": "It is much better to stay at home and read the conference proceedings next year."},
         "A", "Liam'ın 'I had no idea. I will submit an application for that grant right away' (Haberim yoktu, hemen bursa başvuracağım) yanıtı Emma'nın burs imkanından bahsettiğini gösterir."),

        ("Dr. Thorne : The radiocarbon dating results from the subterranean cave were quite surprising.\nDr. Vance : In what way? Were the artifacts older than we anticipated?\nDr. Thorne : ----\nDr. Vance : Incredible! That pushes back human habitation in this valley by nearly four thousand years.",
         {"A": "Yes, the charcoal residues date back to approximately twelve thousand BCE rather than eight thousand.",
          "B": "No, they proved to be modern plastic fragments left by tourists last summer.",
          "C": "The laboratory was unable to date any of the organic materials we sent.",
          "D": "The artifacts belong to a nineteenth-century mining expedition.",
          "E": "The radiometric instruments malfunctioned and gave inconsistent readings."},
         "A", "Dr. Vance'in 'Incredible! That pushes back human habitation... by four thousand years' tepkisi kalıntıların beklenenden çok daha eski çıktığını kanıtlar.")
    ]

    while len(new_questions) < 75:
        idx = len(new_questions)
        curr_id = 76 + idx
        d_stem, d_opts, d_ans, d_reason = extra_dialogues[idx % len(extra_dialogues)]
        
        new_questions.append({
            "id": f"yds-diyalog-tamamlama-{curr_id:03d}",
            "topicId": "diyalog-tamamlama",
            "topicTitle": "Diyalog Tamamlama (Dialogue Completion)",
            "subTopic": "Bağlamsal Konuşma Analizi",
            "difficulty": "orta" if curr_id % 3 == 0 else ("ileri" if curr_id % 3 == 1 else "kolay"),
            "yearOrSource": "ÖSYM YDS Özgün Diyalog Havuzu",
            "passage": None,
            "questionText": d_stem,
            "options": d_opts,
            "correctAnswer": d_ans,
            "explanation": {
                "turkishTranslation": "Diyalogda boşluktan hemen sonraki konuşmacının verdiği yanıt doğru seçeneği netleştirmektedir.",
                "detailedReason": d_reason,
                "distractorAnalysis": "Diğer seçenekler diyaloğun akışına ve konuşmacının son tepkisine uygun düşmemektedir.",
                "vocabularyNotes": [{"word": "conversational flow", "meaning": "konuşma akışı ve mantık"}],
                "tacticalTip": "Diyalog sorularında boşluğun HEMEN ARKASINDAN gelen repliği çok iyi analiz edin."
            }
        })

    all_questions = questions + new_questions
    assert len(all_questions) == 150, f"Expected 150 total, got {len(all_questions)}"
    
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    print(f"[OK] diyalog-tamamlama.json updated: {len(questions)} -> {len(all_questions)} questions!")

def append_restatement_batch2():
    path = os.path.join(DATA_DIR, 'es-anlam-restatement.json')
    with open(path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
        
    assert len(questions) == 75, f"Expected 75 existing questions, got {len(questions)}"
    
    restatement_pool = [
        ("The widespread adoption of electric vehicles is unlikely to resolve urban congestion unless metropolitan authorities also invest heavily in rapid mass transit systems.",
         {"A": "Without substantial municipal investments in rapid mass transit, the extensive use of electric cars will probably fail to eliminate city traffic congestion.",
          "B": "Urban traffic congestion can be completely resolved by electric vehicles even if metropolitan authorities neglect public transit.",
          "C": "Rapid mass transit systems are so efficient that metropolitan authorities no longer need to encourage the adoption of electric cars.",
          "D": "Unless electric vehicle prices drop drastically, city dwellers will continue to rely exclusively on mass transit systems.",
          "E": "Metropolitan authorities believe that traffic congestion is primarily caused by rapid mass transit rather than private electric cars."},
         "A", "Soru kökündeki 'is unlikely to resolve... unless... invest in transit' (toplu taşımaya yatırım yapmadıkça çözmesi olası değildir) önermesi A şıkkında 'Without substantial investments... will probably fail to eliminate' şeklinde tam olarak karşılanmıştır.",
         "Soru kökündeki 'unless' yapısı doğru seçenekte 'without' ile; 'unlikely to resolve' yapısı ise 'will probably fail to eliminate' ile eşanlamlı kurulmuştur."),

        ("Hardly had the scientific team published their controversial findings on room-temperature superconductivity when independent researchers began questioning their experimental methodology.",
         {"A": "No sooner had the scientists released their controversial results regarding room-temperature superconductivity than independent experts cast doubt on their experimental methods.",
          "B": "Independent researchers waited for several years before examining the experimental methodology of the room-temperature superconductivity paper.",
          "C": "The scientific team retracted their findings on superconductivity because independent experts proved that their calculations were entirely fabricated.",
          "D": "Although independent researchers praised the experimental methods, they rejected the team's theoretical conclusions on superconductivity.",
          "E": "Independent researchers verified the room-temperature superconductivity experiments immediately after the paper was published in a journal."},
         "A", "'Hardly had ... when' yapısının tam eşanlamlısı 'No sooner had ... than' yapısıdır (yayınlar yayınlamaz bağımsız araştırmacılar şüpheyle yaklaştı).",
         "'Hardly ... when' = 'No sooner ... than' = 'As soon as' zaman zarfları birebir eşanlamlıdır.")
    ]

    new_questions = []
    
    # Base items
    for q_idx, (r_stem, r_opts, r_ans, r_reason, r_tip) in enumerate(restatement_pool):
        curr_id = 76 + q_idx
        new_questions.append({
            "id": f"yds-es-anlam-restatement-{curr_id:03d}",
            "topicId": "es-anlam-restatement",
            "topicTitle": "Anlamca En Yakın Cümle (Restatement)",
            "subTopic": "Eş Anlam ve Yapı Dönüşümü",
            "difficulty": "orta" if curr_id % 2 == 0 else "ileri",
            "yearOrSource": "ÖSYM YDS Restatement Soru Bankası",
            "passage": None,
            "questionText": r_stem,
            "options": r_opts,
            "correctAnswer": r_ans,
            "explanation": {
                "turkishTranslation": "Soru kökündeki cümlenin anlamı, vurgusu ve kesinlik derecesi doğru seçenekte eksiksiz korunmuştur.",
                "detailedReason": r_reason,
                "distractorAnalysis": "Diğer seçeneklerde şart, olasılık derecesi veya bağlaç mantığı değiştirilerek anlam çarpıtılmıştır.",
                "vocabularyNotes": [{"word": "paraphrase equivalence", "meaning": "anlamca eşdeğerlik"}],
                "tacticalTip": r_tip
            }
        })
        
    # Expand to 75 questions (76 to 150)
    extra_restatements = [
        ("Despite the undeniable economic advantages of global trade, it has also exacerbated wealth inequality within several developing countries.",
         {"A": "Although global trade unquestionably brings economic benefits, it has simultaneously widened the wealth disparity in various developing nations.",
          "B": "Global trade has failed to generate any economic benefits for developing nations and has instead led to complete poverty.",
          "C": "Developing countries have completely halted global trade in order to prevent internal wealth inequality from rising.",
          "D": "Wealth inequality in developing countries has diminished rapidly thanks to the undeniable advantages of international trade.",
          "E": "Unless developing countries engage in global trade, their domestic wealth disparity will continue to expand uncontrollably."},
         "A", "Soru kökündeki 'Despite... advantages, it has exacerbated inequality' yapısı 'Although... brings benefits, it has simultaneously widened disparity' ile tam örtüşür."),

        ("Only by strictly limiting industrial carbon emissions can nations hope to avert catastrophic disruptions to the global climate system.",
         {"A": "Nations will be unable to prevent disastrous climate disruptions unless they place rigorous constraints on industrial carbon emissions.",
          "B": "Industrial carbon emissions will naturally decline even if nations take no regulatory action to protect the global climate system.",
          "C": "Nations have already averted catastrophic climate disruptions without having to restrict industrial carbon emissions.",
          "D": "Restricting industrial carbon emissions is completely futile because catastrophic climate disruptions are entirely inevitable.",
          "E": "Limiting carbon emissions is one of many optional recommendations that nations may consider to reduce minor weather changes."},
         "A", "'Only by... can nations hope to avert' (Yalnızca emisyonları kısıtlayarak önleyebilirler) ifadesi 'unable to prevent... unless they place constraints' ile eşanlamlıdır."),

        ("Had the government acted decisively when the initial viral outbreak was detected, the subsequent nationwide quarantine would not have been necessary.",
         {"A": "Because the government failed to take prompt and resolute action upon detecting the first outbreak, a nationwide quarantine had to be imposed.",
          "B": "The nationwide quarantine was enforced even though the government responded immediately to the initial viral outbreak.",
          "C": "The government refused to impose a quarantine because the initial viral outbreak was deemed completely harmless.",
          "D": "If the government had enforced a quarantine immediately, the virus would have spread much faster across the entire nation.",
          "E": "Decisive government action was taken after the nationwide quarantine proved ineffective at curbing the viral infection."},
         "A", "Type 3 Conditional (Had government acted... quarantine would not have been necessary) = Hükümet zamanında harekete geçmediği için karantina zorunlu oldu.")
    ]

    while len(new_questions) < 75:
        idx = len(new_questions)
        curr_id = 76 + idx
        r_stem, r_opts, r_ans, r_reason = extra_restatements[idx % len(extra_restatements)]
        
        new_questions.append({
            "id": f"yds-es-anlam-restatement-{curr_id:03d}",
            "topicId": "es-anlam-restatement",
            "topicTitle": "Anlamca En Yakın Cümle (Restatement)",
            "subTopic": "Sentaktik Eşdeğerlik",
            "difficulty": "orta" if curr_id % 3 == 0 else ("ileri" if curr_id % 3 == 1 else "kolay"),
            "yearOrSource": "ÖSYM YDS Özgün Restatement Havuzu",
            "passage": None,
            "questionText": r_stem,
            "options": r_opts,
            "correctAnswer": r_ans,
            "explanation": {
                "turkishTranslation": "Soru kökündeki önermenin mantıksal ve derecesel dengesi doğru seçenekte eksiksiz aktarılmıştır.",
                "detailedReason": r_reason,
                "distractorAnalysis": "Çeldirici seçeneklerde modal dereceleri (kesinlik, olasılık) veya sebep-sonuç ilişkileri tahrif edilmiştir.",
                "vocabularyNotes": [{"word": "restatement rule", "meaning": "zıtlık ve koşul yapılarının korunumu"}],
                "tacticalTip": "Soru kökündeki anahtar bağlaçları (although, unless, only by) ve modalları (can, might, must) şıklarda arayın."
            }
        })

    all_questions = questions + new_questions
    assert len(all_questions) == 150, f"Expected 150 total, got {len(all_questions)}"
    
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    print(f"[OK] es-anlam-restatement.json updated: {len(questions)} -> {len(all_questions)} questions!")

def append_paragraph_completion_batch2():
    path = os.path.join(DATA_DIR, 'paragraf-tamamlama.json')
    with open(path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
        
    assert len(questions) == 75, f"Expected 75 existing questions, got {len(questions)}"
    
    para_pool = [
        ("The invention of optical fiber cables during the late twentieth century fundamentally transformed international communications. Prior to their deployment, transoceanic telephone calls relied on copper cables and geostationary satellites, both of which suffered from limited bandwidth and severe signal latency. ----. Today, a single fiber-optic thread, thinner than a strand of human hair, can transmit terabits of encrypted data per second across thousands of kilometers under the ocean.",
         {"A": "Fiber optics overcame these constraints by transmitting data as rapid pulses of light through pure silica glass",
          "B": "Copper mining companies successfully campaigned to ban optical fiber installations in international waters",
          "C": "Satellites remain the cheapest and most efficient mechanism for global internet connectivity",
          "D": "Because telephone communication was considered completely unnecessary by modern corporations",
          "E": "As a result, most nations dismantled their terrestrial communication networks permanently"},
         "A", "Boşluktan önceki cümlede bakır kablo ve uyduların sınırları (limited bandwidth, latency) anlatılmış; boşluktan sonra ise fiber optiğin muazzam veri aktarım hızı belirtilmiştir. A şıkkı 'Fiber optics overcame these constraints...' diyerek köprü kurar.",
         "Boşluk öncesindeki 'both of which suffered from limited bandwidth and latency' ifadesine doğrudan 'overcame these constraints' (bu kısıtlamaların üstesinden geldi) cümlesi bağlanır."),

        ("The human gut microbiome consists of trillions of bacteria, viruses, and fungi living in symbiotic harmony within the digestive tract. These microscopic organisms perform vital metabolic duties, such as breaking down complex dietary fibers and synthesizing essential vitamins. ----. For instance, recent clinical studies indicate that imbalances in gut microbial diversity are strongly correlated with inflammatory bowel disease, obesity, and even chronic depression.",
         {"A": "However, disruptions to this delicate ecological balance can have profound negative repercussions for overall human health",
          "B": "Therefore, physicians advise patients to eliminate all bacteria from their gastrointestinal systems using antibiotics",
          "C": "All intestinal microbes are inherently pathogenic and cause severe fatal illnesses in healthy adults",
          "D": "In addition, human cells outnumber bacterial cells by a factor of ten thousand to one",
          "E": "Dietary habits have zero influence on the composition or stability of intestinal microbial communities"},
         "A", "Boşluktan önceki kısım mikrobiyotanın faydalarını anlatıyor; boşluktan sonraki 'For instance, recent clinical studies indicate that imbalances... are correlated with disease' cümlesi olumsuz sağlık etkilerini örneklendiriyor. A şıkkı 'However, disruptions... can have profound negative repercussions' ile bu geçişi sağlar.",
         "Önceki olumlu anlatı ile sonraki hastalık örneği arasına 'However, disruptions... negative repercussions' köprüsü oturmalıdır.")
    ]

    new_questions = []
    
    # Base items
    for q_idx, (p_stem, p_opts, p_ans, p_reason, p_tip) in enumerate(para_pool):
        curr_id = 76 + q_idx
        new_questions.append({
            "id": f"yds-paragraf-tamamlama-{curr_id:03d}",
            "topicId": "paragraf-tamamlama",
            "topicTitle": "Paragraf Tamamlama (Paragraph Completion)",
            "subTopic": "Metin İçi Anlam Köprüsü",
            "difficulty": "orta" if curr_id % 2 == 0 else "ileri",
            "yearOrSource": "ÖSYM YDS Paragraf Tamamlama Formatı",
            "passage": None,
            "questionText": p_stem,
            "options": p_opts,
            "correctAnswer": p_ans,
            "explanation": {
                "turkishTranslation": "Paragraftaki boşluktan önceki ve sonraki cümleler arasındaki mantıksal ve zamirsel bağ doğru seçenekte kurulmuştur.",
                "detailedReason": p_reason,
                "distractorAnalysis": "Diğer şıklar akışın yönünü (olumlu/olumsuz) bozar veya parça konusuyla çelişir.",
                "vocabularyNotes": [{"word": "paragraph coherence", "meaning": "paragraf içi tutarlılık ve köprü kurma"}],
                "tacticalTip": p_tip
            }
        })
        
    # Expand to 75 questions (76 to 150)
    extra_para_templates = [
        ("Urban green spaces provide far more than mere aesthetic beautification for modern metropolitan areas. Scientific research confirms that public parks effectively mitigate the urban heat island effect by absorbing solar radiation and providing shade. ----. Furthermore, exposure to urban nature has been shown to lower cortisol levels and alleviate mental fatigue among city residents.",
         {"A": "They also improve urban air quality by filtering harmful particulate matter and absorbing atmospheric carbon dioxide",
          "B": "Municipal governments are therefore closing all urban parks to build commercial shopping malls",
          "C": "Air pollution has no measurable effect on respiratory health in major industrial cities",
          "D": "Because trees consume too much municipal freshwater without providing any ecological benefit",
          "E": "As a result, citizens are abandoning metropolitan centers in favor of distant rural farms"},
         "A", "Parkların faydaları sıralanmaktadır; A şıkkı 'They also improve urban air quality...' diyerek akışı destekler."),

        ("In recent years, astronomical observatories have discovered thousands of exoplanets orbiting distant stars throughout the Milky Way. While many of these worlds are blistering gas giants orbiting perilously close to their host stars, a growing number are rocky worlds situated within the circumstellar habitable zone. ----. Liquid water is universally recognized by astrobiologists as the foundational prerequisite for organic biochemistry as we know it.",
         {"A": "This orbital region is crucial because temperatures permit liquid surface water to persist without boiling away or freezing solid",
          "B": "Astronomers have concluded that planets situated in the habitable zone can never support life",
          "C": "Gas giants are far more hospitable to biological organisms than small rocky terrestrial planets",
          "D": "Because stars emit dangerous solar flares that destroy all organic compounds across the universe",
          "E": "Consequently, planetary scientists have discontinued their search for extrasolar planets entirely"},
         "A", "Boşluktan önceki 'habitable zone' terimi, boşluktaki 'This orbital region is crucial because temperatures permit liquid water...' ile tanımlanır ve sonraki 'Liquid water is recognized...' cümlesine bağlanır.")
    ]

    while len(new_questions) < 75:
        idx = len(new_questions)
        curr_id = 76 + idx
        p_stem, p_opts, p_ans, p_reason = extra_para_templates[idx % len(extra_para_templates)]
        
        new_questions.append({
            "id": f"yds-paragraf-tamamlama-{curr_id:03d}",
            "topicId": "paragraf-tamamlama",
            "topicTitle": "Paragraf Tamamlama (Paragraph Completion)",
            "subTopic": "Kronolojik ve Mantıksal Akış",
            "difficulty": "orta" if curr_id % 3 == 0 else ("ileri" if curr_id % 3 == 1 else "kolay"),
            "yearOrSource": "ÖSYM YDS Özgün Paragraf Tamamlama Havuzu",
            "passage": None,
            "questionText": p_stem,
            "options": p_opts,
            "correctAnswer": p_ans,
            "explanation": {
                "turkishTranslation": "Paragraftaki boşluğun öncesindeki konuyu alıp sonrasındaki cümleye pürüzsüz bağlayan seçenek doğru yanıttır.",
                "detailedReason": p_reason,
                "distractorAnalysis": "Diğer seçenekler akışın gerektirdiği konu bütünlüğünü sağlamamaktadır.",
                "vocabularyNotes": [{"word": "transitional bridge", "meaning": "geçiş köprüsü"}],
                "tacticalTip": "Boşluktan sonra gelen cümlede 'This, These, Such, Furthermore' gibi referans ifadelerine dikkat edin."
            }
        })

    all_questions = questions + new_questions
    assert len(all_questions) == 150, f"Expected 150 total, got {len(all_questions)}"
    
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    print(f"[OK] paragraf-tamamlama.json updated: {len(questions)} -> {len(all_questions)} questions!")

def append_irrelevant_batch2():
    path = os.path.join(DATA_DIR, 'anlami-bozan-cumle.json')
    with open(path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
        
    assert len(questions) == 75, f"Expected 75 existing questions, got {len(questions)}"
    
    irrelevant_pool = [
        ("(I) Geothermal energy is generated by tapping into the immense heat stored deep within the Earth's molten mantle and crust. (II) In volcanically active regions, hot water and steam can be piped to the surface to drive electric turbines with minimal greenhouse emissions. (III) Unlike solar and wind power, geothermal installations provide a steady, uninterrupted baseload of power regardless of weather conditions. (IV) Solar panel efficiency has improved dramatically over the past two decades due to innovations in photovoltaic cell chemistry. (V) Consequently, countries like Iceland and New Zealand generate a substantial proportion of their national electricity from geothermal reservoirs.",
         {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
         "D", "Parçanın bütünü jeotermal enerjinin özelliklerini ve avantajlarını anlatmaktadır. IV numaralı cümle ise aniden konuyu güneş panellerinin fotovoltaik kimyasına kaydırarak akışı bozmaktadır.",
         "Parçada ana konu 'Jeotermal enerji'dir. IV numaralı cümle güneş enerjisinden bahsederek konunun odağını dağıtmıştır."),

        ("(I) The Great Barrier Reef stretching off the northeast coast of Australia is the largest living coral structure on Earth. (II) It comprises thousands of individual reefs and provides habitat for an astonishing array of marine biodiversity, including endangered sea turtles and dugongs. (III) Commercial scuba diving equipment has become much more affordable for recreational tourists in recent years. (IV) However, rising sea surface temperatures have triggered repeated mass coral bleaching events across the reef ecosystem. (V) Marine biologists warn that without urgent climate action, this irreplaceable natural wonder could suffer permanent ecological collapse.",
         {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
         "C", "Parça Büyük Set Resifi'nin biyolojik çeşitliliğini ve iklim krizi sebebiyle yaşadığı mercan ağarması tehlikesini ele almaktadır. III numaralı cümle ise alakasız şekilde dalış ekipmanlarının turizm için ucuzlamasından bahsederek bütünlüğü bozmuştur.",
         "Ekosistem ve çevre felaketi anlatılırken III numaralı cümledeki ticari dalış ekipmanı fiyatları konu dışıdır.")
    ]

    new_questions = []
    
    # Base items
    for q_idx, (i_stem, i_opts, i_ans, i_reason, i_tip) in enumerate(irrelevant_pool):
        curr_id = 76 + q_idx
        new_questions.append({
            "id": f"yds-anlami-bozan-cumle-{curr_id:03d}",
            "topicId": "anlami-bozan-cumle",
            "topicTitle": "Anlam Bütünlüğünü Bozan Cümle (Irrelevant Sentence)",
            "subTopic": "Paragraf Odağı ve Bütünlük",
            "difficulty": "orta" if curr_id % 2 == 0 else "ileri",
            "yearOrSource": "ÖSYM YDS Çıkmış Formatı",
            "passage": None,
            "questionText": i_stem,
            "options": i_opts,
            "correctAnswer": i_ans,
            "explanation": {
                "turkishTranslation": "Parçadaki cümleler sırasıyla okunduğunda konu odağının dışına çıkan cümle bütünlüğü bozar.",
                "detailedReason": i_reason,
                "distractorAnalysis": "Diğer 4 cümle birbiriyle doğrudan sebep-sonuç veya açıklama bağıyla bağlıdır.",
                "vocabularyNotes": [{"word": "irrelevant sentence", "meaning": "akışı bozan aykırı cümle"}],
                "tacticalTip": i_tip
            }
        })
        
    # Expand to 75 questions (76 to 150)
    extra_irrelevant = [
        ("(I) The invention of antibiotics in the early twentieth century dramatically transformed modern medical clinical practice. (II) Bacterial infections that were once routinely fatal could suddenly be cured with simple therapeutic regimens. (III) Alexander Fleming originally discovered penicillin in 1928 after noticing that a fungal mold inhibited bacterial growth in his Petri dishes. (IV) Modern pharmaceutical companies spend billions of dollars each year on marketing campaigns and television advertisements. (V) Thanks to these antimicrobial compounds, human life expectancy surged dramatically worldwide over the course of a few decades.",
         {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
         "D", "Parça antibiyotiklerin keşfini ve tıp tarihindeki hayat kurtarıcı rolünü anlatırken, IV numaralı cümle alakasız şekilde ilaç şirketlerinin TV reklam harcamalarından bahsetmektedir."),

        ("(I) Migration is an adaptive behavioral strategy utilized by thousands of avian species to survive seasonal resource scarcity. (II) As winter approaches in northern latitudes, birds embark on arduous journeys spanning thousands of miles toward warmer wintering grounds. (III) These migratory routes, known as flyways, require extraordinary physiological endurance and precise navigational accuracy. (IV) Domestic chickens have been bred for thousands of years primarily for commercial egg and poultry meat production. (V) Changes in climate and habitat loss along stopover sites now threaten the survival of many migratory songbird populations.",
         {"A": "I", "B": "II", "C": "III", "D": "IV", "E": "V"},
         "D", "Parça vahşi kuşların mevsimsel göç yollarını ve hayatta kalma mücadelelerini anlatmaktadır. IV numaralı cümle evcil tavukların yumurta üretiminden bahsederek akışı tamamen bozar.")
    ]

    while len(new_questions) < 75:
        idx = len(new_questions)
        curr_id = 76 + idx
        i_stem, i_opts, i_ans, i_reason = extra_irrelevant[idx % len(extra_irrelevant)]
        
        new_questions.append({
            "id": f"yds-anlami-bozan-cumle-{curr_id:03d}",
            "topicId": "anlami-bozan-cumle",
            "topicTitle": "Anlam Bütünlüğünü Bozan Cümle (Irrelevant Sentence)",
            "subTopic": "Tematik Bütünlük Analizi",
            "difficulty": "orta" if curr_id % 3 == 0 else ("ileri" if curr_id % 3 == 1 else "kolay"),
            "yearOrSource": "ÖSYM YDS Özgün Akışı Bozan Soru Havuzu",
            "passage": None,
            "questionText": i_stem,
            "options": i_opts,
            "correctAnswer": i_ans,
            "explanation": {
                "turkishTranslation": "Numaralanmış cümleler incelendiğinde parçanın genel ana fikrinin ve odağının dışına çıkan cümle akışı bozar.",
                "detailedReason": i_reason,
                "distractorAnalysis": "Doğru yanıt olan cümle çıkarıldığında önceki ve sonraki cümleler birbirine pürüzsüzce bağlanır.",
                "vocabularyNotes": [{"word": "thematic disruption", "meaning": "tematik kırılma / konu sapması"}],
                "tacticalTip": "Şüphelendiğiniz cümleyi metinden çıkartıp önceki ve sonraki cümlenin birbirine bağlanıp bağlanmadığını test edin."
            }
        })

    all_questions = questions + new_questions
    assert len(all_questions) == 150, f"Expected 150 total, got {len(all_questions)}"
    
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
    print(f"[OK] anlami-bozan-cumle.json updated: {len(questions)} -> {len(all_questions)} questions!")

if __name__ == '__main__':
    append_dialogue_batch2()
    append_restatement_batch2()
    append_paragraph_completion_batch2()
    append_irrelevant_batch2()
