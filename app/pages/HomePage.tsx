import { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import logoImage from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';

// Tweed Suit images
import tweedSuitImg from 'figma:asset/a93996ae88086c3e1f654c0e9fb85ede632003d9.png';
import tweedSuitImg2 from 'figma:asset/f6d1b5ca2a3b4b4c83dd553bc8dd33006964b5be.png';
import tweedSuitImg3 from 'figma:asset/af4f584853fc3acf7c37f5eca4afff3c54d7b407.png';

// Sport Set Navy images
import sportNavyImg from 'figma:asset/63b512ce35518510c8c8990a77bac251849367b9.png';
import sportNavyImg2 from 'figma:asset/18e2804775f60924c8a310ab0dca022dce3c4b58.png';
import sportNavyImg3 from 'figma:asset/23e29228a927ebd9090c47f40874173f4747ca6f.png';
import sportNavyImg4 from 'figma:asset/8c10a844a27f0d2615180d93e8e80c2df2574e67.png';
import sportNavyImg5 from 'figma:asset/9f7d11276eb83b401ae2d1a1b15ea2afaed9d81c.png';

// Sport Set Ivory images
import sportIvoryImg from 'figma:asset/5a1bc7b3a59f736ab72958400df57fedad547bf5.png';
import sportIvoryImg2 from 'figma:asset/c87c5fc1b91607163574ec2c83e9b33fc1258731.png';
import sportIvoryImg3 from 'figma:asset/4373c37d2eb80e93020578939eab5e30e060dd97.png';
import sportIvoryImg4 from 'figma:asset/4589df1a29352b2a8e566a403c31717b7d24e98c.png';
import sportIvoryImg5 from 'figma:asset/6b893fb8245eaf8dc196babccf37422fe2f4d645.png';

// Dress Black images
import dressBlackImg from 'figma:asset/e9ba97433f9a31efcf9ac58e0ba23b847048d6cb.png';
import dressBlackImg2 from 'figma:asset/83f4eae441f94362cdca68ab163c4e03dd67af85.png';
import dressBlackImg3 from 'figma:asset/454bdba1950799add83f99f31ee3f01c70a2dad1.png';
import dressBlackImg4 from 'figma:asset/6c00cd83bd2986406a280ce82989a8d7b3c92921.png';

// Dress Ivory images
import dressIvoryImg from 'figma:asset/4077c29e4d1c036e2ba0e0b14176e90725e7a3ef.png';
import dressIvoryImg2 from 'figma:asset/467acaca28a8982d45482428e94ddbce38ac890f.png';
import dressIvoryImg3 from 'figma:asset/3fdd984eaf9f6b40d2e16c92180a7f184d5f6f69.png';
import dressIvoryImg4 from 'figma:asset/bbf0169186475ebaaa77b3eca46f60b8b60316cc.png';

// Cape Black images
import capeBlackImg from 'figma:asset/04b50abfa162670800fa00dbafbbc39b2108a9bd.png';
import capeBlackImg2 from 'figma:asset/d47e691e337a3f7715bfed7fcd4911ddd3bd28cb.png';
import capeBlackImg3 from 'figma:asset/dced2899446a805f1d18e051ef42a38d9fa1a3a5.png';
import capeBlackImg4 from 'figma:asset/2bba1a39bbae35c9b070ead0bd1eef6627c20cd6.png';

// Cape White images
import capeWhiteImg from 'figma:asset/dbdc0ec850c86b5aa35ce7175173fbf4da4b0599.png';
import capeWhiteImg2 from 'figma:asset/76bab8dc1fe508715c5ead74939d573b8676c435.png';
import capeWhiteImg3 from 'figma:asset/28a621afb9998a311c56ba545ed7c9ad644c700e.png';
import capeWhiteImg4 from 'figma:asset/bbf0169186475ebaaa77b3eca46f60b8b60316cc.png';

// Polo Navy images
import poloNavyImg from 'figma:asset/685287a57238df036e6d220a68886727aedebfce.png';
import poloNavyImg2 from 'figma:asset/912e5efd4780badebf70988f3ee7b7850a988e9b.png';
import poloNavyImg3 from 'figma:asset/f51f2f2aff1aebf7cb3cf9639d7457f72c68d081.png';
import poloNavyImg4 from 'figma:asset/6101a477d41028c5578ed4cd0fa310ec7345e4bf.png';

// Polo Light Blue images
import poloLightBlueImg from 'figma:asset/f9dff832c0d7af6d28d7f0b0f60a239d12bf6ce5.png';
import poloLightBlueImg2 from 'figma:asset/6add0dab2764f7702d323e6ed603ed8900256a28.png';
import poloLightBlueImg3 from 'figma:asset/bd80483e23c3654a9f15812e0c5999cf3271c656.png';
import poloLightBlueImg4 from 'figma:asset/ce9fcaf0e1e8da8aea86db2a67621cf335a0a1c5.png';

// Polo Cream images
import poloCreamImg from 'figma:asset/c4885de55d3164c50194634f9e28b22f76695a9e.png';
import poloCreamImg2 from 'figma:asset/7046b0360f130ea81b5b7f60c3d29d992f8d839c.png';
import poloCreamImg3 from 'figma:asset/4b2a8137358116b54fa36e05700b1d3e856e72ab.png';
import poloCreamImg4 from 'figma:asset/fb6348c563ad4a477676ba6b09e46e441fd733ab.png';

import premiereImg from 'figma:asset/216c8253ca72b3c97e94ea2d4fd53dba078498e8.png';
import heroImg1 from 'figma:asset/b003d9fb485233a3a1674b2ae3491c22c4ece92e.png';
import heroImg2 from 'figma:asset/90fcae6d3a402b7d7c21e484d7f6b35077428cb2.png';
import heroImg3 from 'figma:asset/e9b8a5296d330afceb76d4de6291f55bd9b2d0e7.png';

// Updated: 2026-03-20T14:35:00
type Language = 'UA' | 'EN' | 'PL';
type Currency = '₴' | 'zł';

interface Product {
  id: number;
  name: Record<Language, string>;
  price: { uah: number; pln: number };
  image: string;
  galleryImages: string[];
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
  UA: {
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
  EN: {
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
  PL: {
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
    name: { UA: 'Твідовий костюм', EN: 'Tweed Suit', PL: 'Garnitur tweedowy' },
    price: { uah: 14900, pln: 1250 },
    image: tweedSuitImg,
    galleryImages: [tweedSuitImg2, tweedSuitImg3],
    description: { 
      UA: 'Твідовий жакет із акцентними структурованими плечима та асиметричними шортами', 
      EN: 'Tweed jacket with structured shoulders and asymmetric shorts', 
      PL: 'Tweedowa marynarka ze strukturalnymi ramionami i asymetrycznymi szortami' 
    },
    colors: ['#E8DCC8'],
    badge: { 
      text: { UA: 'Best Seller', EN: 'Best Seller', PL: 'Best Seller' },
      bgColor: '#1A2744',
      textColor: '#FAFAFA'
    },
  },
  {
    id: 2,
    name: { UA: 'Сукня — Чорна', EN: 'Dress — Black', PL: 'Sukienka — Czarna' },
    price: { uah: 10500, pln: 900 },
    image: dressBlackImg,
    galleryImages: [dressBlackImg2, dressBlackImg3, dressBlackImg4],
    description: { 
      UA: 'Міні-сукня на будь-яку подію', 
      EN: 'Mini dress for any occasion', 
      PL: 'Mini sukienka na każdą okazję' 
    },
    colors: ['#0D0D0D'],
  },
  {
    id: 3,
    name: { UA: 'Сукня — Молочна', EN: 'Dress — Ivory', PL: 'Sukienka — Ecru' },
    price: { uah: 10500, pln: 900 },
    image: dressIvoryImg,
    galleryImages: [dressIvoryImg2, dressIvoryImg3, dressIvoryImg4],
    description: { 
      UA: 'Міні-сукня на будь-яку подію', 
      EN: 'Mini dress for any occasion', 
      PL: 'Mini sukienka na każdą okazję' 
    },
    colors: ['#FAFAFA'],
  },
  {
    id: 4,
    name: { UA: 'Спортивний костюм — Темно-синій', EN: 'Sport Set — Navy Blue', PL: 'Zestaw sportowy — Granatowy' },
    price: { uah: 9500, pln: 800 },
    image: sportNavyImg,
    galleryImages: [sportNavyImg2, sportNavyImg3, sportNavyImg4, sportNavyImg5],
    description: { 
      UA: 'Комплект із зіп-худі та балон-спідниці', 
      EN: 'Zip hoodie and balloon skirt set', 
      PL: 'Komplet z bluzą i spódnicą balonem' 
    },
    colors: ['#1A2744'],
    badge: { 
      text: { UA: 'TOP', EN: 'TOP', PL: 'TOP' },
      bgColor: '#AEE2FC',
      textColor: '#FFFFFF'
    },
  },
  {
    id: 5,
    name: { UA: 'Спортивний костюм — Молочний', EN: 'Sport Set — Ivory', PL: 'Zestaw sportowy — Ecru' },
    price: { uah: 9500, pln: 800 },
    image: sportIvoryImg,
    galleryImages: [sportIvoryImg2, sportIvoryImg3, sportIvoryImg4, sportIvoryImg5],
    description: { 
      UA: 'Комплект із зіп-худі та балон-спідниці', 
      EN: 'Zip hoodie and balloon skirt set', 
      PL: 'Komplet z bluzą i spódnicą balonem' 
    },
    colors: ['#F5F0EB'],
  },
  {
    id: 6,
    name: { UA: 'Поло-боді — Блакитне', EN: 'Polo Bodysuit — Light Blue', PL: 'Body polo — Błękitne' },
    price: { uah: 4900, pln: 400 },
    image: poloLightBlueImg,
    galleryImages: [poloLightBlueImg2, poloLightBlueImg3, poloLightBlueImg4],
    description: { 
      UA: 'Поло-боді з асиметричною контрастною вставкою та подвійним коміром', 
      EN: 'Polo body with asymmetric contrast panel and double collar', 
      PL: 'Body polo z asymetryczną kontrastową wstawką i podwójnym kołnierzem' 
    },
    colors: ['#AEE2FC'],
  },
  {
    id: 7,
    name: { UA: 'Поло-боді — Темно-синє', EN: 'Polo Bodysuit — Navy Blue', PL: 'Body polo — Granatowe' },
    price: { uah: 4900, pln: 400 },
    image: poloNavyImg,
    galleryImages: [poloNavyImg2, poloNavyImg3, poloNavyImg4],
    description: { 
      UA: 'Поло-боді з асиметричною контрастною вставкою та подвійним коміром', 
      EN: 'Polo body with asymmetric contrast panel and double collar', 
      PL: 'Body polo z asymetryczną kontrastową вставką i podwójnym kołnierzem' 
    },
    colors: ['#1A2744'],
  },
  {
    id: 8,
    name: { UA: 'Поло-боді Молочне', EN: 'Polo Bodysuit Cream', PL: 'Polo body kremowe' },
    price: { uah: 4900, pln: 410 },
    image: poloCreamImg,
    galleryImages: [poloCreamImg2, poloCreamImg3, poloCreamImg4],
    description: { 
      UA: 'Класичне поло-боді молочного відтінку', 
      EN: 'Classic cream polo bodysuit', 
      PL: 'Klasyczne polo body kremowe' 
    },
    colors: ['#FAFAFA'],
  },
  {
    id: 9,
    name: { UA: 'Кейп — Білий', EN: 'Cape — White', PL: 'Peleryna — Biała' },
    price: { uah: 4500, pln: 370 },
    image: capeWhiteImg,
    galleryImages: [capeWhiteImg2, capeWhiteImg3, capeWhiteImg4],
    description: { 
      UA: 'Стильний кейп для завершення образу', 
      EN: 'Elegant cape to complete the look', 
      PL: 'Elegancka peleryna do wykończenia stylizacji' 
    },
    colors: ['#FAFAFA'],
    badge: { 
      text: { UA: 'LIMITED', EN: 'LIMITED', PL: 'LIMITED' },
      bgColor: '#1A2744',
      textColor: '#FFFFFF'
    },
  },
  {
    id: 10,
    name: { UA: 'Кейп — Чорний', EN: 'Cape — Black', PL: 'Peleryna — Czarna' },
    price: { uah: 4500, pln: 370 },
    image: capeBlackImg,
    galleryImages: [capeBlackImg2, capeBlackImg3, capeBlackImg4],
    description: { 
      UA: 'Стильний кейп для завершення образу', 
      EN: 'Elegant cape to complete the look', 
      PL: 'Elegancka peleryna do wykończenia stylizacji' 
    },
    colors: ['#0D0D0D'],
  },
];

const heroImages = [
  heroImg1,
  heroImg2,
  heroImg3,
];

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('UA');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const t = translations[language];
  const currency: Currency = language === 'PL' ? 'zł' : '₴';

  const getPrice = (product: Product) => {
    return language === 'PL' ? `${product.price.pln} ${currency}` : `${product.price.uah} ${currency}`;
  };

  const handleAddToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color);
    setIsCartOpen(true);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = language === 'PL' ? item.price.pln : item.price.uah;
      return total + price * item.quantity;
    }, 0);
  };

  const nextHero = useCallback(() => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevHero = useCallback(() => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextHero, 5000);
    return () => clearInterval(interval);
  }, [nextHero]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Jost, sans-serif' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ backgroundColor: '#AEE2FC' }}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-3 -ml-8">
            <img src={logoImage} alt="SOLVIE" className="h-10 w-10 object-contain" />
            <span className="text-xl tracking-wider text-white" style={{ fontFamily: 'Forum, serif' }}>SOLVIE</span>
          </button>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate('/collection')}
              className="text-lg tracking-widest hover:opacity-70 transition text-white"
            >
              {t.collection}
            </button>
            <button
              onClick={() => navigate('/shop')}
              className="text-lg tracking-widest hover:opacity-70 transition text-white"
            >
              {t.shop}
            </button>
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
                  <button onClick={() => navigate('/about')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.aboutUs}
                  </button>
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
                onClick={() => setLanguage('UA')}
                className={`tracking-wider ${language === 'UA' ? 'font-semibold underline' : 'opacity-60'}`}
              >
                UA
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => setLanguage('EN')}
                className={`tracking-wider ${language === 'EN' ? 'font-semibold underline' : 'opacity-60'}`}
              >
                EN
              </button>
              <span className="opacity-40">|</span>
              <button
                onClick={() => setLanguage('PL')}
                className={`tracking-wider ${language === 'PL' ? 'font-semibold underline' : 'opacity-60'}`}
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
      <section className="relative md:h-screen" style={{ marginTop: '72px' }}>
        {/* Mobile Layout - Photo top, text bottom */}
        <div className="md:hidden flex flex-col min-h-screen">
          {/* Photo Container - 50% of viewport height on mobile */}
          <div className="relative h-[50vh] max-h-[50vh] flex-shrink-0">
            <ImageWithFallback
              src={heroImages[currentHeroIndex]}
              alt="Hero"
              className="w-full h-full object-cover object-[center_top]"
            />
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
          </div>
          
          {/* Text Content - Visible below photo on white background */}
          <div className="flex-1 bg-white flex flex-col items-center justify-center px-8 py-12">
            <button 
              onClick={() => navigate('/shop')}
              className="px-10 py-3 border-2 text-sm tracking-widest hover:opacity-80 transition uppercase"
              style={{ borderColor: '#1A2744', color: '#1A2744' }}
            >
              {t.viewCollection}
            </button>
          </div>
        </div>

        {/* Desktop Layout - Original overlay design */}
        <div className="hidden md:block h-screen">
          <div className="absolute inset-0">
            <ImageWithFallback
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
            <button 
              onClick={() => navigate('/shop')}
              className="px-10 py-3 border-2 border-white text-white text-sm tracking-widest hover:bg-white/10 transition uppercase"
            >
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
                  onAddToCart={handleAddToCart}
                  getPrice={getPrice}
                  t={t}
                  navigate={navigate}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        translations={{
          cart: t.cart,
          emptyCart: t.emptyCart,
          total: t.total,
          checkout: t.checkout,
        }}
      />
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  language: Language;
  currency: Currency;
  onAddToCart: (product: Product, size: string, color: string) => void;
  getPrice: (product: Product) => string;
  t: typeof translations['UA'];
  navigate: ReturnType<typeof useNavigate>;
}

