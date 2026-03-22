import { useState } from 'react';
import { X } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import brandCampaignImg from 'figma:asset/084f7c64c2a64fb7889422c0192bbfcc114219b6.png';
import founderImg from 'figma:asset/f8dd7a5a7adf4c11672ccc68de1431c698490972.png';

type Language = 'UA' | 'EN' | 'PL';

interface CartItem {
  id: number;
  name: Record<Language, string>;
  price: { uah: number; pln: number };
  image: string;
  size: string;
  selectedColor: string;
  quantity: number;
}

const translations = {
  UA: {
    cart: 'Кошик',
    checkout: 'Оформити замовлення',
    total: 'Всього',
    emptyCart: 'Ваш кошик порожній',
    aboutTitle: 'Про нас',
    aboutTagline: 'Ми не слідуємо трендам.\\nМи створюємо речі, які виділяються.\\nЖіночно. Сміливо. Незабутньо. — SOLVIE.',
    brandDescription: 'SOLVIE — бренд жіночого одягу, створений для тих, хто цінує форму, крій і речі з власним характером. Кожна позиція колекції SOLVIE PREMIÈRE — результат уваги до кожної деталі, від першого ескізу до готового виробу. Не про тренди. Про речі, що вражають — завжди і скрізь.',
    founderName: 'Ольга Фединяк',
    founderTitle: 'ЗАСНОВНИЦЯ SOLVIE',
    founderQuote: '«Я завжди була частиною моди — але хотіла створювати її по-своєму.»',
    founderBio: 'З дитинства в індустрії: моделінг, зйомки, покази. SOLVIE — це особиста відповідь на питання, яким має бути сучасний бренд.',
  },
  EN: {
    cart: 'Cart',
    checkout: 'Checkout',
    total: 'Total',
    emptyCart: 'Your cart is empty',
    aboutTitle: 'About Us',
    aboutTagline: 'We don\'t follow trends.\nWe create things that stand out.\nFeminine. Bold. Unforgettable. — SOLVIE.',
    brandDescription: 'SOLVIE is a womenswear brand created for those who value form, cut, and pieces with their own character. Each item in the SOLVIE PREMIÈRE collection is the result of attention to every detail, from the first sketch to the finished product. Not about trends. About pieces that impress — always and everywhere.',
    founderName: 'Olha Fedynyak',
    founderTitle: 'FOUNDER OF SOLVIE',
    founderQuote: '"I\'ve always been part of fashion — but I wanted to create it my own way."',
    founderBio: 'Since childhood in the industry: modeling, shoots, shows. SOLVIE is a personal answer to the question of what a modern brand should be.',
  },
  PL: {
    cart: 'Koszyk',
    checkout: 'Złóż zamówienie',
    total: 'Razem',
    emptyCart: 'Twój koszyk jest pusty',
    aboutTitle: 'O nas',
    aboutTagline: 'Nie podążamy za trendami.\nTworzymy rzeczy, które wyróżniają.\nKobieco. Odważnie. Niezapomniane. — SOLVIE.',
    brandDescription: 'SOLVIE to marka odzieży damskiej stworzona dla tych, którzy cenią formę, krój i rzeczy z własnym charakterem. Każda pozycja w kolekcji SOLVIE PREMIÈRE to rezultat uwagi do każdego szczegółu, od pierwszego szkicu do gotowego produktu. Nie o trendy. O rzeczy, które robią wrażenie — zawsze i wszędzie.',
    founderName: 'Olha Fedynyak',
    founderTitle: 'ZAŁOŻYCIELKA SOLVIE',
    founderQuote: '„Zawsze byłam częścią mody — ale chciałam tworzyć ją na swój sposób."',
    founderBio: 'Od dzieciństwa w branży: modelowanie, sesje, pokazy. SOLVIE to osobista odpowiedź na pytanie, jaka powinna być nowoczesna marka.',
  },
};

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>('UA');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems] = useState<CartItem[]>([]);

  const t = translations[language];
  const currency = language === 'PL' ? 'zł' : '₴';

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = language === 'PL' ? item.price.pln : item.price.uah;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Jost, sans-serif' }}>
      {/* Header */}
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onCartOpen={() => setIsCartOpen(true)}
        cartItemCount={cartItems.length}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
            {t.aboutTitle}
          </h1>
          <div className="text-base md:text-lg italic whitespace-pre-line leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#A8D8EA' }}>
            {t.aboutTagline}
          </div>
        </div>
      </section>

      {/* Brand Text Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Brand Photo */}
            <div className="relative aspect-[3/4]">
              <img
                src={brandCampaignImg}
                alt="SOLVIE Campaign"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Right: Brand Description */}
            <div className="flex items-center">
              <div className="max-w-lg">
                <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#0A1F44' }}>
                  {t.brandDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Founder Photo */}
            <div className="relative aspect-[3/4]">
              <img
                src={founderImg}
                alt={t.founderName}
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </div>

            {/* Right: Founder Info */}
            <div className="flex items-center">
              <div className="max-w-lg">
                <h2 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
                  {t.founderName}
                </h2>
                <p className="text-xs tracking-widest mb-8 uppercase" style={{ color: '#A8D8EA' }}>
                  {t.founderTitle}
                </p>

                <p className="text-xl md:text-2xl italic mb-8 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#0A1F44' }}>
                  {t.founderQuote}
                </p>

                <p className="text-lg leading-relaxed" style={{ color: '#0A1F44', opacity: 0.85 }}>
                  {t.founderBio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto">
            <div className="sticky top-0 px-6 py-4 flex items-center justify-between" style={{ backgroundColor: '#AEE2FC' }}>
              <h3 className="text-xl tracking-wider" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}>
                {t.cart}
              </h3>
              <button onClick={() => setIsCartOpen(false)} style={{ color: '#1A2744' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {cartItems.length === 0 ? (
                <p className="text-center py-12 opacity-60" style={{ color: '#1A2744' }}>
                  {t.emptyCart}
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 pb-4 border-b">
                        <img src={item.image} alt={item.name[language]} className="w-20 h-24 object-cover" />
                        <div className="flex-1">
                          <h4 className="mb-1" style={{ color: '#1A2744' }}>{item.name[language]}</h4>
                          <p className="text-sm opacity-60 mb-1" style={{ color: '#1A2744' }}>
                            {item.size} / {item.selectedColor}
                          </p>
                          <p className="text-sm" style={{ color: '#1A2744' }}>
                            {language === 'PL' ? `${item.price.pln} ${currency}` : `${item.price.uah} ${currency}`}
                          </p>
                          <p className="text-xs opacity-60 mt-1" style={{ color: '#1A2744' }}>
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-lg mb-4" style={{ color: '#1A2744' }}>
                      <span>{t.total}:</span>
                      <span style={{ fontFamily: 'Forum, serif' }}>
                        {getTotalPrice()} {currency}
                      </span>
                    </div>
                    <button
                      className="w-full py-4 text-white text-sm tracking-wider hover:opacity-90 transition"
                      style={{ backgroundColor: '#1A2744' }}
                    >
                      {t.checkout}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}