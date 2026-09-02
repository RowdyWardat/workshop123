import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "../../animations";
import { MegaMenuHeader } from "../ui/MegaMenuHeader";
import { Footer4Col } from "../ui/Footer4Col";
import { GraduationCap, Mail, Phone } from "lucide-react";
import { tokens } from "../../tokens";

const menuItems = [
  { title: "Home", href: "/" },
  {
    title: "Portal",
    description: "Access your dedicated student or teacher portal.",
    items: [
      { title: "Student Login", href: "/student-login" },
      { title: "Teacher Login", href: "/teacher-login" },
    ],
  },
  {
    title: "Resources",
    description: "Upload and access learning materials.",
    items: [
      { title: "Upload Documents", href: "/upload" },
      { title: "PDF Viewer", href: "/viewer" },
    ],
  },
  {
    title: "Company",
    description: "Learn more about EduLink and our mission.",
    items: [
      { title: "Pricing", href: "/pricing" },
      { title: "FAQ", href: "/faq" },
    ],
  },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: tokens.color.background }}>
      <MegaMenuHeader
        brandName="EduLink"
        logo={<GraduationCap className="w-8 h-8" style={{ color: tokens.color.primary }} />}
        menuItems={menuItems}
        ctaPrimaryText="Get Started"
        ctaSecondaryText="Sign In"
        ctaTertiaryText="Pricing"
        onCtaPrimaryClick={() => { window.location.href = "/student-login"; }}
        onCtaSecondaryClick={() => { window.location.href = "/student-login"; }}
        onCtaTertiaryClick={() => { window.location.href = "/pricing"; }}
      />
      <div className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer4Col
        company={{
          name: "EduLink",
          description:
            "Empowering classrooms with seamless student-teacher interaction. Upload, share, and learn together.",
          logo: <GraduationCap className="w-8 h-8" style={{ color: tokens.color.primary }} />,
        }}
        aboutLinks={[
          { text: "About Us", href: "/" },
          { text: "Our Team", href: "/" },
          { text: "Careers", href: "/" },
          { text: "Press Kit", href: "/" },
        ]}
        serviceLinks={[
          { text: "Student Portal", href: "/student-login" },
          { text: "Teacher Portal", href: "/teacher-login" },
          { text: "Document Upload", href: "/upload" },
          { text: "PDF Viewer", href: "/viewer" },
        ]}
        helpfulLinks={[
          { text: "FAQs", href: "/faq" },
          { text: "Support", href: "/faq" },
          { text: "Live Chat", href: "/faq", hasIndicator: true },
        ]}
        contactInfo={[
          { icon: Mail, text: "hello@edulink.app", href: "mailto:hello@edulink.app" },
          { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
        ]}
      />
    </div>
  );
}
