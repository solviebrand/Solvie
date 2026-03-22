import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ChevronDown, Instagram, Send } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SearchableDropdown } from '../components/SearchableDropdown';
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
    step1: 'Дані',
    step2: 'Доставка',
    step3: 'Оплата',
    deliveryMethod: 'СПОСІБ ДОСТАВКИ',
    // Ukraine delivery options
    taxi: 'ВІДПРАВКА ТАКСІ',
    taxiSubtitle: 'В день оформлення замовлення',
    novaBranch: 'НОВА ПОШТА - ВІДДІЛЕННЯ',
    novaPostamat: 'НОВА ПОШТА - ПОШТОМАТ',
    novaCourier: 'НОВА ПОШТА - КУР\'ЄР',
    novaWorkingDays: '2-4 робочих дні',
    // Poland delivery options
    sameDayCourier: 'ДОСТАВКА КУР\'ЄРОМ',
    sameDaySubtitle: 'В день оформлення замовлення',
    dpdBranch: 'DPD - ВІДДІЛЕННЯ',
    dpdCourier: 'DPD - КУР\'ЄР',
    dpdWorkingDays: '2-4 робочих дні',
    // International delivery
    standardDelivery: 'СТАНДАРТНА ДОСТАВКА',
    standardSubtitle: '12-14 робочих днів',
    // Form labels
    branchLabel: 'Відділення',
    branchPlaceholder: 'Вкажіть відділення',
    dpdBranchPlaceholder: 'Вкажіть відділення DPD',
    postamatLabel: 'Поштомат',
    postamatPlaceholder: 'Вкажіть поштомат',
    addressPlaceholder: 'Вулиця, будинок, квартира',
    postalCodeLabel: 'Індекс',
    postalCodePlaceholder: 'Індекс',
    cityLabel: 'Місто',
    cityPlaceholder: 'Місто',
    streetLabel: 'Вулиця',
    streetPlaceholder: 'Вулиця',
    buildingLabel: 'Будинок',
    buildingPlaceholder: 'Будинок',
    apartmentLabel: 'Квартира',
    apartmentPlaceholder: 'Квартира',
    next: 'ДАЛІ',
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
    step1: 'Data',
    step2: 'Delivery',
    step3: 'Payment',
    deliveryMethod: 'DELIVERY METHOD',
    taxi: 'TAXI DELIVERY',
    taxiSubtitle: 'Same day delivery',
    novaBranch: 'NOVA POSHTA - BRANCH',
    novaPostamat: 'NOVA POSHTA - PARCEL LOCKER',
    novaCourier: 'NOVA POSHTA - COURIER',
    novaWorkingDays: '2-4 working days',
    sameDayCourier: 'COURIER DELIVERY',
    sameDaySubtitle: 'Same day delivery',
    dpdBranch: 'DPD - PICKUP POINT',
    dpdCourier: 'DPD - COURIER',
    dpdWorkingDays: '2-4 working days',
    standardDelivery: 'STANDARD DELIVERY',
    standardSubtitle: '12-14 working days',
    branchLabel: 'Branch',
    branchPlaceholder: 'Select branch',
    dpdBranchPlaceholder: 'Select DPD pickup point',
    postamatLabel: 'Parcel Locker',
    postamatPlaceholder: 'Select parcel locker',
    addressPlaceholder: 'Street, building, apartment',
    postalCodeLabel: 'Postal Code',
    postalCodePlaceholder: 'Postal Code',
    cityLabel: 'City',
    cityPlaceholder: 'City',
    streetLabel: 'Street',
    streetPlaceholder: 'Street',
    buildingLabel: 'Building',
    buildingPlaceholder: 'Building',
    apartmentLabel: 'Apartment',
    apartmentPlaceholder: 'Apartment',
    next: 'NEXT',
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
    step1: 'Dane',
    step2: 'Dostawa',
    step3: 'Płatność',
    deliveryMethod: 'SPOSÓB DOSTAWY',
    taxi: 'DOSTAWA TAXI',
    taxiSubtitle: 'W dniu zamówienia',
    novaBranch: 'NOVA POSHTA - ODDZIAŁ',
    novaPostamat: 'NOVA POSHTA - PACZKOMAT',
    novaCourier: 'NOVA POSHTA - KURIER',
    novaWorkingDays: '2-4 dni robocze',
    sameDayCourier: 'DOSTAWA KURIEREM',
    sameDaySubtitle: 'W dniu zamówienia',
    dpdBranch: 'DPD - PUNKT ODBIORU',
    dpdCourier: 'DPD - KURIER',
    dpdWorkingDays: '2-4 dni robocze',
    standardDelivery: 'DOSTAWA STANDARDOWA',
    standardSubtitle: '12-14 dni roboczych',
    branchLabel: 'Oddział',
    branchPlaceholder: 'Wybierz oddział',
    dpdBranchPlaceholder: 'Wybierz punkt odbioru DPD',
    postamatLabel: 'Paczkomat',
    postamatPlaceholder: 'Wybierz paczkomat',
    addressPlaceholder: 'Ulica, budynek, mieszkanie',
    postalCodeLabel: 'Kod pocztowy',
    postalCodePlaceholder: 'Kod pocztowy',
    cityLabel: 'Miasto',
    cityPlaceholder: 'Miasto',
    streetLabel: 'Ulica',
    streetPlaceholder: 'Ulica',
    buildingLabel: 'Budynek',
    buildingPlaceholder: 'Budynek',
    apartmentLabel: 'Mieszkanie',
    apartmentPlaceholder: 'Mieszkanie',
    next: 'DALEJ',
    copyright: '© 2026 SOLVIE. Wszelkie prawa zastrzeżone.',
  },
};

