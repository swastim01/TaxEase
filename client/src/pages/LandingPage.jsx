import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks"; // Renamed for consistency
import Faq from "../components/Faq";
import Contact from "../components/Contact";

const LandingPage = () => {
  return (
    <main>

      <section id="home" aria-label="Home Section">
        <Hero />
      </section>
      
      <section id="about" aria-label="About Us">
        <About />
      </section>

      <section id="how-it-works" aria-label="How It Works">
        <HowItWorks />
      </section>

      <section id="faq" aria-label="Frequently Asked Questions">
        <Faq />
      </section>

      <section id="contact" aria-label="Contact Us">
        <Contact />
      </section>
    </main>
  );
};

export default LandingPage;
