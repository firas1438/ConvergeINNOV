"use client";

import { HeroUIProvider } from "@heroui/react";
import {ToastProvider} from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* <QueryClientProvider client={queryClient}> */}
        <HeroUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <ToastProvider />
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      {/* </QueryClientProvider> */}
    </SessionProvider>
  );
}
