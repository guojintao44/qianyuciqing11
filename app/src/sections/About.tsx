import { useEffect, useRef, useState } from 'react';
import { Award, Users, Globe, Clock } from 'lucide-react';

import ArtistCarousel from '../components/ArtistCarousel';

const artistImageFiles = [
  '004a503d217aff82a873f05213782a5f.jpg',
  '02701c35253afad031cb4d0212624f1b.jpg',
  '24c9425f6f92410245283241b80578d3.jpg',
  '31badaa89bf1391493ea98c9d1de8dc7.jpg',
  '37201e6f2b26e5b51cb440995fd919e5.jpg',
  '427b664e41769f8c62b540990b902969.jpg',
  '54b25bfccb3137aa62dda4fd0e402d06.jpg',
  '5c0f992265aa54c077d69dcab0d59622.jpg',
  '702040e03986f920d4a8826c575156e4.jpg',
  '9d0f4702614a406054b6d4642c5d6e24.jpg',
  'd0f694537fa9e68bca6c1fe126f16695.jpg',
  'db23f9dff7859005e70d2a06712f6216.jpg',
  'db60dd2f1affd16a714d6a2b7e436453.jpg',
  'e21e148b5ec5c7225177ee0d6de4935f.jpg',
  'e31deb836a78843ffc822f608fedc006.jpg',
  'ee30b1d6b6ca376d356d3ebd2f7d0112.jpg',
];

const artists = artistImageFiles.map((file, index) => ({
  id: `${index + 1}`,
  name: `纹身师 ${String.fromCharCode(65 + index)}`,
  image: `images/artist-team/${file}`,
  description: '专业纹身师，擅长多种风格。' + (index % 3 === 0 ? '擅长传统与新派结合，线条流畅，色彩饱满。' : index % 3 === 1 ? '精通肖像纹身，注重细节刻画，作品富有生命力。' : '创意几何纹身专家，擅长将抽象元素融入设计。'),
  experience: `${10 + (index % 5)}`,
}));

const About = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Award, value: '10+', label: '十年从业经验' },
    { icon: Users, value: '5000+', label: '满意客户' },
    { icon: Globe, value: '15+', label: '国家地区' },
    { icon: Clock, value: '10000+', label: '小时创作' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative w-full bg-black text-white py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Diagonal Line Decoration */}
      <div 
        className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Image */}
          <div 
            className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <ArtistCarousel artists={artists} />
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div 
              className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-white/50" />
                <span className="text-sm uppercase tracking-[0.3em] text-white/60">关于我们</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                千羽刺青
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mt-2">
                在疤痕及旧纹身遮盖领域，我们以卓越的案例数量和质量，确立了行业领先地位。
              </p>
            </div>

            {/* Description */}
            <div 
              className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '500ms' }}
            >
              <p className="text-lg text-white/80 leading-relaxed">
                千羽刺青，总部位于中国郑州，致力于纹身艺术。品牌已在中国（郑州、深圳）及东南亚地区（泰国曼谷）设立分支机构，构建了广泛的区域服务网络，以精湛技艺和创新理念服务全球客户，确保每一次纹身体验都独一无二。
              </p>
              <p className="text-white/60 leading-relaxed">
                千羽刺青成立于2016年，由一群对纹身艺术充满热情的专业艺术家创立。我们的团队拥有超过十年从业经验，服务过来自全球15个国家的客户。
              </p>
              <p className="text-white/60 leading-relaxed">
                我们坚信，纹身不仅仅是一种装饰，更是一种自我表达的艺术形式。将缺点变成亮点，是我们做纹身的意义所在。每一个作品都承载着独特的故事和意义，我们致力于将您的想法转化为永恒的艺术。
              </p>
            </div>

            {/* Stats Grid */}
            <div 
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '700ms' }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center group"
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-white/40 group-hover:text-white transition-colors duration-300" />
                  <p className="text-2xl md:text-3xl font-bold font-['Oswald']">{stat.value}</p>
                  <p className="text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div 
              className={`pt-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <a 
                href="#portfolio"
                className="btn-white inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector('#portfolio');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                查看我们的成功案例
              </a>
            </div>
            <div 
              className={`pt-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '900ms' }}
            >
              <a 
                href="#services"
                className="btn-white inline-block"
              >
                了解更多
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
        style={{ transitionDelay: '1000ms' }}
      />
    </section>
  );
};

export default About;
