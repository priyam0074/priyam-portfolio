import type { CaseKind } from '@/data/cases'

const TENANT_COLORS = ['#6c3cf0', '#15151b', '#0d8a83', '#ff5a4e'] as const
const DS_TOKEN_COLORS = ['#ff5a4e', '#ffc531', '#2a4bff', '#14b892', '#0f1530'] as const
const DS_BRAND_APPS = [
  ['Prime', '#6c3cf0'],
  ['Black', '#15151b'],
  ['Aeonic', '#0d8a83'],
  ['Reserve', '#ff5a4e'],
] as const
const PIPELINE = [
  { label: 'Figma', caption: 'Design', color: '#ff5a4e' },
  { label: 'MCP', caption: 'Context', color: '#2a4bff' },
  { label: 'Cases', caption: 'Generate', color: '#14b892' },
  { label: 'Review', caption: 'You approve', color: '#ffc531' },
  { label: 'Jira', caption: 'Push', color: '#0f1530' },
] as const
const AI_FIRST_CENTRE = 90
const AI_NODE_SPACING = 105
const AI_NODE_Y = 62
const AI_NODE_HEIGHT = 66
const OBS_LINE = 'M40 50 L120 60 L200 45 L260 70 L320 110 L400 130 L480 145 L560 150'

function Platform() {
  return (
    <svg viewBox="0 0 600 200" aria-hidden="true">
      <rect width="600" height="200" fill="#eef1ff" />
      <polygon points="300,120 420,160 300,200 180,160" fill="#2a4bff" />
      <polygon points="300,95 400,128 300,161 200,128" fill="#5a78ff" />
      <polygon points="300,70 380,96 300,122 220,96" fill="#9fb0ff" />
      {TENANT_COLORS.map((color, i) => (
        <g key={color} transform={`translate(${40 + i * 140},${i % 2 ? 18 : 30})`}>
          <rect width="100" height="58" rx="10" fill="#fff" />
          <rect x="8" y="16" width="84" height="18" rx="5" fill={color} />
          <rect x="8" y="40" width="40" height="10" rx="3" fill="#e2e6f4" />
        </g>
      ))}
    </svg>
  )
}

function DesignSystem() {
  return (
    <svg viewBox="0 0 600 200" aria-hidden="true">
      <rect width="600" height="200" fill="#fff1ef" />

      {[
        ['1  TOKENS', 24],
        ['2  COMPONENTS', 214],
        ['3  EVERY BRAND APP', 412],
      ].map(([label, x]) => (
        <text key={label} x={x} y="30" fontSize="11" fontWeight="800" letterSpacing="1" fill="#8a3a2e">
          {label}
        </text>
      ))}

      {/* 1. Tokens: colour, type, spacing */}
      <rect x="24" y="44" width="164" height="132" rx="14" fill="#fff" />
      {DS_TOKEN_COLORS.map((color, i) => (
        <circle key={color} cx={44 + i * 28} cy="70" r="10" fill={color} />
      ))}
      <text x="36" y="118" fontSize="36" fontWeight="800" fill="#0f1530">
        Aa
      </text>
      <rect x="92" y="98" width="72" height="8" rx="3" fill="#0f1530" />
      <rect x="92" y="112" width="54" height="6" rx="3" fill="#58607d" />
      <rect x="92" y="124" width="38" height="5" rx="2.5" fill="#9aa2c0" />
      {[8, 16, 24, 32, 40].map((w, i) => (
        <rect key={w} x={36 + i * 28} y="142" width={w} height="8" rx="2" fill="#ffc531" />
      ))}
      <text x="36" y="168" fontSize="10" fontWeight="600" fill="#58607d">
        Colour · Type · Spacing
      </text>

      {/* 2. Components built from the tokens */}
      <rect x="214" y="44" width="164" height="132" rx="14" fill="#fff" />
      <rect x="230" y="58" width="84" height="26" rx="13" fill="#0f1530" />
      <text x="272" y="75" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
        Button
      </text>
      <rect x="322" y="58" width="44" height="26" rx="13" fill="#fff" stroke="#0f1530" strokeWidth="2" />
      <rect x="230" y="94" width="136" height="26" rx="8" fill="#f3f5ff" stroke="#e2e6f4" />
      <text x="240" y="111" fontSize="11" fill="#9aa2c0">
        Email
      </text>
      <rect x="230" y="130" width="34" height="18" rx="9" fill="#14b892" />
      <circle cx="255" cy="139" r="6" fill="#fff" />
      <rect x="276" y="130" width="48" height="18" rx="9" fill="#ffe08a" />
      <text x="300" y="143" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1530">
        New
      </text>
      <text x="230" y="168" fontSize="10" fontWeight="600" fill="#58607d">
        Button · Input · Toggle · Badge
      </text>

      {/* 3. The same components reused by each tenant app, each in its own brand colour */}
      {DS_BRAND_APPS.map(([name, color], i) => {
        const x = 412 + (i % 2) * 88
        const y = 44 + Math.floor(i / 2) * 70
        return (
          <g key={name} transform={`translate(${x},${y})`}>
            <rect width="76" height="62" rx="10" fill="#fff" />
            <path d="M0 10a10 10 0 0 1 10-10h56a10 10 0 0 1 10 10v12H0z" fill={color} />
            <text x="10" y="16" fontSize="10" fontWeight="800" fill="#fff">
              {name}
            </text>
            <rect x="10" y="32" width="42" height="14" rx="7" fill={color} />
            <rect x="10" y="51" width="30" height="4" rx="2" fill="#e2e6f4" />
          </g>
        )
      })}

      {/* Flow arrows: tokens → components → apps */}
      <path d="M192 110 H206" stroke="#0f1530" strokeWidth="2" strokeLinecap="round" />
      <polygon points="204,105 212,110 204,115" fill="#0f1530" />
      <path d="M382 110 H400" stroke="#0f1530" strokeWidth="2" strokeLinecap="round" />
      <polygon points="398,105 406,110 398,115" fill="#0f1530" />

      <text x="300" y="194" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#8a3a2e">
        One library, strict TypeScript APIs, shared by every tenant
      </text>
    </svg>
  )
}

