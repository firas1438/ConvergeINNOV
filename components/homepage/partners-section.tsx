"use client";
import { motion } from "framer-motion";
import { Tooltip } from "@heroui/tooltip";
import { Image } from "@heroui/react"; 
import Marquee from "react-fast-marquee";
import { useEffect, useState } from "react";

{/* data structure */}
type PartnerItem = {
  _id: string;
  name: string;
  description: string;
  imagepath: string;
};

export default function Partners() {
  const [partnerItems, setPartnerItems] = useState<PartnerItem[]>([]);

  {/* fetch data from /api/partners */}
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setPartnerItems(data);
      } catch (error) {
        console.error("Failed to load partners", error);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section id="partners" className="relative max-w-screen-xl w-full mx-auto px-4 pt-24 py-12 gap-10 md:px-8 flex flex-col justify-center items-center text-center">
      {/* header */}
      <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center mb-2 flex flex-col gap-3">
        <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Partners
        </h4>
        <p className="mx-auto max-w-xl text-muted-foreground text-center">
          Join our partners who are shaping the future with us.
        </p>
      </motion.div>

      {/* partners */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden">
        {/* left gradient */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-20 lg:w-60 bg-gradient-to-r from-background to-transparent" />
        {/* right gradient */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-20 lg:w-60 bg-gradient-to-l from-background to-transparent" />
        {/* marquee */}
        <Marquee autoFill pauseOnHover>
          <div className="flex items-center justify-center gap-8 px-4">
            {partnerItems.map((partner) => (
              <Tooltip content={partner.description} key={partner._id} className="max-w-sm">
                <Image src={partner.imagepath} alt={partner.name} width={100} height={50} className="w-auto h-12 object-contain dark:filter-none filter invert" />
              </Tooltip>
            ))}
          </div>
        </Marquee>
      </div>

    </section>
  );
}
