import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Outcomes from "../components/Outcomes";
import Testimonials from "../components/Testimonials";
import Courses from "../components/Courses";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Courses />
      <Outcomes />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
