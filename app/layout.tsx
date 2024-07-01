import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  MantineProvider,
  ColorSchemeScript,
} from "@mantine/core";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "It Takes a Village",
  description:
    "Curated resources and advice for navigating the care of a disabled child.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <MantineProvider
          theme={{
            colors: {
              "forest-green": [
                "#edf9f0",
                "#e1ece4",
                "#c4d6c8",
                "#a5bfaa",
                "#8bab90",
                "#799f80",
                "#6f9a78",
                "#5d8665",
                "#517759",
                "#416749",
              ],
            },
            primaryColor: "forest-green",
            headings: {
              fontFamily: "Raleway, sans-serif",
              fontWeight: "300",
            },
          }}
        >
          <AppShell
            header={{ height: 60 }}
            padding="md"
            withBorder={false}
            bg="#b9cebd"
          >
            <AppShellHeader p="md" bg="#b9cebd">
              <Header />
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
