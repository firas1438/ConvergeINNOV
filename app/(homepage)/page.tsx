  "use client"
  import { useState, useEffect } from 'react';
  import NavBar from '@/components/homepage/navbar';
  import Hero from "@/components/homepage/hero-section";
  import Partners from "@/components/homepage/partners-section";
  import Testimonials from "@/components/homepage/testimonials-section";
  import Faq from "@/components/homepage/faq-section";
  import Footer from "@/components/homepage/footer";
  import Locations from "@/components/homepage/locations-section";
  import Contact from "@/components/homepage/contact-section";
  import About from "@/components/homepage/about-section";
  import Services from "@/components/homepage/services-section";
  import Events from "@/components/homepage/events-section";
  import Image from 'next/image';


  export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    // timeout
    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);

    // track viewer count (increment each visit)
    useEffect(() => {
        fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: "/" }),
        });
    }, []);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-dvh">
          <div className="animate-pulse">
            <Image src="/lightmodelogo.png" alt="logo" width={200}  height={200} priority className='block dark:hidden'/>
            <Image src="/darkmodelogo.png" alt="logo" width={200}  height={200} priority className='hidden dark:block'/>
          </div>
        </div>
      );
    }

    return (
      <main className={`flex flex-col overflow-clip min-h-dvh ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>        
        <NavBar />
        <Hero />
        <About/>
        <Services/>
        <Partners />
        <Testimonials />
        <Faq />
        <Events/>
        <Locations/>
        <Contact/>
        <Footer />
      </main>
    );
  }