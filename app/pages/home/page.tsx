import About from "./sections/About/About";
import Hero from "./sections/Hero/Hero";
import Career from "./sections/Career/Career";
import Majidi from "@/app/pages/home/agent-info/Majidi.json";

export default function Home() {
  return (
    <>
      <main>
        <Hero data={Majidi.heroClient} />
        <About data={Majidi.agentProfile} />
        <Career />
      </main>
    </>
  );
}
