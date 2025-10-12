import HeroClient from "./HeroClient/HeroClient";

export default function Hero({ data }: { data: any }) {
  return <HeroClient data={data} />;
}
