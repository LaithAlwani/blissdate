import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { AppWrapper } from "@/lib/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bliss Date",
  description: "The new way to find a partner!",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa", "dating"],
  authors: [
    {
      name: "Laith Alwani",
      url: "https://www.linkedin.com/in/laith-alwani/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/dating-128.png" },
    { rel: "icon", url: "/dating-128.png" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AppWrapper>
            <Navbar />
            <main>{children}</main>
          </AppWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
