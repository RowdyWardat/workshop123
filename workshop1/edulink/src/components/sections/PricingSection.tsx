import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stagger, scaleIn, hoverScale } from "../../animations";
import { tokens } from "../../tokens";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for individual teachers getting started.",
    price: "$0",
    period: "forever free",
    features: [
      { text: "Up to 50 document uploads", included: true },
      { text: "Basic PDF viewer", included: true },
      { text: "1 classroom", included: true },
      { text: "Email support", included: true },
      { text: "Analytics dashboard", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For educators who need more power and flexibility.",
    price: "$12",
    period: "/month",
    features: [
      { text: "Unlimited document uploads", included: true },
      { text: "Advanced PDF viewer with annotations", included: true },
      { text: "Up to 10 classrooms", included: true },
      { text: "Priority email support", included: true },
      { text: "Full analytics dashboard", included: true },
      { text: "Custom branding", included: false },
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Institution",
    description: "Built for schools and universities at scale.",
    price: "$49",
    period: "/month",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited classrooms", included: true },
      { text: "SSO & admin controls", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Custom integrations", included: true },
      { text: "White-label option", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingSection() {
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
            variants={scaleIn}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
          >
            Simple, Transparent{" "}
            <span style={{ color: tokens.color.primary }}>Pricing</span>
          </motion.h2>
          <motion.p variants={scaleIn} className="text-lg" style={{ color: tokens.color.mutedForeground }}>
            Start free and scale as you grow. No hidden fees, no surprises.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger(0, 0.12)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={scaleIn}
              whileHover={hoverScale}
              className="h-full"
            >
              <Card
                className={`h-full flex flex-col relative ${
                  plan.popular ? "ring-2" : ""
                }`}
                hover
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">Most Popular</Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-sm" style={{ color: tokens.color.mutedForeground }}>
                    {plan.description}
                  </p>
                </div>
                <div className="mb-6">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: tokens.color.text, fontFamily: tokens.font.heading }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm ml-1" style={{ color: tokens.color.mutedForeground }}>
                    {plan.period}
                  </span>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3 text-sm">
                      {f.included ? (
                        <Check className="w-4 h-4 shrink-0" style={{ color: tokens.color.primary }} />
                      ) : (
                        <X className="w-4 h-4 shrink-0" style={{ color: tokens.color.mutedForeground }} />
                      )}
                      <span style={{ color: f.included ? tokens.color.text : tokens.color.mutedForeground }}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                  onClick={() => { window.location.href = "/student-login"; }}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
