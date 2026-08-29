import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/cursor/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio V2 · Creative Developer",
  description:
    "Interactive, immersive portfolio — a creative developer fusing design, animation and 3D.",
  keywords: ["portfolio", "developer", "creative", "three.js", "web animation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${archivo.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-boot" strategy="beforeInteractive">
          {`(function () {
            try {
              var m = localStorage.getItem("theme") || "system";
              var t =
                m === "system"
                  ? window.matchMedia("(prefers-color-scheme: light)").matches
                    ? "light"
                    : "dark"
                  : m;
              document.documentElement.dataset.theme = t;
            } catch (e) {
              document.documentElement.dataset.theme = "dark";
            }
          })();`}
        </Script>
      </head>
      <body className="min-h-full">
        <CustomCursor />
        <ScrollProgress />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
