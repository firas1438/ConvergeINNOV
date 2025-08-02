"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { DashboardIcon, InfoCircledIcon, RocketIcon, ChatBubbleIcon, QuestionMarkCircledIcon, CalendarIcon, EnvelopeClosedIcon, ExitIcon,} from "@radix-ui/react-icons";
import Image from "next/image";


const SidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon className="w-5 h-5" /> },
  { name: "About", href: "/dashboard/about", icon: <InfoCircledIcon className="w-5 h-5" /> },
  { name: "Services", href: "/dashboard/services", icon: <RocketIcon className="w-5 h-5" /> },
  { name: "Testimonials", href: "/dashboard/testimonials", icon: <ChatBubbleIcon className="w-5 h-5" /> },
  { name: "FAQ", href: "/dashboard/faq", icon: <QuestionMarkCircledIcon className="w-5 h-5" /> },
  { name: "Events", href: "/dashboard/events", icon: <CalendarIcon className="w-5 h-5" /> },
  { name: "Contact", href: "/dashboard/contact", icon: <EnvelopeClosedIcon className="w-5 h-5" /> },
];

type SidebarProps = { isCollapsed: boolean };

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const openLogoutModal = () => setLogoutModalOpen(true);
  const closeLogoutModal = () => setLogoutModalOpen(false);
  const handleLogout = () => signOut({ callbackUrl: "/login" });

  return (
    <aside className={`h-screen ${isCollapsed ? "w-28" : "w-28 lg:w-64"} px-3 pt-6 pb-6 flex flex-col transition-all duration-300 ease-in-out`}>
      
      {/* logo */}
      <div className="flex items-center justify-center px-1 mb-10 shrink-0">
        <Image src="/logo.png" alt="Mobile ConvergeINNOV Logo" width={64} height={64} className={`p-2 h-16 w-auto ${isCollapsed ? "block" : "block lg:hidden"}`}/>
        <Image src="/lightmodelogo.png" alt="ConvergeINNOV Light Logo" width={160} height={64} className={`${isCollapsed ? "hidden" : "hidden lg:block dark:hidden"} h-16 w-auto`}/>
        <Image src="/darkmodelogo.png" alt="ConvergeINNOV Dark Logo" width={160} height={64} className={`${isCollapsed ? "hidden" : "hidden lg:dark:block"} h-16 w-auto`}/>
      </div>

      {/* sidebar items */}
      <div className="flex-1 overflow-y-auto mb-8">
        <nav className="flex flex-col gap-2">
          {SidebarLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.name} showArrow={true} content={item.name} placement="right" isDisabled={!isCollapsed} className="text-sm">
                <Button
                  as={Link}
                  href={item.href}
                  variant={isActive ? "solid" : "light"}
                  size="md"
                  className={`w-full transition-all duration-200 ${isActive ? "bg-primary/10 text-primary font-semibold" : "hover:bg-default-100"}`}
                >
                  <div className={`flex items-center gap-3 w-full ${isCollapsed ? "justify-center" : "justify-center lg:justify-start"}`}>
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className={`${isCollapsed ? "hidden" : "hidden lg:inline"} whitespace-nowrap`}>{item.name}</span>
                  </div>
                </Button>
              </Tooltip>
            );
          })}
        </nav>
      </div>

      {/* sign out button */}
      <Tooltip content="Sign Out" showArrow={true} placement="right" isDisabled={!isCollapsed} className="text-sm mt-4">
        <Button variant="flat" className={`w-full rounded-3xl ${isCollapsed ? "" : "lg:w-auto"}`} onPress={openLogoutModal}>
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-center lg:gap-2"}`}>
            <ExitIcon className="w-4 h-4" />
            <span className={`${isCollapsed ? "hidden" : "hidden lg:inline"}`}>Logout</span>
          </div>
        </Button>
      </Tooltip>

      {/* logout confirmation modal */}
      <Modal backdrop="blur" isOpen={isLogoutModalOpen} onClose={closeLogoutModal}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Confirm Logout</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to log out?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onPress={closeLogoutModal}>Cancel</Button>
                <Button color="primary" onPress={handleLogout}>Confirm</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </aside>
  );
}
