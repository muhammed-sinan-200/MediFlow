import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "How can I book an appointment?",
    answer: "You can book an appointment through our website or by calling our hospital reception."
  },
  {
    question: "Do you provide 24/7 emergency services?",
    answer: "Yes, our emergency department is available 24/7."
  },
  {
    question: "Do you accept health insurance?",
    answer: "Yes, we accept most major health insurance providers."
  },
  {
    question: "What are the visiting hours?",
    answer: "Visiting hours are from 10:00 AM to 7:00 PM."
  },
  {
    question: "How can I collect my medical reports?",
    answer: "Medical reports can be collected from the hospital or accessed online if available."
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 cursor-pointer bg-white shadow-sm"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-gray-800 font-medium">
                {item.question}
              </h3>
              <ChevronDown
                className={`transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </div>

            {openIndex === index && (
              <p className="mt-3 text-gray-600">
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
