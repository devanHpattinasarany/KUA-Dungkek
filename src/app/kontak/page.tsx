'use client';

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, AlertCircle, Building2, BookOpen } from "lucide-react";
import profileData from "@/data/profile.json";
import FORMSPREE_CONFIG from "@/config/formspree";
import LazyMap from "@/components/LazyMap";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(FORMSPREE_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // On success
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        // On error
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Alamat",
      value: profileData.address,
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: profileData.phone,
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      icon: Mail,
      label: "Email",
      value: profileData.email,
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      icon: Clock,
      label: "Jam Operasional",
      value: "Senin - Kamis: 07.30 - 16.00\nJumat: 07.30 - 16.30\nIstirahat: 12.00 - 13.30\nSabtu - Minggu: Libur",
      color: "bg-primary/10 text-primary border-primary/20"
    }
  ];

  const quickLinks = [
    { title: "Pendaftaran Nikah", href: "/layanan", icon: BookOpen },
    { title: "FAQ", href: "/faq", icon: MessageSquare },
    { title: "Layanan", href: "/layanan", icon: Building2 },
    { title: "Profil", href: "/profil", icon: Building2 }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-6 text-primary-foreground" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Hubungi Kami
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Kami siap membantu Anda dengan informasi dan layanan administrasi keagamaan
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center group bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${info.color} mb-3 sm:mb-4 group-hover:scale-105 transition-transform`}>
                  <info.icon className="w-5 h-5 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  {info.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {info.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-12 sm:py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">
                Kirim Pesan
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                Isi formulir di bawah untuk mengajukan pertanyaan atau request informasi.
              </p>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-800 font-medium">
                      Terjadi kesalahan. Silakan coba lagi nanti.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm sm:text-base"
                        placeholder="Nama Anda"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm sm:text-base"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm sm:text-base"
                        placeholder="+62 8xx-xxxx-xxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subjek *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-sm sm:text-base"
                      placeholder="Subjek pesan"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none text-sm sm:text-base"
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium inline-flex items-center justify-center min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span className="text-sm sm:text-base">Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">Kirim Pesan</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Links & Map Placeholder */}
            <div className="space-y-6 sm:space-y-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                  Tautan Cepat
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-primary/20 transition-all duration-200 group min-h-[60px]"
                    >
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <link.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Integration */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                  Lokasi Kami
                </h3>
                <LazyMap
                  mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.6039658580244!2d114.09035347492238!3d-6.977896318329492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd9f98e3983718f%3A0xb3e6197219df898d!2sBPP%20Kecamatan%20Dungkek!5e1!3m2!1sid%2sid!4v1762404329934!5m2!1sid%2sid"
                  title="Peta Lokasi KUA Dungkek"
                />
                <div className="mt-4 text-center">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Kantor+Urusan+Agama+Kecamatan+Dungkek+Sumenep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-10 sm:py-12 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Hubungi Langsung untuk Keperluan Mendesak
          </h2>
          <p className="text-primary-foreground/80 mb-6 text-sm sm:text-base px-4 sm:px-0">
            Untuk keperluan mendesak terkait pernikahan atau administrasi keagamaan,
            jangan ragu untuk menghubungi kami langsung.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <a
              href={`https://wa.me/6285178431781`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 sm:px-6 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium min-h-[48px]"
            >
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm sm:text-base">WhatsApp</span>
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="inline-flex items-center justify-center px-4 py-3 sm:px-6 border-2 border-white text-primary-foreground rounded-lg hover:bg-white hover:text-primary transition-colors font-medium min-h-[48px]"
            >
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm sm:text-base">Kirim Email</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}