import { seededDots } from '@/lib/seededDots'

const DOT_COUNT = 30

const WINDOWS = [
  { transform: 'translate(40,58)', bob: 'bob', fill: '#1e3b2f', textFill: '#f0d9b0', label: 'Dine' },
  { transform: 'translate(390,48)', bob: 'bob b2', fill: '#15151b', textFill: '#ffc531', label: 'Times Black' },
  { transform: 'translate(26,212) scale(.86)', bob: 'bob b3', fill: '#0d8a83', textFill: '#fff', label: 'Aeonic' },
  { transform: 'translate(428,202) scale(.86)', bob: 'bob b4', fill: '#ff5a4e', textFill: '#fff', label: '1838 Reserve' },
] as const

const FLOW_PATHS = [
  'M125 178 C125 270 230 310 275 385',
  'M475 168 C475 260 370 310 325 385',
  'M105 318 C130 370 200 390 245 402',
  'M495 308 C470 360 400 390 355 402',
] as const

/** Four branded product windows wired into one shared platform core. */
export function HeroArt() {
  return (
    <svg
      className="art"
      viewBox="0 0 600 520"
      role="img"
      aria-label="Four branded product windows wired into one shared platform core"
    >
      <defs>
        <linearGradient id="gTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe6ff" />
        </linearGradient>
        <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b8c5ff" />
          <stop offset="1" stopColor="#8fa2ff" />
        </linearGradient>
        <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#93a6ff" />
          <stop offset="1" stopColor="#6a82ff" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0" stopColor="#ffc531" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffc531" stopOpacity="0" />
        </radialGradient>
        <g id="win">
          <rect width="170" height="118" rx="14" fill="#fff" />
          <rect width="170" height="24" rx="14" fill="#f1f3fb" />
          <rect y="14" width="170" height="10" fill="#f1f3fb" />
          <circle cx="14" cy="12" r="4" fill="#ff6159" />
          <circle cx="26" cy="12" r="4" fill="#ffbd2e" />
          <circle cx="38" cy="12" r="4" fill="#28c840" />
          <rect x="14" y="80" width="44" height="26" rx="6" fill="#eef1fb" />
          <rect x="63" y="80" width="44" height="26" rx="6" fill="#eef1fb" />
          <rect x="112" y="80" width="44" height="26" rx="6" fill="#eef1fb" />
        </g>
      </defs>

      <g>
        {seededDots(DOT_COUNT).map((dot, index) => (
          <circle key={index} cx={dot.cx} cy={dot.cy} r={dot.r} fill="#fff" opacity={dot.opacity} />
        ))}
      </g>

      <g transform="translate(0,10)">
        <ellipse cx="300" cy="405" rx="160" ry="74" fill="url(#glow)" opacity=".6" />
        <g fill="none" stroke="#ffc531" strokeWidth="3" strokeLinecap="round">
          {FLOW_PATHS.map((d) => (
            <path key={d} className="flowline" d={d} />
          ))}
        </g>
        <polygon points="180,430 300,490 300,510 180,450" fill="url(#gL)" />
        <polygon points="420,430 300,490 300,510 420,450" fill="url(#gR)" />
        <polygon points="300,370 420,430 300,490 180,430" fill="url(#gTop)" />
        <polygon points="300,392 376,430 300,468 224,430" fill="#2a4bff" />
        <text x="300" y="436" textAnchor="middle" fontWeight="800" fontSize="17" fill="#fff">
          core
        </text>
        {WINDOWS.map((win) => (
          <g key={win.label} className={win.bob}>
            <g transform={win.transform}>
              <use href="#win" />
              <rect x="14" y="34" width="142" height="38" rx="8" fill={win.fill} />
              <text x="24" y="58" fontWeight="800" fontSize="14" fill={win.textFill}>
                {win.label}
              </text>
            </g>
          </g>
        ))}
      </g>
    </svg>
  )
}
