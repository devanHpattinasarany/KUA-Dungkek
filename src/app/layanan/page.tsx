import { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import LocalServiceCard from "@/components/LocalServiceCard";
import servicesData from "@/data/services.json";
import { Heart, BookOpen, Building, Shield } from "lucide-react";

// Import icons
const iconMap = {
  Heart,
  BookOpen,
  Building,
  Shield,
};

export const metadata: Metadata = {
  title: "Layanan KUA Dungkek",
  description: "Daftar lengkap layanan KUA Dungkek meliputi pendaftaran nikah, layanan keagamaan, dan konsultasi syariah",
};

// Tambahan layanan lokal
const localServices = [
  {
    id: 5,
    title: "Pendaftaran Pernikahan",
    description: "Layanan pendaftaran dan administrasi pernikahan secara langsung di KUA Dungkek",
    icon: "Heart",
    href: "/kontak",
    color: "primary",
    isLocal: true
  },
  {
    id: 6,
    title: "Konsultasi Syariah",
    description: "Konsultasi masalah keagamaan Islam dengan tim yang berpengalaman",
    icon: "HelpCircle",
    href: "/kontak",
    color: "secondary",
    isLocal: true
  },
  {
    id: 7,
    title: "Bimbingan Masyarakat",
    description: "Program pembinaan dan bimbingan masyarakat Islam",
    icon: "Users",
    href: "/kontak",
    color: "accent",
    isLocal: true
  },
  {
    id: 8,
    title: "Administrasi Keagamaan",
    description: "Berbagai layanan administrasi keagamaan lainnya",
    icon: "FileText",
    href: "/kontak",
    color: "primary",
    isLocal: true
  }
];


export default function LayananPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Layanan Kami
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              KUA Dungkek menyediakan berbagai layanan administrasi keagamaan Islam
              untuk memenuhi kebutuhan masyarakat Kecamatan Dungkek dan sekitarnya.
            </p>
          </div>
        </div>
      </section>

      {/* Layanan Online Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Layanan Online Kemenag
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Akses layanan resmi Kementerian Agama secara online yang terintegrasi
              dengan sistem nasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap];
              return (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={IconComponent}
                  externalLink={service.externalLink}
                  color={service.color as 'primary' | 'secondary' | 'accent'}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Layanan Lokal Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Layanan Lokal KUA Dungkek
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Layanan yang tersedia langsung di Kantor Urusan Agama Kecamatan Dungkek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localServices.map((service) => (
              <LocalServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon as "Heart" | "HelpCircle" | "Users" | "FileText"}
                href={service.href}
                color={service.color as "primary" | "secondary" | "accent"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Informasi Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Butuh Informasi Lebih Lanjut?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Tim kami siap membantu Anda dengan informasi lengkap mengenai setiap
            layanan yang tersedia. Jangan ragu untuk menghubungi kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontak"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary hover:bg-gray-100 rounded-md font-medium transition-colors"
            >
              Hubungi Kami
            </a>
            <a
              href="https://simkah4.kemenag.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-primary-foreground hover:bg-white hover:text-primary rounded-md font-medium transition-colors"
            >
              Daftar Online SIMKAH
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}