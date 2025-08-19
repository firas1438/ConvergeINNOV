"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, CardBody, Image, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { CalendarIcon, GlobeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type EventItem = {
  title: string;
  date: Date;
  location: string;
  image: string;
  description: string;
};

export default function Events() {
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch data from /api/events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setEventItems(data.events);
      } catch (error) {
        console.error("Failed to load Events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // slider/carousel settings
  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "free-snap",
    slides: { perView: 1, spacing: 15 },
    breakpoints: {
      "(min-width: 300px)": { slides: { perView: 1, spacing: 20 } },
      "(min-width: 500px)": { slides: { perView: 2, spacing: 20 } },
      "(min-width: 640px)": { slides: { perView: 2, spacing: 15 } },
      "(min-width: 768px)": { slides: { perView: 3, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 15 } },
      "(min-width: 1280px)": { slides: { perView: 4, spacing: 15 } },
    },
    created() {
      // This ensures the slider is properly initialized when created
      setTimeout(() => {sliderInstance.current?.update();}, 10);
    },
  });

  // Refresh slider when data loads
  useEffect(() => {
    if (!loading && sliderInstance.current) {
      sliderInstance.current.update();
    }
  }, [loading, sliderInstance]);


  return (
    <motion.section 
        id="events" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} 
        transition={{ duration: 0.9, delay: 0.5, type: "spring", bounce: 0 }} 
        className="relative w-full max-w-screen-xl mx-auto px-4 pt-32 pb-12 gap-5 md:px-8 flex flex-col justify-center items-center"
    >
      {/* header */}
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">Events</h4>
        <p className="max-w-xl text-muted-foreground text-center">Our upcoming and previously organized events.</p>
      </div>

      {/* event carousel */}
      <div ref={sliderRef} className="keen-slider w-full">
        {eventItems.map((event) => {
          const eventDate = new Date(event.date);
          const now = new Date();
          const isUpcoming = eventDate >= now;

          return (
            <div key={event.title} className="keen-slider__slide py-5">
              <Card className="relative overflow-hidden group flex flex-col h-full before:absolute before:inset-0 before:bg-gradient-to-tl before:from-primary/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-400 hover:before:opacity-100">
                <Image src={event.image} alt={event.title} className="w-full h-48 object-cover rounded-t-lg flex-shrink-0" removeWrapper />
                <CardBody className="p-4 space-y-1 flex flex-col flex-grow min-h-[180px]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{event.title}</h3>
                    {isUpcoming && <Chip size="sm" color="primary">Upcoming</Chip>}
                  </div>
                  <p className="text-xs text-muted-foreground pb-2 flex-grow">{event.description}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{eventDate.toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <GlobeIcon className="w-5 h-5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}