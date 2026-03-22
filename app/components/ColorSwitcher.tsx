import { useNavigate } from 'react-router';

interface ColorVariant {
  color: string;
  colorHex: string;
  path: string;
  isActive: boolean;
}

interface ColorSwitcherProps {
  variants: ColorVariant[];
  currentColorName?: string;
}

export function ColorSwitcher({ variants, currentColorName }: ColorSwitcherProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-2">
        {variants.map((variant, index) => (
          <button
            key={index}
            onClick={() => navigate(variant.path)}
            className={`w-[22px] h-[22px] rounded-full transition-all ${
              variant.isActive 
                ? 'border-[2px] border-[#1A2744] shadow-sm' 
                : 'border border-gray-300 hover:border-[#1A2744]'
            } ${variant.colorHex === '#FFFFFF' || variant.colorHex === '#FAFAFA' || variant.colorHex === '#F5F5DC' || variant.colorHex === '#F5F0EB' ? 'border-gray-300' : ''}`}
            style={{ 
              backgroundColor: variant.colorHex,
              borderColor: variant.isActive ? '#1A2744' : (variant.colorHex === '#FFFFFF' || variant.colorHex === '#FAFAFA' || variant.colorHex === '#F5F5DC' || variant.colorHex === '#F5F0EB' ? '#D1D5DB' : undefined)
            }}
            title={variant.color}
          />
        ))}
      </div>
      {currentColorName && (
        <span className="text-sm" style={{ color: '#1A2744' }}>
          {currentColorName}
        </span>
      )}
    </div>
  );
}