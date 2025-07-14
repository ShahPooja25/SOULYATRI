import type { SVGAttributes } from "react";

export default function SoulYatriLogo(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 95"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Lotus + Swirl */}
      <g transform="translate(0,10)">
        <path
          d="M30 40 C25 30, 20 20, 30 10 C40 20, 35 30, 30 40"
          fill="#00B3B3"
        />
        <path
          d="M30 40 C35 30, 40 20, 50 30 C40 40, 35 45, 30 40"
          fill="#f97316"
        />
        <circle cx="30" cy="40" r="4" fill="#fff" />
        <path
          d="M30 40 Q33 36 36 40 Q33 44 30 40"
          fill="#00B3B3"
        />
      </g>

      {/* Text */}
      <text
        x="70"
        y="55"
        fontFamily="Georgia, serif"
        fontSize="30"
        fill="#f97316"
      >
        Soul Yatri
      </text>
    </svg>
  );
}
