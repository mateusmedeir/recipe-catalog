import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/auth.context";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Recipe Catalog",
  description: "A simple recipe catalog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="flex w-full min-h-svh">
        <AuthProvider>
          <Toaster />
          <Suspense>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
