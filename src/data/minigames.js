export const SERANG_HOTSPOTS = [
  {
    id: 'menara',
    label: 'Menara Masjid Agung',
    x: 52,
    y: 26,
    fact: 'Menara setinggi ±30 meter dibangun sekitar tahun 1632, sengaja menyerupai mercusuar agar kapal dagang dari Selat Sunda tahu ke mana harus berlabuh.',
  },
  {
    id: 'masjid',
    label: 'Masjid Agung Banten',
    x: 46,
    y: 44,
    fact: 'Masjid Agung Banten didirikan pada masa Kesultanan Banten. Arsitekturnya memadukan gaya Jawa, Tionghoa, dan Eropa — jejak pelabuhan yang terbuka pada dunia.',
  },
  {
    id: 'keraton',
    label: 'Keraton Surosowan',
    x: 28,
    y: 62,
    fact: 'Keraton Surosowan didirikan pada masa Sultan Maulana Hasanuddin dan menjadi pusat pemerintahan Kesultanan Banten. Kini tinggal reruntuhan bata, gapura, dan kolam.',
  },
  {
    id: 'kiamuk',
    label: 'Meriam Ki Amuk',
    x: 40,
    y: 74,
    fact: 'Ki Amuk adalah meriam perunggu legendaris dari abad ke-16 yang berdiri di depan Keraton Surosowan. Ia menjadi lambang kekuatan maritim Banten.',
  },
  {
    id: 'vihara',
    label: 'Vihara Avalokitesvara',
    x: 74,
    y: 58,
    fact: 'Vihara Avalokitesvara adalah jejak Pecinan Banten — kampung etnis Tionghoa yang tumbuh karena perdagangan rempah di pelabuhan Banten Lama.',
  },
];

export const SERANG_QUESTIONS = [
  {
    id: 'masjid',
    clue: 'Menara setinggi ±30 meter ini dibangun sekitar tahun 1632 dan menjadi penanda kapal yang masuk ke Selat Sunda. Bangunan apa ini?',
    glyph: 'tower',
    options: ['Masjid Agung Banten', 'Vihara Avalokitesvara', 'Benteng Speelwijk'],
    answer: 0,
    fact: 'Menara Masjid Agung Banten memang dirancang menyerupai mercusuar. Dari puncaknya, kapal dagang dapat melihat arah pelabuhan Banten Lama.',
  },
  {
    id: 'ki-amuk',
    clue: 'Meriam perunggu legendaris yang berdiri di depan Keraton Surosowan, konon berasal dari abad ke-16. Siapa namanya?',
    glyph: 'cannon',
    options: ['Si Jagur', 'Ki Amuk', 'Ki Jimat'],
    answer: 1,
    fact: 'Ki Amuk menjadi lambang kekuatan maritim Banten. Namanya sering dikaitkan dengan dentuman yang “mengamuk” saat pelabuhan diserang.',
  },
  {
    id: 'surosowan',
    clue: 'Bekas istana Kesultanan Banten yang kini tinggal reruntuhan bata, gapura, dan kolam. Bangunan apa ini?',
    glyph: 'palace',
    options: ['Keraton Surosowan', 'Keraton Kasepuhan', 'Istana Mangkunegaran'],
    answer: 0,
    fact: 'Keraton Surosowan didirikan pada masa Sultan Maulana Hasanuddin dan menjadi pusat pemerintahan Kesultanan Banten.',
  },
  {
    id: 'pecinan',
    clue: 'Kampung etnis Tionghoa yang tumbuh di sekitar pelabuhan Banten Lama dan meninggalkan jejak kelenteng serta arsitektur khas. Apa sebutannya?',
    glyph: 'lantern',
    options: ['Pecinan Banten', 'Kampung Arab', 'Kampung Bandan'],
    answer: 0,
    fact: 'Pecinan Banten tumbuh karena perdagangan rempah. Vihara Avalokitesvara menjadi salah satu jejaknya yang masih dapat dikunjungi.',
  },
];

export const BADUY_CARDS = [
  {
    id: 'kaki',
    text: 'Melepas alas kaki sebelum memasuki wilayah Baduy Dalam.',
    allowed: true,
    explanation: 'Benar. Melepas alas kaki adalah bentuk penghormatan saat memasuki tanah adat Baduy Dalam.',
  },
  {
    id: 'sampah',
    text: 'Membuang sampah ke aliran sungai karena airnya deras.',
    allowed: false,
    explanation: 'Tidak boleh. Sungai adalah bagian dari kehidupan adat; membuang sampah ke sungai melanggar penghormatan pada air dan lingkungan.',
  },
  {
    id: 'izin',
    text: 'Meminta izin kepada kokolot atau jaro sebelum masuk.',
    allowed: true,
    explanation: 'Benar. Tamu wajib meminta izin dan mengikuti arahan penjaga adat sebelum memasuki wilayah Kanekes.',
  },
  {
    id: 'sabun',
    text: 'Menggunakan sabun kimia di sungai adat.',
    allowed: false,
    explanation: 'Tidak boleh. Bahan kimia dapat mencemari air yang dipakai bersama. Gunakan air bersih secukupnya dan ikuti aturan setempat.',
  },
  {
    id: 'tenun',
    text: 'Membeli tenun langsung dari perajin warga.',
    allowed: true,
    explanation: 'Benar. Membeli langsung membantu perekonomian warga sekaligus menghargai kriya tradisional Baduy.',
  },
  {
    id: 'tebang',
    text: 'Menebang pohon di hutan leuweung untuk kayu bakar.',
    allowed: false,
    explanation: 'Tidak boleh. Hutan leuweung dilindungi adat; penebangan sembarangan merusak sumber air dan keseimbangan hidup masyarakat.',
  },
  {
    id: 'foto',
    text: 'Memotret warga Baduy Dalam tanpa izin.',
    allowed: false,
    explanation: 'Tidak boleh. Wilayah Baduy Dalam memiliki aturan ketat tentang dokumentasi. Selalu minta izin dan hormati penolakan.',
  },
  {
    id: 'pakaian',
    text: 'Berpakaian sopan dan tidak memakai perhiasan berlebihan.',
    allowed: true,
    explanation: 'Benar. Berpakaian sopan adalah bentuk penghormatan terhadap adat dan kenyamanan warga.',
  },
];

export const PANDEGLANG_PAIRS = [
  { id: 'badak', label: 'Badak Jawa', symbol: '🦏' },
  { id: 'owa', label: 'Owa Jawa', symbol: '🐒' },
  { id: 'rudat', label: 'Rudat Pandeglang', symbol: '🥁' },
  { id: 'golok', label: 'Golok Pandeglang', symbol: '🗡️' },
  { id: 'emping', label: 'Emping Menes', symbol: '🌾' },
  { id: 'lesung', label: 'Tanjung Lesung', symbol: '🏝️' },
];

export const CILEGON_PADS = [
  { id: 'gendang', label: 'Gendang', frequency: 261.63, color: '#B4552D', glow: 'rgba(180,85,45,0.55)' },
  { id: 'gong', label: 'Gong', frequency: 329.63, color: '#C9A227', glow: 'rgba(201,162,39,0.55)' },
  { id: 'rebana', label: 'Rebana', frequency: 392.0, color: '#35597A', glow: 'rgba(53,89,122,0.55)' },
  { id: 'angklung', label: 'Angklung', frequency: 440.0, color: '#4E6E58', glow: 'rgba(78,110,88,0.55)' },
];
