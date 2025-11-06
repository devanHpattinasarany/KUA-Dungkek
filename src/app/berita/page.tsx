'use client';

import { useState, useEffect } from "react";
import { Calendar, ExternalLink, RefreshCw, AlertCircle, Newspaper, Clock, Search } from "lucide-react";
import { fetchKemenagNews, NewsItem } from "@/utils/fetchRSS";

export default function BeritaPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const newsPerPage = 12;

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const newsData = await fetchKemenagNews(50); // Fetch more for pagination
      setNews(newsData);
    } catch (err) {
      setError("Gagal mengambil berita terbaru. Silakan coba lagi nanti.");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
    fetchNews();
  };

  // Filter news based on search
  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

      if (diffInHours < 1) return 'Baru saja';
      if (diffInHours < 24) return `${diffInHours} jam lalu`;
      if (diffInHours < 48) return 'Kemarin';
      return `${Math.floor(diffInHours / 24)} hari lalu`;
    } catch {
      return '';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Newspaper className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Berita Terkini
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Informasi terbaru dari Kementerian Agama Republik Indonesia
            </p>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background w-full sm:w-80"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {filteredNews.length} berita ditemukan
              </span>
              <button
                onClick={handleRefresh}
                disabled={refreshing || loading}
                className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Memuat...' : 'Perbarui'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && !refreshing ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Memuat berita terbaru...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center max-w-md">
                <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Gagal Memuat Berita
                </h3>
                <p className="text-muted-foreground mb-6">
                  {error}
                </p>
                <button
                  onClick={handleRefresh}
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center max-w-md">
                <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Tidak Ada Berita Ditemukan
                </h3>
                <p className="text-muted-foreground mb-6">
                  Coba kata kunci lain atau periksa koneksi internet Anda.
                </p>
                <a
                  href="https://kemenag.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Kunjungi Kemenag.go.id
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentNews.map((item, index) => (
                  <article
                    key={index}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          <time dateTime={item.pubDate}>
                            {getRelativeTime(item.pubDate)}
                          </time>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {truncateText(item.description || 'Tidak ada deskripsi', 150)}
                      </p>

                      <div className="flex items-center justify-between">
                        <time className="text-xs text-muted-foreground" dateTime={item.pubDate}>
                          {formatDate(item.pubDate)}
                        </time>

                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          Baca Selengkapnya
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 h-1"></div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            currentPage === pageNum
                              ? 'bg-primary text-primary-foreground'
                              : 'border border-border hover:bg-accent'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Page Info */}
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredNews.length)} dari {filteredNews.length} berita
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Source Info */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Sumber Informasi
            </h3>
            <p className="text-muted-foreground mb-4">
              Berita diambil dari RSS Feed resmi Kementerian Agama Republik Indonesia.
              Informasi yang disajikan adalah tanggung jawab dari sumber aslinya.
            </p>
            <a
              href="https://kemenag.go.id/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Kunjungi RSS Feed
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}