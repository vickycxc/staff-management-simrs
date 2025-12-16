import { useState, useEffect, useRef } from 'react';
import { Bot, Send } from 'lucide-react';

export default function SmartHRAssistant({ staffData }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: 'Halo! Saya Asisten HR. Saya bisa membantu mengecek data SIP, shift, atau statistik pegawai. Apa yang ingin Anda ketahui?',
            quickReplies: ['Cek SIP Expired', 'Siapa Shift Pagi?', 'Total Dokter']
        }
    ]);

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            let response = { text: 'Maaf, saya tidak mengerti.', data: null };
            const lower = text.toLowerCase();

            if (lower.includes('sip') || lower.includes('expired')) {
                const expired = staffData.filter(
                    s =>
                        s.sipExpiry &&
                        s.sipExpiry !== '-' &&
                        new Date(s.sipExpiry) <
                            new Date(new Date().setMonth(new Date().getMonth() + 6))
                );

                response.text =
                    expired.length > 0
                        ? `Ditemukan ${expired.length} pegawai dengan SIP mendekati expired.`
                        : 'Semua SIP pegawai aman.';

                response.data = expired.map(s => ({
                    title: s.name,
                    desc: `Exp: ${s.sipExpiry}`
                }));
            } 
            else if (
                lower.includes('shift') ||
                lower.includes('pagi') ||
                lower.includes('sore') ||
                lower.includes('malam')
            ) {
                const shiftName = lower.includes('pagi')
                    ? 'Pagi'
                    : lower.includes('sore')
                    ? 'Sore'
                    : 'Malam';

                const shift = staffData.filter(
                    s =>
                        s.currentShift === shiftName ||
                        (shiftName === 'Pagi' && s.currentShift === 'Office Hour')
                );

                response.text = `Ada ${shift.length} pegawai di Shift ${shiftName}.`;
                response.data = shift.map(s => ({
                    title: s.name,
                    desc: `${s.role} - ${s.unit}`
                }));
            } 
            else if (lower.includes('dokter')) {
                const docs = staffData.filter(s =>
                    s.category?.includes('Dokter')
                );

                response.text = `Total ada ${docs.length} dokter terdaftar.`;
                response.data = docs.map(s => ({
                    title: s.name,
                    desc: s.category
                }));
            }

            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, sender: 'bot', ...response }
            ]);

            setIsTyping(false);
        }, 800);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
            
            <div className="bg-[#17B8A5] p-4 flex items-center gap-3 text-white shadow-sm">
                <div className="p-2 bg-white/20 rounded-full">
                    <Bot size={24} />
                </div>
                <div>
                    <h3 className="font-bold">Asisten HR</h3>
                    <p className="text-xs opacity-90">Online • AI Support</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${
                            msg.sender === 'user' ? 'items-end' : 'items-start'
                        }`}
                    >
                        <div
                            className={`max-w-[80%] p-3.5 rounded-2xl text-sm ${
                                msg.sender === 'user'
                                    ? 'bg-[#17B8A5] text-white rounded-tr-none'
                                    : 'bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-tl-none shadow-sm'
                            }`}
                        >
                            {msg.text}
                        </div>

                        {msg.data && (
                            <div className="mt-2 w-[80%] bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden shadow-sm">
                                <div className="max-h-48 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-600">
                                    {msg.data.map((d, i) => (
                                        <div
                                            key={i}
                                            className="p-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <p className="font-bold">{d.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {d.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {msg.quickReplies && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {msg.quickReplies.map(r => (
                                    <button
                                        key={r}
                                        onClick={() => handleSend(r)}
                                        className="text-xs px-3 py-1.5 bg-white dark:bg-gray-700 border border-[#17B8A5] text-[#17B8A5] rounded-full hover:bg-[#F0FDFA] transition"
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="p-3 bg-white dark:bg-gray-700 rounded-2xl w-16 flex justify-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    </div>
                )}

                <div ref={scrollRef} />
            </div>

            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSend();
                }}
                className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2"
            >
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Tanya sesuatu..."
                    className="flex-1 px-4 py-2 border rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#17B8A5]"
                />
                <button
                    type="submit"
                    className="p-2.5 bg-[#17B8A5] text-white rounded-full hover:bg-[#0F8F80] transition"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
