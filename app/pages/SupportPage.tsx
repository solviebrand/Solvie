import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';

export default function SupportPage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'UA' | 'EN' | 'PL'>('UA');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { items } = useCart();

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Jost, sans-serif' }}>
      {/* Header */}
      <Header language={language} setLanguage={setLanguage} onNavigate={navigate} />
      
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Page Title */}
        <h1 
          className="text-center mb-16" 
          style={{ 
            fontFamily: 'Forum, serif', 
            color: '#0A1F44',
            fontSize: '2.5rem',
            letterSpacing: '0.1em'
          }}
        >
          ІНФО
        </h1>
        
        {/* Accordion Sections */}
        <div className="space-y-0">
          {/* КОНТАКТИ Section */}
          <div style={{ borderBottom: '1px solid #0A1F44' }}>
            <button
              onClick={() => toggleSection('contacts')}
              className="w-full py-6 flex items-center justify-between hover:opacity-70 transition"
            >
              <h2 
                style={{ 
                  fontFamily: 'Jost, sans-serif',
                  color: '#0A1F44',
                  fontSize: '1.125rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: 400
                }}
              >
                КОНТАКТИ
              </h2>
              {openSection === 'contacts' ? (
                <ChevronUp style={{ color: '#0A1F44' }} className="w-5 h-5" />
              ) : (
                <ChevronDown style={{ color: '#0A1F44' }} className="w-5 h-5" />
              )}
            </button>
            {openSection === 'contacts' && (
              <div className="pb-6 px-4" style={{ color: '#0A1F44' }}>
                <p>hello@solviebrand.com</p>
                <p>Telegram: @solviebrand</p>
                <p>Instagram: @solvie.brand</p>
              </div>
            )}
          </div>

          {/* ДОСТАВКА Section */}
          <div style={{ borderBottom: '1px solid #0A1F44' }}>
            <button
              onClick={() => toggleSection('delivery')}
              className="w-full py-6 flex items-center justify-between hover:opacity-70 transition"
            >
              <h2 
                style={{ 
                  fontFamily: 'Jost, sans-serif',
                  color: '#0A1F44',
                  fontSize: '1.125rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: 400
                }}
              >
                ДОСТАВКА
              </h2>
              {openSection === 'delivery' ? (
                <ChevronUp style={{ color: '#0A1F44' }} className="w-5 h-5" />
              ) : (
                <ChevronDown style={{ color: '#0A1F44' }} className="w-5 h-5" />
              )}
            </button>
            {openSection === 'delivery' && (
              <div className="pb-6 px-4 space-y-4" style={{ color: '#0A1F44' }}>
                <div>
                  <p className="font-semibold mb-1">Нова пошта — відділення</p>
                  <p>Доставка до зручного відділення Нової пошти.</p>
                  <p>Вартість: згідно з тарифами Нової пошти</p>
                  <p>Термін: 2–4 робочі дні</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Нова пошта — поштомат</p>
                  <p>Безконтактне отримання у поштоматі.</p>
                  <p>Вартість: згідно з тарифами Нової пошти</p>
                  <p>Термін: 2–4 робочі дні</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Нова пошта — кур'єр</p>
                  <p>Кур'єр доставить за вказаною адресою.</p>
                  <p>Вартість: згідно з тарифами Нової пошти</p>
                  <p>Термін: 2–4 робочі дні</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Доставка у Варшаві та Львові</p>
                  <p>Доставка в день замовлення.</p>
                  <p>Термін: у день замовлення</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Доставка по всій Польщі (DPD)</p>
                  <p>Вартість: згідно з тарифами DPD</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Міжнародна доставка</p>
                  <p>Термін: 12–14 робочих днів</p>
                </div>
              </div>
            )}
          </div>

          {/* ПОВЕРНЕННЯ ТА ОБМІН Section */}
          <div style={{ borderBottom: '1px solid #0A1F44' }}>
            <button
              onClick={() => toggleSection('returns')}
              className="w-full py-6 flex items-center justify-between hover:opacity-70 transition"
            >
              <h2 
                style={{ 
                  fontFamily: 'Jost, sans-serif',
                  color: '#0A1F44',
                  fontSize: '1.125rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: 400
                }}
              >
                ПОВЕРНЕННЯ ТА ОБМІН
              </h2>
              {openSection === 'returns' ? (
                <ChevronUp style={{ color: '#0A1F44' }} className="w-5 h-5" />
              ) : (
                <ChevronDown style={{ color: '#0A1F44' }} className="w-5 h-5" />
              )}
            </button>
            {openSection === 'returns' && (
              <div className="pb-6 px-4" style={{ color: '#0A1F44' }}>
                <p>
                  Повернення та обмін можливі протягом 14 днів з моменту отримання замовлення. Товар має бути у ідеальному стані, з усіма бирками та в оригінальній упаковці.
                </p>
                <p className="mt-4">
                  Для оформлення напишіть: hello@solviebrand.com або Instagram/Telegram @solviebrand
                </p>
              </div>
            )}
          </div>

          {/* СОЦІАЛЬНІ МЕРЕЖІ Section */}
          <div style={{ borderBottom: '1px solid #0A1F44' }}>
            <button
              onClick={() => toggleSection('social')}
              className="w-full py-6 flex items-center justify-between hover:opacity-70 transition"
            >
              <h2 
                style={{ 
                  fontFamily: 'Jost, sans-serif',
                  color: '#0A1F44',
                  fontSize: '1.125rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: 400
                }}
              >
                СОЦІАЛЬНІ МЕРЕЖІ
              </h2>
              {openSection === 'social' ? (
                <ChevronUp style={{ color: '#0A1F44' }} className="w-5 h-5" />
              ) : (
                <ChevronDown style={{ color: '#0A1F44' }} className="w-5 h-5" />
              )}
            </button>
            {openSection === 'social' && (
              <div className="pb-6 px-4 space-y-2" style={{ color: '#0A1F44' }}>
                <p>
                  <a 
                    href="https://www.instagram.com/solvie.brand?igsh=MWw2cGVkZTFlOWYzOA==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition underline"
                  >
                    Instagram @solvie.brand
                  </a>
                </p>
                <p>
                  <a 
                    href="https://www.tiktok.com/@solvie.brand?_r=1&_t=ZN-94sq8wiaXXq" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition underline"
                  >
                    TikTok @solvie.brand
                  </a>
                </p>
                <p>
                  <a 
                    href="https://t.me/solviebrandtg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition underline"
                  >
                    Telegram @solviebrand
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer language={language} />

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}