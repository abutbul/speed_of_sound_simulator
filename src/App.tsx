import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Volume2, Play, RotateCcw, Info, MapPin, 
  Sun, CloudRain, CloudLightning, Thermometer, 
  Waves, Rocket, Ghost, Music, Fish, Gem, Anchor
} from 'lucide-react';

type Environment = 'sunny' | 'rainy' | 'stormy' | 'mars' | 'underwater' | 'venus' | 'diamond' | 'space';
type SoundSample = 'bell' | 'thunder' | 'explosion' | 'ping';

interface ThemeConfig {
  name: string;
  bg: string;
  card: string;
  accent: string;
  text: string;
  icon: any;
  description: string;
}

const THEMES: Record<Environment, ThemeConfig> = {
  sunny: {
    name: 'Sunny Earth',
    bg: 'bg-sky-900',
    card: 'bg-sky-950/50',
    accent: 'text-yellow-400',
    text: 'text-sky-100',
    icon: Sun,
    description: 'Standard atmospheric conditions on a clear day.'
  },
  rainy: {
    name: 'Rainy Earth',
    bg: 'bg-slate-900',
    card: 'bg-slate-950/50',
    accent: 'text-blue-400',
    text: 'text-slate-100',
    icon: CloudRain,
    description: 'Humid air slightly affects sound propagation.'
  },
  stormy: {
    name: 'Stormy Earth',
    bg: 'bg-indigo-950',
    card: 'bg-indigo-900/30',
    accent: 'text-purple-400',
    text: 'text-indigo-100',
    icon: CloudLightning,
    description: 'Lightning strikes! Hear the thunder roll.'
  },
  mars: {
    name: 'Mars Surface',
    bg: 'bg-orange-950',
    card: 'bg-orange-900/30',
    accent: 'text-red-500',
    text: 'text-orange-100',
    icon: Rocket,
    description: 'Thin CO2 atmosphere. Sound travels much slower here.'
  },
  underwater: {
    name: 'Ocean Depths',
    bg: 'bg-cyan-950',
    card: 'bg-cyan-900/30',
    accent: 'text-cyan-400',
    text: 'text-cyan-100',
    icon: Waves,
    description: 'Water is dense. Sound travels ~4.3x faster than in air.'
  },
  venus: {
    name: 'Venus Surface',
    bg: 'bg-yellow-950',
    card: 'bg-yellow-900/40',
    accent: 'text-orange-400',
    text: 'text-yellow-100',
    icon: Sun,
    description: 'Super-critical CO2. Thick atmosphere makes sound travel at ~410 m/s.'
  },
  diamond: {
    name: 'Diamond Planet',
    bg: 'bg-emerald-950',
    card: 'bg-emerald-900/30',
    accent: 'text-emerald-300',
    text: 'text-emerald-50',
    icon: Gem,
    description: 'Solid diamond. Sound travels at a staggering 18,000 m/s!'
  },
  space: {
    name: 'Deep Space',
    bg: 'bg-black',
    card: 'bg-zinc-900/50',
    accent: 'text-zinc-500',
    text: 'text-zinc-100',
    icon: Ghost,
    description: 'A vacuum. In space, no one can hear you scream.'
  }
};

const Raindrops = () => {
  const drops = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 0.6 + Math.random() * 0.4,
    opacity: 0.1 + Math.random() * 0.3,
    scale: 0.5 + Math.random() * 0.5,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: -100 }}
          animate={{ y: '110vh' }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear",
          }}
          style={{
            left: drop.left,
            opacity: drop.opacity,
            scale: drop.scale,
          }}
          className="absolute w-[1px] h-10 bg-blue-200/40"
        />
      ))}
    </div>
  );
};

