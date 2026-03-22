import { useState } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
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
    shopTitle: 'Магазин',
    addToCart: 'Додати до кошика',
    cart: 'Кошик',
    checkout: 'Оформити замовлення',
    total: 'Всього',
    emptyCart: 'Ваш кошик порожній',
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
    shopTitle: 'Shop',
    addToCart: 'Add to Cart',
    cart: 'Cart',
    checkout: 'Checkout',
    total: 'Total',
    emptyCart: 'Your cart is empty',
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
    shopTitle: 'Sklep',
    addToCart: 'Dodaj do koszyka',
    cart: 'Koszyk',
    checkout: 'Złóż zamówienie',
    total: 'Razem',
    emptyCart: 'Twój koszyk jest pusty',
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
      PL: 'Mini sukienka na każdą okазję' 
    },
    colors: ['#FAFAFA'],
  },
  {
    id: 4,
    name: { UA: 'Спортивний костюм — Navy', EN: 'Sport Set — Navy', PL: 'Zestaw sportowy — Navy' },
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
    name: { UA: 'Поло-боді — Navy', EN: 'Polo Bodysuit — Navy', PL: 'Body polo — Navy' },
    price: { uah: 4900, pln: 400 },
    image: poloNavyImg,
    galleryImages: [poloNavyImg2, poloNavyImg3, poloNavyImg4],
    description: { 
      UA: 'Поло-боді з асиметричною контрастною вставкою та подвійним коміром', 
      EN: 'Polo body with asymmetric contrast panel and double collar', 
      PL: 'Body polo z asymetryczną kontrастową встawką i podwójnym kołnierzem' 
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

export default function ShopPage() {
  const [language, setLanguage] = useState<Language>('UA');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const t = translations[language];
  const currency: Currency = language === 'PL' ? 'zł' : '₴';

  const getPrice = (product: Product) => {
    return language === 'PL' ? `${product.price.pln} ${currency}` : `${product.price.uah} ${currency}`;
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
      const price = language === 'PL' ? item.price.pln : item.price.uah;
      return total + price * item.quantity;
    }, 0);
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

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
            <button onClick={() => navigate('/premiere')} className="text-lg tracking-widest hover:opacity-70 transition text-white">
              {t.collection}
            </button>
            <button onClick={() => navigate('/shop')} className="text-lg tracking-widest hover:opacity-70 transition text-white">
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

      {/* Shop Section */}
      <section className="bg-white" style={{ marginTop: '72px' }}>
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
                      <div key={idx} className="flex gap-4 pb-4 border-b relative">
                        <ImageWithFallback src={item.image} alt={item.name[language]} className="w-20 h-24 object-cover" />
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
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="absolute top-0 right-0 hover:opacity-70 transition"
                          style={{ color: '#1A2744' }}
                        >
                          <X className="w-4 h-4" />
                        </button>
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
                      onClick={() => navigate('/checkout')}
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

      {/* Footer */}
      <Footer language={language} />
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
        className={`relative overflow-hidden mb-4 aspect-[3/4] ${(product.id === 1 || product.id === 2 || product.id === 3 || product.id === 4 || product.id === 5 || product.id === 6 || product.id === 7) ? 'cursor-pointer' : ''}`}
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
        className={`text-xl mb-2 ${(product.id === 1 || product.id === 2 || product.id === 3 || product.id === 4 || product.id === 5 || product.id === 6 || product.id === 7) ? 'cursor-pointer hover:opacity-70' : ''}`}
        style={{ fontFamily: 'Forum, serif', color: '#1A2744', minHeight: '28px' }}
        onClick={handleNameClick}
      >
        {product.name[language]}
      </h3>
      <p className="text-sm mb-3 opacity-70" style={{ color: '#1A2744', minHeight: '40px' }}>
        {product.description[language]}
      </p>
      <p className="text-lg mb-4" style={{ color: '#1A2744', minHeight: '28px' }}>{getPrice(product)}</p>

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