import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const testimonials = [
    { id: 1, image: 'images/微信图片_20260322204248_109_9.jpg' },
    { id: 2, image: 'images/微信图片_20260322204251_110_9.jpg' },
    { id: 3, image: 'images/微信图片_20260322204253_111_9.jpg' },
    { id: 4, image: 'images/微信图片_20260322204256_112_9.jpg' },
    { id: 5, image: 'images/微信图片_20260322204259_113_9.jpg' },
    { id: 6, image: 'images/微信图片_20260322204302_114_9.jpg' },
    { id: 7, image: 'images/微信图片_20260322204306_115_9.jpg' },
    { id: 8, image: 'images/微信图片_20260322204309_116_9.jpg' },
    { id: 9, image: 'images/0fefa89a778b1b26a876e5f8b8ebb60a.jpg' },
    { id: 10, image: 'images/1c7c11469076ebac4f037ff6745a56f6.jpg' },
    { id: 11, image: 'images/5658ea9310efb2fcc0c14727b2079dc0.jpg' },
    { id: 12, image: 'images/6c1b25fd94958ba7a09645854025f4ba.jpg' },
    { id: 13, image: 'images/78168c759de795c85c7d33ea1eb96e98.jpg' },
    { id: 14, image: 'images/7c6e014d2b8a1072c87b86cf5f5ae1dd.jpg' },
    { id: 15, image: 'images/882cb5002d080a4f6f0e967385de9755.jpg' },
    { id: 16, image: 'images/89f790586270522384ef27f2c3d8a2da.jpg' },
    { id: 17, image: 'images/8b2f5db4dcc28f7d7072c80366290061.jpg' },
    { id: 18, image: 'images/94c2988b97bb30f368a7c1e94852d09b.jpg' },
    { id: 19, image: 'images/babf4fff618113a94f0643fb88f1ab94.jpg' }
  ];

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500); // 缩短动画锁定时间
  }, [isAnimating, testimonials.length]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500); // 缩短动画锁定时间
  }, [isAnimating, testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 1500);

    return () => clearInterval(interval);
  }, [handleNext]);

  const getCardStyle = (index: number) => {
    const total = testimonials.length;
    let diff = index - activeIndex;
    
    // Ensure the shortest path in circular carousel
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    
    if (diff === 0) {
      return {
        transform: 'translateX(0) translateZ(100px) rotateY(0deg)',
        opacity: 1,
        zIndex: 10
      };
    } else if (diff === 1) {
      return {
        transform: 'translateX(140px) translateZ(0) rotateY(-25deg)',
        opacity: 0.7,
        zIndex: 5
      };
    } else if (diff === -1) {
      return {
        transform: 'translateX(-140px) translateZ(0) rotateY(25deg)',
        opacity: 0.7,
        zIndex: 5
      };
    } else if (diff === 2) {
      return {
        transform: 'translateX(260px) translateZ(-80px) rotateY(-40deg)',
        opacity: 0.4,
        zIndex: 2
      };
    } else if (diff === -2) {
      return {
        transform: 'translateX(-260px) translateZ(-80px) rotateY(40deg)',
        opacity: 0.4,
        zIndex: 2
      };
    } else {
      return {
        transform: `translateX(${diff > 0 ? 400 : -400}px) translateZ(-150px) rotateY(${diff > 0 ? -90 : 90}deg)`,
        opacity: 0,
        zIndex: 0
      };
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="relative w-full bg-white py-12 lg:py-16 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gray-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-100 rounded-full opacity-50 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div 
            className={`flex items-center justify-center gap-3 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="w-12 h-[1px] bg-black/30" />
            <span className="text-sm uppercase tracking-[0.3em] text-gray-500">CLIENT FEEDBACK</span>
            <div className="w-12 h-[1px] bg-black/30" />
          </div>
          <h2 
            className={`text-2xl md:text-3xl font-bold transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '100ms' }}
          >
            客户反馈
          </h2>
        </div>

        {/* 3D Carousel */}
        <div 
          className={`relative h-[340px] perspective-1200 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="relative w-full h-full flex items-center justify-center preserve-3d">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="absolute w-full max-w-[160px] aspect-[9/16] bg-white p-1.5 shadow-md transition-all duration-500 flex items-center justify-center"
                style={{
                  ...getCardStyle(index),
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* Chat Record Image */}
                <div className="w-full h-full overflow-hidden border border-gray-100 rounded-sm">
                  <img 
                    src={testimonial.image} 
                    alt={`客户反馈 ${testimonial.id}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button 
              onClick={handlePrev}
              className="w-9 h-9 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-black w-4' : 'bg-black/20 hover:bg-black/40'}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-9 h-9 border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              disabled={isAnimating}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
