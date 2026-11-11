const INK = '#2B2620';
const PAPER = '#F7F5F0';
const ACCENT = '#B4552D';

const CHARACTERS = {
  arka: {
    skin: '#E7C09A',
    shade: '#D9AB80',
    hair: '#2A1F18',
    outfit: '#B4552D',
    collar: '#F3E7DF',
    hairStyle: 'bob',
    side: 'left',
  },
  aki: {
    skin: '#D8B48E',
    shade: '#C69F78',
    hair: '#EDE7DA',
    outfit: '#3C3A33',
    collar: '#D8D2C5',
    hairStyle: 'short',
    beard: true,
    ghost: true,
    side: 'right',
  },
  hasan: {
    skin: '#D4A87E',
    shade: '#C2946A',
    hair: '#6E5C4B',
    outfit: '#4E6E58',
    collar: '#F7F5F0',
    headwear: 'peci',
    beard: true,
  },
  jaro: {
    skin: '#C9976B',
    shade: '#B9875C',
    hair: '#2E241C',
    outfit: '#6E8B6B',
    collar: '#E8E3D8',
    headwear: 'ikat',
  },
  nia: {
    skin: '#D8AC82',
    shade: '#C69A70',
    hair: '#2B2118',
    outfit: '#3F5F4A',
    collar: '#E8E3D8',
    hairStyle: 'ponytail',
    headwear: 'cap',
  },
  darma: {
    skin: '#C88F62',
    shade: '#B67D52',
    hair: '#221A13',
    outfit: '#35597A',
    collar: '#E3DFD6',
    headwear: 'cap',
    beard: true,
  },
  lili: {
    skin: '#E2BD96',
    shade: '#D0A87F',
    hair: '#2A1F18',
    outfit: '#A85A34',
    collar: '#F3E7DF',
    hairStyle: 'bun',
    earrings: true,
  },
  mamat: {
    skin: '#C58A5D',
    shade: '#B3784C',
    hair: '#1F1712',
    outfit: '#5C6E7A',
    collar: '#E3DFD6',
    headwear: 'peci',
    beard: true,
  },
  umar: {
    skin: '#B87A4E',
    shade: '#A66A40',
    hair: '#2A2118',
    outfit: '#8C7A3F',
    collar: '#E8E3D8',
    headwear: 'straw',
    beard: true,
  },
  entis: {
    skin: '#B97A4E',
    shade: '#A76A40',
    hair: '#3A2C22',
    outfit: '#4F6B57',
    collar: '#E8E3D8',
    headwear: 'cap',
    beard: true,
  },
  guide: {
    skin: '#C9976B',
    shade: '#B9875C',
    hair: '#3A2C22',
    outfit: '#6E8B6B',
    collar: '#E8E3D8',
    headwear: 'peci',
  },
};

const SPEAKERS = {
  Arka: 'arka',
  'Aki Wira': 'aki',
  'Pak Hasan': 'hasan',
  'Kokolot Jaro': 'jaro',
  'Kak Nia': 'nia',
  'Kang Darma': 'darma',
  'Ibu Lili': 'lili',
  'Bang Mamat': 'mamat',
  'Pak Umar': 'umar',
  'Pak Entis': 'entis',
};

function backHair(character) {
  const { hair, hairStyle } = character;
  if (hairStyle === 'bob') {
    return (
      <path
        d="M126 300C120 214 160 176 210 176C260 176 300 214 294 300L300 386C280 402 258 392 254 370L248 300C240 252 228 240 210 240C192 240 180 252 172 300L166 370C162 392 140 402 120 386Z"
        fill={hair}
        stroke={INK}
        strokeWidth="3"
      />
    );
  }
  if (hairStyle === 'ponytail') {
    return (
      <>
        <path
          d="M270 250C320 270 330 330 306 380C296 340 286 300 270 280Z"
          fill={hair}
          stroke={INK}
          strokeWidth="3"
        />
        <path
          d="M134 280C134 210 168 182 210 182C252 182 286 210 286 280L282 312C270 280 250 256 210 256C170 256 150 280 138 312Z"
          fill={hair}
          stroke={INK}
          strokeWidth="3"
        />
      </>
    );
  }
  if (hairStyle === 'bun') {
    return (
      <>
        <circle cx="278" cy="218" r="28" fill={hair} stroke={INK} strokeWidth="3" />
        <path
          d="M134 280C134 210 168 182 210 182C252 182 286 210 286 280L282 312C270 280 250 256 210 256C170 256 150 280 138 312Z"
          fill={hair}
          stroke={INK}
          strokeWidth="3"
        />
      </>
    );
  }
  return (
    <path
      d="M134 280C134 210 168 182 210 182C252 182 286 210 286 280L282 312C270 280 250 256 210 256C170 256 150 280 138 312Z"
      fill={hair}
      stroke={INK}
      strokeWidth="3"
    />
  );
}

function frontHair(character) {
  const { hair, hairStyle } = character;
  if (hairStyle === 'bob') {
    return (
      <path
        d="M132 268C142 214 176 196 210 196C248 196 278 218 288 260C268 236 244 226 210 226C178 226 152 240 132 268Z"
        fill={hair}
        stroke={INK}
        strokeWidth="3"
      />
    );
  }
  return (
    <path
      d="M140 258C152 214 180 198 210 198C244 198 272 216 280 254C262 232 240 224 210 224C180 224 158 236 140 258Z"
      fill={hair}
      stroke={INK}
      strokeWidth="3"
    />
  );
}

