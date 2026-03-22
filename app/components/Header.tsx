import { useState } from 'react';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router';
import logoImage from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';

type Language = 'UA' | 'EN' | 'PL';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onCartOpen?: () => void;
  cartItemCount?: number;
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
  },
};

export function Header({ language, setLanguage, onCartOpen, cartItemCount = 0 }: HeaderProps) {
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const t = translations[language];

  return (
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
            onClick={onCartOpen}
            className="relative text-white"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#1A2744] text-[10px] rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}