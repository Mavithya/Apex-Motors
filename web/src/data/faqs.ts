import type { FaqCategory } from '@/types/vehicle'

/** Template FAQ content. Review against your dealership's actual policies before publishing. */
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'purchases',
    title: 'Vehicle Purchases',
    items: [
      {
        q: 'Can I reserve a vehicle before visiting?',
        a: 'Yes. A refundable reservation deposit holds a vehicle for up to 72 hours while you arrange a viewing or finance. Contact our team to confirm the current deposit amount.',
      },
      {
        q: 'Are the prices on the website negotiable?',
        a: 'Listed prices reflect the condition, specification and market value of each vehicle. Our advisors are happy to discuss the total package, including trade-in value and finance terms.',
      },
      {
        q: 'What documents do I need to buy a car?',
        a: 'Your NIC or passport, proof of address, and — if you are financing — recent salary slips or business documents. We will confirm the exact list when you enquire.',
      },
      {
        q: 'Do you handle registration and transfer?',
        a: 'Yes. For brand-new vehicles we manage first registration with the DMT; for pre-owned vehicles we prepare the transfer documents on your behalf.',
      },
    ],
  },
  {
    id: 'inspection',
    title: 'Vehicle Inspection',
    items: [
      {
        q: 'Are pre-owned vehicles inspected?',
        a: 'Every pre-owned vehicle goes through a multi-point mechanical, electrical and body inspection before it is listed. The report is available on request.',
      },
      {
        q: 'Can I bring my own mechanic?',
        a: 'Of course. Book a time with us and your mechanic can inspect the vehicle at our showroom.',
      },
      {
        q: 'Is the mileage verified?',
        a: 'We check service records and, where available, agent history to verify odometer readings before listing.',
      },
    ],
  },
  {
    id: 'financing',
    title: 'Financing',
    items: [
      {
        q: 'Do you offer leasing or loans?',
        a: 'We work with several banks and leasing companies to help you compare offers. Approval, rates and terms are decided by the lender.',
      },
      {
        q: 'How much down payment do I need?',
        a: 'It depends on the vehicle and lender, and on current regulatory loan-to-value limits. Our finance advisor will explain the minimum for your chosen car.',
      },
      {
        q: 'Is the online calculator a finance offer?',
        a: 'No. The calculator gives an illustrative estimate only. Your actual instalment will depend on the lender’s approved rate, fees and term.',
      },
    ],
  },
  {
    id: 'trade-in',
    title: 'Trade-In',
    items: [
      {
        q: 'How is my trade-in valued?',
        a: 'We consider make, model, year, mileage, condition, service history and current market demand. You receive a clear, itemised valuation after inspection.',
      },
      {
        q: 'Can I trade in a car that is still under lease?',
        a: 'Yes. We can settle the outstanding balance with your lender and deduct it from the valuation.',
      },
      {
        q: 'Do I have to buy from you to sell my car?',
        a: 'No. We also purchase vehicles outright, subject to inspection.',
      },
    ],
  },
  {
    id: 'warranty',
    title: 'Warranty',
    items: [
      {
        q: 'Do brand-new vehicles include a warranty?',
        a: 'Brand-new vehicles carry the warranty terms provided by the manufacturer or importer. We will share the exact coverage for your chosen vehicle.',
      },
      {
        q: 'Is there a warranty on pre-owned vehicles?',
        a: 'Selected pre-owned vehicles may include a limited dealership warranty or remaining manufacturer cover. Ask our team about the specific vehicle you are interested in.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Customer Support',
    items: [
      {
        q: 'What are your opening hours?',
        a: 'Monday to Friday 9:00 am – 6:30 pm and Saturday 9:00 am – 5:00 pm. Sunday and Poya day visits are by appointment.',
      },
      {
        q: 'Can I enquire on WhatsApp?',
        a: 'Yes — WhatsApp is often the fastest way to reach us. Use the WhatsApp button on any vehicle page and the vehicle details are included automatically.',
      },
      {
        q: 'Do you deliver vehicles outside Colombo?',
        a: 'Delivery island-wide can be arranged. Charges depend on the distance; our team will confirm when you purchase.',
      },
    ],
  },
]

export const HOME_FAQS = [
  FAQ_CATEGORIES[0].items[0],
  FAQ_CATEGORIES[1].items[0],
  FAQ_CATEGORIES[2].items[2],
  FAQ_CATEGORIES[3].items[0],
]
