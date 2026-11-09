export const CODEX_CARDS = [
  {
    id: 'ki-amuk',
    number: '01',
    name: 'Meriam Ki Amuk',
    category: 'Artefak',
    regionId: 'serang',
    regionLabel: 'Serang · Banten Lama',
    art: 'ki-amuk',
    short: 'Meriam perunggu legendaris dari abad ke-16.',
    lore:
      'Ki Amuk adalah meriam perunggu besar yang kini berdiri di depan Keraton Surosowan. Namanya berarti “yang mengamuk”, konon karena dentumannya pernah mengguncang teluk. Meriam ini menjadi simbol kekuatan maritim Kesultanan Banten.',
    facts: [
      'Berada di kawasan Banten Lama, dekat Keraton Surosowan.',
      'Diperkirakan berasal dari abad ke-16 hingga ke-17.',
      'Menjadi salah satu ikon wisata sejarah Provinsi Banten.',
    ],
  },
  {
    id: 'tenun-baduy',
    number: '02',
    name: 'Tenun Baduy',
    category: 'Kriya',
    regionId: 'lebak',
    regionLabel: 'Lebak · Kanekes',
    art: 'tenun-baduy',
    short: 'Kain tenun dengan pewarna alami dan makna adat.',
    lore:
      'Tenun Baduy dibuat dengan alat tenun gedogan sederhana dan pewarna alami dari tumbuhan. Motif garis dan kotaknya bukan sekadar hiasan: ia menandai identitas, status, dan penghormatan pada aturan adat Kanekes.',
    facts: [
      'Menggunakan pewarna alami seperti kulit kayu dan daun.',
      'Dikerjakan turun-temurun oleh perempuan Baduy.',
      'Motif dan warna berbeda antara Baduy Dalam dan Baduy Luar.',
    ],
  },
  {
    id: 'badak-jawa',
    number: '03',
    name: 'Badak Jawa',
    category: 'Alam',
    regionId: 'pandeglang',
    regionLabel: 'Pandeglang · Ujung Kulon',
    art: 'badak-jawa',
    short: 'Satu-satunya populasi badak jawa di dunia.',
    lore:
      'Badak jawa (Rhinoceros sondaicus) adalah salah satu mamalia paling langka di bumi. Populasinya hanya bertahan di Taman Nasional Ujung Kulon, yang ditetapkan sebagai Warisan Dunia UNESCO pada 1991.',
    facts: [
      'Memiliki satu cula pendek dan lipatan kulit khas.',
      'Ujung Kulon adalah habitat terakhirnya di dunia.',
      'Menjadi simbol konservasi alam Indonesia.',
    ],
  },
  {
    id: 'cokek',
    number: '04',
    name: 'Tari Cokek',
    category: 'Seni',
    regionId: 'cilegon',
    regionLabel: 'Cilegon · Tangerang',
    art: 'cokek',
    short: 'Tari pergaulan pesisir dengan selendang gemulai.',
    lore:
      'Tari Cokek tumbuh di masyarakat pesisir Tangerang dari perpaduan budaya Betawi dan Tionghoa. Penari bergerak lembut dengan selendang panjang, diiringi musik gambang kromong yang riang.',
    facts: [
      'Diiringi gambang kromong, musik khas Betawi-Tionghoa.',
      'Menggunakan selendang sebagai properti utama.',
      'Menjadi salah satu ikon seni pertunjukan Tangerang.',
    ],
  },
];

export const getCard = (id) => CODEX_CARDS.find((card) => card.id === id) ?? null;
