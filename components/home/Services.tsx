'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function Services() {
  const t = useTranslations('home.services');

  const services = [
    {
      icon: '⚖️',
      title: t('legal.title'),
      description: t('legal.description'),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '🚀',
      title: t('innovation.title'),
      description: t('innovation.description'),
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: '🏛️',
      title: t('compliance.title'),
      description: t('compliance.description'),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: '🤝',
      title: t('advisory.title'),
      description: t('advisory.description'),
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <Card className="p-8 h-full hover:shadow-2xl">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg`}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
