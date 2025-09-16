import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Brain, Users, Shield } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-wellness-primary/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-wellness-accent/10 rounded-full blur-3xl floating-element" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-wellness-secondary/10 rounded-full blur-3xl floating-element" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-wellness-calm/50 backdrop-blur-sm border border-wellness-primary/20 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-wellness-primary" />
              <span className="text-sm font-medium text-wellness-primary">AI-Powered Mental Wellness</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">MindWell</span>
              <br />
              <span className="text-foreground">Student Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              A comprehensive AI-driven mental wellness ecosystem designed for students. 
              Track emotions, receive personalized support, and connect with peers in a safe, confidential environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="wellness-button text-lg px-8 py-4 h-auto">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto border-wellness-primary/30 hover:bg-wellness-primary/10">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="wellness-card group hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-wellness rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI Mood Tracking</h3>
                <p className="text-muted-foreground text-sm">Intelligent daily check-ins with personalized insights and recommendations</p>
              </div>
            </Card>
            
            <Card className="wellness-card group hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-wellness-secondary to-wellness-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24/7 Support Bot</h3>
                <p className="text-muted-foreground text-sm">Immediate assistance with coping strategies and crisis intervention</p>
              </div>
            </Card>
            
            <Card className="wellness-card group hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-wellness-accent to-wellness-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Peer Support</h3>
                <p className="text-muted-foreground text-sm">Moderated community forums with trained student volunteers</p>
              </div>
            </Card>
            
            <Card className="wellness-card group hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-wellness-success to-wellness-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
                <p className="text-muted-foreground text-sm">End-to-end encryption with anonymous data analytics</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};