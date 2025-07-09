import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiList } = FiIcons;

const PatternSelector = ({ patterns, onSave, onLoad }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold mb-4 text-center">Patterns</h3>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSave}
        className="w-full py-3 mb-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-bold transition-all duration-200"
      >
        <SafeIcon icon={FiSave} className="inline mr-2" />
        Save Pattern
      </motion.button>

      <div className="space-y-2">
        {patterns.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No saved patterns</p>
        ) : (
          patterns.map((pattern) => (
            <motion.button
              key={pattern.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onLoad(pattern)}
              className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{pattern.name}</span>
                <span className="text-sm text-gray-400">{pattern.bpm} BPM</span>
              </div>
            </motion.button>
          ))
        )}
      </div>
    </div>
  );
};

export default PatternSelector;