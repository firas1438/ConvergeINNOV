"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Locations() {
  return (
    <motion.section
      id="locations"
      initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0 }}
      className="relative w-full max-w-screen-xl mx-auto px-4 pt-32 pb-12 gap-5 md:px-8 flex flex-col justify-center items-center"
    >
      {/* header */}
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Locations
        </h4>
        <p className="max-w-xl text-muted-foreground text-center pb-8">
          Our business and product teams are spread over timezones with our
          Headquarters in Tunisia.
        </p>
      </div>

      <motion.div className="relative w-full max-w-5xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        {/* Light mode image */}
        <Image src="/lightmodelocations.png" alt="Our headquarters" className="block dark:hidden w-full h-auto object-cover" width={1200} height={800} priority={false} />
        {/* Dark mode image */}
        <Image src="/darkmodelocations.png" alt="Our headquarters" className="hidden dark:block w-full h-auto object-cover" width={1200} height={800} priority={false}/>
        {/* Gradient overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute bottom-0 left-0 w-full h-48 xl:h-52 lg:h-48 md:h-32 sm:h-16 max-sm:h-2 bg-gradient-to-t from-[#EEEEEC] to-transparent dark:from-[#131316]" />
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#EEEEEC] to-transparent dark:from-[#131316]" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#EEEEEC] to-transparent dark:from-[#131316]" />
        </div>

      </motion.div>
    </motion.section>
  );
}
