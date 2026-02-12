// *LEARNING MODULE* 📚
// The Archive Viewer - Gurnoor Tamber's educational powerhouse!
// Dive deep into Rosalind Franklin's discoveries! 🔬

import React, { useState, useMemo } from 'react';

// *DISCOVERY TYPES* All the research nodes! Each one a treasure trove! 💎
type DiscoveryType = 'PHOTO_51' | 'TMV' | 'CARBON' | 'BIOGRAPHY' | 'LEGACY' | 'NONE';

interface LearningModuleProps {
  onBack: () => void;
}

interface GalleryItem {
  url: string;
  caption: string;
}

interface DataNode {
  title: string;
  id: string;
  year: string;
  context: string;
  description: string;
  extendedIntel: string[];
  metrics: { label: string; value: string; detail: string }[];
  logs: string[];
  sources: { title: string; url: string }[];
  imageUrl: string;
  visualType: 'IMAGE';
  gallery: GalleryItem[];
}

// *RESEARCH DATABASE* Gurnoor's comprehensive archive! 📚✨
// Each entry is a complete research node with all the intel!
const RESEARCH_DATABASE: Record<Exclude<DiscoveryType, 'NONE'>, DataNode> = {
  // *PHOTO 51* The legendary X-ray diffraction image! 🧬
  PHOTO_51: {
    title: "NEURAL_NODE // PHOTO_51",
    id: "DNA_0x1952",
    year: "1952",
    context: "KING'S COLLEGE LONDON",
    visualType: 'IMAGE',
    imageUrl: 'https://digital.sciencehistory.org/downloads/deriv/f3120uz/download_medium',
    description: "The definitive X-ray diffraction image of the B-form of DNA. This data fragment proved the helical nature of the secret of life.",
    extendedIntel: [
      "Captured using a Microfocus X-ray tube and high-hydration control.",
      "The 'X' pattern indicated the diagonal orientation of the helix.",
      "Identified that phosphate groups reside on the exterior shell.",
      "Provided crucial dimensions: 34 Å repeat, 20 Å diameter."
    ],
    metrics: [
      { label: "FORM", value: "B-STATE", detail: "Hydrated" },
      { label: "PITCH", value: "34 Å", detail: "Turn Length" },
      { label: "RADIUS", value: "10 Å", detail: "Internal" },
      { label: "DENSITY", value: "HIGH", detail: "Resolution" }
    ],
    logs: ["LOADING_DIFFRACTION_MATRIX...", "SYNCING_XRAY_LATTICE...", "HELIX_STABILITY_100%."],
    sources: [
      { title: "Embryo Project: Photo 51 Analysis", url: "https://embryo.asu.edu/pages/photograph-51-rosalind-franklin-1952" },
      { title: "DPMA: Ingenious Women - Franklin", url: "https://www.dpma.de/english/our_office/publications/ingeniouswomen/rosalindfranklin/index.html" },
      { title: "PMC: Historical Photo 51 Context", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10126998/" },
      { title: "Lancet: DNA Discovery Narrative", url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(15)00422-5/fulltext" },
      { title: "UKRI: From the Archive - Photo 51", url: "https://www.ukri.org/blog/from-the-archive-rosalind-franklins-famous-photo-51/" },
      { title: "ScienceDirect: Diffraction Analysis", url: "https://www.sciencedirect.com/science/article/pii/S0092867420309363" }
    ],
    gallery: [
      { url: 'https://digital.sciencehistory.org/downloads/deriv/f3120uz/download_medium', caption: 'ORIGINAL_DIFFRACTION_PLATE' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Experimental_setup_of_Photo_51.svg/2560px-Experimental_setup_of_Photo_51.svg.png', caption: 'EXPERIMENTAL_SETUP_DIAGRAM' },
      { url: 'https://www.ukri.org/wp-content/uploads/2023/04/MRC-240423-Franklin_1958_01872_8_rosalind_franklin_desk_%C2%A9JohnFinchMRC_LMB.jpg', caption: 'FRANKLIN_DESK_ARCHIVE' }
    ]
  },
  TMV: {
    title: "NEURAL_NODE // TMV_VIRUS",
    id: "VIRO_0x1955",
    year: "1953-1958",
    context: "BIRKBECK COLLEGE",
    visualType: 'IMAGE',
    imageUrl: 'https://cmds-test.vedantu.com/prod/question-sets/d44a2d78-6a52-4466-8f3d-25201eae13342781776828673769042.png',
    description: "Franklin mapped the structural morphology of the Tobacco Mosaic Virus, defining the internal RNA core.",
    extendedIntel: [
      "Discovered that RNA is located in the hollow interior core.",
      "Proved the virus is a helix of uniform protein subunits.",
      "Developed the methodology for modern structural virology.",
      "Collaborated with Aaron Klug on high-res viral mapping."
    ],
    metrics: [
      { label: "CORE", value: "RNA", detail: "Genetic Carrier" },
      { label: "SHAPE", value: "ROD", detail: "Helical Cylinder" },
      { label: "LATTICE", value: "UNIFORM", detail: "Protein Matrix" },
      { label: "SYNC", value: "ACTIVE", detail: "Viral Link" }
    ],
    logs: ["SCANNING_VIRION...", "MAPPING_RNA_CORE...", "STRUCTURAL_SYNC_COMPLETE."],
    sources: [
      { title: "PubMed: TMV Research Archive", url: "https://pubmed.ncbi.nlm.nih.gov/18702397/" },
      { title: "IUCR: TMV Helical Model", url: "https://www.iucr.org/news/newsletter/etc/articles?issue=148371&result_138339_result_page=27" },
      { title: "OAC: TMV Collection Offprints", url: "https://oac.cdlib.org/findaid/ark:/13030/c82v2q6w" },
      { title: "NLM: TMV Scientific Papers", url: "https://profiles.nlm.nih.gov/spotlight/kr/catalog.html?f%5Breadonly_format_ssim%5D%5B%5D=Text&f%5Breadonly_profiles-collection_ssim%5D%5B%5D=The+Rosalind+Franklin+Papers&f%5Breadonly_subject_ssim%5D%5B%5D=Tobacco+Mosaic+Virus&per_page=100&sort=readonly_date-yyyymmdd_ssim+asc&view=list" },
      { title: "HistCite: Publication Metrics", url: "https://garfield.library.upenn.edu/histcomp/franklin-re_citing/index-so-11.html" },
      { title: "ScienceDirect: Viral Structural Bio", url: "https://www.sciencedirect.com/science/article/pii/S2451929421001005" }
    ],
    gallery: [
      { url: 'https://cmds-test.vedantu.com/prod/question-sets/d44a2d78-6a52-4466-8f3d-25201eae13342781776828673769042.png', caption: 'TMV_HELICAL_MODEL' },
      { url: 'https://media.sciencephoto.com/c0/32/03/71/c0320371-800px-wm.jpg', caption: 'TMV_PARTICLE_STRUCTURE' },
      { url: 'https://media.sciencephoto.com/c0/14/91/67/c0149167-800px-wm.jpg', caption: 'VIRAL_SUBUNIT_MAPPING' }
    ]
  },
  CARBON: {
    title: "NEURAL_NODE // CARBON_MORPH",
    id: "CHEM_0x1947",
    year: "1947-1950",
    context: "PARIS LABS",
    visualType: 'IMAGE',
    imageUrl: 'https://pubs.acs.org/cms/10.1021/acs.energyfuels.4c02240/asset/images/large/ef4c02240_0006.jpeg',
    description: "Experimental mapping of coal and carbon micro-structures, distinguishing between graphitizing and non-graphitizing forms.",
    extendedIntel: [
      "Used X-ray analysis to predict thermal reactivity of coals.",
      "Established the 'molecular sieve' properties of carbon lattices.",
      "Critical for the development of modern carbon fiber technology.",
      "Spent her 'happiest years' researching in post-war Paris."
    ],
    metrics: [
      { label: "BOND", value: "SP2", detail: "Hexagonal Grid" },
      { label: "DENSITY", value: "2.2", detail: "Graphitic state" },
      { label: "TEMP", value: "3000C", detail: "Phase Stability" },
      { label: "PHASE", value: "SOLID", detail: "Carbon Array" }
    ],
    logs: ["HEATING_CARBON_LATTICE...", "MEASURING_DENSITY...", "PHASE_TRANSITION_LOGGED."],
    sources: [
      { title: "Science History: Carbon Intel", url: "https://digital.sciencehistory.org/works/egeg5qf" },
      { title: "ACS: Energy & Fuels - Lattice", url: "https://pubs.acs.org/doi/10.1021/acs.energyfuels.4c02240" }
    ],
    gallery: [
      { url: 'https://pubs.acs.org/cms/10.1021/acs.energyfuels.4c02240/asset/images/large/ef4c02240_0006.jpeg', caption: 'CARBON_LATTICE_DIFFRACTION' },
      { url: 'https://media.gosciencegirls.com/wp-content/uploads/2020/12/Rosalind-Franklin-using-x-ray-1.jpg', caption: 'XRAY_INSTRUMENTATION_LAB' }
    ]
  },
  BIOGRAPHY: {
    title: "NEURAL_NODE // LIFE_PATH",
    id: "LIFE_0x1920",
    year: "1920-1958",
    context: "CHRONOLOGY",
    visualType: 'IMAGE',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSHztzcduF5Z75NQC_Zv6OcrydvmpXGneT0m7mxBo8ZUNxiAitY_S6p6CMvWU8x03_ZUVuGcRZC5a_Kk8nvKhJE-XxeF48zJW8_OBL1FzuMp8oVdbDmw44f2ZgbmpBXaHO0HpVlCuoSv6k&s=19',
    description: "The complete timeline of Dr. Franklin, from her birth in London to her final days at Birkbeck.",
    extendedIntel: [
      "Born into a prominent Jewish family in Notting Hill.",
      "Ph.D. in Physical Chemistry from Cambridge (1945).",
      "Fiercely independent researcher and world-class experimentalist.",
      "Died at 37 of ovarian cancer, potentially due to radiation exposure."
    ],
    metrics: [
      { label: "BORN", value: "1920", detail: "London" },
      { label: "DEATH", value: "1958", detail: "London" },
      { label: "AWARDS", value: "POSTH", detail: "Global recognition" },
      { label: "STATUS", value: "VINDIC", detail: "Legacy locked" }
    ],
    logs: ["RETRIEVING_BIOGRAPHY...", "SYNCING_TIMELINE...", "LIFE_NODE_STABLE."],
    sources: [
      { title: "Historic Figures: Franklin Profile", url: "https://historic-figures.com/en/figures/rosalind-franklin/" },
      { title: "NIH: Biographical Information", url: "https://profiles.nlm.nih.gov/spotlight/kr/feature/biographical-information" },
      { title: "Biography.com: Scientific Career", url: "https://www.biography.com/scientists/rosalind-franklin" },
      { title: "Rosalind Franklin Institute", url: "https://www.rfi.ac.uk/discover-learn/rosalind-franklins-life/" },
      { title: "Britannica: Life & Work", url: "https://www.britannica.com/biography/Rosalind-Franklin" },
      { title: "CSHL: DNA Learning Center", url: "https://dnalc.cshl.edu/view/16439-Biography-19-Rosalind-Elsie-Franklin-1920-1958-.html" },
      { title: "RFU: Facts and Figures", url: "https://www.rosalindfranklin.edu/about/facts-figures/dr-rosalind-franklin/" }
    ],
    gallery: [
      { url: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSHztzcduF5Z75NQC_Zv6OcrydvmpXGneT0m7mxBo8ZUNxiAitY_S6p6CMvWU8x03_ZUVuGcRZC5a_Kk8nvKhJE-XxeF48zJW8_OBL1FzuMp8oVdbDmw44f2ZgbmpBXaHO0HpVlCuoSv6k&s=19', caption: 'HISTORICAL_PORTRAIT_DR_FRANKLIN' },
      { url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/1a8b52c5-7210-51e9-9b1a-890e7de903c1/3ef4f25b-ca58-5dd5-bdf8-cf07aaf56db0.jpg', caption: 'FIELD_RESEARCH_EXPEDITION' },
      { url: 'https://www.serendum.com/newsroom/content/images/2023/02/rosalind-5.jpg', caption: 'LABORATORY_ANALYSIS_PHASE' }
    ]
  },
  LEGACY: {
    title: "NEURAL_NODE // IMPACT_GRID",
    id: "MODERN_0x2025",
    year: "CURRENT",
    context: "MODERN SCIENCE",
    visualType: 'IMAGE',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Rosalind_Franklin_Institute_Building.jpg/1200px-Rosalind_Franklin_Institute_Building.jpg',
    description: "The recognition of Franklin's foundational work in modern genomic medicine and structural biology.",
    extendedIntel: [
      "The Rosalind Franklin Institute established at Harwell in 2018.",
      "ESA's ExoMars rover named 'Rosalind Franklin' in 2019.",
      "Her work paved the way for the Human Genome Project.",
      "Global icon for women in STEM and scientific integrity."
    ],
    metrics: [
      { label: "ROVER", value: "MARS", detail: "ExoMars 2022" },
      { label: "INSTITUTE", value: "RFI_UK", detail: "Molecular Tech" },
      { label: "IMPACT", value: "MAX", detail: "Genetics" },
      { label: "RANK", value: "ELITE", detail: "Pioneer" }
    ],
    logs: ["SCANNING_LEGACY_ARRAY...", "LOCATING_MODERN_TRIBUTES...", "IMPACT_GRID_SECURED."],
    sources: [
      { title: "The Rosalind Franklin Institute", url: "https://www.rfi.ac.uk/" }
    ],
    gallery: []
  }
};

export const LearningModule: React.FC<LearningModuleProps> = ({ onBack }) => {
  const [activeID, setActiveID] = useState<DiscoveryType>('NONE');
  const [isDecryptionActive, setIsDecryptionActive] = useState(false);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const [activeMainImage, setActiveMainImage] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // *NODE SELECTOR* Choose a research node! Gurnoor's interactive archive! 🎯
  const handleSelectNode = (nodeId: DiscoveryType) => {
    if (nodeId === activeID || nodeId === 'NONE') return;
    
    // *DECRYPTION START* Begin the loading sequence! 🔓
    setIsDecryptionActive(true);
    setDecryptionProgress(0);
    setCurrentLogs([]);
    setActiveMainImage(null);
    
    // *PROGRESS SIMULATION* Animate that progress bar! 📊
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      setDecryptionProgress(progress);
      
      // *LOG UPDATES* Show those epic log messages! 📜
      if (progress % 20 === 0) {
        const node = RESEARCH_DATABASE[nodeId as Exclude<DiscoveryType, 'NONE'>];
        setCurrentLogs(prev => [...prev, node.logs[Math.floor(progress / 25)] || "BUFFERING..."]);
      }

      // *COMPLETE* Finish decryption and show content! ✅
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveID(nodeId);
          setIsDecryptionActive(false);
          setActiveMainImage(RESEARCH_DATABASE[nodeId as Exclude<DiscoveryType, 'NONE'>].imageUrl);
        }, 400);
      }
    }, 25);
  };

  const activeNode = activeID !== 'NONE' ? RESEARCH_DATABASE[activeID] : null;

  return (
    <div className="w-full max-w-7xl h-[92vh] flex flex-col pointer-events-auto animate-in fade-in zoom-in-95 duration-700 font-orbitron text-cyan-500 overflow-hidden bg-white/5 backdrop-blur-3xl border-2 border-white/20 shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center py-5 px-10 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-transparent">
        <div className="flex flex-col">
          <div className="flex items-center gap-6">
            <div className="w-2 h-10 bg-cyan-400 shadow-[0_0_15px_cyan]"></div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-[0.2em] text-white italic drop-shadow-[0_0_10px_cyan]">ARCHIVE_v6.5</h2>
              <span className="text-[7px] font-mono tracking-[0.5em] text-cyan-600 uppercase font-black">NEURAL_LINK: SECURE</span>
            </div>
          </div>
        </div>
        <button onClick={onBack} className="group relative px-6 py-1.5 border border-white/40 hover:border-white transition-all bg-black/40 italic font-black text-[8px] tracking-widest text-white" style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}>
          BACK_TO_CORE
        </button>
      </div>

      <div className="flex flex-1 gap-4 p-6 overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-64 md:w-80 flex flex-col gap-3 pr-4 overflow-y-auto custom-scrollbar">
          {(Object.keys(RESEARCH_DATABASE) as Array<Exclude<DiscoveryType, 'NONE'>>).map((key) => {
            const node = RESEARCH_DATABASE[key];
            const isActive = activeID === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectNode(key)}
                className={`group relative h-20 w-full shrink-0 transition-all duration-300 flex items-center px-6 clip-nav-item border-2 ${isActive ? 'bg-cyan-500 border-white translate-x-3 shadow-[0_0_30px_rgba(0,247,255,0.4)]' : 'bg-black/60 border-white/10 hover:border-cyan-400 hover:translate-x-1'}`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isActive ? 'bg-white' : 'bg-cyan-900'}`}></div>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className={`text-[11px] font-black tracking-widest uppercase truncate w-full text-left italic ${isActive ? 'text-black' : 'text-white'}`}>{key.replace('_', ' ')}</span>
                  <span className={`text-[8px] font-mono uppercase font-black ${isActive ? 'text-black/60' : 'text-cyan-800'}`}>ID: {node.id}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col bg-black/40 border-2 border-white/10 rounded-lg">
          {isDecryptionActive && (
            <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center p-10 animate-in fade-in duration-300">
               <div className="relative w-48 h-48 mx-auto mb-10">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(0,247,255,0.05)" strokeWidth="8" />
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="cyan" strokeWidth="6" strokeDasharray="283" strokeDashoffset={283 - (283 * decryptionProgress / 100)} className="drop-shadow-[0_0_20px_cyan]" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-black italic text-white">{decryptionProgress}%</div>
               </div>
               <div className="space-y-2 text-center">
                  <span className="text-[12px] font-black tracking-[1em] text-cyan-400 animate-pulse uppercase">SYNCHRONIZING_NODE</span>
                  <div className="flex flex-col gap-1 max-h-24 overflow-hidden">
                    {currentLogs.map((l, i) => <div key={i} className="text-[8px] font-mono text-cyan-800 uppercase tracking-widest">{'> '}{l}</div>)}
                  </div>
               </div>
            </div>
          )}

          {!activeNode ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-8">
               <div className="w-24 h-24 border-2 border-cyan-400 rotate-45 flex items-center justify-center animate-pulse">
                  <div className="w-6 h-6 bg-cyan-400"></div>
               </div>
               <h3 className="text-3xl font-black text-white tracking-[0.5em] uppercase italic">ARCHIVE_IDLE</h3>
               <p className="text-[12px] font-mono text-cyan-800 uppercase tracking-widest">Select a research node to begin neural reconstruction.</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-8 gap-10 overflow-y-auto custom-scrollbar animate-in slide-in-from-right duration-700">
              {/* Node Header */}
              <div className="flex justify-between items-end border-b-2 border-cyan-500/20 pb-8">
                 <div className="space-y-4">
                    <div className="flex items-center gap-6">
                       <span className="bg-white text-black px-6 py-1 text-[11px] font-black italic shadow-[0_0_15px_white]">{activeNode.year}</span>
                       <span className="text-cyan-800 text-[10px] font-black tracking-widest uppercase">{activeNode.context}</span>
                    </div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(0,247,255,0.4)]">{activeNode.title}</h1>
                 </div>
                 <div className="px-5 py-1 border-2 border-cyan-500 text-cyan-400 text-sm font-black italic tracking-widest">{activeNode.id}</div>
              </div>

              {/* Visual Display */}
              <div className="w-full h-[450px] relative bg-black/60 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                  <div 
                    onClick={() => setFullscreenImage(activeMainImage || activeNode.imageUrl)}
                    className="w-full h-full relative group cursor-pointer"
                  >
                    <img 
                      src={activeMainImage || activeNode.imageUrl} 
                      alt={activeNode.title}
                      className="w-full h-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 border border-cyan-500 px-6 py-2 text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase italic">EXPAND_NODE_VIEW</div>
                    </div>
                  </div>
              </div>

              {/* Visual Evidence Gallery */}
              {activeNode.gallery.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-cyan-400 rotate-45"></div>
                    <h4 className="text-[12px] font-black text-white tracking-[0.8em] uppercase italic">NEURAL_IMAGING_ARRAY</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {activeNode.gallery.map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          if (activeMainImage === item.url) {
                            setFullscreenImage(item.url);
                          } else {
                            setActiveMainImage(item.url);
                          }
                        }}
                        className={`group relative h-40 bg-black/40 border-2 transition-all overflow-hidden cursor-pointer ${activeMainImage === item.url ? 'border-cyan-400 scale-[1.05] z-10' : 'border-white/5 hover:border-cyan-400'}`}
                        style={{ clipPath: 'polygon(0 0, 90% 0, 100% 20%, 100% 100%, 10% 100%, 0 80%)' }}
                      >
                        <img src={item.url} alt={item.caption} className={`w-full h-full object-cover transition-all duration-700 ${activeMainImage === item.url ? 'opacity-100 grayscale-0' : 'opacity-40 group-hover:opacity-100 grayscale group-hover:grayscale-0 group-hover:scale-110'}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                        <div className="absolute bottom-3 left-4 text-[8px] font-mono text-white/40 group-hover:text-cyan-400 transition-colors uppercase tracking-[0.2em]">{item.caption}</div>
                        {/* Overlay Expand Indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-400/10">
                           <div className="p-2 border border-cyan-500 bg-black/60">
                             <span className="text-[7px] font-black tracking-widest text-white uppercase">{activeMainImage === item.url ? 'EXPAND_VIEW' : 'SELECT_NODE'}</span>
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <h4 className="text-[11px] font-black text-cyan-400 tracking-[0.6em] uppercase italic">{'>> '}RECON_INTEL</h4>
                       <p className="text-xl leading-relaxed text-white font-mono italic uppercase border-l-4 border-cyan-500 pl-8 bg-white/5 py-8">
                         {activeNode.description}
                       </p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[11px] font-black text-cyan-400 tracking-[0.6em] uppercase italic">{'>> '}EXTENDED_SYNOPSIS</h4>
                       <ul className="space-y-6">
                         {activeNode.extendedIntel.map((intel, idx) => (
                           <li key={idx} className="flex gap-6 items-start text-[14px] font-mono text-cyan-100 uppercase leading-relaxed">
                              <span className="text-cyan-800 font-black text-xl italic">0{idx + 1}</span>
                              <span className="pt-1">{intel}</span>
                           </li>
                         ))}
                       </ul>
                    </div>
                 </div>

                 <div className="space-y-12">
                    <div className="space-y-4">
                       <h4 className="text-[11px] font-black text-cyan-400 tracking-[0.6em] uppercase italic">{'>> '}PARAM_ARRAY</h4>
                       <div className="grid grid-cols-2 gap-5">
                          {activeNode.metrics.map((m, idx) => (
                            <div key={idx} className="group relative p-6 bg-white/5 border-2 border-white/5 hover:border-cyan-500/50 transition-all flex flex-col justify-between overflow-hidden h-32">
                               <span className="text-[9px] font-mono text-cyan-900 font-black tracking-widest">P_{idx}</span>
                               <div className="text-2xl font-black text-white tracking-tighter">{m.value}</div>
                               <div className="text-[10px] font-mono text-cyan-800 uppercase font-black">{m.label}: {m.detail}</div>
                            </div>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[11px] font-black text-cyan-400 tracking-[0.6em] uppercase italic">{'>> '}EXTERNAL_UPLINKS</h4>
                       <div className="space-y-4">
                          {activeNode.sources.map((src, idx) => (
                            <a 
                              key={idx} 
                              href={src.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between p-5 bg-black/60 border-2 border-white/5 hover:border-white transition-all shadow-lg"
                              style={{ clipPath: 'polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)' }}
                            >
                               <span className="text-[11px] font-black tracking-widest uppercase text-white group-hover:text-cyan-400">{src.title}</span>
                               <div className="p-2 bg-white/5 group-hover:bg-cyan-500 rounded-full">
                                 <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white group-hover:fill-black transition-all"><path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                               </div>
                            </a>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox - Fixed high z-index to avoid clipping */}
      {fullscreenImage && (
        <div 
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in duration-300 cursor-zoom-out"
        >
          {/* Lightbox HUD Overlay */}
          <div className="absolute top-10 left-10 flex flex-col gap-2 pointer-events-none">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-500 rotate-45 animate-pulse"></div>
                <span className="text-[10px] font-black text-cyan-400 tracking-[0.6em] uppercase italic">ENHANCED_IMAGE_BUFFER</span>
             </div>
             <div className="h-[1px] w-64 bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
          </div>

          <div className="relative max-w-7xl w-full h-full flex items-center justify-center group/image">
            <img 
              src={fullscreenImage} 
              alt="Fullscreen View" 
              className="max-w-full max-h-full object-contain shadow-[0_0_150px_rgba(0,247,255,0.15)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            {/* Corner Decorative Brackets */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-cyan-400 opacity-60"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-cyan-400 opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-cyan-400 opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-cyan-400 opacity-60"></div>
            
            {/* Label in corner */}
            <div className="absolute bottom-6 right-6 bg-black/80 border border-cyan-500/30 px-6 py-2">
               <span className="text-[8px] font-mono text-cyan-400 tracking-[0.4em] uppercase">HI_RES_LATTICE_RENDER</span>
            </div>
          </div>

          <button 
            onClick={() => setFullscreenImage(null)}
            className="mt-8 group relative px-16 py-4 border-2 border-white/20 hover:border-cyan-400 transition-all bg-black italic font-black text-[11px] tracking-[0.5em] text-white uppercase"
            style={{ clipPath: 'polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%)' }}
          >
            EXIT_VISUAL_INTERFACE
          </button>
        </div>
      )}

      <style>{`
        .clip-nav-item { clip-path: polygon(0 0, 85% 0, 100% 30%, 100% 100%, 15% 100%, 0 70%); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 247, 255, 0.2); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 247, 255, 0.5); }
      `}</style>
    </div>
  );
};
