export const REGION_ORDER = ['serang', 'lebak', 'pandeglang', 'cilegon'];

export const REGIONS = [
  {
    id: 'serang',
    order: 1,
    label: 'Serang',
    title: 'Serang & Banten Lama',
    tagline: 'Jejak Kesultanan di Tepi Teluk',
    era: 'Abad ke-16 — kini',
    description:
      'Gerbang Kesultanan Banten. Di sini berdiri Masjid Agung Banten, Keraton Surosowan, dan Meriam Ki Amuk yang menjadi saksi kejayaan pelabuhan rempah Nusantara.',
    accent: '#C9A227',
    accentSoft: '#E8C766',
    position: { x: 46, y: 31 },
    cardId: 'ki-amuk',
    minigame: 'quiz',
    dialog: [
      {
        speaker: 'Narator',
        role: 'Banten Lama, menjelang siang',
        portrait: 'narrator',
        text: 'Matahari berdiri tinggi di atas Banten Lama. Di halaman Masjid Agung, menara bata itu menjulang seperti mercusuar yang lupa laut, sementara angin membawa bau tanah, garam, dan sesuatu yang lebih tua dari keduanya.',
      },
      {
        speaker: 'Pak Hasan',
        role: 'Juru kunci Banten Lama',
        portrait: 'guide',
        text: 'Selamat datang, Nak. Kau berdiri di tanah yang pernah menjadi pintu Nusantara. Rempah, kain, dan kabar dari negeri jauh bertemu di sini, lalu berpencar lagi ke seluruh dunia.',
      },
      {
        speaker: 'Mela',
        role: 'Musafir muda',
        portrait: 'mela',
        text: 'Aki meninggalkan buku untukku. Di halaman pertama ia menggambar menara dan meriam, lalu menulis: ‘Dua benda ini menyimpan suara masa lalu.’',
      },
      {
        speaker: 'Pak Hasan',
        role: 'Juru kunci Banten Lama',
        portrait: 'guide',
        text: 'Menara ini dibangun sekitar tahun 1632. Bentuknya sengaja menyerupai mercusuar, supaya kapal yang datang dari Selat Sunda tahu ke mana harus berlabuh.',
      },
      {
        speaker: 'Aki Wira',
        role: 'Ingatan yang tinggal di batu dan lagu',
        portrait: 'aki',
        text: 'Dan Ki Amuk bukan sekadar meriam, Mela. Ia pernah melihat layar Tiongkok, Arab, Portugis, dan Belanda berebut tempat di dermaga. Besi tidak berbicara, tetapi ia mengingat.',
      },
      {
        speaker: 'Mela',
        role: 'Musafir muda',
        portrait: 'mela',
        text: 'Kalau begitu aku harus mendengarnya pelan-pelan. Mulai dari halaman pertama, Pak Hasan.',
      },
    ],
  },
  {
    id: 'lebak',
    order: 2,
    label: 'Lebak',
    title: 'Lebak & Desa Kanekes Baduy',
    tagline: 'Kearifan yang Menjaga Hutan',
    era: 'Tradisi yang terus hidup',
    description:
      'Di kaki Pegunungan Kendeng, masyarakat Baduy menjaga pikukuh — aturan hidup yang mengikat manusia pada tanah, air, dan leluhur. Tenun, angklung, dan huma menjadi napas keseharian.',
    accent: '#6E8B6B',
    accentSoft: '#A8C29A',
    position: { x: 73, y: 53 },
    cardId: 'tenun-baduy',
    minigame: 'sort',
    dialog: [
      {
        speaker: 'Narator',
        role: 'Jalan menanjak ke Kanekes',
        portrait: 'narrator',
        text: 'Jalan menanjak, dan hutan perlahan menutup langit. Di antara rumah panggung berdinding anyaman, seorang kokolot duduk membetulkan tenun, tangannya hafal setiap benang tanpa perlu melihat.',
      },
      {
        speaker: 'Kokolot Jaro',
        role: 'Penjaga adat Kanekes',
        portrait: 'guide',
        text: 'Selamat datang di Kanekes. Di sini kami tidak mengejar banyak; kami menjaga yang sudah ada—tanah, air, hutan, dan hubungan kami dengan leluhur.',
      },
      {
        speaker: 'Mela',
        role: 'Musafir muda',
        portrait: 'mela',
        text: 'Aki menulis bahwa Baduy punya aturan yang tidak tercatat di buku, tetapi terbaca di setiap langkah orangnya.',
      },
      {
        speaker: 'Kokolot Jaro',
        role: 'Penjaga adat Kanekes',
        portrait: 'guide',
        text: 'Pikukuh bukan larangan yang menyiksa. Ia cara kami tetap menjadi Baduy: tidak menebang sembarangan, tidak mengubah aliran sungai, tidak mengambil lebih dari yang dibutuhkan.',
      },
      {
        speaker: 'Aki Wira',
        role: 'Ingatan yang tinggal di batu dan lagu',
        portrait: 'aki',
        text: 'Orang luar menyebut tempat ini cagar alam. Orang Kanekes menyebutnya ibu.',
      },
      {
        speaker: 'Kokolot Jaro',
        role: 'Penjaga adat Kanekes',
        portrait: 'guide',
        text: 'Sebelum melangkah lebih jauh, pelajari dulu mana yang boleh dan mana yang tidak. Hutan punya aturan, dan tamu harus tahu diri.',
      },
    ],
  },
  {
    id: 'pandeglang',
    order: 3,
    label: 'Pandeglang',
    title: 'Pandeglang & Ujung Kulon',
    tagline: 'Rimba Terakhir Sang Badak Jawa',
    era: 'Warisan Dunia UNESCO, 1991',
    description:
      'Di ujung barat Pulau Jawa, Taman Nasional Ujung Kulon menjaga badak jawa — salah satu mamalia paling langka di bumi. Budaya pesisirnya hidup lewat rudat, golok, dan emping Menes.',
    accent: '#4E6E58',
    accentSoft: '#9DB98A',
    position: { x: 37, y: 74 },
    cardId: 'badak-jawa',
    minigame: 'memory',
    dialog: [
      {
        speaker: 'Narator',
        role: 'Ujung Kulon, pagi berkabut',
        portrait: 'narrator',
        text: 'Di Ujung Kulon, hutan hampir menyentuh laut. Kabut tipis bergantung di antara tajuk, dan dari kejauhan terdengar suara merak, nyaring seperti sesuatu yang dijaga baik-baik.',
      },
      {
        speaker: 'Kak Nia',
        role: 'Ranger Ujung Kulon',
        portrait: 'guide',
        text: 'Kau datang di jam yang tepat. Di balik hutan ini hidup salah satu makhluk paling langka di bumi—badak jawa.',
      },
      {
        speaker: 'Mela',
        role: 'Musafir muda',
        portrait: 'mela',
        text: 'Aki menulis, di sini hutan menjaga laut dan laut menjaga hutan. Aku belum pernah membaca kalimat seaneh itu.',
      },
      {
        speaker: 'Kak Nia',
        role: 'Ranger Ujung Kulon',
        portrait: 'guide',
        text: 'Mungkin justru karena tidak masuk akal, itu yang benar. Ujung Kulon ditetapkan sebagai Warisan Dunia pada 1991. Selain badak, ada owa jawa, merak hijau, dan ratusan tumbuhan yang hanya hidup di sini.',
      },
      {
        speaker: 'Aki Wira',
        role: 'Ingatan yang tinggal di batu dan lagu',
        portrait: 'aki',
        text: 'Kekayaan tidak selalu berupa emas, Mela. Kadang ia berjalan pelan dengan satu cula di hidungnya.',
      },
      {
        speaker: 'Kak Nia',
        role: 'Ranger Ujung Kulon',
        portrait: 'guide',
        text: 'Sebelum masuk lebih jauh, uji ingatanmu tentang penghuni rimba ini. Cocokkan pasangannya dengan tepat.',
      },
    ],
  },
  {
    id: 'cilegon',
    order: 4,
    label: 'Cilegon',
    title: 'Cilegon & Tangerang',
    tagline: 'Rentak Pesisir dari Merak ke Cisadane',
    era: 'Denyut kota pelabuhan',
    description:
      'Dari Pelabuhan Merak hingga Sungai Cisadane, budaya pesisir Banten bergerak bersama angin laut: Tari Cokek, Lenggang Cisadane, kerak telor, dan gipang Cilegon.',
    accent: '#B4552D',
    accentSoft: '#E0A08A',
    position: { x: 19, y: 43 },
    cardId: 'cokek',
    minigame: 'rhythm',
    dialog: [
      {
        speaker: 'Narator',
        role: 'Pelabuhan Merak, menjelang malam',
        portrait: 'narrator',
        text: 'Menjelang malam, Pelabuhan Merak berdenyut: lampu kapal, klakson yang saling menjawab, dan pedagang yang mulai menutup dagangan. Dari arah kampung, terdengar gendang.',
      },
      {
        speaker: 'Kang Darma',
        role: 'Pemandu pesisir',
        portrait: 'guide',
        text: 'Dari Merak sampai Cisadane, pesisir ini tidak pernah benar-benar tidur. Kapal, pedagang, dan bunyi musik bercampur jadi satu.',
      },
      {
        speaker: 'Mela',
        role: 'Musafir muda',
        portrait: 'mela',
        text: 'Aki bilang budaya Banten tidak pernah diam. Ia bergerak bersama angin laut.',
      },
      {
        speaker: 'Kang Darma',
        role: 'Pemandu pesisir',
        portrait: 'guide',
        text: 'Betul. Tangerang punya Tari Cokek dan Lenggang Cisadane; Cilegon punya gipang dan gerbang Merak. Semuanya punya rentak sendiri—termasuk orang-orangnya.',
      },
      {
        speaker: 'Aki Wira',
        role: 'Ingatan yang tinggal di batu dan lagu',
        portrait: 'aki',
        text: 'Dengarkan nadanya, Mela. Setiap wilayah adalah satu baris lagu. Kini saatnya kau menulis baris terakhir.',
      },
      {
        speaker: 'Kang Darma',
        role: 'Pemandu pesisir',
        portrait: 'guide',
        text: 'Ikuti irama gendang, gong, rebana, dan angklung. Jangan sampai salah langkah.',
      },
    ],
  },
];

