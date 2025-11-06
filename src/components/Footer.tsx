import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import profileData from '@/data/profile.json';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informasi KUA */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">KUA Dungkek</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Kantor Urusan Agama Kecamatan Dungkek melayani administrasi
              keagamaan Islam bagi masyarakat Kecamatan Dungkek dan sekitarnya.
            </p>
          </div>

          {/* Kontak Informasi */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Kontak Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {profileData.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {profileData.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {profileData.email}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  {profileData.workingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Layanan Cepat</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/layanan"
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Layanan Pernikahan
              </Link>
              <Link
                href="/berita"
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Berita Terkini
              </Link>
              <Link
                href="/profil"
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Profil KUA
              </Link>
              <Link
                href="/faq"
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/kontak"
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} KUA Dungkek. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs text-primary-foreground/40 mt-2">
            Dikelola oleh Kantor Urusan Agama Kecamatan Dungkek - Kementerian Agama Republik Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}