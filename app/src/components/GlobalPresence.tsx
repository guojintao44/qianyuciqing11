import React from 'react';

const GlobalPresence: React.FC = () => {
  return (
    <section className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* 动态背景效果 */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-70 animate-pulse-bg"></div>
      
      {/* 模拟全球连接点效果 */}
      <div className="absolute inset-0 z-10 opacity-30 animate-flow-dots" style={{
        backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px),
                          radial-gradient(circle, #fff 1px, transparent 1px)`,
        backgroundSize: `20px 20px`,
        backgroundPosition: `0 0, 10px 10px`
      }}></div>

      {/* 世界地图SVG作为背景层 */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-30"> {/* Increased opacity for better visibility */}
        <svg viewBox="0 0 1000 500" className="w-4/5 h-4/5 text-blue-300 animate-map-glow"> {/* Added animate-map-glow */}
          {/* This is a simplified placeholder SVG path for a world map. 
              In a real project, this would be a more detailed SVG. */}
          <path fill="currentColor" d="M999.68 250c0 137.95-111.91 249.91-249.91 249.91-137.95 0-249.91-111.91-249.91-249.91 0-137.95 111.91-249.91 249.91-249.91 137.95 0 249.91 111.91 249.91 249.91zm-749.91 0c0 137.95-111.91 249.91-249.91 249.91C0 499.91 0 388 0 250 0 112.05 111.91 0 249.91 0c137.95 0 249.91 111.91 249.91 249.91zM500 0C223.86 0 0 223.86 0 500h1000C1000 223.86 776.14 0 500 0z" />
          <path fill="currentColor" d="M729.77 200.09c-2.3-4.52-5.71-8.32-9.94-11.08-4.23-2.76-9.15-4.23-14.36-4.23-5.21 0-10.13 1.47-14.36 4.23-4.23 2.76-7.64 6.56-9.94 11.08-2.3 4.52-3.45 9.53-3.45 14.73 0 5.21 1.15 10.22 3.45 14.73 2.3 4.52 5.71 8.32 9.94 11.08 4.23 2.76 9.15 4.23 14.36 4.23 5.21 0 10.13-1.47 14.36-4.23 4.23-2.76 7.64-6.56 9.94-11.08 2.3-4.52 3.45-9.53 3.45-14.73 0-5.21-1.15-10.22-3.45-14.73zM270.23 200.09c-2.3-4.52-5.71-8.32-9.94-11.08-4.23-2.76-9.15-4.23-14.36-4.23-5.21 0-10.13 1.47-14.36 4.23-4.23 2.76-7.64 6.56-9.94 11.08-2.3 4.52-3.45 9.53-3.45 14.73 0 5.21 1.15 10.22 3.45 14.73 2.3 4.52 5.71 8.32 9.94 11.08 4.23 2.76 9.15 4.23 14.36 4.23 5.21 0 10.13-1.47 14.36-4.23 4.23-2.76 7.64-6.56 9.94-11.08 2.3-4.52 3.45-9.53 3.45-14.73 0-5.21-1.15-10.22-3.45-14.73zM500 250c0 137.95-111.91 249.91-249.91 249.91C112.05 499.91 0 388 0 250 0 112.05 112.05 0 250.09 0c137.95 0 249.91 111.91 249.91 249.91zm0 0c0 137.95 111.91 249.91 249.91 249.91 137.95 0 249.91-111.91 249.91-249.91 0-137.95-111.91-249.91-249.91-249.91C612.05 0 500 112.05 500 250z" />
        </svg>
      </div>

      {/* 内容层 */}
      <div className="relative z-30 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">千羽刺青 全球预约</h2>
        <p className="text-lg md:text-xl">连接全球，艺术无界</p>
      </div>

      {/* CSS 动画定义 */}
      <style>{`
        @keyframes pulse-bg {
          0% { opacity: 0.7; }
          50% { opacity: 0.9; }
          100% { opacity: 0.7; }
        }
        @keyframes flow-dots {
          0% { background-position: 0 0, 10px 10px; }
          100% { background-position: 20px 20px, 30px 30px; }
        }
        @keyframes map-glow {
          0% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); } /* blue-500 with opacity */
          50% { filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)); }
          100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
        }
        .animate-pulse-bg {
          animation: pulse-bg 10s infinite alternate;
        }
        .animate-flow-dots {
          animation: flow-dots 30s linear infinite;
        }
        .animate-map-glow {
          animation: map-glow 8s infinite alternate;
        }
      `}</style>
    </section>
  );
};

export default GlobalPresence;
