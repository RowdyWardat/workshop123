import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stagger, scaleIn } from "../../animations";
import { tokens } from "../../tokens";
import { Card } from "../ui/Card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ms. Sarah Johnson",
    role: "High School Biology Teacher",
    avatar: "SJ",
    content:
      "EduLink has completely transformed how I share lab materials with my students. The PDF viewer is incredibly smooth, and I love seeing who has accessed each document. It saves me hours every week!",
    rating: 5,
    color: tokens.color.primary,
  },
  {
    name: "Jake Martinez",
    role: "University Sophomore",
    avatar: "JM",
    content:
      "As a student, having all my course materials in one place is a game-changer. No more scrambling through emails or lost links. The built-in viewer means I can study anywhere, even on my phone.",
    rating: 5,
    color: tokens.color.accent,
  },
  {
    name: "Dr. Emily Chen",
    role: "Professor of Mathematics",
    avatar: "EC",
    content:
      "The document upload system is intuitive and reliable. I upload problem sets and solutions, and my students get instant access. The analytics help me understand engagement patterns too.",
    rating: 5,
    color: tokens.color.secondary,
  },
  {
    name: "Aisha Patel",
    role: "Middle School Student",
    avatar: "AP",
    content:
      "I used to lose all my worksheets. Now everything is on EduLink and I can find any document in seconds. The colors are really fun too — it makes studying feel less boring!",
    rating: 5,
    color: tokens.color.primary,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ backgroundColor: tokens.color.muted }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.h2
            variants={scaleIn}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
          >
            Loved by{" "}
            <span style={{ color: tokens.color.primary }}>Students</span>{" "}
            & <span style={{ color: tokens.color.accent }}>Teachers</span>
          </motion.h2>
          <motion.p variants={scaleIn} className="text-lg" style={{ color: tokens.color.mutedForeground }}>
            Hear from the community that makes EduLink special.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.2, 0.15)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 gap-6 lg:gap-8"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={scaleIn}>
              <Card hover className="h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 opacity-30" style={{ color: tokens.color.primary }} />
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        style={{ color: tokens.color.accent }}
                      />
                    ))}
                  </div>
                </div>
                <p className="flex-1 leading-relaxed mb-6" style={{ color: tokens.color.cardForeground }}>
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: tokens.color.text }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: tokens.color.mutedForeground }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
