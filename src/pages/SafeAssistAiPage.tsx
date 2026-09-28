import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Send,
  ShieldAlert,
  PhoneCall,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  HeartPulse,
  Flame,
  Shield,
  LifeBuoy,
  Info
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

export const SafeAssistAiPage: React.FC = () => {
  const { setActivePage } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-start',
      sender: 'assistant',
      text: `Welcome to **SafeAssist**, your AI Emergency Triage Assistant.\n\n🚨 **URGENT NOTICE**: If someone is unconscious, bleeding profusely, or in immediate life-threatening danger, **do not wait for an AI response**. Dial **112** (Universal SOS) or **108** (Ambulance) directly from your phone!\n\nI can help you with:\n1. Finding the right emergency service category (Trauma Centers, Burn units, PCR patrol, Fire brigade).\n2. First aid protocols (Hands-only CPR, F.A.S.T. stroke test, direct pressure on wounds, burn cooling).\n3. Guidance on what information to give the emergency dispatcher.\n\nHow can I help you right now?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (queryText?: string) => {
    const text = queryText || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || 'Please contact 112 or 108 directly for immediate emergency help.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `🚨 **In an immediate emergency, please dial 112 or 108 directly.**\n\nOur assistant is operating in safe fallback mode. Please consult the **Emergency Contacts** directory.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    { label: 'Chest pain & shortness of breath', query: 'Elderly family member has sudden heavy chest pain and difficulty breathing' },
    { label: 'Electrical or kitchen fire', query: 'Electrical socket caught fire with smoke in room' },
    { label: 'Severe road accident & bleeding', query: 'Motorcycle collided with car, rider bleeding from leg' },
    { label: 'Online banking cyber scam', query: 'I received a fake OTP message and money was debited from my bank account' },
    { label: 'Flooding in residential area', query: 'Monsoon rainwater entered ground floor and drain is backing up' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          <MessageSquare className="w-4 h-4" />
          <span>Intelligent Emergency Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
          SafeAssist AI Emergency Assistant
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Powered by Gemini 3.8-flash for rapid situational triage, first aid steps, and on-site resource matching.
        </p>
      </div>

      {/* Safety Boundary Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-900 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <h4 className="font-bold text-amber-950 dark:text-amber-100">
            Assistant Limitations & Disclaimers:
          </h4>
          <p className="mt-0.5">
            SafeAssist does <strong>NOT</strong> diagnose medical diseases, prescribe drugs, or substitute for 911/112 emergency dispatchers. It provides immediate, calm, standardized life-safety instructions while official help is on the way.
          </p>
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md flex flex-col h-[650px] overflow-hidden">
        {/* Chat Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm">SafeAssist Operational Console</h3>
              <p className="text-[11px] text-slate-300">Verified Protocol Engine Active</p>
            </div>
          </div>

          <a
            href="tel:112"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency 112</span>
          </a>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-rose-600 text-white rounded-br-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                <div
                  className={`text-[10px] mt-2 flex items-center justify-between gap-2 ${
                    m.sender === 'user' ? 'text-rose-200' : 'text-slate-400'
                  }`}
                >
                  <span>{m.timestamp}</span>
                  {m.source && <span>Source: {m.source}</span>}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic py-2">
              <RefreshCw className="w-4 h-4 animate-spin text-rose-600" />
              <span>SafeAssist retrieving verified safety guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          <span className="font-bold text-slate-400 uppercase tracking-wider shrink-0 text-[10px]">
            Suggestions:
          </span>
          {samplePrompts.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(s.query)}
              className="shrink-0 px-3 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-rose-500 hover:text-rose-600 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your emergency query or ask for safety steps..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow transition-colors"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
