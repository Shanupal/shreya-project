import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { listContent, filterByTag } from "@/slices/contentSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search, Play, Download, BookOpen, Headphones, Video } from "lucide-react";

export const ResourceHub = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((s)=>s.content);
  const [tag, setTag] = useState("");

  useEffect(()=> {
    dispatch(listContent()).unwrap().catch(()=>{});
  },[dispatch]);

  const applyFilter = async () => {
    try{
      await dispatch(filterByTag({ tag })).unwrap();
      toast.success("Filtered content");
    }catch(e:any){ toast.error("Filter failed"); }
  };

  // Demo resources data
  const demoResources = [
    {
      id: "1",
      title: "Mindfulness Meditation for Students",
      description: "A 10-minute guided meditation to help reduce stress and improve focus during study sessions.",
      tags: ["meditation", "stress-relief", "focus"],
      mediaUrl: "https://example.com/meditation-audio",
      type: "audio",
      duration: "10 min"
    },
    {
      id: "2", 
      title: "Managing Exam Anxiety",
      description: "Learn practical techniques to cope with test anxiety and perform better during exams.",
      tags: ["anxiety", "exams", "coping-strategies"],
      mediaUrl: "https://example.com/exam-anxiety-video",
      type: "video",
      duration: "15 min"
    },
    {
      id: "3",
      title: "Sleep Hygiene for Better Mental Health",
      description: "Discover how proper sleep habits can significantly improve your mental wellbeing and academic performance.",
      tags: ["sleep", "mental-health", "wellness"],
      mediaUrl: "https://example.com/sleep-guide",
      type: "article",
      duration: "5 min read"
    },
    {
      id: "4",
      title: "Progressive Muscle Relaxation",
      description: "A guided audio session to help release physical tension and promote relaxation.",
      tags: ["relaxation", "stress-relief", "body-awareness"],
      mediaUrl: "https://example.com/muscle-relaxation",
      type: "audio",
      duration: "20 min"
    },
    {
      id: "5",
      title: "Building Healthy Study Habits",
      description: "Evidence-based strategies for creating sustainable study routines that support both academic success and mental health.",
      tags: ["study-habits", "productivity", "wellness"],
      mediaUrl: "https://example.com/study-habits-video",
      type: "video", 
      duration: "12 min"
    },
    {
      id: "6",
      title: "Breathing Exercises for Anxiety",
      description: "Simple breathing techniques you can use anywhere to manage anxiety and panic symptoms.",
      tags: ["anxiety", "breathing", "quick-relief"],
      mediaUrl: "https://example.com/breathing-exercises",
      type: "audio",
      duration: "8 min"
    }
  ];

  // Use demo resources if no items from API
  const displayItems = items && items.length > 0 ? items : demoResources;
  
  // Filter demo resources based on tag
  const filteredItems = tag 
    ? displayItems.filter(item => 
        item.tags?.some((t: string) => t.toLowerCase().includes(tag.toLowerCase()))
      )
    : displayItems;

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Headphones className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleResourceClick = (resource: any) => {
    toast.info(`Opening: ${resource.title}`);
    // In a real app, this would open the actual resource
    console.log("Opening resource:", resource);
  };
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            value={tag} 
            onChange={(e:any)=>setTag(e.target.value)} 
            placeholder="Search resources by tag (e.g., anxiety, meditation, sleep)..." 
            className="pl-10"
            onKeyPress={(e) => e.key === 'Enter' && applyFilter()}
          />
        </div>
        <Button onClick={applyFilter} className="wellness-button">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
        {tag && (
          <Button variant="outline" onClick={() => { setTag(""); applyFilter(); }}>
            Clear Filter
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <div>Loading...</div>}
        {filteredItems.map((it:any)=>(
          <Card key={it.id} className="wellness-card hover:scale-105 transition-transform">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-wellness-primary/10 rounded-lg flex items-center justify-center">
                {getIcon(it.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{it.title}</h3>
                {it.duration && (
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {it.duration}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{it.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {(it.tags||[]).slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Button 
              className="w-full wellness-button" 
              onClick={() => handleResourceClick(it)}
            >
              <Play className="w-4 h-4 mr-2" />
              {it.type === 'video' ? 'Watch' : it.type === 'audio' ? 'Listen' : 'Read'}
            </Button>
          </Card>
        ))}
        
        {!loading && filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              {tag ? `No resources match "${tag}". Try a different search term.` : "No resources available at the moment."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
