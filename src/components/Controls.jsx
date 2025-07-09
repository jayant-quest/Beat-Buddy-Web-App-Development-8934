import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiPause, FiSquare, FiTrash2 } = FiIcons;

const Controls = ({ isPlaying, onPlay, onStop, onClear, bpm, onBpmChange }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold mb-4 text-center">Controls</h3>
      
      {/* Play/Pause and Stop buttons */}
      <div className="flex gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlay}
          className={`
            flex-1 py-3 rounded-lg font-bold transition-all duration-200
            ${isPlaying 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
              : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
            }
          `}
        >
          <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="inline mr-2" />
          {isPlaying ? 'Pause' : 'Play'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStop}
          className="px-4 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg transition-all duration-200"
        >
          <SafeIcon icon={FiSquare} className="text-xl" />
        </motion.button>
      </div>

      {/* BPM Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">BPM: {bpm}</label>
        <input
          type="range"
          min="60"
          max="180"
          value={bpm}
          onChange={(e) => onBpmChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Clear button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClear}
        className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg font-bold transition-all duration-200"
      >
        <SafeIcon icon={FiTrash2} className="inline mr-2" />
        Clear All
      </motion.button>
    </div>
  );
};

export default Controls;