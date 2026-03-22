import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import premiereImg from 'figma:asset/216c8253ca72b3c97e94ea2d4fd53dba078498e8.png';

type Language = 'UA' | 'EN' | 'PL';

const translations = {
  UA: {
    collectionSectionTitle: 'SOLVIE PREMIÈRE',
    collectionSectionBody: "SOLVIE PREMIÈRE — це початок. Не просто колекція — а перше речення довгої історії. Про красу без зусиль, про стиль як стан душі. Кожна річ створена, щоб запам'ятатись.",
  },
  EN: {
    collectionSectionTitle: 'SOLVIE PREMIÈRE',
    collectionSectionBody: 'SOLVIE PREMIÈRE is the beginning. Not just a collection — but the first sentence of a long story. About effortless beauty, about style as a state of mind. Every piece is made to be remembered.',
  },
  PL: {
    collectionSectionTitle: 'SOLVIE PREMIÈRE',
    collectionSectionBody: 'SOLVIE PREMIÈRE to początek. Nie tylko kolekcja — ale pierwsze zdanie długiej historii. O pięknie bez wysiłku, o stylu jako stanie ducha. Każda rzecz stworzona, by pozostać w pamięci.',
  },
};

export default function CollectionPage() {
  const [language, setLanguage] = useState<Language>('UA');

  const t = translations[language];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Jost, sans-serif' }}>
      {/* Header */}
      <Header language={language} setLanguage={setLanguage} />

      {/* Collection Section */}
      <section className="bg-white" style={{ marginTop: '72px' }}>
        <div className="grid md:grid-cols-2 min-h-screen">
          {/* Left: Large Image with Padding */}
          <div className="relative md:sticky md:top-0 h-screen flex items-center justify-center p-16 bg-white">
            <img
              src={premiereImg}
              alt="SOLVIE PREMIÈRE"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right: Text Content */}
          <div className="flex items-center justify-center px-12 py-20 bg-white">
            <div className="max-w-lg">
              <h2 className="text-5xl md:text-6xl mb-8" style={{ fontFamily: 'Forum, serif', color: '#AEE2FC' }}>
                {t.collectionSectionTitle}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#1A2744', opacity: 0.85 }}>
                {t.collectionSectionBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}