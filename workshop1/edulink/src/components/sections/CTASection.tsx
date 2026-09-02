import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stagger, fadeUp, hoverGlow } from "../../animations";
import { tokens } from "../../tokens";
import { Button } from "../ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ backgroundColor: tokens.color.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative overflow-hidden rounded-3xl p-10 lg:p-16 text-center"
          style={{ backgroundColor: tokens.color.primary }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: tokens.color.onPrimary }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2" style={{ backgroundColor: tokens.color.onPrimary }} />

          <motion.div variants={fadeUp} className="relative z-10 flex flex-col items-center gap-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-white/20"
              style={{ color: tokens.color.onPrimary }}
            >
              <Sparkles className="w-4 h-4" />
              Start your journey today
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-2xl"
              style={{ color: tokens.color.onPrimary, fontFamily: tokens.font.heading }}
            >
              Ready to Transform Your Classroom?
            </h2>

            <p className="text-lg max-w-xl opacity-85" style={{ color: tokens.color.onPrimary }}>
              Join thousands of educators and students who are already learning
              smarter with EduLink. It takes less than a minute to get started.
            </p>

            <motion.div whileHover={hoverGlow} className="pt-2">
              <Button
                className="text-lg px-10 py-4"
                style={{ backgroundColor: tokens.color.accent, color: tokens.color.onAccent }}
                onClick={() => { window.location.href = "/student-login"; }}
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <p className="text-sm opacity-70" style={{ color: tokens.color.onPrimary }}>
              No credit card required. Free forever for individual teachers.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
