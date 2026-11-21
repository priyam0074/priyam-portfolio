import type { ProviderKind } from '@/data/agentrep'

export function ProviderIcon({ kind }: { kind: ProviderKind }) {
  switch (kind) {
    case 'Venue':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 4c7 0 12 5 12 12 0 8-12 14-12 14S12 24 12 16C12 9 17 4 24 4z" fill="#ff5a4e" />
          <path d="M24 30v14" stroke="#0f1530" strokeWidth="2" />
          <circle cx="20" cy="13" r="3" fill="#fff" opacity=".6" />
        </svg>
      )
    case 'Food':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <ellipse cx="24" cy="30" rx="20" ry="8" fill="#e2e6f4" />
          <ellipse cx="24" cy="27" rx="14" ry="5" fill="#ffc531" />
          <circle cx="19" cy="25" r="3" fill="#14b892" />
          <circle cx="28" cy="26" r="3" fill="#ff5a4e" />
        </svg>
      )
    case 'Cake':
      return (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="8" y="24" width="32" height="18" rx="4" fill="#ff8f86" />
          <rect x="8" y="24" width="32" height="6" rx="3" fill="#fff" />
          <rect x="22" y="12" width="4" height="12" rx="2" fill="#2a4bff" />
          <path d="M24 4c3 4 3 6 0 8-3-2-3-4 0-8z" fill="#ffc531" />
        </svg>
      )
  }
}
