import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, Shield } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill all fields"); return; }
    
    const success = await login(email, password, "admin");
    if (success) {
      toast.success("Welcome, Admin!");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">MedVault</span>
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 mb-4">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-secondary-foreground">Admin Portal</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-1">Manage platform and patient data</p>
        </div>
        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Admin Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="admin@medvault.in" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg">Sign In as Admin</Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">Back to home</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
