import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PrelineScriptWrapper from "./components/PrelineScriptWrapper";
import { Header, Footer } from "./shared/exporter";

// ✅ Import Google Fonts properly
import { Poppins, Cedarville_Cursive, Roboto_Slab } from "next/font/google";

// Initialize each font (you can pick subsets and weights)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const cedarville = Cedarville_Cursive({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cedarville",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto-slab",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${cedarville.variable} ${robotoSlab.variable}`}
    >
      <body className="bg-gray-100">
        <Header />
        <main className="lg:pt-21 pt-15">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
