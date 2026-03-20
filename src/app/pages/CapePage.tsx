import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, ChevronDown, X, ChevronUp, Plus } from 'lucide-react';
import logo from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';
import productImage from 'figma:asset/f8dd7a5a7adf4c11672ccc68de1431c698490972.png';
import dressImage from 'figma:asset/f8dd7a5a7adf4c11672ccc68de1431c698490972.png';

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
    productName: 'КЕЙП',
    colorLabel: 'Колір',
    colorWhite: 'Білий',
    colorBlack: 'Чорний',
    descriptionParagraph: 'Кейп із чітким кроєм і щільною тканиною, яка зберігає форму протягом усього дня. Вільний силует робить його універсальним — накидається поверх будь-якого образу і одразу надає йому завершеності. Лаконічний, але помітний. Доступний у двох кольорах: білий та чорний.',
    descriptionFeatures: [
      'Вільний силует',
      'Щільна тканина з чітким кроєм',
      'Кольори: білий, чорний',
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
        description: "Кур'єр доставить замовлення за вказаною адресою. Уточніть деталі доставки під час оформлення.",
        cost: 'Вартість: згідно з тарифами Нової пошти',
        time: 'Термін: 2–4 робочі дні',
      },
      {
        title: 'Доставка по Варшаві та Львову',
        description: 'Доставка в день замовлення для клієнтів у Варшаві та Львові.',
        time: 'Термін: в день замовлення',
      },
      {
        title: 'Доставка по всій Польщі',
        description: 'Доставка по всій території Польщі за тарифами DPD.',
        cost: 'Вартість: згідно з тарифами DPD',
      },
      {
        title: 'Міжнародна доставка (крім Польщі)',
        description: 'Ми здійснюємо міжнародну доставку до більшості країн світу. Термін та вартість залежать від обраної країни та способу доставки.',
        cost: 'Вартість: згідно з тарифами служб доставки',
      },
    ],
    returnsTitle: 'ПОВЕРНЕННЯ',
    returnsContent: 'Ви можете повернути товар протягом 14 днів з моменту отримання. Товар має бути в оригінальній упаковці з бирками.',
    compositionTitle: 'СКЛАД',
    compositionContent: '95% віскоза, 5% еластан. Рекомендується ручне прання або делікатний режим.',
    completeLook: 'ЗАВЕРШІТЬ ОБРАЗ',
    dressName: 'Сукня',
    dressPrice: '10 500 ₴',
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
    productName: 'CAPE',
    colorLabel: 'Color',
    colorWhite: 'White',
    colorBlack: 'Black',
    descriptionParagraph: 'A cape with a precise cut and dense fabric that holds its shape throughout the day. The loose silhouette makes it versatile — throw it over any outfit and instantly finish the look. Minimal, but noticeable. Available in two colors: white and black.',
    descriptionFeatures: [
      'Loose silhouette',
      'Dense fabric with precise cut',
      'Colors: white, black',
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
        description: 'A courier will deliver your order to the specified address. Confirm delivery details during checkout.',
        cost: 'Cost: according to Nova Poshta rates',
        time: 'Time: 2–4 business days',
      },
      {
        title: 'Delivery in Warsaw and Lviv',
        description: 'Same-day delivery for customers in Warsaw and Lviv.',
        time: 'Time: same day as order',
      },
      {
        title: 'Delivery across Poland',
        description: 'Delivery across all of Poland via DPD.',
        cost: 'Cost: according to DPD rates',
      },
      {
        title: 'International Delivery (except Poland)',
        description: 'We deliver to most countries worldwide. Time and cost depend on the destination country and delivery method.',
        cost: 'Cost: according to carrier rates',
      },
    ],
    returnsTitle: 'RETURNS',
    returnsContent: 'You can return the item within 14 days of receipt. Item must be in original packaging with tags.',
    compositionTitle: 'COMPOSITION',
    compositionContent: '95% viscose, 5% elastane. Hand wash or delicate cycle recommended.',
    completeLook: 'COMPLETE THE LOOK',
    dressName: 'Dress',
    dressPrice: '10 500 ₴',
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
    productName: 'PELERYNA',
    colorLabel: 'Kolor',
    colorWhite: 'Biały',
    colorBlack: 'Czarny',
    descriptionParagraph: 'Peleryna o precyzyjnym kroju i gęstej tkaninie, która zachowuje kształt przez cały dzień. Luźna sylwetka czyni ją uniwersalną. Minimalistyczna, ale zauważalna. Dostępna w dwóch kolorach: biały i czarny.',
    descriptionFeatures: [
      'Luźna sylwetka',
      'Gęsta tkanina o precyzyjnym kroju',
      'Kolory: biały, czarny',
    ],
    deliveryTitle: 'DOSTAWA',
    deliveryBlocks: [
      {
        title: 'Dostawa w Warszawie',
        description: 'Dostawa w dniu zamówienia dla klientów w Warszawie.',
        time: 'Czas: w dniu zamówienia',
      },
      {
        title: 'Dostawa na terenie całej Polski',
        description: 'Dostawa na terenie całej Polski za pośrednictwem DPD.',
        cost: 'Koszt: według taryf DPD',
      },
    ],
    returnsTitle: 'ZWROTY',
    returnsContent: 'Możesz zwrócić towar w ciągu 14 dni od otrzymania. Towar musi być w oryginalnym opakowaniu z metkami.',
    compositionTitle: 'SKŁAD',
    compositionContent: '95% wiskoza, 5% elastan. Zalecane pranie ręczne lub delikatny tryb.',
    completeLook: 'UZUPEŁNIJ LOOK',
    dressName: 'Sukienka',
    dressPrice: '10 500 ₴',
  },
};

export default function CapePage() {
  const [language, setLanguage] = useState<Language>('ua');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('XS/S');
  const [selectedColor, setSelectedColor] = useState('#0D0D0D');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const navigate = useNavigate();

  const t = translations[language];
  const currency = language === 'pl' ? 'zł' : '₴';
  const price = language === 'pl' ? '370' : '4 500';

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const colors = [
    { value: '#0D0D0D', label: 'Black' },
    { value: '#FAFAFA', label: 'White' },
  ];

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
          {/* Left: Large Product Image */}
          <div className="relative bg-white flex items-center justify-center p-16">
            <img
              src={productImage}
              alt={t.productName}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-8">
              <p className="text-sm tracking-wider text-white bg-black/50 px-4 py-2">
                {t.productName}
              </p>
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
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color.value ? 'border-[#1A2744]' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex gap-2">
                  {['XS/S', 'M'].map((size) => (
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
                          <h4 className="text-sm tracking-wider font-bold">{block.title}</h4>
                          <p className="text-sm leading-relaxed opacity-70">{block.description}</p>
                          {block.cost && <p className="text-sm leading-relaxed opacity-70">{block.cost}</p>}
                          {block.time && <p className="text-sm leading-relaxed opacity-70">{block.time}</p>}
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

      {/* Complete the Look Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl tracking-wider text-center mb-12" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}>
            {t.completeLook}
          </h2>
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/product/dress')}
              className="relative group max-w-xs"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={dressImage}
                  alt={t.dressName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Plus className="w-6 h-6" style={{ color: '#1A2744' }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg mb-1" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}>
                  {t.dressName}
                </h3>
                <p className="text-sm opacity-70" style={{ color: '#1A2744' }}>
                  {t.dressPrice}
                </p>
              </div>
            </button>
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