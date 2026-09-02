import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { heroContainer, heroItem } from "../../animations";
import { tokens } from "../../tokens";
import { Button } from "../ui/Button";
import { BookOpen, Users, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: tokens.color.secondary }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: tokens.color.primary }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="flex flex-col gap-6"
          >
            <motion.div variants={heroItem}>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{ backgroundColor: tokens.color.muted, color: tokens.color.primary }}
              >
                <BookOpen className="w-4 h-4" />
                The Future of Classroom Interaction
              </span>
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
            >
              Connect, Share{" "}
              <span style={{ color: tokens.color.primary }}>&</span> Learn
              <br />
              <span style={{ color: tokens.color.accent }}>Together</span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="text-lg lg:text-xl leading-relaxed max-w-lg"
              style={{ color: tokens.color.mutedForeground }}
            >
              EduLink bridges the gap between students and teachers. Upload documents, 
              access course materials, and collaborate seamlessly — all in one friendly platform.
            </motion.p>

            <motion.div variants={heroItem} className="flex flex-wrap gap-4 pt-2">
              <Button
                onClick={() => { window.location.href = "/student-login"; }}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={() => { window.location.href = "/teacher-login"; }}>
                <Users className="w-4 h-4 mr-2" />
                Teacher Portal
              </Button>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex items-center gap-6 pt-4 text-sm"
              style={{ color: tokens.color.mutedForeground }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: tokens.color.primary,
                      borderColor: tokens.color.background,
                      color: tokens.color.onPrimary,
                    }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>
                Trusted by <strong style={{ color: tokens.color.text }}>10,000+</strong> students & teachers
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="relative"
          >
            <motion.div variants={heroItem} className="relative">
              <img
                src="https://images.pexels.com/photos/6684506/pexels-photo-6684506.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Diverse group of students collaborating around a table in a bright modern classroom with laptops and notebooks"
                width={600}
                height={500}
                className="rounded-3xl shadow-2xl w-full object-cover"
                style={{ aspectRatio: "6/5" }}
              />
              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl p-5 shadow-xl border"
                style={{ backgroundColor: tokens.color.background, borderColor: tokens.color.border }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: tokens.color.primary }}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: tokens.color.text }}>50K+</p>
                    <p className="text-sm" style={{ color: tokens.color.mutedForeground }}>Documents Shared</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div
                className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 shadow-xl border"
                style={{ backgroundColor: tokens.color.accent }}
              >
                <p className="text-sm font-bold" style={{ color: tokens.color.onAccent }}>
                  ✦ Live PDF Viewer
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
