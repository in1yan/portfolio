import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelLine,
  GeistPixelSquare,
  GeistPixelTriangle,
} from "geist/font/pixel";
import NavBar from "./components/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iniyan V | Full-Stack Developer & AI Systems",
  description:
    "Portfolio of Iniyan V - Full-Stack Developer specializing in FastAPI, React, AI agents, and cloud-native systems. Smart India Hackathon 2025 Winner.",
};
const items = [
  {
    location: "Home",
    href: "/",
  },
  {
    location: "About",
    href: "#whoami",
  },
  {
    location: "Highlights",
    href: "#accomplishments",
  },
  {
    location: "Projects",
    href: "#projects",
  },
  {
    location: "Resume",
    href: "/_resume.pdf",
  },
  {
    location: "GitHub",
    href: "https://github.com/in1yan",
  },
  {
    location: "LinkedIn",
    href: "https://linkedin.com/in/in1y4n",
  },
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${GeistPixelGrid.variable} ${GeistPixelCircle.variable} ${GeistPixelTriangle.variable} ${GeistPixelLine.variable}  ${GeistPixelSquare.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-primary">
        <div className="fixed top-0 left-0 w-full h-px z-9999">
          <div
            className="progress-bar h-full bg-secondary origin-left shadow-[0_0_10px_#ff3b3b]"
            style={{ transform: "scaleX(0)" }}
          ></div>
        </div>
        <div className="fixed top-0 inset-x-0 pt-5 z-50 pointer-events-none">
          <NavBar items={items} />
        </div>
        <main className="flex-1 flex">{children}</main>
      </body>
    </html>
  );
}
