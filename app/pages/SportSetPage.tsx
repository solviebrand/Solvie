import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ColorSwitcher } from '../components/ColorSwitcher';
import { useCart, Product, Language } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import { Header } from '../components/Header';
import sportSetImage1 from 'figma:asset/63b512ce35518510c8c8990a77bac251849367b9.png';
import sportSetImage2 from 'figma:asset/18e2804775f60924c8a310ab0dca022dce3c4b58.png';
import sportSetImage3 from 'figma:asset/23e29228a927ebd9090c47f40874173f4747ca6f.png';
import sportSetImage4 from 'figma:asset/8c10a844a27f0d2615180d93e8e80c2df2574e67.png';
import sportSetImage5 from 'figma:asset/9f7d11276eb83b401ae2d1a1b15ea2afaed9d81c.png';

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
    cart: 'Кошик',
    addToCart: 'В КОШИК',
    productName: 'СПОРТИВНИЙ КОСТЮМ',
    colorLabel: 'Колір',
    descriptionParagraph: 'Елегантний спортивний костюм з білими контрастними акцентами. Комплект складається з укороченої зіп-худі зі структурованими плечима та пишної спідниці-балон. Ідеальне поєднання комфорту та стилю для будь-якого випадку.',
    descriptionFeatures: [
      'Укорочена зіп-худі з контрастною обробкою',
      'Пишна спідниця-балон',
      'Структуровані плечі з білими акцентами',
      'Преміальна тканина',
    ],
    deliveryTitle: 'ДОСТАВКА',
    deliveryBlocks: [
      {
        title: 'Нова пошта — відділення',
        description: 'Доставка до зручного для вас відділення Нової пошти. Ви отримаєте SMS з номером ТТН, коли замовлення буде готове до видачі.',
        cost: 'Вартість: згідно з тарифами Нової пошти',
        time: 'Термін: 2–4 робочі дні',
      },
      {
        title: 'Нова пошта — поштомат',
        description: 'Безконтактне отримання замовлення у поштоматі. Виберіть зручну адресу та отримаєте SMS-код для відкриття комірки.',
        cost: 'Вартість: згідно з тарифами Нової пошти',
        time: 'Термін: 2–4 робочі дні',
      },
      {
        title: "Нова пошта — кур'єр",
        description: "Кур'єр доставить замовлення за вказаною адресою.",
        cost: 'Вартість: згідно з тарифами Нової пошти',
        time: 'Термін: 2–4 робочі дні',
      },
      {
        title: 'Доставка по Варшаві та Львову',
        description: 'Доставка в день замовлення.',
        time: 'Термін: в день замовлення',
      },
      {
        title: 'Доставка по всій Польщі',
        description: 'За тарифами DPD.',
        cost: 'Вартість: згідно з тарифами DPD',
      },
      {
        title: 'Міжнародна доставка (крім Польщі)',
        description: 'Доставка до більшості країн світу.',
        cost: 'Вартість: згідно з тарифами служб доставки',
      },
    ],
    returnsTitle: 'ПОВЕРНЕННЯ',
    returnsContent: 'Ви можете повернути товар протягом 14 днів з моменту отримання. Товар має бути в оригінальній упаковці з бирками.',
    compositionTitle: 'СКЛАД',
    compositionContent: 'Преміальна тканина з додаванням еластану для комфорту',
    addedToCart: 'Додано до кошика ✓',
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
    cart: 'Cart',
    addToCart: 'ADD TO CART',
    productName: 'SPORT SET',
    colorLabel: 'Color',
    descriptionParagraph: 'Elegant sport set with white contrast accents. The set consists of a cropped zip hoodie with structured shoulders and a voluminous balloon skirt. Perfect combination of comfort and style for any occasion.',
    descriptionFeatures: [
      'Cropped zip hoodie with contrast trim',
      'Voluminous balloon skirt',
      'Structured shoulders with white accents',
      'Premium fabric',
    ],
    deliveryTitle: 'DELIVERY',
    deliveryBlocks: [
      {
        title: 'Nova Poshta — Branch',
        description: 'Delivery to your nearest Nova Poshta branch. You will receive an SMS with the tracking number when your order is ready for pickup.',
        cost: 'Cost: according to Nova Poshta rates',
        time: 'Time: 2–4 business days',
      },
      {
        title: 'Nova Poshta — Parcel Locker',
        description: 'Contactless pickup at a parcel locker. Choose a convenient address and receive an SMS code to open the locker.',
        cost: 'Cost: according to Nova Poshta rates',
        time: 'Time: 2–4 business days',
      },
      {
        title: 'Nova Poshta — Courier',
        description: 'A courier will deliver your order to the specified address.',
        cost: 'Cost: according to Nova Poshta rates',
        time: 'Time: 2–4 business days',
      },
      {
        title: 'Delivery in Warsaw and Lviv',
        description: 'Same-day delivery.',
        time: 'Time: same day as order',
      },
      {
        title: 'Delivery across Poland',
        description: 'Via DPD rates.',
        cost: 'Cost: according to DPD rates',
      },
      {
        title: 'International Delivery (except Poland)',
        description: 'Delivery to most countries worldwide.',
        cost: 'Cost: according to carrier rates',
      },
    ],
    returnsTitle: 'RETURNS',
    returnsContent: 'You can return the item within 14 days of receipt. Item must be in original packaging with tags.',
    compositionTitle: 'COMPOSITION',
    compositionContent: 'Premium fabric with elastane for comfort',
    addedToCart: 'Added to cart ✓',
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
    cart: 'Koszyk',
    addToCart: 'DO KOSZYKA',
    productName: 'ZESTAW SPORTOWY',
    colorLabel: 'Kolor',
    descriptionParagraph: 'Elegancki zestaw sportowy z białymi akcentami kontrastowymi. Komplet składa się z krótkiej bluzy z zamkiem i strukturalnymi ramionami oraz puszystej spódnicy balonowej. Idealne połączenie komfortu i stylu.',
    descriptionFeatures: [
      'Krótka bluza z zamkiem i kontrastowym wykończeniem',
      'Puszczysta spódnica balonowa',
      'Strukturalne ramiona z białymi akcentami',
      'Tkanina premium',
    ],
    deliveryTitle: 'DOSTAWA',
    deliveryBlocks: [
      {
        title: 'Dostawa w Warszawie',
        description: 'Dostawa w dniu zamówienia.',
        time: 'Czas: w dniu zamówienia',
      },
      {
        title: 'Dostawa na terenie całej Polski',
        description: 'Za pośrednictwem DPD.',
        cost: 'Koszt: według taryf DPD',
      },
    ],
    returnsTitle: 'ZWROTY',
    returnsContent: 'Możesz zwrócić towar w ciągu 14 dni od otrzymania. Towar musi być w oryginalnym opakowaniu z metkami.',
    compositionTitle: 'SKŁAD',
    compositionContent: 'Tkanina premium z dodatkiem elastanu dla komfortu',
    addedToCart: 'Dodano do koszyka ✓',
  },
};