function headwear(character) {
  const { headwear, outfit } = character;
  if (headwear === 'peci') {
    return (
      <g stroke={INK} strokeWidth="3">
        <path d="M142 216Q210 186 278 216L274 240Q210 214 146 240Z" fill="#2A2621" />
        <path d="M146 240Q210 214 274 240" fill="none" opacity="0.5" />
      </g>
    );
  }
  if (headwear === 'cap') {
    return (
      <g stroke={INK} strokeWidth="3">
        <path d="M140 224Q210 190 280 224L276 240Q210 212 144 240Z" fill={outfit} />
        <path d="M136 236Q210 214 284 236L292 248Q210 224 128 248Z" fill="#2A2621" />
      </g>
    );
  }
  if (headwear === 'straw') {
    return (
      <g stroke={INK} strokeWidth="3">
        <ellipse cx="210" cy="224" rx="106" ry="18" fill="#D9B96B" />
        <path d="M154 224Q210 172 266 224Z" fill="#E3C77F" />
        <path d="M156 224Q210 210 264 224" fill="none" opacity="0.55" />
      </g>
    );
  }
  if (headwear === 'ikat') {
    return (
      <g stroke={INK} strokeWidth="3">
        <path d="M142 232Q210 210 278 232L276 254Q210 232 144 254Z" fill={ACCENT} />
        <path d="M272 244L296 258L288 272L266 258Z" fill={ACCENT} />
        <path d="M150 238Q210 220 270 238" fill="none" opacity="0.45" />
      </g>
    );
  }
  return null;
}

function beard(character) {
  if (!character.beard) return null;
  return (
    <g fill={character.hair} stroke={INK} strokeWidth="2.5" opacity="0.95">
      <path d="M190 330Q210 320 230 330Q210 340 190 330Z" />
      <path d="M168 352C176 400 196 418 210 420C224 418 244 400 252 352C236 372 184 372 168 352Z" />
    </g>
  );
}

function spriteKey(speaker, portrait) {
  if (portrait === 'arka') return 'arka';
  if (portrait === 'aki') return 'aki';
  if (speaker === 'Pak Hasan') return 'hasan';
  if (portrait === 'guide') return 'tokoh';
  return null;
}

export function VNPortrait({ speaker, portrait, emotion = 'happy', className = '' }) {
  const key = SPEAKERS[speaker] ?? (portrait === 'arka' || portrait === 'aki' ? portrait : 'guide');
  const sprite = spriteKey(speaker, portrait);
  if (sprite) {
    return (
      <img
        src={`assets/sprites/${sprite}-${emotion}.webp`}
        alt={`Potret ${speaker ?? 'tokoh'}`}
        className={`${className} object-contain`}
        loading="eager"
        decoding="async"
      />
    );
  }
  const character = CHARACTERS[key] ?? CHARACTERS.guide;
  const { skin, shade, outfit, collar, ghost } = character;

  return (
    <svg
      viewBox="0 0 420 560"
      className={className}
      role="img"
      aria-label={`Potret ${speaker ?? 'tokoh'}`}
      style={{ filter: ghost ? 'drop-shadow(0 0 22px rgba(247,245,240,0.75))' : 'drop-shadow(0 18px 24px rgba(27,25,22,0.18))' }}
    >
      <ellipse cx="210" cy="552" rx="150" ry="12" fill={INK} opacity="0.1" />
      <g opacity={ghost ? 0.94 : 1}>
        {backHair(character)}

        <path
          d="M62 560C72 486 112 448 168 434L252 434C308 448 348 486 358 560Z"
          fill={outfit}
          stroke={INK}
          strokeWidth="3"
        />
        <path d="M168 434L210 500L252 434Z" fill={collar} stroke={INK} strokeWidth="2.5" />
        <path d="M168 434C182 466 194 486 210 500C226 486 238 466 252 434" fill="none" stroke={INK} strokeWidth="1.6" opacity="0.5" />
        <path d="M110 470C124 506 130 534 132 560M310 470C296 506 290 534 288 560" fill="none" stroke={INK} strokeWidth="1.6" opacity="0.35" />

        <path d="M182 372H238V430C238 446 224 456 210 456C196 456 182 446 182 430Z" fill={skin} stroke={INK} strokeWidth="2.5" />
        <path d="M182 400C192 414 228 414 238 400" fill="none" stroke={shade} strokeWidth="2" opacity="0.6" />

        <circle cx="130" cy="306" r="14" fill={skin} stroke={INK} strokeWidth="2.5" />
        <circle cx="290" cy="306" r="14" fill={skin} stroke={INK} strokeWidth="2.5" />

        <ellipse cx="210" cy="292" rx="78" ry="92" fill={skin} stroke={INK} strokeWidth="3" />
        <ellipse cx="184" cy="330" rx="11" ry="6" fill={ACCENT} opacity="0.16" />
        <ellipse cx="236" cy="330" rx="11" ry="6" fill={ACCENT} opacity="0.16" />

        {frontHair(character)}
        {headwear(character)}

        <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M164 278Q178 270 192 278" />
          <path d="M228 278Q242 270 256 278" />
        </g>
        <ellipse cx="180" cy="296" rx="5" ry="4.2" fill={INK} />
        <ellipse cx="240" cy="296" rx="5" ry="4.2" fill={INK} />
        <path d="M210 296Q205 314 212 318" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M194 336Q210 346 226 336" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />

        {beard(character)}

        {character.earrings ? (
          <g fill={ACCENT} stroke={INK} strokeWidth="1.5">
            <circle cx="128" cy="332" r="5" />
            <circle cx="292" cy="332" r="5" />
          </g>
        ) : null}
      </g>
    </svg>
  );
}

export function portraitSide(speaker, portrait) {
  const key = SPEAKERS[speaker] ?? (portrait === 'arka' || portrait === 'aki' ? portrait : 'guide');
  return CHARACTERS[key]?.side ?? 'right';
}
