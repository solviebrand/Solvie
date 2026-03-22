import { useNavigate } from 'react-router';
import logoImage from 'figma:asset/9f47ea753513e9aeaf96960b681715cbd4d9f754.png';

type Language = 'UA' | 'EN' | 'PL';

interface FooterProps {
  language: Language;
}

const translations = {
  UA: {
    collection: 'PREMIÈRE',
    shop: 'МАГАЗИН',
    aboutUs: 'Про нас',
    delivery: 'Доставка',
    contacts: 'Контакти',
    returns: 'Повернення та обмін',
    copyright: '© 2026 SOLVIE. Всі права захищено.',
    navigation: 'Навігація',
    information: 'Інформація',
    joinSolvie: 'СТАНЬ ЧАСТИНОЮ SOLVIE',
    brandDescription: 'SOLVIE — бренд жіночого одягу, створений для тих, хто цінує форму, крій і речі з власним характером.',
  },
  EN: {
    collection: 'PREMIÈRE',
    shop: 'SHOP',
    aboutUs: 'About Us',
    delivery: 'Delivery',
    contacts: 'Contacts',
    returns: 'Returns & Exchange',
    copyright: '© 2026 SOLVIE. All rights reserved.',
    navigation: 'Navigation',
    information: 'Information',
    joinSolvie: 'BECOME PART OF SOLVIE',
    brandDescription: 'SOLVIE is a womenswear brand created for those who value form, cut, and pieces with their own character.',
  },
  PL: {
    collection: 'PREMIÈRE',
    shop: 'SKLEP',
    aboutUs: 'O nas',
    delivery: 'Dostawa',
    contacts: 'Kontakty',
    returns: 'Zwroty i wymiana',
    copyright: '© 2026 SOLVIE. Wszelkie prawa zastrzeżone.',
    navigation: 'Nawigacja',
    information: 'Informacja',
    joinSolvie: 'DOŁĄCZ DO SOLVIE',
    brandDescription: 'SOLVIE to marka odzieży damskiej stworzona dla tych, którzy cenią formę, krój i rzeczy z własnym charakterem.',
  },
};

export function Footer({ language }: FooterProps) {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <footer className="py-16 px-8" style={{ backgroundColor: '#AEE2FC' }}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <img src={logoImage} alt="SOLVIE" className="h-8 w-8 object-contain mb-4" />
            <p className="text-sm opacity-70 text-white">
              {t.brandDescription}
            </p>
          </div>
          <div>
            <h4 className="text-sm tracking-widest mb-4 uppercase text-white">
              {t.navigation}
            </h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/collection')} className="text-left text-sm opacity-70 hover:opacity-100 transition text-white">
                {t.collection}
              </button>
              <button onClick={() => navigate('/shop')} className="text-left text-sm opacity-70 hover:opacity-100 transition text-white">
                {t.shop}
              </button>
              <button onClick={() => navigate('/about')} className="text-left text-sm opacity-70 hover:opacity-100 transition text-white">
                {t.aboutUs}
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-sm tracking-widest mb-4 uppercase text-white">
              {t.information}
            </h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate('/support')} className="text-left text-sm opacity-70 hover:opacity-100 transition text-white">
                {t.delivery}
              </button>
              <button onClick={() => navigate('/support')} className="text-left text-sm opacity-70 hover:opacity-100 transition text-white">
                {t.returns}
              </button>
              <button onClick={() => navigate('/support')} className="text-left text-sm opacity-70 hover:opacity-100 transition text-white">
                {t.contacts}
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-sm tracking-widest mb-4 uppercase text-white">
              {t.joinSolvie}
            </h4>
            <div className="flex flex-col gap-2 text-sm opacity-70 text-white">
              <a href="mailto:hello@solviebrand.com" className="hover:opacity-100 transition">
                hello@solviebrand.com
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/20 flex justify-between items-center">
          <p className="text-xs opacity-70 text-white">
            {t.copyright}
          </p>
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/solvie.ua" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs opacity-70 hover:opacity-100 transition text-white"
            >
              Instagram
            </a>
            <a 
              href="https://tiktok.com/@solvie.ua" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs opacity-70 hover:opacity-100 transition text-white"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}