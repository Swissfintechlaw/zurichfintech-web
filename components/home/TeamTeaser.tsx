import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Section from '@/components/page/Section';

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export default function TeamTeaser() {
  const t = useTranslations('home.team');
  const about = useTranslations('about');
  const members = about.raw('team.members') as Member[];

  return (
    <Section eyebrow={t('eyebrow')} title={t('title')} intro={t('intro')}>
      <div className="grid gap-10 md:grid-cols-2">
        {members.map((member, index) => (
          <AnimatedSection key={member.id} delay={index * 0.08}>
            <div className="border-l border-bronze-300 pl-6">
              <h3 className="font-serif text-2xl font-normal leading-snug text-ink-900">{member.name}</h3>
              <p className="eyebrow mt-2 text-ink-500">{member.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{member.bio}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <Link
        href="/about"
        className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-ink-900 transition-colors duration-200 hover:text-bronze-700"
      >
        {t('cta')}
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </Section>
  );
}
