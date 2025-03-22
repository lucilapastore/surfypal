import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import { SurfyPalProvider } from "@/context/surfypal-context";
import MiniKitProvider from "@/context/world-context";
import { Inter } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SurfyPal – Stay with Locals, Explore the World",
  description:
    "SurfyPal is a decentralized travel platform where you can stay with locals, experience authentic cultures, and connect with a global community. Verified with World ID and powered by blockchain-based Trust Scores, SurfyPal helps you find safe, secure, and trustworthy stays.",
  keywords:
    "Stay with locals, authentic travel, travel community, blockchain travel, trust-based travel, verified Hosts, SurfyPal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MiniKitProvider>
            <SurfyPalProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                    {children}
                  </div>
                </main>
                <Footer />
              </div>
            </SurfyPalProvider>
          </MiniKitProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
