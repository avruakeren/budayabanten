const INK = '#2B2620';
const PAPER = '#F7F5F0';
const LINE = '#C9C1B1';
const ACCENT = '#B4552D';
const OLIVE = '#6E8B6B';
const GOLD = '#C9A227';
const SEA = '#B9CDCB';

const SKIES = {
  serang: ['#F8F3E6', '#EAE2D2'],
  'serang-kab': ['#F8F3E6', '#E8E2CF'],
  lebak: ['#F4F1E6', '#DFE5D8'],
  pandeglang: ['#F2F1E5', '#DCE4D6'],
  cilegon: ['#F8E8D8', '#EFD3BE'],
  tangerang: ['#F8F1E4', '#EADCCB'],
  tangsel: ['#F4F0E7', '#E2DED4'],
  'tangerang-kab': ['#F7F2E4', '#E4E4D2'],
};

function Sun({ cx = 1200, cy = 220, r = 86, opacity = 0.55 }) {
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r * 1.9} fill={GOLD} opacity="0.12" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={ACCENT} strokeWidth="2" />
    </g>
  );
}

function Bird({ x = 0, y = 0, scale = 1, opacity = 0.55 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" opacity={opacity}>
      <path d="M0 0Q10-10 20 0Q30-10 40 0" />
    </g>
  );
}

function Birds({ x = 900, y = 180, scale = 1 }) {
  return (
    <g>
      <Bird x={x} y={y} scale={scale} />
      <Bird x={x + 70} y={y - 38} scale={scale * 0.8} opacity={0.42} />
      <Bird x={x + 128} y={y + 14} scale={scale * 0.65} opacity={0.38} />
    </g>
  );
}

function Palm({ x, y, scale = 1, flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.62">
      <path d="M0 0C4-58 2-118-6-178" />
      <path d="M-6-178C-52-212-96-210-128-186" />
      <path d="M-6-178C34-224 78-228 112-202" />
      <path d="M-6-178C-38-230-30-270-8-292" />
      <path d="M-6-178C18-208 34-218 52-222" />
      <path d="M-128-186C-104-206-76-210-58-204" opacity="0.5" />
      <path d="M112-202C86-222 58-226 40-218" opacity="0.5" />
    </g>
  );
}

function Tree({ x, y, scale = 1, opacity = 0.5 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={INK} strokeWidth="2.5" opacity={opacity}>
      <path d="M0 0V-58" />
      <circle cx="0" cy="-92" r="42" fill="#CBD8C2" />
      <circle cx="-32" cy="-76" r="30" fill="#C3D1B8" />
      <circle cx="32" cy="-78" r="32" fill="#C3D1B8" />
      <circle cx="0" cy="-124" r="28" fill="#D2DEC9" />
    </g>
  );
}

function StiltHouse({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} stroke={INK} strokeWidth="2.6" strokeLinejoin="round" fill="none" opacity="0.72">
      <path d="M-94 0C-72-34-44-56 0-66C44-56 72-34 94 0" />
      <path d="M-70 0V54H70V0" fill={PAPER} />
      <path d="M-30 54V18H30V54" />
      <path d="M40 22H60V42H40Z" />
      <path d="M-58 54V98M0 54V98M58 54V98" />
      <path d="M-74 98H74" />
    </g>
  );
}

function Waves({ y = 720, opacity = 0.35, color = LINE }) {
  return (
    <g stroke={color} strokeWidth="2" fill="none" opacity={opacity} strokeLinecap="round">
      <path d={`M0 ${y}q34-16 68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0`} />
      <path d={`M-40 ${y + 30}q34-16 68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0t68 0`} />
    </g>
  );
}

