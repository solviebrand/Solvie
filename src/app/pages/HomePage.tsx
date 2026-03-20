import { useState, useEffect } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import logo from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';
import heroImage1 from 'figma:asset/b003d9fb485233a3a1674b2ae3491c22c4ece92e.png';
import heroImage2 from 'figma:asset/6ae769e9a0329163954f843935b952814f8fccb8.png';
import heroImage3 from 'figma:asset/f8dd7a5a7adf4c11672ccc68de1431c698490972.png';
import collectionImage from 'figma:asset/216c8253ca72b3c97e94ea2d4fd53dba078498e8.png';
import tweedSuitImage from 'figma:asset/a93996ae88086c3e1f654c0e9fb85ede632003d9.png';
import sportSetNavyImage from 'figma:asset/63b512ce35518510c8c8990a77bac251849367b9.png';
import sportSetIvoryImage from 'figma:asset/5a1bc7b3a59f736ab72958400df57fedad547bf5.png';
import dressBlackImage from 'figma:asset/e9ba97433f9a31efcf9ac58e0ba23b847048d6cb.png';

// Updated: 2026-03-20T14:35:00
type Language = 'ua' | 'en' | 'pl';
type Currency = '₴' | 'zł';

interface Product {
  id: number;
  name: Record<Language, string>;
  price: { uah: number; pln: number };
  image: string;
  description: Record<Language, string>;
  colors: string[];
  badge?: {
    text: Record<Language, string>;
    bgColor: string;
    textColor: string;
  };
}

interface CartItem extends Product {
  size: string;
  selectedColor: string;
  quantity: number;
}

const translations = {
  ua: {
    collection: 'PREMIÈRE',
    shop: 'МАГАЗИН',
    info: 'ІНФО',
    aboutUs: 'Про нас',
    delivery: 'Доставка',
    contacts: 'Контакти',
    returns: 'Повернення та обмін',
    social: 'Соціальні мережі',
    viewCollection: 'Переглянути колекцію',
    shopTitle: 'Магазин',
    addToCart: 'Додати до кошика',
    aboutTitle: 'Про нас',
    aboutTagline: 'Одяг, що говорить — навіть у тиші',
    aboutText: "SOLVIE — це український бренд жіночого одягу, що поєднує елегантність, комфорт і сучасний дизайн. Кожна річ створена з любов'ю до деталей і відображає дух сильної, впевненої жінки.",
    positions: 'Позицій',
    sizes: 'Розміри',
    countries: 'Країни',
    style: 'Стиль',
    navigation: 'Навігація',
    information: 'Інформація',
    contactsTitle: 'Контакти',
    copyright: '© 2026 SOLVIE. Всі права захищено.',
    cart: 'Кошик',
    checkout: 'Оформити замовлення',
    total: 'Всього',
    emptyCart: 'Ваш кошик порожній',
    collectionSectionTitle: 'SOLVIE PREMIÈRE',
    collectionSectionBody: "SOLVIE PREMIÈRE — це початок. Не просто колекція — а перше речення довгої історії. Про красу без зусиль, про стиль як стан душі. Кожна річ створена, щоб запам'ятатись.",
  },
  en: {
    collection: 'PREMIÈRE',
    shop: 'SHOP',
    info: 'INFO',
    aboutUs: 'About Us',
    delivery: 'Delivery',
    contacts: 'Contacts',
    returns: 'Returns & Exchange',
    social: 'Social Media',
    viewCollection: 'View Collection',
    shopTitle: 'Shop',
    addToCart: 'Add to Cart',
    aboutTitle: 'About Us',
    aboutTagline: 'Clothing that speaks — even in silence',
    aboutText: 'SOLVIE is a Ukrainian womenswear brand that combines elegance, comfort, and contemporary design. Each piece is crafted with attention to detail and embodies the spirit of a strong, confident woman.',
    positions: 'Items',
    sizes: 'Sizes',
    countries: 'Countries',
    style: 'Style',
    navigation: 'Navigation',
    information: 'Information',
    contactsTitle: 'Contacts',
    copyright: '© 2026 SOLVIE. All rights reserved.',
    cart: 'Cart',
    checkout: 'Checkout',
    total: 'Total',
    emptyCart: 'Your cart is empty',
    collectionSectionTitle: 'SOLVIE PREMIÈRE',
    collectionSectionBody: 'SOLVIE PREMIÈRE is the beginning. Not just a collection — but the first sentence of a long story. About effortless beauty, about style as a state of mind. Every piece is made to be remembered.',
  },
  pl: {
    collection: 'PREMIÈRE',
    shop: 'SKLEP',
    info: 'INFO',
    aboutUs: 'O nas',
    delivery: 'Dostawa',
    contacts: 'Kontakty',
    returns: 'Zwroty i wymiana',
    social: 'Media społecznościowe',
    viewCollection: 'Zobacz kolekcję',
    shopTitle: 'Sklep',
    addToCart: 'Dodaj do koszyka',
    aboutTitle: 'O nas',
    aboutTagline: 'Ubrania, które mówią — nawet w ciszy',
    aboutText: 'SOLVIE to ukraińska marka odzieży damskiej, która łączy elegancję, wygodę i nowoczesny design. Każdy element jest tworzony z dbałością o szczegóły i odzwierciedla ducha silnej, pewnej siebie kobiety.',
    positions: 'Pozycje',
    sizes: 'Rozmiary',
    countries: 'Kraje',
    style: 'Styl',
    navigation: 'Nawigacja',
    information: 'Informacja',
    contactsTitle: 'Kontakty',
    copyright: '© 2026 SOLVIE. Wszelkie prawa zastrzeżone.',
    cart: 'Koszyk',
    checkout: 'Złóż zamówienie',
    total: 'Razem',
    emptyCart: 'Twój koszyk jest pusty',
    collectionSectionTitle: 'SOLVIE PREMIÈRE',
    collectionSectionBody: 'SOLVIE PREMIÈRE to początek. Nie tylko kolekcja — ale pierwsze zdanie długiej historii. O pięknie bez wysiłku, o stylu jako stanie ducha. Każda rzecz stworzona, by pozostać w pamięci.',
  },
};

