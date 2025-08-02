"use client";
import { motion } from "framer-motion";
import Spline3D from "./spline";
import Particles from "./particles";

export default function Hero() {


  return (
    <div className="relative justify-center items-center">

      {/* page content */}
      <section id="hero" className="z-10 w-full max-w-screen-xl mx-auto px-4 pt-24 pb-12 md:pt-24 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div className="z-10 flex flex-col justify-center items-center space-y-6 w-full max-w-4xl mx-auto text-center px-4 sm:px-0">
          {/* animated border text */}
          <motion.div initial={{ scale: 1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative w-fit rounded-3xl p-[1px] overflow-hidden mb-1">
            <span className="absolute inset-[-500%] md:inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a4579f_0%,#c98fc5_50%,#f0d6ef_70%,#eeeeec_100%)] opacity-80 hover:opacity-100 transition-opacity" />
            <span className="relative w-fit h-full text-sm bg-card px-4 py-2 rounded-3xl font-cinzel block backdrop-blur-sm">
              ConvergeINNOV
            </span>
          </motion.div>
          {/* header */}
          <motion.h1 initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mx-auto text-pretty bg-gradient-to-b from-[#a4579f] dark:from-white to-foreground dark:to-foreground bg-clip-text text-transparent">
            Cutting-Edge AR/VR, Metaverse & Custom Web/Mobile Experiences
          </motion.h1>
          {/* description */}
          <motion.p initial={{ y: 0, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }} className="w-full max-w-xl text-base sm:text-lg mx-auto text-muted-foreground ">
            We craft tailored immersive and interactive digital solutions to transform your business vision into reality.
          </motion.p>
          {/* 3d model */}
          <motion.div initial={{ opacity: 0, y: 0, }} animate={{ opacity: 1, y: [0, -10, 0] }}  transition={{opacity: { duration: 1, ease: "easeIn" }, y: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "loop" } }} className=" flex items-center justify-center w-full overflow-hidden relative h-[220px] xs:h-[150] mt-4">
            <div className="scale-75 sm:scale-80 md:scale-90 lg:scale-100 xl:scale-100 origin-center  transition-transform duration-400 ease-in-out">
              <Spline3D />
            </div>
          </motion.div>
          
        </motion.div>
      </section>

      {/* purple light gradient */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3, delay: 0.3, type: "spring", bounce: 0 }} className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none ">
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[700px] bg-light blur-[70px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg] [will-change:transform]"></div>
        </div>
      </motion.div>

      {/* particles background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <Particles particleColors={['#ffffff', '#ffffff']} particleCount={500} particleSpread={15} speed={0.02} particleBaseSize={70} moveParticlesOnHover={false} alphaParticles={true} disableRotation={false} />
      </div>

    </div>
  );
}