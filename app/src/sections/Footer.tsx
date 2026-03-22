import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [activeQr, setActiveQr] = useState<null | {
    label: string;
    src: string;
  }>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: '首页', href: '#hero' },
    { label: '关于我们', href: '#about' },
    { label: '服务', href: '#services' },
    { label: '作品集', href: '#portfolio' },
    { label: '预约', href: '#booking' },
  ];

  const socialLinks = [
    { label: '微信预约二维码', logo: '/images/logos/wechat.svg', qr: '/images/qrcodes/wechat-booking.jpg' },
    { label: 'Telegram 二维码', logo: '/images/logos/telegram.svg', qr: '/images/qrcodes/telegram.png' },
    { label: '抖音二维码', logo: '/images/logos/douyin.svg', qr: '/images/qrcodes/douyin.png' },
    { label: '小红书二维码', logo: '/images/logos/xiaohongshu.svg', qr: '/images/qrcodes/xiaohongshu.png' },
  ];

  return (
    <footer 
      ref={sectionRef}
      className="relative w-full bg-black text-white py-16 lg:py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div 
            className={`lg:col-span-2 space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div>
              <h3 className="text-3xl font-bold mb-2">千羽刺青</h3>
              <p className="text-white/60">千羽刺青纹身艺术</p>
            </div>
            <p className="text-white/50 max-w-md leading-relaxed">
              汇聚全球客户的精品纹身工作室。我们以精湛的工艺和独特的艺术视野，为每一位客户创造独一无二的纹身作品。
            </p>
            
            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm uppercase tracking-[0.2em] text-white/80">联系方式</h4>
              <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <button
                  key={social.label}
                  type="button"
                  className="group w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                  aria-label={social.label}
                  onClick={() => {
                    setActiveQr({ label: social.label, src: social.qr });
                    setQrOpen(true);
                  }}
                >
                  <img
                    src={social.logo}
                    alt={social.label}
                    className="w-5 h-5 invert group-hover:invert-0"
                  />
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6">快速链接</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-300 inline-block hover:translate-x-1 transform"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div 
          className={`w-full h-[1px] bg-white/10 mb-8 transition-all duration-1000 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}
          style={{ transitionDelay: '600ms' }}
        />

        {/* Bottom */}
        <div 
          className={`flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <p className="text-white/40 text-sm">
            © 2024 千羽刺青. 保留所有权利。
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div 
        className={`absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '800ms' }}
      >
        <p className="text-[15vw] font-bold text-white/[0.02] whitespace-nowrap leading-none translate-y-1/3">
          千羽刺青
        </p>
      </div>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="sm:max-w-md bg-white text-black border-none rounded-2xl p-0 overflow-hidden">
          <div className="bg-black text-white px-6 py-5">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold tracking-widest">
                {activeQr?.label || '二维码'}
              </DialogTitle>
            </DialogHeader>
            <p className="text-white/60 text-xs mt-1">
              长按保存或截图识别
            </p>
          </div>
          <div className="p-6">
            <div className="w-full aspect-square bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
              {activeQr?.src ? (
                <img
                  src={activeQr.src}
                  alt={activeQr.label}
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