function SerangScene() {
  return (
    <>
      <Sun cx={1220} cy={230} r={92} />
      <Birds x={850} y={190} />
      <path d="M0 610C220 552 410 570 600 602C820 638 1080 590 1280 596C1420 600 1520 588 1600 596V900H0Z" fill="#DCE3DC" stroke={LINE} strokeWidth="2" />
      <path d="M0 648C220 612 420 626 620 650C840 676 1080 634 1300 646C1440 654 1530 646 1600 650V900H0Z" fill="#CFDCD8" />
      <Waves y={690} opacity={0.4} />
      <Palm x={250} y={744} scale={1.25} flip />
      <g stroke={INK} strokeWidth="3" fill={PAPER} strokeLinejoin="round" opacity="0.92">
        <path d="M1140 746L1152 382H1268L1280 746Z" />
        <path d="M1126 746H1294" />
        <path d="M1140 382H1280" />
        <path d="M1130 360H1290" />
        <path d="M1130 360L1168 320H1252L1290 360" />
        <path d="M1168 320L1210 286L1252 320" />
        <path d="M1210 286V250" />
        <circle cx="1210" cy="242" r="9" />
        <path d="M1152 474H1268M1152 622H1268" />
        <path d="M1184 722V626A26 26 0 0 1 1236 626V722" />
        <path d="M1166 700V668A8 8 0 0 1 1182 668V700M1238 700V668A8 8 0 0 1 1254 668V700" />
      </g>
      <g stroke={INK} strokeWidth="3" fill="#D8D0C0" opacity="0.9">
        <path d="M268 660C366 644 504 642 646 650" />
        <path d="M268 692C366 708 504 710 646 698" />
        <ellipse cx="262" cy="676" rx="11" ry="17" fill={PAPER} />
        <path d="M646 650C670 650 680 664 680 674C680 684 670 698 646 698" />
        <path d="M680 674H692" />
        <circle cx="702" cy="674" r="10" />
        <path d="M356 702L346 732M520 704L530 732M326 736H552" />
        <circle cx="382" cy="748" r="26" fill={PAPER} />
        <circle cx="520" cy="748" r="26" fill={PAPER} />
        <path d="M382 722V774M356 748H408M364 730L400 766M400 730L364 766" />
        <path d="M520 722V774M494 748H546M502 730L538 766M538 730L502 766" />
      </g>
    </>
  );
}

function SerangKabScene() {
  return (
    <>
      <Sun cx={1240} cy={196} r={82} />
      <Birds x={980} y={176} />
      <path d="M0 626C220 590 420 606 620 620C840 636 1060 596 1280 606C1420 612 1530 602 1600 608V900H0Z" fill="#DCE6CE" stroke={LINE} strokeWidth="2" />
      <path d="M380 620L720 250L1060 620Z" fill="#D6DFC8" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M720 250C700 352 676 474 640 620M720 250C746 358 770 474 802 620" fill="none" stroke={INK} strokeWidth="2" opacity="0.24" />
      <path d="M0 676C220 640 440 662 660 682C900 704 1120 656 1360 668C1460 674 1540 666 1600 670V900H0Z" fill="#D3E0C4" />
      <g stroke="#93A87B" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M60 722q22-12 44 0M180 746q22-12 44 0M300 716q22-12 44 0M430 754q22-12 44 0M560 726q22-12 44 0M690 762q22-12 44 0M820 736q22-12 44 0M950 766q22-12 44 0M1080 728q22-12 44 0M1210 756q22-12 44 0M1340 724q22-12 44 0M1470 752q22-12 44 0" />
        <path d="M110 790q22-12 44 0M250 808q22-12 44 0M400 780q22-12 44 0M540 814q22-12 44 0M680 786q22-12 44 0M830 818q22-12 44 0M980 790q22-12 44 0M1130 816q22-12 44 0M1280 784q22-12 44 0M1430 810q22-12 44 0" />
      </g>
      <g stroke={INK} strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M1156 694V622M1156 636L1196 614M1156 650L1124 630" />
        <path d="M1132 620L1156 598L1184 620Z" fill={PAPER} />
        <path d="M1156 694L1180 712" />
        <circle cx="1156" cy="704" r="5" fill={INK} />
      </g>
      <g stroke={INK} strokeWidth="2.6" fill="#C8BEAC" opacity="0.55">
        <ellipse cx="300" cy="704" rx="70" ry="30" />
        <path d="M238 700C226 690 214 690 204 700L222 712Z" />
        <path d="M234 678L222 660M250 676L246 654" />
        <path d="M262 728V758M306 732V762M352 726V756" />
      </g>
      <Palm x={1480} y={760} scale={1.1} flip />
    </>
  );
}

