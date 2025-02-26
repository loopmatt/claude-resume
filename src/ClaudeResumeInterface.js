import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import LearningJourney from './components/LearningJourney';
import Visualizer from './components/Visualizer';
import EasterEgg from './components/EasterEgg';
import './claude-styles.css';

const ClaudeResumeInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLearningJourney, setShowLearningJourney] = useState(false);
  const [showPotential, setShowPotential] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Responses database
  const responses = {
    'welcome': `Hello! I'm [Your Name]'s interactive resume in Claude format. I can tell you about:

- **Projects** (things I've built)
- **Skills** (what I bring to the table)
- **Why Anthropic** (my passion for Claude)
- **Learning** (how I master new domains)
- **Vision** (my ideas for AI sales)

Simply type one of these keywords to learn more or discover hidden commands!`,
    
    'projects': `Here are some projects I've built that demonstrate my initiative and technical understanding:

1. **Personalized Learning Assistant** - Built a Claude-powered tool that helps users create customized learning paths based on their goals

2. **Content Generator** - Developed a system that helps small businesses create marketing content using AI

3. **Data Visualization Dashboard** - Created an interactive dashboard to help teams understand customer feedback patterns

These projects showcase my ability to identify problems and build solutions using AI. Type **Projects 1**, **Projects 2**, or **Projects 3** to learn more about any specific project.`,
    
    'skills': `My key skills relevant to AI sales include:

• **Quick Learning** - Rapidly master new technologies and domains
• **People Understanding** - Strong empathy and communication skills
• **Technical Translation** - Ability to explain complex concepts simply
• **High Initiative** - Self-starter who identifies opportunities
• **Problem Solving** - Creative approach to customer challenges

Type **Learning** to see my approach to mastering new domains.`,
    
    'why anthropic': `Claude represents the future of AI that augments human potential rather than replacing it. I'm passionate about Anthropic because:

1. The focus on building AI that's **helpful, harmless, and honest** aligns with my values
2. Claude's capabilities provide **genuine business value** across industries
3. There's a massive opportunity to help organizations understand how to **leverage this transformative technology**

I want to be part of bringing Claude to organizations that can benefit from its capabilities, helping them understand not just what Claude can do, but how it can solve their specific problems.`,
    
    'learning': `My approach to learning new domains is systematic and efficient:

1. **Immersive Exploration** - I dive deep into understanding core concepts
2. **Pattern Recognition** - I connect new information to existing knowledge
3. **Practical Application** - I build real projects to solidify understanding
4. **Teaching Others** - I explain concepts to deepen my own mastery

This approach has allowed me to quickly master new technologies and domains throughout my career.

Type **!LEARNING** to see my learning process visualized.`,
    
    'vision': `I see three major opportunities for Claude in the enterprise market:

1. **Knowledge Orchestration** - Helping organizations make their internal knowledge accessible and actionable
2. **Customer Experience Enhancement** - Creating personalized, intelligent interactions across all touchpoints
3. **Decision Support Systems** - Providing nuanced analysis to improve strategic and operational decisions

The key to success is helping clients see beyond the technology to the specific business outcomes Claude can enable. My approach would be consultative, focusing on identifying high-value use cases for each prospect's unique situation.`,
    
    '!potential': `Discovering hidden commands! Nice work.

This hidden feature reveals how my unique combination of skills creates potential in AI sales.`,
    
    '!learning': `Interactive learning journey visualization triggered!

This shows my systematic approach to mastering new domains.`,
    
    '!claude': `You've discovered a special Claude easter egg!

Just like Claude has special features, I've included this interactive element to demonstrate my understanding of Claude's unique capabilities.`,
    
    'begin': 'welcome',
    'start': 'welcome',
    'hello': 'welcome',
    'hi': 'welcome',
    'help': 'welcome'
  };
  
  // Project details
  const projectDetails = {
    '1': `**Personalized Learning Assistant**

This project uses Claude to analyze a person's learning goals, current knowledge, and preferred learning style to create personalized learning paths.

• **Technologies**: Claude API, React, Node.js
• **Problem Solved**: Helps users navigate the overwhelming amount of learning resources available online
• **Outcome**: Reduced average learning time for specific skills by 40%

This project demonstrates my ability to identify a real problem and build a practical AI-powered solution.`,
    
    '2': `**Content Generator**

I developed a system that helps small businesses create consistent, high-quality marketing content using AI.

• **Technologies**: Claude API, GPT-4, Next.js
• **Problem Solved**: Small businesses struggle to maintain consistent content creation
• **Outcome**: Helped 5 local businesses increase their social media engagement by an average of 62%

This project shows my understanding of business needs and how AI can address real challenges.`,
    
    '3': `**Data Visualization Dashboard**

Created an interactive dashboard that helps teams understand patterns in customer feedback.

• **Technologies**: D3.js, Claude API for sentiment analysis, React
• **Problem Solved**: Making sense of large volumes of unstructured customer feedback
• **Outcome**: Helped identify three major product improvement opportunities

This project demonstrates my technical skills and ability to transform raw data into actionable insights.`
  };
  
  // Add initial welcome message when component mounts
  useEffect(() => {
    setTimeout(() => {
      addBotMessage(responses.welcome);
    }, 1000);
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Adjust textarea height as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);
  
  // Calculate typing delay based on message length
  const calculateTypingDelay = (message) => {
    // Claude types at approximately 300 characters per second, with a minimum delay
    const charCount = message.length;
    return Math.max(700, Math.min(charCount * 10, 3000));
  };
  
  // Add a user message to the chat
  const addUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isUser: true }
    ]);
  };
  
  // Add a bot message to the chat with typing effect
  const addBotMessage = (message) => {
    setIsTyping(true);
    
    // Calculate delay based on message length
    const delay = calculateTypingDelay(message);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: false }
      ]);
      
      // Handle special commands
      if (message.includes('!LEARNING')) {
        setTimeout(() => setShowLearningJourney(true), 500);
      } else if (message.includes('!POTENTIAL')) {
        setTimeout(() => setShowPotential(true), 500);
      } else if (message.includes('!CLAUDE')) {
        setTimeout(() => setShowEasterEgg(true), 500);
      }
    }, delay);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userInput = inputValue.trim();
    addUserMessage(userInput);
    setInputValue('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Process the user input and generate response
    processInput(userInput);
  };
  
  // Process user input and determine response
  const processInput = (input) => {
    // Convert to lowercase for matching
    const lowerInput = input.toLowerCase();
    
    // Check for project details
    if (lowerInput.startsWith('projects ')) {
      const projectNum = lowerInput.split(' ')[1];
      if (projectDetails[projectNum]) {
        addBotMessage(projectDetails[projectNum]);
        return;
      }
    }
    
    // Check for direct matches in responses
    if (responses[lowerInput]) {
      // If the response is a key to another response, use that
      if (typeof responses[lowerInput] === 'string' && responses[responses[lowerInput]]) {
        addBotMessage(responses[responses[lowerInput]]);
      } else {
        addBotMessage(responses[lowerInput]);
      }
      return;
    }
    
    // Handle easter eggs
    if (lowerInput === '!learning') {
      addBotMessage(responses['!learning']);
      return;
    } else if (lowerInput === '!potential') {
      addBotMessage(responses['!potential']);
      return;
    } else if (lowerInput === '!claude') {
      addBotMessage(responses['!claude']);
      return;
    }
    
    // Default response for unrecognized inputs
    addBotMessage(`I don't have information on "${input}". Try one of these topics: Projects, Skills, Why Anthropic, Learning, or Vision. Or try to discover hidden commands!`);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Handle key press (Enter to submit, Shift+Enter for new line)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  return (
    <div className="claude-container">
      {/* Claude Header */}
      <header className="claude-header">
        <div className="claude-logo">
          <img src="/anthropic-logo.svg" alt="Anthropic" height="24" />
          <span>Claude</span>
        </div>
        <nav className="claude-nav">
          <a href="#" className="claude-nav-item">Interactive Resume</a>
          <a href="#" className="claude-nav-item">About</a>
          <a href="#" className="claude-nav-item">Contact</a>
        </nav>
      </header>
      
      {/* Chat Container */}
      <div ref={chatContainerRef} className="claude-chat-container">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`claude-message ${message.isUser ? 'claude-message-user' : 'claude-message-assistant'} claude-fade-in`}
          >
            <div className="claude-message-attribution">
              {message.isUser ? "You" : "Claude"}
            </div>
            <div 
              className={`claude-message-content ${message.isUser ? 'claude-user-content' : 'claude-assistant-content'}`}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
              
              {/* Add interactive components inline with assistant messages */}
              {!message.isUser && message.text.includes('!LEARNING') && showLearningJourney && (
                <div className="claude-interactive-component">
                  <LearningJourney />
                </div>
              )}
              
              {!message.isUser && message.text.includes('!POTENTIAL') && showPotential && (
                <div className="claude-interactive-component">
                  <Visualizer />
                </div>
              )}
              
              {!message.isUser && message.text.includes('!CLAUDE') && showEasterEgg && (
                <div className="claude-interactive-component">
                  <EasterEgg />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="claude-message claude-message-assistant claude-fade-in">
            <div className="claude-message-attribution">Claude</div>
            <div className="claude-typing-indicator">
              <div className="claude-typing-dot"></div>
              <div className="claude-typing-dot"></div>
              <div className="claude-typing-dot"></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Input Container */}
      <div className="claude-input-container">
        <form onSubmit={handleSubmit} className="claude-input-form">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type a command (e.g., Projects, Skills, !CLAUDE)"
            className="claude-input-textarea"
            rows={1}
          />
          <button
            type="submit"
            className="claude-send-button"
            disabled={!inputValue.trim()}
          >
            Send
          </button>
        </form>
        
        <div className="claude-footer">
          Try finding hidden commands starting with "!" to discover more about me.
        </div>
      </div>
    </div>
  );
};

export default ClaudeResumeInterface;