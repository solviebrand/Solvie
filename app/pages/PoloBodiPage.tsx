import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ColorSwitcher } from '../components/ColorSwitcher';
import { useCart, Product, Language } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import { Header } from '../components/Header';
import poloImage1 from 'figma:asset/c4885de55d3164c50194634f9e28b22f76695a9e.png';
import poloImage2 from 'figma:asset/7046b0360f130ea81b5b7f60c3d29d992f8d839c.png';
import poloImage3 from 'figma:asset/4b2a8137358116b54fa36e05700b1d3e856e72ab.png';
import poloImage4 from 'figma:asset/fb6348c563ad4a477676ba6b09e46e441fd733ab.png';

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
    cart: 'Кошик',
    addToCart: 'В КОШИК',
    emptyCart: 'Кошик порожній',
    total: 'Всього',
    checkout: 'Оформити замовлення',
    productName: 'ПОЛО-БОДІ МОЛОЧНЕ',
    colorLabel: 'Колір',
    colorCream: 'Молочний',
    descriptionParagraph: 'Елегантне поло-боді темно-синього кольору з контрастною білою вставкою та подвійним коміром. Преміальна тканина та продуманий крій створюють витончений силует. Ідеально підходить як базовий елемент гардеробу для створення стильних образів.',
    descriptionFeatures: [
      'Подвійний комірець з контрастною білою вставкою',
      'Зручний крій боді з застібкою знизу',
      'Асиметрична контрастна панель',
      'Преміальна тканина темно-синього кольору',
      'Універсальний базовий елемент гардеробу',
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
    compositionContent: 'Преміальний трикотаж з додаванням еластану для комфорту',
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
    cart: 'Cart',
    addToCart: 'ADD TO CART',
    emptyCart: 'Cart is empty',
    total: 'Total',
    checkout: 'Checkout',
    productName: 'POLO BODYSUIT CREAM',
    colorLabel: 'Color',
    colorCream: 'Cream',
    descriptionParagraph: 'Classic cream polo bodysuit with premium quality soft fabric. Perfect as a wardrobe staple for any occasion. Elegant collar and comfortable fit create a refined silhouette.',
    descriptionFeatures: [
      'Classic polo collar',
      'Comfortable bodysuit design with snap closure',
      'Premium cream fabric',
      'Versatile wardrobe essential',
      'Comfortable fitted cut',
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
    compositionContent: 'Premium knitwear with elastane for comfort',
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
    cart: 'Koszyk',
    addToCart: 'DO KOSZYKA',
    emptyCart: 'Koszyk jest pusty',
    total: 'Razem',
    checkout: 'Zamówienie',
    productName: 'POLO BODY KREMOWE',
    colorLabel: 'Kolor',
    colorCream: 'Kremowy',
    descriptionParagraph: 'Klasyczne polo body w kremowym odcieniu z delikatnej tkaniny premium. Idealnie nadaje się jako podstawowy element garderoby na każdą okazję. Elegancki kołnierzyk i wygodny krój tworzą wyrafinowaną sylwetkę.',
    descriptionFeatures: [
      'Klasyczny kołnierzyk polo',
      'Wygodny krój body z zapięciem na zatrzaski',
      'Tkanina premium w kremowym odcieniu',
      'Uniwersalny element garderoby',
      'Komfortowy dopasowany krój',
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
    compositionContent: 'Dzianina premium z dodatkiem elastanu dla komfortu',
  },
};

export default function PoloBodiPage() {
  const [language, setLanguage] = useState<Language>('UA');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('S');
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  const galleryImages = [poloImage1, poloImage2, poloImage3, poloImage4];

  const t = translations[language];
  const currency = language === 'PL' ? 'zł' : '₴';
  const price = language === 'PL' ? '410' : '4 900';

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const productData: Product = {
    id: 1,
    name: {
      UA: 'ПОЛО-БОДІ МОЛОЧНЕ',
      EN: 'POLO BODYSUIT CREAM',
      PL: 'POLO BODY KREMOWE'
    },
    price: { uah: 4900, pln: 410 },
    image: poloImage1,
    galleryImages: galleryImages,
    description: {
      UA: 'Класичне поло-боді молочного відтінку',
      EN: 'Classic cream polo bodysuit',
      PL: 'Klasyczne polo body kremowe'
    },
    colors: ['Молочний']
  };

  const handleAddToCart = () => {
    addToCart(productData, selectedSize, 'Молочний');
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Jost, sans-serif' }}>
      {/* Header */}
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onCartOpen={() => setIsCartOpen(true)}
        cartItemCount={cartItems.length}
      />

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
                <ColorSwitcher
                  variants={[
                    { color: 'Білий', colorHex: '#FAFAFA', path: '/product/polo-bodi', isActive: true },
                    { color: 'Темно-синій', colorHex: '#1A2744', path: '/product/polo-bodi-navy', isActive: false },
                    { color: 'Блакитний', colorHex: '#AEE2FC', path: '/product/polo-bodi-light-blue', isActive: false },
                  ]}
                  currentColorName={t.colorCream}
                />
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
                onClick={handleAddToCart}
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

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        translations={{
          cart: t.cart,
          emptyCart: t.emptyCart,
          total: t.total,
          checkout: t.checkout,
        }}
      />
    </div>
  );
}