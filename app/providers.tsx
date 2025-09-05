"use client";

import { HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
            <ToastProvider />
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
    </SessionProvider>
  );
}
