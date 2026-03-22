import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  image: string;
  description: string;
  experience: string;
}

interface ArtistCarouselProps {
  artists: Artist[];
}

const ArtistCarousel: React.FC<ArtistCarouselProps> = ({ artists }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artists.length);
  }, [artists.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + artists.length) % artists.length);
  }, [artists.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 1500); // 每1.5秒自动切换一次

    return () => clearInterval(interval); // 清除定时器
  }, [goToNext]);

  if (!artists || artists.length === 0) {
    return null; // 或者显示一个加载/无数据的占位符
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-2xl group pt-10">
      <h2 className="text-3xl font-bold text-center text-white mb-8">纹身师团队</h2>
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {artists.map((artist) => (
          <div key={artist.id} className="flex-shrink-0 w-full">
            <div className="relative w-full aspect-w-3 aspect-h-4"> {/* Added aspect ratio container */}
              <img
                src={encodeURI(artist.image)}
                alt={artist.name}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy" // 性能优化：懒加载
              />
            </div>
            {/* Optional: Overlay for artist name/description */}
            {/* <div className="absolute inset-0 bg-black/30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div>
                <h3 className="text-white text-xl font-bold">{artist.name}</h3>
                <p className="text-white/80 text-sm mt-1">{artist.description}</p>
              </div>
            </div> */}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
        aria-label="Previous artist"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 z-10"
        aria-label="Next artist"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {artists.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'} transition-colors duration-300`}
            aria-label={`Go to artist ${index + 1}`}
          />
        ))}
      </div>


    </div>
  );
};

export default ArtistCarousel;
