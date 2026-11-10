import { FaqExplorer } from '@/components/ui/FaqExplorer'
import { DEALER, whatsappLink } from '@/data/dealer'
import { ButtonLink, ButtonAnchor } from '@/components/ui/Button'

export const metadata = { title: 'Frequently Asked Questions' }
export default function Faq() { return (<><FaqExplorer />
      <section className="bg-ink py-16">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]">Still have a question?</h2>
            <p className="mt-2 text-[16px] text-white/70">Our advisors are available {DEALER.hoursShort}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonAnchor href={whatsappLink('Hello Apex Motors, I have a question.')} size="lg" newTab>
              Ask on WhatsApp
            </ButtonAnchor>
            <ButtonLink to="/contact" size="lg" variant="outline-light">
              Contact page
            </ButtonLink>
          </div>
        </div>
      </section>

</>) }
