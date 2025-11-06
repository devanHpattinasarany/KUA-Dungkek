import { Metadata } from "next";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Building,
  Award,
  Target,
  BookOpen,
  Heart,
  Shield
} from "lucide-react";
import profileData from "@/data/profile.json";

export const metadata: Metadata = {
  title: "Profil KUA Dungkek",
  description: "Informasi lengkap profil Kantor Urusan Agama Kecamatan Dungkek, struktur organisasi, visi misi, dan layanan yang tersedia.",
};

export default function ProfilPage() {
  const values = [
    {
      icon: Heart,
      title: "Profesional",
      description: "Melayani dengan standar profesional dan etika yang tinggi"
    },
    {
      icon: Shield,
      title: "Terpercaya",
      description: "Memberikan pelayanan yang transparan dan dapat dipercaya"
    },
    {
      icon: Users,
      title: "Ramah",
      description: "Melayani masyarakat dengan sikap yang ramah dan santun"
    },
    {
      icon: Target,
      title: "Berkualitas",
      description: "Menyediakan layanan berkualitas sesuai standar Kemenag"
    }
  ];

  const services = [
    {
      icon: BookOpen,
      title: "Pelayanan Nikah",
      description: "Pendaftaran, pencatatan, dan administrasi pernikahan"
    },
    {
      icon: Users,
      title: "Bimbingan Masyarakat",
      description: "Pembinaan syariah dan bimbingan keagamaan"
    },
    {
      icon: Shield,
      title: "Sertifikasi Halal",
      description: "Rekomendasi dan fasilitasi produk halal"
    },
    {
      icon: Building,
      title: "Administrasi Keagamaan",
      description: "Berbagai layanan administrasi keagamaan Islam"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Profil KUA Dungkek
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Kantor Urusan Agama Kecamatan Dungkek berkomitmen untuk memberikan
              pelayanan administrasi keagamaan Islam yang terbaik bagi masyarakat.
            </p>
          </div>
        </div>
      </section>

      {/* Informasi Utama */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {profileData.name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {profileData.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Alamat</h3>
                      <p className="text-muted-foreground">{profileData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Telepon</h3>
                      <p className="text-muted-foreground">{profileData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">{profileData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Jam Operasional</h3>
                      <p className="text-muted-foreground">{profileData.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    <Image
                      src="/images/logo-dungkek.png"
                      alt="Logo KUA Dungkek"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain bg-white rounded-xl p-2"
                    />
                  </div>
                  <p className="text-primary font-semibold text-lg">
                    Kementerian Agama RI
                  </p>
                  <p className="text-muted-foreground">
                    Kecamatan Dungkek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Prinsip-prinsip yang menjadi dasar dalam setiap pelayanan kami kepada masyarakat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-105">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan Utama */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Layanan Utama
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Berbagai layanan administrasi keagamaan Islam yang kami sediakan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Butuh Informasi Lebih Lanjut?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Tim kami siap membantu Anda dengan informasi lengkap mengenai layanan
            dan administrasi keagamaan yang Anda butuhkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontak"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary hover:bg-gray-100 rounded-lg font-semibold transition-colors"
            >
              Hubungi Kami
            </a>
            <a
              href="/layanan"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-primary-foreground hover:bg-white hover:text-primary rounded-lg font-semibold transition-colors"
            >
              Lihat Layanan
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}