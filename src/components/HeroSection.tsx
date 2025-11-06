import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, Building, Phone } from 'lucide-react';

export default function HeroSection() {
  const quickServices = [
    {
      icon: BookOpen,
      title: 'Pendaftaran Nikah',
      description: 'Daftar nikah online melalui SIMKAH',
      href: '/layanan',
      external: false,
      color: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/30'
    },
    {
      icon: FileText,
      title: 'Layanan Administrasi',
      description: 'Pengurusan dokumen keagamaan',
      href: '/layanan',
      external: false,
      color: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/30'
    },
    {
      icon: Building,
      title: 'Konsultasi Syariah',
      description: 'Konsultasi hukum Islam',
      href: '/kontak',
      external: false,
      color: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/30'
    }
  ];

  return (
    <section className="relative min-h-screen sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/20 to-secondary/10">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231B5E20' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-12">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-primary font-medium text-xs sm:text-sm">
                  Kementerian Agama Republik Indonesia
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="block sm:mb-1">Selamat Datang</span>
                <span className="block text-primary mb-2 sm:mb-3">di KUA Dungkek</span>
                <span className="block text-sm sm:text-base lg:text-2xl font-normal text-muted-foreground">
                  Kantor Urusan Agama Kecamatan Dungkek
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl px-0 sm:px-0">
                Portal resmi layanan administrasi keagamaan Islam yang siap melayani
                masyarakat dengan profesional, transparan, dan berkualitas.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/layanan"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium group min-h-[48px]"
              >
                <span className="text-sm sm:text-base">Lihat Layanan Kami</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium min-h-[48px]"
              >
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base">Hubungi Kami</span>
              </Link>
            </div>
          </div>

          {/* Quick Services */}
          <div className="relative mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl transform rotate-2 sm:rotate-3"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-primary/20 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                Layanan Cepat
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {quickServices.map((service, index) => (
                  <Link
                    key={index}
                    href={service.href}
                    target={service.external ? '_blank' : '_self'}
                    rel={service.external ? 'noopener noreferrer' : ''}
                    className={`group block p-4 sm:p-5 rounded-lg sm:rounded-xl border ${service.color} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:underline truncate">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm opacity-80 line-clamp-2 sm:line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-muted-foreground group-hover:translate-x-1 transition-transform mt-1" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <Link href="/layanan" className="text-primary hover:underline font-medium">
                    Lihat semua layanan →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}