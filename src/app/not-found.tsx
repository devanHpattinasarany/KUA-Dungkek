import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-8">
          <span className="text-3xl font-bold text-primary-foreground">404</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-muted-foreground mb-8">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          Silakan kembali ke halaman utama atau hubungi kami jika memerlukan bantuan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary"
          >
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>

          <Link
            href="/kontak"
            className="btn-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}