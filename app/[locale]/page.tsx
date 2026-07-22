import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import Mission from '@/components/home/Mission';
import Contact from '@/components/home/Contact';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Mission />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
