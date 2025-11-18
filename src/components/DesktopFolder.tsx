import React, { useState } from 'react';

interface SDG {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  shortName: string;
}

interface DesktopFolderProps {
  sdg: SDG;
  onClick: () => void;
  delay: number;
}

const DesktopFolder: React.FC<DesktopFolderProps> = ({ sdg, onClick, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        className="flex flex-col items-center cursor-pointer group animate-fade-in relative"
        style={{ animationDelay: `${delay}ms` }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cute Folder Icon */}
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
              background: `linear-gradient(135deg, ${sdg.color}20, ${sdg.color}60)`,
            }}
          >
            <div className="text-white text-xl" style={{ filter: 'drop-shadow(2px 2px 0px rgba(138, 43, 226, 0.5))' }}>
              {sdg.icon}
            </div>
          </div>
          
          {/* Cute Folder Tab */}
          <div 
            className="absolute -top-2 -right-2 w-8 h-6 cute-folder-tab"
            style={{ 
              background: `linear-gradient(135deg, ${sdg.color}60, ${sdg.color}80)`,
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

        {/* Folder Label */}
        <div className="text-center max-w-24">
          <p className="text-sm font-bold text-purple-900 leading-tight gelato-text">
            {sdg.shortName}
          </p>
        </div>

        {/* Optimized Info Popup - positioned to avoid cutoff */}
        {isHovered && (
          <div className="info-popup-optimized">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: sdg.color }}
              >
                {sdg.icon}
              </div>
              <div>
                <h3 className="font-bold text-purple-900 gelato-text">SDG {sdg.id}</h3>
                <p className="text-sm text-purple-700 gelato-text">{sdg.title}</p>
              </div>
            </div>
            <p className="text-xs text-purple-600 leading-relaxed gelato-text">
              {sdg.description}
            </p>
            <div className="mt-3 flex items-center justify-center">
              <span className="text-xs text-purple-500 gelato-text">Click to start quiz! 🎯</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopFolder;