import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  ShieldAlert,
  PhoneCall,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  HeartPulse,
  Flame,
  Car,
  Lock,
  ExternalLink
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

export const SafeAssistModal: React.FC = () => {
  const { setActivePage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: `Hello, I am **SafeAssist**, your emergency portal safety guide.\n\n⚠️ **CRITICAL NOTICE**: If this is a life-threatening emergency, call **112** (Universal SOS) or **108** (Ambulance) immediately.\n\nHow can I help guide you today? Select a situation below or describe what has happened.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || 'Please contact 112 or 108 immediately for official emergency help.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: `🚨 **In an immediate emergency, please dial 112 or 108 directly.**\n\nOur system could not reach the server. Please use the **Emergency Contacts** page or call local emergency dispatch without waiting.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    { label: 'Chest pain / Unconscious', text: 'Someone collapsed with chest pain and difficulty breathing' },
    { label: 'Kitchen / Electrical fire', text: 'There is an electrical fire and heavy smoke in our building' },
    { label: 'Severe road crash', text: 'Multi-vehicle road accident with trapped injured passengers' },
    { label: 'Online banking cyber fraud', text: 'Money just got stolen from my bank account through an OTP scam' },
    { label: 'Flood / Water rising', text: 'Flood water is entering our house and basements' }
  ];

  return (
    <>
      {/* Floating Launcher Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105"
        aria-label="Open SafeAssist Emergency AI Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-300"></span>
        </span>
        <MessageSquare className="w-5 h-5 stroke-[2.2]" />
        <span className="hidden sm:inline">SafeAssist AI</span>
      </button>

      {/* Full Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl h-[85vh] max-h-[750px] flex flex-col overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-rose-600 dark:bg-rose-700 text-white px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base tracking-tight">SafeAssist</h3>
                    <span className="text-[10px] font-bold uppercase bg-amber-400 text-rose-950 px-2 py-0.5 rounded-full">
                      Emergency AI Triage
                    </span>
                  </div>
                  <p className="text-xs text-rose-100">
                    Guides to emergency categories & verified first aid protocols
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-rose-950 font-bold text-xs shadow hover:bg-amber-300 transition-colors"
                  title="Call 112 directly"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                  <span>Call 112</span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white hover:bg-white/20 transition-colors"
                  aria-label="Close assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Critical Emergency Banner inside modal */}
            <div className="bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-900 px-4 py-2 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                <strong>Safety Disclaimer:</strong> SafeAssist does not diagnose conditions or replace official dispatchers. Always call 112 / 108 in severe crises.
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
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
                      {m.source && <span>Verified Rule Engine</span>}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic py-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-rose-600" />
                  <span>SafeAssist analyzing safety protocols...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                Quick Triage:
              </span>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(p.text)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-rose-500 hover:text-rose-600 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Describe your situation or emergency need..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || loading}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
