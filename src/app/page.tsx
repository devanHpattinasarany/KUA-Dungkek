import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import NewsCard from "@/components/NewsCard";
import SocialFeed from "@/components/SocialFeed";
import { fetchKemenagNews } from "@/utils/fetchRSS";
import servicesData from "@/data/services.json";
import { Heart, BookOpen, Building, Shield, ExternalLink } from "lucide-react";
import { NewsItem } from "@/utils/fetchRSS";

// Import icons
const iconMap = {
  Heart,
  BookOpen,
  Building,
  Shield,
};

export default async function Home() {
  // Fetch RSS news dengan error handling
  let newsData: NewsItem[] = [];
  try {
    newsData = await fetchKemenagNews(3);
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Layanan Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Layanan Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Akses berbagai layanan administrasi keagamaan Islam secara online
              dan mudah melalui platform resmi Kementerian Agama.
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

      {/* Social Feed Section */}
      <SocialFeed />

      {/* Berita Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Berita Terkini
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dapatkan informasi terbaru dari Kementerian Agama Republik Indonesia
            </p>
          </div>

          {newsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData.map((news, index) => (
                <NewsCard key={index} news={news} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                <ExternalLink className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Berita Sedang Tidak Tersedia
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Kami tidak dapat mengambil berita terkini. Silakan kunjungi
                <a
                  href="https://kemenag.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  website resmi Kementerian Agama
                </a>
                {' '}untuk informasi terbaru.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Butuh Bantuan?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Tim kami siap membantu Anda dengan informasi dan layanan yang dibutuhkan.
            Jangan ragu untuk menghubungi kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontak"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary hover:bg-gray-100 rounded-md font-medium transition-colors"
            >
              Hubungi Kami
            </a>
            <a
              href="/layanan"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-primary-foreground hover:bg-white hover:text-primary rounded-md font-medium transition-colors"
            >
              Lihat Semua Layanan
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
