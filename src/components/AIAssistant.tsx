import React, { useState, useRef, useEffect } from 'react';
import { C, Btn } from '../lib/design';

const API_KEY = "AIzaSyBFhZELOszd1aF41F60noZHQ0-6HOCOprQ";

export const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Namaste! I am Dr. Salunke, your AI Health Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMessage = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            // Build context from previous messages to maintain conversation thread
            const promptContext = messages
                .map(m => `${m.role === 'assistant' ? 'Dr. Salunke' : 'User'}: ${m.text}`)
                .join('\n') + `\nUser: ${userMessage}\nDr. Salunke:`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: "You are Dr. Salunke, a helpful and professional AI healthcare assistant for the SehatSetu platform. You provide general health guidance, explain platform features like the Digital Health Twin, Telemedicine, and Emergency services, and offer friendly support. Keep responses concise and formatted cleanly." }]
                    },
                    contents: [{ parts: [{ text: userMessage }] }]
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I am having trouble connecting to the network right now.";
            setMessages(prev => [...prev, { role: 'assistant', text: botReply }]);
        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, { role: 'assistant', text: "Systems offline. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
            {isOpen ? (
                <div style={{
                    width: 350, height: 500, background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                    borderRadius: 20, boxShadow: "0 12px 48px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.5)",
                    display: 'flex', flexDirection: 'column', overflow: 'hidden',
                    border: `1px solid rgba(255,255,255,0.7)`
                }}>
                    {/* Header */}
                    <div style={{
                        background: `linear-gradient(135deg, ${C.navy}, ${C.primary})`, padding: "16px",
                        color: "#fff", display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.2)",
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18
                            }}>👨‍⚕️</div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>Dr. Salunke</div>
                                <div style={{ fontSize: 11, opacity: 0.8 }}>AI Health Assistant</div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{
                            background: 'transparent', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', opacity: 0.8
                        }}>×</button>
                    </div>

                    {/* Chat Body */}
                    <div style={{
                        flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12,
                        background: "#f9fafb"
                    }}>
                        {messages.map((m, i) => (
                            <div key={i} style={{
                                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%', padding: "10px 14px",
                                background: m.role === 'user' ? "rgba(43, 90, 165, 0.85)" : "rgba(255, 255, 255, 0.85)",
                                backdropFilter: "blur(12px)",
                                color: m.role === 'user' ? "#fff" : C.text,
                                borderRadius: m.role === 'user' ? "14px 14px 0 14px" : "14px 14px 14px 0",
                                fontSize: 13, lineHeight: 1.5,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.06)", border: m.role === 'user' ? "1px solid rgba(255,255,255,0.1)" : `1px solid rgba(255,255,255,0.6)`
                            }}>
                                {m.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ alignSelf: 'flex-start', fontSize: 12, color: C.textSub, padding: "4px 8px" }}>
                                Dr. Salunke is typing...
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: 12, background: "rgba(255,255,255,0.5)", borderTop: `1px solid rgba(255,255,255,0.5)`, display: 'flex', gap: 8 }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything..."
                            style={{
                                flex: 1, padding: "10px 14px", borderRadius: 20, border: `1px solid ${C.border}`,
                                outline: 'none', fontSize: 13
                            }}
                        />
                        <button onClick={handleSend} disabled={isLoading || !input.trim()} style={{
                            background: C.primary, color: "#fff", border: 'none', borderRadius: "50%",
                            width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: (isLoading || !input.trim()) ? 'default' : 'pointer', opacity: (isLoading || !input.trim()) ? 0.5 : 1
                        }}>
                            ➤
                        </button>
                    </div>
                </div>
            ) : (
                <button onClick={() => setIsOpen(true)} style={{
                    background: `linear-gradient(135deg, ${C.primary}, ${C.navy})`, color: "#fff",
                    border: 'none', borderRadius: 30, padding: "12px 20px",
                    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                    boxShadow: "0 6px 16px rgba(26,61,124,0.3)", transition: "transform 0.2s",
                    fontWeight: 600, fontSize: 14
                }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    <span style={{ fontSize: 18 }}>👨‍⚕️</span> Dr. Salunke
                </button>
            )}
        </div>
    );
};
