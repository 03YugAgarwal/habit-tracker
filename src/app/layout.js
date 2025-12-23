import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Habit Tracker",
    template: "%s · Habit Tracker",
  },
  description:
    "Track your daily habits with a GitHub-style heatmap. Build consistency, visualize progress, and stay accountable over time.",

  keywords: [
    "habit tracker",
    "daily habits",
    "habit tracking app",
    "productivity",
    "consistency",
    "github style heatmap",
    "self improvement",
  ],

  openGraph: {
    title: "Habit Tracker",
    description:
      "A simple habit tracker inspired by GitHub contribution graphs. Track habits daily and visualize progress over time.",
    url: "https://habit.agarwalyug.com",
    siteName: "Habit Tracker",
    images: [
      {
        url: "/og.png", // put this in /public
        width: 1200,
        height: 630,
        alt: "Habit Tracker heatmap preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Habit Tracker",
    description:
      "Track habits visually with a GitHub-style heatmap. One click a day. Stay consistent.",
    images: ["/og.png"],
  },

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0d1117] text-[#c9d1d9]">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

