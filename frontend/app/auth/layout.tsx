import "../globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import GoogleOAuthProvider from "@/provider/google-oauth-provider";

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
            {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