function Observability() {
  return (
    <svg viewBox="0 0 600 200" aria-hidden="true">
      <rect width="600" height="200" fill="#e9fbf5" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="40" x2="560" y1={40 + i * 40} y2={40 + i * 40} stroke="#c9efe2" />
      ))}
      <path d={OBS_LINE} fill="none" stroke="#14b892" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${OBS_LINE} L560 170 L40 170Z`} fill="#14b892" opacity=".15" />
      <circle cx="320" cy="110" r="8" fill="#ff5a4e" />
      <rect x="336" y="66" width="150" height="30" rx="15" fill="#0f1530" />
      <text x="411" y="86" textAnchor="middle" fontWeight="600" fontSize="13" fill="#fff">
        APM + RUM live
      </text>
    </svg>
  )
}

function AiPipeline() {
  return (
    <svg viewBox="0 0 600 200" aria-hidden="true">
      <rect width="600" height="200" fill="#fff7df" />
      <text x="24" y="30" fontSize="11" fontWeight="800" letterSpacing="1" fill="#8a6a00">
        FIGMA TO JIRA, WITH A HUMAN IN THE LOOP
      </text>

      {/* Moving dashes show the direction of flow */}
      <path
        className="flowline"
        d={`M${AI_FIRST_CENTRE} 95 H${AI_FIRST_CENTRE + 4 * AI_NODE_SPACING}`}
        fill="none"
        stroke="#0f1530"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {PIPELINE.map((step, i) => {
        const centre = AI_FIRST_CENTRE + i * AI_NODE_SPACING
        return (
          <g key={step.label} transform={`translate(${centre - 36},${AI_NODE_Y})`}>
            {step.label === 'Review' && (
              <rect className="ai-gate" width="72" height={AI_NODE_HEIGHT} rx="16" fill="none" stroke="#ffc531" strokeWidth="3" />
            )}
            <g className={step.label === 'Jira' ? 'ai-jira' : undefined}>
              <rect width="72" height={AI_NODE_HEIGHT} rx="16" fill={step.color} />
              <text x="36" y="38" textAnchor="middle" fontWeight="800" fontSize="14" fill={step.color === '#ffc531' ? '#0f1530' : '#fff'}>
                {step.label}
              </text>
            </g>
            <text x="36" y={AI_NODE_HEIGHT + 18} textAnchor="middle" fontSize="10" fontWeight="600" fill="#8a6a00">
              {step.caption}
            </text>
          </g>
        )
      })}

      <g transform="translate(405,44)">
        <rect x="-46" y="-11" width="92" height="20" rx="10" fill="#fff" stroke="#ffc531" strokeWidth="2" />
        <text y="3" textAnchor="middle" fontSize="10" fontWeight="800" fill="#0f1530">
          HUMAN GATE
        </text>
      </g>

      {/* A request travels to the review gate, waits, then an approved check travels on to Jira */}
      <circle className="ai-pkt" cx="90" cy="95" r="7" fill="#ff5a4e" stroke="#fff" strokeWidth="2" />
      <g className="ai-ok">
        <circle cx="405" cy="95" r="9" fill="#14b892" stroke="#fff" strokeWidth="2" />
        <path d="M400.5 95.5 l3.2 3.2 l6-6.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <text x="300" y="186" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#8a6a00">
        Nothing reaches Jira until a person approves it
      </text>
    </svg>
  )
}

const ILLUSTRATIONS: Record<CaseKind, () => React.JSX.Element> = {
  platform: Platform,
  ds: DesignSystem,
  obs: Observability,
  ai: AiPipeline,
}

export function CaseIllustration({ kind }: { kind: CaseKind }) {
  const Illustration = ILLUSTRATIONS[kind]
  return <Illustration />
}
