# Build Plan — EduLink

## Objective
A student-teacher interaction platform where teachers upload documents and students access them via an inbuilt PDF viewer. Separate login and registration portals for students and teachers.

## Domain Tag
Domain Tag: Educational App

## Selected Design System
Domain Tag: Educational App
Color Palette: Option 1
Typography: Option 1
Rationale: Selected for Educational App from the curated design-system table.

## Design Aesthetic
Claymorphism — soft 3D, rounded, colorful, friendly surfaces with subtle depth, perfect for an educational app that needs to feel welcoming and tactile.

## Pages
- / — Home — Hero, Features, How It Works, Pricing, FAQ, CTA, Footer
- /student-login — Student Portal — login form + registration form for students
- /teacher-login — Teacher Portal — login form + registration form for teachers
- /upload — Document Upload — teacher-only page to upload documents
- /viewer — PDF Viewer — student page to browse and view uploaded PDFs
- /pricing — Pricing — detailed pricing tiers
- /faq — FAQ — expanded frequently asked questions

## Components
- MegaMenuHeader
- Footer4Col

## File Structure
src/
  tokens.ts
  animations.ts
  components/
    layout/
      Layout.tsx
      Header.tsx
      Footer.tsx
    ui/
      Button.tsx
      Card.tsx
      Input.tsx
      Badge.tsx
    sections/
      HeroSection.tsx
      FeaturesSection.tsx
      HowItWorksSection.tsx
      PricingSection.tsx
      FAQSection.tsx
      CTASection.tsx
      TestimonialsSection.tsx
    pdf/
      PDFViewer.tsx
      PDFUpload.tsx
  pages/
    Home.tsx
    StudentLogin.tsx
    TeacherLogin.tsx
    UploadPage.tsx
    ViewerPage.tsx
    PricingPage.tsx
    FAQPage.tsx
    NotFoundPage.tsx
  App.tsx
  main.tsx
