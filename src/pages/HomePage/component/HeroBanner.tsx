



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../component/ui/Button';
import { animationClasses, orbAnimations } from '../../../utils/animations';
import image from '../../../assets/image/image1.jpg'

// =====================
// --- Constants & Types ---
// =====================
const STATS = [
  { value: '5K+', label: 'Happy Clients' },
  { value: '100%', label: 'Clean Formula' },
  { value: 'Paris', label: 'Lab Certified' },
] as const;

const DROPLETS = [
  { size: 'w-16 h-16', top: '7%', left: '58%', delay: '0s' },
  { size: 'w-11 h-11', top: '17%', left: '18%', delay: '0.3s' },
  { size: 'w-13.5 h-13.5', top: '72%', left: '16%', delay: '0.7s' },
  { size: 'w-9 h-9', top: '80%', left: '72%', delay: '1s' },
  { size: 'w-6.5 h-6.5', top: '54%', left: '86%', delay: '1.4s' },
];



// =====================
// --- Icon Components ---
// =====================
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ChatIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// =====================
// --- Main Component ---
// =====================
export const HeroBanner: React.FC = () => {
  return (
    // التغيير هنا: flex-col للجوال و px-6 بدلا من 20 للشاشات الصغيرة
    <section className="relative flex flex-col lg:flex-row items-center min-h-screen px-6 md:px-12 lg:px-20 py-10 lg:py-30 gap-10 overflow-hidden bg-gradient-to-br from-[#fff5f8] via-[#fce4ec] to-[#fdf2f8]">

      {/* Background Orbs & Sparkles */}
      <BackgroundDecor />

      {/* Left Content */}
      <div className="flex-1 max-w-[520px] relative z-10 text-center lg:text-left mt-10 lg:mt-0">
        <Badge text="Clinical Skincare · Paris Formula" />

        <h1 className={`font-['Cormorant_Garamond',serif] font-bold text-[clamp(40px,5.5vw,82px)] leading-[1.05] text-[#1a0a14] mb-5.5 tracking-tight ${animationClasses.slideDown}`}>
          Clinical Skincare<br />
          <em className="text-[#ec4899] not-italic">for Real</em> Results
        </h1>

        <p className={`text-[15.5px] text-[#6b4c63] leading-[1.85] max-w-[420px] mx-auto lg:mx-0 mb-10 font-light ${animationClasses.slideDown}`} style={{ animationDelay: '0.2s' }}>
          We bring the finest cosmetic science from our Paris laboratory — formulas trusted by dermatologists worldwide, now in your hands.
        </p>

        <ActionButtons />
        <StatsList />
      </div>

      {/* Right Visual Area */}
      {/* التغيير هنا: إخفاء العناصر التي قد تتداخل في الشاشات الصغيرة جدا أو تصغير الحاوية */}
      <div className="flex-1 w-full flex justify-center items-center lg:block scale-75 md:scale-90 lg:scale-100 relative">
         <RightVisual />
      </div>

      {/* Scroll Indicator */}
      <ScrollHint />

    </section>
  );
};

// =====================
// --- Left Section Subcomponents ---
// =====================
const Badge = ({ text }: { text: string }) => (
  <div className={`inline-flex items-center gap-2 bg-white/75 border border-[rgba(236,72,153,0.2)] rounded-full px-4.5 py-1.75 text-[11px] font-bold tracking-wider text-[#ec4899] uppercase mb-7 backdrop-blur ${animationClasses.slideDown}`}>
    <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] animate-[pulse_2s_ease-in-out_infinite]" />
    {text}
  </div>
);

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleOpenChat = () => {
    navigate('/search', { state: { openChat: true } });
  };

  return (
    <div
      className={`flex justify-center lg:justify-start gap-4 ${animationClasses.slideDown}`}
      style={{ animationDelay: '0.3s' }}
    >
      {/* زر التسوق */}
      <Link to="/search">
        <Button variant="primary" icon={<SearchIcon />}>
          Shop Now
        </Button>
      </Link>

      {/* زر الشات */}
      <Button variant="ghost" icon={<ChatIcon />} onClick={handleOpenChat}>
  Ask Me
</Button>
    </div>
  );
};

