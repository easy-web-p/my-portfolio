'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface Idea {
  d1: string;
  d2: string;
  d3: string;
  text: string;
  category: string;
}

const INITIAL_IDEAS: Idea[] = [
  {
    d1: 'Computer Vision',
    d2: 'Micro-interactions',
    d3: 'Coffee Roasting',
    text: 'A thermal camera interface that renders real-time color-reactive convection vortexes during the first crack.',
    category: 'Sensory UI'
  },
  {
    d1: 'Spatial UI',
    d2: 'Real-time WebSockets',
    d3: 'Espresso Acoustics',
    text: 'An AI-powered espresso visualizer that maps acoustic extraction frequencies to generative vector waveforms.',
    category: 'Audio ML'
  },
  {
    d1: 'Generative Audio',
    d2: 'Design Tokens',
    d3: 'Climate Data',
    text: 'A sonified climate dashboard converting dynamic carbon offset micro-deltas into ambient modular synthesizer arpeggios.',
    category: 'Eco Tech'
  },
  {
    d1: 'Agentic Reasoning',
    d2: 'Shader Computations',
    d3: 'Analog Synthesizers',
    text: 'A patch cable assistant that models analog harmonic distortion through real-time raymarched GLSL ribbons.',
    category: 'DSP Agent'
  },
  {
    d1: 'Spatial UI',
    d2: 'Micro-interactions',
    d3: 'Urban Astronomy',
    text: 'A handheld sky-gazing HUD that uses tactile gyro haptics to guide telescopes toward celestial latent coordinates.',
    category: 'Cosmic UX'
  }
];

