import Header from "@/components/live/header";
import Hero from "@/components/live/hero";
import About from "@/components/live/about";
import Pricing from "@/components/live/pricing";
import Faq from "@/components/live/faq";
import Footer from "@/components/live/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gpt-bg">
      <Header />
      <main>
        <Hero />
        <div id="about" />
        <About />
        <div id="pricing" />
        <Pricing />
        <div id="faq" />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