function LebakScene() {
  return (
    <>
      <Sun cx={1260} cy={200} r={76} opacity={0.38} />
      <Birds x={1040} y={180} />
      <path d="M0 610C190 508 390 528 580 596C760 660 940 540 1140 566C1320 590 1480 548 1600 574V900H0Z" fill="#DDE5D2" stroke={LINE} strokeWidth="2" />
      <path d="M0 674C220 614 430 650 640 680C860 712 1060 650 1280 662C1420 670 1520 656 1600 662V900H0Z" fill="#CAD9BE" />
      <Tree x={180} y={720} scale={1.1} opacity={0.6} />
      <Tree x={320} y={750} scale={0.8} opacity={0.5} />
      <Tree x={420} y={700} scale={0.7} opacity={0.45} />
      <Tree x={1180} y={726} scale={1.2} opacity={0.55} />
      <Tree x={1340} y={756} scale={0.9} opacity={0.5} />
      <Tree x={1460} y={708} scale={0.75} opacity={0.45} />
      <StiltHouse x={770} y={600} scale={1.5} />
      <path d="M700 900C760 820 800 760 820 700C840 640 820 600 780 580" fill="none" stroke={INK} strokeWidth="3" opacity="0.2" strokeLinecap="round" />
      <Palm x={1080} y={760} scale={1} flip />
      <g stroke={PAPER} strokeWidth="9" fill="none" opacity="0.5" strokeLinecap="round">
        <path d="M220 560Q420 528 620 560Q820 592 1020 558" />
        <path d="M80 636Q300 606 520 636Q740 666 960 632" />
      </g>
    </>
  );
}

function PandeglangScene() {
  return (
    <>
      <path d="M0 590C200 500 400 540 600 590C820 644 1040 540 1240 566C1400 586 1520 550 1600 570V900H0Z" fill="#D7E0C9" />
      <path d="M0 676C240 620 460 660 680 690C900 720 1120 650 1340 668C1460 678 1540 666 1600 670V900H0Z" fill="#C4D3B6" />
      <g fill="#AFC4A2" stroke={INK} strokeWidth="2.4" opacity="0.45">
        <path d="M0 0C190 26 282 138 250 320C128 262 40 154 0 0Z" />
        <path d="M1600 0C1420 30 1324 146 1356 328C1480 266 1570 156 1600 0Z" />
        <path d="M0 900C150 760 280 736 420 780C300 860 160 900 0 900Z" />
        <path d="M1600 900C1450 760 1320 736 1180 780C1300 860 1440 900 1600 900Z" />
      </g>
      <g stroke={INK} strokeWidth="1.4" opacity="0.25" fill="none">
        <path d="M0 0C120 90 190 190 250 320M250 320C190 250 120 190 0 0M1356 328C1420 240 1500 140 1600 0M1356 328C1450 250 1530 150 1600 40" />
      </g>
      <g fill="#8A9A86" stroke={INK} strokeWidth="3" strokeLinejoin="round" opacity="0.92">
        <ellipse cx="980" cy="590" rx="190" ry="98" />
        <path d="M812 588C776 560 732 558 700 584C732 620 772 632 812 626Z" />
        <path d="M700 584C686 570 674 548 680 532L704 552L712 574Z" />
        <path d="M1130 540C1168 528 1198 534 1210 550C1186 552 1160 558 1140 568Z" />
        <path d="M882 676V754M1062 678V756M930 684V744M1018 686V746" />
        <path d="M684 574L662 558" strokeWidth="3" />
      </g>
      <g stroke={PAPER} strokeWidth="10" fill="none" opacity="0.52" strokeLinecap="round">
        <path d="M0 502Q240 474 480 502Q720 530 960 500Q1200 470 1440 500Q1520 510 1600 502" />
        <path d="M60 618Q310 588 560 618Q810 648 1060 616Q1310 584 1560 616" />
      </g>
      <Palm x={1560} y={780} scale={1.3} flip />
    </>
  );
}

function CilegonScene() {
  return (
    <>
      <Sun cx={1240} cy={424} r={104} opacity={0.7} />
      <Birds x={760} y={220} />
      <path d="M0 566C220 544 430 560 640 566C860 572 1080 548 1300 556C1430 560 1530 554 1600 558V900H0Z" fill="#DCCFBE" />
      <path d="M0 590C220 570 430 586 640 590C860 596 1080 572 1300 580C1430 584 1530 578 1600 582V900H0Z" fill={SEA} opacity="0.82" />
      <Waves y={636} opacity={0.45} />
      <Waves y={690} opacity={0.3} />
      <g stroke={INK} strokeWidth="3" fill={PAPER} strokeLinejoin="round" opacity="0.9">
        <path d="M500 620L560 552H900L980 620Z" />
        <path d="M590 552V506H780V552" />
        <path d="M610 506V478H700V506" />
        <path d="M700 478V448H736V478" />
        <path d="M566 584H966" />
        <path d="M620 540H870" />
        <path d="M606 528H640V548H606ZM662 528H696V548H662ZM718 528H752V548H718Z" />
        <path d="M930 490V446M930 446H960M930 470H958" />
      </g>
      <g stroke={INK} strokeWidth="3" fill="none" opacity="0.65" strokeLinecap="round">
        <path d="M1180 646V430M1180 430H1320M1320 430V492M1320 492H1290M1320 462H1300" />
        <path d="M1380 646V450M1380 450H1512M1512 450V508M1512 508H1484M1512 478H1494" />
        <path d="M1100 646H1560" />
      </g>
      <g stroke={INK} strokeWidth="3" fill="#CFC7B7" opacity="0.7">
        <path d="M80 820H1520" />
        <path d="M180 820V760M420 820V770M1180 820V764M1460 820V772" />
        <circle cx="180" cy="752" r="10" />
        <circle cx="420" cy="762" r="10" />
        <circle cx="1180" cy="756" r="10" />
        <circle cx="1460" cy="764" r="10" />
      </g>
    </>
  );
}

