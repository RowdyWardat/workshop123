import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stagger, fadeLeft, fadeRight } from "../../animations";
import { tokens } from "../../tokens";
import { Upload, UserCheck, BookOpen, Award } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Create Your Account",
    description:
      "Sign up as a student or teacher in seconds. Choose your role and get a personalized dashboard tailored to your needs.",
    image: "https://images.pexels.com/photos/8500303/pexels-photo-8500303.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Young student smiling while creating an account on a laptop in a cozy study space with warm ambient lighting",
  },
  {
    number: "02",
    icon: Upload,
    title: "Upload Documents",
    description:
      "Teachers drag and drop files into the upload zone. PDFs, slides, and worksheets are instantly organized and ready to share.",
    image: "https://images.pexels.com/photos/31449926/pexels-photo-31449926.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Teacher dragging a file into a digital upload interface on a large monitor, modern classroom background with natural light",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Students Access Materials",
    description:
      "Students log in to find all their course documents in one place. Open PDFs directly in the browser with our smooth viewer.",
    image: "https://images.pexels.com/photos/7567207/pexels-photo-7567207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Student reading a digital textbook on a tablet, sitting by a window with soft daylight, focused and engaged expression",
  },
  {
    number: "04",
    icon: Award,
    title: "Learn & Succeed",
    description:
      "Track progress, ask questions, and collaborate. EduLink makes learning interactive, organized, and fun for everyone.",
    image: "https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    imageAlt: "Group of diverse students celebrating together in a bright library, high-fiving and smiling with books and laptops around them",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ backgroundColor: tokens.color.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.h2
            variants={fadeLeft}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
          >
            How <span style={{ color: tokens.color.primary }}>EduLink</span> Works
          </motion.h2>
          <motion.p variants={fadeRight} className="text-lg" style={{ color: tokens.color.mutedForeground }}>
            Four simple steps to transform your classroom experience. 
            Getting started takes less than five minutes.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={step.number}
                variants={stagger(0.1, 0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  isEven ? "" : "lg:direction-rtl"
                }`}
              >
                <motion.div
                  variants={isEven ? fadeLeft : fadeRight}
                  className={`flex flex-col gap-4 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-5xl font-bold"
                      style={{ color: tokens.color.primary, fontFamily: tokens.font.heading }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: tokens.color.primary }}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3
                    className="text-2xl lg:text-3xl font-bold"
                    style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: tokens.color.mutedForeground }}>
                    {step.description}
                  </p>
                </motion.div>

                <motion.div
                  variants={isEven ? fadeRight : fadeLeft}
                  className={`${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div
                    className="rounded-3xl overflow-hidden shadow-xl border"
                    style={{ borderColor: tokens.color.border }}
                  >
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      width={600}
                      height={400}
                      className="w-full object-cover"
                      style={{ aspectRatio: "3/2" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
