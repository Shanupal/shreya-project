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
      await dispatch(sendMessage({ to: "support", text, room: "student-support" })).unwrap();
      toast.success("Message sent");
      setText("");
      dispatch(fetchChatHistory({}));
    } catch(e:any){ toast.error("Failed to send"); }
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">AI Support</h2>
        <div className="mb-3">
          <div className="flex gap-2">
            <Input value={text} onChange={(e:any)=>setText(e.target.value)} placeholder="Describe how you feel or choose a suggestion" />
            <Button onClick={handleGetRecs}><Send size={16}/> Get Recommendations</Button>
          </div>
          <div className="mt-2 flex gap-2">
            {quickSuggestions.map((q)=> <Badge key={q} onClick={()=>handleQuick(q)} className="cursor-pointer">{q}</Badge>)}
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
          <div className="border rounded p-3 max-h-64 overflow-auto">
            {messages && messages.length ? messages.map((m:any, idx:number)=>(
              <div key={idx} className={`mb-2 ${m.sender==='user'?'text-right':''}`}>
                <div className="inline-block p-2 rounded bg-surface">{m.text}</div>
                <div className="text-xs text-muted-foreground">{new Date(m.createdAt||m.timestamp).toLocaleString()}</div>
              </div>
            )) : <div>No messages yet</div>}
          </div>
          <div className="mt-2 flex gap-2">
            <Input value={text} onChange={(e:any)=>setText(e.target.value)} placeholder="Type a message" />
            <Button onClick={handleSend}><Send size={16}/></Button>
          </div>
        </div>
      </Card>
    </section>
  );
};