export const PROLOGUE = {
  chapter: 'Prolog',
  title: 'Surat dari Aki',
  lines: [
    {
      speaker: 'Narator',
      role: 'Senja di pelabuhan lama',
      portrait: 'narrator',
      text: 'Senja turun di Pelabuhan Karangantu. Angin laut membawa bau garam, cengkih, dan sesuatu yang lebih tua dari keduanya. Di beranda rumah panggung, sebuah buku catatan tua terbuka sendiri, halamannya bergerak pelan seperti bernapas.',
    },
    {
      speaker: 'Mela',
      role: 'Musafir muda',
      portrait: 'mela',
      text: 'Buku Aki tinggal separuh. Halaman terakhirnya hanya berisi peta Banten dan satu kalimat yang ditulis miring: ‘Jangan hanya melihat—dengarkan.’',
    },
    {
      speaker: 'Aki Wira',
      role: 'Ingatan yang tinggal di batu dan lagu',
      portrait: 'aki',
      text: 'Kau datang juga, Mela. Aku menunggumu di setiap penjuru tanah ini, di setiap batu yang belum sempat kau sentuh.',
    },
    {
      speaker: 'Mela',
      role: 'Musafir muda',
      portrait: 'mela',
      text: 'Aki? Suaramu... seperti datang dari dalam buku.',
    },
    {
      speaker: 'Aki Wira',
      role: 'Ingatan yang tinggal di batu dan lagu',
      portrait: 'aki',
      text: 'Aku bukan lagi orang, Nak. Aku ingatan yang tinggal di batu, kain, dan lagu. Selama masih ada yang mendengar, aku tetap di sini.',
    },
    {
      speaker: 'Aki Wira',
      role: 'Ingatan yang tinggal di batu dan lagu',
      portrait: 'aki',
      text: 'Bawa buku itu. Empat penjuru Banten menunggu: Serang, Kanekes, Ujung Kulon, dan pesisir timur. Kumpulkan kisahnya, dan halaman yang kosong akan selesai dengan sendirinya.',
    },
    {
      speaker: 'Mela',
      role: 'Musafir muda',
      portrait: 'mela',
      text: 'Baik, Aki. Aku mulai dari Serang—dari gerbang kesultanan.',
    },
  ],
};

export const getRegion = (id) => REGIONS.find((region) => region.id === id) ?? null;

export const getNextRegionId = (completedRegions = []) => {
  for (const id of REGION_ORDER) {
    if (!completedRegions.includes(id)) return id;
  }
  return null;
};
