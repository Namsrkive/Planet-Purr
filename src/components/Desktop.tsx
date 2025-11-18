import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Settings, Search, Calendar, X, Moon, Sun } from 'lucide-react';
import DesktopFolder from './DesktopFolder';
import { sdgData } from '../data/sdgData';

const Desktop: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickRipples, setClickRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [showClock, setShowClock] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [titleHovered, setTitleHovered] = useState(false);
  const [catHovered, setCatHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Only show the 4 specified SDGs - Clean Energy (7) moved before Zero Hunger (2)
  const selectedSDGs = [7, 2, 4, 5]; // Clean Energy, Zero Hunger, Quality Education, Gender Equality
  const displayedSDGs = sdgData.filter(sdg => selectedSDGs.includes(sdg.id))
    .sort((a, b) => selectedSDGs.indexOf(a.id) - selectedSDGs.indexOf(b.id));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document with optimized transitions
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Optimized mouse position updates with throttling
    const updatePosition = () => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoving(true);
    };
    
    requestAnimationFrame(updatePosition);
    
    // Reset mouse moving state after a delay
    const timeout = setTimeout(() => setIsMouseMoving(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const newRipple = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    
    setClickRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setClickRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
  }, []);

  const handleFolderClick = (sdgId: number) => {
    navigate(`/quiz/${sdgId}`);
  };

  /**
   * 💡 UPDATED FUNCTION: Redirects the user to the static NGOPROFILE.html page.
   */
  const handleNGOClick = () => {
    window.location.href = '/NGOPROFILE.html'; 
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSettings(!showSettings);
    setShowClock(false);
    setShowCalendar(false);
  };

  const handleTimeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowClock(!showClock);
    setShowCalendar(false);
    setShowSettings(false);
  };

  const handleDateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCalendar(!showCalendar);
    setShowClock(false);
    setShowSettings(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentTime);
    const firstDay = getFirstDayOfMonth(currentTime);
    const today = currentTime.getDate();
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-xs font-bold gelato-border cursor-pointer hover:bg-purple-300 transition-colors ${
            day === today 
              ? 'bg-purple-400 text-white shadow-xl ring-4 ring-purple-600 ring-opacity-50 scale-110 z-10' 
              : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
          }`}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div 
      className={`min-h-screen gelato-bg relative overflow-hidden cursor-none ${isDarkMode ? 'dark-mode' : ''}`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Optimized Lofi Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mouse-following subtle orb - optimized for performance */}
        <div 
          className="absolute w-20 h-20 gelato-orb transition-transform duration-200 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 40,
            top: mousePosition.y - 40,
            transform: `scale(${isMouseMoving ? 1.05 : 1})`,
          }}
        />

        {/* Reduced floating elements for better performance */}
        <div className="absolute top-20 left-20 w-10 h-10 gelato-square animate-float-dreamy"></div>
        <div className="absolute bottom-32 right-1/3 w-12 h-12 gelato-circle animate-float-dreamy"></div>
        <div className="absolute top-1/2 right-1/4 w-10 h-10 gelato-diamond animate-float-dreamy"></div>
        <div className="absolute bottom-20 left-20 w-14 h-14 gelato-star animate-rotate-gentle"></div>
        
        {/* Reduced hearts for performance */}
        <div className="absolute inset-0">
          {[...Array(2)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute gelato-heart animate-float-dreamy hover:gelato-heart-active cursor-pointer"
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: `${30 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${20 + Math.random() * 5}s`
              }}
            >
              💜
            </div>
          ))}
        </div>

        {/* Reduced magical particles for performance */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 gelato-star animate-particle-magic hover:gelato-heart-active cursor-pointer"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 30}s`,
                animationDuration: `${30 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Cat Mascot - Main Character on the Right (Bigger Size) */}
      <div className="absolute top-1/4 right-20 z-10">
        <div 
          className="relative cursor-pointer"
          onMouseEnter={() => setCatHovered(true)}
          onMouseLeave={() => setCatHovered(false)}
        >
          <div 
            className={`transition-all duration-300 ${
              catHovered ? 'scale-110 -translate-y-2' : 'scale-100'
            }`}
          >
            <img 
              src="/KITTY_NO BG.PNG" 
              alt="Planet Purr Cat Mascot"
              className="w-48 h-48 object-contain animate-bounce-cute filter drop-shadow-lg"
              style={{
                filter: 'drop-shadow(4px 4px 8px rgba(138, 43, 226, 0.3))',
                imageRendering: 'pixelated'
              }}
            />
          </div>
          
          {/* Floating sparkles around the cat */}
          <div className="absolute -top-4 -right-4 text-2xl animate-pulse">✨</div>
          <div className="absolute -bottom-2 -left-2 text-xl animate-pulse">🌟</div>
          <div className="absolute top-2 -left-6 text-lg animate-pulse">💫</div>
          <div className="absolute -bottom-4 right-2 text-lg animate-pulse">⭐</div>
          
          {/* Interactive speech bubble when hovered */}
          {catHovered && (
            <div className="absolute -top-20 -left-12 bg-white border-4 border-purple-400 rounded-xl p-3 shadow-lg animate-fade-in z-20">
              <div className="text-purple-800 font-bold text-sm gelato-text whitespace-nowrap">
                Purr! Ready for adventure? 🐾✨
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-400"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Assets */}
      <div className="absolute bottom-32 right-32 z-10">
        <div className="text-5xl animate-float-dreamy cursor-pointer hover:scale-110 transition-transform duration-300">
          📚
        </div>
      </div>

      <div className="absolute top-32 right-1/3 z-10">
        <div className="text-4xl animate-float-dreamy cursor-pointer hover:scale-110 transition-transform duration-300" style={{ animationDelay: '2s' }}>
          🌍
        </div>
      </div>

      <div className="absolute bottom-40 left-1/3 z-10">
        <div className="text-3xl animate-float-dreamy cursor-pointer hover:scale-110 transition-transform duration-300" style={{ animationDelay: '4s' }}>
          💡
        </div>
      </div>

      {/* Interactive Project Title in Center */}
      <div className="absolute inset-0 flex items-center justify-center z-5 pointer-events-none">
        <div 
          className={`project-title-bg transition-all duration-500 ${titleHovered ? 'scale-110' : 'scale-100'}`}
          onMouseEnter={() => setTitleHovered(true)}
          onMouseLeave={() => setTitleHovered(false)}
          style={{ pointerEvents: 'auto' }}
        >
          <h1 className="project-title text-center">
            <div className="text-8xl font-bold mb-4">
              <span className="title-letter" style={{ animationDelay: '0s' }}>P</span>
              <span className="title-letter" style={{ animationDelay: '0.1s' }}>l</span>
              <span className="title-letter" style={{ animationDelay: '0.2s' }}>a</span>
              <span className="title-letter" style={{ animationDelay: '0.3s' }}>n</span>
              <span className="title-letter" style={{ animationDelay: '0.4s' }}>e</span>
              <span className="title-letter" style={{ animationDelay: '0.5s' }}>t</span>
              <span className="mx-4"></span>
              <span className="title-letter" style={{ animationDelay: '0.6s' }}>P</span>
              <span className="title-letter" style={{ animationDelay: '0.7s' }}>u</span>
              <span className="title-letter" style={{ animationDelay: '0.8s' }}>r</span>
              <span className="title-letter" style={{ animationDelay: '0.9s' }}>r</span>
            </div>
            <div className="text-xl mt-4 opacity-80">
              <span className="title-letter" style={{ animationDelay: '1s' }}>L</span>
              <span className="title-letter" style={{ animationDelay: '1.1s' }}>e</span>
              <span className="title-letter" style={{ animationDelay: '1.2s' }}>a</span>
              <span className="title-letter" style={{ animationDelay: '1.3s' }}>r</span>
              <span className="title-letter" style={{ animationDelay: '1.4s' }}>n</span>
              <span className="mx-2"></span>
              <span className="title-letter" style={{ animationDelay: '1.5s' }}>•</span>
              <span className="mx-2"></span>
              <span className="title-letter" style={{ animationDelay: '1.6s' }}>P</span>
              <span className="title-letter" style={{ animationDelay: '1.7s' }}>l</span>
              <span className="title-letter" style={{ animationDelay: '1.8s' }}>a</span>
              <span className="title-letter" style={{ animationDelay: '1.9s' }}>y</span>
              <span className="mx-2"></span>
              <span className="title-letter" style={{ animationDelay: '2s' }}>•</span>
              <span className="mx-2"></span>
              <span className="title-letter" style={{ animationDelay: '2.1s' }}>G</span>
              <span className="title-letter" style={{ animationDelay: '2.2s' }}>r</span>
              <span className="title-letter" style={{ animationDelay: '2.3s' }}>o</span>
              <span className="title-letter" style={{ animationDelay: '2.4s' }}>w</span>
            </div>
          </h1>
        </div>
      </div>

      {/* Desktop Icons - Positioned far left to avoid any overlap with center title */}
      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex gap-24">
          {/* Column 1 - 3 folders vertically */}
          <div className="flex flex-col gap-16">
            {displayedSDGs.slice(0, 3).map((sdg, index) => (
              <DesktopFolder
                key={sdg.id}
                sdg={sdg}
                onClick={() => handleFolderClick(sdg.id)}
                delay={index * 200}
              />
            ))}
          </div>
          
          {/* Column 2 - 1 folder + NGO folder vertically */}
          <div className="flex flex-col gap-16">
            {displayedSDGs.slice(3, 5).map((sdg, index) => (
              <DesktopFolder
                key={sdg.id}
                sdg={sdg}
                onClick={() => handleFolderClick(sdg.id)}
                delay={(index + 3) * 200}
              />
            ))}
            
            {/* NGO Hub Folder */}
            <div
              className="flex flex-col items-center cursor-pointer group animate-fade-in relative"
              style={{ animationDelay: '1000ms' }}
              onClick={handleNGOClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* NGO Folder Icon */}
              <div 
                className={`relative mb-4 transition-all duration-200 transform ${
                  isHovered ? 'scale-110 -translate-y-2' : 'scale-100'
                }`}
              >
                <div 
                  className={`w-20 h-20 cute-folder transition-all duration-200 flex items-center justify-center ${
                    isHovered ? 'shadow-2xl' : ''
                  }`}
                  style={{ 
                    background: 'linear-gradient(135deg, #10B98120, #059F6960)',
                  }}
                >
                  <div className="text-white text-xl" style={{ filter: 'drop-shadow(2px 2px 0px rgba(138, 43, 226, 0.5))' }}>
                    🌍
                  </div>
                </div>
                
                {/* NGO Folder Tab */}
                <div 
                  className="absolute -top-2 -right-2 w-8 h-6 cute-folder-tab"
                  style={{ 
                    background: 'linear-gradient(135deg, #059F6960, #047F5680)',
                  }}
                />

                {/* Sparkle Effect */}
                {isHovered && (
                  <>
                    <div className="absolute -top-2 -left-2 text-yellow-300 text-sm animate-pulse">✨</div>
                    <div className="absolute -bottom-2 -right-2 text-pink-300 text-sm animate-pulse">💫</div>
                  </>
                )}
              </div>

              {/* NGO Folder Label */}
              <div className="text-center max-w-24">
                <p className="text-sm font-bold text-purple-900 leading-tight gelato-text">
                  NGO Hub
                </p>
              </div>

              {/* NGO Info Popup */}
              {isHovered && (
                <div className="info-popup-optimized">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg bg-gradient-to-br from-green-500 to-teal-600">
                      🌍
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900 gelato-text">NGO Hub</h3>
                      <p className="text-sm text-purple-700 gelato-text">Action Center</p>
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 leading-relaxed gelato-text">
                    Discover amazing organizations working on SDGs! Find donation links, fun facts, and ways to make a real difference.
                  </p>
                  <div className="mt-3 flex items-center justify-center">
                    <span className="text-xs text-purple-500 gelato-text">Click to explore NGOs! 🚀</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Optimized Pixelated Sword Cursor */}
      <div 
        className="fixed w-4 h-4 cute-cursor pointer-events-none z-50 will-change-transform"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isMouseMoving ? 1.1 : 1}) translate3d(0,0,0)`,
        }}
      />

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed bottom-20 left-6 z-30 gelato-window animate-fade-in">
          <div className="gelato-titlebar flex items-center justify-between p-3">
            <span className="text-sm font-bold text-white gelato-text">⚙️ Settings</span>
            <button 
              onClick={() => setShowSettings(false)}
              className="w-6 h-6 gelato-close-btn hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-purple-800 gelato-text font-medium">Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-14 h-8 rounded-full transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                      : 'bg-gradient-to-r from-purple-200 to-purple-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-200 flex items-center justify-center ${
                    isDarkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}>
                    {isDarkMode ? (
                      <Moon className="w-3 h-3 text-purple-600" />
                    ) : (
                      <Sun className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                </button>
              </div>
              <div className="text-xs text-purple-600 gelato-text">
                Toggle between light and dark themes
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clock Widget */}
      {showClock && (
        <div className="fixed bottom-20 right-6 z-30 gelato-window animate-fade-in">
          <div className="gelato-titlebar flex items-center justify-between p-3">
            <span className="text-sm font-bold text-white gelato-text">🕐 Magical Clock</span>
            <button 
              onClick={() => setShowClock(false)}
              className="w-6 h-6 gelato-close-btn hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-800 gelato-text mb-3">
                {currentTime.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false 
                })}
              </div>
              <div className="text-xl text-purple-600 gelato-text">
                {currentTime.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </div>
              <div className="text-sm text-purple-500 mt-3 gelato-text">
                {currentTime.toLocaleDateString([], { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Widget */}
      {showCalendar && (
        <div className="fixed bottom-20 right-6 z-30 gelato-window animate-fade-in">
          <div className="gelato-titlebar flex items-center justify-between p-3">
            <span className="text-sm font-bold text-white gelato-text">📅 Dreamy Calendar</span>
            <button 
              onClick={() => setShowCalendar(false)}
              className="w-6 h-6 gelato-close-btn hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-center mb-4">
              <div className="text-xl font-bold text-purple-800 gelato-text">
                {currentTime.toLocaleDateString([], { 
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-bold text-purple-600 gelato-text">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>
        </div>
      )}

      {/* Gelato Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-18 gelato-taskbar flex items-center justify-between px-8 z-20">
        {/* Start Button */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={handleSettingsClick}
            className="gelato-start-btn group hover:scale-105 transition-all duration-200"
          >
            <div className="w-8 h-8 gelato-icon flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <span className="text-purple-900 font-bold text-sm gelato-text">✨ Planet Purr</span>
          </button>
          
          <button className="gelato-time-btn hover:scale-105 transition-all duration-200">
            <Search className="w-5 h-5 text-purple-800" />
          </button>
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleTimeClick}
            className="flex items-center space-x-2 text-purple-900 gelato-time-btn hover:scale-105 transition-all duration-200"
          >
            <Clock className="w-5 h-5" />
            <span className="text-sm font-bold gelato-text">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </span>
          </button>
          <button 
            onClick={handleDateClick}
            className="text-purple-800 text-sm gelato-date-btn hover:scale-105 transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span className="font-bold gelato-text">
                {currentTime.toLocaleDateString([], { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
