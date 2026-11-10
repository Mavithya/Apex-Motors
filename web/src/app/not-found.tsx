import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8">
      <p className="text-sm font-bold text-accent">404</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink">This page could not be found.</h1>
      <p className="mt-5 text-muted">The vehicle or page may no longer be available. Explore our current collection.</p>
      <ButtonLink to="/vehicles" className="mt-8">Browse all vehicles</ButtonLink>
    </section>
  )
}
