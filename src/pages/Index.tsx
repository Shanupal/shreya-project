import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Users, Shield, BarChart3, MessageCircle, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        
        {/* Features Overview Section */}
        <section className="py-20 bg-wellness-calm/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Your Complete Wellness Toolkit</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Discover powerful tools designed specifically for student mental health and wellbeing
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="wellness-card text-center group cursor-pointer" onClick={() => navigate("/dashboard")}>
                  <div className="w-16 h-16 bg-gradient-wellness rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Wellness Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    Track your mental health journey with personalized insights and progress visualization
                  </p>
                  <Button variant="ghost" className="group-hover:text-wellness-primary">
                    Explore Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
                
                <Card className="wellness-card text-center group cursor-pointer" onClick={() => navigate("/mood")}>
                  <div className="w-16 h-16 bg-gradient-to-r from-wellness-secondary to-wellness-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Mood Tracking</h3>
                  <p className="text-muted-foreground mb-4">
                    Daily mood check-ins with AI-powered insights and personalized recommendations
                  </p>
                  <Button variant="ghost" className="group-hover:text-wellness-secondary">
                    Start Tracking <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
                
                <Card className="wellness-card text-center group cursor-pointer" onClick={() => navigate("/support")}>
                  <div className="w-16 h-16 bg-gradient-to-r from-wellness-accent to-wellness-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">AI Support Chat</h3>
                  <p className="text-muted-foreground mb-4">
                    24/7 AI companion for immediate support, coping strategies, and crisis intervention
                  </p>
                  <Button variant="ghost" className="group-hover:text-wellness-accent">
                    Chat Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
                
                <Card className="wellness-card text-center group cursor-pointer" onClick={() => navigate("/resources")}>
                  <div className="w-16 h-16 bg-gradient-to-r from-wellness-success to-wellness-secondary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Resource Hub</h3>
                  <p className="text-muted-foreground mb-4">
                    Curated mental health resources, guided meditations, and educational content
                  </p>
                  <Button variant="ghost" className="group-hover:text-wellness-success">
                    Browse Resources <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-wellness rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <span className="font-bold text-xl gradient-text">MindWell</span>
                </div>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Empowering students with AI-driven mental wellness support, 
                  personalized insights, and a caring community.
                </p>
                <div className="text-sm text-muted-foreground">
                  <p>🔒 Privacy-first • 🌍 Multilingual • 🤝 Community-driven</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Explore</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</a></li>
                  <li><a href="/mood" className="hover:text-foreground transition-colors">Mood Tracker</a></li>
                  <li><a href="/support" className="hover:text-foreground transition-colors">AI Support</a></li>
                  <li><a href="/resources" className="hover:text-foreground transition-colors">Resources</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">GDPR Compliance</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Data Security</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 MindWell Student Platform. Built with care for student mental wellness.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
