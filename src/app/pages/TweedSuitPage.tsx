import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, ChevronDown, X, ChevronUp, Plus } from 'lucide-react';
import logo from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';
import tweedImage1 from 'figma:asset/a93996ae88086c3e1f654c0e9fb85ede632003d9.png';
import tweedImage2 from 'figma:asset/f6d1b5ca2a3b4b4c83dd553bc8dd33006964b5be.png';
import tweedImage3 from 'figma:asset/af4f584853fc3acf7c37f5eca4afff3c54d7b407.png';
import tweedImage4 from 'figma:asset/07c19f02b959af5aa0f21c358b54404c07c605f5.png';

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
    productName: 'ТВІДОВИЙ КОСТЮМ',
    colorLabel: 'Колір',
    colorCream: 'Кремовий',
    descriptionParagraph: 'Виразна форма плечей надає жакету чіткого силуету, асиметричні шорти у комплекті створюють завершений образ із характером. Твідова тканина преміальної якості зберігає форму та залишається доречною в будь-якому контексті — від ділового до неформального. Продається лише комплектом.',
    descriptionFeatures: [
      'Жакет із структурованими плечима',
      'Асиметричні шорти у комплекті',
      'Твідова тканина преміальної якості',
      'Колір: кремовий',
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
    compositionContent: 'Преміальний італійський твід Chanel',
    completeLook: 'ЗАВЕРШІТЬ ОБРАЗ',
    poloBodiName: 'Поло-боді',
    poloBodiPrice: '4 900 ₴',
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
    productName: 'TWEED SUIT',
    colorLabel: 'Color',
    colorCream: 'Cream',
    descriptionParagraph: 'A statement shoulder shape gives the jacket a sharp silhouette, asymmetric shorts complete the look with character. Premium tweed fabric holds its shape and works in any context. Sold as a set only.',
    descriptionFeatures: [
      'Jacket with structured shoulders',
      'Asymmetric shorts included',
      'Premium tweed fabric',
      'Color: cream',
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
    compositionContent: 'Premium Italian Chanel tweed',
    completeLook: 'COMPLETE THE LOOK',
    poloBodiName: 'Polo Bodysuit',
    poloBodiPrice: '4 900 ₴',
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
    productName: 'GARNITUR TWEEDOWY',
    colorLabel: 'Kolor',
    colorCream: 'Kremowy',
    descriptionParagraph: 'Wyrazisty kształt ramion nadaje marynarce ostrej sylwetki, asymetryczne szorty w komplecie tworzą stylizację z charakterem. Sprzedawana tylko jako komplet.',
    descriptionFeatures: [
      'Marynarka ze strukturalnymi ramionami',
      'Asymetryczne szorty w komplecie',
      'Tkanina tweedowa premium',
      'Kolor: kremowy',
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
    compositionContent: 'Premium włoski tweed Chanel',
    completeLook: 'UZUPEŁNIJ LOOK',
    poloBodiName: 'Body polo',
    poloBodiPrice: '4 900 ₴',
  },
};

export default function TweedSuitPage() {
  const [language, setLanguage] = useState<Language>('ua');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('S');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  const galleryImages = [tweedImage1, tweedImage2, tweedImage3, tweedImage4];

  const t = translations[language];
  const currency = language === 'pl' ? 'zł' : '₴';
  const price = language === 'pl' ? '1 250' : '14 900';

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

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
                <div className="flex gap-2">
                  <button
                    className="w-10 h-10 rounded-full border-2 border-[#1A2744]"
                    style={{ backgroundColor: '#E8DCC8' }}
                  />
                </div>
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

      {/* Complete the Look Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl tracking-wider text-center mb-12" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}>
            {t.completeLook}
          </h2>
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/product/polo-bodi')}
              className="relative group max-w-xs"
            >
              <div className="relative aspect-[3/4] overflow-hidden w-48">
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#F5F0EB' }}>
                  <div className="w-16 h-16 rounded-full" style={{ backgroundColor: '#F5F0EB', border: '2px solid #1A2744' }}></div>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Plus className="w-6 h-6" style={{ color: '#1A2744' }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg mb-1" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}>
                  {t.poloBodiName}
                </h3>
                <p className="text-sm opacity-70" style={{ color: '#1A2744' }}>
                  {t.poloBodiPrice}
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