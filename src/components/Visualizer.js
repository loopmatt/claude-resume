import React, { useState, useEffect } from 'react';

const Visualizer = () => {
  const [revealed, setRevealed] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [percentages, setPercentages] = useState({
    "Quick Learning": 0,
    "People Understanding": 0,
    "Technical Acumen": 0,
    "Initiative": 0,
    "AI Passion": 0
  });
  
  const skills = [
    { 
      name: "Quick Learning", 
      value: 95, 
      color: "bg-blue-500",
      description: "I rapidly master new technologies and domains. For Claude, I went from basic understanding to building applications in under a week."
    },
    { 
      name: "People Understanding", 
      value: 92, 
      color: "bg-purple-500",
      description: "My background in psychology helps me understand customer needs and communicate complex concepts clearly and empathetically."
    },
    { 
      name: "Technical Acumen", 
      value: 88, 
      color: "bg-green-500",
      description: "I quickly grasp technical concepts and can translate them into business value propositions that resonate with potential customers."
    },
    { 
      name: "Initiative", 
      value: 94, 
      color: "bg-amber-500",
      description: "I'm a self-starter who identifies opportunities and creates solutions without waiting to be told what to do next."
    },
    { 
      name: "AI Passion", 
      value: 98, 
      color: "bg-red-500",
      description: "I'm genuinely excited about AI's potential to augment human capabilities and solve important problems."
    }
  ];
  
  useEffect(() => {
    if (revealed) {
      // Animate the percentages growing
      const intervalId = setInterval(() => {
        setPercentages(prev => {
          const updated = {...prev};
          let complete = true;
          
          skills.forEach(skill => {
            if (updated[skill.name] < skill.value) {
              updated[skill.name] += 1;
              complete = false;
            }
          });
          
          if (complete) {
            clearInterval(intervalId);
          }
          
          return updated;
        });
      }, 20);
      
      return () => clearInterval(intervalId);
    }
  }, [revealed]);
  
  const handleReveal = () => {
    setRevealed(true);
  };
  
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Why I'd Excel in AI Sales</h2>
      
      {!revealed ? (
        <div className="text-center mb-6">
          <p className="text-gray-700 mb-4">My unique combination of skills creates my potential in AI sales</p>
          <button 
            onClick={handleReveal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            Reveal My Potential
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div 
              key={skill.name} 
              className="relative pt-1"
              onMouseEnter={() => setActiveSkill(skill.name)}
              onMouseLeave={() => setActiveSkill(null)}
            >
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${skill.name === activeSkill ? 'bg-gray-800 text-white' : 'text-blue-600 bg-blue-200'} transition-colors duration-300`}>
                    {skill.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {percentages[skill.name]}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div 
                  style={{ width: `${percentages[skill.name]}%` }} 
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${skill.color} transition-all duration-300`}
                >
                </div>
              </div>
              
              {activeSkill === skill.name && (
                <div className="p-2 bg-gray-100 rounded text-sm mb-3 transition-opacity duration-300">
                  {skill.description}
                </div>
              )}
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-2">Why This Matters For Anthropic</h3>
            <p className="text-gray-700">
              AI products like Claude require salespeople who can quickly understand complex technical capabilities, 
              translate them into business value, and build genuine connections with potential clients. My 
              combination of rapid learning, people skills, and passion for AI makes me uniquely positioned to 
              bridge the gap between Claude's advanced capabilities and the business problems it can solve.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualizer;