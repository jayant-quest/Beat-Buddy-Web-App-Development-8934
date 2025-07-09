import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiVolume2, FiVolumeX } = FiIcons;

const VolumeControl = ({ volume, onChange }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold mb-4 text-center">Volume</h3>
      
      <div className="flex items-center gap-3">
        <SafeIcon 
          icon={volume === 0 ? FiVolumeX : FiVolume2} 
          className="text-xl text-gray-400" 
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <span className="text-sm font-medium w-8 text-center">
          {Math.round(volume * 100)}
        </span>
      </div>
    </div>
  );
};

export default VolumeControl;