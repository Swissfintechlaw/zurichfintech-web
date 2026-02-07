import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('home');
  const nav = useTranslations('nav');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold text-slate-900">
                Zurich Fintech
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/" className="text-slate-600 hover:text-slate-900 transition">
                  {nav('home')}
                </Link>
                <Link href="/knowledge" className="text-slate-600 hover:text-slate-900 transition">
                  {nav('knowledge')}
                </Link>
                <Link href="/docs" className="text-slate-600 hover:text-slate-900 transition">
                  {nav('docs')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-slate-900 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
      </main>
    </div>
  );
}
