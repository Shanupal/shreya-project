import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { MoodTracker } from "@/components/MoodTracker";
import { AISupport } from "@/components/AISupport";
import { ResourceHub } from "@/components/ResourceHub";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        {/* Keep a concise overview on the homepage; detailed sections now live on dedicated pages */}
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