const products: Product[] = [
  {
    id: 1,
    name: { ua: 'Твідовий костюм', en: 'Tweed Suit', pl: 'Garnitur tweedowy' },
    price: { uah: 14900, pln: 1250 },
    image: tweedSuitImage,
    description: { 
      ua: 'Твідовий жакет із акцентними структурованими плечима та асиметричними шортами', 
      en: 'Tweed jacket with structured shoulders and asymmetric shorts', 
      pl: 'Tweedowa marynarka ze strukturalnymi ramionami i asymetrycznymi szortami' 
    },
    colors: ['#E8DCC8'],
    badge: { 
      text: { ua: 'Best Seller', en: 'Best Seller', pl: 'Best Seller' },
      bgColor: '#1A2744',
      textColor: '#FAFAFA'
    },
  },
  {
    id: 2,
    name: { ua: 'Сукня — Чорна', en: 'Dress — Black', pl: 'Sukienka — Czarna' },
    price: { uah: 10500, pln: 900 },
    image: dressBlackImage,
    description: { 
      ua: 'Міні-сукня на будь-яку подію', 
      en: 'Mini dress for any occasion', 
      pl: 'Mini sukienka na każdą okazję' 
    },
    colors: ['#0D0D0D'],
  },
  {
    id: 3,
    name: { ua: 'Сукня — Молочна', en: 'Dress — Ivory', pl: 'Sukienka — Ecru' },
    price: { uah: 10500, pln: 900 },
    image: 'https://images.unsplash.com/photo-1770386717588-464e9d80fcbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGVsZWdhbnQlMjBkcmVzcyUyMGNhcGV8ZW58MXx8fHwxNzczODQxOTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: { 
      ua: 'Міні-сукня на будь-яку подію', 
      en: 'Mini dress for any occasion', 
      pl: 'Mini sukienka na każdą okazję' 
    },
    colors: ['#FAFAFA'],
  },
  {
    id: 4,
    name: { ua: 'Спортивний костюм — Navy', en: 'Sport Set — Navy', pl: 'Zestaw sportowy — Navy' },
    price: { uah: 9500, pln: 800 },
    image: sportSetNavyImage,
    description: { 
      ua: 'Комплект із зіп-худі та балон-спідниці', 
      en: 'Zip hoodie and balloon skirt set', 
      pl: 'Komplet z bluzą i spódnicą balonem' 
    },
    colors: ['#1A2744'],
    badge: { 
      text: { ua: 'TOP', en: 'TOP', pl: 'TOP' },
      bgColor: '#AEE2FC',
      textColor: '#FFFFFF'
    },
  },
  {
    id: 5,
    name: { ua: 'Спортивний костюм — Молочний', en: 'Sport Set — Ivory', pl: 'Zestaw sportowy — Ecru' },
    price: { uah: 9500, pln: 800 },
    image: sportSetIvoryImage,
    description: { 
      ua: 'Комплект із зіп-худі та балон-спідниці', 
      en: 'Zip hoodie and balloon skirt set', 
      pl: 'Komplet z bluzą i spódnicą balonem' 
    },
    colors: ['#F5F0EB'],
  },
  {
    id: 6,
    name: { ua: 'Поло-боді — Блакитне', en: 'Polo Bodysuit — Light Blue', pl: 'Body polo — Błękitne' },
    price: { uah: 4900, pln: 400 },
    image: 'https://images.unsplash.com/photo-1691796773910-923291dd6e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHN0eWxpc2glMjBwb2xvJTIwYm9keXN1aXR8ZW58MXx8fHwxNzczODQxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: { 
      ua: 'Поло-боді з асиметричною контрастною вставкою та подвійним коміром', 
      en: 'Polo body with asymmetric contrast panel and double collar', 
      pl: 'Body polo z asymetryczną kontrastową wstawką i podwójnym kołnierzem' 
    },
    colors: ['#AEE2FC'],
  },
  {
    id: 7,
    name: { ua: 'Поло-боді — Navy', en: 'Polo Bodysuit — Navy', pl: 'Body polo — Navy' },
    price: { uah: 4900, pln: 400 },
    image: 'https://images.unsplash.com/photo-1691796773910-923291dd6e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHN0eWxpc2glMjBwb2xvJTIwYm9keXN1aXR8ZW58MXx8fHwxNzczODQxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: { 
      ua: 'Поло-боді з асиметричною контрастною вставкою та подвійним коміром', 
      en: 'Polo body with asymmetric contrast panel and double collar', 
      pl: 'Body polo z asymetryczną kontrastową wстawką i podwójnym kołnierzem' 
    },
    colors: ['#1A2744'],
  },
  {
    id: 8,
    name: { ua: 'Поло-боді — Молочне', en: 'Polo Bodysuit — Ivory', pl: 'Body polo — Ecru' },
    price: { uah: 4900, pln: 400 },
    image: 'https://images.unsplash.com/photo-1691796773910-923291dd6e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHN0eWxpc2glMjBwb2xvJTIwYm9keXN1aXR8ZW58MXx8fHwxNzczODQxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: { 
      ua: 'Поло-боді з асиметричною контрастною вставкою та подвійним коміром', 
      en: 'Polo body with asymmetric contrast panel and double collar', 
      pl: 'Body polo z asymetryczną kontrastową wstawką i podwójnym kołnierzem' 
    },
    colors: ['#F5F0EB'],
  },
  {
    id: 9,
    name: { ua: 'Кейп — Білий', en: 'Cape — White', pl: 'Peleryna — Biała' },
    price: { uah: 4500, pln: 370 },
    image: 'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWFufGVufDF8fHx8MTc3Mzg0MTk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: { 
      ua: 'Стильний кейп для завершення образу', 
      en: 'Elegant cape to complete the look', 
      pl: 'Elegancka peleryna do wykończenia stylizacji' 
    },
    colors: ['#FAFAFA'],
    badge: { 
      text: { ua: 'LIMITED', en: 'LIMITED', pl: 'LIMITED' },
      bgColor: '#1A2744',
      textColor: '#FFFFFF'
    },
  },
  {
    id: 10,
    name: { ua: 'Кейп — Чорний', en: 'Cape — Black', pl: 'Peleryna — Czarna' },
    price: { uah: 4500, pln: 370 },
    image: 'https://images.unsplash.com/photo-1629922949137-e236a5ab497d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHdvbWFufGVufDF8fHx8MTc3Mzg0MTk0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: { 
      ua: 'Стильний кейп для завершення образу', 
      en: 'Elegant cape to complete the look', 
      pl: 'Elegancka peleryna do wykończenia stylizacji' 
    },
    colors: ['#0D0D0D'],
  },
];

