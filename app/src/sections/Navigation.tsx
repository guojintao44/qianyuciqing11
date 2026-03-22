import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom'; // 移除 useLocation 和 useNavigate

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const location = useLocation(); // 移除
  // const navigate = useNavigate(); // 移除

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '首页', href: '#hero' },
    { label: '关于', href: '#about' },
    { label: '服务', href: '#services' },
    { label: '作品', href: '#portfolio' },
    { label: '评价', href: '#testimonials' },
    { label: '预约', href: '#booking' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-md py-4' 
            : 'bg-black/50 backdrop-blur-sm py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center gap-3"
            >
              <img 
                src="/images/logo.jpg" 
                alt="千羽刺青" 
                className="h-10 w-10 object-contain rounded-full"
              />
              <span className="text-white font-bold text-xl tracking-tight">千羽刺青·全球</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-white/80 hover:text-white text-sm font-medium relative group transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#booking"
                onClick={(e) => handleLinkClick(e, '#booking')}
                className="px-6 py-2 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                立即预约
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-black transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-white text-2xl font-medium transition-all duration-500 ${
                isMobileMenuOpen 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => handleLinkClick(e, '#booking')}
            className={`mt-8 px-8 py-3 border border-white text-white transition-all duration-500 ${
              isMobileMenuOpen 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
              }`}
            style={{ transitionDelay: '300ms' }}
          >
            立即预约
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
