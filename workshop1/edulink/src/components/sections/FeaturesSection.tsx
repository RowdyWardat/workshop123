import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stagger, fadeUp } from "../../animations";
import { tokens } from "../../tokens";
import { Card } from "../ui/Card";
import {
  FileText,
  Eye,
  Shield,
  Zap,
  MessageCircle,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Document Upload",
    description:
      "Teachers can easily upload PDFs, Word docs, and presentations. Drag-and-drop simplicity with instant availability for students.",
    color: tokens.color.primary,
  },
  {
    icon: Eye,
    title: "Built-in PDF Viewer",
    description:
      "Students can open and read documents directly in the browser — no downloads, no extra software needed. Smooth and responsive.",
    color: tokens.color.accent,
  },
  {
    icon: Shield,
    title: "Secure Access",
    description:
      "Role-based portals keep student and teacher data separate. Encrypted uploads and secure authentication protect every file.",
    color: tokens.color.secondary,
  },
  {
    icon: Zap,
    title: "Instant Sharing",
    description:
      "Documents appear in student dashboards the moment they are uploaded. Real-time updates mean nobody misses a thing.",
    color: tokens.color.primary,
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description:
      "Built-in messaging between students and teachers. Ask questions, give feedback, and stay connected effortlessly.",
    color: tokens.color.accent,
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Monitor document views, downloads, and engagement. Insights help teachers understand what resonates with students.",
    color: tokens.color.secondary,
  },
];

export default function FeaturesSection() {
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
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
          >
            Everything You Need to{" "}
            <span style={{ color: tokens.color.primary }}>Teach & Learn</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg" style={{ color: tokens.color.mutedForeground }}>
            A complete toolkit designed for modern classrooms. From document sharing 
            to real-time collaboration.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0.15, 0.1)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={i % 2 === 0 ? fadeUp : fadeUp}
            >
              <Card hover className="h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: feature.color }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
                >
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: tokens.color.mutedForeground }}>
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