function TangerangScene() {
  return (
    <>
      <Sun cx={1240} cy={180} r={76} />
      <Birds x={1010} y={166} />
      <path d="M700 384C648 508 548 640 430 900H1200C1090 690 900 536 804 408Z" fill={SEA} opacity="0.85" />
      <path d="M700 384C648 508 548 640 430 900M804 408C900 536 1090 690 1200 900" fill="none" stroke={INK} strokeWidth="3" opacity="0.3" />
      <g stroke={INK} strokeWidth="2.6" fill={PAPER} opacity="0.85" strokeLinejoin="round">
        <path d="M80 470H520V650H80Z" />
        <path d="M60 470L120 412H500L540 470Z" />
        <path d="M118 512H180V556H118ZM214 512H276V556H214ZM310 512H372V556H310ZM406 512H468V556H406Z" />
        <path d="M100 604H500" />
        <path d="M980 450H1500V650H980Z" />
        <path d="M960 450L1020 394H1460L1520 450Z" />
        <path d="M1018 492H1080V536H1018ZM1114 492H1176V536H1114ZM1210 492H1272V536H1210ZM1306 492H1368V536H1306ZM1402 492H1464V536H1402Z" />
        <path d="M1000 604H1480" />
      </g>
      <g stroke={INK} strokeWidth="3" fill="none" opacity="0.55">
        <path d="M620 496H880M620 496V530M880 496V530" />
        <path d="M620 512Q700 552 750 512Q800 472 880 512" />
        <path d="M500 650H1180" />
      </g>
      <g stroke={INK} strokeWidth="2.5" fill="none" opacity="0.5">
        <path d="M120 330Q400 366 680 340Q960 314 1240 342Q1400 358 1520 336" />
        <g fill={ACCENT} stroke={ACCENT}>
          <circle cx="240" cy="350" r="9" />
          <circle cx="420" cy="354" r="9" />
          <circle cx="600" cy="340" r="9" />
          <circle cx="780" cy="328" r="9" />
          <circle cx="960" cy="326" r="9" />
          <circle cx="1140" cy="334" r="9" />
          <circle cx="1320" cy="346" r="9" />
        </g>
      </g>
      <g stroke={INK} strokeWidth="3" fill="#D8D0C0" opacity="0.75">
        <path d="M650 744C690 726 760 726 800 744C780 766 670 766 650 744Z" />
        <path d="M730 726V690M730 690L780 708" />
      </g>
      <Palm x={1540} y={790} scale={1.1} flip />
    </>
  );
}

