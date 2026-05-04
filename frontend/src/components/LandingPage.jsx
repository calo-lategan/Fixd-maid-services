import Header from "./Header";
import Hero from "./Hero";
import Trust from "./Trust";
import Services from "./Services";
import HowItWorks from "./HowItWorks";
import BeforeAfter from "./BeforeAfter";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";
import MobileStickyBar from "./MobileStickyBar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <HowItWorks />
        <BeforeAfter />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
