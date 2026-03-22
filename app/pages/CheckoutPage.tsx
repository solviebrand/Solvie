import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, Instagram, Send, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SearchableDropdown } from '../components/SearchableDropdown';
import { useCart } from '../context/CartContext';
import { countries, defaultCountries } from '../data/countries';
import { ukrainianCities } from '../data/cities';
import { polishCities } from '../data/polishCities';
import { novaPoshtaBranches, novaPoshtaPostamats } from '../data/novaPoshtaData';
import { dpdBranches } from '../data/dpdBranches';
import logoImage from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';

type Language = 'ua' | 'en' | 'pl';
type DeliveryMethod = 'taxi' | 'nova-branch' | 'nova-postamat' | 'nova-courier' | 'same-day-courier' | 'dpd-branch' | 'dpd-courier' | 'standard' | null;

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
    pageTitle: 'Оформлення замовлення',
    recipientData: 'ДАНІ ОТРИМУВАЧА',
    deliverySection: 'ДОСТАВКА',
    yourOrder: 'ВАШЕ ЗАМОВЛЕННЯ',
    paymentSection: 'ОПЛАТА',
    paymentMethod: 'Спосіб оплати',
    cardPayment: 'Оплата карткою (LiqPay)',
    liqpayMessage: 'Після підтвердження ви будете перенаправлені на LiqPay',
    stripePayment: 'Оплата карткою (Stripe) — для міжнародних платежів',
    stripeMessage: 'Після підтвердження ви будете перенаправлені на Stripe',
    stripePlaceholder: 'Stripe буде підключено найближчим часом. Будь ласка, оберіть інший спосіб оплати.',
    bankTransfer: 'Повна оплата / банківський переказ на реквізити — ЛИШЕ В ГРИВНІ!',
    bankTransferMessage: 'Здійсніть оплату на наш банківський рахунок, вказавши номер замовлення в призначенні платежу. Замовлення обробляється після зарахування коштів. Квитанцію надішліть у Telegram @solviebrand або на мейл hello@solviebrand.com',
    termsCheckbox: 'Я прочитав та згоден з Правилами та умовами',
    confirmOrder: 'ПІДТВЕРДИТИ ЗАМОВЛЕННЯ',
    subtotal: 'Проміжний підсумок',
    deliveryFee: 'Доставка',
    deliveryByCarrier: 'за тарифами перевізника',
    total: 'Загалом',
    thankYou: 'Дякуємо!',
    orderConfirmation: 'Ваше замовлення прийнято. Ми зв\'яжемось з вами найближчим часом.',
    country: 'Країна / Регіон',
    city: 'Оберіть місто',
    branch: 'Оберіть відділення',
    firstName: "Ім'я",
    lastName: 'Прізвище',
    phone: 'Телефон',
    email: 'E-mail',
    postalCode: 'Індекс',
    cityField: 'Місто',
    street: 'Вулиця',
    building: 'Будинок',
    apartment: 'Квартира',
    // Delivery options
    taxi: 'ВІДПРАВКА ТАКСІ',
    taxiSubtitle: 'в день оформлення',
    novaBranch: 'НОВА ПОШТА - ВІДДІЛЕННЯ',
    novaPostamat: 'НОВА ПОШТА - ПОШТОМАТ',
    novaCourier: 'НОВА ПОШТА - КУР\'ЄР',
    novaWorkingDays: '2-4 робочих дні',
    sameDayCourier: 'ДОСТАВКА КУР\'ЄРОМ',
    sameDaySubtitle: 'в день оформлення',
    dpdBranch: 'DPD - ВІДДІЛЕННЯ',
    dpdCourier: 'DPD - КУР\'ЄР',
    dpdWorkingDays: '2-4 робочих дні',
    standardDelivery: 'СТАНДАРТНА ДОСТАВКА',
    standardSubtitle: '12-14 робочих днів',
    addressPlaceholder: 'Вулиця, будинок, квартира',
    copyright: '© 2026 SOLVIE. Всі права захищено.',
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
    pageTitle: 'Checkout',
    recipientData: 'RECIPIENT DATA',
    deliverySection: 'DELIVERY',
    yourOrder: 'YOUR ORDER',
    paymentSection: 'PAYMENT',
    paymentMethod: 'Payment method',
    cardPayment: 'Card payment (LiqPay)',
    liqpayMessage: 'After confirmation you will be redirected to LiqPay',
    stripePayment: 'Card payment (Stripe) — for international payments',
    stripeMessage: 'After confirmation you will be redirected to Stripe',
    stripePlaceholder: 'Stripe will be connected soon. Please choose another payment method.',
    bankTransfer: 'Full payment / bank transfer — UAH ONLY!',
    bankTransferMessage: 'Make a payment directly to our bank account. Please specify your order number in the transfer description. After payment, send the receipt to us on Telegram @solviebrand or email hello@solviebrand.com',
    termsCheckbox: 'I have read and agree to the Terms and Conditions',
    confirmOrder: 'CONFIRM ORDER',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery',
    deliveryByCarrier: 'by carrier rates',
    total: 'Total',
    thankYou: 'Thank you!',
    orderConfirmation: 'Your order has been received. We will contact you shortly.',
    country: 'Country / Region',
    city: 'Select city',
    branch: 'Select branch',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'E-mail',
    postalCode: 'Postal Code',
    cityField: 'City',
    street: 'Street',
    building: 'Building',
    apartment: 'Apartment',
    taxi: 'TAXI DELIVERY',
    taxiSubtitle: 'same day delivery',
    novaBranch: 'NOVA POSHTA - BRANCH',
    novaPostamat: 'NOVA POSHTA - PARCEL LOCKER',
    novaCourier: 'NOVA POSHTA - COURIER',
    novaWorkingDays: '2-4 working days',
    sameDayCourier: 'COURIER DELIVERY',
    sameDaySubtitle: 'same day delivery',
    dpdBranch: 'DPD - PICKUP POINT',
    dpdCourier: 'DPD - COURIER',
    dpdWorkingDays: '2-4 working days',
    standardDelivery: 'STANDARD DELIVERY',
    standardSubtitle: '12-14 working days',
    addressPlaceholder: 'Street, building, apartment',
    copyright: '© 2026 SOLVIE. All rights reserved.',
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
    pageTitle: 'Składanie zamówienia',
    recipientData: 'DANE ODBIORCY',
    deliverySection: 'DOSTAWA',
    yourOrder: 'TWOJE ZAMÓWIENIE',
    paymentSection: 'PŁATNOŚĆ',
    paymentMethod: 'Metoda płatności',
    cardPayment: 'Płatność kartą (LiqPay)',
    liqpayMessage: 'Po potwierdzeniu zostaniesz przekierowany do LiqPay',
    stripePayment: 'Płatność kartą (Stripe) — płatności międzynarodowe',
    stripeMessage: 'Po potwierdzeniu zostaniesz przekierowany do Stripe',
    stripePlaceholder: 'Stripe zostanie podłączony wkrótce. Proszę wybrać inną metodę płatności.',
    bankTransfer: 'Pełna płatność / przelew bankowy — TYLKO W HRYWNIE!',
    bankTransferMessage: 'Dokonaj płatności bezpośrednio na nasze konto bankowe. Proszę podać numer zamówienia w opisie przelewu. Po dokonaniu płatności wyślij potwierdzenie na Telegram @solviebrand lub email hello@solviebrand.com',
    termsCheckbox: 'Przeczytałem i zgadzam się z Regulaminem',
    confirmOrder: 'POTWIERDŹ ZAMÓWIENIE',
    subtotal: 'Suma częściowa',
    deliveryFee: 'Dostawa',
    deliveryByCarrier: 'według stawek przewoźnika',
    total: 'Razem',
    thankYou: 'Dziękujemy!',
    orderConfirmation: 'Twoje zamówienie zostało przyjęte. Skontaktujemy się z Tobą wkrótce.',
    country: 'Kraj / Region',
    city: 'Wybierz miasto',
    branch: 'Wybierz oddział',
    firstName: 'Imię',
    lastName: 'Nazwisko',
    phone: 'Telefon',
    email: 'E-mail',
    postalCode: 'Kod pocztowy',
    cityField: 'Miasto',
    street: 'Ulica',
    building: 'Budynek',
    apartment: 'Mieszkanie',
    taxi: 'DOSTAWA TAXI',
    taxiSubtitle: 'w dniu zamówienia',
    novaBranch: 'NOVA POSHTA - ODDZIAŁ',
    novaPostamat: 'NOVA POSHTA - PACZKOMAT',
    novaCourier: 'NOVA POSHTA - KURIER',
    novaWorkingDays: '2-4 dni robocze',
    sameDayCourier: 'DOSTAWA KURIEREM',
    sameDaySubtitle: 'w dniu zamówienia',
    dpdBranch: 'DPD - PUNKT ODBIORU',
    dpdCourier: 'DPD - KURIER',
    dpdWorkingDays: '2-4 dni robocze',
    standardDelivery: 'DOSTAWA STANDARDOWA',
    standardSubtitle: '12-14 dni roboczych',
    addressPlaceholder: 'Ulica, budynek, mieszkanie',
    copyright: '© 2026 SOLVIE. Wszelkie prawa zastrzeżone.',
  },
};

