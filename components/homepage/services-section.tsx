"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useEffect, useState } from "react";

{/* data structure */}
type ServiceItem = {
  category: string;
  title: string;
  imageUrl: string;
  description: string;
};

export default function Services() {
    const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);

    {/* fetch data from /api/services */}
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const res = await fetch("/api/services");
          if (!res.ok) throw new Error("Failed to fetch data");
          const data = await res.json();
          setServiceItems(data);
        } catch (error) {
          console.error("Failed to load FAQs:", error);
        }
      };

      fetchServices();
    }, []);

  return (
    <section id="services" className="relative pt-32 pb-12 px-4 max-w-screen-xl mx-auto" style={{ minHeight: "600px" }}>
      {/* background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
        className="absolute bottom-[-0px] right-[-150px] w-[250px] h-[250px] bg-gradient-to-br from-[#a4579f] to-[#ffa5ff] opacity-20 blur-[150px] rounded-full pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 justify-center items-center mb-10 max-w-xl text-center"
        >
          <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
            Services
          </h4>
          <p className="text-muted-foreground">
            We offer a range of solutions designed to meet our clients' needs.
          </p>
        </motion.div>

        {/* cards */}
        <div className="grid gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-content-center">
          {serviceItems.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.1, ease: "easeOut", }} 
              whileHover={{ scale: 1.02, transition: { duration: 0.15, ease: "easeOut" }, }}
              className="group"
            >
              <Card className="py-4 w-full max-w-[360px]">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny text-primary uppercase font-bold">
                    {service.category}
                  </p>
                  <h4 className="font-bold text-large  bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
                    {service.title}
                  </h4>
                </CardHeader>
                <CardBody className="overflow-visible">
                  <Image alt={service.title} className="object-cover rounded-xl max-h-40 w-full" src={service.imageUrl} width={340}/>
                  <p className="text-default-500 px-1 mt-4 text-[0.95rem] leading-snug">
                    {service.description}
                  </p>
                </CardBody>

              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
