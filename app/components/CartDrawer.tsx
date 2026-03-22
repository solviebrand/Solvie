import { X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCart, Language } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  translations: {
    cart: string;
    emptyCart: string;
    total: string;
    checkout: string;
  };
}

export function CartDrawer({ isOpen, onClose, language, translations }: CartDrawerProps) {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const currency = language === 'pl' ? 'zł' : '₴';

  const getPrice = (item: any) => {
    return language === 'pl' ? `${item.price.pln} ${currency}` : `${item.price.uah} ${currency}`;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = language === 'pl' ? item.price.pln : item.price.uah;
      return total + price * item.quantity;
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto">
        <div className="sticky top-0 px-6 py-4 flex items-center justify-between" style={{ backgroundColor: '#AEE2FC' }}>
          <h3 className="text-xl tracking-wider text-white" style={{ fontFamily: 'Forum, serif' }}>
            {translations.cart}
          </h3>
          <button onClick={onClose} className="text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {cartItems.length === 0 ? (
            <p className="text-center py-12 opacity-60" style={{ color: '#1A2744' }}>
              {translations.emptyCart}
            </p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b relative">
                    <ImageWithFallback src={item.image} alt={item.name[language]} className="w-20 h-24 object-cover" />
                    <div className="flex-1">
                      <h4 className="mb-1" style={{ color: '#1A2744' }}>{item.name[language]}</h4>
                      <p className="text-sm opacity-60 mb-1" style={{ color: '#1A2744' }}>
                        {item.size} / {item.selectedColor}
                      </p>
                      <p className="text-sm" style={{ color: '#1A2744' }}>{getPrice(item)}</p>
                      <p className="text-xs opacity-60 mt-1" style={{ color: '#1A2744' }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg mb-4" style={{ color: '#1A2744' }}>
                  <span>{translations.total}:</span>
                  <span style={{ fontFamily: 'Forum, serif' }}>
                    {getTotalPrice()} {currency}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full py-4 text-white text-sm tracking-wider hover:opacity-90 transition"
                  style={{ backgroundColor: '#1A2744' }}
                >
                  {translations.checkout}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}