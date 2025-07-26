// header.tsx
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { PersonIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon, EyeOpenIcon  } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSession } from "next-auth/react";



import ThemeSwitcher from "../homepage/theme-switcher";

type HeaderProps = { onToggleSidebar: () => void; isSidebarCollapsed: boolean;};

export default function Header({ onToggleSidebar, isSidebarCollapsed }: HeaderProps) {


  const { data: session } = useSession();
  const username = session?.user?.name;
  const email = session?.user?.email;

  return (
    <Navbar isBlurred maxWidth="full">
      
      <NavbarContent justify="start">
        {/* sidebar toggle button */}
        <NavbarItem>
          <Button isIconOnly variant="light" onPress={onToggleSidebar}>
            {isSidebarCollapsed ? ( <DoubleArrowRightIcon className="w-4 h-4" />) : (<DoubleArrowLeftIcon className="w-4 h-4" />)}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        
        {/* helper icons */}
        <NavbarItem>
          <div>
            <Button isIconOnly as={Link} href="/" target="_blank" rel="noopener noreferrer" variant="light" > <EyeOpenIcon/> </Button>
            <ThemeSwitcher />
          </div>
          
        </NavbarItem>


        {/* profile info */}
        <NavbarItem className="flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium text-foreground">{username}</span>
            <span className="text-xs text-default-500">{email}</span>
          </div>
          <Avatar className="w-10 h-10">
            <PersonIcon className="w-5 h-5" />
          </Avatar>
        </NavbarItem>

      </NavbarContent>
    </Navbar>
  );
}