import { Link } from "react-router-dom";
import { Activity, FileText, Building2, ShieldAlert, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-white border-l-4 border-primary p-6 rounded-lg shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 flex items-center">
            <User className="mr-3 w-6 h-6 text-primary"/> Welcome, Ramesh Kumar
          </h1>
          <p className="text-sm text-gray-600 font-medium mt-1">
            ABHA ID: 91-0000-0000-0000 | Ph: +91 98765 43210
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
          Last Sync: Today, 10:45 AM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="National Health Score"
          value="82/100"
          subtitle="Status: Excellent"
          icon={<Activity className="w-6 h-6 text-green-600" />}
          path="/health-score"
          borderColor="border-green-200"
          bgColor="bg-green-50"
        />
        <DashboardCard 
          title="Medical Reports"
          value="14 Secure Docs"
          subtitle="Latest: CBC Blood Test"
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          path="/health-vault"
          borderColor="border-blue-200"
          bgColor="bg-blue-50"
        />
        <DashboardCard 
          title="Hospital Visits"
          value="3 Facilities"
          subtitle="Latest: AIIMS New Delhi"
          icon={<Building2 className="w-6 h-6 text-orange-600" />}
          path="/hospitals"
          borderColor="border-orange-200"
          bgColor="bg-orange-50"
        />
        <DashboardCard 
          title="Health Risk Prediction"
          value="Low Risk"
          subtitle="AI Computed from ABHA data"
          icon={<ShieldAlert className="w-6 h-6 text-purple-600" />}
          path="/health-twin"
          borderColor="border-purple-200"
          bgColor="bg-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold font-display text-gray-900 border-b pb-3 mb-4 flex items-center justify-between">
            Recent Health Activity
            <Button variant="ghost" className="text-primary h-8 px-2 text-xs font-semibold">View Full Ledger</Button>
          </h2>
          <div className="space-y-4">
            <ActivityItem 
               date="20-Oct-2025" 
               title="ABHA Data Sync" 
               desc="Medical records successfully synchronized from Apollo Hospital" 
               status="Verified"
            />
            <ActivityItem 
               date="15-Oct-2025" 
               title="Health Score Updated" 
               desc="Your monthly health score calculation improved by +2 points" 
               status="Processed"
            />
            <ActivityItem 
               date="05-Sep-2025" 
               title="Prescription Uploaded" 
               desc="Dr. Sharma uploaded a new e-prescription to your Vault" 
               status="Verified"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
          <h2 className="text-lg font-bold font-display text-gray-900 border-b pb-3 mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3 flex-1">
             <Link to="/emergency" className="flex items-center p-3 rounded-md bg-red-50 border border-red-100 hover:bg-red-100 transition-colors text-red-900 font-medium text-sm">
               <ShieldAlert className="w-4 h-4 mr-3 text-red-600"/> Generate Emergency QR
             </Link>
             <Link to="/telemedicine" className="flex items-center p-3 rounded-md bg-transparent border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
               Book e-Sanjeevani Consult
             </Link>
             <Link to="/health-vault" className="flex items-center p-3 rounded-md bg-transparent border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm">
               Upload Offline Records
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const DashboardCard = ({ title, value, subtitle, icon, path, borderColor, bgColor }: any) => (
  <Link to={path} className="block group">
    <div className={`bg-white rounded-lg shadow-sm border ${borderColor} p-5 h-full flex flex-col items-center text-center relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5`}>
      <div className={`absolute top-0 right-0 w-24 h-24 ${bgColor} rounded-bl-full -mr-8 -mt-8 opacity-50 transition-transform group-hover:scale-110`}></div>
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className={`w-14 h-14 rounded-full border bg-white shadow-sm flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">{title}</p>
        <h3 className="text-2xl font-bold font-display text-primary mb-1">{value}</h3>
        <p className="text-xs text-gray-500 flex items-center justify-center font-medium mt-1">
          {subtitle} <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </p>
      </div>
    </div>
  </Link>
);

const ActivityItem = ({ date, title, desc, status }: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded-md border border-gray-100 transition-colors shadow-sm">
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
       <span className="text-xs font-mono text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded whitespace-nowrap">{date}</span>
       <div>
         <p className="font-semibold text-gray-900 text-sm">{title}</p>
         <p className="text-xs text-gray-500">{desc}</p>
       </div>
    </div>
    <span className="mt-2 sm:mt-0 px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 w-fit">
      {status}
    </span>
  </div>
);
