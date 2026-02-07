import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Mission from '@/components/home/Mission';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Mission />
      </main>
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            © 2026 Swiss Fintech Law AG. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
