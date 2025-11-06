'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Instagram, Globe, Calendar, Clock, ArrowRight, Phone } from 'lucide-react';

interface ExternalPost {
  id: string;
  platform: 'instagram' | 'kemenag' | 'website';
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  link: string;
}

export default function SocialFeed() {
  const [posts, setPosts] = useState<ExternalPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy data untuk Instagram posts dan konten eksternal
  const dummyPosts: ExternalPost[] = [
    {
      id: '1',
      platform: 'instagram',
      title: 'Layanan Nikah Digital',
      content: 'Sekarang pendaftaran nikah bisa dilakukan secara online melalui SIMKAH. Lebih mudah, cepat, dan transparan.',
      publishedAt: '2024-01-15',
      link: 'https://instagram.com/p/example1'
    },
    {
      id: '2',
      platform: 'kemenag',
      title: 'Program Bimbingan Masyarakat Islam',
      content: 'KUA Dungkek mengadakan pengajian rutin setiap malam Jum\'at dengan tema "Membangun Keluarga Sakinah".',
      publishedAt: '2024-01-14',
      link: 'https://kemenag.go.id/example2'
    },
    {
      id: '3',
      platform: 'website',
      title: 'Informasi Jadwal Imsakiah',
      content: 'Jadwal imsakiah dan shalat untuk Kecamatan Dungkek bulan Ramadhan 1445 H telah tersedia.',
      publishedAt: '2024-01-13',
      link: 'https://example.com/example3'
    }
  ];

  useEffect(() => {
    // Simulasi fetching data dari API eksternal
    const fetchPosts = async () => {
      try {
        // Di sini nanti bisa diintegrasikan dengan:
        // 1. Instagram Basic Display API
        // 2. RSS Feed Kemenag
        // 3. Website scraping yang legal

        await new Promise(resolve => setTimeout(resolve, 1000));
        setPosts(dummyPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'kemenag':
        return <Globe className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 border-purple-200';
      case 'kemenag':
        return 'bg-primary/10 text-primary border-primary/30';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'Instagram';
      case 'kemenag':
        return 'Kemenag';
      default:
        return 'Website';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat konten terbaru...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Informasi Terkini
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
            Dapatkan informasi terbaru dari Instagram resmi KUA Dungkek,
            Kementerian Agama, dan sumber terpercaya lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Platform Badge */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border">
                <div className={`inline-flex items-center space-x-1.5 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getPlatformColor(post.platform)}`}>
                  {getPlatformIcon(post.platform)}
                  <span className="hidden sm:inline">{getPlatformLabel(post.platform)}</span>
                  <span className="sm:hidden">{getPlatformLabel(post.platform).charAt(0)}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">{formatDate(post.publishedAt)}</span>
                  <span className="sm:hidden">
                    {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {post.content}
                </p>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors group/link min-h-[44px]"
                >
                  <span className="text-xs sm:text-sm">Baca selengkapnya</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform flex-shrink-0" />
                  <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                </a>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 h-1"></div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-primary/5 rounded-lg sm:rounded-xl p-6 sm:p-8 border border-primary/20">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
              Ikuti Kami Untuk Informasi Terkini
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              Dapatkan update terbaru mengenai layanan, pengumuman, dan informasi penting
              dari KUA Dungkek melalui media sosial resmi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <a
                href="https://wa.me/6285178431781"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 sm:px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-sm min-h-[48px]"
              >
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>WhatsApp Kami</span>
              </a>
              <a
                href="https://instagram.com/kuadungkek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 sm:px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium text-sm min-h-[48px]"
              >
                <Instagram className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Follow Instagram</span>
              </a>
              <a
                href="https://kemenag.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 sm:px-6 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm min-h-[48px]"
              >
                <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Kunjungi Kemenag</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}