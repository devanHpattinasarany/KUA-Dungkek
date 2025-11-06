import Link from 'next/link';
import { ExternalLink, Calendar } from 'lucide-react';
import { NewsItem } from '@/utils/fetchRSS';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link
      href={news.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="card h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
        <div className="card-header">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(news.pubDate)}
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {news.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {truncateText(news.description, 120)}
          </p>
        </div>
        <div className="card-content">
          <div className="text-xs text-primary font-medium">
            Baca selengkapnya di Kemenag.go.id
          </div>
        </div>
      </div>
    </Link>
  );
}