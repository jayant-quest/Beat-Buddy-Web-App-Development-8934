import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCircle, FiPlay, FiMusic, FiZap, FiTarget, FiSun, FiMoon, FiStar } = FiIcons;

const DRUM_ICONS = {
  kick: FiCircle,
  snare: FiZap,
  hihat: FiSun,
  openhat: FiMoon,
  crash: FiStar,
  ride: FiTarget,
  tom1: FiPlay,
  tom2: FiMusic
};

const DRUM_COLORS = {
  kick: 'from-red-500 to-red-700',
  snare: 'from-yellow-500 to-yellow-700',
  hihat: 'from-green-500 to-green-700',
  openhat: 'from-blue-500 to-blue-700',
  crash: 'from-purple-500 to-purple-700',
  ride: 'from-pink-500 to-pink-700',
  tom1: 'from-indigo-500 to-indigo-700',
  tom2: 'from-orange-500 to-orange-700'
};

const DrumPad = ({ name, onPlay, isActive }) => {
  const Icon = DRUM_ICONS[name] || FiCircle;
  const colorClass = DRUM_COLORS[name] || 'from-gray-500 to-gray-700';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.1 }}
      onClick={onPlay}
      className={`
        relative w-20 h-20 rounded-full bg-gradient-to-br ${colorClass}
        shadow-lg hover:shadow-xl transition-all duration-200
        flex items-center justify-center text-white font-bold
        border-2 border-white/20 hover:border-white/40
        ${isActive ? 'ring-4 ring-white/50' : ''}
      `}
    >
      <SafeIcon icon={Icon} className="text-2xl" />
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-medium uppercase tracking-wide">
          {name}
        </span>
      </div>
    </motion.button>
  );
};

export default DrumPad;