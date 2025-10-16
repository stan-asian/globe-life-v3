import AboutClient from "./AboutClient/AboutClient";

interface AboutData {
  about: {
    intro: string;
    achievements: string;
    details: string[];
    closing: string;
  };
  location: {
    type: string;
    city: string;
    phone: string;
    fax: string;
    website: string;
  };
}

export default function About({ data }: { data: AboutData }) {
  return <AboutClient data={data} />;
}
