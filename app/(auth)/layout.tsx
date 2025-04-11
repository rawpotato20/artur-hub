import type { Metadata } from "next";
import "@/app/(root)/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: "ArturHub",
  description: "Everything Artur Bobin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative w-full h-[100vh] overflow-hidden">
            {/* Background video */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/other/main.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black opacity-75"></div>

            {/* Content on top */}
            <div className="relative z-10 flex items-center justify-center h-full text-white">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
