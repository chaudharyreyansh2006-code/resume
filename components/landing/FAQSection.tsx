"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does CVFolio.Me convert my PDF resume into a website?",
      answer:
        "Our AI technology automatically extracts all information from your PDF resume - including work experience, education, skills, and contact details. It then structures this data and creates a professional website with perfect formatting in just 60 seconds. No manual data entry required.",
    },
    {
      question: "What file formats do you support for resume uploads?",
      answer:
        "We support PDF files of any format. Our AI is trained to handle various resume layouts, fonts, and structures. Simply upload your existing PDF resume and our system will extract all the information automatically.",
    },
    {
      question: "How many themes are available and can I switch between them?",
      answer:
        "We offer 9 professional themes including Default, Gray, Minimal, Zinc, Slate, Stone, Zen Garden, Orange, and Blue. Each theme is designed to be industry-appropriate and you can switch between them unlimited times with your Pro access.",
    },
    {
      question: "What does the $9 one-time payment include?",
      answer:
        "Your $9 payment gives you one full year of access with unlimited PDF uploads, unlimited edits to your website, up to 50,000 visits per year, access to all 9 themes, and your custom cvfolio.me/yourname domain. No monthly fees or hidden costs.",
    },
    {
      question: "How do I get my custom cvfolio.me domain?",
      answer:
        "After creating your website, you'll automatically get a professional URL in the format cvfolio.me/yourname. This gives you a clean, memorable link to share with employers instead of messy URLs. You can customize the 'yourname' part during setup.",
    },
    {
      question: "Is my resume website mobile-friendly?",
      answer:
        "Absolutely! All our themes are fully responsive and look stunning on phones, tablets, and desktops. Your website will automatically adapt to any screen size, ensuring employers can view your resume perfectly on any device.",
    },
    {
      question: "Can I edit my website after it's created?",
      answer:
        "Yes! With Pro access, you get unlimited edits. You can update your work experience, add new skills, change themes, upload new resume versions, or modify any content as many times as you need throughout your subscription year.",
    },
    {
      question: "How does this help me get more interviews?",
      answer:
        "Professional websites stand out from PDF resumes in crowded applicant pools. Our users report 3x more interview callbacks because websites showcase personality, are easier to share, and demonstrate tech-savviness that employers value. You differentiate yourself from 250+ other applicants.",
    },
    {
      question: "Is my personal data secure and private?",
      answer:
        "Yes, privacy is our priority. Your resume data is processed securely, we don't track your visitors, show ads, or share your information with third parties. Your professional website and personal data remain completely private and under your control.",
    },
    {
      question: "What happens if I'm not satisfied with my website?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not completely satisfied with your professional website for any reason, we'll provide a full refund within 30 days of purchase. We're confident you'll love the results.",
    },
    {
      question: "How many visits can my website handle?",
      answer:
        "Your website can handle up to 50,000 visits per year, which is more than sufficient for most job seekers and professionals. You can share your website link on LinkedIn, with recruiters, in email signatures, or anywhere else without worrying about traffic limits.",
    },
    {
      question: "Do I need any technical skills to use CVFolio.Me?",
      answer:
        "Not at all! The entire process is designed to be completely non-technical. Simply upload your PDF resume and our AI handles everything else. No coding, design skills, or technical knowledge required. If you can upload a file, you can create a professional website.",
    },
  ]

  return (
    <section className="px-4 pt-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium text-gray-700 mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Got Questions?
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">Frequently asked questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about transforming your resume into a professional website.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* First Column */}
          <div className="space-y-4">
            {faqs.slice(0, 6).map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200"
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-black pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Second Column */}
          <div className="space-y-4">
            {faqs.slice(6).map((faq, index) => {
              const actualIndex = index + 6;
              return (
                <div
                  key={actualIndex}
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setOpenIndex(openIndex === actualIndex ? null : actualIndex)}
                  >
                    <h3 className="text-lg font-semibold text-black pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openIndex === actualIndex ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openIndex === actualIndex ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
      </div>
    </section>
  )
}