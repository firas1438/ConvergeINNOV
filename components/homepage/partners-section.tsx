"use client";
import { motion } from "framer-motion";
import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Partners() {
  // List of partner images and names
  const images = [
    { name: "Partner 1", src: "/partners/image1.png", description: "An example is a commodity sale such as a long distance salesperson, shoe salesperson and to a degree a car salesperson. Their job is to find and convert buyers. A sales farmer is someone who creates sales demand through activities that directly influence and alter the buying process." },
    { name: "Partner 2", src: "/partners/image2.png", description: "" },
    { name: "Partner 3", src: "/partners/image3.png", description: "" },
    { name: "Partner 4", src: "/partners/image4.png", description: "" },
  ];

  return (
    <section id="partners" className="relative max-w-screen-xl w-full mx-auto px-4 pt-24 py-12 gap-10 md:px-8 flex flex-col justify-center items-center text-center">
      <motion.div initial={{ y: 20, opacity: 0, filter: "blur(3px)" }} whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.5, type: "spring", bounce: 0 }} className="flex flex-col gap-3">
        {/* header */}
        <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          Partners
        </h4>
      </motion.div>
      {/* marquee*/}
      <Marquee autoFill pauseOnHover gradient gradientColor="#131316" gradientWidth={100}>
          <div className="flex items-center justify-center gap-8 px-4">
            {images.map((img, index) => (
              <Tooltip content={img.description} key={img.name} className="max-w-sm">
                <Image src={img.src} alt={img.name} width={100} height={50} className="w-auto" />
              </Tooltip>
            ))}
          </div>
      </Marquee>
    </section>
  );
}