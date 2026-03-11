import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Movie Bus - Stream Premium Movies",
  description: "Your destination for streaming premium movies. Subscribe or pay per view.",
  keywords: ["movies", "streaming", "free movies", "download", "entertainment"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
