'use client';

import Link from "next/link";
import { Heart, HelpCircle, Users, FileText } from "lucide-react";

interface LocalServiceCardProps {
  title: string;
  description: string;
  icon: "Heart" | "HelpCircle" | "Users" | "FileText";
  href: string;
  color: "primary" | "secondary" | "accent";
}

const iconMap = {
  Heart,
  HelpCircle,
  Users,
  FileText,
};

export default function LocalServiceCard({
  title,
  description,
  icon,
  href,
  color
}: LocalServiceCardProps) {
  const IconComponent = iconMap[icon];

  const handleClick = () => {
    window.location.href = href;
  };

  return (
    <div
      className={`card h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group`}
      onClick={handleClick}
    >
      <div className="card-header">
        <div className={`inline-flex p-3 rounded-lg ${
          color === 'primary' ? 'bg-primary text-primary-foreground' :
          color === 'secondary' ? 'bg-secondary text-secondary-foreground' :
          'bg-accent text-accent-foreground border'
        }`}>
          <IconComponent className={`w-6 h-6 ${
            color === 'primary' ? 'text-primary-foreground' :
            color === 'secondary' ? 'text-secondary-foreground' :
            'text-primary'
          }`} />
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
          <span>Hubungi Kami</span>
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </div>
    </div>
  );
}