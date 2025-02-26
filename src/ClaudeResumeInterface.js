import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import LearningJourney from './components/LearningJourney';
import Visualizer from './components/Visualizer';
import EasterEgg from './components/EasterEgg';
import './claude-dark-styles.css';

// SVG Icons
const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 9L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 15C3 18.3137 5.68629 21 9 21H15C18.3137 21 21 18.3137 21 15V9C21 5.68629 18.3137 3 15 3H9C5.68629 3 3 5.68629 3 9V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8139 2.3057 20.0878 2.37152 20.2566C2.42868 20.4031 2.55144 20.5142 2.70292 20.5565C2.87736 20.6052 3.14083 20.4866 3.66776 20.2495L20.3792 12.7944C20.8936 12.5663 21.1507 12.4522 21.2302 12.2966C21.2993 12.1563 21.2993 11.9945 21.2302 11.8541C21.1507 11.6985 20.8936 11.5844 20.3792 11.3563L3.66193 3.89901C3.13535 3.66195 2.87206 3.54342 2.69776 3.59214C2.54678 3.63442 2.42438 3.74518 2.36745 3.89132C2.30185 4.05991 2.39283 4.33377 2.5748 4.88148L4.91637 11.7086C4.94759 11.7747 4.96321 11.8078 4.96999 11.8423C4.97593 11.8726 4.97593 11.9037 4.96999 11.934C4.96321 11.9685 4.94759 12.0015 4.91637 12.0676L4.91577 12.2915Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClipboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V7C20 5.89543 19.1046 5 18 5H16M8 5V3C8 1.89543 8.89543 1 10 1H14C15.1046 1 16 1.89543 16 3V5M8 5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ThumbsUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.335 22 19.1424 21.3962 19.3805 20.5192L21.4333 13.5192C21.7585 12.3098 20.8487 11.114 19.579 11.0192L15 10.5C14.0312 10.425 13.2886 9.73797 13.1535 8.77907L12.5 4.5C12.2886 3.17596 11.1543 2.25493 9.8125 2.51874C8.47067 2.78256 7.55 4.08162 7.8125 5.42406L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ThumbsDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 2V13M22 11V4C22 2.89543 21.1046 2 20 2H6.57375C5.66501 2 4.85759 2.60384 4.61946 3.48078L2.56671 10.4808C2.24154 11.6902 3.15128 12.886 4.42098 12.9808L9 13.5C9.96878 13.575 10.7114 14.262 10.8465 15.2209L11.5 19.5C11.7114 20.824 12.8457 21.7451 14.1875 21.4813C15.5293 21.2174 16.45 19.9184 16.1875 18.5759L15 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RetryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 8V3M21 3H16M21 3L15 9M10 4.00006C6.50005 4.50006 4 7.50006 4 11.0001C4 14.5001 6.5 17.5001 10 18.0001M14 20.0001C17.5 19.5001 20 16.5001 20 13.0001C20 12.5001 19.951 12.0111 19.852 11.5341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttachmentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1525 10.8995L12.1369 19.9151C10.0866 21.9654 6.7995 21.9654 4.74924 19.9151C2.69898 17.8649 2.69898 14.5778 4.74924 12.5275L13.7648 3.51193C15.0151 2.26164 17.0654 2.26164 18.3157 3.51193C19.566 4.76222 19.566 6.81252 18.3157 8.06281L10.5109 15.8676C9.88577 16.4928 8.92556 16.4928 8.30042 15.8676C7.67528 15.2425 7.67528 14.2823 8.30042 13.6571L14.8483 7.10925" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
  
  // Process user input and determine response - same as before
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
        <div className="claude-logo">Claude</div>
        <div className="claude-chat-title">
          <ChatIcon />
          Resume Building Assistance
        </div>
        <div className="claude-nav">
          <button className="claude-nav-button">
            <ShareIcon />
          </button>
          <div className="claude-avatar">MP</div>
        </div>
      </header>
      
      <div className="claude-main">
        {/* Sidebar Indicator */}
        <div className="claude-sidebar-indicator">
          <div className="claude-sidebar-avatar">MP</div>
        </div>
        
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
              
              {!message.isUser && (
                <div className="claude-message-actions">
                  <button className="claude-message-action">
                    <ClipboardIcon />
                  </button>
                  <button className="claude-message-action">
                    <ThumbsUpIcon />
                  </button>
                  <button className="claude-message-action">
                    <ThumbsDownIcon />
                  </button>
                  <button className="claude-message-action">
                    <RetryIcon />
                  </button>
                </div>
              )}
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
          
          {/* Disclaimer notice */}
          {messages.length > 0 && !isTyping && (
            <div className="claude-footer">
              Claude can make mistakes. Please double-check responses.
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
              placeholder="Reply to Claude..."
              className="claude-input-textarea"
              rows={1}
            />
            
            <div className="claude-input-actions">
              <div className="claude-input-options">
                <button type="button" className="claude-option-button">
                  <AttachmentIcon />
                </button>
              </div>
              
              <button
                type="submit"
                className="claude-send-button"
                disabled={!inputValue.trim()}
              >
                <SendIcon />
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClaudeResumeInterface;