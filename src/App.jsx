import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DrumPad from './components/DrumPad';
import Sequencer from './components/Sequencer';
import Controls from './components/Controls';
import VolumeControl from './components/VolumeControl';
import PatternSelector from './components/PatternSelector';
import './App.css';

const DRUM_SOUNDS = {
  kick: '/sounds/kick.wav',
  snare: '/sounds/snare.wav',
  hihat: '/sounds/hihat.wav',
  openhat: '/sounds/openhat.wav',
  crash: '/sounds/crash.wav',
  ride: '/sounds/ride.wav',
  tom1: '/sounds/tom1.wav',
  tom2: '/sounds/tom2.wav'
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(0.7);
  const [patterns, setPatterns] = useState({
    kick: Array(16).fill(false),
    snare: Array(16).fill(false),
    hihat: Array(16).fill(false),
    openhat: Array(16).fill(false),
    crash: Array(16).fill(false),
    ride: Array(16).fill(false),
    tom1: Array(16).fill(false),
    tom2: Array(16).fill(false)
  });
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [savedPatterns, setSavedPatterns] = useState([]);
  
  const audioContextRef = useRef(null);
  const audioBuffersRef = useRef({});
  const intervalRef = useRef(null);

  useEffect(() => {
    initializeAudio();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const stepDuration = (60 / bpm / 4) * 1000;
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => (prev + 1) % 16);
      }, stepDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, bpm]);

  useEffect(() => {
    if (isPlaying) {
      playCurrentStep();
    }
  }, [currentStep, isPlaying]);

  const initializeAudio = async () => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      
      // Load drum sounds (we'll simulate with oscillators since we don't have actual audio files)
      for (const [key, url] of Object.entries(DRUM_SOUNDS)) {
        audioBuffersRef.current[key] = await createDrumSound(key);
      }
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  };

  const createDrumSound = async (type) => {
    // Create synthetic drum sounds using Web Audio API
    const context = audioContextRef.current;
    const buffer = context.createBuffer(1, context.sampleRate * 0.5, context.sampleRate);
    const data = buffer.getChannelData(0);
    
    switch (type) {
      case 'kick':
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.sin(2 * Math.PI * (60 - i * 0.01) * i / context.sampleRate) * Math.exp(-i * 0.0001);
        }
        break;
      case 'snare':
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i * 0.001) * Math.sin(2 * Math.PI * 200 * i / context.sampleRate);
        }
        break;
      case 'hihat':
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i * 0.01);
        }
        break;
      default:
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.sin(2 * Math.PI * 440 * i / context.sampleRate) * Math.exp(-i * 0.005);
        }
    }
    
    return buffer;
  };

  const playSound = (soundName, gain = 1) => {
    if (!audioContextRef.current || !audioBuffersRef.current[soundName]) return;
    
    const source = audioContextRef.current.createBufferSource();
    const gainNode = audioContextRef.current.createGain();
    
    source.buffer = audioBuffersRef.current[soundName];
    gainNode.gain.value = volume * gain;
    
    source.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    source.start();
  };

  const playCurrentStep = () => {
    Object.keys(patterns).forEach(soundName => {
      if (patterns[soundName][currentStep]) {
        playSound(soundName);
      }
    });
  };

  const togglePattern = (soundName, step) => {
    setPatterns(prev => ({
      ...prev,
      [soundName]: prev[soundName].map((active, index) => 
        index === step ? !active : active
      )
    }));
  };

  const clearPattern = () => {
    setPatterns(prev => 
      Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: Array(16).fill(false)
      }), {})
    );
  };

  const savePattern = () => {
    const newPattern = {
      id: Date.now(),
      name: `Pattern ${savedPatterns.length + 1}`,
      patterns: { ...patterns },
      bpm
    };
    setSavedPatterns(prev => [...prev, newPattern]);
  };

  const loadPattern = (pattern) => {
    setPatterns(pattern.patterns);
    setBpm(pattern.bpm);
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Beat Buddy
          </h1>
          <p className="text-xl text-gray-300">Create amazing beats with your web browser</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Drum Pads */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Drum Pads</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(DRUM_SOUNDS).map((soundName) => (
                <DrumPad
                  key={soundName}
                  name={soundName}
                  onPlay={() => playSound(soundName)}
                  isActive={patterns[soundName][currentStep] && isPlaying}
                />
              ))}
            </div>
          </motion.div>

          {/* Sequencer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Step Sequencer</h2>
            <Sequencer
              patterns={patterns}
              currentStep={currentStep}
              onToggle={togglePattern}
              isPlaying={isPlaying}
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            <Controls
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(!isPlaying)}
              onStop={() => {
                setIsPlaying(false);
                setCurrentStep(0);
              }}
              onClear={clearPattern}
              bpm={bpm}
              onBpmChange={setBpm}
            />
            
            <VolumeControl
              volume={volume}
              onChange={setVolume}
            />
            
            <PatternSelector
              patterns={savedPatterns}
              onSave={savePattern}
              onLoad={loadPattern}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;