import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, ChevronDown, X, ChevronUp, Plus } from 'lucide-react';
import logo from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';
import navyImage1 from 'figma:asset/63b512ce35518510c8c8990a77bac251849367b9.png';
import navyImage2 from 'figma:asset/18e2804775f60924c8a310ab0dca022dce3c4b58.png';
import navyImage3 from 'figma:asset/23e29228a927ebd9090c47f40874173f4747ca6f.png';
import navyImage4 from 'figma:asset/8c10a844a27f0d2615180d93e8e80c2df2574e67.png';
import navyImage5 from 'figma:asset/9f7d11276eb83b401ae2d1a1b15ea2afaed9d81c.png';

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
    productName: 'СПОРТИВНИЙ КОСТЮМ — NAVY',
    colorLabel: 'Колір',
    colorNavy: 'Navy',
    descriptionParagraph: "Комплект із зіп-худі та балон-спідниці, в якому спортивний силует набуває виразного характеру завдяки контрастним смугам по крою. Об'ємна спідниця на еластичному поясі формує м'який повітряний силует — між спортом і стилем. Продається лише комплектом.",
    descriptionFeatures: [
      'Зіп-худі на блискавці',
      'Балон-спідниця з еластичним поясом',
      'Контрастні смуги по крою',
      'Колір: темно-синій з білими вставками',
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
    compositionContent: '100% бавовна',
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
    productName: 'SPORT SET — NAVY',
    colorLabel: 'Color',
    colorNavy: 'Navy',
    descriptionParagraph: 'A zip hoodie and balloon skirt set where the sporty silhouette gains expressive character through contrast stripes. The voluminous skirt with elastic waistband creates a soft, airy silhouette — between sport and style. Sold as a set only.',
    descriptionFeatures: [
      'Zip hoodie',
      'Balloon skirt with elastic waistband',
      'Contrast stripe details',
      'Color: navy with white inserts',
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
    compositionContent: '100% cotton',
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
    addToCart: 'DODAJ DO KOSZYKA',
    productName: 'ZESTAW SPORTOWY — NAVY',
    colorLabel: 'Kolor',
    colorNavy: 'Navy',
    descriptionParagraph: 'Komplet z bluzą z zamkiem i spódnicą balonem, w którym sportowa sylwetka nabiera wyrazistego charakteru dzięki kontrastowym pasom. Sold as a set only.',
    descriptionFeatures: [
      'Bluza z zamkiem',
      'Spódnica balon z elastycznym pasem',
      'Kontrastowe detale w paski',
      'Kolor: granatowy z białymi wstawkami',
    ],
    deliveryTitle: 'DOSTAWA',
    deliveryBlocks: [
      {
        title: 'Nova Poshta — Oddział',
        description: 'Dostawa do najbliższego oddziału Nova Poshta. Otrzymasz SMS z numerem przesyłki, gdy zamówienie będzie gotowe do odbioru.',
        cost: 'Koszt: według stawek Nova Poshta',
        time: 'Czas: 2–4 dni robocze',
      },
      {
        title: 'Nova Poshta — Paczkomat',
        description: 'Bezstykowy odbiór w paczkomacie. Wybierz dogodny adres i otrzymaj kod SMS do otwarcia skrytki.',
        cost: 'Koszt: według stawek Nova Poshta',
        time: 'Czas: 2–4 dni robocze',
      },
      {
        title: 'Nova Poshta — Kurier',
        description: 'Kurier dostarczy zamówienie na wskazany adres.',
        cost: 'Koszt: według stawek Nova Poshta',
        time: 'Czas: 2–4 dni robocze',
      },
      {
        title: 'Dostawa w Warszawie i Lwowie',
        description: 'Dostawa tego samego dnia.',
        time: 'Czas: tego samego dnia co zamówienie',
      },
      {
        title: 'Dostawa w całej Polsce',
        description: 'Według stawek DPD.',
        cost: 'Koszt: według stawek DPD',
      },
      {
        title: 'Dostawa międzynarodowa (z wyjątkiem Polski)',
        description: 'Dostawa do większości krajów świata.',
        cost: 'Koszt: według stawek przewoźników',
      },
    ],
    returnsTitle: 'ZWROTY',
    returnsContent: 'Możesz zwrócić przedmiot w ciągu 14 dni od otrzymania. Przedmiot musi być w oryginalnym opakowaniu z metkami.',
    compositionTitle: 'SKŁAD',
    compositionContent: '100% bawełna',
    completeLook: 'UZUPEŁNIJ LOOK',
    poloBodiName: 'Body polo',
    poloBodiPrice: '4 900 ₴',
  },
};