export default function PlaygroundPage() {
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [canvasNodes, setCanvasNodes] = useState([
    { id: 1, x: 50, y: 50, color: '#8B5CF6', r: 8, label: 'Vision' },
    { id: 2, x: 140, y: 110, color: '#baf54c', r: 10, label: 'Audio' },
    { id: 3, x: 230, y: 60, color: '#8455ef', r: 7, label: 'Agents' },
    { id: 4, x: 310, y: 130, color: '#466500', r: 9, label: 'Spatial' },
    { id: 5, x: 390, y: 70, color: '#d0bcff', r: 11, label: 'Latent' },
  ]);
  const [activeTheme, setActiveTheme] = useState<'default' | 'matrix' | 'sunset' | 'cyber'>('default');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const canvasRef = useRef<SVGSVGElement>(null);

  const handleRandomizeIdea = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setCurrentIdeaIndex((prev) => (prev + 1) % ideas.length);
      setIsSynthesizing(false);
    }, 300);
  };

  const handlePromptGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setIsSynthesizing(true);
    setTimeout(() => {
      const newIdea: Idea = {
        d1: 'Prompt Synthesis',
        d2: 'Interactive AI',
        d3: userPrompt.slice(0, 18),
        text: `A reactive system that transforms "${userPrompt}" into multi-sensory feedback loops powered by browser WebGPU shaders.`,
        category: 'Custom Prompt'
      };
      setIdeas([newIdea, ...ideas]);
      setCurrentIdeaIndex(0);
      setUserPrompt('');
      setIsSynthesizing(false);
    }, 500);
  };

  const handleShare = () => {
    const current = ideas[currentIdeaIndex];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`PhisitCode Idea: ${current.text}`);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  const currentIdea = ideas[currentIdeaIndex];

  return (
    <div className="w-full bg-background min-h-screen py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container-max mx-auto">
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary font-bold">Interactive Playground</span>
        </div>

        {/* Hero Title */}
        <div className="mb-10 pb-8 border-b border-surface-container-high flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
              <span>Creative Coding & Generative Lab</span>
            </div>
            <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface">
              Playful Playground
            </h1>
            <p className="mt-3 text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Experiment with latent prompt synthesizer, real-time node oscillators, and dynamic color matrixes. Click, drag, and prompt to explore serendipitous AI interactions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTheme(activeTheme === 'cyber' ? 'default' : 'cyber')}
              className="px-3.5 py-2 rounded-xl bg-surface-container text-xs font-bold hover:bg-surface-container-high transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">palette</span>
              <span>FX: {activeTheme === 'cyber' ? 'CYBER' : 'DEFAULT'}</span>
            </button>
            <Link
              href="/ai-lab"
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary/90 transition-all flex items-center gap-1.5"
            >
              <span>View Studies</span>
              <span className="material-symbols-outlined text-[16px]">science</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Generative Node Matrix (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-tertiary-fixed"></span>
                  <span className="font-mono text-xs text-on-surface-variant ml-2 uppercase">neural_cluster.canvas</span>
                </div>
                <span className="text-[11px] font-mono text-primary font-bold">FPS: 60 • NODES: 5</span>
              </div>

              {/* Interactive SVG Canvas */}
              <div className="relative w-full h-72 sm:h-80 bg-surface-container-low/60 dark:bg-surface-container-highest/20 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-outline-variant/15">
                <svg
                  ref={canvasRef}
                  viewBox="0 0 440 200"
                  className="w-full h-full select-none"
                >
                  {/* Neural Connection Lines */}
                  <g stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" className="text-primary">
                    <line x1={canvasNodes[0].x} y1={canvasNodes[0].y} x2={canvasNodes[1].x} y2={canvasNodes[1].y} />
                    <line x1={canvasNodes[0].x} y1={canvasNodes[0].y} x2={canvasNodes[2].x} y2={canvasNodes[2].y} />
                    <line x1={canvasNodes[1].x} y1={canvasNodes[1].y} x2={canvasNodes[2].x} y2={canvasNodes[2].y} />
                    <line x1={canvasNodes[1].x} y1={canvasNodes[1].y} x2={canvasNodes[3].x} y2={canvasNodes[3].y} />
                    <line x1={canvasNodes[2].x} y1={canvasNodes[2].y} x2={canvasNodes[4].x} y2={canvasNodes[4].y} />
                    <line x1={canvasNodes[3].x} y1={canvasNodes[3].y} x2={canvasNodes[4].x} y2={canvasNodes[4].y} />
                  </g>

                  {/* Interactive Nodes */}
                  {canvasNodes.map((node) => (
                    <g key={node.id} className="cursor-pointer group">
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r + 4}
                        fill={node.color}
                        opacity="0.2"
                        className="animate-ping"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill={node.color}
                        className="transition-transform group-hover:scale-125"
                      />
                      <text
                        x={node.x}
                        y={node.y + 18}
                        fill="currentColor"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="text-on-surface fill-current font-mono"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Floating stickers */}
                <div className="absolute top-3 left-4 -rotate-6 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  ✦ GENERATIVE
                </div>
                <div className="absolute bottom-3 right-4 rotate-3 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  🔮 REAL-TIME
                </div>
              </div>

              {/* Node Controller Sliders */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => {
                    setCanvasNodes(canvasNodes.map((n) => ({
                      ...n,
                      x: Math.max(30, Math.min(410, n.x + (Math.random() * 30 - 15))),
                      y: Math.max(30, Math.min(170, n.y + (Math.random() * 30 - 15)))
                    })));
                  }}
                  className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all text-center"
                >
                  ⚡ Perturb Nodes
                </button>
                <button
                  onClick={() => {
                    setCanvasNodes(canvasNodes.map((n) => ({
                      ...n,
                      r: Math.floor(Math.random() * 8) + 6
                    })));
                  }}
                  className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all text-center"
                >
                  🔮 Modulate Weight
                </button>
                <button
                  onClick={() => {
                    const colors = ['#8B5CF6', '#baf54c', '#8455ef', '#466500', '#ec4899', '#3b82f6'];
                    setCanvasNodes(canvasNodes.map((n) => ({
                      ...n,
                      color: colors[Math.floor(Math.random() * colors.length)]
                    })));
                  }}
                  className="px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all text-center"
                >
                  🎨 Re-Harmonize
                </button>
                <button
                  onClick={() => {
                    setCanvasNodes([
                      { id: 1, x: 50, y: 50, color: '#8B5CF6', r: 8, label: 'Vision' },
                      { id: 2, x: 140, y: 110, color: '#baf54c', r: 10, label: 'Audio' },
                      { id: 3, x: 230, y: 60, color: '#8455ef', r: 7, label: 'Agents' },
                      { id: 4, x: 310, y: 130, color: '#466500', r: 9, label: 'Spatial' },
                      { id: 5, x: 390, y: 70, color: '#d0bcff', r: 11, label: 'Latent' },
                    ]);
                  }}
                  className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-bold transition-all text-center"
                >
                  ↺ Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Imaginary Idea Synthesizer (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-lowest dark:bg-surface/80 rounded-3xl p-6 sm:p-8 border border-outline-variant/20 shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                    <span className="font-headline-sm text-base font-bold text-on-surface">Latent Idea Synthesizer</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                    {currentIdea.category}
                  </span>
                </div>

                {/* Synthesis Output Display */}
                <div className="p-5 rounded-2xl bg-surface-container-low/70 dark:bg-surface-container-highest/20 border border-outline-variant/15 relative min-h-[160px] flex flex-col justify-between">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 text-on-surface text-[10px] font-bold border border-outline-variant/20">
                      {currentIdea.d1}
                    </span>
                    <span className="text-on-surface-variant text-xs">+</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 text-on-surface text-[10px] font-bold border border-outline-variant/20">
                      {currentIdea.d2}
                    </span>
                    <span className="text-on-surface-variant text-xs">+</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-primary-container text-on-primary-container text-[10px] font-bold">
                      {currentIdea.d3}
                    </span>
                  </div>

                  <p className={`text-sm sm:text-base text-on-surface font-semibold leading-relaxed transition-opacity duration-200 ${isSynthesizing ? 'opacity-30' : 'opacity-100'}`}>
                    &ldquo;{currentIdea.text}&rdquo;
                  </p>

                  <div className="mt-4 pt-3 border-t border-outline-variant/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-on-surface-variant font-mono">Concept #{currentIdeaIndex + 1} of {ideas.length}</span>
                    <button
                      onClick={handleShare}
                      className="text-primary font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      <span>{copiedNotification ? 'Copied!' : 'Copy Idea'}</span>
                    </button>
                  </div>
                </div>

                {/* Synthesizer Trigger Button */}
                <button
                  onClick={handleRandomizeIdea}
                  disabled={isSynthesizing}
                  className="mt-4 w-full py-3 rounded-xl bg-primary text-white text-xs font-bold shadow-hard-3 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-hard-4 active:translate-x-0 active:translate-y-0 active:shadow-hard-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">casino</span>
                  <span>Synthesize Next Concept</span>
                </button>
              </div>

              {/* Prompt Input Box */}
              <div className="mt-8 pt-6 border-t border-surface-container">
                <form onSubmit={handlePromptGenerate}>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Or Inject Your Custom Domain:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="e.g. Vintage synths, Mycology, Tokyo subways..."
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20 focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant/60 font-medium"
                    />
                    <button
                      type="submit"
                      disabled={isSynthesizing || !userPrompt.trim()}
                      className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-primary hover:text-white text-on-surface text-xs font-bold transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      Generate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
