"use client";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { EnvelopeClosedIcon, MobileIcon, DrawingPinIcon,  LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";


const Footer = () => {

  // quick links
  const quickLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "FAQ", href: "/#faq" },
    { name: "Events", href: "/#events" },
    { name: "Locations", href: "/#locations" },
    { name: "Contact", href: "/#contact" },
  ];

  // services
  const services = [
    "XR Technologies Integration",
    "Game Development",
    "Application Development",
    "Digital Marketing",
    "Risk Management & Cybersecurity",
    "Transformation DevOps & Cloud",
    "AI Solutions"
  ];

  // social links
  const socialLinks = [
    { 
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/convergeinnov/",
      icon: <LinkedInLogoIcon className="w-5 h-5" />
    },
    { 
      name: "Facebook",
      href: "https://www.facebook.com/ConvergeInnov",
      icon: <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256"><g fill="#a1a1aa" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.016 4.432,10.984 10.206,11.852v-8.672h-2.969v-3.154h2.969v-2.099c0,-3.475 1.693,-5 4.581,-5c1.383,0 2.115,0.103 2.461,0.149v2.753h-1.97c-1.226,0 -1.654,1.163 -1.654,2.473v1.724h3.593l-0.487,3.154h-3.106v8.697c5.857,-0.794 10.376,-5.802 10.376,-11.877c0,-6.627 -5.373,-12 -12,-12z" /></g></g></svg>
    },
    { 
      name: "Twitter",
      href: "https://x.com/ConvergeinnovT",
      icon: <TwitterLogoIcon className="w-5 h-5" />
    }
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-background to-background/80 border-t border-divider">
      <div className="max-w-screen-xl mx-auto px-4 py-8 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 lg:pr-10">
            {/* logo */}
            <div className="flex items-center gap-3 mb-4">
              <Image src="/lightmodelogo.png" alt="ConvergeINNOV Logo" height={64} width={160} className="block dark:hidden h-16 w-auto" />
              <Image src="/darkmodelogo.png" alt="ConvergeINNOV Logo" height={64} width={160} className="hidden dark:block h-16 w-auto"/>
            </div>
            {/* description */}
            <p className="text-default-500 text-sm mb-6 leading-relaxed text-justify">
              Driving digital transformation through innovative technology
              solutions. Your trusted partner for cutting-edge IT services.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button key={social.name} as={Link} href={social.href} target="_blank" rel="noopener noreferrer" isIconOnly 
                  variant="light" size="sm" className="text-default-500 transition-colors duration-200" aria-label={social.name}
                >
                  {social.icon}
                </Button>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div className="lg:pl-14">
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-default-500 hover:text-primary text-sm transition-colors duration-200">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <div className="flex flex-col gap-2">
              {services.map((service) => (
                <span key={service} className="text-default-500 text-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded-lg text-primary mt-0.5"> <EnvelopeClosedIcon className="w-4 h-4" /> </div>
                <div>
                  <p className="text-default-500 text-sm"> contact@convergeinnov.com </p>
                  <p className="text-default-500 text-sm"> rh@convergeinnov.com </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded-lg text-primary mt-0.5">
                  <MobileIcon className="w-4 h-4" />
                </div>
                <div className="text-sm text-default-500">
                  <p>+216 23198524</p>
                  <p>+216 97131795</p>
                  <p>+33 667563880</p>
                  <p>+974 50690165</p>
                </div>
              </div>

              {/* Locations */}
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded-lg text-primary mt-0.5">
                  <DrawingPinIcon className="w-4 h-4" />
                </div>
                <div className="text-sm text-default-500">
                  <p className="mb-1">France: 135 Rue Du Plessis Bouchard</p>
                  <p>Tunisia: B19 Pole Technologique</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <Divider className="mb-8" />

        {/* Bottom Section */}
        <div className="flex justify-center items-center text-sm text-default-500 text-center">
          <p>
            © {new Date().getFullYear()} ConvergeINNOV. All rights reserved.
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;