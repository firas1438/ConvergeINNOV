"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { StarFilledIcon} from "@radix-ui/react-icons";


type TestimonialItem = { rating: number; name: string; role: string; testimonial: string;};

export default function Testimonials() {
  const [testimonialItems, setTestimonialItems] = useState<TestimonialItem[]>([]);

  {/* fetch data from /api/testimonials */}
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setTestimonialItems(data);
      } catch (error) {
        console.error("Failed to load Testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);


  return (
    <section id="testimonials" className="relative pt-24 pb-12 px-4 max-w-6xl mx-auto" style={{ minHeight: "600px" }} >
      
      {/* page content */}
      <div className="relative z-10">
        {/* header */}
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center mb-8 flex flex-col gap-3">
          <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
            Testimonials
          </h4>
          <p className="mx-auto max-w-xl text-muted-foreground text-center">
            Join a growing number of companies that trust our platform.
          </p>
        </motion.div>
        {/* testimonials */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonialItems.map((testimonial, index) => (
            <motion.div
              key={index} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut",}} className="flex flex-col h-full"
            >
              <div className="p-6 rounded-xl bg-card border border-border transition-transform duration-300 hover:rotate-1 hover:scale-[1.01] transform flex flex-col flex-grow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarFilledIcon className="text-yellow-500" key={i}/>
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed text-sm flex-grow">
                  &ldquo;{testimonial.testimonial}&rdquo;
                </p>

                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-sm font-medium border border-primary/20">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* background gradient in bottom left */}
      <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.2 }} className="absolute bottom-[-50px] left-[-150px] w-[250px] h-[250px] bg-gradient-to-br from-[#a4579f] to-[#ffa5ff] opacity-20 blur-[150px] rounded-full pointer-events-none z-0"/>
    
    </section>
  );
}
