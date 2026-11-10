export default function LoadingVehicle() {
  return (
    <div className="mx-auto min-h-screen max-w-[1320px] px-5 py-10 sm:px-8" role="status" aria-label="Loading vehicle">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="aspect-[4/3] bg-stone" />
        <div className="space-y-6 border border-line bg-white p-6">
          <div className="h-8 w-3/4 bg-paper" />
          <div className="h-12 w-2/3 bg-paper" />
          <p className="text-sm text-muted">Loading vehicle details…</p>
        </div>
      </div>
    </div>
  )
}
