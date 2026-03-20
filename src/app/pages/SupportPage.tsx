import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingBag, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import logo from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';

type Language = 'ua' | 'en' | 'pl';

const translations = {
  ua: {
    premiere: 'PREMIÈRE',
    shop: 'МАГАЗИН',
    info: 'ІНФО',
    aboutUs: 'Про нас',
    delivery: 'Доставка',
    contacts: 'Контакти',
    returns: 'Повернення та обмін',
    social: 'Соціальні мережі',
    cart: 'Кошик',
    pageTitle: 'ПІДТРИМКА',
    contactsTitle: 'КОНТАКТИ',
    contactsContent: {
      instagram: 'Instagram: @solvie.brand',
      tiktok: 'TikTok: @solvie.brand',
      email: 'Email: hello@solviebrand.com',
      telegram: 'Telegram: @solviebrand',
      phone: 'Телефон: +380 77 911 28 68',
    },
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
        title: 'Доставка у Варшаві та Львові',
        description: 'Доставка в день замовлення для клієнтів у Варшаві та Львові.',
        time: 'Термін: у день замовлення',
      },
      {
        title: 'Доставка на території всієї Польщі',
        description: 'Доставка н�� території всієї Польщі за допомогою DPD.',
        cost: 'Вартість: згідно з тарифами DPD',
      },
      {
        title: 'Міжнародна доставка',
        description: 'Ми здійснюємо міжнародну доставку до більшості країн світу. Терміни та вартість залежать від обраної країни та способу доставки.',
        cost: 'Вартість: згідно з тарифами Нової пошти',
        time: 'Термін: 12–14 робочих днів',
      },
    ],
    returnsTitle: 'ПОВЕРНЕННЯ ТА ОБМІН',
    returnsContent: 'Повернення та обмін можливі протягом 14 днів з моменту отримання замовлення. Товар має бути в ідеальному стані, з усіма бирками та в оригінальній упаковці. Для оформлення повернення напишіть нам на hello@solviebrand.com або в Instagram/Telegram.',
    socialTitle: 'СОЦІАЛЬНІ МЕРЕЖІ',
    socialContent: {
      instagram: 'Instagram: @solvie.brand',
      tiktok: 'TikTok: @solvie.brand',
      threads: 'Threads: @solvie.brand',
    },
  },
  en: {
    premiere: 'PREMIÈRE',
    shop: 'SHOP',
    info: 'INFO',
    aboutUs: 'About us',
    delivery: 'Delivery',
    contacts: 'Contacts',
    returns: 'Returns & Exchange',
    social: 'Social media',
    cart: 'Cart',
    pageTitle: 'SUPPORT',
    contactsTitle: 'CONTACTS',
    contactsContent: {
      instagram: 'Instagram: @solvie.brand',
      tiktok: 'TikTok: @solvie.brand',
      email: 'Email: hello@solviebrand.com',
      telegram: 'Telegram: @solviebrand',
      phone: 'Phone: +380 77 911 28 68',
    },
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
        description: 'Delivery throughout Poland via DPD.',
        cost: 'Cost: according to DPD rates',
      },
      {
        title: 'International Delivery',
        description: 'We offer international delivery to most countries worldwide. Timing and cost depend on the chosen country and delivery method.',
        cost: 'Cost: according to Nova Poshta rates',
        time: 'Time: 12–14 business days',
      },
    ],
    returnsTitle: 'RETURNS & EXCHANGE',
    returnsContent: 'Returns and exchanges are accepted within 14 days of receiving your order. Items must be unworn, with all tags attached and in original packaging. To arrange a return contact us at hello@solviebrand.com or via Instagram/Telegram.',
    socialTitle: 'SOCIAL MEDIA',
    socialContent: {
      instagram: 'Instagram: @solvie.brand',
      tiktok: 'TikTok: @solvie.brand',
      threads: 'Threads: @solvie.brand',
    },
  },
  pl: {
    premiere: 'PREMIÈRE',
    shop: 'SKLEP',
    info: 'INFORMACJE',
    aboutUs: 'O nas',
    delivery: 'Dostawa',
    contacts: 'Kontakty',
    returns: 'Zwroty i wymiana',
    social: 'Media społecznościowe',
    cart: 'Koszyk',
    pageTitle: 'WSPARCIE',
    contactsTitle: 'KONTAKTY',
    contactsContent: {
      instagram: 'Instagram: @solvie.brand',
      tiktok: 'TikTok: @solvie.brand',
      email: 'Email: hello@solviebrand.com',
      telegram: 'Telegram: @solviebrand',
      phone: 'Telefon: +380 77 911 28 68',
    },
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
    returnsTitle: 'ZWROTY I WYMIANY',
    returnsContent: 'Zwroty i wymiany są możliwe w ciągu 14 dni od otrzymania zamówienia. Produkt musi być nieużywany, z wszystkimi metkami i w oryginalnym opakowaniu. Aby złożyć zwrot napisz do nas na hello@solviebrand.com lub przez Instagram/Telegram.',
    socialTitle: 'MEDIA SPOŁECZNOŚCIOWE',
    socialContent: {
      instagram: 'Instagram: @solvie.brand',
      tiktok: 'TikTok: @solvie.brand',
      threads: 'Threads: @solvie.brand',
    },
  },
};

export default function SupportPage() {
  const [language, setLanguage] = useState<Language>('ua');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const navigate = useNavigate();

  const t = translations[language];

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Jost, sans-serif' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ backgroundColor: '#AEE2FC' }}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <img src={logo} alt="SB Logo" className="h-8" />
            <span className="text-2xl tracking-wider text-white" style={{ fontFamily: 'Forum, serif' }}>
              SOLVIE
            </span>
          </button>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('/premiere')} className="text-sm tracking-widest text-white hover:opacity-80 transition">
              {t.premiere}
            </button>
            <button onClick={() => navigate('/shop')} className="text-sm tracking-widest text-white hover:opacity-80 transition">
              {t.shop}
            </button>
            <div className="relative">
              <button
                onClick={() => setIsInfoDropdownOpen(!isInfoDropdownOpen)}
                className="text-sm tracking-widest text-white hover:opacity-80 transition flex items-center gap-1"
              >
                {t.info}
                <ChevronDown className="w-3 h-3" />
              </button>
              {isInfoDropdownOpen && (
                <div className="absolute top-full mt-2 bg-white rounded shadow-lg py-2 min-w-[200px]">
                  <a href="#about" className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.aboutUs}
                  </a>
                  <a href="#delivery" className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.delivery}
                  </a>
                  <a href="#contacts" className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.contacts}
                  </a>
                  <a href="#returns" className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.returns}
                  </a>
                  <a href="#social" className="block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>
                    {t.social}
                  </a>
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

      {/* Support Content */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Page Title */}
          <h1 
            className="text-4xl tracking-wider text-center mb-12 pb-6 border-b border-gray-300" 
            style={{ fontFamily: 'Forum, serif', color: '#1A2744' }}
          >
            {t.pageTitle}
          </h1>

          {/* Accordion Sections */}
          <div className="space-y-0">
            {/* КОНТАКТИ Accordion */}
            <div className="border-b border-gray-300">
              <button
                onClick={() => toggleAccordion('contacts')}
                className="w-full py-6 flex items-center justify-between text-left"
                style={{ color: '#1A2744' }}
              >
                <span className="text-sm tracking-wider uppercase">{t.contactsTitle}</span>
                {openAccordion === 'contacts' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openAccordion === 'contacts' && (
                <div className="pb-6 space-y-3" style={{ color: '#1A2744' }}>
                  <div className="text-sm leading-relaxed">
                    <a 
                      href="https://www.instagram.com/solvie.brand?igsh=MWw2cGVkZTFlOWYzOA==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition"
                    >
                      {t.contactsContent.instagram}
                    </a>
                  </div>
                  <div className="text-sm leading-relaxed">
                    <a 
                      href="https://www.tiktok.com/@solvie.brand?_r=1&_t=ZS-94qMcnbkY9H" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition"
                    >
                      {t.contactsContent.tiktok}
                    </a>
                  </div>
                  <div className="text-sm leading-relaxed">
                    <a 
                      href="mailto:hello@solviebrand.com"
                      className="hover:opacity-70 transition"
                    >
                      {t.contactsContent.email}
                    </a>
                  </div>
                  <div className="text-sm leading-relaxed">
                    <a 
                      href="https://t.me/solviebrand" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition"
                    >
                      {t.contactsContent.telegram}
                    </a>
                  </div>
                  <div className="text-sm leading-relaxed">
                    <a 
                      href="tel:+380779112868"
                      className="hover:opacity-70 transition"
                    >
                      {t.contactsContent.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* ДОСТАВКА Accordion */}
            <div className="border-b border-gray-300">
              <button
                onClick={() => toggleAccordion('delivery')}
                className="w-full py-6 flex items-center justify-between text-left"
                style={{ color: '#1A2744' }}
              >
                <span className="text-sm tracking-wider uppercase">{t.deliveryTitle}</span>
                {openAccordion === 'delivery' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openAccordion === 'delivery' && (
                <div className="pb-6 space-y-6" style={{ color: '#1A2744' }}>
                  {t.deliveryBlocks.map((block, index) => (
                    <div key={index}>
                      <h4 className="text-sm tracking-wider font-semibold mb-2">{block.title}</h4>
                      <p className="text-sm leading-relaxed opacity-70 mb-1">{block.description}</p>
                      {block.cost && <p className="text-sm leading-relaxed opacity-70">{block.cost}</p>}
                      {block.time && <p className="text-sm leading-relaxed opacity-70">{block.time}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ПОВЕРНЕННЯ ТА ОБМІН Accordion */}
            <div className="border-b border-gray-300">
              <button
                onClick={() => toggleAccordion('returns')}
                className="w-full py-6 flex items-center justify-between text-left"
                style={{ color: '#1A2744' }}
              >
                <span className="text-sm tracking-wider uppercase">{t.returnsTitle}</span>
                {openAccordion === 'returns' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openAccordion === 'returns' && (
                <div className="pb-6 text-sm leading-relaxed opacity-70" style={{ color: '#1A2744' }}>
                  {t.returnsContent}
                </div>
              )}
            </div>

            {/* СОЦІАЛЬНІ МЕРЕЖІ Accordion */}
            <div className="border-b border-gray-300">
              <button
                onClick={() => toggleAccordion('social')}
                className="w-full py-6 flex items-center justify-between text-left"
                style={{ color: '#1A2744' }}
              >
                <span className="text-sm tracking-wider uppercase">{t.socialTitle}</span>
                {openAccordion === 'social' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openAccordion === 'social' && (
                <div className="pb-6 space-y-3" style={{ color: '#1A2744' }}>
                  <div className="text-sm leading-relaxed">
                    <a 
                      href="https://www.instagram.com/solvie.brand?igsh=MWw2cGVkZTFlOWYzOA==" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition"
                    >
                      {t.socialContent.instagram}
                    </a>
                  </div>
                  <div className="text-sm leading-relaxed">
                    <a 
                      href="https://www.tiktok.com/@solvie.brand?_r=1&_t=ZS-94qMcnbkY9H" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition"
                    >
                      {t.socialContent.tiktok}
                    </a>
                  </div>
                  <div className="text-sm leading-relaxed">
                    <a 
                      href="https://www.threads.net/@solvie.brand" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition"
                    >
                      {t.socialContent.threads}
                    </a>
                  </div>
                </div>
              )}
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