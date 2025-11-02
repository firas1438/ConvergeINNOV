import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import Link from "next/link";
import { Button } from "@heroui/button";
import ThemeSwitcher from "../theme-switcher";
import { useState } from "react";
import Image from "next/image";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";


export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const MenuItems = [
    { name: "About", href: "#about" }, 
    { name: "Services", href: "#services" }, 
    { name: "Testimonials", href: "#testimonials" }, 
    { name: "FAQ", href: "#faq" },
    { name: "Events", href: "#events" },
    { name: "Locations", href: "#locations" }, 
    { name: "Contact", href: "#contact" },
  ];

  return (
    <Navbar isBlurred maxWidth="xl" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      {/* Toggle mobile mode */}
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Logo */}
      <NavbarContent className="lg:hidden" justify="center">
        <NavbarBrand>
          <Link href="/" className="flex justify-center items-center">
            <Image src="/lightmodelogo.png" alt="ConvergeINNOV Logo" width={96} height={64} className="block dark:hidden w-auto h-auto max-h-16 min-w-24" />
            <Image src="/darkmodelogo.png" alt="ConvergeINNOV Logo" width={96} height={64} className="hidden dark:block w-auto h-auto max-h-16 min-w-24" />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        {MenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link className="block w-full text-sm px-4 py-2 rounded-xl transition-colors duration-200 hover:bg-primary/10" 
              href={item.href} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}
            className="w-full group flex justify-between text-sm items-center bg-primary text-primary-foreground font-medium px-4 py-2 rounded-xl transition-colors duration-200 hover:bg-primary/90">
            Dashboard <OpenInNewWindowIcon className="w-4 h-4" />
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>

      {/* Desktop Menu */}
      <NavbarContent className="hidden lg:flex gap-2" justify="center">
        <NavbarBrand>
          <Link href="/" className="flex items-center justify-center">
            <div className="relative h-36 w-36 lg:mr-4">
              <Image src="/lightmodelogo.png" alt="ConvergeINNOV Logo" fill className="object-contain block dark:hidden" priority />
              <Image src="/darkmodelogo.png" alt="ConvergeINNOV Logo" fill className="object-contain hidden dark:block" priority />
            </div>
          </Link>
        </NavbarBrand>
        {MenuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Button as={Link} href={item.href} variant="light" size="md">{item.name}</Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Desktop SignIn Button */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" variant="solid" size="sm" endContent={<OpenInNewWindowIcon className="w-4 h-4" />} className="hidden lg:flex rounded-3xl px-5 font-geist" href="/dashboard">
            Dashboard
          </Button>
        </NavbarItem>
        <NavbarItem><ThemeSwitcher /></NavbarItem>
      </NavbarContent>

    </Navbar>
  );
}