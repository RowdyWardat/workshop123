import { motion } from "framer-motion";
import { tokens } from "../tokens";
import { Button } from "../components/ui/Button";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20" style={{ backgroundColor: tokens.color.muted }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: tokens.color.primary }}
        >
          <Compass className="w-10 h-10 text-white" />
        </div>
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
        >
          404
        </h1>
        <h2
          className="text-2xl font-bold mb-3"
          style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
        >
          Page Not Found
        </h2>
        <p className="mb-8" style={{ color: tokens.color.mutedForeground }}>
          Oops! The page you are looking for seems to have wandered off. 
          Let's get you back on track.
        </p>
        <Button onClick={() => { window.location.href = "/"; }}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