const Sunshine = () => {
  return (
    <div className="fixed top-[-150px] right-[-150px] pointer-events-none z-0">
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          rotate: 360,
        }}
        transition={{
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
        }}
        className="relative w-[600px] h-[600px] rounded-full bg-yellow-400/10 blur-[100px]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-[800px] bg-gradient-to-t from-transparent via-yellow-400/5 to-transparent"
              style={{ transform: `rotate(${i * 22.5}deg)` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Underwater = () => {
  const bubbles = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 10,
    size: 4 + Math.random() * 12,
  })), []);

  const fishList = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    top: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 20,
    duration: 20 + Math.random() * 25,
    size: 16 + Math.random() * 24,
    direction: Math.random() > 0.5 ? 1 : -1,
    opacity: 0.1 + Math.random() * 0.3,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-cyan-950/20 to-blue-950/40">
      {/* Anchors at the bottom */}
      <div className="absolute bottom-10 left-20 opacity-10 text-cyan-200 rotate-12">
        <Anchor size={120} />
      </div>
      <div className="absolute bottom-40 right-40 opacity-5 text-cyan-200 -rotate-12">
        <Anchor size={80} />
      </div>

      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 0.4, 0] }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
          }}
          className="absolute rounded-full border border-cyan-200/40 bg-white/5 backdrop-blur-[1px]"
        />
      ))}
      
      {fishList.map((fish) => (
        <motion.div
          key={fish.id}
          initial={{ x: fish.direction > 0 ? '-10vw' : '110vw' }}
          animate={{ 
            x: fish.direction > 0 ? '110vw' : '-10vw',
            y: [0, 15, -15, 0] 
          }}
          transition={{
            x: { duration: fish.duration, repeat: Infinity, delay: fish.delay, ease: "linear" },
            y: { duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            top: fish.top,
            opacity: fish.opacity,
            scaleX: fish.direction,
          }}
          className="absolute text-cyan-400"
        >
          <Fish size={fish.size} />
        </motion.div>
      ))}
    </div>
  );
};

