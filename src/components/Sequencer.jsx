import React from 'react';
import { motion } from 'framer-motion';

const Sequencer = ({ patterns, currentStep, onToggle, isPlaying }) => {
  const drumNames = Object.keys(patterns);

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Step numbers */}
          <div className="flex mb-4">
            <div className="w-24 flex-shrink-0"></div>
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className={`
                  flex-1 text-center text-sm font-bold py-2 mx-1 rounded
                  ${currentStep === i && isPlaying 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-gray-700 text-white'
                  }
                `}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Pattern rows */}
          {drumNames.map((drumName) => (
            <div key={drumName} className="flex items-center mb-3">
              <div className="w-24 flex-shrink-0 text-right pr-4">
                <span className="text-sm font-medium uppercase tracking-wide text-gray-300">
                  {drumName}
                </span>
              </div>
              {patterns[drumName].map((isActive, stepIndex) => (
                <motion.button
                  key={stepIndex}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggle(drumName, stepIndex)}
                  className={`
                    flex-1 h-8 mx-1 rounded transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' 
                      : 'bg-gray-600 hover:bg-gray-500'
                    }
                    ${currentStep === stepIndex && isPlaying 
                      ? 'ring-2 ring-yellow-400' 
                      : ''
                    }
                  `}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sequencer;