export default function CheckoutPage() {
  const [language, setLanguage] = useState<Language>('ua');
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  // Section 1: Recipient Data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(defaultCountries.ua);
  const [city, setCity] = useState('');
  
  // International address fields
  const [postalCode, setPostalCode] = useState('');
  const [intlCity, setIntlCity] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');

  // Section 2: Delivery
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedPostamat, setSelectedPostamat] = useState('');
  const [simpleAddress, setSimpleAddress] = useState('');

  // Section 4: Payment
  const [paymentMethod, setPaymentMethod] = useState<'liqpay' | 'stripe' | 'bank' | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const t = translations[language];

  // Determine country type
  const isUkraine = country === 'Україна' || country === 'Ukraine' || country === 'Ukraina';
  const isPoland = country === 'Польща' || country === 'Poland' || country === 'Polska';
  const isLviv = city === 'Львів' || city === 'Lviv';
  const isWarsaw = city === 'Варшава' || city === 'Warsaw' || city === 'Warszawa';

  // Get city options based on country
  const cityOptions = isUkraine ? ukrainianCities : isPoland ? polishCities : [];

  // Get delivery location options
  const novaBranches = city && novaPoshtaBranches[city] ? novaPoshtaBranches[city] : [];
  const novaPostamats = city && novaPoshtaPostamats[city] ? novaPoshtaPostamats[city] : [];
  const dpdBranchOptions = city && dpdBranches[city] ? dpdBranches[city] : [];

  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
    // Clear previous selections
    setSelectedBranch('');
    setSelectedPostamat('');
    setSimpleAddress('');
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

          {/* Right: Language */}
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
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl mb-12 tracking-wide text-center" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
            {t.pageTitle}
          </h1>

          {/* SECTION 1: ДАНІ ОТРИМУВАЧА */}
          <div className="mb-12">
            <h2 className="text-xl mb-6 tracking-wide" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
              {t.recipientData}
            </h2>

            <div className="space-y-6">
              {/* First Name */}
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t.firstName}
                className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                style={{ color: '#0A1F44' }}
              />

              {/* Last Name */}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t.lastName}
                className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                style={{ color: '#0A1F44' }}
              />

              {/* Phone */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phone}
                className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                style={{ color: '#0A1F44' }}
              />

              {/* Email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.email}
                className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                style={{ color: '#0A1F44' }}
              />

              {/* Country */}
              <SearchableDropdown
                value={country}
                onChange={setCountry}
                options={countries[language]}
                label={t.country}
                placeholder={t.country}
              />

              {/* IF Ukraine → show city dropdown */}
              {isUkraine && (
                <SearchableDropdown
                  value={city}
                  onChange={setCity}
                  options={cityOptions}
                  label={t.city}
                  placeholder={t.city}
                />
              )}

              {/* IF Poland → show city dropdown */}
              {isPoland && (
                <SearchableDropdown
                  value={city}
                  onChange={setCity}
                  options={cityOptions}
                  label={t.city}
                  placeholder={t.city}
                />
              )}

              {/* IF other country → show international address fields */}
              {!isUkraine && !isPoland && (
                <>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder={t.postalCode}
                    className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                    style={{ color: '#0A1F44' }}
                  />

                  <input
                    type="text"
                    value={intlCity}
                    onChange={(e) => setIntlCity(e.target.value)}
                    placeholder={t.cityField}
                    className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                    style={{ color: '#0A1F44' }}
                  />

                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder={t.street}
                    className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                    style={{ color: '#0A1F44' }}
                  />

                  <input
                    type="text"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder={t.building}
                    className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                    style={{ color: '#0A1F44' }}
                  />

                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder={t.apartment}
                    className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                    style={{ color: '#0A1F44' }}
                  />
                </>
              )}
            </div>
          </div>

          {/* SECTION 2: ДОСТАВКА */}
          <div className="mb-12">
            <h2 className="text-xl mb-6 tracking-wide" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
              {t.deliverySection}
            </h2>

            <div className="space-y-4">
              {/* CASE 1: Ukraine + Lviv (Taxi + 3 Nova Poshta options) */}
              {isUkraine && isLviv && (
                <>
                  <DeliveryOption
                    isSelected={deliveryMethod === 'taxi'}
                    onClick={() => handleDeliveryMethodChange('taxi')}
                    title={t.taxi}
                    subtitle={t.taxiSubtitle}
                  >
                    {deliveryMethod === 'taxi' && (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={simpleAddress}
                          onChange={(e) => setSimpleAddress(e.target.value)}
                          placeholder={t.addressPlaceholder}
                          className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                          style={{ color: '#0A1F44' }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </DeliveryOption>
                </>
              )}

              {/* CASE 1 & 2: Ukraine (Nova Poshta options) */}
              {isUkraine && city && (
                <>
                  <DeliveryOption
                    isSelected={deliveryMethod === 'nova-branch'}
                    onClick={() => handleDeliveryMethodChange('nova-branch')}
                    title={t.novaBranch}
                    subtitle={t.novaWorkingDays}
                  >
                    {deliveryMethod === 'nova-branch' && (
                      <div className="mt-4">
                        <SearchableDropdown
                          value={selectedBranch}
                          onChange={setSelectedBranch}
                          options={novaBranches}
                          label=""
                          placeholder={t.branch}
                        />
                      </div>
                    )}
                  </DeliveryOption>

                  <DeliveryOption
                    isSelected={deliveryMethod === 'nova-postamat'}
                    onClick={() => handleDeliveryMethodChange('nova-postamat')}
                    title={t.novaPostamat}
                    subtitle={t.novaWorkingDays}
                  >
                    {deliveryMethod === 'nova-postamat' && (
                      <div className="mt-4">
                        <SearchableDropdown
                          value={selectedPostamat}
                          onChange={setSelectedPostamat}
                          options={novaPostamats}
                          label=""
                          placeholder="Оберіть поштомат"
                        />
                      </div>
                    )}
                  </DeliveryOption>

                  <DeliveryOption
                    isSelected={deliveryMethod === 'nova-courier'}
                    onClick={() => handleDeliveryMethodChange('nova-courier')}
                    title={t.novaCourier}
                    subtitle={t.novaWorkingDays}
                  >
                    {deliveryMethod === 'nova-courier' && (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={simpleAddress}
                          onChange={(e) => setSimpleAddress(e.target.value)}
                          placeholder={t.addressPlaceholder}
                          className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                          style={{ color: '#0A1F44' }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </DeliveryOption>
                </>
              )}

              {/* CASE 3: Poland + Warsaw (Same-day courier + 2 DPD options) */}
              {isPoland && isWarsaw && (
                <>
                  <DeliveryOption
                    isSelected={deliveryMethod === 'same-day-courier'}
                    onClick={() => handleDeliveryMethodChange('same-day-courier')}
                    title={t.sameDayCourier}
                    subtitle={t.sameDaySubtitle}
                  >
                    {deliveryMethod === 'same-day-courier' && (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={simpleAddress}
                          onChange={(e) => setSimpleAddress(e.target.value)}
                          placeholder={t.addressPlaceholder}
                          className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                          style={{ color: '#0A1F44' }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </DeliveryOption>
                </>
              )}

              {/* CASE 3 & 4: Poland (DPD options) */}
              {isPoland && city && (
                <>
                  <DeliveryOption
                    isSelected={deliveryMethod === 'dpd-branch'}
                    onClick={() => handleDeliveryMethodChange('dpd-branch')}
                    title={t.dpdBranch}
                    subtitle={t.dpdWorkingDays}
                  >
                    {deliveryMethod === 'dpd-branch' && (
                      <div className="mt-4">
                        <SearchableDropdown
                          value={selectedBranch}
                          onChange={setSelectedBranch}
                          options={dpdBranchOptions}
                          label=""
                          placeholder={t.branch}
                        />
                      </div>
                    )}
                  </DeliveryOption>

                  <DeliveryOption
                    isSelected={deliveryMethod === 'dpd-courier'}
                    onClick={() => handleDeliveryMethodChange('dpd-courier')}
                    title={t.dpdCourier}
                    subtitle={t.dpdWorkingDays}
                  >
                    {deliveryMethod === 'dpd-courier' && (
                      <div className="mt-4">
                        <input
                          type="text"
                          value={simpleAddress}
                          onChange={(e) => setSimpleAddress(e.target.value)}
                          placeholder={t.addressPlaceholder}
                          className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                          style={{ color: '#0A1F44' }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </DeliveryOption>
                </>
              )}

              {/* CASE 5: International (Standard delivery) */}
              {!isUkraine && !isPoland && (
                <DeliveryOption
                  isSelected={deliveryMethod === 'standard'}
                  onClick={() => handleDeliveryMethodChange('standard')}
                  title={t.standardDelivery}
                  subtitle={t.standardSubtitle}
                />
              )}
            </div>
          </div>

          {/* Thin divider */}
          <div className="w-full h-px bg-gray-300 mb-12" />

          {/* SECTION 3: ВАШЕ ЗАМОВЛЕННЯ */}
          <div className="mb-12">
            <h2 className="text-xl mb-6 tracking-wide" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
              {t.yourOrder}
            </h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-sm">Ваш кошик порожній</p>
            ) : (
              <div className="space-y-4">
                {/* Cart Items */}
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.size}-${index}`} className="flex items-center gap-4 pb-4 border-b border-gray-200">
                    {/* Product Image */}
                    <img 
                      src={item.image} 
                      alt={item.name[language]} 
                      className="w-[60px] h-[60px] object-cover"
                    />
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-sm mb-1" style={{ color: '#0A1F44' }}>{item.name[language]}</h3>
                      <p className="text-xs text-gray-500">
                        {item.selectedColor && `${item.selectedColor}`}
                        {item.selectedColor && item.size && ', '}
                        {item.size}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-sm" style={{ color: '#0A1F44' }}>
                      {language === 'pl' ? `${item.price.pln} zł` : `${item.price.uah} грн`}
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#0A1F44' }}>{t.subtotal}:</span>
                    <span style={{ color: '#0A1F44' }}>
                      {language === 'pl' 
                        ? `${cartItems.reduce((sum, item) => sum + item.price.pln, 0)} zł`
                        : `${cartItems.reduce((sum, item) => sum + item.price.uah, 0)} грн`
                      }
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#0A1F44' }}>{t.deliveryFee}:</span>
                    <span className="text-gray-500 text-xs">{t.deliveryByCarrier}</span>
                  </div>

                  <div className="w-full h-px bg-gray-300" />

                  <div className="flex justify-between text-base font-semibold">
                    <span style={{ color: '#0A1F44' }}>{t.total}:</span>
                    <span style={{ color: '#0A1F44' }}>
                      {language === 'pl' 
                        ? `${cartItems.reduce((sum, item) => sum + item.price.pln, 0)} zł`
                        : `${cartItems.reduce((sum, item) => sum + item.price.uah, 0)} грн`
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Thin divider */}
          <div className="w-full h-px bg-gray-300 mb-12" />

          {/* SECTION 4: ОПЛАТА */}
          <div className="mb-12">
            <h2 className="text-xl mb-6 tracking-wide" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
              {t.paymentSection}
            </h2>

            <div className="space-y-4">
              {/* LiqPay Card Payment */}
              <PaymentOption
                isSelected={paymentMethod === 'liqpay'}
                onClick={() => setPaymentMethod('liqpay')}
                title={t.cardPayment}
              >
                {paymentMethod === 'liqpay' && (
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-600">
                    {t.liqpayMessage}
                  </div>
                )}
              </PaymentOption>

              {/* Stripe Card Payment */}
              <PaymentOption
                isSelected={paymentMethod === 'stripe'}
                onClick={() => setPaymentMethod('stripe')}
                title={t.stripePayment}
              >
                {paymentMethod === 'stripe' && (
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-600">
                    {t.stripeMessage}
                  </div>
                )}
              </PaymentOption>

              {/* Bank Transfer - Only for UA and EN */}
              {language !== 'pl' && (
                <PaymentOption
                  isSelected={paymentMethod === 'bank'}
                  onClick={() => setPaymentMethod('bank')}
                  title={t.bankTransfer}
                >
                  {paymentMethod === 'bank' && (
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-600">
                      {t.bankTransferMessage}
                    </div>
                  )}
                </PaymentOption>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mt-6">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-[#0A1F44] bg-gray-100 border-gray-300 rounded focus:ring-[#0A1F44] focus:ring-2"
                />
                <span className="text-sm text-gray-500">
                  Я прочитав та згоден з{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTermsModal(true);
                    }}
                    className="text-[#0A1F44] underline hover:opacity-70 transition"
                  >
                    Правилами та умовами
                  </button>
                </span>
              </label>
            </div>

            {/* Thin divider */}
            <div className="w-full h-px bg-[#0A1F44] my-6" />

            {/* Confirm Order Button */}
            <button
              onClick={() => {
                if (termsAccepted && cartItems.length > 0) {
                  // Check if Stripe is selected - show placeholder message
                  if (paymentMethod === 'stripe') {
                    alert(t.stripePlaceholder);
                    return;
                  }
                  
                  // Generate order number and date
                  const genOrderNumber = Math.floor(10000 + Math.random() * 90000).toString();
                  const today = new Date();
                  const genOrderDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
                  
                  setOrderNumber(genOrderNumber);
                  setOrderDate(genOrderDate);
                  setOrderTotal(cartItems.reduce((sum, item) => sum + (language === 'pl' ? item.price.pln : item.price.uah), 0));
                  setShowConfirmation(true);
                  
                  // Clear cart immediately
                  clearCart();
                }
              }}
              disabled={!termsAccepted || cartItems.length === 0}
              className="w-full py-4 bg-[#0A1F44] text-white text-base tracking-widest hover:opacity-70 transition disabled:opacity-40 disabled:cursor-not-allowed uppercase"
            >
              {t.confirmOrder}
            </button>
          </div>
        </div>
      </div>

      {/* Bank Transfer Confirmation Page */}
      {showConfirmation && paymentMethod === 'bank' && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
          {/* Same header as main page */}
          <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4" style={{ backgroundColor: '#AEE2FC' }}>
            <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
              <button onClick={() => navigate('/')} className="flex items-center gap-3 -ml-8">
                <img src={logoImage} alt="SOLVIE" className="h-10 w-10 object-contain" />
                <span className="text-xl tracking-wider text-white" style={{ fontFamily: 'Forum, serif' }}>SOLVIE</span>
              </button>
              <div className="hidden md:flex items-center gap-8">
                <button onClick={() => navigate('/collection')} className="text-lg tracking-widest hover:opacity-70 transition text-white">{t.collection}</button>
                <button onClick={() => navigate('/shop')} className="text-lg tracking-widest hover:opacity-70 transition text-white">{t.shop}</button>
                <div className="relative">
                  <button onClick={() => setIsInfoDropdownOpen(!isInfoDropdownOpen)} className="text-lg tracking-widest hover:opacity-70 transition flex items-center gap-1 text-white">
                    {t.info}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {isInfoDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px]">
                      <button onClick={() => navigate('/about')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>{t.aboutUs}</button>
                      <button onClick={() => navigate('/support')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>{t.delivery}</button>
                      <button onClick={() => navigate('/support')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>{t.contacts}</button>
                      <button onClick={() => navigate('/support')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>{t.returns}</button>
                      <button onClick={() => navigate('/support')} className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100" style={{ color: '#1A2744' }}>{t.social}</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-xs text-white">
                  <button onClick={() => setLanguage('ua')} className={`tracking-wider ${language === 'ua' ? 'font-semibold underline' : 'opacity-60'}`}>UA</button>
                  <span className="opacity-40">|</span>
                  <button onClick={() => setLanguage('en')} className={`tracking-wider ${language === 'en' ? 'font-semibold underline' : 'opacity-60'}`}>EN</button>
                  <span className="opacity-40">|</span>
                  <button onClick={() => setLanguage('pl')} className={`tracking-wider ${language === 'pl' ? 'font-semibold underline' : 'opacity-60'}`}>PL</button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="pt-24 pb-16 px-8">
            <div className="max-w-2xl mx-auto">
              {/* Thank You Message */}
              <h1 className="text-3xl mb-8 tracking-wide text-center" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
                Дякуємо! Ваше замовлення було отримано.
              </h1>

              {/* Order Info Block */}
              <div className="bg-gray-100 rounded-lg p-6 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#0A1F44' }}>Номер замовлення:</span>
                  <span style={{ color: '#0A1F44', fontWeight: 600 }}>{orderNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#0A1F44' }}>Дата:</span>
                  <span style={{ color: '#0A1F44', fontWeight: 600 }}>{orderDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#0A1F44' }}>Всього:</span>
                  <span style={{ color: '#0A1F44', fontWeight: 600 }}>{orderTotal} грн</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#0A1F44' }}>Спосіб оплати:</span>
                  <span style={{ color: '#0A1F44', fontWeight: 600 }}>Повна оплата / банківський переказ на реквізити</span>
                </div>
              </div>

              {/* Instructions Text */}
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Проведіть платіж безпосередньо на наш банківський рахунок. Будь ласка, вкажіть номер Вашого замовлення в описі переказу. Після оплати надішліть квитанцію нам у Telegram @solviebrand або на мейл hello@solviebrand.com
              </p>

              {/* Bank Details Section */}
              <h2 className="text-xl mb-2 tracking-wide" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
                Деталі нашого банку
              </h2>
              <h3 className="text-base mb-4" style={{ color: '#0A1F44', fontWeight: 500 }}>
                ФОП ФЕДИНЯК ОЛЬГА МИХАЙЛІВНА:
              </h3>

              {/* Bank Info Block */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8 space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#0A1F44' }}>Банк:</span>
                  <span style={{ color: '#0A1F44', fontWeight: 600 }}>МОНОБАНК</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#0A1F44' }}>IBAN:</span>
                  <span style={{ color: '#0A1F44', fontWeight: 600 }}>UA00 0000 0000 0000 0000 0000 0000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Same footer as main page */}
          <footer className="py-16 px-8" style={{ backgroundColor: '#A8D8EA' }}>
            <div className="max-w-screen-2xl mx-auto">
              <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div>
                  <ImageWithFallback src={logoImage} alt="SOLVIE" className="h-8 w-8 object-contain mb-4" />
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>
                    SOLVIE — це український бренд жіночого одягу, що поєднує елегантність.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest mb-4 uppercase" style={{ color: '#FFFFFF' }}>НАВІГАЦІЯ</h4>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate('/')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>PREMIÈRE</button>
                    <button onClick={() => navigate('/shop')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>МАГАЗИН</button>
                    <button onClick={() => navigate('/about')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>Про нас</button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest mb-4 uppercase" style={{ color: '#FFFFFF' }}>ІНФО</h4>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => navigate('/support')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>Доставка</button>
                    <button onClick={() => navigate('/support')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>Повернення та обмін</button>
                    <button onClick={() => navigate('/support')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>Контакти</button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest mb-4" style={{ color: '#FFFFFF' }}>Стань частиною Solvie</h4>
                  <div className="flex flex-col gap-2 text-sm" style={{ color: '#FFFFFF' }}>
                    <a href="mailto:hello@solviebrand.com" className="hover:opacity-70 transition">hello@solviebrand.com</a>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-white/20 flex justify-between items-center">
                <p className="text-xs" style={{ color: '#FFFFFF', opacity: 0.7 }}>{t.copyright}</p>
                <div className="flex gap-4 items-center">
                  <a href="https://www.instagram.com/solvie.brand?igsh=MWw2cGVkZTFlOWYzOA==" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition" style={{ color: '#FFFFFF' }}>
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.tiktok.com/@solvie.brand?_r=1&_t=ZN-94sq8wiaXXq" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition" style={{ color: '#FFFFFF' }}>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                  <a href="https://t.me/solviebrandtg" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition" style={{ color: '#FFFFFF' }}>
                    <Send className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Regular Order Confirmation Modal (for LiqPay) */}
      {showConfirmation && paymentMethod !== 'bank' && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-2xl mb-4 tracking-wide text-center" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
              {t.thankYou}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              {t.orderConfirmation}
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 bg-[#0A1F44] text-white text-lg tracking-widest hover:opacity-70 transition"
            >
              {t.confirmOrder}
            </button>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowTermsModal(false)}>
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close"
            >
              <X className="w-6 h-6" style={{ color: '#0A1F44' }} />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-2xl mb-6 tracking-wide" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
                Правила та умови
              </h2>

              <div className="space-y-6 text-sm leading-relaxed" style={{ color: '#0A1F44' }}>
                <div>
                  <h3 className="font-semibold mb-2 text-base">УМОВИ ВИКОРИСТАННЯ</h3>
                  <p className="text-gray-700">
                    Використовуючи цей сайт, ви погоджуєтесь з такими умовами:
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">1. ЗАГАЛЬНІ ПОЛОЖЕННЯ</h3>
                  <p className="text-gray-700">
                    Цей сайт належить бренду SOLVIE. Використовуючи сайт, ви підтверджуєте, що ознайомились з цими умовами та погоджуєтесь їх дотримуватись.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. ЗАМОВЛЕННЯ ТА ОПЛАТА</h3>
                  <p className="text-gray-700">
                    Усі замовлення обробляються після підтвердження оплати. Ціни вказані в гривнях. Для міжнародних замовлень ціна конвертується за поточним курсом.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. ДОСТАВКА</h3>
                  <p className="text-gray-700">
                    Терміни доставки залежать від обраного способу та країни. SOLVIE не несе відповідальності за затримки з боку служб доставки.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">4. ПОВЕРНЕННЯ ТА ОБМІН</h3>
                  <p className="text-gray-700">
                    Повернення та обмін можливі протягом 14 днів з моменту отримання замовлення за умови збереження товарного вигляду.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">5. КОНФІДЕНЦІЙНІСТЬ</h3>
                  <p className="text-gray-700">
                    Ваші особисті дані використовуються виключно для обробки замовлень та не передаються третім особам.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">6. КОНТАКТИ</h3>
                  <p className="text-gray-700">
                    З усіх питань звертайтесь:<br />
                    hello@solviebrand.com<br />
                    Telegram: @solviebrand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 px-8" style={{ backgroundColor: '#A8D8EA' }}>
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <ImageWithFallback src={logoImage} alt="SOLVIE" className="h-8 w-8 object-contain mb-4" />
              <p className="text-sm" style={{ color: '#FFFFFF' }}>
                SOLVIE — це український бренд жіночого одягу, що поєднує елегантність.
              </p>
            </div>
            <div>
              <h4 className="text-sm tracking-widest mb-4 uppercase" style={{ color: '#FFFFFF' }}>
                НАВІГАЦІЯ
              </h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate('/')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>
                  PREMIÈRE
                </button>
                <button onClick={() => navigate('/shop')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>
                  МАГАЗИН
                </button>
                <button onClick={() => navigate('/about')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>
                  Про нас
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-sm tracking-widest mb-4 uppercase" style={{ color: '#FFFFFF' }}>
                ІНФО
              </h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate('/support')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>
                  Доставка
                </button>
                <button onClick={() => navigate('/support')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>
                  Повернення та обмін
                </button>
                <button onClick={() => navigate('/support')} className="text-sm hover:opacity-70 transition text-left" style={{ color: '#FFFFFF' }}>
                  Контакти
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-sm tracking-widest mb-4" style={{ color: '#FFFFFF' }}>
                Стань частиною Solvie
              </h4>
              <div className="flex flex-col gap-2 text-sm" style={{ color: '#FFFFFF' }}>
                <a href="mailto:hello@solviebrand.com" className="hover:opacity-70 transition">
                  hello@solviebrand.com
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 flex justify-between items-center">
            <p className="text-xs" style={{ color: '#FFFFFF', opacity: 0.7 }}>
              {t.copyright}
            </p>
            <div className="flex gap-4 items-center">
              <a 
                href="https://www.instagram.com/solvie.brand?igsh=MWw2cGVkZTFlOWYzOA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition" 
                style={{ color: '#FFFFFF' }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@solvie.brand?_r=1&_t=ZN-94sq8wiaXXq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition" 
                style={{ color: '#FFFFFF' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/solviebrandtg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-70 transition" 
                style={{ color: '#FFFFFF' }}
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Delivery Option Component
interface DeliveryOptionProps {
  isSelected: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

function DeliveryOption({ isSelected, onClick, title, subtitle, children }: DeliveryOptionProps) {
  return (
    <div
      className="p-6 rounded-lg cursor-pointer transition border"
      style={{
        borderColor: isSelected ? '#0A1F44' : '#D1D5DB',
        borderWidth: isSelected ? '2px' : '1px',
      }}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isSelected ? 'border-[#0A1F44]' : 'border-gray-300'
            }`}
          >
            {isSelected && (
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0A1F44' }} />
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base mb-1 tracking-wide" style={{ color: '#0A1F44', fontWeight: 500 }}>
            {title}
          </h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

// Payment Option Component
interface PaymentOptionProps {
  isSelected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

function PaymentOption({ isSelected, onClick, title, subtitle, children }: PaymentOptionProps) {
  return (
    <div
      className="p-6 rounded-lg cursor-pointer transition border"
      style={{
        borderColor: isSelected ? '#0A1F44' : '#D1D5DB',
        borderWidth: isSelected ? '2px' : '1px',
      }}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isSelected ? 'border-[#0A1F44]' : 'border-gray-300'
            }`}
          >
            {isSelected && (
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0A1F44' }} />
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base mb-1 tracking-wide" style={{ color: '#0A1F44', fontWeight: 500 }}>
            {title}
          </h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}