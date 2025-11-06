'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Layanan', href: '/layanan' },
    { name: 'Berita', href: '/berita' },
    { name: 'Profil', href: '/profil' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Kontak', href: '/kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-primary/10'
        : 'bg-white shadow-sm border-b'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-secondary p-1 group-hover:scale-105 transition-transform">
                  <Image
                    src="/images/logo-dungkek.png"
                    alt="Logo KUA Dungkek"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain bg-white rounded"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm sm:text-base lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  KUA Dungkek
                </h1>
                <p className="text-xs text-muted-foreground hidden lg:block">
                  Kementerian Agama RI
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary hover:bg-accent/50 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/layanan"
              className="btn-primary text-sm px-4 py-2"
            >
              Layanan Kami
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors min-h-[44px] min-w-[44px]"
            >
              {isMenuOpen ? (
                <X className="block h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="block h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-4 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-3 rounded-lg text-base font-medium transition-colors min-h-[48px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-border mt-2">
                <Link
                  href="/layanan"
                  className="btn-primary w-full justify-center text-sm py-3 min-h-[48px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Layanan Kami
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}