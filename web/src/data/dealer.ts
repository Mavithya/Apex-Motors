/**
 * Dealership details. Replace these values to rebrand the template —
 * every page, link and footer reads from here.
 */
export const DEALER = {
  name: 'Apex Motors',
  wordmark: 'APEX',
  wordmarkSuffix: 'MOTORS',
  tagline: 'Selected vehicles, presented honestly.',
  description:
    'An independent dealership in Colombo offering brand-new and carefully inspected pre-owned vehicles, with financing assistance and trade-in valuations under one roof.',
  phoneDisplay: '+94 11 234 5678',
  phoneHref: 'tel:+94112345678',
  whatsappNumber: '94771234567',
  whatsappDisplay: '+94 77 123 4567',
  email: 'sales@apexmotors.lk',
  addressLines: ['No. 248, Baseline Road', 'Colombo 09', 'Sri Lanka'],
  city: 'Colombo, Sri Lanka',
  hoursShort: 'Mon–Sat 9:00–18:30',
  hours: [
    { days: 'Monday – Friday', time: '9:00 am – 6:30 pm' },
    { days: 'Saturday', time: '9:00 am – 5:00 pm' },
    { days: 'Sunday & Poya days', time: 'By appointment' },
  ],
  mapQuery: 'Baseline Road, Colombo 09, Sri Lanka',
  socials: [
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
    { label: 'TikTok', href: 'https://tiktok.com' },
  ],
  established: 2009,
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${DEALER.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

/** Section photography, kept together so a dealer can swap their own in. */
export const IMAGES = {
  hero: 'https://cdn.magicpatterns.com/patterns/generated-images/78bcac7a-39fa-4361-9548-6443c1d64b77.jpg',
  spotlight: 'https://cdn.magicpatterns.com/patterns/generated-images/c8893956-4998-43eb-a120-d8929c0ddb12.jpg',
  showroom: 'https://cdn.magicpatterns.com/patterns/generated-images/5b8bb8cb-d63e-4a02-a6f9-a419e3025e43.jpg',
  handover: 'https://cdn.magicpatterns.com/patterns/generated-images/2c7b2374-7536-4529-ba5d-ab785e677dff.jpg',
  detail: 'https://cdn.magicpatterns.com/patterns/generated-images/cd980a9d-dfca-46df-9574-725e975458e8.jpg',
  interior: 'https://cdn.magicpatterns.com/patterns/generated-images/4e2fb646-6957-4e31-82f3-8847d3b3fe10.jpg',
  dashboard: 'https://cdn.magicpatterns.com/patterns/generated-images/e8719c66-4ef3-45a8-966c-9f5b1ba40cea.jpg',
  rear: 'https://cdn.magicpatterns.com/patterns/generated-images/73f1c7b3-e7c7-4c88-bf5b-6eedfd5f5f5c.jpg',
}
