/* Surah Lessons - shared code */
(function(){
  var SESSION_KEY = 'surahlessons.session', DAYS = 30, ITER = 10000;

  function sha256(ascii){
    function rightRotate(value, amount){ return (value>>>amount) | (value<<(32 - amount)); }
    var mathPow = Math.pow, maxWord = mathPow(2, 32), lengthProperty = 'length', i, j, result = '';
    var words = [], asciiBitLength = ascii[lengthProperty]*8;
    var hash = sha256.h = sha256.h || [], k = sha256.k = sha256.k || [], primeCounter = k[lengthProperty];
    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) { isComposite[i] = candidate; }
        hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
        k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
      }
    }
    ascii += '\x80';
    while (ascii[lengthProperty]%64 - 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j>>8) return;
      words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
    words[words[lengthProperty]] = (asciiBitLength);
    for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16), oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var a = hash[0], e = hash[4];
        var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e&hash[5])^((~e)&hash[6])) + k[i]
          + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)))|0);
        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
        hash = [(temp1 + temp2)|0].concat(hash);
        hash[4] = (hash[4] + temp1)|0;
      }
      for (i = 0; i < 8; i++) { hash[i] = (hash[i] + oldHash[i])|0; }
    }
    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) { var b = (hash[i]>>(j*8))&255; result += ((b < 16) ? 0 : '') + b.toString(16); }
    }
    return result;
  }
  function utf8(str){ return unescape(encodeURIComponent(str)); }
  function hashPassword(salt, pw){
    var h = utf8(salt + ':' + pw);
    for (var n = 0; n < ITER; n++) { h = sha256(h); }
    return h;
  }

  var SURAHS = [
 {
  "id": 78,
  "name": "An-Naba'",
  "ar": "النبأ",
  "meaning": "The Great News",
  "ayahs": 40,
  "about": "The great news: the Day of Judgment, and Allah's signs in creation.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 79,
  "name": "An-Nazi'at",
  "ar": "النازعات",
  "meaning": "Those Who Pull Out",
  "ayahs": 46,
  "about": "The Day of Judgment, Musa and Pharaoh, and the power of Allah.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 80,
  "name": "Abasa",
  "ar": "عبس",
  "meaning": "He Frowned",
  "ayahs": 42,
  "about": "Every person matters, and the reminder is for those who want to learn.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 81,
  "name": "At-Takwir",
  "ar": "التكوير",
  "meaning": "The Folding Up",
  "ayahs": 29,
  "about": "The signs of the Day of Judgment, and the truth of the Qur'an.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 82,
  "name": "Al-Infitar",
  "ar": "الانفطار",
  "meaning": "The Cleaving",
  "ayahs": 19,
  "about": "The sky splits, every person sees their deeds, and Allah sees all.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 83,
  "name": "Al-Mutaffifin",
  "ar": "المطففين",
  "meaning": "Those Who Give Less",
  "ayahs": 36,
  "about": "Be fair and honest when you measure, weigh and trade.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 84,
  "name": "Al-Inshiqaq",
  "ar": "الانشقاق",
  "meaning": "The Splitting Open",
  "ayahs": 25,
  "about": "The Day of Judgment, the journey to Allah, and a reward that never ends.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Inshiqaq-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Inshiqaq-Game-Comic.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Inshiqaq_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Inshiqaq_Booklet.pdf",
   "pages": 12,
   "mb": 4.3
  }
 },
 {
  "id": 85,
  "name": "Al-Buruj",
  "ar": "البروج",
  "meaning": "The Great Star Groups",
  "ayahs": 22,
  "about": "Staying faithful to Allah, His names, and the glorious Qur'an.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Buruj-Basic.html"
   }
  ],
  "games": [],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Buruj_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Buruj_Booklet.pdf",
   "pages": 12,
   "mb": 4.4
  }
 },
 {
  "id": 86,
  "name": "At-Tariq",
  "ar": "الطارق",
  "meaning": "The Night Visitor",
  "ayahs": 17,
  "about": "Allah watches over every soul, and the Qur'an is a decisive word.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 87,
  "name": "Al-A'la",
  "ar": "الأعلى",
  "meaning": "The Most High",
  "ayahs": 19,
  "about": "Praising Allah, His creation, and remembering the reminder.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Ala-Animated.html"
   }
  ],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 88,
  "name": "Al-Ghashiyah",
  "ar": "الغاشية",
  "meaning": "The Overwhelming Event",
  "ayahs": 26,
  "about": "The Overwhelming Day, and looking at Allah's creation for signs.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 89,
  "name": "Al-Fajr",
  "ar": "الفجر",
  "meaning": "The Dawn",
  "ayahs": 30,
  "about": "Tests with wealth and hardship, caring for orphans and the poor, and a peaceful soul.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 90,
  "name": "Al-Balad",
  "ar": "البلد",
  "meaning": "The City",
  "ayahs": 20,
  "about": "Challenges, kindness, not wasting, and the challenging path of goodness.",
  "animations": [
   {
    "label": "Basic",
    "file": "animations/Surah-Al-Balad-Basic.html"
   },
   {
    "label": "Comic",
    "file": "animations/Surah-Al-Balad-Comic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Balad-Game-Comic.html"
   },
   {
    "label": "Basic game",
    "file": "games/Surah-Al-Balad-Game-Basic.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Balad_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": [
    {
     "label": "Study guide and activity book",
     "file": "worksheets/age-9-12/Surah_Al-Balad_Study_Guide_Age_11.pdf"
    }
   ]
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Balad_Booklet.pdf",
   "pages": 12,
   "mb": 4.6
  }
 },
 {
  "id": 91,
  "name": "Ash-Shams",
  "ar": "الشمس",
  "meaning": "The Sun",
  "ayahs": 15,
  "about": "The sun, the moon and the soul: success comes to those who purify their soul.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 92,
  "name": "Al-Layl",
  "ar": "الليل",
  "meaning": "The Night",
  "ayahs": 21,
  "about": "Giving and being mindful lead to ease; Allah guides to the way of ease.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 93,
  "name": "Ad-Duha",
  "ar": "الضحى",
  "meaning": "The Morning Light",
  "ayahs": 11,
  "about": "Allah has not left you. Remember His favours and be kind to orphans.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 94,
  "name": "Ash-Sharh",
  "ar": "الشرح",
  "meaning": "The Relief",
  "ayahs": 8,
  "about": "With every hardship comes ease.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 95,
  "name": "At-Tin",
  "ar": "التين",
  "meaning": "The Fig",
  "ayahs": 8,
  "about": "Allah created humans in the best form. Faith and good deeds bring reward.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 96,
  "name": "Al-Alaq",
  "ar": "العلق",
  "meaning": "The Clinging Clot",
  "ayahs": 19,
  "about": "The first revelation: read in the name of your Lord who created.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 97,
  "name": "Al-Qadr",
  "ar": "القدر",
  "meaning": "The Night of Power",
  "ayahs": 5,
  "about": "The Night of Power is better than a thousand months.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 98,
  "name": "Al-Bayyinah",
  "ar": "البينة",
  "meaning": "The Clear Proof",
  "ayahs": 8,
  "about": "The clear proof, and sincere worship of Allah alone.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 99,
  "name": "Az-Zalzalah",
  "ar": "الزلزلة",
  "meaning": "The Earthquake",
  "ayahs": 8,
  "about": "The earthquake on the Day of Judgment. Every deed, big or small, is seen.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Az-Zalzalah-Animated.html"
   }
  ],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 100,
  "name": "Al-Adiyat",
  "ar": "العاديات",
  "meaning": "The Racing Steeds",
  "ayahs": 11,
  "about": "Being thankful to Allah for His gifts.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 101,
  "name": "Al-Qari'ah",
  "ar": "القارعة",
  "meaning": "The Striking Calamity",
  "ayahs": 11,
  "about": "The Striking Calamity and the weighing of deeds.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 102,
  "name": "At-Takathur",
  "ar": "التكاثر",
  "meaning": "Competing for More",
  "ayahs": 8,
  "about": "Do not let competing for more distract you from remembering Allah.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 103,
  "name": "Al-Asr",
  "ar": "العصر",
  "meaning": "The Time",
  "ayahs": 3,
  "about": "Time is precious: believe, do good, tell the truth and be patient.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Asr_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Asr_Booklet.pdf",
   "pages": 10,
   "mb": 3.6
  }
 },
 {
  "id": 104,
  "name": "Al-Humazah",
  "ar": "الهمزة",
  "meaning": "The Backbiter",
  "ayahs": 9,
  "about": "Do not mock or backbite others, and do not hoard wealth.",
  "animations": [],
  "games": [],
  "worksheets": {
   "5-8": [],
   "9-12": []
  },
  "booklet": null
 },
 {
  "id": 105,
  "name": "Al-Fil",
  "ar": "الفيل",
  "meaning": "The Elephant",
  "ayahs": 5,
  "about": "Allah protects His House and is stronger than any army.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Fil-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Fil-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_fil.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Fil_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Fil_Booklet.pdf",
   "pages": 10,
   "mb": 4.2
  }
 },
 {
  "id": 106,
  "name": "Quraysh",
  "ar": "قريش",
  "meaning": "The People of Quraysh",
  "ayahs": 4,
  "about": "Thanking Allah for food, safety and every blessing.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Quraysh-Animated.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Quraysh-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_quraysh.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Quraysh_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Quraysh_Booklet.pdf",
   "pages": 10,
   "mb": 3.8
  }
 },
 {
  "id": 107,
  "name": "Al-Ma'un",
  "ar": "الماعون",
  "meaning": "Smallest Favours",
  "ayahs": 7,
  "about": "Caring for others, praying with sincerity, and sharing small favours.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Maun-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Maun-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_maun.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Colour",
     "file": "worksheets/age-5-8/Surah_Al-Maun_Small_Kindness_Book.pdf"
    },
    {
     "label": "Black and white (for printing)",
     "file": "worksheets/age-5-8/Surah_Al-Maun_Small_Kindness_Book_BW.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Maun_Booklet.pdf",
   "pages": 10,
   "mb": 4.2
  }
 },
 {
  "id": 108,
  "name": "Al-Kawthar",
  "ar": "الكوثر",
  "meaning": "Abundance",
  "ayahs": 3,
  "about": "Allah gave the Prophet abundant blessings, so pray and give.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Kawthar-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Kawthar-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_kawthar.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Kawthar_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Kawthar_Booklet.pdf",
   "pages": 10,
   "mb": 3.4
  }
 },
 {
  "id": 109,
  "name": "Al-Kafirun",
  "ar": "الكافرون",
  "meaning": "The Disbelievers",
  "ayahs": 6,
  "about": "Staying firm in worshipping Allah alone, with a clear message.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Kafirun-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Kafirun-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_kafirun.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Kafirun_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Kafirun_Booklet.pdf",
   "pages": 10,
   "mb": 3.7
  }
 },
 {
  "id": 110,
  "name": "An-Nasr",
  "ar": "النصر",
  "meaning": "The Help",
  "ayahs": 3,
  "about": "Allah's help and victory: praise Him and ask His forgiveness.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-An-Nasr-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-An-Nasr-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_nasr.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_An-Nasr_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_An-Nasr_Booklet.pdf",
   "pages": 10,
   "mb": 3.6
  }
 },
 {
  "id": 111,
  "name": "Al-Masad",
  "ar": "المسد",
  "meaning": "The Palm Fibre",
  "ayahs": 5,
  "about": "A warning for those who harm others and turn away from the truth.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Masad-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Masad-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_masad.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Masad_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Masad_Booklet.pdf",
   "pages": 10,
   "mb": 3.8
  }
 },
 {
  "id": 112,
  "name": "Al-Ikhlas",
  "ar": "الإخلاص",
  "meaning": "Sincerity",
  "ayahs": 4,
  "about": "Allah is One, the Eternal, and nothing is like Him.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Ikhlas-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Ikhlas-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_ikhlas.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Ikhlas_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Ikhlas_Booklet.pdf",
   "pages": 10,
   "mb": 3.3
  }
 },
 {
  "id": 113,
  "name": "Al-Falaq",
  "ar": "الفلق",
  "meaning": "The Daybreak",
  "ayahs": 5,
  "about": "Asking Allah for protection from harm.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-Al-Falaq-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-Al-Falaq-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_falaq.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_Al-Falaq_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_Al-Falaq_Booklet.pdf",
   "pages": 10,
   "mb": 3.5
  }
 },
 {
  "id": 114,
  "name": "An-Nas",
  "ar": "الناس",
  "meaning": "Mankind",
  "ayahs": 6,
  "about": "Asking Allah for protection from the whispers of evil.",
  "animations": [
   {
    "label": "Animation",
    "file": "animations/Surah-An-Nas-Basic.html"
   }
  ],
  "games": [
   {
    "label": "Comic game",
    "file": "games/Surah-An-Nas-Game-Comic.html"
   },
   {
    "label": "Memory & quiz",
    "file": "games/quiz/game_nas.html"
   }
  ],
  "worksheets": {
   "5-8": [
    {
     "label": "Small Kindness Book",
     "file": "worksheets/age-5-8/Surah_An-Nas_Small_Kindness_Book.pdf"
    }
   ],
   "9-12": []
  },
  "booklet": {
   "file": "worksheets/booklets/Surah_An-Nas_Booklet.pdf",
   "pages": 10,
   "mb": 3.4
  }
 }
];

  function readSession(){
    try { var s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); if (s && s.exp > Date.now()) { return s; } } catch (e) {}
    return null;
  }
  window.SurahSite = {
    SURAHS: SURAHS,
    hashPassword: hashPassword,
    wsCount: function(s){ return ((s.worksheets['5-8'] || []).length) + ((s.worksheets['9-12'] || []).length); },
    byId: function(id){ for (var k = 0; k < SURAHS.length; k++) { if (SURAHS[k].id === id) { return SURAHS[k]; } } return null; },
    session: readSession,
    login: function(user, pw){
      var users = window.SURAH_USERS || [];
      var u = String(user || '').replace(/^\s+|\s+$/g, '').toLowerCase();
      for (var k = 0; k < users.length; k++) {
        if (users[k].user.toLowerCase() === u && users[k].hash === hashPassword(users[k].salt, pw || '')) {
          try { localStorage.setItem(SESSION_KEY, JSON.stringify({user: users[k].user, exp: Date.now() + DAYS*86400000})); } catch (e) { return 'storage'; }
          return 'ok';
        }
      }
      return 'bad';
    },
    logout: function(){ try { localStorage.removeItem(SESSION_KEY); } catch (e) {} window.location.replace('index.html'); },
    requireLogin: function(){ if (!readSession()) { window.location.replace('index.html'); return false; } return true; }
  };
})();
