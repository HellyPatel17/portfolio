
import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Layout, 
  Database, 
  GraduationCap, 
  Award,
  Briefcase,
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  Send,
  Loader2,
  Bot,
  User,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, EXPERIENCES, EDUCATION_DATA, SKILL_CATEGORIES, CERTIFICATIONS, AI_SYSTEM_INSTRUCTION } from './constants.tsx';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I'm Helly's AI Assistant. Ask me anything about her skills, experience, or projects!" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'projects', 'education'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const message = userInput.trim();
    setUserInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: message }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: {
          systemInstruction: AI_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Feel free to reach out to Helly directly!";
      setChatMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setChatMessages(prev => [...prev, { role: 'bot', text: "There was an error connecting to my brain. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 font-bold text-xl tracking-tighter text-indigo-600 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">H</div>
              HELLY PATEL
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-semibold transition-all duration-300 relative group ${
                      activeSection === link.href.substring(1) 
                        ? 'text-indigo-600' 
                        : 'text-slate-500 hover:text-indigo-600'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </a>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute w-full bg-white border-b border-slate-200 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-slate-200/30 rounded-full blur-2xl"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold tracking-widest text-indigo-700 uppercase bg-indigo-100/50 backdrop-blur-sm rounded-full border border-indigo-200">
            <Sparkles size={14} className="animate-pulse" /> Android Developer • UI/UX Enthusiast
          </div>
          <h1 className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
            Transforming Ideas <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Into Experiences.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Building robust mobile applications with a focus on seamless design and scalable architecture.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <a href="mailto:231263107037setice@gmail.com" className="group relative flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200">
              <Mail size={20} /> Let's Talk
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4">
              <a href="#" className="p-4 text-slate-600 hover:text-indigo-600 hover:bg-white hover:border-indigo-200 transition-all bg-transparent rounded-2xl border border-slate-300">
                <Linkedin size={22} />
              </a>
              <a href="#" className="p-4 text-slate-600 hover:text-indigo-600 hover:bg-white hover:border-indigo-200 transition-all bg-transparent rounded-2xl border border-slate-300">
                <Github size={22} />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-400 font-semibold text-sm">
            <div className="flex items-center gap-2"><MapPin size={18} className="text-indigo-500" /> Ahmedabad, Gujarat</div>
            <div className="flex items-center gap-2"><Briefcase size={18} className="text-indigo-500" /> Open for Opportunities</div>
          </div>
        </div>
      </section>

      {/* Stats / Highlight Bar */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">BE</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Computer Eng.</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">Android</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Specialization</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">Intern</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">CreArt & IBM</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-1">UI/UX</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Design Focused</div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Experience</h2>
              <div className="h-1.5 w-24 bg-indigo-600 rounded-full"></div>
            </div>
            <p className="text-slate-500 max-w-md font-medium">My journey through high-impact internships and training programs.</p>
          </div>

          <div className="space-y-6">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-100/50">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black rounded-full mb-4 uppercase tracking-tighter">
                      {exp.date}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{exp.company}</h3>
                    <p className="text-lg font-semibold text-slate-600 mb-4">{exp.role}</p>
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                      <MapPin size={16} /> {exp.location}
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <ul className="space-y-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex gap-4 text-slate-600 leading-relaxed font-medium">
                          <div className="mt-2.5 w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Certs */}
      <section id="skills" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Technical Arsenal</h2>
            <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 font-medium">A blend of core engineering and modern mobile technologies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="relative group p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-indigo-100 transition-all duration-500 overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {idx === 0 && <Code2 size={28} />}
                    {idx === 1 && <Layout size={28} />}
                    {idx === 2 && <Database size={28} />}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 font-bold shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-600 p-12 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all"></div>
            <h3 className="text-3xl font-black mb-10 flex items-center gap-3 relative z-10">
              <Award size={32} /> Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all group/cert">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover/cert:bg-white group-hover/cert:text-indigo-600 transition-all">
                    <Sparkles size={16} />
                  </div>
                  <div className="font-bold text-lg">{cert}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Featured Projects</h2>
            <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {PROJECTS.map((proj, idx) => (
              <div key={idx} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[16/10] w-full overflow-hidden relative">
                  <img 
                    src={proj.imageUrl} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600">
                    {proj.date}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-2.5 mb-10">
                    {proj.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
                    Case Study <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Academic Journey</h2>
            <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {EDUCATION_DATA.map((edu, idx) => (
              <div key={idx} className="relative p-10 rounded-[2.5rem] border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-200 transition-all group overflow-hidden">
                <div className="absolute -right-8 -bottom-8 text-indigo-50 group-hover:text-indigo-100 transition-colors">
                  <GraduationCap size={160} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-tighter">
                      {edu.date}
                    </div>
                    <div className="text-indigo-600 font-black text-xl">CGPA: {edu.cgpa}</div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{edu.institution}</h3>
                  <p className="text-lg font-bold text-slate-500 mb-8">{edu.degree}</p>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                    <MapPin size={16} /> {edu.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600"></div>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 text-3xl font-black mb-8 shadow-2xl shadow-indigo-500/20">H</div>
          <h2 className="text-4xl font-black mb-8 tracking-tighter">HELLY PATEL</h2>
          <div className="flex justify-center gap-8 mb-16">
            <a href="mailto:231263107037setice@gmail.com" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-indigo-600 transition-all hover:-translate-y-1">
              <Mail size={22} />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-indigo-600 transition-all hover:-translate-y-1">
              <Linkedin size={22} />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-indigo-600 transition-all hover:-translate-y-1">
              <Github size={22} />
            </a>
          </div>
          <p className="text-slate-500 font-bold mb-12 tracking-wide">
            © {new Date().getFullYear()} DESIGNED & ENGINEERED BY HELLY PATEL
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
            <span>Android Dev</span>
            <span>UI/UX Designer</span>
            <span>Computer Engineer</span>
          </div>
        </div>
      </footer>

      {/* Floating AI Chat Assistant */}
      <div className={`fixed bottom-6 right-6 z-[60] flex flex-col items-end transition-all duration-500 ${isChatOpen ? 'w-full max-w-[400px]' : 'w-auto'}`}>
        <div className={`bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden w-full transition-all duration-500 transform origin-bottom-right ${isChatOpen ? 'scale-100 opacity-100 mb-4 h-[500px]' : 'scale-0 opacity-0 h-0 pointer-events-none'}`}>
          {/* Chat Header */}
          <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <div className="font-black text-sm tracking-tight">Helly's AI Assistant</div>
                <div className="text-[10px] font-bold text-indigo-400 flex items-center gap-1 uppercase">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-[340px] overflow-y-auto p-6 space-y-4 bg-slate-50 scrollbar-hide">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-indigo-600" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Footer */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about her skills..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 font-medium"
            />
            <button 
              type="submit" 
              disabled={!userInput.trim() || isTyping}
              className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`group flex items-center gap-3 px-6 py-4 rounded-[2rem] shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            isChatOpen ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'
          }`}
        >
          <span className="font-black text-sm uppercase tracking-tighter">
            {isChatOpen ? 'Close Chat' : 'Resume AI'}
          </span>
          <div className="relative">
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
            {!isChatOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-indigo-600"></span>}
          </div>
        </button>
      </div>
    </div>
  );
};

export default App;
