import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, TrendingUp, Heart, Smile, Meh, Frown, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logEmotion, fetchEmotionHistory } from "@/slices/emotionSlice";
import { toast } from "react-toastify";

const moodOptions = [
  { id: 1, label: "Excellent", icon: Smile, color: "bg-wellness-success", emoji: "😊" },
  { id: 2, label: "Good", icon: Smile, color: "bg-wellness-secondary", emoji: "🙂" },
  { id: 3, label: "Okay", icon: Meh, color: "bg-wellness-warning", emoji: "😐" },
  { id: 4, label: "Low", icon: Frown, color: "bg-orange-500", emoji: "😔" },
  { id: 5, label: "Very Low", icon: AlertTriangle, color: "bg-destructive", emoji: "😟" },
];

export const MoodTracker = () => {
  const dispatch = useAppDispatch();
  const { logs, loading, error } = useAppSelector((s) => s.emotion);
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    // fetch history on mount
    dispatch(fetchEmotionHistory({ range: "weekly" }))
      .unwrap()
      .catch((e:any)=>{ console.error(e); });
  }, [dispatch]);

  const submit = async () => {
    if (!selected) { toast.error("Please select your mood"); return; }
    try {
      const payload = { moodId: selected, intensity: selected, note };
      await dispatch(logEmotion(payload)).unwrap();
      toast.success("Mood logged successfully");
      setNote("");
      setSelected(null);
      // refresh history
      dispatch(fetchEmotionHistory({ range: "weekly" }));
    } catch (e:any) {
      toast.error(e?.message || "Failed to log mood");
    }
  };

  return (
    <section className="container mx-auto px-4 py-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">How are you feeling right now?</h2>
        <div className="flex gap-3 mb-4">
          {moodOptions.map((m) => (
            <button key={m.id} onClick={() => setSelected(m.id)} className={`p-3 rounded-md ${selected===m.id? "ring-2 ring-offset-2":""}`}>
              <div className="text-2xl">{m.emoji}</div>
              <div className="text-sm mt-1">{m.label}</div>
            </button>
          ))}
        </div>
        <Textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Add a note (optional)" />
        <div className="mt-4">
          <Button onClick={submit}>Log Mood</Button>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Recent entries</h3>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-600">Error loading history</div>}
          <ul className="space-y-2">
            {logs && logs.length ? logs.map((l:any, idx:number)=>(
              <li key={idx} className="p-2 border rounded">{l.mood || l.moodId} — {l.note} <div className="text-xs text-muted-foreground">{new Date(l.createdAt||l.created_at||l.timestamp).toLocaleString()}</div></li>
            )) : <li>No entries yet</li>}
          </ul>
        </div>
      </Card>
    </section>
  );
};
