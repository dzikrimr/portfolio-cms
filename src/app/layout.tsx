import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { uploadRouter } from "./api/uploadthing/core";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const previewMono = JetBrains_Mono({
  variable: "--font-preview-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const previewDisplay = Space_Grotesk({
  variable: "--font-preview-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dspace Admin",
  description: "Portfolio content management dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${previewMono.variable} ${previewDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextSSRPlugin routerConfig={extractRouterConfig(uploadRouter)} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
