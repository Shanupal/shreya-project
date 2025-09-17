import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { login, signup } from "@/slices/authSlice";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [loading, setLoading] = useState(false);

  // Demo login handler
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      // Simulate API call with demo data
      const demoUser = {
        id: "demo-user-123",
        name: "Demo Student",
        email: "demo@mindwell.com",
        role: "student"
      };
      
      const demoToken = "demo-jwt-token-12345";
      
      // Store demo data in localStorage to simulate successful login
      localStorage.setItem("mh_token", demoToken);
      localStorage.setItem("demo_user", JSON.stringify(demoUser));
      
      // Dispatch login action with demo data
      await dispatch(login({ 
        user: demoUser, 
        token: demoToken 
      })).unwrap();
      
      toast.success("Welcome to MindWell! Demo login successful.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await dispatch(login(loginData)).unwrap();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await dispatch(signup({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password
      })).unwrap();
      toast.success("Account created successfully! Please log in.");
      // Switch to login tab after successful signup
      document.querySelector('[value="login"]')?.click();
    } catch (error: any) {
      toast.error(error?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Helmet>
        <title>Login - MindWell Student Platform</title>
        <meta name="description" content="Sign in to your MindWell account to access personalized mental wellness tools and support." />
      </Helmet>
      
      <Card className="w-full max-w-md p-8 wellness-card">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-wellness rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl gradient-text">MindWell</span>
          </div>
          <p className="text-muted-foreground">Welcome back to your wellness journey</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full wellness-button" 
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or try demo</span>
                </div>
              </div>
              
              <Button 
                type="button"
                variant="outline" 
                className="w-full mt-4" 
                onClick={handleDemoLogin}
                disabled={loading}
              >
                {loading ? "Loading Demo..." : "Try Demo Account"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full wellness-button" 
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;