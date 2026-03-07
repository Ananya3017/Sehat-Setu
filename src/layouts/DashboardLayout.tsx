import { Outlet, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PatientSidebar } from "@/components/PatientSidebar";
import { useAuth } from "@/contexts/AuthContext";

const DashboardLayout = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== "patient") {
    return <Navigate to="/patient/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <PatientSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-card/80 backdrop-blur-sm px-4">
            <SidebarTrigger />
            <span className="ml-3 font-display font-semibold text-foreground">Patient Portal</span>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
