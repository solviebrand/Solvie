import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, ChevronDown, X, ChevronUp } from 'lucide-react';
import { ColorSwitcher } from '../components/ColorSwitcher';
import capeImage1 from 'figma:asset/04b50abfa162670800fa00dbafbbc39b2108a9bd.png';
import capeImage2 from 'figma:asset/d47e691e337a3f7715bfed7fcd4911ddd3bd28cb.png';
import capeImage3 from 'figma:asset/dced2899446a805f1d18e051ef42a38d9fa1a3a5.png';
import capeImage4 from 'figma:asset/2bba1a39bbae35c9b070ead0bd1eef6627c20cd6.png';
import logoImage from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';

type Language = 'ua' | 'en' | 'pl';

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
    cart: 'Кошик',
    addToCart: 'В КОШИК',
    productName: 'КЕЙП — ЧОРНИЙ',
    colorLabel: 'Колір',
    colorBlack: 'Чорний',
    descriptionParagraph: 'Елегантний кейп чорного кольору — ідеальне доповнення до вечірнього образу. Додає витонченості та драматичності будь-якому вбранню. Створений із преміальної тканини.',
    descriptionFeatures: [
      'Чорний кейп-накидка',
      'Подовжені рукави',
      'Вирізана ділянка біля декольте',
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
    cart: 'Cart',
    addToCart: 'ADD TO CART',
    productName: 'CAPE — BLACK',
    colorLabel: 'Color',
    colorBlack: 'Black',
    descriptionParagraph: 'Elegant black cape — the perfect complement to an evening look. Adds sophistication and drama to any outfit. Made from premium fabric.',
    descriptionFeatures: [
      'Black cape overlay',
      'Extended sleeves',
      'Cutout detail at neckline',
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
    cart: 'Koszyk',
    addToCart: 'DO KOSZYKA',
    productName: 'PELERYNA — CZARNA',
    colorLabel: 'Kolor',
    colorBlack: 'Czarny',
    descriptionParagraph: 'Elegancka czarna peleryna — idealne uzupełnienie wieczorowej stylizacji. Dodaje wyrafinowania i dramatyzmu każdemu ubraniu. Wykonana z tkaniny premium.',
    descriptionFeatures: [
      'Czarna peleryna',
      'Wydłużone rękawy',
      'Wycięcie przy dekolcie',
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
  },
};

export default function CapePage() {
  const [language, setLanguage] = useState<Language>('ua');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('S');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  const galleryImages = [capeImage1, capeImage2, capeImage3, capeImage4];

  const t = translations[language];
  const currency = language === 'pl' ? 'zł' : '₴';
  const price = language === 'pl' ? '370' : '4 500';

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
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
            <button onClick={() => navigate('/#collection')} className="text-lg tracking-widest hover:opacity-70 transition text-white">
              {t.collection}
            </button>
            <button onClick={() => navigate('/#shop')} className="text-lg tracking-widest hover:opacity-70 transition text-white">
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
                  <a href="/#about" className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
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
            </button>
          </div>
        </div>
      </nav>

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
                    { color: 'Білий', colorHex: '#FAFAFA', path: '/product/cape-white', isActive: false },
                    { color: 'Чорний', colorHex: '#0D0D0D', path: '/product/cape', isActive: true },
                  ]}
                  currentColorName={t.colorBlack}
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
                    style={{ color: '#1A2744' }}
                  >
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
              <p className="text-center py-12 opacity-60" style={{ color: '#1A2744' }}>
                Your cart is empty
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}