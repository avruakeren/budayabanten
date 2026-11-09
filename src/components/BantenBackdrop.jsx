export function BantenBackdrop({ className = '' }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMaxYMax meet"
        className="h-full w-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Matahari Selat Sunda */}
        <g className="text-accent opacity-[0.27]">
          <circle cx="690" cy="300" r="132" />
        </g>

        {/* Burung pesisir */}
        <g className="text-ink opacity-[0.3]" strokeWidth="1.4">
          <path d="M 748 246 q 9 -9 18 0 q 9 -9 18 0" />
          <path d="M 806 214 q 7 -7 14 0 q 7 -7 14 0" />
          <path d="M 866 262 q 6 -6 12 0 q 6 -6 12 0" />
        </g>

        {/* Menara Masjid Agung Banten */}
        <g className="text-ink opacity-[0.3]">
          <path d="M 786 800 L 794 520 L 874 520 L 882 800" />
          <path d="M 770 800 H 898" />
          <path d="M 786 520 H 882" />
          <path d="M 786 504 H 882" />
          <path d="M 786 504 V 520 M 808 504 V 520 M 834 504 V 520 M 860 504 V 520 M 882 504 V 520" />
          <path d="M 782 504 L 818 470 L 850 470 L 886 504" />
          <path d="M 804 470 L 834 436 L 864 470" />
          <path d="M 834 436 V 404" />
          <circle cx="834" cy="396" r="8" />
          <path d="M 794 600 H 874 M 794 728 H 874" />
          <path d="M 816 708 V 642 A 18 18 0 0 1 852 642 V 708" />
          <path d="M 800 708 V 670 A 6 6 0 0 1 812 670 V 708" />
          <path d="M 856 708 V 670 A 6 6 0 0 1 868 670 V 708" />
        </g>

        {/* Rumah panggung Baduy */}
        <g className="text-ink opacity-[0.24]">
          <path d="M 190 802 C 215 772 240 752 272 742 C 304 752 329 772 354 802" />
          <path d="M 272 742 V 728" />
          <path d="M 205 802 V 850 H 339 V 802" />
          <path d="M 250 850 V 816 H 276 V 850" />
          <path d="M 296 818 H 322 V 842 H 296 Z" />
          <path d="M 214 850 V 888 M 272 850 V 888 M 330 850 V 888" />
          <path d="M 198 888 H 346" />
        </g>

        {/* Meriam Ki Amuk */}
        <g className="text-ink opacity-[0.27]">
          <path d="M 430 826 C 470 812 560 808 700 808" />
          <path d="M 430 854 C 470 868 560 872 700 872" />
          <ellipse cx="426" cy="840" rx="10" ry="15" />
          <path d="M 700 808 C 726 808 736 824 736 840 C 736 856 726 872 700 872" />
          <path d="M 736 840 H 748" />
          <circle cx="758" cy="840" r="10" />
          <path d="M 490 868 L 478 902 M 662 872 L 674 902 M 458 902 H 692" />
          <circle cx="500" cy="918" r="27" />
          <circle cx="660" cy="918" r="27" />
          <path d="M 500 891 V 945 M 473 918 H 527 M 481 899 L 519 937 M 519 899 L 481 937" />
          <path d="M 660 891 V 945 M 633 918 H 687 M 641 899 L 679 937 M 679 899 L 641 937" />
        </g>

        {/* Ombak Selat Sunda */}
        <g className="text-ink opacity-[0.18]" strokeWidth="1.4">
          <path d="M 20 906 q 26 -14 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0" />
          <path d="M 0 942 q 26 -14 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0" />
          <path d="M 44 978 q 26 -14 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0 t 52 0" />
        </g>
      </svg>
    </div>
  );
}
