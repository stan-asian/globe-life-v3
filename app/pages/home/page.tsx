import About from "./sections/About/About";
import Hero from "./sections/Hero/Hero";
import Career from "./sections/Career/Career";
import Ratings from "./sections/Ratings/Ratings";
import StartCareer from "./sections/StartCareer/StartCareer";
import Slider from "./sections/Slider/Slider";

import Majidi from "@/app/pages/home/agent-info/Majidi.json";
import CustomerCare from "./sections/CustomerCare/CustomerCare";
import ContactUs from "./sections/ContactUs/ContactUs";

export default function Home() {
  return (
    <>
      <main>
        <Hero data={Majidi.heroClient} />
        <About data={Majidi.agentProfile} />
        <Career />
        <Ratings />
        <StartCareer />
        <Slider />
        <CustomerCare />
        <ContactUs />
      </main>
    </>
  );
}
