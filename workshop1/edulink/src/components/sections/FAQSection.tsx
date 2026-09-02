import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { stagger, fadeUp } from "../../animations";
import { tokens } from "../../tokens";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I upload documents as a teacher?",
    answer:
      "Log in to your teacher portal, navigate to the Upload page, and drag and drop your files into the upload zone. We support PDFs, Word documents, PowerPoint presentations, and images. Your students will have instant access.",
  },
  {
    question: "Can students download the documents or only view them?",
    answer:
      "By default, students can view documents directly in our built-in PDF viewer. Teachers can choose to enable downloads on a per-document basis. This gives you full control over how your materials are shared.",
  },
  {
    question: "Is there a limit on how many documents I can upload?",
    answer:
      "The free Starter plan includes up to 50 document uploads. Pro and Institution plans offer unlimited uploads. Each document can be up to 100MB in size.",
  },
  {
    question: "How do students access their course materials?",
    answer:
      "Students log in to their portal and see all documents shared by their teachers organized by class and date. They can open any PDF directly in the browser viewer without needing to download anything.",
  },
  {
    question: "Is my data secure on EduLink?",
    answer:
      "Absolutely. All uploads are encrypted in transit and at rest. We use industry-standard security practices, and student and teacher data is kept in separate, role-protected environments.",
  },
  {
    question: "Can I use EduLink for multiple classes or subjects?",
    answer:
      "Yes! The Pro plan supports up to 10 classrooms, and the Institution plan offers unlimited classrooms. You can organize documents by class, subject, or any system that works for you.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ backgroundColor: tokens.color.muted }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
          >
            Frequently Asked{" "}
            <span style={{ color: tokens.color.primary }}>Questions</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg" style={{ color: tokens.color.mutedForeground }}>
            Everything you need to know about EduLink.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.1, 0.08)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-col gap-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: tokens.color.background,
                borderColor: tokens.color.border,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
              >
                <span
                  className="font-semibold text-base pr-4"
                  style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  style={{ color: tokens.color.primary }}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p
                      className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: tokens.color.mutedForeground }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
