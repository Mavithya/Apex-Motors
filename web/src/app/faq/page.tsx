"use client";
import { useSiteData } from "@deneb-ui/ui";
import { useDealer } from '@/lib/useDealer'
import { FaqExplorer } from '@/components/ui/FaqExplorer'
import { ButtonLink, ButtonAnchor } from '@/components/ui/Button'

export default function Faq() {
  const siteData = useSiteData();
  const DEALER = useDealer()
  const whatsappLink = (message?: string) => (DEALER.whatsappUrl ?? `https://wa.me/${DEALER.whatsappNumber}`) + (message ? '?text=' + encodeURIComponent(message) : '')
  return (
    <><FaqExplorer data-preview-page-key="faq" />
      <section className="bg-ink py-16">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2
              className="text-[28px] font-extrabold tracking-[-0.02em] text-white sm:text-[34px]"
              data-preview-field-path="faq.heading"
              data-preview-style-target="faq.heading"
              data-preview-style-type="text">{siteData?.content?.faq?.heading ?? "Still have a question?"}</h2>
            <p
              className="mt-2 text-[16px] text-white/70"
              data-preview-field-path="faq.subtitle3"
              data-preview-style-target="faq.subtitle3"
              data-preview-style-type="text">{siteData?.content?.faq?.subtitle3 ?? "Our advisors are available ."}{DEALER.hoursShort}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonAnchor href={whatsappLink('Hello Apex Motors, I have a question.')} size="lg" newTab>
              <span data-preview-field-path="faq.askWhatsapp" data-preview-style-target="faq.askWhatsapp" data-preview-style-type="text">{siteData?.content?.faq?.askWhatsapp ?? "Ask on WhatsApp"}</span>
            </ButtonAnchor>
            <ButtonLink to="/contact" size="lg" variant="outline-light">
              <span data-preview-field-path="faq.contactPage" data-preview-style-target="faq.contactPage" data-preview-style-type="text">{siteData?.content?.faq?.contactPage ?? "Contact page"}</span>
            </ButtonLink>
          </div>
        </div>
      </section>

    </>
  );
}