const DiamondPattern = () => {
  const shards = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 20,
    size: 20 + Math.random() * 40,
    rotate: Math.random() * 360,
    opacity: 0.05 + Math.random() * 0.15,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Geometric Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(16,185,129,0.05)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[length:60px_60px]" />
      
      {shards.map((shard) => (
        <motion.div
          key={shard.id}
          initial={{ opacity: 0, scale: 0.5, rotate: shard.rotate }}
          animate={{ 
            opacity: [0, shard.opacity, 0],
            scale: [0.8, 1.2, 0.8],
            rotate: shard.rotate + 360,
            y: [0, -40, 0]
          }}
          transition={{
            duration: shard.duration,
            repeat: Infinity,
            delay: shard.delay,
            ease: "easeInOut",
          }}
          style={{
            left: shard.left,
            top: shard.top,
          }}
          className="absolute text-emerald-400/30"
        >
          <Gem size={shard.size} />
        </motion.div>
      ))}

      {/* Central Pulsing Fractal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative w-[600px] h-[600px] border border-emerald-500/10 rounded-full flex items-center justify-center"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full border border-emerald-500/5"
              style={{ transform: `rotate(${i * 30}deg) scale(${1 - i * 0.1})` }}
            />
          ))}
          <Gem size={120} className="text-emerald-400/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default function App() {
  const [env, setEnv] = useState<Environment>('sunny');
  const [temp, setTemp] = useState<number>(20); // Celsius
  const [distance, setDistance] = useState<number>(1000); // meters
  const [sample, setSample] = useState<SoundSample>('bell');
  
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [hasHeardSound, setHasHeardSound] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Calculate speed of sound based on environment and temperature
  const speedOfSound = useMemo(() => {
    switch (env) {
      case 'underwater': return 1480;
      case 'mars': return 240;
      case 'venus': return 410;
      case 'diamond': return 18000;
      case 'space': return 0.000001; // Effectively zero
      default:
        // Earth air formula: v = 331.3 + 0.606 * T
        return 331.3 + (0.606 * temp);
    }
  }, [env, temp]);

  const targetTime = distance / speedOfSound;
  const theme = THEMES[env];

  // Auto-select sample based on weather
  useEffect(() => {
    if (env === 'stormy' || env === 'rainy') {
      setSample('thunder');
    } else if (env === 'underwater') {
      setSample('ping');
    } else {
      setSample('bell');
    }
  }, [env]);

  const playSound = useCallback(() => {
    if (env === 'space') return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(0.5, ctx.currentTime);

    if (sample === 'bell') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.5, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } else if (sample === 'thunder') {
      // Thunder synthesis: Low frequency noise
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 2);
      
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.1);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
      
      noise.connect(filter);
      filter.connect(g);
      g.connect(masterGain);
      noise.start();
      noise.stop(ctx.currentTime + 3);
    } else if (sample === 'explosion') {
      const g = ctx.createGain();
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 1);
      g.gain.setValueAtTime(0.8, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 1.5);
    } else if (sample === 'ping') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.3, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  }, [sample, env]);

  const handleStart = () => {
    setIsRunning(true);
    setElapsedTime(0);
    setHasHeardSound(false);
    setShowFlash(true);
    
    // Lightning effect for stormy weather
    if (env === 'stormy') {
      // Strobe effect
      setTimeout(() => setShowFlash(false), 50);
      setTimeout(() => setShowFlash(true), 100);
      setTimeout(() => setShowFlash(false), 150);
    } else {
      setTimeout(() => setShowFlash(false), 200);
    }

    const startTime = performance.now();
    
    const updateTimer = () => {
      const now = performance.now();
      const delta = (now - startTime) / 1000;
      
      if (env === 'space') {
        setElapsedTime(delta);
        if (delta > 10) { // Just stop after 10s in space
           setIsRunning(false);
           if (timerRef.current) cancelAnimationFrame(timerRef.current);
        } else {
           timerRef.current = requestAnimationFrame(updateTimer);
        }
        return;
      }

      if (delta >= targetTime) {
        setElapsedTime(targetTime);
        setIsRunning(false);
        setHasHeardSound(true);
        playSound();
        if (timerRef.current) cancelAnimationFrame(timerRef.current);
      } else {
        setElapsedTime(delta);
        timerRef.current = requestAnimationFrame(updateTimer);
      }
    };
    
    timerRef.current = requestAnimationFrame(updateTimer);
  };

  const handleReset = () => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setIsRunning(false);
    setElapsedTime(0);
    setHasHeardSound(false);
    setShowFlash(false);
  };

  return (
    <motion.div 
      animate={{ backgroundColor: env === 'space' ? '#000' : undefined }}
      className={`min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-1000 ${theme.bg} overflow-x-hidden`}
    >
      {/* Background Effects */}
      {(env === 'rainy' || env === 'stormy') && <Raindrops />}
      {env === 'sunny' && <Sunshine />}
      {env === 'underwater' && <Underwater />}
      {env === 'diamond' && <DiamondPattern />}

      {/* Background Flash Effect */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 pointer-events-none ${env === 'stormy' ? 'bg-indigo-100' : 'bg-white'}`}
          />
        )}
      </AnimatePresence>

      <div className="w-full max-w-4xl z-10">
        <header className="text-center mb-8">
          <motion.h1 
            layout
            className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2 italic"
          >
            SONIC <span className={theme.accent}>VS</span> LIGHT
          </motion.h1>
          <motion.p layout className={`${theme.text} opacity-80 font-medium`}>
            {theme.name}: {theme.description}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel: Controls */}
          <main className={`lg:col-span-8 ${theme.card} border border-white/10 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-8`}>
            
            {/* Environment Selector */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                Environment / Theme
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {(Object.keys(THEMES) as Environment[]).map((key) => {
                  const T = THEMES[key];
                  const Icon = T.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setEnv(key)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                        env === key 
                          ? `bg-white text-black border-white scale-105 shadow-xl` 
                          : `bg-white/5 border-white/10 text-white hover:bg-white/10`
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-[10px] mt-2 font-bold truncate w-full text-center">{T.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Distance & Temp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                    <MapPin size={14} /> Distance
                  </label>
                  <span className={`text-2xl font-mono font-black ${theme.accent}`}>
                    {(distance / 1000).toFixed(2)} <span className="text-xs opacity-50">km</span>
                  </span>
                </div>
                <input
                  type="range" min="100" max="10000" step="100"
                  value={distance} onChange={(e) => setDistance(Number(e.target.value))}
                  disabled={isRunning}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 flex items-center gap-2">
                    <Thermometer size={14} /> Temperature
                  </label>
                  <span className={`text-2xl font-mono font-black ${theme.accent}`}>
                    {temp} <span className="text-xs opacity-50">°C</span>
                  </span>
                </div>
                <input
                  type="range" min="-50" max="50" step="1"
                  value={temp} onChange={(e) => setTemp(Number(e.target.value))}
                  disabled={isRunning || env === 'underwater' || env === 'space'}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-white disabled:opacity-20"
                />
              </div>
            </div>

            {/* Simulation Area */}
            <div className="relative h-56 bg-black/40 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden group">
              {/* Background Elements based on Env */}
              {env === 'rainy' && (
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="animate-pulse bg-[radial-gradient(circle,transparent_20%,#fff_20%,#fff_21%,transparent_21%)] bg-[length:20px_20px]" />
                </div>
              )}
              
              {/* Observer */}
              <div className="absolute right-12 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${theme.accent.replace('text-', 'bg-')}`} />
                </div>
                <span className="text-[10px] opacity-40 mt-2 font-black uppercase tracking-widest">Observer</span>
              </div>

              {/* Source */}
              <div className="absolute left-12 flex flex-col items-center">
                <motion.div 
                  animate={isRunning ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                  className={`w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md`}
                >
                  {env === 'stormy' ? <CloudLightning size={32} className={theme.accent} /> : <Zap size={32} className={theme.accent} />}
                </motion.div>
                <span className="text-[10px] opacity-40 mt-2 font-black uppercase tracking-widest">Source</span>
              </div>

              {/* Sound Wave Animation */}
              {isRunning && env !== 'space' && (
                <motion.div
                  initial={{ left: "15%", opacity: 0 }}
                  animate={{ left: "80%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: targetTime, ease: "linear" }}
                  className="absolute top-1/2 -translate-y-1/2 flex gap-2"
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [20, 60, 20], opacity: [0.2, 0.8, 0.2] }}
                      transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }}
                      className={`w-1.5 bg-white/30 rounded-full`}
                    />
                  ))}
                </motion.div>
              )}

              {/* Results Overlay */}
              <AnimatePresence>
                {hasHeardSound && (
                  <motion.div 
                    initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                    animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/5"
                  >
                    <motion.div 
                      initial={{ y: 20, scale: 0.9 }}
                      animate={{ y: 0, scale: 1 }}
                      className="text-center"
                    >
                      <div className={`w-20 h-20 rounded-full ${theme.accent.replace('text-', 'bg-')} flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
                        <Volume2 size={40} className="text-black" />
                      </div>
                      <p className="text-2xl font-black text-white uppercase tracking-tighter italic">Impact Detected</p>
                      <p className="text-xs opacity-50 font-mono mt-1">Delay: {elapsedTime.toFixed(4)}s</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {env === 'space' && isRunning && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <p className="text-zinc-500 font-mono text-xs animate-pulse">VACUUM DETECTED: SOUND CANNOT PROPAGATE</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {!isRunning && !hasHeardSound ? (
                <button
                  onClick={handleStart}
                  className="flex-1 bg-white text-black font-black py-5 px-8 rounded-3xl transition-all flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-95 uppercase tracking-tighter text-xl italic"
                >
                  <Play size={24} fill="currentColor" /> Initiate
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-black py-5 px-8 rounded-3xl transition-all flex items-center justify-center gap-3 active:scale-95 uppercase tracking-tighter text-xl italic border border-white/10"
                >
                  <RotateCcw size={24} /> Reset
                </button>
              )}
            </div>
          </main>

          {/* Right Panel: Stats & Samples */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Sound Sample Selector */}
            <div className={`${theme.card} border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-2xl`}>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 flex items-center gap-2 mb-4">
                <Music size={14} /> Sound Sample
              </label>
              <div className="space-y-2">
                {(['bell', 'thunder', 'explosion', 'ping'] as SoundSample[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSample(s)}
                    disabled={isRunning}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      sample === s 
                        ? `bg-white text-black border-white` 
                        : `bg-white/5 border-white/10 text-white hover:bg-white/10`
                    }`}
                  >
                    <span className="font-bold capitalize">{s}</span>
                    {sample === s && <div className="w-2 h-2 rounded-full bg-black animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Physics Stats */}
            <div className={`${theme.card} border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-2xl space-y-6`}>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 block mb-1">Speed of Sound</label>
                <div className="text-3xl font-mono font-black text-white">
                  {speedOfSound.toFixed(1)} <span className="text-xs opacity-50">m/s</span>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 block mb-1">Current Progress</label>
                <div className={`text-3xl font-mono font-black ${theme.accent}`}>
                  {elapsedTime.toFixed(3)} <span className="text-xs opacity-50">s</span>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 block mb-1">Expected Arrival</label>
                <div className="text-3xl font-mono font-black text-white/40">
                  {env === 'space' ? '∞' : targetTime.toFixed(3)} <span className="text-xs opacity-50">s</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Pro Tip */}
        <footer className="mt-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
            Physics Engine v2.0 • Real-time Wave Propagation
          </p>
        </footer>
      </div>
    </motion.div>
  );
}
