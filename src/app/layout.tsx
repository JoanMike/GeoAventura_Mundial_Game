import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GeoAventura Mundial',
  description: 'Aprende los países y sus banderas jugando',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased font-sans',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[10vh] left-[10vw] w-[clamp(200px,40vw,500px)] aspect-square bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-[10vh] right-[10vw] w-[clamp(200px,40vw,500px)] aspect-square bg-accent/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute top-[30vh] right-[20vw] w-[clamp(150px,30vw,400px)] aspect-square bg-secondary/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
          </div>
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-lg border-b border-border shadow-lg">
              <div className="container mx-auto px-4 py-4 flex justify-center items-center relative">
                <h1 className="text-2xl md:text-3xl font-bold text-center tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  GeoAventura Mundial
                </h1>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-background/50 backdrop-blur-lg py-4 text-center text-sm text-muted-foreground mt-auto">
              <p>
                &copy; {new Date().getFullYear()} GeoAventura Mundial - Jose
                Miguel Maldonado Garcia - ¡Diviértete aprendiendo!
              </p>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
