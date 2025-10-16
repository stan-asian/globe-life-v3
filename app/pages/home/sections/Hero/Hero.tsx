import HeroClient from "./HeroClient/HeroClient";

// Import the type from HeroClient (export it there if not yet)
import type { HeroData } from "./HeroClient/HeroClient";

export default function Hero({ data }: { data: HeroData }) {
  return <HeroClient data={data} />;
}
