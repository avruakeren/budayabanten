import { REGIONS } from '../data/regions';

const INK = '#2B2620';
const LINE = '#B9B2A4';
const PAPER = '#F2EEE3';
const ACCENT = '#B4552D';

export function BantenMap({ completedRegions = [] }) {
  const points = REGIONS.map((region) => ({
    id: region.id,
    x: region.position.x * 10,
    y: region.position.y * 7,
  }));

  return (
    <svg
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="banten-land" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EDE8DB" />
          <stop offset="1" stopColor="#E1DAC9" />
        </linearGradient>
        <linearGradient id="banten-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E4EAE5" />
          <stop offset="1" stopColor="#D5E0DC" />
        </linearGradient>
      </defs>

      <rect width="1000" height="700" fill="url(#banten-sea)" />

      <g stroke="#A9BDB8" strokeWidth="1.4" fill="none" opacity="0.5">
        <path d="M0 90q30-12 60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0" />
        <path d="M-20 148q30-12 60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0" />
        <path d="M0 560q30-12 60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0" />
        <path d="M-20 610q30-12 60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0t60 0" />
      </g>

      <ellipse cx="104" cy="292" rx="16" ry="10" fill={PAPER} stroke={LINE} strokeWidth="1.5" />
      <ellipse cx="132" cy="344" rx="10" ry="7" fill={PAPER} stroke={LINE} strokeWidth="1.5" />
      <ellipse cx="86" cy="394" rx="8" ry="5" fill={PAPER} stroke={LINE} strokeWidth="1.5" />

      <path
        d="M760 96C690 92 620 108 552 132C470 162 392 182 318 210C250 236 202 280 176 334L150 392C138 426 142 458 160 488L190 536C238 584 300 610 372 624L500 642C590 648 676 628 744 584C810 540 852 480 868 414L880 344C888 288 874 238 848 200C824 164 796 126 760 96Z"
        fill="url(#banten-land)"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M300 240C380 210 470 200 560 214C650 228 720 262 760 320C790 364 790 420 766 470C730 540 660 580 580 600C500 618 420 610 356 580C300 554 262 514 250 466C238 418 254 372 280 336Z"
        fill="none"
        stroke={LINE}
        strokeWidth="1.4"
        strokeDasharray="4 8"
        opacity="0.65"
      />
      <path
        d="M760 300C700 340 680 380 690 430C698 472 730 500 750 540"
        fill="none"
        stroke="#A9C0BE"
        strokeWidth="7"
        opacity="0.55"
        strokeLinecap="round"
      />

      <g fill="#D3CDBD" stroke={LINE} strokeWidth="1.4" opacity="0.9">
        <path d="M402 452L430 404L458 452Z" />
        <path d="M452 466L476 426L500 466Z" />
        <path d="M600 470L626 424L652 470Z" />
      </g>

      <g stroke={LINE} strokeWidth="1.3" fill="none" opacity="0.55">
        <path d="M214 510q26-13 52 0" />
        <path d="M278 538q20-10 40 0" />
        <path d="M710 500q22-11 44 0" />
      </g>

      {points.slice(0, -1).map((point, index) => {
        const next = points[index + 1];
        const done = completedRegions.includes(point.id);
        return (
          <line
            key={`${point.id}-${next.id}`}
            x1={point.x}
            y1={point.y}
            x2={next.x}
            y2={next.y}
            stroke={done ? ACCENT : LINE}
            strokeWidth={done ? 2.2 : 1.6}
            strokeDasharray={done ? undefined : '5 9'}
            strokeLinecap="round"
            opacity={done ? 0.7 : 0.75}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}

      <text x="626" y="62" fill={INK} opacity="0.32" fontSize="13" letterSpacing="5" fontFamily="'Plus Jakarta Sans', sans-serif">
        LAUT JAWA
      </text>
      <text
        x="118"
        y="212"
        fill={INK}
        opacity="0.3"
        fontSize="12"
        letterSpacing="4"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        transform="rotate(-72 118 212)"
      >
        SELAT SUNDA
      </text>
      <text x="250" y="668" fill={INK} opacity="0.28" fontSize="12" letterSpacing="4" fontFamily="'Plus Jakarta Sans', sans-serif">
        SAMUDRA HINDIA
      </text>
      <text x="500" y="378" fill={INK} opacity="0.08" fontSize="64" letterSpacing="18" textAnchor="middle" fontFamily="Georgia, serif">
        BANTEN
      </text>

      <g transform="translate(906 128)" stroke={INK} strokeWidth="1.4" fill="none" opacity="0.32">
        <circle r="25" />
        <path d="M0 -32V32M-32 0H32" />
        <path d="M0 -18L6 0L0 18L-6 0Z" fill={ACCENT} stroke="none" />
      </g>
    </svg>
  );
}
