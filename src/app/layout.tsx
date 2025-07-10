import "./globals.css";
import SessionWrapper from "./utils/SessionWrapper";
import {  Michroma} from "next/font/google";
import { Toaster } from 'react-hot-toast';
export const michroma = Michroma({
  weight:"400",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <Toaster/>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionWrapper>
  );
}