export default function SportSetPage() {
  const [language, setLanguage] = useState<Language>('UA');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('S');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const galleryImages = [sportSetImage1, sportSetImage2, sportSetImage3, sportSetImage4, sportSetImage5];

  const t = translations[language];
  const currency = language === 'PL' ? 'zł' : '₴';
  const price = language === 'PL' ? '800' : '9 500';

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const productData: Product = {
    id: 1,
    name: {
      UA: 'СПОРТИВНИЙ КОСТЮМ — ТЕМНО-СИНІЙ',
      EN: 'SPORT SET — NAVY',
      PL: 'ZESTAW SPORTOWY — NAVY'
    },
    price: { uah: 9500, pln: 800 },
    image: sportSetImage1,
    galleryImages: galleryImages,
    description: {
      UA: 'Елегантний спортивний костюм темно-синього кольору',
      EN: 'Elegant navy sport set',
      PL: 'Elegancki zestaw sportowy navy'
    },
    colors: ['Темно-синій', 'Білий']
  };

  const handleAddToCart = () => {
    addToCart(productData, selectedSize, 'Темно-синій');
    setIsCartOpen(true);
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

      {/* Product Detail Section */}
      <section className="pt-24 bg-white">
        <div className="grid md:grid-cols-[60%_40%] min-h-screen bg-white">
          {/* Left: Photo Gallery with Thumbnails */}
          <div className="relative bg-white flex items-center justify-start p-8 md:p-12">
            <div className="flex gap-4 w-full h-full">
              {/* Thumbnail Strip - Vertical on Far Left */}
              <div className="flex flex-col gap-3 justify-start pt-8">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-20 transition-opacity ${
                      selectedImage === index ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${t.productName} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Large Photo */}
              <div className="flex-1 relative">
                <img
                  src={galleryImages[selectedImage]}
                  alt={t.productName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="bg-white px-12 py-16">
            <div className="max-w-md">
              {/* Product Name */}
              <h1 className="text-3xl tracking-wider mb-6" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}>
                {t.productName}
              </h1>

              {/* Price */}
              <p className="text-2xl mb-8" style={{ color: '#1A2744' }}>
                {price} {currency}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <p className="text-sm mb-3 opacity-70" style={{ color: '#1A2744' }}>
                  {t.colorLabel}
                </p>
                <ColorSwitcher
                  variants={[
                    { color: 'Білий', colorHex: '#F5F5DC', path: '/product/sport-set-ivory', isActive: false },
                    { color: 'Темно-синій', colorHex: '#1A2744', path: '/product/sport-set-navy', isActive: true },
                  ]}
                />
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex gap-2">
                  {['XS', 'S', 'M'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 text-sm border-2 transition ${
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

              {/* Add to Cart Button */}
              <button
                className="w-full py-4 text-white text-sm tracking-widest hover:opacity-90 transition mb-8"
                style={{ backgroundColor: '#1A2744' }}
                onClick={handleAddToCart}
              >
                {t.addToCart}
              </button>

              {/* Description */}
              <div className="mb-8">
                <p className="text-sm leading-relaxed opacity-80" style={{ color: '#1A2744' }}>
                  {t.descriptionParagraph}
                </p>
                <div className="mt-6">
                  {t.descriptionFeatures.map((feature, index) => (
                    <p key={index} className="text-sm leading-relaxed opacity-80" style={{ color: '#1A2744' }}>
                      — {feature}
                    </p>
                  ))}
                </div>
              </div>

              {/* Accordion Sections */}
              <div className="border-t border-gray-200">
                {/* Delivery */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion('delivery')}
                    className="w-full py-4 flex items-center justify-between text-left"
                    style={{ color: '#1A2744' }}
                  >
                    <span className="text-sm tracking-wider">{t.deliveryTitle}</span>
                    {openAccordion === 'delivery' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {openAccordion === 'delivery' && (
                    <div className="pb-4 text-sm leading-relaxed opacity-70" style={{ color: '#1A2744' }}>
                      {t.deliveryBlocks.map((block, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="text-sm tracking-wider font-bold">{block.title}</h3>
                          <p className="text-sm leading-relaxed opacity-70" style={{ color: '#1A2744' }}>
                            {block.description}
                          </p>
                          {block.cost && (
                            <p className="text-sm leading-relaxed opacity-70" style={{ color: '#1A2744' }}>
                              {block.cost}
                            </p>
                          )}
                          {block.time && (
                            <p className="text-sm leading-relaxed opacity-70" style={{ color: '#1A2744' }}>
                              {block.time}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Returns */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion('returns')}
                    className="w-full py-4 flex items-center justify-between text-left"
                    style={{ color: '#1A2744' }}>
                    <span className="text-sm tracking-wider">{t.returnsTitle}</span>
                    {openAccordion === 'returns' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {openAccordion === 'returns' && (
                    <div className="pb-4 text-sm leading-relaxed opacity-70" style={{ color: '#1A2744' }}>
                      {t.returnsContent}
                    </div>
                  )}
                </div>

                {/* Composition */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleAccordion('composition')}
                    className="w-full py-4 flex items-center justify-between text-left"
                    style={{ color: '#1A2744' }}
                  >
                    <span className="text-sm tracking-wider">{t.compositionTitle}</span>
                    {openAccordion === 'composition' ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {openAccordion === 'composition' && (
                    <div className="pb-4 text-sm leading-relaxed opacity-70" style={{ color: '#1A2744' }}>
                      {t.compositionContent}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <CartDrawer
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          language={language}
        />
      )}
    </div>
  );
}