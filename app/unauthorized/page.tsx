"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody } from "@heroui/react";
import Image from "next/image";
import ReturnButton from "@/components/return-button";

export default function Unauthorized() {
  return (
    <motion.section className="min-h-dvh max-h-dvh flex flex-col overflow-hidden">
      {/* Background gradient */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }} className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none">
        <div className="w-3/5 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[70px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg] [will-change:transform]"></div>
        </div>
      </motion.div>

      {/* Return button */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-4">
        <ReturnButton />
      </motion.div>

      {/* Centered card */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
        <div className="w-full max-w-md z-10">
          <Card className="bg-gradient-to-br from-card/80 via-card to-card/60 p-8 shadow-xl rounded-2xl">
            {/* Card header */}
            <CardHeader className="flex-col items-center pb-4">
              {/* Logo */}
              <div className="mb-4 min-w-24">
                <Image src="/logo.png" alt="ConvergeINNOV Logo" width={160} height={80} className="block h-20 w-auto"
                />
              </div>
              {/* Header */}
              <h3 className="text-xl sm:text-2xl font-bold text-primary text-center uppercase font-geistMono mb-2">
                Access Denied
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                You do not have permission to view this page.
              </p>
            </CardHeader>
          </Card>
        </div>
      </motion.div>
    </motion.section>
  );
}