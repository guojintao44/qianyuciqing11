import { useEffect, useRef, useState } from 'react';
import { MapPin, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'images/品牌背景/d0e4fffc3180bd126564bef2db368c26.jpg',
  'images/品牌背景/cb37d46d6316f8e22ffc4dee2c1fb2c1.jpg',
  'images/品牌背景/0f3a8f5375ee97d228559a0d2b193ec4.jpg',
  'images/品牌背景/13633f8947a2daf7fa244db506f33921.jpg',
  'images/品牌背景/16173199e5f5ae14c6c8737996a24edb.jpg',
  'images/品牌背景/1c14f3fff67340b266fe4b6f966be485.jpg',
  'images/品牌背景/1e59a794ce8d1d8e2d9fcc421244e9dd.jpg',
  'images/品牌背景/38c05ce91b60a1c387ec97ab0d1b4b1c.jpg',
  'images/品牌背景/4a04ed60444132a1b749ec2451238b96.jpg',
  'images/品牌背景/55e65be20d98b5d705b97d2d68545840.jpg',
  'images/品牌背景/5f8dbe41e1dc6924a166aedb50e28417.jpg',
  'images/品牌背景/65b034cc379659a2cbd4c2dac4cb70d1.jpg',
  'images/品牌背景/6eef6311ea0ad68e50050a171c30ba87.jpg',
  'images/品牌背景/8d887fb43d229b0ea86ec07df1dbdcdd.jpg',
  'images/品牌背景/99a46d44efb6b710b9583e43ca9a224a.jpg',
  'images/品牌背景/9fa4e3ea32b4822b666243fdb6a960ef.jpg',
  'images/品牌背景/bc658f817b9701d67cd0575e70f9518a.jpg',
  'images/品牌背景/f58c8bb9897fa6a8bedb15e7a9a32a58.jpg',
];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000); // 每3秒自动切换一次

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full bg-white overflow-hidden"
    >
      {/* Background World Map Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <path 
            d="M150,200 Q200,150 250,200 T350,200 T450,180 T550,200 T650,190 T750,200 T850,180" 
            fill="none" 
            stroke="black" 
            strokeWidth="1"
            className={`${isLoaded ? 'animate-draw-path' : ''}`}
            style={{ strokeDasharray: 1000, strokeDashoffset: isLoaded ? 0 : 1000, transition: 'stroke-dashoffset 2s ease' }}
          />
          {/* Simplified world map dots */}
          {[
            [100, 150], [200, 120], [300, 140], [400, 130], [500, 150], [600, 140], [700, 160], [800, 140], [900, 150],
            [120, 200], [220, 180], [320, 200], [420, 190], [520, 210], [620, 200], [720, 220], [820, 200], [920, 210],
            [150, 250], [250, 230], [350, 250], [450, 240], [550, 260], [650, 250], [750, 270], [850, 250], [950, 260],
            [180, 300], [280, 280], [380, 300], [480, 290], [580, 310], [680, 300], [780, 320], [880, 300], [980, 310],
          ].map(([x, y], i) => (
            <circle 
              key={i} 
              cx={x} 
              cy={y} 
              r="2" 
              fill="black"
              className={`transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute top-20 left-10 w-32 h-32 border border-black/10 rounded-full transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ transitionDelay: '800ms', animation: 'float 8s ease-in-out infinite' }}
        />
        <div 
          className={`absolute bottom-40 right-20 w-24 h-24 border border-black/10 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ transitionDelay: '1000ms', animation: 'float 6s ease-in-out infinite 1s' }}
        />
        <div 
          className={`absolute top-1/3 right-1/4 w-16 h-16 bg-black/5 rounded-full transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{ transitionDelay: '1200ms', animation: 'float 10s ease-in-out infinite 2s' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 space-y-8">
              {/* Brand Tag */}
              <div 
                className={`flex items-center gap-2 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: '400ms' }}
              >
                <div className="w-12 h-[1px] bg-black" />
                <span className="text-sm uppercase tracking-[0.3em] text-gray-600">千羽全球预约官网</span>
              </div>

              {/* Main Title */}
              <div className="space-y-2">
                <h1 
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
                  style={{ transitionDelay: '500ms' }}
                >
                  千羽刺青
                </h1>
                <div 
                  className={`flex items-center gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
                  style={{ transitionDelay: '600ms' }}
                >
                  <span className="text-3xl md:text-4xl font-light text-gray-400">/</span>
                  <span className="text-2xl md:text-3xl font-medium">疤痕遮盖</span>
                </div>
                <h2 
                  className={`text-4xl md:text-5xl font-bold transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}
                  style={{ transitionDelay: '700ms' }}
                >
                  纹身艺术
                </h2>
              </div>

              {/* Slogan */}
              <div 
                className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '800ms' }}
              >
                <p className="text-xl md:text-2xl text-gray-600 font-light">
                  把缺点变为亮点，是我们做纹身的意义。
                </p>
              </div>

              {/* Location Indicators */}
              <div 
                className={`flex flex-wrap gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '900ms' }}
              >
                {['中国郑州', '东南亚', '全球'].map((location) => (
                  <div key={location} className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{location}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div 
                className={`pt-4 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                style={{ transitionDelay: '1000ms' }}
              >
                <a 
                  href="#booking"
                  className="btn-primary inline-block"
                >
                  立即预约
                </a>
              </div>
            </div>

            {/* Right Image Carousel */}
            <div className="order-1 lg:order-2 relative w-full group"> {/* Added group for hover effect */}
              <div className="w-full overflow-hidden shadow-2xl rounded-lg"> {/* Inner div for clipping */}
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                  {images.map((imageSrc, index) => (
                    <div key={index} className="flex-shrink-0 w-full">
                      <div className="relative w-full aspect-w-16 aspect-h-9">
                        <img
                          src={encodeURI(imageSrc)} // Dynamic image source
                          alt="千羽刺青店面环境" // Updated alt text
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" // Added grayscale and hover effect
                          loading="lazy" // Performance optimization: lazy load
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <div
                className={`absolute bottom-4 left-4 bg-black text-white px-6 py-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '1200ms' }}
              >
                <p className="text-sm uppercase tracking-wider">Since</p>
                <p className="text-3xl font-bold font-['Oswald']">2016</p>
              </div>

              {/* Carousel Navigation Buttons */}
              <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Carousel Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'} transition-colors duration-300`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToAbout}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-black transition-all duration-500 cursor-pointer ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '1400ms' }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
