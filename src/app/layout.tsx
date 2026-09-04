import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { Footer } from "../components/common/Footer";
import { LoginModal } from "../components/auth/LoginModal";
import { CartDrawer } from "../components/cart/CartDrawer";
import { getAssetPath } from "@/utils/path";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iconUrl = getAssetPath("/logo/ohsedol_logo-removebg-preview.png");

export const metadata: Metadata = {
  title: "나무옥션 | AI 기반 부동산 경·공매 정보 & 자산 브리핑",
  description: "법원경매와 온비드 공매 통합 검색, 국토부 실거래가 정량 시세분석, 다주택자 세제/대출 시뮬레이션 및 차세대 AI 투자 브리핑 플랫폼",
  icons: {
    icon: [
      { url: iconUrl, type: "image/png" },
      { url: getAssetPath("/favicon.ico") },
    ],
    shortcut: iconUrl,
    apple: iconUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" href={iconUrl} />
        <link rel="shortcut icon" href={iconUrl} />
        <link rel="apple-touch-icon" href={iconUrl} />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <div className="flex-1">
                {children}
              </div>
              <Footer />
              <LoginModal />
              <CartDrawer />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
