import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Train, Plane, Car, Map as MapIcon, Ticket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AMapLoader from '@amap/amap-jsapi-loader';

type AMapMapInstance = {
  destroy: () => void;
  addControl?: (control: unknown) => void;
};

type AMapNamespace = {
  Map: new (container: HTMLElement, options: Record<string, unknown>) => AMapMapInstance;
  Marker: new (options: Record<string, unknown>) => unknown;
  Scale: new () => unknown;
  ToolBar: new (options?: Record<string, unknown>) => unknown;
  Pixel: new (x: number, y: number) => unknown;
};

const Booking = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showTravelGuide, setShowTravelGuide] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<AMapMapInstance | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wechat: '',
    service: '',
    message: ''
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Ticket Images Data
  const ticketImages = [
    { id: 1, src: 'images/tickets/微信图片_20260322213747_152_9.jpg' },
    { id: 2, src: 'images/tickets/微信图片_20260322213751_153_9.jpg' },
    { id: 3, src: 'images/tickets/微信图片_20260322213755_154_9.jpg' },
    { id: 4, src: 'images/tickets/微信图片_20260322213802_155_9.jpg' },
    { id: 5, src: 'images/tickets/微信图片_20260322213805_156_9.jpg' },
    { id: 6, src: 'images/tickets/微信图片_20260322213808_157_9.jpg' },
    { id: 7, src: 'images/tickets/微信图片_20260322213811_158_9.jpg' },
    { id: 8, src: 'images/tickets/微信图片_20260322213814_159_9.jpg' },
    { id: 9, src: 'images/tickets/微信图片_20260322213817_160_9.jpg' },
    { id: 10, src: 'images/tickets/微信图片_20260322213840_163_9.jpg' },
    { id: 11, src: 'images/tickets/微信图片_20260322213844_164_9.jpg' },
    { id: 12, src: 'images/tickets/微信图片_20260322213855_165_9.jpg' },
    { id: 13, src: 'images/tickets/微信图片_20260322214111_166_9.jpg' },
    { id: 14, src: 'images/tickets/微信图片_20260322214239_167_9.jpg' },
    { id: 15, src: 'images/tickets/微信图片_20260322214247_168_9.jpg' },
    { id: 16, src: 'images/tickets/微信图片_20260322214251_169_9.jpg' },
    { id: 17, src: 'images/tickets/微信图片_20260322214301_170_9.jpg' },
    { id: 18, src: 'images/tickets/微信图片_20260322214308_171_9.jpg' },
    { id: 19, src: 'images/tickets/微信图片_20260322214313_172_9.jpg' },
    { id: 20, src: 'images/tickets/微信图片_20260322214317_173_9.jpg' },
    { id: 21, src: 'images/tickets/微信图片_20260322214322_174_9.jpg' },
    { id: 22, src: 'images/tickets/微信图片_20260322214327_175_9.jpg' },
    { id: 23, src: 'images/tickets/微信图片_20260322214330_176_9.jpg' },
    { id: 24, src: 'images/tickets/微信图片_20260322214334_177_9.jpg' },
  ];

  const [ticketIndex, setTicketIndex] = useState(0);

  // Auto-slide for tickets
  useEffect(() => {
    const interval = setInterval(() => {
      setTicketIndex((prev) => (prev + 1) % Math.ceil(ticketImages.length / 4));
    }, 3000);
    return () => clearInterval(interval);
  }, [ticketImages.length]);

  useEffect(() => {
    // 异步加载高德地图
    const initMap = async () => {
      if (!mapContainerRef.current) return;

      try {
        const w = window as unknown as { _AMapSecurityConfig?: { securityJsCode: string } };
        w._AMapSecurityConfig = {
          securityJsCode: 'cf9bd2d718484976a3450db2fdc82211',
        };

        const AMap = (await AMapLoader.load({
          key: '5145a7b92e16b098d59bbe7e6091bdf0', 
          version: '2.0',
          plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.ControlBar'],
        })) as unknown as AMapNamespace;

        mapInstance.current = new AMap.Map(mapContainerRef.current, {
          viewMode: '3D',
          zoom: 3.8,
          center: [110, 15], // 调整中心点以更好地同时展示亚洲和澳洲
          mapStyle: 'amap://styles/normal', // 切换为彩色标准模式
          pitch: 45, // 增加倾斜度，增强3D效果
          dragEnable: false, // 禁用拖拽
          zoomEnable: false, // 禁用缩放
          rotateEnable: false, // 禁用旋转
          pitchEnable: false, // 禁用倾斜调整
        });

        // 添加标记点
        const markers = [
          { name: '郑州 · 总部旗舰店', pos: [113.66, 34.75], type: 'HQ' },
          { name: '深圳 · 旗舰店', pos: [114.05, 22.54], type: 'Store' },
          { name: '曼谷 · 旗舰店', pos: [100.50, 13.75], type: 'Store' },
          { name: '澳洲办事处', pos: [133.77, -25.27], type: 'Office' },
        ];

        markers.forEach(m => {
          // 自定义简约立体标记样式
          const markerContent = `
            <div class="relative flex flex-col items-center group">
              <!-- Floating Label -->
              <div class="flex items-center bg-white text-black px-3 py-1 shadow-[0_10px_20px_rgba(0,0,0,0.3)] transform -translate-y-2 transition-transform duration-300 group-hover:-translate-y-3 border-b-2 border-black/10">
                <span style="font-size: 11px; font-weight: 800; white-space: nowrap; letter-spacing: 0.05em;">${m.name}</span>
              </div>
              <!-- Vertical Line -->
              <div class="w-[1.5px] h-6 bg-gradient-to-b from-white to-transparent shadow-sm"></div>
              <!-- Base Dot -->
              <div class="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
            </div>
          `;

          new AMap.Marker({
            position: m.pos,
            content: markerContent,
            offset: new AMap.Pixel(0, 0),
            map: mapInstance.current,
            animation: 'AMAP_ANIMATION_DROP',
          });
        });

      } catch (e) {
        console.error('AMap load failed:', e);
      }
    };

    if (isVisible) {
      initMap();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [isVisible]);

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    '定制纹身设计',
    '旧纹身遮盖',
    '疤痕遮盖',
    '非遮盖类型（正常纹身）',
    '商务合作'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/wecom/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          wechat: formData.wechat,
          service: formData.service,
          message: formData.message,
        }),
      })

      const result = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(typeof result?.errmsg === "string" ? result.errmsg : "request failed")
      }
      if (result && typeof result.errcode === "number" && result.errcode !== 0) {
        throw new Error(typeof result?.errmsg === "string" ? result.errmsg : "wecom webhook error")
      }
      
      setShowDialog(true);
      setFormData({
        name: '',
        phone: '',
        wechat: '',
        service: '',
        message: ''
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : '未知错误'
      alert(`提交失败：${msg}`)
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: '电话', value: '+86 19339922409' },
    { icon: Mail, label: '邮箱', value: '958651910@qq.com' },
    { 
      icon: MapPin, 
      label: '地址', 
      value: (
        <div className="flex flex-col">
          <span>中国 · 郑州、深圳</span>
          <span>东南亚 · 泰国曼谷</span>
        </div>
      )
    },
    { icon: Clock, label: '营业时间', value: '周一至周六，上午 11:00 至晚上 20:00' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="booking"
      className="relative w-full bg-black text-white py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Compact Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 transition-all duration-700">
            <div className="w-12 h-[1px] bg-white/50" />
            <span className="text-sm uppercase tracking-[0.3em] text-white/60">预约咨询 · 见证信任</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">开始您的纹身之旅</h2>

          {/* Integrated Map and Tickets Card */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Small Map Card */}
            <div 
              className={`relative h-[280px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <div ref={mapContainerRef} className="w-full h-full grayscale-[0.2] contrast-[1.1]" />
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_white]" />
                    <span className="text-[10px] font-bold">郑州总部 · 旗舰店</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 z-10">
                <button 
                  onClick={() => setShowTravelGuide(true)}
                  className="flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-full text-[10px] font-bold shadow-xl hover:scale-105 transition-transform"
                >
                  <MapIcon className="w-3 h-3" />
                  直达行程
                </button>
              </div>
            </div>

            {/* Sliding Tickets Gallery - Takes 2 columns */}
            <div 
              className={`lg:col-span-2 relative h-[280px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
                <Ticket className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">客户赴约记录 · 全国见证</span>
              </div>
              
              <div className="h-full flex items-center px-6 pt-10">
                <div className="relative w-full overflow-hidden">
                  <div 
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${ticketIndex * 100}%)` }}
                  >
                    {/* Chunk tickets into groups of 4 for sliding */}
                    {Array.from({ length: Math.ceil(ticketImages.length / 4) }).map((_, groupIndex) => (
                      <div key={groupIndex} className="flex-shrink-0 w-full grid grid-cols-4 gap-4">
                        {ticketImages.slice(groupIndex * 4, groupIndex * 4 + 4).map((ticket) => (
                          <div key={ticket.id} className="aspect-[3/4] bg-white/5 rounded-lg overflow-hidden group relative border border-white/5">
                            <img 
                              src={ticket.src} 
                              alt={`Customer Ticket ${ticket.id}`} 
                              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                              <span className="text-[8px] text-white font-bold">赴约千羽</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {Array.from({ length: Math.ceil(ticketImages.length / 4) }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 h-1 rounded-full transition-all ${ticketIndex === i ? 'bg-white w-3' : 'bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start pt-10 border-t border-white/5">
          {/* Left: Contact Info */}
          <div 
            className={`space-y-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <p className="text-white/60 leading-relaxed max-w-md text-lg italic">
              "感谢您选择千羽刺青，无论您身在何处，我们都期待和您共同完成一个优秀的纹身作品，一辈子只有一次机会的事情，我们大多数情况下比您更珍视这次经历。"
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {contactInfo.map((item) => (
                <div 
                  key={item.label}
                  className="flex flex-col gap-3 group"
                >
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 rounded-full">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{item.label}</p>
                    <div className="font-medium text-sm leading-relaxed">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <form onSubmit={handleSubmit} className="bg-white text-black p-8 md:p-12 shadow-2xl rounded-sm">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">预约表单</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-black/40">姓名 *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-0 py-3 border-b border-gray-200 focus:border-black focus:outline-none transition-colors bg-transparent placeholder:text-gray-300"
                    placeholder="请输入您的姓名"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-black/40">电话 *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-0 py-3 border-b border-gray-200 focus:border-black focus:outline-none transition-colors bg-transparent placeholder:text-gray-300"
                      placeholder="您的电话"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-black/40">微信号 *</label>
                    <input
                      type="text"
                      required
                      value={formData.wechat}
                      onChange={(e) => setFormData({ ...formData, wechat: e.target.value })}
                      className="w-full px-0 py-3 border-b border-gray-200 focus:border-black focus:outline-none transition-colors bg-transparent placeholder:text-gray-300"
                      placeholder="请输入微信号"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-black/40">服务类型 *</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-0 py-3 border-b border-gray-200 focus:border-black focus:outline-none transition-colors bg-transparent cursor-pointer"
                  >
                    <option value="">请选择</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-black/40">留言</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-0 py-3 border-b border-gray-200 focus:border-black focus:outline-none transition-colors bg-transparent resize-none placeholder:text-gray-300"
                    placeholder="请描述您的需求或想法..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-10 bg-black text-white py-4 flex items-center justify-center gap-3 hover:bg-gray-900 transition-all font-bold tracking-widest text-xs disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-3 h-3" />
                )}
                {isSubmitting ? '正在提交...' : '提交预约'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Travel Guide Dialog */}
      <Dialog open={showTravelGuide} onOpenChange={setShowTravelGuide}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto bg-white text-black p-0 border-none rounded-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>千羽门店 · 指南</DialogTitle>
            <DialogDescription>Arrival & Appointment Guide</DialogDescription>
          </DialogHeader>
          <div className="relative h-48 bg-black flex flex-col justify-center px-8">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }} />
            <h2 className="text-3xl font-bold text-white mb-2 relative z-10">千羽门店 · 指南</h2>
            <p className="text-white/60 text-sm relative z-10 tracking-widest uppercase">Arrival & Appointment Guide</p>
          </div>
          
          <div className="p-8 space-y-10">
            {/* Zhengzhou Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-black/10 pb-2">
                <div className="w-2 h-2 bg-black rounded-full" />
                <h3 className="text-xl font-black">郑州旗舰店 · 到达指引</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-5 border-l-4 border-black">
                  <p className="text-xs text-gray-400 uppercase mb-1">详细地址</p>
                  <p className="font-bold text-lg">河南省郑州市东区龙子湖局外太格茂商场内</p>
                  <p className="text-gray-500 text-sm mt-1">（网约车/出租车请定位至：局外太格茂）</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-black" />
                      <p className="text-sm font-bold">新郑国际机场 (CGO)</p>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      直达地铁：<span className="font-bold text-black">1号线龙子湖站 F口</span>。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Train className="w-4 h-4 text-black" />
                      <p className="text-sm font-bold">郑州东站 (主要推荐)</p>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      大部分高铁皆到达此站。时间充裕建议乘坐地铁，时间紧张建议打车。
                    </p>
                  </div>
                </div>

                <div className="bg-black text-white p-5 rounded-xl flex items-start gap-4 shadow-lg">
                  <div className="bg-white/20 p-2 rounded-lg shrink-0">
                    <Car className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-sm italic">千羽特别诚挚礼 · 免费接送</h4>
                    <p className="text-[10px] text-white/60 leading-relaxed">
                      已预约中国客户，确认行程后我们将为您安排免费接站/接机服务。请提前联系您的咨询师。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Stores Section */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3 border-b border-black/10 pb-2">
                <div className="w-2 h-2 bg-black/30 rounded-full" />
                <h3 className="text-xl font-black">深圳 & 曼谷店 · 预约说明</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 border border-black/5 bg-gray-50/50 rounded-xl">
                  <h4 className="font-bold text-sm mb-2">深圳 · 旗舰店</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    请联系 <span className="text-black font-bold underline underline-offset-4">郑州总部纹身师</span> 进行统一咨询与预约安排。
                  </p>
                </div>
                <div className="p-5 border border-black/5 bg-gray-50/50 rounded-xl">
                  <h4 className="font-bold text-sm mb-2">曼谷 · 旗舰店</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    请联系 <span className="text-black font-bold underline underline-offset-4">郑州总部纹身师</span> 进行跨国行程预约与设计沟通。
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest pt-4">
              不辜负每一位朋友的信任，是我们始终坚持的态度
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md bg-white text-black border-none rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
              <CheckCircle className="w-8 h-8 text-green-500" />
              预约提交成功
            </DialogTitle>
            <DialogDescription className="text-gray-600 pt-2 text-base leading-relaxed">
              感谢您的信任！我们的顾问团队将在 24 小时内与您取得联系，为您开启专属纹身设计方案。
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-6">
            <button
              onClick={() => setShowDialog(false)}
              className="bg-black text-white px-8 py-2.5 font-bold tracking-widest text-xs hover:bg-gray-900 transition-all"
            >
              确 定
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Booking;
