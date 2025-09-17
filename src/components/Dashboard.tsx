import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAnalytics } from "@/slices/adminSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  Heart,
  Brain,
  MessageCircle,
  Users,
  Clock,
  AlertTriangle
} from "lucide-react";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { analytics } = useAppSelector((s)=>s.admin);
  useEffect(()=>{ dispatch(getAnalytics()).unwrap().then(()=>{}).catch(()=>{}); },[dispatch]);

  // Load mood entries from localStorage
  type Entry = { mood_id: number; created_at: string; notes?: string };
  let entries: Entry[] = [];
  try {
    entries = JSON.parse(localStorage.getItem("mood_entries") || "[]");
  } catch {}

  const score = (mood_id: number) => 6 - mood_id; // 1->5, 5->1
  const last7 = entries
    .filter((e) => Date.now() - new Date(e.created_at).getTime() <= 7 * 24 * 60 * 60 * 1000);
  const weeklyMoodAverage = last7.length
    ? (last7.reduce((sum, e) => sum + score(e.mood_id), 0) / last7.length).toFixed(1)
    : "-";

  const mockData = {
    weeklyMoodAverage,
    journalEntries: 0,
    supportSessions: 0,
    wellnessStreak: Math.max(1, entries.length ? 1 : 0),
    monthlyGoal: 80,
    currentProgress: Math.min(100, entries.length * 10) || 0,
  };
  type ActivityType = "mood" | "journal" | "support" | "resource";
  type Activity = { type: ActivityType; time: string; desc: string };
  const recentActivities: Activity[] = (
    entries.slice(-5).reverse().map((e) => ({
      type: "mood",
      time: new Date(e.created_at).toLocaleString(),
      desc: `Logged daily mood - ${["Excellent 😊","Good 🙂","Okay 😐","Low 😔","Very Low 😟"][e.mood_id-1]}`,
    }))
  );

  const upcomingEvents = [
    { title: "Mindfulness Session", time: "Today 3:00 PM", type: "group" },
    { title: "Counselor Appointment", time: "Tomorrow 10:00 AM", type: "individual" },
    { title: "Peer Support Group", time: "Thu 5:00 PM", type: "peer" },
  ];

  // Button handlers
  const handleLogMood = () => {
    navigate("/mood");
  };

  const handleChatWithAI = () => {
    navigate("/support");
  };

  const handleWriteJournal = () => {
    // For now, navigate to mood tracker as it includes notes
    // In future, this could be a dedicated journal page
    navigate("/mood");
    toast.info("Journal feature coming soon! For now, you can add notes with your mood entries.");
  };

  const handleBrowseResources = () => {
    navigate("/resources");
  };

  const handleLearnMore = () => {
    // Open a modal or navigate to a tips page
    toast.info("More wellness tips and techniques coming soon!");
  };

  const handleEmergencyContact = () => {
    // In a real app, this would show emergency contacts or crisis resources
    toast.error("If you're in crisis, please contact emergency services (911) or a crisis hotline immediately.");
  };
  return (
    <section id="dashboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Your Wellness Dashboard</h2>
            <p className="text-muted-foreground text-lg">
              Track your mental wellness journey and access personalized insights
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="wellness-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-wellness rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{String(mockData.weeklyMoodAverage)}/5</div>
                  <div className="text-sm text-muted-foreground">Weekly Average</div>
                </div>
              </div>
            </Card>

            <Card className="wellness-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-wellness-secondary to-wellness-accent rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{mockData.wellnessStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </Card>

            <Card className="wellness-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-wellness-accent to-wellness-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{mockData.journalEntries}</div>
                  <div className="text-sm text-muted-foreground">Journal Entries</div>
                </div>
              </div>
            </Card>

            <Card className="wellness-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-wellness-success to-wellness-secondary rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{mockData.supportSessions}</div>
                  <div className="text-sm text-muted-foreground">Support Sessions</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Monthly Progress */}
              <Card className="wellness-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-wellness-primary" />
                    Monthly Wellness Goal
                  </h3>
                  <Badge variant="secondary" className="bg-wellness-secondary text-white">
                    {mockData.currentProgress}% Complete
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Daily check-ins and activities</span>
                    <span>{mockData.currentProgress}/{mockData.monthlyGoal} points</span>
                  </div>
                  <Progress value={mockData.currentProgress} className="h-3" />
                  <div className="text-sm text-muted-foreground">
                    Great progress! You're on track to reach your monthly wellness goal.
                  </div>
                </div>
              </Card>

              {/* Mood Trends */}
              <Card className="wellness-card">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-wellness-primary" />
                  Mood Trends (Last 7 Days)
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                      const moods = ["😊", "🙂", "😊", "😐", "🙂", "😊", "😊"];
                      const colors = ["bg-wellness-success", "bg-wellness-secondary", "bg-wellness-success", "bg-wellness-warning", "bg-wellness-secondary", "bg-wellness-success", "bg-wellness-success"];
                      
                      return (
                        <div key={day} className="text-center">
                          <div className="text-xs text-muted-foreground mb-2">{day}</div>
                          <div className={`w-12 h-12 rounded-lg ${colors[index]} flex items-center justify-center text-lg mx-auto`}>
                            {moods[index]}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {index < 4 ? "4.5" : index === 4 ? "3.5" : "4.0"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="p-4 bg-wellness-primary/5 rounded-lg border border-wellness-primary/20">
                    <div className="font-medium text-wellness-primary mb-2">📈 Insights</div>
                    <div className="text-sm text-muted-foreground">
                      Your mood has been consistently positive this week! The slight dip on Thursday might be related to midweek stress. Consider scheduling some relaxation time on busy weekdays.
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="wellness-card">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-wellness-primary" />
                  Recent Activity
                </h3>
                
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.type === "mood" ? "bg-wellness-success" :
                        activity.type === "journal" ? "bg-wellness-accent" :
                        activity.type === "support" ? "bg-wellness-primary" :
                        "bg-wellness-secondary"
                      }`}>
                        {activity.type === "mood" && <Heart className="w-5 h-5 text-white" />}
                        {activity.type === "journal" && <Brain className="w-5 h-5 text-white" />}
                        {activity.type === "support" && <MessageCircle className="w-5 h-5 text-white" />}
                        {activity.type === "resource" && <Award className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.desc}</div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="wellness-card">
                <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full wellness-button justify-start" onClick={handleLogMood}>
                    <Heart className="w-4 h-4 mr-2" />
                    Log Today's Mood
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-wellness-accent/30 hover:bg-wellness-accent/10"
                    onClick={handleChatWithAI}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with AI
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-wellness-secondary/30 hover:bg-wellness-secondary/10"
                    onClick={handleWriteJournal}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Write in Journal
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-wellness-primary/30 hover:bg-wellness-primary/10"
                    onClick={handleBrowseResources}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Browse Resources
                  </Button>
                </div>
              </Card>

              {/* Upcoming Events */}
              <Card className="wellness-card">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-wellness-primary" />
                  Upcoming
                </h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg">
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        {event.time}
                      </div>
                      <Badge variant="outline" className="text-xs mt-2">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Wellness Tip */}
              <Card className="wellness-card">
                <h3 className="font-semibold text-lg mb-4">💡 Today's Tip</h3>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Try the 5-4-3-2-1 grounding technique: Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-wellness-primary/30 hover:bg-wellness-primary/10"
                    onClick={handleLearnMore}
                  >
                    Learn More
                  </Button>
                </div>
              </Card>

              {/* Emergency Support */}
              <Card className="wellness-card border-destructive/20 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-destructive mb-2">Need Help Now?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      If you're experiencing a mental health crisis, reach out immediately.
                    </p>
                    <Button size="sm" variant="destructive" className="w-full" onClick={handleEmergencyContact}>
                      Emergency Contact
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};