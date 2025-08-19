  "use client"
  
  import { useEffect } from 'react';
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

  export default function Home() {

    // track viewer count (increment each visit)
    useEffect(() => {
        fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: "/" }),
        });
    }, []);

    return (
      <main className={`flex flex-col overflow-clip min-h-dvh `}>        
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