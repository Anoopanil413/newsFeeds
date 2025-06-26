import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "What is Maritime Nexus Intelligence?",
      answer:
        "Maritime Nexus Intelligence is an AI-powered platform that provides real-time vessel tracking, port analytics, predictive insights, and risk management tools for maritime operations.",
    },
    {
      question: "How accurate is your vessel tracking?",
      answer:
        "Our vessel tracking system provides 99.9% accuracy with real-time updates every few seconds. We use multiple data sources including AIS, satellite imagery, and port authorities.",
    },
    {
      question: "Can I integrate with my existing systems?",
      answer:
        "Yes, we offer comprehensive API access and custom integrations with most maritime management systems, ERP platforms, and logistics software.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer 24/7 technical support, dedicated account managers for enterprise clients, comprehensive documentation, and training resources.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade security with end-to-end encryption, SOC 2 compliance, and regular security audits to protect your sensitive maritime data.",
    },
    {
      question: "How quickly can I get started?",
      answer:
        "You can start using our platform immediately after signing up. Our onboarding process takes less than 30 minutes, and our team can help with data migration if needed.",
    },
    {
      question: "Do you offer custom pricing for large fleets?",
      answer:
        "Yes, we offer custom enterprise pricing for large fleets and maritime organizations. Contact our sales team for a personalized quote based on your specific needs.",
    },
    {
      question: "What regions do you cover?",
      answer:
        "We provide global coverage across all major shipping lanes, ports, and maritime regions worldwide, with particularly strong coverage in North America, Europe, and Asia-Pacific.",
    },
  ]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300">
            Get answers to common questions about our maritime intelligence platform.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-gray-800 border-gray-700 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-blue-400 text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-300 pb-4">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
