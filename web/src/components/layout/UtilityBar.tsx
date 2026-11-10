import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { DEALER, whatsappLink } from '@/data/dealer'

export function UtilityBar() {
  return (
    <div className="bg-ink text-[12.5px] text-white/70">
      <div className="mx-auto flex h-10 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <MapPin className="h-3.5 w-3.5 text-white/40" aria-hidden />
            {DEALER.city}
          </span>
          <span className="hidden items-center gap-2 whitespace-nowrap md:flex">
            <Clock className="h-3.5 w-3.5 text-white/40" aria-hidden />
            {DEALER.hoursShort}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href={DEALER.phoneHref} className="hidden items-center gap-2 whitespace-nowrap transition-colors duration-150 hover:text-white sm:flex">
            <Phone className="h-3.5 w-3.5 text-white/40" aria-hidden />
            {DEALER.phoneDisplay}
          </a>
          <a
            href={whatsappLink('Hello Apex Motors, I have a question.')}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 whitespace-nowrap transition-colors duration-150 hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5 text-white/40" aria-hidden />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