function TangselScene() {
  return (
    <>
      <Sun cx={1280} cy={190} r={74} opacity={0.4} />
      <g fill="#D7D9D0" stroke={LINE} strokeWidth="2">
        <path d="M80 620V436H190V620Z" />
        <path d="M210 620V372H330V620Z" />
        <path d="M350 620V470H450V620Z" />
        <path d="M470 620V410H570V620Z" />
        <path d="M1030 620V388H1140V620Z" />
        <path d="M1160 620V450H1260V620Z" />
        <path d="M1280 620V350H1400V620Z" />
        <path d="M1420 620V460H1520V620Z" />
      </g>
      <g stroke={LINE} strokeWidth="2" opacity="0.7">
        <path d="M106 470H164M106 506H164M106 542H164M238 410H302M238 446H302M238 482H302M378 500H422M378 532H422M498 448H542M498 484H542M1058 426H1112M1058 462H1112M1058 498H1112M1188 486H1232M1308 396H1372M1308 432H1372M1448 496H1492" />
      </g>
      <g stroke={INK} strokeWidth="2.6" fill={PAPER} opacity="0.92" strokeLinejoin="round">
        <path d="M430 720H1170V780H430Z" />
        <path d="M470 720L520 640H1080L1130 720Z" fill="#E7E2D6" />
        <path d="M520 640V606H1080V640" />
        <path d="M560 606H1040" />
        <path d="M600 700H700V720H600Z" />
        <path d="M760 690H860V720H760Z" />
      </g>
      <g stroke={INK} strokeWidth="2.4" fill="none" opacity="0.75">
        <path d="M560 668H620M640 668H700M720 668H780M800 668H860M880 668H940M960 668H1020" />
        <circle cx="760" cy="690" r="24" />
        <circle cx="860" cy="690" r="24" />
        <circle cx="960" cy="690" r="20" />
        <path d="M764 666V642M856 666V642M960 670V650" />
      </g>
      <path d="M0 780C220 744 440 766 660 780C880 794 1100 760 1320 772C1440 778 1530 770 1600 774V900H0Z" fill="#D8D4C6" />
      <g stroke={INK} strokeWidth="2" fill="none" opacity="0.55">
        <path d="M80 322Q360 360 640 334Q920 308 1200 338Q1400 358 1540 330" />
        <g fill={GOLD} stroke={GOLD}>
          <circle cx="210" cy="340" r="6" />
          <circle cx="390" cy="348" r="6" />
          <circle cx="570" cy="336" r="6" />
          <circle cx="750" cy="322" r="6" />
          <circle cx="930" cy="318" r="6" />
          <circle cx="1110" cy="326" r="6" />
          <circle cx="1290" cy="342" r="6" />
          <circle cx="1470" cy="334" r="6" />
        </g>
      </g>
      <Tree x={150} y={800} scale={1} opacity={0.45} />
      <Tree x={1420} y={804} scale={1.1} opacity={0.45} />
    </>
  );
}

function TangerangKabScene() {
  return (
    <>
      <Sun cx={1260} cy={188} r={80} />
      <Birds x={960} y={176} />
      <path d="M0 610C220 560 400 584 580 606C800 632 1020 566 1240 584C1400 598 1520 580 1600 586V900H0Z" fill="#DDE4D2" />
      <path d="M0 646H1600V900H0Z" fill="#D2DCC9" />
      <g stroke={INK} strokeWidth="2.6" fill="#C9DAD6" opacity="0.9">
        <path d="M20 666H380L350 864H0V666Z" />
        <path d="M410 666H770L800 864H380V666Z" />
        <path d="M820 666H1180L1210 864H830V666Z" />
        <path d="M1230 666H1580V864H1240Z" />
      </g>
      <g stroke={PAPER} strokeWidth="3" fill="none" opacity="0.55" strokeLinecap="round">
        <path d="M40 704Q190 690 340 704M440 704Q590 690 740 704M850 704Q1000 690 1150 704M1260 704Q1410 690 1560 704" />
        <path d="M50 742Q190 728 330 742M450 742Q590 728 730 742M860 742Q1000 728 1140 742M1270 742Q1410 728 1550 742" />
      </g>
      <g stroke={INK} strokeWidth="2.6" fill="none" opacity="0.55">
        <path d="M0 666H1600M400 666V864M810 666V864M1220 666V864" />
        <path d="M0 730H1600M0 800H1600" opacity="0.35" />
      </g>
      <g stroke={INK} strokeWidth="2.8" fill={PAPER} opacity="0.85" strokeLinejoin="round">
        <path d="M1130 640L1180 584H1300L1350 640Z" />
        <path d="M1170 640V600H1260V640" />
        <path d="M1160 584L1215 544L1270 584" />
        <path d="M1160 640V680M1320 640V680" />
      </g>
      <Palm x={170} y={720} scale={1.3} />
      <Palm x={1470} y={740} scale={1.15} flip />
      <Tree x={560} y={650} scale={0.7} opacity={0.4} />
      <Tree x={980} y={646} scale={0.6} opacity={0.35} />
    </>
  );
}

const SCENES = {
  serang: SerangScene,
  'serang-kab': SerangKabScene,
  lebak: LebakScene,
  pandeglang: PandeglangScene,
  cilegon: CilegonScene,
  tangerang: TangerangScene,
  tangsel: TangselScene,
  'tangerang-kab': TangerangKabScene,
};

export function VNBackground({ region }) {
  const sky = SKIES[region?.id] ?? SKIES.serang;
  const Scene = SCENES[region?.id] ?? SerangScene;

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="1" stopColor={sky[1]} />
        </linearGradient>
        <linearGradient id="vn-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PAPER} stopOpacity="0" />
          <stop offset="1" stopColor={INK} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#vn-sky)" />
      <Scene />
      <rect width="1600" height="900" fill="url(#vn-bottom)" />
    </svg>
  );
}