export default function DeliveryPage() {
  const [language, setLanguage] = useState<Language>('ua');
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from Step 1
  const { country, city } = location.state || {};

  // Redirect to checkout if no data from Step 1
  useEffect(() => {
    if (!country) {
      navigate('/checkout');
    }
  }, [country, navigate]);

  // Delivery method state
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedPostamat, setSelectedPostamat] = useState('');
  const [simpleAddress, setSimpleAddress] = useState('');
  
  // International delivery fields
  const [postalCode, setPostalCode] = useState('');
  const [intlCity, setIntlCity] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');

  const t = translations[language];

  // Determine country and city
  const isUkraine = country === 'Україна' || country === 'Ukraine' || country === 'Ukraina';
  const isPoland = country === 'Польща' || country === 'Poland' || country === 'Polska';
  const isLviv = city === 'Львів' || city === 'Lviv';
  const isWarsaw = city === 'Варшава' || city === 'Warsaw' || city === 'Warszawa';

  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
    // Clear previous selections
    setSelectedBranch('');
    setSelectedPostamat('');
    setSimpleAddress('');
    setPostalCode('');
    setIntlCity('');
    setStreet('');
    setBuilding('');
    setApartment('');
  };

  // Get delivery location options
  const novaBranches = city && novaPoshtaBranches[city] ? novaPoshtaBranches[city] : [];
  const novaPostamats = city && novaPoshtaPostamats[city] ? novaPoshtaPostamats[city] : [];
  const dpdBranchOptions = city && dpdBranches[city] ? dpdBranches[city] : [];

  // Validation: delivery method must be selected, and required fields for that method
  const isFormValid = deliveryMethod && (
    (deliveryMethod === 'taxi' && simpleAddress) ||
    (deliveryMethod === 'nova-branch' && selectedBranch) ||
    (deliveryMethod === 'nova-postamat' && selectedPostamat) ||
    (deliveryMethod === 'nova-courier' && simpleAddress) ||
    (deliveryMethod === 'same-day-courier' && simpleAddress) ||
    (deliveryMethod === 'dpd-branch' && selectedBranch) ||
    (deliveryMethod === 'dpd-courier' && simpleAddress) ||
    (deliveryMethod === 'standard' && postalCode && intlCity && street && building && apartment)
  );

  const handleNext = () => {
    if (!isFormValid) return;
    
    // Navigate to Step 3 (Payment page) with all data
    navigate('/payment', {
      state: {
        // Pass through Step 1 data
        ...location.state,
        // Add Step 2 delivery data
        deliveryMethod,
        selectedBranch: (deliveryMethod === 'nova-branch' || deliveryMethod === 'dpd-branch') ? selectedBranch : null,
        selectedPostamat: deliveryMethod === 'nova-postamat' ? selectedPostamat : null,
        simpleAddress: ['taxi', 'nova-courier', 'same-day-courier', 'dpd-courier'].includes(deliveryMethod!) ? simpleAddress : null,
        internationalAddress: deliveryMethod === 'standard' ? { postalCode, intlCity, street, building, apartment } : null,
      },
    });
  };

  if (!country) {
    return null;
  }

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
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                1. {t.step1}
              </span>
              <span className="text-gray-300">———</span>
              <span className="text-sm" style={{ color: '#0A1F44', fontWeight: 600 }}>
                2. {t.step2}
              </span>
              <span className="text-gray-300">———</span>
              <span className="text-sm text-gray-400">
                3. {t.step3}
              </span>
            </div>
          </div>

          {/* Delivery Method Selection */}
          <div>
            <h2 className="text-2xl mb-8 tracking-wide" style={{ fontFamily: 'Forum, serif', color: '#0A1F44' }}>
              {t.deliveryMethod}
            </h2>

            {/* CASE 1: Ukraine + Lviv (Taxi + 3 Nova Poshta options) */}
            {isUkraine && isLviv && (
              <>
                {/* Taxi Delivery */}
                <DeliveryCard
                  isSelected={deliveryMethod === 'taxi'}
                  onClick={() => handleDeliveryMethodChange('taxi')}
                  title={t.taxi}
                  subtitle={t.taxiSubtitle}
                  isLast={false}
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
                </DeliveryCard>
              </>
            )}

            {/* CASE 1 & 2: Ukraine (Nova Poshta options) */}
            {isUkraine && (
              <>
                {/* Nova Poshta - Branch */}
                <DeliveryCard
                  isSelected={deliveryMethod === 'nova-branch'}
                  onClick={() => handleDeliveryMethodChange('nova-branch')}
                  title={t.novaBranch}
                  subtitle={t.novaWorkingDays}
                  isLast={false}
                >
                  {deliveryMethod === 'nova-branch' && (
                    <div className="mt-4">
                      <SearchableDropdown
                        value={selectedBranch}
                        onChange={setSelectedBranch}
                        options={novaBranches}
                        label={t.branchLabel}
                        placeholder={t.branchPlaceholder}
                      />
                    </div>
                  )}
                </DeliveryCard>

                {/* Nova Poshta - Postamat */}
                <DeliveryCard
                  isSelected={deliveryMethod === 'nova-postamat'}
                  onClick={() => handleDeliveryMethodChange('nova-postamat')}
                  title={t.novaPostamat}
                  subtitle={t.novaWorkingDays}
                  isLast={false}
                >
                  {deliveryMethod === 'nova-postamat' && (
                    <div className="mt-4">
                      <SearchableDropdown
                        value={selectedPostamat}
                        onChange={setSelectedPostamat}
                        options={novaPostamats}
                        label={t.postamatLabel}
                        placeholder={t.postamatPlaceholder}
                      />
                    </div>
                  )}
                </DeliveryCard>

                {/* Nova Poshta - Courier */}
                <DeliveryCard
                  isSelected={deliveryMethod === 'nova-courier'}
                  onClick={() => handleDeliveryMethodChange('nova-courier')}
                  title={t.novaCourier}
                  subtitle={t.novaWorkingDays}
                  isLast={true}
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
                </DeliveryCard>
              </>
            )}

            {/* CASE 3: Poland + Warsaw (Same-day courier + 2 DPD options) */}
            {isPoland && isWarsaw && (
              <>
                {/* Same-day Courier */}
                <DeliveryCard
                  isSelected={deliveryMethod === 'same-day-courier'}
                  onClick={() => handleDeliveryMethodChange('same-day-courier')}
                  title={t.sameDayCourier}
                  subtitle={t.sameDaySubtitle}
                  isLast={false}
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
                </DeliveryCard>
              </>
            )}

            {/* CASE 3 & 4: Poland (DPD options) */}
            {isPoland && (
              <>
                {/* DPD - Branch */}
                <DeliveryCard
                  isSelected={deliveryMethod === 'dpd-branch'}
                  onClick={() => handleDeliveryMethodChange('dpd-branch')}
                  title={t.dpdBranch}
                  subtitle={t.dpdWorkingDays}
                  isLast={false}
                >
                  {deliveryMethod === 'dpd-branch' && (
                    <div className="mt-4">
                      <SearchableDropdown
                        value={selectedBranch}
                        onChange={setSelectedBranch}
                        options={dpdBranchOptions}
                        label={t.branchLabel}
                        placeholder={t.dpdBranchPlaceholder}
                      />
                    </div>
                  )}
                </DeliveryCard>

                {/* DPD - Courier */}
                <DeliveryCard
                  isSelected={deliveryMethod === 'dpd-courier'}
                  onClick={() => handleDeliveryMethodChange('dpd-courier')}
                  title={t.dpdCourier}
                  subtitle={t.dpdWorkingDays}
                  isLast={true}
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
                </DeliveryCard>
              </>
            )}

            {/* CASE 5: International (Standard delivery) */}
            {!isUkraine && !isPoland && (
              <DeliveryCard
                isSelected={deliveryMethod === 'standard'}
                onClick={() => handleDeliveryMethodChange('standard')}
                title={t.standardDelivery}
                subtitle={t.standardSubtitle}
                isLast={true}
              >
                {deliveryMethod === 'standard' && (
                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder={t.postalCodePlaceholder}
                      className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                      style={{ color: '#0A1F44' }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <input
                      type="text"
                      value={intlCity}
                      onChange={(e) => setIntlCity(e.target.value)}
                      placeholder={t.cityPlaceholder}
                      className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                      style={{ color: '#0A1F44' }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder={t.streetPlaceholder}
                      className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                      style={{ color: '#0A1F44' }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <input
                      type="text"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      placeholder={t.buildingPlaceholder}
                      className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                      style={{ color: '#0A1F44' }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder={t.apartmentPlaceholder}
                      className="w-full py-3 bg-transparent border-b border-gray-300 focus:border-[#0A1F44] outline-none placeholder-gray-400"
                      style={{ color: '#0A1F44' }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </DeliveryCard>
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!isFormValid}
              className="w-full py-4 text-white text-sm tracking-wider transition uppercase disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              style={{ backgroundColor: '#0A1F44' }}
            >
              {t.next}
            </button>
          </div>
        </div>
      </div>

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
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z\"/>
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

// Delivery Card Component
interface DeliveryCardProps {
  isSelected: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  isLast: boolean;
}

function DeliveryCard({ isSelected, onClick, title, subtitle, children, isLast }: DeliveryCardProps) {
  return (
    <div
      className={`p-6 rounded-lg cursor-pointer transition ${isLast ? 'mb-0' : 'mb-4'} ${
        isSelected ? 'border-2' : 'border'
      }`}
      style={{
        borderColor: isSelected ? '#0A1F44' : '#D1D5DB',
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