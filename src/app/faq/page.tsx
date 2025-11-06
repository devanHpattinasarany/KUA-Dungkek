'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, HelpCircle, Clock, Users, FileText, Shield } from "lucide-react";
import faqData from "@/data/faq.json";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  // Group FAQs by category
  const categories = [...new Set(faqData.map(faq => faq.category))];

  // Filter FAQs based on search
  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    const newOpenCategories = new Set(openCategories);
    if (newOpenCategories.has(category)) {
      newOpenCategories.delete(category);
    } else {
      newOpenCategories.add(category);
    }
    setOpenCategories(newOpenCategories);
  };

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pernikahan':
        return <Users className="w-5 h-5" />;
      case 'Administrasi':
        return <FileText className="w-5 h-5" />;
      case 'Layanan':
        return <Clock className="w-5 h-5" />;
      case 'Legalitas':
        return <Shield className="w-5 h-5" />;
      default:
        return <HelpCircle className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Pernikahan':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'Administrasi':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Layanan':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Legalitas':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Group filtered FAQs by category
  const filteredByCategory = categories.reduce((acc, category) => {
    const items = filteredFAQs.filter(faq => faq.category === category);
    if (items.length > 0) {
      acc[category] = items;
    }
    return acc;
  }, {} as Record<string, typeof faqData>);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Temukan jawaban untuk pertanyaan umum seputar layanan KUA Dungkek
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari pertanyaan atau kata kunci..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm && (
            <div className="mb-8 text-center">
              <p className="text-muted-foreground">
                Menemukan {filteredFAQs.length} hasil untuk "{searchTerm}"
              </p>
            </div>
          )}

          {Object.keys(filteredByCategory).length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Tidak Ada Pertanyaan Ditemukan
              </h3>
              <p className="text-muted-foreground mb-6">
                Coba kata kunci lain atau hubungi kami langsung untuk bantuan lebih lanjut.
              </p>
              <a
                href="/kontak"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(filteredByCategory).map(([category, items]) => (
                <div key={category} className="border border-border rounded-xl overflow-hidden">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border flex items-center justify-between hover:bg-primary/10 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${getCategoryColor(category)}`}>
                        {getCategoryIcon(category)}
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-foreground">
                          {category}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {items.length} pertanyaan
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {openCategories.has(category) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* FAQ Items */}
                  {openCategories.has(category) && (
                    <div className="divide-y divide-border">
                      {items.map((faq) => (
                        <div key={faq.id} className="bg-card">
                          <button
                            onClick={() => toggleItem(faq.id)}
                            className="w-full px-6 py-4 text-left hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 pr-4">
                                <h4 className="text-base font-semibold text-foreground mb-1">
                                  {faq.question}
                                </h4>
                              </div>
                              <div className="flex-shrink-0">
                                {openItems.has(faq.id) ? (
                                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </button>

                          {openItems.has(faq.id) && (
                            <div className="px-6 pb-4">
                              <div className="prose prose-sm max-w-none text-muted-foreground">
                                <p>{faq.answer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Masih Punya Pertanyaan?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Jika Anda tidak menemukan jawaban yang Anda cari, jangan ragu untuk menghubungi kami langsung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontak"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Hubungi Kami
              </a>
              <a
                href="/layanan"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
              >
                Lihat Layanan
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}