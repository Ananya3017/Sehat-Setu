import { Fingerprint, Heart, Thermometer, Droplets, Wind, Activity } from "lucide-react";

const vitals = [
  { label: "Heart Rate", value: "72 bpm", icon: Heart, status: "Normal" },
  { label: "Blood Pressure", value: "120/80", icon: Activity, status: "Normal" },
  { label: "Temperature", value: "98.4°F", icon: Thermometer, status: "Normal" },
  { label: "SpO2", value: "98%", icon: Droplets, status: "Normal" },
  { label: "Respiratory Rate", value: "16/min", icon: Wind, status: "Normal" },
];

const DigiTwin = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Fingerprint className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Digi Twin</h1>
        </div>
        <p className="text-muted-foreground ml-13">Your digital health twin — real-time vitals and health overview</p>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitals.map((v) => (
          <div key={v.label} className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center">
                <v.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{v.label}</span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{v.value}</p>
            <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">{v.status}</span>
          </div>
        ))}
      </div>

      {/* Health Summary */}
      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-display font-semibold text-foreground mb-3">Health Summary</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• All vitals are within normal range</p>
          <p>• No active alerts or anomalies detected</p>
          <p>• Last sync: 15 minutes ago via wearable device</p>
          <p>• Next scheduled health check: March 20, 2026</p>
        </div>
      </div>
    </div>
  );
};

export default DigiTwin;
