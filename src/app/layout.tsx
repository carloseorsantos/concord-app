import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Concord - Watch Party & Streaming Discord Clone",
  description: "Plataforma de comunicação em tempo real e Watch Party com transmissão 60fps em alta fidelidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark h-full">
      <body className="bg-[#0E0F12] text-[#DBDEE1] h-full antialiased selection:bg-[#5865F2] selection:text-white">
        <ClerkProvider>
          <QueryProvider>
            <ModalProvider />
            {children}
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
