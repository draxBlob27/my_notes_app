import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NoteMind | Your AI-Powered Second Brain",
  description: "NoteMind is an advanced note-taking platform featuring semantic search, a custom vector database, and RAG-powered AI chat. Chat with your notes and organize your thoughts with Llama 3.1.",
  keywords: ["Notes", "AI", "Vector Database", "RAG", "Llama 3.1", "Semantic Search", "Productivity"],
  authors: [{ name: "Sanil" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f172a]`}
      >
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}