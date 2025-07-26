"use client";
import LoginForm from "@/components/auth/loginform";
import { motion } from "framer-motion";
import NavBar from "@/components/homepage/navbar";
import { Card, CardHeader, CardBody, Input, Button, Form } from "@heroui/react";

export default function Login() {
  return (
    <div className="min-h-dvh max-h-dvh flex flex-col overflow-hidden">
      {/* background gradient */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }} className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none" >
        <div className="w-3/5 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[70px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg] [will-change:transform]"></div>
        </div>
      </motion.div>
      <NavBar />
      
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative flex-1 flex items-center justify-center px-4 py-8 overflow-y-auto">
        {/* card */}
        <div className="w-full max-w-md z-10 my-8">
          <Card className="bg-gradient-to-br from-card/80 via-card to-card/60 px-6 shadow-xl rounded-2xl">
            {/* card header */}
            <CardHeader className="flex-col items-center pb-4">
              {/* logo */}
              <div className="mb-6 min-w-24">
                <img src="/lightmodelogo.png" alt="ConvergeINNOV Light Logo" className="block dark:hidden h-20 w-auto" />
                <img src="/darkmodelogo.png" alt="ConvergeINNOV Dark Logo" className="hidden dark:block h-20 w-auto" />
              </div>
              {/* header */}
              <h3 className="text-xl sm:text-2xl font-bold text-primary text-center uppercase font-geistMono">Login</h3>
              <p className="text-sm text-default-500 text-center">Sign in to your account</p>
            </CardHeader>
            {/* login form */}
            <CardBody>
              <LoginForm/>
            </CardBody>
          </Card>
        </div>

      </motion.section>
      
    </div>
  );
}