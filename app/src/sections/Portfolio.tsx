import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react'; // Changed ZoomIn to X for close button

const Modal = ({ src, onClose }: { src: string; onClose: () => void }) => {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close on backdrop click
    >
      <div className="relative bg-white p-2 rounded-lg max-w-2xl max-h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <img src={src} alt="Zoomed Portfolio" className="max-w-full max-h-full object-contain rounded-md" />
      </div>
    </div>
  );
};


const portfolioImagePaths = [
  'images/portfolio/经典案例/经典案例/aa15ae8104d4df7364dbce61f865b2eb 拷贝.jpg',
  'images/portfolio/经典案例/经典案例/72d877e4ee41d098a3779029120cfb35 拷贝.jpg',
  'images/portfolio/经典案例/经典案例/61c98dbefcbe193f567067a8d6e5fea3 拷贝.jpg',
  'images/portfolio/经典案例/经典案例/30b48e0b0dd44274fb4264d3cddb8e5c 拷贝.jpg',
  'images/portfolio/经典案例/经典案例/3.jpg',
  'images/portfolio/经典案例/经典案例/640.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20250221185410.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20250221185357.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20250221185405.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20250221185340.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20250221185351.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20250221185334.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20250221185329.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20250221185316.jpg',
  'images/portfolio/经典案例/经典案例/d93ae033cfaa147e2e8fe69fcab07fa.jpg',
  'images/portfolio/经典案例/经典案例/dc4788453cd321bd83f4199f224a259.jpg',
  'images/portfolio/经典案例/经典案例/082add060cbdcca4d05debc8b9f2e63.jpg',
  'images/portfolio/经典案例/经典案例/999.jpg',
  'images/portfolio/经典案例/经典案例/f105df0a6ad44cf977bc730618e77b1.jpg',
  'images/portfolio/经典案例/经典案例/0cafad44d3aafe32b77849613b4dc57.jpg',
  'images/portfolio/经典案例/经典案例/95fcb353c9b83f4c26760892f822d8f.jpg',
  'images/portfolio/经典案例/经典案例/5f95d7bed26111022ac7dca35c84881.jpg',
  'images/portfolio/经典案例/经典案例/b5c6569831eabc75be9efc6bc3fd890.jpg',
  'images/portfolio/经典案例/经典案例/36ec556d5c82e2e49f83c9d314874c9.jpg',
  'images/portfolio/经典案例/经典案例/031cc018d439c414ed626b8fd790b06.jpg',
  'images/portfolio/经典案例/经典案例/193abf38ab40519c0a4a887964ae5b3.jpg',
  'images/portfolio/经典案例/经典案例/144.jpg',
  'images/portfolio/经典案例/经典案例/b0e5af188e4bad52d87dbadb130b2db.jpg',
  'images/portfolio/经典案例/经典案例/3c3af15ffc13b2b8e7209c455fc292f.jpg',
  'images/portfolio/经典案例/经典案例/0daec29a165063c8d37e4c1a0334f65.jpg',
  'images/portfolio/经典案例/经典案例/f2b466a7a4c3197266565109df75816.jpg',
  'images/portfolio/经典案例/经典案例/1a078601f5610949f995e58e3ba30bc.jpg',
  'images/portfolio/经典案例/经典案例/231.jpg',
  'images/portfolio/经典案例/经典案例/56d67c3fa5cf1307aa77c159e7b5012.jpg',
  'images/portfolio/经典案例/经典案例/68cc33f53122712ab08a834e3698e91.jpg',
  'images/portfolio/经典案例/经典案例/345a783937cf3187184bc77cc720cb9.jpg',
  'images/portfolio/经典案例/经典案例/1a9248e849cbc261c90c6276fd30095.jpg',
  'images/portfolio/经典案例/经典案例/122.jpg',
  'images/portfolio/经典案例/经典案例/9bce117633d0a869117cce6abd7081e.jpg',
  'images/portfolio/经典案例/经典案例/d583c215bce89b1f23be8820cf8d7c9.jpg',
  'images/portfolio/经典案例/经典案例/397404df3b7d89984f13702cc701b5f.jpg',
  'images/portfolio/经典案例/经典案例/7553822cee50a9e1ca0e59f41143edf.jpg',
  'images/portfolio/经典案例/经典案例/6be3f37a770d2d03396cce780036783.jpg',
  'images/portfolio/经典案例/经典案例/ca1d2804416f568bda6965ab8c41ec8.jpg',
  'images/portfolio/经典案例/经典案例/231a02296eec2cbc200c4ba6b9b38bd.jpg',
  'images/portfolio/经典案例/经典案例/60ef3faf55c882c6423a56773fb6304.jpg',
  'images/portfolio/经典案例/经典案例/069fd2089cb43ca037082ea745e2dce.jpg',
  'images/portfolio/经典案例/经典案例/8a1855204ab02ff1820377d5b928da1.jpg',
  'images/portfolio/经典案例/经典案例/微信图片_20221002005922.jpg',
  'images/portfolio/经典案例/经典案例/a32850d0244478ed058d060bc095dca.jpg',
  'images/portfolio/经典案例/经典案例/12b1a165f8024800167a4b80a325ef9.jpg',
  'images/portfolio/经典案例/经典案例/e973a42be1e6867352f2f4f595a2763.jpg',
];

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0); // Changed from activeIndex
  const [transitionEnabled, setTransitionEnabled] = useState(true); // New state for transition

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null); // Ref for the carousel track

  const itemsToShow = 4; // Number of items visible at once
  const imageWidth = 100 / itemsToShow; // Percentage width for each image in the flex container

  // Duplicate images for infinite scroll effect
  const duplicatedPortfolioItems = [
    ...portfolioImagePaths,
    ...portfolioImagePaths,
    ...portfolioImagePaths, // Duplicate three times for smooth looping
  ];

  const originalLength = portfolioImagePaths.length;


  const handleNext = () => {
    setTransitionEnabled(true);
    setCurrentOffset((prevOffset) => prevOffset + 1);
  };

  const handlePrev = () => {
    setTransitionEnabled(true);
    setCurrentOffset((prevOffset) => prevOffset - 1);
  };

  // Reset offset for infinite loop effect
  useEffect(() => {
    if (!transitionEnabled) return; // Don't run this logic if transition is disabled (during a jump)

    if (currentOffset >= originalLength + originalLength) {
      // If past the second set, reset to the start of the first duplicate
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentOffset(originalLength);
      }, 0);
      return () => clearTimeout(timer);
    } else if (currentOffset < originalLength) {
      // If before the first set, jump to the start of the last duplicate
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentOffset(originalLength + originalLength - 1);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentOffset, originalLength, transitionEnabled]);

  // Re-enable transition after a short delay for the instant jump
  useEffect(() => {
    if (!transitionEnabled && currentOffset === originalLength) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50); // Small delay to allow DOM to update
      return () => clearTimeout(timer);
    } else if (!transitionEnabled && currentOffset === originalLength + originalLength -1) {
       const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50); // Small delay to allow DOM to update
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled, currentOffset, originalLength]);


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

  // Auto-scroll effect
  useEffect(() => {
    if (isVisible) {
      autoScrollIntervalRef.current = window.setInterval(() => {
        handleNext();
      }, 1000); // Auto-scroll every 1 second
    } else {
      clearInterval(autoScrollIntervalRef.current || undefined);
    }

    return () => clearInterval(autoScrollIntervalRef.current || undefined);
  }, [isVisible, currentOffset]); // Dependencies changed

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-black text-white py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div
                className={`flex items-center gap-3 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="w-12 h-[1px] bg-white/50" />
                <span className="text-sm uppercase tracking-[0.3em] text-white/60">我们的作品</span>
              </div>
              <h2
                className={`text-4xl md:text-5xl font-bold transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '100ms' }}
              >
                纹身作品集
              </h2>
            </div>
          </div>
        </div>

        {/* Portfolio Gallery */}
        <div
          className="relative max-w-7xl mx-auto group" // Increased max-w for multiple items, removed px-6 lg-px-12 as it will be handled by inner container
        >
          <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
            <div
              ref={carouselRef}
              className={`flex ${transitionEnabled ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentOffset * imageWidth}%)` }} // Apply offset
            >
              {duplicatedPortfolioItems.map((imagePath, index) => (
                <div key={index} className="flex-shrink-0 px-4" style={{ width: `${imageWidth}%` }}>
                  <div className="relative w-full aspect-w-3 aspect-h-4 cursor-pointer"
                       onClick={() => setZoomedImage(imagePath)}>
                    <img
                      src={encodeURI(imagePath)}
                      alt="纹身作品"
                      className="w-full h-full object-cover transition-all duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows Overlay */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-r-lg z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-3 rounded-l-lg z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hide scrollbar (kept as a general style, though not directly used by this carousel structure) */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Modal src={zoomedImage || ''} onClose={() => setZoomedImage(null)} />
    </section>
  );
};

export default Portfolio;
