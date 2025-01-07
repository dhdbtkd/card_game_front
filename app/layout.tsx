import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { TimerProvider } from './contexts/TimerContext';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Overwatch Card Game',
    description: '오버워치 영웅 카드 짝맞추기',
    openGraph: {
        title: 'Overwatch Card Game',
        description: '오버워치 영웅 카드 짝맞추기!',
        url: 'https://card-game-front-tau.vercel.app/',
        images: [
            {
                url: 'https://static.wikia.nocookie.net/overwatch_gamepedia/images/2/2a/PI_Overwatch_Logo_White.png/revision/latest/scale-to-width-down/250?cb=20160706121419',
                width: 800,
                height: 600,
            },
        ],
    },
    icons: {
        icon: '/favicon.ico', // Favicon 경로
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-w-[100dwh] min-h-[100dvh]`}>
                <TimerProvider>{children}</TimerProvider>
            </body>
        </html>
    );
}
