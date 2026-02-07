'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function DocsPage() {
  const t = useTranslations('docs');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    'getting-started',
    'authentication',
    'endpoints',
    'webhooks',
    'examples',
    'support',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-slate-900 bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {t('subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <AnimatedSection className="lg:w-64 flex-shrink-0" delay={0.2}>
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {t('navigation')}
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        activeSection === section
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {t(`sections.${section}.title`)}
                    </button>
                  ))}
                </nav>
              </div>
            </AnimatedSection>

            {/* Content */}
            <div className="flex-1">
              <AnimatedSection delay={0.3}>
                <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200/50">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                      {t(`sections.${activeSection}.title`)}
                    </h2>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-lg text-slate-600 mb-6">
                        {t(`sections.${activeSection}.description`)}
                      </p>

                      {activeSection === 'getting-started' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                              {t('sections.getting-started.step1.title')}
                            </h3>
                            <p className="text-slate-600 mb-4">
                              {t('sections.getting-started.step1.description')}
                            </p>
                            <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
                              <code className="text-green-400 font-mono text-sm">
                                npm install @swissfintech/sdk
                              </code>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                              {t('sections.getting-started.step2.title')}
                            </h3>
                            <p className="text-slate-600 mb-4">
                              {t('sections.getting-started.step2.description')}
                            </p>
                            <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
                              <pre className="text-green-400 font-mono text-sm">
{`import { SwissFintech } from '@swissfintech/sdk';

const client = new SwissFintech({
  apiKey: 'your-api-key',
  environment: 'production'
});`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeSection === 'authentication' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                              {t('sections.authentication.apiKeys.title')}
                            </h3>
                            <p className="text-slate-600">
                              {t('sections.authentication.apiKeys.description')}
                            </p>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <p className="text-blue-900 font-medium">
                              {t('sections.authentication.security')}
                            </p>
                          </div>
                        </div>
                      )}

                      {activeSection === 'endpoints' && (
                        <div className="space-y-4">
                          {['transactions', 'accounts', 'compliance', 'reports'].map(
                            (endpoint) => (
                              <div
                                key={endpoint}
                                className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                                    GET
                                  </span>
                                  <code className="text-slate-700 font-mono">
                                    /api/v1/{endpoint}
                                  </code>
                                </div>
                                <p className="text-slate-600">
                                  {t(`sections.endpoints.${endpoint}`)}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      )}

                      {activeSection === 'webhooks' && (
                        <div className="space-y-6">
                          <p className="text-slate-600">
                            {t('sections.webhooks.content')}
                          </p>
                          <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
                            <pre className="text-green-400 font-mono text-sm">
{`{
  "event": "transaction.completed",
  "timestamp": "2026-02-07T18:00:00Z",
  "data": {
    "id": "txn_123456",
    "amount": 1000.00,
    "currency": "CHF"
  }
}`}
                            </pre>
                          </div>
                        </div>
                      )}

                      {activeSection === 'examples' && (
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                              {t('sections.examples.basic.title')}
                            </h3>
                            <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
                              <pre className="text-green-400 font-mono text-sm">
{`// Fetch account balance
const balance = await client.accounts.getBalance();
console.log(balance);

// Create transaction
const transaction = await client.transactions.create({
  amount: 500.00,
  currency: 'CHF',
  recipient: 'recipient_id'
});`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeSection === 'support' && (
                        <div className="space-y-6">
                          <p className="text-slate-600">
                            {t('sections.support.content')}
                          </p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="border border-slate-200 rounded-xl p-6">
                              <h4 className="font-semibold text-slate-900 mb-2">
                                {t('sections.support.email.title')}
                              </h4>
                              <a
                                href="mailto:support@swissfintechlaw.com"
                                className="text-blue-600 hover:underline"
                              >
                                support@swissfintechlaw.com
                              </a>
                            </div>
                            <div className="border border-slate-200 rounded-xl p-6">
                              <h4 className="font-semibold text-slate-900 mb-2">
                                {t('sections.support.github.title')}
                              </h4>
                              <a
                                href="https://github.com/Swissfintechlaw"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                github.com/Swissfintechlaw
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-slate-400 hover:text-white transition">
            ← {t('backToHome')}
          </Link>
        </div>
      </footer>
    </div>
  );
}