function ProductCard({ product, language, onAddToCart, getPrice, t, navigate }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create array of all images (main + gallery)
  const allImages = [product.image, ...product.galleryImages];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

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
      navigate('/product/polo-bodi-light-blue');
    } else if (product.id === 7) {
      navigate('/product/polo-bodi-navy');
    } else if (product.id === 8) {
      navigate('/product/polo-bodi');
    } else if (product.id === 9) {
      navigate('/product/cape-white');
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
      navigate('/product/polo-bodi-light-blue');
    } else if (product.id === 7) {
      navigate('/product/polo-bodi-navy');
    } else if (product.id === 8) {
      navigate('/product/polo-bodi');
    } else if (product.id === 9) {
      navigate('/product/cape-white');
    } else if (product.id === 10) {
      navigate('/product/cape');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg flex flex-col">
      <div 
        className={`relative overflow-hidden mb-4 aspect-[3/4] ${(product.id === 1 || product.id === 2 || product.id === 3 || product.id === 4 || product.id === 5 || product.id === 6 || product.id === 7 || product.id === 8 || product.id === 9 || product.id === 10) ? 'cursor-pointer' : ''}`}
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
        <ImageWithFallback
          src={allImages[currentImageIndex]}
          alt={product.name[language]}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows - only show if there are multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 transition flex items-center justify-center z-20"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 hover:bg-black/50 transition flex items-center justify-center z-20"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </>
        )}
      </div>
      <h3 
        className={`text-xl mb-2 ${(product.id === 1 || product.id === 2 || product.id === 3 || product.id === 4 || product.id === 5 || product.id === 6 || product.id === 7 || product.id === 8 || product.id === 9 || product.id === 10) ? 'cursor-pointer hover:opacity-70' : ''}`}
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