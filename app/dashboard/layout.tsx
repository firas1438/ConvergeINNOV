// layout.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import Image from "next/image";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { status } = useSession();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // redirect user to login page if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {router.push("/login");}
  }, [status, router]);

  // loading screen
  if (status !== "authenticated") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="animate-pulse">
             <Image src="/lightmodelogo.png" alt="logo" width={200}  height={200} priority className='block dark:hidden'/>
             <Image src="/darkmodelogo.png" alt="logo" width={200}  height={200} priority className='hidden dark:block'/>
          </div>
      </main>
    );
  }

  const toggleSidebar = () => { setIsSidebarCollapsed(!isSidebarCollapsed);};

  return (
    <div className="flex h-screen overflow-hidden">
      {/* sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div className="flex flex-col flex-1 overflow-auto">
        {/* navbar */}
        <Header onToggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
        {/* page content */}
        <main className="flex-1 px-8 py-6 overflow-y-auto ">
          {children}
        </main>
      </div>
      
    </div>
  );
}