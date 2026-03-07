import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, FileText, Activity, LogOut } from "lucide-react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!user?.token) return;
        const res = await fetch('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUsersList(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated && user?.role === "admin") {
      fetchUsers();
    }
  }, [user, isAuthenticated]);

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display font-bold text-foreground">Admin Dashboard</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground mb-8">Platform overview and management</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Total Patients", value: loading ? "..." : usersList.filter(u => u.role === 'patient').length.toString(), icon: Users },
            { label: "Records Managed", value: "48,320", icon: FileText },
            { label: "Avg Health Score", value: "76", icon: Activity },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
              <p className="font-display text-3xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
