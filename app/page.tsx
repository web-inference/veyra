import { Community } from "@/components/sections/Community";
import { Destinations } from "@/components/sections/Destinations";
import { Discover } from "@/components/sections/Discover";
import { Faq } from "@/components/sections/Faq";
import { FooterCta } from "@/components/sections/FooterCta";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { Trusted } from "@/components/sections/Trusted";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Destinations />
        <Discover />
        <Trusted />
        <Community />
        <Testimonials />
        <Faq />
      </main>
      <FooterCta />
    </>
  );
}
