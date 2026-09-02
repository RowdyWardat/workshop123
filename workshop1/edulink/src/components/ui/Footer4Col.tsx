import { SmartLink } from "../core/SmartLink";
import React from 'react';
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Hexagon
} from 'lucide-react';
import { cn } from "../core/utils";
import { tokens } from "../../tokens";
import type { RegistryLink } from "../core/link";

export interface FooterSocialLink extends RegistryLink {
  icon: React.ElementType;
}

export interface FooterTextLink extends RegistryLink {
  hasIndicator?: boolean;
}

export interface FooterContactItem extends RegistryLink {
  icon: React.ElementType;
  isAddress?: boolean;
}
export interface Footer4ColProps {
  company?: {
    name: string;
    description: string;
    logo?: React.ReactNode;
  };
  socialLinks?: FooterSocialLink[];
  aboutLinks?: FooterTextLink[];
  serviceLinks?: FooterTextLink[];
  helpfulLinks?: FooterTextLink[];
  contactInfo?: FooterContactItem[];
  className?: string;
}

const DEFAULT_COMPANY = {
  name: '',
  description:
    'Building beautiful and functional web experiences with modern technologies. We help startups and businesses create their digital presence.',
  logo: <Hexagon className="w-8 h-8" style={{ color: tokens.color.primary }} />
};

const DEFAULT_SOCIALS = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Dribbble, label: 'Dribbble', href: '#' },
];

const DEFAULT_ABOUT = [
  { text: 'Company History', href: '#' },
  { text: 'Meet the Team', href: '#' },
  { text: 'Employee Handbook', href: '#' },
  { text: 'Careers', href: '#' },
];

const DEFAULT_SERVICES = [
  { text: 'Web Development', href: '#' },
  { text: 'Web Design', href: '#' },
  { text: 'Marketing', href: '#' },
  { text: 'Google Ads', href: '#' },
];

const DEFAULT_HELP = [
  { text: 'FAQs', href: '#' },
  { text: 'Support', href: '#' },
  { text: 'Live Chat', href: '#', hasIndicator: true },
];

const DEFAULT_CONTACT = [
  { icon: Mail, text: 'hello@novaui.com', href: 'mailto:hello@novaui.com' },
  { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, text: 'New York City, NY', isAddress: true, href: '#' },
];

export function Footer4Col({
  company = DEFAULT_COMPANY,
  socialLinks = DEFAULT_SOCIALS,
  aboutLinks = DEFAULT_ABOUT,
  serviceLinks = DEFAULT_SERVICES,
  helpfulLinks = DEFAULT_HELP,
  contactInfo = DEFAULT_CONTACT,
  className
}: Footer4ColProps) {
  return (
    <footer
      className={cn("w-full place-self-end rounded-t-3xl border-t", className)}
      style={{
        backgroundColor: tokens.color.muted,
        borderColor: tokens.color.border,
        color: tokens.color.mutedForeground,
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div
              className="flex justify-center items-center gap-2 sm:justify-start"
              style={{ color: tokens.color.text }}
            >
              {company.logo}
              <span className="text-2xl font-semibold">
                {company.name}
              </span>
            </div>

            <p
              className="mt-6 max-w-md text-center leading-relaxed sm:max-w-xs sm:text-left"
              style={{ color: tokens.color.mutedForeground }}
            >
              {company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <SmartLink
                    href={href}
                    className="transition-colors hover:opacity-70"
                    style={{ color: tokens.color.mutedForeground }}
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium" style={{ color: tokens.color.text }}>About Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <SmartLink
                      className="transition-colors hover:opacity-70"
                      style={{ color: tokens.color.mutedForeground }}
                      href={href}
                    >
                      {text}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium" style={{ color: tokens.color.text }}>Our Services</p>
              <ul className="mt-8 space-y-4 text-sm">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <SmartLink
                      className="transition-colors hover:opacity-70"
                      style={{ color: tokens.color.mutedForeground }}
                      href={href}
                    >
                      {text}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium" style={{ color: tokens.color.text }}>Helpful Links</p>
              <ul className="mt-8 space-y-4 text-sm">
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <SmartLink
                      href={href}
                      className={cn(
                        hasIndicator
                          ? 'group flex justify-center gap-1.5 sm:justify-start items-center'
                          : 'transition-colors hover:opacity-70'
                      )}
                    >
                      <span
                        className="transition-colors"
                        style={{ color: tokens.color.mutedForeground }}
                      >
                        {text}
                      </span>
                      {hasIndicator && (
                        <span className="relative flex size-2">
                          <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                            style={{ backgroundColor: tokens.color.primary }}
                          />
                          <span
                            className="relative inline-flex size-2 rounded-full"
                            style={{ backgroundColor: tokens.color.primary }}
                          />
                        </span>
                      )}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium" style={{ color: tokens.color.text }}>Contact Us</p>
              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, isAddress, href }, idx) => (
                  <li key={idx}>
                    <SmartLink
                    
                      className="flex items-start justify-center gap-2 sm:justify-start group"
                      href={href ?? "#"}
                    >
                      <Icon className="size-5 shrink-0" style={{ color: tokens.color.primary }} />
                      {isAddress ? (
                        <address
                          className="flex-1 not-italic transition-colors text-left"
                          style={{ color: tokens.color.mutedForeground }}
                        >
                          {text}
                        </address>
                      ) : (
                        <span
                          className="flex-1 transition-colors text-left"
                          style={{ color: tokens.color.mutedForeground }}
                        >
                          {text}
                        </span>
                      )}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-6" style={{ borderColor: tokens.color.border }}>
          <div
            className="text-center sm:flex sm:justify-between sm:text-left"
            style={{ color: tokens.color.mutedForeground }}
          >
            <p className="text-sm">
              <span className="block sm:inline">All rights reserved.</span>
            </p>

            <p className="mt-4 text-sm transition-colors sm:order-first sm:mt-0">
              &copy; {new Date().getFullYear()} {company.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}