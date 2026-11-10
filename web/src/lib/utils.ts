export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export function formatLKR(value: number) {
  return 'LKR ' + Math.round(value).toLocaleString('en-LK')
}

/** Short form for tight spaces: LKR 18.75M */
export function formatLKRShort(value: number) {
  if (value >= 1_000_000) {
    const m = value / 1_000_000
    return `LKR ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2).replace(/0$/, '')}M`
  }
  return formatLKR(value)
}

export function formatKm(km: number) {
  return `${km.toLocaleString('en-LK')} km`
}

export function parseQuery(path: string): Record<string, string> {
  return Object.fromEntries(new URLSearchParams((path.split('?')[1] ?? '').split('#')[0]))
}

export function buildQuery(params: Record<string, string | number | undefined | null>) {
  const parts = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
  return parts.length ? `?${parts.join('&')}` : ''
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
/** Sri Lankan numbers: 07X XXX XXXX, 0XX XXX XXXX or +94 forms. */
export const PHONE_RE = /^(\+94|0)\d{9}$/

export function cleanPhone(p: string) {
  return p.replace(/[\s-]/g, '')
}
