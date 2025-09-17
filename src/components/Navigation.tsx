import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, User, MessageCircle, BookOpen, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await dispatch(logout()).unwrap();
      localStorage.removeItem("demo_user");
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Sign out failed");
    }
  };

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleSignIn = () => {
    navigate("/login");
  };
  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: BarChart3 },
    { label: "Mood Tracker", to: "/mood", icon: Heart },
    { label: "AI Support", to: "/support", icon: MessageCircle },
    { label: "Resources", to: "/resources", icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-wellness rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl gradient-text">MindWell</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {token && user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.name || user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button className="wellness-button" onClick={handleGetStarted}>
                  <User className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border animate-fade-in-up">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center space-x-3 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="px-4 pt-4 space-y-2">
              {token && user ? (
                <>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    Welcome, {user.name || user.email}
                  </div>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start" onClick={handleSignIn}>
                    Sign In
                  </Button>
                  <Button className="wellness-button w-full" onClick={handleGetStarted}>
                    <User className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};