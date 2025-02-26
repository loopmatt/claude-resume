import React, { useState } from 'react';

const EasterEgg = () => {
  const [clicks, setClicks] = useState(0);
  const [found, setFound] = useState([]);
  const [complete, setComplete] = useState(false);
  const [message, setMessage] = useState("Click the Claude logo to find hidden AI capabilities!");
  
  const capabilities = [
    { id: 1, name: "Reasoning", description: "Breaking down complex problems step by step" },
    { id: 2, name: "Creativity", description: "Generating novel ideas and content" },
    { id: 3, name: "Analysis", description: "Examining data and extracting insights" }
  ];
  
  const handleClick = () => {
    setClicks(clicks + 1);
    
    if (clicks < capabilities.length) {
      if (!found.includes(capabilities[clicks].id)) {
        setFound([...found, capabilities[clicks].id]);
        setMessage(`You found: ${capabilities[clicks].name}!`);
      }
    }
    
    if (clicks === capabilities.length - 1) {
      setTimeout(() => {
        setComplete(true);
        setMessage("You've discovered all Claude's key capabilities!");
      }, 1000);
    }
  };
  
  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Claude Capability Explorer</h2>
      
      <div className="mb-6">
        <div 
          className="w-32 h-32 mx-auto bg-purple-600 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={handleClick}
        >
          <div className="text-white text-5xl">C</div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {capabilities.map(capability => (
          <div 
            key={capability.id}
            className={`p-3 rounded-lg border ${found.includes(capability.id) ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-gray-50 opacity-30'}`}
          >
            <div className="font-bold mb-1">{capability.name}</div>
            {found.includes(capability.id) && (
              <div className="text-sm text-gray-600">{capability.description}</div>
            )}
          </div>
        ))}
      </div>
      
      {complete && (
        <div className="p-4 bg-purple-100 rounded-lg border border-purple-300 mt-4">
          <h3 className="font-bold text-lg mb-2">Why I'm Excited About Claude</h3>
          <p className="text-gray-700">
            Claude combines reasoning, creativity, and analytical capabilities in a uniquely helpful way. 
            As an Anthropic sales representative, I would help clients understand how these capabilities 
            can transform their business processes and create new opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default EasterEgg;