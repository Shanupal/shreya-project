import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Phone, Calendar, Heart, User, Bot } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRecommendations, matchCounselor } from "@/slices/supportSlice";
import { sendMessage, fetchChatHistory } from "@/slices/chatSlice";
import { toast } from "react-toastify";

interface Message { id: string; text: string; sender: "user" | "ai"; timestamp: Date; }

const quickSuggestions = [
  "I'm feeling anxious about exams",
  "Having trouble sleeping",
  "Feeling overwhelmed with coursework",
  "Need stress management tips",
];

export const AISupport = () => {
  const dispatch = useAppDispatch();
  const { recommendations, loading } = useAppSelector((s)=>s.support);
  const { messages } = useAppSelector((s)=>s.chat);
  const [text, setText] = useState("");

  useEffect(()=> {
    // preload recommendations
    dispatch(fetchRecommendations({ mood: "Anxious" })).unwrap().catch(()=>{});
  },[dispatch]);

  const handleQuick = (q:string) => { setText(q); };

  const handleGetRecs = async () => {
    try {
      await dispatch(fetchRecommendations({ mood: text || "Anxious" })).unwrap();
      toast.success("Recommendations loaded");
    } catch(e:any){ toast.error("Failed to load recommendations"); }
  };

  const handleMatch = async (counselorId:string) => {
    try {
      await dispatch(matchCounselor({ counselorId, reason: "Requested via UI" })).unwrap();
      toast.success("Matched with counselor — check your chat");
      // load chat history
      dispatch(fetchChatHistory({ userId: counselorId }));
    } catch(e:any){ toast.error("Failed to match"); }
  };

  const handleSend = async () => {
    if(!text) return;
    try {
      // Add user message to local state immediately for better UX
      const userMessage = {
        id: Date.now().toString(),
        text: text,
        sender: "user" as const,
        timestamp: new Date(),
        createdAt: new Date().toISOString()
      };
      
      // For demo purposes, add a simulated AI response
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(text),
        sender: "ai" as const,
        timestamp: new Date(Date.now() + 1000),
        createdAt: new Date(Date.now() + 1000).toISOString()
      };
      
      // Store messages in localStorage for demo
      const existingMessages = JSON.parse(localStorage.getItem("chat_messages") || "[]");
      existingMessages.push(userMessage, aiResponse);
      localStorage.setItem("chat_messages", JSON.stringify(existingMessages.slice(-100))); // Keep last 100 messages
      
      await dispatch(sendMessage({ to: "support", text, room: "student-support" })).unwrap();
      toast.success("Message sent");
      setText("");
      dispatch(fetchChatHistory({}));
    } catch(e:any){ toast.error("Failed to send"); }
  };

  // Generate AI response based on user input (demo functionality)
  const generateAIResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes("anxious") || lowerText.includes("anxiety")) {
      return "I understand you're feeling anxious. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. This can help calm your nervous system. Would you like me to guide you through some other anxiety management techniques?";
    } else if (lowerText.includes("stress") || lowerText.includes("overwhelmed")) {
      return "Feeling overwhelmed is completely normal, especially as a student. Let's break things down into smaller, manageable steps. What's the most pressing thing on your mind right now? Sometimes just talking through it can help clarify priorities.";
    } else if (lowerText.includes("sleep") || lowerText.includes("tired")) {
      return "Sleep is crucial for mental health. Try establishing a bedtime routine: no screens 1 hour before bed, keep your room cool and dark, and consider some light stretching or meditation. What's been keeping you up at night?";
    } else if (lowerText.includes("exam") || lowerText.includes("test")) {
      return "Exam stress is very common. Remember to take regular breaks while studying (try the Pomodoro technique), stay hydrated, and get enough sleep. Your worth isn't defined by test scores. What specific aspect of exam preparation is worrying you most?";
    } else if (lowerText.includes("sad") || lowerText.includes("depressed") || lowerText.includes("down")) {
      return "I'm sorry you're feeling this way. Your feelings are valid, and it's brave of you to reach out. Consider talking to a counselor, spending time in nature, or doing a small activity you enjoy. If these feelings persist, please consider speaking with a mental health professional. You're not alone in this.";
    } else {
      return "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about what you're experiencing? Sometimes talking through our thoughts and feelings can help us process them better.";
    }
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">AI Support</h2>
        <div className="mb-3">
          <div className="flex gap-2">
            <Input 
              value={text} 
              onChange={(e:any)=>setText(e.target.value)} 
              placeholder="Describe how you feel or choose a suggestion"
              onKeyPress={(e) => e.key === 'Enter' && handleGetRecs()}
            />
            <Button onClick={handleGetRecs} disabled={!text.trim()}>
              <Send size={16}/> Get Recommendations
            </Button>
          </div>
          <div className="mt-2 flex gap-2">
            {quickSuggestions.map((q)=> (
              <Badge 
                key={q} 
                onClick={()=>handleQuick(q)} 
                className="cursor-pointer hover:bg-wellness-primary/20 transition-colors"
              >
                {q}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Recommendations</h3>
          {loading && <div>Loading...</div>}
          <ul className="space-y-2">
            {recommendations && recommendations.length ? recommendations.map((r:any)=>(
              <li key={r.id} className="p-2 border rounded">
                <div className="font-semibold">{r.title || r.name}</div>
                <div className="text-sm">{r.description || r.summary}</div>
                {r.counselorId && <Button onClick={()=>handleMatch(r.counselorId)}>Match with {r.name || "Counselor"}</Button>}
              </li>
            )) : <li>No recommendations</li>}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Chat</h3>
          <div className="border rounded p-3 max-h-64 overflow-auto bg-muted/20">
            {messages && messages.length ? messages.map((m:any, idx:number)=>(
              <div key={idx} className={`mb-3 ${m.sender==='user'?'text-right':''}`}>
                <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  m.sender === 'user' 
                    ? 'bg-wellness-primary text-white' 
                    : 'bg-white border shadow-sm'
                }`}>
                  {m.text}
                </div>
                <div className="text-xs text-muted-foreground">{new Date(m.createdAt||m.timestamp).toLocaleString()}</div>
              </div>
            )) : (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Start a conversation with our AI support assistant</p>
              </div>
            )}
          </div>
          <div className="mt-2 flex gap-2">
            <Input 
              value={text} 
              onChange={(e:any)=>setText(e.target.value)} 
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} disabled={!text.trim()}>
              <Send size={16}/>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};
