import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Emebdded System Project Cedt#2",
    description: "Created by DuckDaan",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
