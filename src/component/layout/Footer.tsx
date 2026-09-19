import React from 'react';

// ============ الثوابت والتكوين ============
// const BRAND_COLORS = {
//   primary: '#ec4899',
//   secondary: '#f9a8d4',
//   darkBg: '#1a0a14',
//   mutedText: '#9d6b8e',
//   darkerMuted: '#6b4c63',
// } as const;

const FOOTER_LINKS = {
  shop: ['Serums', 'Moisturizers', 'Cleansers', 'Eye Care', 'Bundles'],
  company: ['About Us', 'Our Lab', 'Sustainability', 'Press', 'Careers'],
  support: ['Contact', 'FAQ', 'Shipping', 'Returns', 'Track Order'],
} as const;

const SOCIAL_ICONS = ['📸', '💬', '🐦', '▶️'] as const;

const BOTTOM_LINKS = ['Privacy Policy', 'Terms of Use', 'Cookies'] as const;

// ============ المكونات الفرعية ============

const BrandSection: React.FC = () => (
  <div>
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ec4899] to-[#f9a8d4] flex items-center justify-center text-lg">
        🌸
      </div>
      <div>
        <div className="font-['Cormorant_Garamond',serif] font-bold text-2xl text-white leading-none">
          Lumière
        </div>
        <div className="text-[9px] tracking-widest text-[#ec4899] uppercase mt-0.5">
          Skincare
        </div>
      </div>
    </div>
    
    <p className="text-[13px] text-[#9d6b8e] leading-relaxed max-w-[260px] font-light mb-6">
      Clinical skincare formulas born in Paris, designed for real skin, 
      real results — always clean, always kind.
    </p>
    
    <SocialIcons />
  </div>
);

const SocialIcons: React.FC = () => (
  <div className="flex gap-3">
    {SOCIAL_ICONS.map((icon, index) => (
      <div
        key={`${icon}-${index}`}
        className="w-9.5 h-9.5 rounded-full bg-[rgba(236,72,153,0.12)] 
                   border border-[rgba(236,72,153,0.18)] 
                   flex items-center justify-center text-base 
                   cursor-pointer transition-all duration-300 
                   hover:bg-[rgba(236,72,153,0.25)] hover:-translate-y-1"
        role="button"
        tabIndex={0}
        aria-label={`Social media icon ${icon}`}
      >
        {icon}
      </div>
    ))}
  </div>
);

interface LinkColumnProps {
  title: string;
  links: readonly string[];
}

const LinkColumn: React.FC<LinkColumnProps> = ({ title, links }) => (
  <div className="footer-col">
    <h4 className="font-['Cormorant_Garamond',serif] text-xl font-bold text-white mb-4.5">
      {title}
    </h4>
    {links.map((item) => (
      <a
        key={item}
        href="#"
        className="block text-[13px] text-[#9d6b8e] no-underline 
                   mb-2.75 font-light hover:text-[#f9a8d4] 
                   transition-colors duration-200"
      >
        {item}
      </a>
    ))}
  </div>
);

const BottomBar: React.FC = () => (
  <div className="border-t border-[rgba(236,72,153,0.1)] pt-6.5 
                  flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-xs text-[#6b4c63] m-0 order-2 md:order-1">
      © 2026 Lumière Skincare. All rights reserved. Made with 🌸 in Paris.
    </p>
    <div className="flex gap-6 order-1 md:order-2">
      {BOTTOM_LINKS.map((link) => (
        <a
          key={link}
          href="#"
          className="text-xs text-[#6b4c63] no-underline 
                     hover:text-[#f9a8d4] transition-colors duration-200"
        >
          {link}
        </a>
      ))}
    </div>
  </div>
);

// ============ المكون الرئيسي ============

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1a0a14] text-[#f9a8d4] px-4 md:px-20 pt-16 pb-9">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_repeat(3,1fr)] gap-8 md:gap-10 mb-13">
        
        {/* Brand Column - تأخذ عرض كامل في الموبايل */}
        <div className="col-span-1 md:col-span-1">
          <BrandSection />
        </div>{/* روابط Shop */}
        <LinkColumn title="Shop" links={FOOTER_LINKS.shop} />
        
        {/* روابط Company */}
        <LinkColumn title="Company" links={FOOTER_LINKS.company} />
        
        {/* روابط Support */}
        <LinkColumn title="Support" links={FOOTER_LINKS.support} />
      </div>

      {/* الشريط السفلي */}
      <BottomBar />
    </footer>
  );
};