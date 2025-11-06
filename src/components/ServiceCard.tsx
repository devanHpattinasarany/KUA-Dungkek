import Link from 'next/link';
import { ExternalLink, LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  externalLink: string;
  color?: 'primary' | 'secondary' | 'accent';
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  externalLink,
  color = 'primary'
}: ServiceCardProps) {
  const colorClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90 border'
  };

  const iconColors = {
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    accent: 'text-primary'
  };

  return (
    <Link
      href={externalLink}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="card h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
        <div className="card-header">
          <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className={`w-6 h-6 ${iconColors[color]}`} />
          </div>
          <h3 className="card-title mt-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="card-description">
            {description}
          </p>
        </div>
        <div className="card-content">
          <div className="flex items-center text-sm text-primary font-medium">
            <span>Akses Layanan</span>
            <ExternalLink className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}