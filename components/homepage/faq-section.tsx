"use client";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { motion } from "framer-motion";

{/* data structure */}
type FAQItem = {
  question: string;
  answer: string;
};

export default function Faq() {
  const [accordionItems, setAccordionItems] = useState<FAQItem[]>([]);

  {/* fetch data from /api/faqs */}
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch("/api/faqs");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setAccordionItems(data);
      } catch (error) {
        console.error("Failed to load FAQs:", error);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <motion.section
      id="faq"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0 }}
      className="relative w-full max-w-screen-xl mx-auto px-4 pt-28 pb-12 gap-5 md:px-8 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          FAQ
        </h4>
        <p className="max-w-xl text-muted-foreground text-center pb-2">
          Here are some of our frequently asked questions.
        </p>
      </div>
      <div className="flex w-full max-w-5xl">
        <Accordion
          fullWidth selectionMode="multiple" variant="splitted"
          motionProps={{
            variants: {
              enter: { y: 0, opacity: 1, height: "auto", transition: { height: { type: "spring", stiffness: 500, damping: 30, duration: 0.5,}, opacity: { easings: "ease", duration: 0.5 }, },},
              exit: { y: -10, opacity: 0, height: 0, transition: { height: { easings: "ease", duration: 0.25 }, opacity: { easings: "ease", duration: 0.25 }, },}, },
          }}
          className="gap-y-3"
        >
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              aria-label={item.question}
              title={item.question}
              classNames={{ base: "group", title: "text-muted-foreground group-hover:text-primary transition-colors", trigger: "hover:text-primary", }}
            >
              <div className="text-muted-foreground pb-3">
                {item.answer}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