export default function SportSetNavyPage() {
  const [language, setLanguage] = useState<Language>('ua');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('S');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  const galleryImages = [navyImage1, navyImage2, navyImage3, navyImage4, navyImage5];

  const t = translations[language];
  const currency = language === 'pl' ? 'zł' : '₴';
  const price = language === 'pl' ? '800' : '9 500';

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
                    style={{ backgroundColor: '#1A2744' }}
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
                          : 'bg-white text-[#1A2744] border-[#1A2744] hover:bg-[#1A2744]/10'
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
              <div className="mb-8 pb-8 border-b border-gray-200">
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#1A2744', opacity: 0.85 }}>
                  {t.descriptionParagraph}
                </p>
                <ul className="space-y-2">
                  {t.descriptionFeatures.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2" style={{ color: '#1A2744', opacity: 0.85 }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#AEE2FC' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accordions */}
              <div className="space-y-4">
                {/* Delivery Accordion */}
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
                    <div className="pb-4 space-y-4">
                      {t.deliveryBlocks.map((block, idx) => (
                        <div key={idx} className="pb-3">
                          <p className="text-sm font-medium mb-1" style={{ color: '#1A2744' }}>
                            {block.title}
                          </p>
                          <p className="text-xs mb-1" style={{ color: '#1A2744', opacity: 0.7 }}>
                            {block.description}
                          </p>
                          {block.cost && (
                            <p className="text-xs" style={{ color: '#1A2744', opacity: 0.6 }}>
                              {block.cost}
                            </p>
                          )}
                          {block.time && (
                            <p className="text-xs" style={{ color: '#1A2744', opacity: 0.6 }}>
                              {block.time}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Returns Accordion */}
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
                    <div className="pb-4">
                      <p className="text-sm" style={{ color: '#1A2744', opacity: 0.85 }}>
                        {t.returnsContent}
                      </p>
                    </div>
                  )}
                </div>

                {/* Composition Accordion */}
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
                    <div className="pb-4">
                      <p className="text-sm" style={{ color: '#1A2744', opacity: 0.85 }}>
                        {t.compositionContent}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete The Look Section */}
      <section className="py-16 px-8 bg-white border-t border-gray-200">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl text-center mb-12 tracking-wider" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}>
            {t.completeLook}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Polo-Bodi Card */}
            <div className="bg-white">
              <div className="relative overflow-hidden mb-4 aspect-[3/4] cursor-pointer" onClick={() => navigate('/product/polo-bodi')}>
                <img
                  src="https://images.unsplash.com/photo-1691796773910-923291dd6e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHN0eWxpc2glMjBwb2xvJTIwYm9keXN1aXR8ZW58MXx8fHwxNzczODQxOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={t.poloBodiName}
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                  <Plus className="w-5 h-5" style={{ color: '#1A2744' }} />
                </button>
              </div>
              <h3 className="text-lg mb-2 cursor-pointer hover:opacity-70" style={{ fontFamily: 'Forum, serif', color: '#1A2744' }} onClick={() => navigate('/product/polo-bodi')}>
                {t.poloBodiName}
              </h3>
              <p className="text-lg" style={{ color: '#1A2744' }}>{t.poloBodiPrice}</p>
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
