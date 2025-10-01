import React, { useState } from 'react';
import PipelineStage from './components/PipelineStage';
import Confetti from './components/Confetti';
import { usePipelineManager } from './hooks/usePipelineManager';

const App: React.FC = () => {
  const [theme, setTheme] = useState('');
  const {
    stages,
    isRunning,
    isFinished,
    hasFailed,
    expandedStage,
    showConfetti,
    start,
    reset,
    handleToggleStage,
  } = usePipelineManager();

  const handleStart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (theme.trim() === '') return;
    start(theme);
  };
  
  const completedStages = stages.filter(s => s.status === 'COMPLETED').length;
  const progress = stages.length > 0 ? (completedStages / stages.length) * 100 : 0;
  
  const showIntroScreen = !isRunning && !isFinished && !hasFailed;

  if (showIntroScreen) {
      return (
          <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
              <div className="max-w-2xl">
                  <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">AI Video Remix Studio</h1>
                  <p className="text-lg sm:text-xl text-slate-300 mb-8">Tell me what kind of video you want to create, and I'll show you how my AI gets it done. How about a movie trailer for a space opera, or a cooking show run by cats?</p>
                  <form onSubmit={handleStart} className="flex flex-col sm:flex-row gap-4 justify-center">
                      <input 
                          type="text" 
                          value={theme}
                          onChange={(e) => setTheme(e.target.value)}
                          placeholder="Enter your video theme..."
                          className="w-full sm:w-96 bg-slate-800 border-2 border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                          aria-label="Video theme input"
                      />
                      <button 
                          type="submit" 
                          className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                          disabled={!theme.trim()}
                          aria-label="Start AI Remix"
                      >
                          Remix It!
                      </button>
                  </form>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 font-sans">
      {showConfetti && <Confetti />}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">AI Remix in Progress...</h1>
            <p className="text-lg text-purple-300 font-semibold">{theme}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="w-full bg-slate-700 rounded-full h-4 relative overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-4 rounded-full transition-all duration-500 ease-out progress-bar-wave" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Pipeline Stages */}
        <div className="relative space-y-8">
            {/* Dashed line connector */}
            <div className="absolute left-6 sm:left-9 top-12 bottom-12 w-0.5 bg-slate-700" style={{'border': '1px dashed #475569'}}></div>

            {stages.map((stage) => (
              <PipelineStage
                key={stage.id}
                stage={stage}
                isExpanded={expandedStage === stage.id}
                onToggle={() => handleToggleStage(stage.id)}
              />
            ))}
        </div>

        {/* Failure Message */}
        {hasFailed && (
            <div className="mt-10 text-center p-6 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
                <h2 className="text-2xl font-bold text-red-300">Remix Failed</h2>
                <p className="text-red-300/80 mt-2">
                    Oh no! Something went wrong while creating the video. Please try again.
                </p>
            </div>
        )}

        {/* Definition of Done */}
        <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-slate-200 mb-6">Our Goals for a Great Remix</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className={`p-6 bg-slate-800 rounded-xl border-2 border-slate-700 transition-shadow ${isFinished ? 'animate-pulse-glow-cyan' : ''}`}>
                    <h3 className="text-xl font-semibold text-cyan-300">Simple to Create</h3>
                    <p className="text-slate-400 mt-2">The whole process should be easy to start and run automatically.</p>
                </div>
                <div className={`p-6 bg-slate-800 rounded-xl border-2 border-slate-700 transition-shadow ${isFinished ? 'animate-pulse-glow-green' : ''}`}>
                    <h3 className="text-xl font-semibold text-green-300">Looks Amazing</h3>
                    <p className="text-slate-400 mt-2">The final videos need to be high-quality and look professional.</p>
                </div>
                <div className={`p-6 bg-slate-800 rounded-xl border-2 border-slate-700 transition-shadow ${isFinished ? 'animate-pulse-glow-purple' : ''}`}>
                    <h3 className="text-xl font-semibold text-purple-300">Works Efficiently</h3>
                    <p className="text-slate-400 mt-2">The AI should create videos quickly and without wasting resources.</p>
                </div>
            </div>
        </div>
        
        {/* Reset Button */}
        {(isFinished || hasFailed) && (
            <div className="mt-10 text-center">
                <button 
                    onClick={() => {
                        reset();
                        setTheme('');
                    }} 
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
                >
                    Create a New Remix
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default App;