const StatsList = () => (
  <div className={`flex justify-center lg:justify-start gap-9 mt-12 ${animationClasses.slideDown}`} style={{ animationDelay: '0.4s' }}>
    {STATS.map((stat, i) => (
      <div key={i}>
        <div className="font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#be185d]">{stat.value}</div>
        <div className="text-[11px] text-[#9d6b8e] font-medium tracking-wide mt-0.5">{stat.label}</div>
      </div>
    ))}
  </div>
);

// =====================
// --- Right Section Subcomponents ---
// =====================
const RightVisual = () => (
  <div className={`max-w-[580px] w-full relative h-[580px] z-10 ${animationClasses.heroFloat}`}>

    {/* Background Circle */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[490px] md:h-[490px] rounded-full bg-radial from-[#fce4ec] via-[#f8bbd9] to-[#ec4899] shadow-[0_24px_90px_rgba(236,72,153,0.22)]" />

    {/* Droplets - تظهر فقط في الشاشات الأكبر لعدم تشتيت الجوال */}
    <div className="hidden md:block">
        {DROPLETS.map((drop, i) => (
        <div
            key={i}
            className={`absolute ${drop.size} rounded-[60%_30%_55%_30%] bg-gradient-to-br from-[#f9a8d4] to-[#ec4899] opacity-70 animate-[droplet_${6 + i}s_ease-in-out_infinite]`}
            style={{ top: drop.top, left: drop.left, animationDelay: drop.delay }}
        />
        ))}
    </div>

    {/* Product Image */}
    <div className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full overflow-hidden border-4 border-white/20 ${animationClasses.bottleFloat}`}>
      <img src={image} alt="Skincare Product" className="w-full h-full object-cover" />
    </div>

    {/* Floating Cards - تعديل المواقع لتناسب الجوال */}
    <div className="scale-75 md:scale-100">
        <FloatCard position="top-[15%] right-[5%] md:top-[2%] md:right-[3%]" title="✦ SKIN SCORE" value="98/100" delay="0s" />
       
    </div>
  </div>
);

const FloatCard = ({ position, title, value, isSmall, delay }: { position: string; title: string; value: string; isSmall?: boolean; delay: string }) => (
  <div className={`absolute ${position} bg-white/92 backdrop-blur-md border border-[rgba(236,72,153,0.14)] rounded-2xl p-3.5 shadow-[0_10px_36px_rgba(236,72,153,0.12)] z-20 ${animationClasses.floatTag}`} style={{ animationDelay: delay }}>
    <div className="text-[11px] font-bold text-[#ec4899] tracking-wider mb-1 whitespace-nowrap">{title}</div>
    <div className={`${isSmall ? 'text-xs font-medium text-[#6b2d5e]' : "font-['Cormorant_Garamond',serif] text-2xl font-bold text-[#1a0a14]"} whitespace-nowrap`}>
      {value}
    </div>
  </div>
);

// =====================
// --- Background Decorations ---
// =====================
const BackgroundDecor = () => (
  <>
    {/* Orbs */}
    <div className={`absolute w-[420px] h-[420px] bg-[rgba(249,168,212,0.28)] blur-[85px] top-[5%] left-[62%] ${orbAnimations.orb1}`} />
    <div className={`absolute w-[260px] h-[260px] bg-[rgba(236,72,153,0.1)] blur-[65px] top-[55%] left-[5%] ${orbAnimations.orb2}`} />
    
    {/* Sparkles - مخفية في الجوال لمنع العناوين من الاختفاء خلفها */}
    <div className="hidden lg:block">
        <div className="absolute top-35 left-[51%] text-[14px] text-[#ec4899] animate-[floatPetal_6s_ease-in-out_infinite]">✦</div>
        <div className="absolute top-35 left-[71%] text-[34px] text-[#ec4899] animate-[floatPetal_6s_ease-in-out_infinite]">✦</div>
        <div className="absolute top-35 left-[31%] text-[54px] text-[#911050] animate-[floatPetal_6s_ease-in-out_infinite]">✦</div>
    </div>
  </>
);

// =====================
// --- Scroll Hint ---
// =====================
const ScrollHint = () => (
  <div className={`absolute bottom-5 lg:bottom-7.5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${animationClasses.fadeInUp}`}>
    <span className="text-[10px] tracking-widest text-[#ec4899] font-bold uppercase">Scroll</span>
    <div className="w-0.5 h-10 lg:h-12.5 bg-[rgba(236,72,153,0.15)] rounded-lg overflow-hidden">
      <div className="w-full h-full bg-gradient-to-b from-[#ec4899] to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
    </div>
  </div>
);