const heroImages = [
  heroImage1,
  heroImage2,
  heroImage3,
];

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('ua');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const t = translations[language];
  const currency: Currency = language === 'pl' ? 'zł' : '₴';

  const getPrice = (product: Product) => {
    return language === 'pl' ? `${product.price.pln} ${currency}` : `${product.price.uah} ${currency}`;
  };

  const addToCart = (product: Product, size: string, color: string) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size && item.selectedColor === color
    );

    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id && item.size === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, size, selectedColor: color, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = language === 'pl' ? item.price.pln : item.price.uah;
      return total + price * item.quantity;
    }, 0);
  };

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextHero, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Jost, sans-serif' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ backgroundColor: '#AEE2FC' }}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-3 -ml-4">
            <img src={logo} alt="SOLVIE" className="h-10 object-contain" />
            <span className="text-xl tracking-wider text-white" style={{ fontFamily: 'Forum, serif' }}>SOLVIE</span>
          </button>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#collection" className="text-lg tracking-widest hover:opacity-70 transition text-white">
              {t.collection}
            </a>
            <a href="#shop" className="text-lg tracking-widest hover:opacity-70 transition text-white">
              {t.shop}
            </a>
            <div className="relative">
              <button
                onClick={() => setIsInfoDropdownOpen(!isInfoDropdownOpen)}
                className="text-lg tracking-widest hover:opacity-70 transition flex items-center gap-1 text-white"
              >
                {t.info}
                <ChevronDown className="w-3 h-3" />
              </button>
              {isInfoDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px]">
                  <a href="#about" className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.aboutUs}
                  </a>
                  <button onClick={() => navigate('/support')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.delivery}
                  </button>
                  <button onClick={() => navigate('/support')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.contacts}
                  </button>
                  <button onClick={() => navigate('/support')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.returns}
                  </button>
                  <button onClick={() => navigate('/support')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.social}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Language + Cart */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-white">
              <button
                onClick={() => setLanguage('ua')}
                className={`tracking-wider ${language === 'ua' ? 'font-semibold underline' : 'opacity-60'}`}
              >
                UA
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`tracking-wider ${language === 'en' ? 'font-semibold underline' : 'opacity-60'}`}
              >
                EN
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => setLanguage('pl')}
                className={`tracking-wider ${language === 'pl' ? 'font-semibold underline' : 'opacity-60'}`}
              >
                PL
              </button>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#1A2744] text-[10px] rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen" style={{ marginTop: '72px' }}>
        <div className="absolute inset-0">
          <img
            src={heroImages[currentHeroIndex]}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-end pb-32 px-8">
          <h1 className="text-5xl md:text-6xl text-white mb-6 text-center tracking-wide" style={{ fontFamily: 'Forum, serif' }}>
            SOLVIE PREMIÈRE
          </h1>
          <button className="px-10 py-3 border-2 border-white text-white text-sm tracking-widest hover:bg-white/10 transition uppercase">
            {t.viewCollection}
          </button>
        </div>

        {/* Hero Controls */}
        <button
          onClick={prevHero}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 hover:bg-white/20 transition flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextHero}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 hover:bg-white/20 transition flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-2 h-2 transition ${
                index === currentHeroIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <SectionDivider />

      {/* Collection Section */}
      <section id="collection" className="bg-white">
        <div className="grid md:grid-cols-2 min-h-screen">
          {/* Left: Large Image with Padding */}
          <div className="relative md:sticky md:top-0 h-screen flex items-center justify-center p-16 bg-white">
            <img
              src={collectionImage}
              alt="SOLVIE PREMIÈRE"
              className="w-full h-full object-cover"
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

      {/* Divider */}
      <SectionDivider />

      {/* Shop Section */}
      <section id="shop" className="bg-white">
        {/* Title Area - White Background */}
        <div className="py-12 px-8 bg-white">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-3xl text-center" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}>
              {t.shopTitle}
            </h2>
          </div>
        </div>
        
        {/* Product Grid - White Background */}
        <div className="pb-20 px-8 bg-white">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  currency={currency}
                  onAddToCart={addToCart}
                  getPrice={getPrice}
                  t={t}
                  navigate={navigate}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider />

      {/* About Section */}
      <section id="about" className="py-20 px-8" style={{ backgroundColor: '#1A2744' }}>
        <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Forum, serif', color: '#FAFAFA' }}>
              {t.aboutTitle}
            </h2>
            <p className="text-xl mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#AEE2FC' }}>
              {t.aboutTagline}
            </p>
            <p className="leading-relaxed" style={{ color: '#AEE2FC', opacity: 0.9 }}>
              {t.aboutText}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5', label: t.positions },
              { value: '3', label: t.sizes },
              { value: '2', label: t.countries },
              { value: '∞', label: t.style },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="aspect-square flex flex-col items-center justify-center border-2 border-[#AEE2FC]"
              >
                <div className="text-4xl md:text-5xl mb-2" style={{ fontFamily: 'Forum, serif', color: '#AEE2FC' }}>
                  {stat.value}
                </div>
                <div className="text-sm tracking-wider" style={{ color: '#FAFAFA' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider />

      {/* Footer */}
      <footer className="py-16 px-8 bg-[#0D0D0D]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src={logo} alt="SOLVIE" className="h-8 object-contain mb-4" />
              <p className="text-sm opacity-70" style={{ color: '#FAFAFA' }}>
                {t.aboutText.slice(0, 100)}...
              </p>
            </div>
            <div>
              <h4 className="text-sm tracking-widest mb-4 uppercase" style={{ color: '#AEE2FC' }}>
                {t.navigation}
              </h4>
              <div className="flex flex-col gap-2">
                <a href="#collection" className="text-sm opacity-70 hover:opacity-100 transition" style={{ color: '#FAFAFA' }}>
                  {t.collection}
                </a>
                <a href="#shop" className="text-sm opacity-70 hover:opacity-100 transition" style={{ color: '#FAFAFA' }}>
                  {t.shop}
                </a>
                <a href="#about" className="text-sm opacity-70 hover:opacity-100 transition" style={{ color: '#FAFAFA' }}>
                  {t.aboutUs}
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm tracking-widest mb-4 uppercase" style={{ color: '#AEE2FC' }}>
                {t.information}
              </h4>
              <div className="flex flex-col gap-2">
                <a href="#delivery" className="text-sm opacity-70 hover:opacity-100 transition" style={{ color: '#FAFAFA' }}>
                  {t.delivery}
                </a>
                <a href="#returns" className="text-sm opacity-70 hover:opacity-100 transition" style={{ color: '#FAFAFA' }}>
                  {t.returns}
                </a>
                <a href="#contacts" className="text-sm opacity-70 hover:opacity-100 transition" style={{ color: '#FAFAFA' }}>
                  {t.contacts}
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm tracking-widest mb-4 uppercase" style={{ color: '#AEE2FC' }}>
                {t.contactsTitle}
              </h4>
              <div className="flex flex-col gap-2 text-sm opacity-70" style={{ color: '#FAFAFA' }}>
                <p>info@solvie.ua</p>
                <p>+380 93 123 4567</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center">
            <p className="text-xs opacity-50" style={{ color: '#FAFAFA' }}>
              {t.copyright}
            </p>
            <div className="flex gap-4">
              <a href="#instagram" className="text-xs opacity-70 hover:opacity-100 transition" style={{ color: '#AEE2FC' }}>
                Instagram
              </a>
              <a href="#tiktok" className="text-xs opacity-70 hover:opacity-100 transition" style={{ color: '#AEE2FC' }}>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>

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
                          <p className="text-sm" style={{ color: '#1A2744' }}>{getPrice(item)}</p>
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

interface ProductCardProps {
  product: Product;
  language: Language;
  currency: Currency;
  onAddToCart: (product: Product, size: string, color: string) => void;
  getPrice: (product: Product) => string;
  t: typeof translations['ua'];
  navigate: ReturnType<typeof useNavigate>;
}

function ProductCard({ product, language, onAddToCart, getPrice, t, navigate }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleImageClick = () => {
    if (product.id === 1) {
      navigate('/product/tweed-suit');
    } else if (product.id === 2) {
      navigate('/product/dress-black');
    } else if (product.id === 3) {
      navigate('/product/dress-ivory');
    } else if (product.id === 4) {
      navigate('/product/sport-set-navy');
    } else if (product.id === 5) {
      navigate('/product/sport-set-ivory');
    } else if (product.id === 6) {
      navigate('/product/polo-bodi');
    } else if (product.id === 7) {
      navigate('/product/polo-bodi');
    } else if (product.id === 8) {
      navigate('/product/polo-bodi');
    } else if (product.id === 9) {
      navigate('/product/cape');
    } else if (product.id === 10) {
      navigate('/product/cape');
    }
  };

  const handleNameClick = () => {
    if (product.id === 1) {
      navigate('/product/tweed-suit');
    } else if (product.id === 2) {
      navigate('/product/dress-black');
    } else if (product.id === 3) {
      navigate('/product/dress-ivory');
    } else if (product.id === 4) {
      navigate('/product/sport-set-navy');
    } else if (product.id === 5) {
      navigate('/product/sport-set-ivory');
    } else if (product.id === 6) {
      navigate('/product/polo-bodi');
    } else if (product.id === 7) {
      navigate('/product/polo-bodi');
    } else if (product.id === 8) {
      navigate('/product/polo-bodi');
    } else if (product.id === 9) {
      navigate('/product/cape');
    } else if (product.id === 10) {
      navigate('/product/cape');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col">
      <div 
        className={`relative overflow-hidden mb-4 aspect-[3/4] ${(product.id === 1 || product.id === 2 || product.id === 3 || product.id === 4 || product.id === 5) ? 'cursor-pointer' : ''}`}
        onClick={handleImageClick}
      >
        {product.badge && (
          <div 
            className="absolute top-4 left-4 z-10 px-3 py-1 text-xs tracking-wider"
            style={{ backgroundColor: product.badge.bgColor, color: product.badge.textColor }}
          >
            {product.badge.text[language]}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name[language]}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 
        className={`text-xl mb-2 ${(product.id === 1 || product.id === 2 || product.id === 3 || product.id === 4 || product.id === 5) ? 'cursor-pointer hover:opacity-70' : ''}`}
        style={{ fontFamily: 'Forum, serif', color: '#1A2744', minHeight: '28px' }}
        onClick={handleNameClick}
      >
        {product.name[language]}
      </h3>
      <p className="text-sm mb-3 opacity-70" style={{ color: '#1A2744', minHeight: '40px' }}>
        {product.description[language]}
      </p>
      <p className="text-lg mb-4" style={{ color: '#1A2744', minHeight: '28px' }}>{getPrice(product)}</p>

      {/* Color Selector */}
      <div className="mb-4" style={{ minHeight: '32px' }}>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColor === color ? 'border-[#1A2744]' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Size Selector */}
      <div className="mb-4" style={{ minHeight: '40px' }}>
        <div className="flex gap-2">
          {['XS', 'S', 'M'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 text-sm border ${
                selectedSize === size
                  ? 'bg-[#1A2744] text-white border-[#1A2744]'
                  : 'bg-white text-[#1A2744] border-[#1A2744]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onAddToCart(product, selectedSize, selectedColor)}
        className="w-full py-3 text-white text-sm tracking-wider hover:opacity-90 transition mt-auto"
        style={{ backgroundColor: '#1A2744' }}
      >
        {t.addToCart}
      </button>
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="w-full bg-white py-5 flex items-center justify-center">
      <p 
        className="text-xs uppercase" 
        style={{ 
          fontFamily: 'Forum, serif', 
          color: '#AEE2FC', 
          letterSpacing: '0.4em',
          fontSize: '12px'
        }}
      >
        ✦ SOLVIE PREMIÈRE ✦
      </p>
    </div>
  );
}