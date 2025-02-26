import React, { useState, useEffect } from 'react';

const LearningJourney = () => {
  const [activePhase, setActivePhase] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // Auto-cycle through phases on first load
    let currentIndex = 0;
    const phases = ['discover', 'connect', 'build', 'teach'];
    
    const interval = setInterval(() => {
      setActivePhase(phases[currentIndex]);
      currentIndex++;
      
      if (currentIndex >= phases.length) {
        clearInterval(interval);
        setTimeout(() => setAnimationComplete(true), 1000);
      }
    }, 1200);
    
    return () => clearInterval(interval);
  }, []);
  
  const phases = [
    {
      id: 'discover',
      emoji: '🔍',
      title: 'Discover',
      description: 'I immerse myself completely in a new domain. For Claude, I spent 40+ hours exploring capabilities, limits, and unique features.',
      color: 'bg-blue-100 border-blue-500'
    },
    {
      id: 'connect',
      emoji: '🧩',
      title: 'Connect',
      description: 'I find patterns between new knowledge and existing skills. My background in psychology helps me understand how users interact with AI.',
      color: 'bg-purple-100 border-purple-500'
    },
    {
      id: 'build',
      emoji: '🛠️',
      title: 'Build',
      description: 'I create real projects to solidify understanding. I\'ve built several Claude-powered tools including a personalized learning assistant.',
      color: 'bg-green-100 border-green-500'
    },
    {
      id: 'teach',
      emoji: '🎓',
      title: 'Teach',
      description: 'Explaining concepts to others deepens my understanding. I\'ve helped friends integrate Claude into their workflows.',
      color: 'bg-amber-100 border-amber-500'
    }
  ];
  
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-6">My Learning Approach</h2>
      
      <div className="flex justify-between mb-8">
        {phases.map((phase, index) => (
          <div 
            key={phase.id}
            className={`text-center cursor-pointer transition-all duration-300 ${activePhase === phase.id ? 'transform scale-110' : ''}`}
            onClick={() => setActivePhase(phase.id)}
          >
            <div 
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl transition-colors duration-300 ${activePhase === phase.id ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              {phase.emoji}
            </div>
            <div className="mt-2 text-sm font-medium">{phase.title}</div>
          </div>
        ))}
      </div>
      
      {activePhase ? (
        <div 
          className={`p-4 rounded-lg border-l-4 ${phases.find(p => p.id === activePhase).color} transition-opacity duration-300`}
          style={{opacity: 1}}
        >
          <h3 className="font-bold mb-2">{phases.find(p => p.id === activePhase).title}</h3>
          <p className="text-gray-700">{phases.find(p => p.id === activePhase).description}</p>
        </div>
      ) : (
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Click any phase to learn about my learning process</p>
        </div>
      )}
      
      {animationComplete && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-2">Why This Matters For Anthropic</h3>
          <p className="text-gray-700">
            This systematic learning approach means I can quickly understand Claude's capabilities, translate technical features into business value, and help potential customers see how Claude can solve their specific problems. I don't just sell products; I help clients envision solutions.
          </p>
        </div>
      )}
    </div>
  );
};

export default LearningJourney;