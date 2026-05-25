import type { Metadata } from 'next';
import './globals.css';
import Navigation from '../components/Navigation';

export const metadata: Metadata = {
  title: 'Portfolio | Full-Stack Developer',
  description:
    'Cyberpunk-themed portfolio showcasing projects with neon UI and full-stack capabilities.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full text-slate-50 antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar area */}
          <aside className="w-20 lg:w-64 bg-[rgba(5,5,10,0.6)] backdrop-blur-md border-r border-slate-800/40 z-50 sidebar">
            <div className="sidebar-inner">
              <Navigation />
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 bg-clip-padding">{children}</main>
        </div>
      </body>
    </html>
  );
}
