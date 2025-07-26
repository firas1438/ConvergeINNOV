"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PersonIcon, GearIcon, HeartIcon, GlobeIcon, TextAlignRightIcon } from "@radix-ui/react-icons";
import { MetricCard } from "./metriccard";

{/* data structure */}
type Mission = { 
  title: string; 
  mission: string 
};
type Metric = { 
  metric: string; 
  description: string 
};

export default function About() {
  const [intro, setIntro] = useState<string>("");
  const [missions, setMissions] = useState<Mission[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  {/* fetch data from /api/about */}
  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch("/api/about"); 
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setIntro(data.intro); setMissions(data.missions); setMetrics(data.metrics);
      } catch (error) {
        console.error("Failed to fetch about page content:", error);
      }
    }

    fetchAbout();
  }, []);


  return (
    <motion.section
      id="about"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
      className="relative w-full max-w-screen-xl mx-auto px-4 pt-32 pb-14 md:px-8"
    >
      {/* header */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-xl font-semibold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text mb-12">
          About Us
        </h2>
      </div>

      {/* main grid */}
      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
          className="flex flex-col gap-6 px-4"
        >
          {/* introduction */}
          <p className="text-justify text-foreground-600 text-[1.05rem] mb-2">
            {intro}
          </p>

          {/* missions */}
          {missions.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 cursor-pointer group transform transition-transform duration-200 hover:scale-[1.02]"
            >
              <div>
                <h4 className="font-semibold text-md text-[#a4579f] group-hover:text-[#944a98] flex items-center gap-1">
                  <TextAlignRightIcon className="w-4 h-4" /> &nbsp; {item.title}
                </h4>
                <p className="text-foreground-600">{item.mission}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* right metrics */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
          className="flex flex-col gap-4 px-2 md:px-0"
        >
          {metrics.length >= 4 && (
            <>
              <MetricCard
                icon={<PersonIcon className="w-6 h-6 text-[#a4579f]" />}
                reverse={false}
                metric={metrics[0].metric}
                description={metrics[0].description}
              />
              <MetricCard
                icon={<GearIcon className="w-6 h-6 text-[#a4579f]" />}
                reverse={true}
                metric={metrics[1].metric}
                description={metrics[1].description}
              />
              <MetricCard
                icon={<HeartIcon className="w-6 h-6 text-[#a4579f]" />}
                reverse={false}
                metric={metrics[2].metric}
                description={metrics[2].description}
              />
              <MetricCard
                icon={<GlobeIcon className="w-6 h-6 text-[#a4579f]" />}
                reverse={true}
                metric={metrics[3].metric}
                description={metrics[3].description}
              />
            </>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
