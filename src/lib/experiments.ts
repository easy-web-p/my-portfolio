export interface Experiment {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  topic: 'Computer Vision' | 'Generative Audio' | 'Agentic Reasoning' | 'Spatial UI' | 'Latent Vectors';
  status: 'TRAINING' | 'EXPERIMENTAL' | 'COMPLETED' | 'SURPRISINGLY WORKS';
  date: string;
  badgeColor: string;
  researchQuestion: string;
  objective: string;
  dataset: string;
  model: string;
  methodology: string;
  implementation: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  limitations: string[];
  responsibleAI: string;
  lessonsLearned: string[];
  demoUrl?: string;
  githubUrl?: string;
  relatedArticleSlug?: string;
  relatedProductSlug?: string;
  coverGradient: string;
  tags: string[];
}

export const EXPERIMENTS_DATA: Experiment[] = [
  {
    id: 'exp-01',
    slug: 'thermal-convection-vision',
    title: 'Thermal Convection Vortexes in First-Crack Roasting',
    tagline: 'Real-time color-reactive convection vector fields derived from FLIR radiometric video streams.',
    topic: 'Computer Vision',
    status: 'SURPRISINGLY WORKS',
    date: 'August 2026',
    badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    researchQuestion: 'Can low-cost radiometric infrared sensors infer microscopic bean moisture phase transitions via optical flow vorticity?',
    objective: 'Develop an in-browser WebGL vector shader that converts thermal thermal gradients into predictive audible micro-crack cues.',
    dataset: '240 GB FLIR Radiometric thermal captures recorded across 42 specialty Geisha roast batches.',
    model: 'YOLOv10-Nano + custom OpenCV Dense Lucas-Kanade Optical Flow pipeline compiled to WebAssembly.',
    methodology: 'Normalized radiometric temperature deltas sampled at 60 Hz mapped into vector field directional divergence calculations.',
    implementation: 'Next.js 15, WebGL 2.0 Fragment Shaders, WebAssembly C++ OpenCV kernel, Web Audio API.',
    results: [
      { metric: 'Latency', value: '14.2ms', description: 'End-to-end edge inference on Apple M3 / RTX 4070' },
      { metric: 'Accuracy', value: '94.8%', description: 'First-crack timing prediction accuracy within 2.5s window' },
      { metric: 'FPS', value: '60 FPS', description: 'Fluid WebGL fluid-dynamics ribbon rendering' }
    ],
    limitations: [
      'Sensor calibration degrades slightly above 240°C chamber ambient temperature without active heatsinks.',
      'Smoky roasting environments necessitate periodic lens optical cleans.'
    ],
    responsibleAI: 'Open-sourced calibration profiles and deterministic local-only processing without external telemetry leaks.',
    lessonsLearned: [
      'Color-reactive vorticity visualizers help roasters develop intuitive tactile timing much faster than static numerical thermometers.',
      'WebAssembly vector math outperforms Web Worker canvas operations by 4.2x.'
    ],
    demoUrl: '/#playground',
    githubUrl: 'https://github.com/easy-web-p',
    relatedArticleSlug: 'crafting-playful-ai-interfaces',
    relatedProductSlug: 'neural-canvas-pro',
    coverGradient: 'from-purple-900/60 via-indigo-900/40 to-slate-900/80',
    tags: ['WebGL', 'Computer Vision', 'WebAssembly', 'Coffee Roasting', 'Edge AI']
  },
  {
    id: 'exp-02',
    slug: 'sonified-carbon-synthesizer',
    title: 'Ambient Carbon Micro-Delta Modular Sonification',
    tagline: 'Converting live dynamic carbon grid offsets into harmonically calibrated generative synthesizer arpeggios.',
    topic: 'Generative Audio',
    status: 'COMPLETED',
    date: 'July 2026',
    badgeColor: 'bg-primary/15 text-primary border-primary/30',
    researchQuestion: 'How can audio perceptual immersion promote continuous subconscious awareness of electrical grid carbon intensity without visual fatigue?',
    objective: 'Design a polyphonic generative synthesizer driven directly by CAISO & ENTSO-E 5-minute renewable dispatch WebSockets.',
    dataset: 'Real-time grid marginal emissions intensity API streams across 14 global regional dispatch territories.',
    model: 'Markov harmonic chain probabilistic transitions guided by marginal carbon intensity gradients.',
    methodology: 'Sub-bass octaves map to coal/gas baseline baseload; shimmering additive FM bell harmonics resonate when renewable curtailment peaks.',
    implementation: 'Tone.js, Web Audio DSP custom nodes, Server-Sent Events (SSE) edge stream cache.',
    results: [
      { metric: 'Perceptual Recall', value: '86%', description: 'Users reported spontaneous awareness of clean energy windows' },
      { metric: 'Bandwidth', value: '< 2 KB/s', description: 'Ultra-lightweight real-time algorithmic synthesis' },
      { metric: 'Polyphony', value: '16 voices', description: 'Zero glitching under multi-tab background throttling' }
    ],
    limitations: [
      'Some high-latency mobile browsers throttle Web Audio background nodes when screens lock.',
      'Acoustic ambient music requires headphone or spatial speaker setups for ideal low-frequency resolution.'
    ],
    responsibleAI: 'Neutral transparency without guilt-driven gamification; uses certified government electrical authority meters.',
    lessonsLearned: [
      'Subtle harmonic micro-detuning communicates urgency far more pleasantly than obnoxious warning siren buzzers.'
    ],
    demoUrl: '/#playground',
    githubUrl: 'https://github.com/easy-web-p',
    relatedArticleSlug: 'ai-agents-micro-saas-guide',
    relatedProductSlug: 'agent-orchestrator-kit',
    coverGradient: 'from-emerald-900/60 via-teal-900/40 to-slate-900/80',
    tags: ['Web Audio', 'Generative Audio', 'Climate Data', 'Tone.js', 'Real-time']
  },
  {
    id: 'exp-03',
    slug: 'analog-patch-cable-agent',
    title: 'Harmonic Distortion GLSL Ribbon Assistant',
    tagline: 'An agentic sound design co-pilot that models analog harmonic saturation through real-time raymarched ribbons.',
    topic: 'Agentic Reasoning',
    status: 'EXPERIMENTAL',
    date: 'September 2026',
    badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    researchQuestion: 'Can multi-modal LLMs reason over audio spectral transfer curves and suggest exact patch cable routing combinations in Eurorack systems?',
    objective: 'Provide an intelligent interactive patch assistant that bridges tactile hardware synthesis with mathematical DSP simulations.',
    dataset: '1,400 curated Eurorack module circuit schematics and harmonic distortion impulse response transfers.',
    model: 'Claude 3.5 Sonnet + Custom Few-shot DSP Function Calling Schema.',
    methodology: 'Users describe desired timbre ("warm tape flutter with brittle metallic overtones") and the agent generates precise CV routing tables + GLSL ribbon visuals.',
    implementation: 'Next.js, Three.js GLSL shaders, LangChain tool calling, WebSockets.',
    results: [
      { metric: 'Routing Accuracy', value: '89.2%', description: 'Valid voltage-safe patch suggestions' },
      { metric: 'Shader Perf', value: '120 FPS', description: 'GPU raymarching on modern mobile & desktop chipsets' }
    ],
    limitations: [
      'Complex feedback loop patches can cause self-oscillation outside simulated safety ranges.',
      'Requires user to input their exact physical module inventory.'
    ],
    responsibleAI: 'Built-in voltage clipper checks prevent simulated high-amplitude signal recommendations from blowing studio monitors.',
    lessonsLearned: [
      'Raymarched 3D ribbons provide instant visual feedback on timbre harmonics far better than traditional 2D spectrogram bars.'
    ],
    demoUrl: '/#playground',
    githubUrl: 'https://github.com/easy-web-p',
    relatedArticleSlug: 'crafting-playful-ai-interfaces',
    relatedProductSlug: 'neural-canvas-pro',
    coverGradient: 'from-violet-900/60 via-fuchsia-900/40 to-slate-900/80',
    tags: ['Agentic AI', 'Eurorack', 'DSP', 'GLSL Raymarching', 'Sound Design']
  },
  {
    id: 'exp-04',
    slug: 'spatial-telescope-hud',
    title: 'Gyro-Haptic Celestial Latent Navigator',
    tagline: 'A handheld sky-gazing HUD that uses tactile gyro haptics to guide amateur telescopes toward deep-sky coordinates.',
    topic: 'Spatial UI',
    status: 'TRAINING',
    date: 'September 2026',
    badgeColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
    researchQuestion: 'Can lightweight browser-native device orientation sensors achieve sub-arcminute pointing precision for astronomical alignment?',
    objective: 'Build an astronomy guide that eliminates expensive motorized goto mounts through subtle vibration pulses and HUD reticles.',
    dataset: 'Gaia DR3 star catalog (filtered to magnitude < 12.0) with NGC/IC deep sky object coordinates.',
    model: 'Kinematic Kalman filter for sensor fusion (accelerometer + magnetometer + gyroscope).',
    methodology: 'Spherical trigonometry coordinate translation into viewport Reticle projections with progressive Web Vibration API patterns.',
    implementation: 'HTML5 DeviceOrientation API, Three.js celestial sphere projection, Web Vibration API, PWA offline cache.',
    results: [
      { metric: 'Target Error', value: '< 4 arcmin', description: 'Sufficient for wide-field eyepiece acquisition' },
      { metric: 'Battery Draw', value: '4% / hr', description: 'Extreme OLED dark-mode power efficiency' }
    ],
    limitations: [
      'Nearby iron metal telescope mounts cause local magnetic deviation requiring manual 2-star re-calibration.',
      'iOS Safari limits vibration API access.'
    ],
    responsibleAI: 'Deep red spectrum mode (wavelength > 620nm) strictly preserved to maintain nighttime rod photoreceptor adaptation.',
    lessonsLearned: [
      'Haptic pulse frequency is much easier to perceive in pitch darkness than reading bright smartphone screen numbers.'
    ],
    demoUrl: '/#playground',
    githubUrl: 'https://github.com/easy-web-p',
    relatedArticleSlug: 'crafting-playful-ai-interfaces',
    relatedProductSlug: 'design-tokens-studio',
    coverGradient: 'from-cyan-900/60 via-blue-900/40 to-slate-900/80',
    tags: ['Spatial UI', 'Astronomy', 'DeviceOrientation', 'Haptics', 'PWA']
  }
];

export function getAllExperiments(): Experiment[] {
  return EXPERIMENTS_DATA;
}

export function getExperimentBySlug(slug: string): Experiment | null {
  return EXPERIMENTS_DATA.find((e) => e.slug === slug) || null;
}
