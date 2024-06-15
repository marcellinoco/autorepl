import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import GoogleOAuthProvider from "@/provider/google-oauth-provider";
import Sidebar from "@/components/common/sidebar/sidebar";

export const metadata: Metadata = {
  title: "Autorepl.AI",
  description: "Email response makes easy",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
        suppressHydrationWarning={true}
      >
        <GoogleOAuthProvider>
          <div className="overflow-hidden max-h-screen flex border bg-background shadow-lg">
            <Sidebar />
            {children}
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
