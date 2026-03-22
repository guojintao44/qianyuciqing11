import { useEffect, useRef, useState } from 'react';
import { Palette, Layers, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
  index: number;
  isVisible: boolean;
}

const ServiceCard = ({ title, description, image, icon: Icon, index, isVisible }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-white overflow-hidden transition-all duration-800 preserve-3d ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{
        transitionDelay: `${200 + index * 150}ms`,
        transform: isHovered ? 'translateZ(30px) translateY(-10px) rotateX(5deg)' : 'translateZ(0)',
        boxShadow: isHovered ? '0 25px 50px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={encodeURI(image)} 
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon Badge */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-white flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Line Animation */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: '定制纹身设计',
      description: '将您的故事和对您有意义的内容设计为独一无二的纹身设计作品',
      image: 'images/服务类型/设计图.jpg',
      icon: Palette,
    },
    {
      title: '遮盖类纹身/设计加操作',
      description: '专业遮盖旧纹身或疤痕，用精湛的技艺为您打造全新的艺术作品。',
      image: 'images/服务类型/操作效果图.jpg',
      icon: Layers,
    },
    {
      title: '非遮盖类纹身/设计加操作',
      description: '创意类纹身，我们将根据您的要求来设计图案，把您的想法设计为可用于纹身的落地图案与实操',
      image: 'images/服务类型/非遮盖效果图.jpg',
      icon: Sparkles,
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services"
      className="relative w-full bg-white py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="w-12 h-[1px] bg-black/30" />
            <span className="text-sm uppercase tracking-[0.3em] text-gray-500">我们的服务</span>
            <div className="w-12 h-[1px] bg-black/30" />
          </div>
          <h2 
            className={`text-4xl md:text-5xl font-bold transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '100ms' }}
          >
            服务类型
          </h2>
          <p 
            className={`mt-4 text-gray-600 max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '200ms' }}
          >
            我们提供全方位的纹身服务，满足您的各种需求
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1200">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title}
              {...service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div 
          className={`mt-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <p className="text-gray-500 text-sm">
            所有服务均使用进口专业设备和卫生材料，确保安全与品质
          </p>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Services;
