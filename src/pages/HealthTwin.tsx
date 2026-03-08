// @ts-nocheck
import React, { useState, useEffect } from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C, PageWrap, SecHead, Card, Btn } from '../lib/design';

function getRisks(m) {
  return [
    { label: "Heart Disease Risk", level: m.systolic > 140 || m.cholesterol > 240 ? "High" : m.systolic > 130 ? "Moderate" : "Low" },
    { label: "Diabetes Risk", level: m.glucose > 125 || m.bmi > 30 ? "High" : m.glucose >= 100 || m.bmi > 27 ? "Moderate" : "Low" },
    { label: "Obesity Risk", level: m.bmi > 30 ? "High" : m.bmi > 27 ? "Moderate" : "Low" },
    { label: "Hypertension Risk", level: m.systolic > 140 ? "High" : m.systolic > 130 ? "Moderate" : "Low" },
    { label: "Stress-Related Risk", level: m.stress > 70 ? "High" : m.stress > 45 ? "Moderate" : "Low" },
  ];
}

const TREND_DATA = {
  heartRate: [
    { day: "Mon", value: 72 }, { day: "Tue", value: 75 }, { day: "Wed", value: 69 },
    { day: "Thu", value: 80 }, { day: "Fri", value: 74 }, { day: "Sat", value: 71 }, { day: "Sun", value: 73 },
  ],
  steps: [
    { day: "Mon", value: 6200 }, { day: "Tue", value: 7800 }, { day: "Wed", value: 5100 },
    { day: "Thu", value: 9200 }, { day: "Fri", value: 8400 }, { day: "Sat", value: 11000 }, { day: "Sun", value: 7300 },
  ],
  sleep: [
    { day: "Mon", value: 6.5 }, { day: "Tue", value: 7.2 }, { day: "Wed", value: 5.8 },
    { day: "Thu", value: 7.0 }, { day: "Fri", value: 6.8 }, { day: "Sat", value: 8.1 }, { day: "Sun", value: 7.4 },
  ],
};

const RECS = [
  { icon: "🏃", text: "Increase daily steps to 8,000 – 10,000 for improved cardiovascular health.", priority: "High" },
  { icon: "🥗", text: "Follow a balanced diet with reduced saturated fats to maintain healthy cholesterol.", priority: "Medium" },
  { icon: "😴", text: "Ensure 7–8 hours of quality sleep per night to reduce stress hormones.", priority: "Medium" },
  { icon: "🩸", text: "Schedule a fasting blood glucose test within the next 30 days.", priority: "High" },
  { icon: "💊", text: "Continue prescribed medication schedule; do not self-discontinue.", priority: "High" },
  { icon: "🧘", text: "Practice 10 minutes of mindfulness or pranayama daily to manage stress.", priority: "Low" },
];

export default function HealthTwinPage({ user }) {
  // Use user's real baseline if available
  const initialSys = user?.bp ? user.bp.split('/')[0] : 120;
  const initialDia = user?.bp ? user.bp.split('/')[1] : 80;

  const [metrics, setMetrics] = useState({
    age: 38, bmi: user?.bmi || 25,
    systolic: parseInt(initialSys),
    diastolic: parseInt(initialDia),
    cholesterol: user?.cholesterol || 190,
    glucose: user?.sugar || 95,
    heartRate: 74, activityMins: 45, spo2: 97, stress: 32
  });

  const [analyzed, setAnalyzed] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [tick, setTick] = useState(0);

  // Exact CIBIL Sync Formula
  const calculateCibilScore = (m) => {
    let bpW = m.systolic <= 120 ? 50 : m.systolic <= 130 ? 20 : -30;
    let bmiW = (m.bmi >= 18.5 && m.bmi <= 24.9) ? 50 : -30;
    let cholW = m.cholesterol < 200 ? 40 : m.cholesterol <= 239 ? 10 : -30;
    let sugarW = m.glucose < 100 ? 40 : m.glucose <= 125 ? -10 : -40;
    let vaccW = (user?.vaccinations || 0) * 15;
    let condW = (user?.conditions?.length || 0) * -40;
    let recsw = (user?.records?.length || 0) * 10;

    let total = 500 + bpW + bmiW + cholW + sugarW + vaccW + condW + recsw;
    return Math.max(300, Math.min(900, total));
  };

  const risks = getRisks(metrics);
  const score = calculateCibilScore(metrics);
  const pct = (score - 300) / 600;
  const rC = { Low: "#138808", Moderate: "#D97706", High: "#DC2626" };

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1500);
    return () => clearInterval(id);
  }, []);

  const liveHR = metrics.heartRate + Math.round(Math.sin(tick * 0.7) * 3);

  const doAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 1600);
  };

  const r = 56, circ = 2 * Math.PI * r;

  const BodySVG = () => (
    <svg viewBox="0 0 120 280" width="120" height="280" style={{ filter: "drop-shadow(0 4px 16px rgba(15,52,96,0.18))" }}>
      <defs>
        <radialGradient id="bodyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0F3460" stopOpacity="0.0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="140" rx="58" ry="135" fill="url(#bodyGlow)" />
      <circle cx="60" cy="34" r="24" fill="#C8E0F4" stroke="#0F3460" strokeWidth="1.5" />
      <path d="M36 58 Q28 90 30 130 L35 185 L45 245 L55 245 L60 185 L65 245 L75 245 L85 185 L90 130 Q92 90 84 58 Z" fill="#D8ECFA" stroke="#0F3460" strokeWidth="1.5" className="breathe" />
      <path d="M36 65 Q18 100 20 140 L30 140 Q32 105 44 75 Z" fill="#C8E0F4" stroke="#0F3460" strokeWidth="1.5" />
      <path d="M84 65 Q102 100 100 140 L90 140 Q88 105 76 75 Z" fill="#C8E0F4" stroke="#0F3460" strokeWidth="1.5" />
      <line x1="40" y1="80" x2="80" y2="80" stroke="#0F3460" strokeWidth="0.4" strokeDasharray="3,3" opacity="0.3" />
      <line x1="38" y1="110" x2="82" y2="110" stroke="#0F3460" strokeWidth="0.4" strokeDasharray="3,3" opacity="0.3" />
      <line x1="36" y1="140" x2="84" y2="140" stroke="#0F3460" strokeWidth="0.4" strokeDasharray="3,3" opacity="0.3" />
      {[[60, 58, "#E07B00"], [40, 95, "#138808"], [80, 95, "#0F3460"], [42, 155, "#6B46C1"], [78, 155, "#DC2626"]].map(([x, y, c], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={c} opacity="0.7" style={{ animation: `blinkDot ${1 + i * .3}s infinite` }} />
      ))}
    </svg>
  );

  const MetricCard = ({ icon, label, value, unit, sub, color, ping }) => (
    <div style={{ background: "white", border: `1.5px solid ${color}22`, borderRadius: 10, padding: "12px 14px", boxShadow: "0 2px 12px rgba(15,52,96,0.08)", minWidth: 150 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        {ping && <span style={{ width: 7, height: 7, background: "#22c55e", borderRadius: "50%", display: "inline-block", animation: "pulseRing 2s ease-out infinite" }} />}
        <span style={{ fontSize: 10, fontWeight: 700, color: "#8A9DB0", letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1 }}>{value}<span style={{ fontSize: 12, fontWeight: 600, color: "#8A9DB0", marginLeft: 3 }}>{unit}</span></div>
      {sub && <div style={{ fontSize: 11, color: "#8A9DB0", marginTop: 3 }}>{sub}</div>}
    </div>
  );

  return (
    <div style={{ minHeight: "calc(100vh - 110px)" }}>
      <PageWrap style={{ maxWidth: 1200 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <SecHead label="ABDM · Digital Health Twin" title="Digital Health Twin" sub="AI-powered digital representation of your real-time health status and predictive analysis." />
          <Btn label={analyzing ? "⏳ Syncing Twin..." : "🔬 Re-Analyse Twin"} disabled={analyzing} onClick={doAnalyze} variant="primary" style={{ marginBottom: 32 }} />
        </div>

        {/* ── SECTION 1: AVATAR + METRICS ── */}
        <Card style={{ padding: "28px 32px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ background: "#EBF2FA", color: "#0F3460", border: "1px solid #C5D9EE", borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Section 1</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#1C2B3A" }}>Digital Human Avatar · Live Health Metrics</span>
          </div>

          <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <MetricCard icon="❤️" label="Heart Rate" value={liveHR} unit="bpm" sub="Live · ECG Normal" color="#DC2626" ping />
              <MetricCard icon="🩸" label="Blood Pressure" value={`${metrics.systolic}/${metrics.diastolic}`} unit="mmHg" sub={metrics.systolic < 130 ? "Normal Range" : "Elevated"} color="#E07B00" />
              <MetricCard icon="🫀" label="Stress Level" value={metrics.stress} unit="%" sub={metrics.stress < 45 ? "Low Stress" : "Moderate"} color="#6B46C1" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, margin: "0 30px" }}>
              <div style={{ background: "linear-gradient(180deg, #EBF2FA 0%, #D4E8F8 100%)", borderRadius: 16, padding: "24px 28px", border: "1px solid #C5D9EE", position: "relative" }}>
                <div style={{ position: "absolute", top: 10, left: 10, width: 8, height: 8, background: "#22c55e", borderRadius: "50%", animation: "pulseRing 2s ease-out infinite" }} />
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0F3460", textAlign: "center", marginBottom: 8, letterSpacing: 0.5 }}>DIGITAL TWIN · LIVE</div>
                <BodySVG />
                <div style={{ fontSize: 10, color: "#8A9DB0", textAlign: "center", marginTop: 8 }}>Updated: {new Date().toLocaleTimeString("en-IN")}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <MetricCard icon="🫁" label="Oxygen Level" value={metrics.spo2} unit="%" sub="SpO₂ · Normal" color="#0F3460" ping />
              <MetricCard icon="⚖️" label="BMI" value={metrics.bmi} unit="kg/m²" sub={metrics.bmi < 24.9 ? "Healthy Weight" : "Overweight"} color="#138808" />
              <MetricCard icon="🩸" label="Blood Sugar" value={metrics.glucose} unit="mg/dl" sub={metrics.glucose < 100 ? "Fasting Normal" : "Elevated"} color="#D97706" />
            </div>
          </div>

          <div style={{ marginTop: 24, padding: "20px 0 0", borderTop: "1px solid #EBF2FA" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#4A6070", marginBottom: 14 }}>⚙ Adjust Health Parameters (Mocking Live Data Interface)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px 28px" }}>
              {[
                { k: "heartRate", label: "Heart Rate", unit: "bpm", min: 40, max: 180 },
                { k: "systolic", label: "Systolic BP", unit: "mmHg", min: 80, max: 200 },
                { k: "diastolic", label: "Diastolic BP", unit: "mmHg", min: 50, max: 130 },
                { k: "glucose", label: "Blood Sugar", unit: "mg/dL", min: 70, max: 300 },
                { k: "bmi", label: "BMI", unit: "kg/m²", min: 14, max: 45, step: 0.1 },
                { k: "cholesterol", label: "Cholesterol", unit: "mg/dL", min: 100, max: 400 },
                { k: "stress", label: "Stress Level", unit: "%", min: 0, max: 100 },
              ].map(f => (
                <div key={f.k}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "#4A6070", marginBottom: 3 }}>
                    <span>{f.label}</span>
                    <span style={{ color: C.primary, fontWeight: 800 }}>{metrics[f.k]} {f.unit}</span>
                  </div>
                  <input type="range" min={f.min} max={f.max} step={f.step || 1} value={metrics[f.k]}
                    onChange={e => setMetrics(m => ({ ...m, [f.k]: parseFloat(e.target.value) }))}
                    style={{ width: "100%", height: 4, accentColor: C.primary }} />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── SECTION 2: RISK ANALYSIS ── */}
        <Card style={{ padding: "28px 32px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ background: "#EBF2FA", color: "#0F3460", border: "1px solid #C5D9EE", borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Section 2</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#1C2B3A" }}>AI Health Risk Analysis</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
            {risks.map((r, i) => (
              <div key={i} style={{ border: `1.5px solid ${rC[r.level]}30`, borderRadius: 10, padding: 16, background: `${rC[r.level]}08`, textAlign: "center" }} className="fade-in">
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${rC[r.level]}18`, border: `2px solid ${rC[r.level]}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 20 }}>
                  {r.level === "Low" ? "✓" : r.level === "Moderate" ? "⚠" : "🚨"}
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: rC[r.level], marginBottom: 4 }}>{r.level} Risk</div>
                <div style={{ fontSize: 11, color: "#4A6070", fontWeight: 600, lineHeight: 1.4 }}>{r.label}</div>
                <div style={{ marginTop: 8, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.8)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: r.level === "Low" ? "25%" : r.level === "Moderate" ? "55%" : "85%", background: rC[r.level], borderRadius: 2, transition: "width 0.8s ease" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, padding: "18px 24px", background: "linear-gradient(135deg,#EBF2FA,#F0F7FF)", borderRadius: 10, border: "1px solid #C5D9EE", display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ position: "relative", width: 130, height: 130, flexShrink: 0 }}>
              <svg width="130" height="130" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="65" cy="65" r={r} fill="none" stroke="#E8F0FA" strokeWidth="12" />
                <circle cx="65" cy="65" r={r} fill="none" stroke={score >= 750 ? "#138808" : score >= 600 ? "#D97706" : "#DC2626"} strokeWidth="12"
                  strokeDasharray={`${pct * circ} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 1.2s ease" }} />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Noto Serif Display', serif", fontSize: 26, fontWeight: 900, color: "#0F3460", lineHeight: 1 }}>{score}</div>
                <div style={{ fontSize: 10, color: "#8A9DB0", fontWeight: 700 }}>/ 900</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#8A9DB0", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Live CIBIL Diagnostic</div>
              <div style={{ fontFamily: "'Noto Serif Display', serif", fontSize: 24, fontWeight: 900, color: "#0F3460", marginBottom: 6 }}>
                {score >= 750 ? "Excellent Profile" : score >= 600 ? "Good Status" : "High Patient Risk"}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[{ r: "750–900", l: "Excellent", c: "#138808" }, { r: "600–749", l: "Good", c: "#D97706" }, { r: "300–599", l: "Poor", c: "#DC2626" }].map(b => (
                  <span key={b.l} style={{ fontSize: 11, fontWeight: 700, color: b.c, background: b.c + "12", border: `1px solid ${b.c}30`, padding: "3px 12px", borderRadius: 12 }}>{b.r} – {b.l}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ── SECTION 3: HEALTH TRENDS ── */}
        <Card style={{ padding: "28px 32px", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ background: "#EBF2FA", color: "#0F3460", border: "1px solid #C5D9EE", borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Section 3</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#1C2B3A" }}>Health Trends · Weekly Analytics</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {/* HR */}
            <div style={{ border: "1px solid #EBF2FA", borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#DC2626", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>❤️ Heart Rate Trend</div>
              <div style={{ fontSize: 11, color: "#8A9DB0", marginBottom: 14 }}>Weekly average bpm</div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={TREND_DATA.heartRate}>
                  <defs>
                    <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F5FA" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#8A9DB0" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#8A9DB0" }} axisLine={false} tickLine={false} domain={[60, 90]} />
                  <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #D5E3F0", borderRadius: 6 }} />
                  <Area type="monotone" dataKey="value" stroke="#DC2626" strokeWidth={2} fill="url(#hrGrad)" dot={{ r: 3, fill: "#DC2626" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            {/* Steps */}
            <div style={{ border: "1px solid #EBF2FA", borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#138808", marginBottom: 4 }}>🚶 Daily Steps</div>
              <div style={{ fontSize: 11, color: "#8A9DB0", marginBottom: 14 }}>Steps per day this week</div>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={TREND_DATA.steps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F5FA" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#8A9DB0" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#8A9DB0" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #D5E3F0", borderRadius: 6 }} />
                  <Bar dataKey="value" fill="#138808" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Sleep */}
            <div style={{ border: "1px solid #EBF2FA", borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#6B46C1", marginBottom: 4 }}>😴 Sleep Hours</div>
              <div style={{ fontSize: 11, color: "#8A9DB0", marginBottom: 14 }}>Hours of sleep per night</div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={TREND_DATA.sleep}>
                  <defs>
                    <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6B46C1" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#6B46C1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F5FA" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#8A9DB0" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#8A9DB0" }} axisLine={false} tickLine={false} domain={[4, 10]} />
                  <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #D5E3F0", borderRadius: 6 }} />
                  <Area type="monotone" dataKey="value" stroke="#6B46C1" strokeWidth={2} fill="url(#sleepGrad)" dot={{ r: 3, fill: "#6B46C1" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* ── SECTION 4: RECOMMENDATIONS ── */}
        <Card style={{ padding: "28px 32px", marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ background: "#EBF2FA", color: "#0F3460", border: "1px solid #C5D9EE", borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Section 4</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#1C2B3A" }}>AI Health Recommendations</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#8A9DB0", background: "#EBF2FA", padding: "3px 12px", borderRadius: 12, fontWeight: 600, border: "1px solid #C5D9EE" }}>Generated by Digital Twin Analysis</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            {RECS.map((r, i) => {
              const pc = { High: "#DC2626", Medium: "#D97706", Low: "#138808" };
              return (
                <div key={i} className="fade-in" style={{ border: "1px solid #EBF2FA", borderRadius: 10, padding: 18, borderLeft: `4px solid ${pc[r.priority]}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 24 }}>{r.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: pc[r.priority], background: `${pc[r.priority]}12`, border: `1px solid ${pc[r.priority]}30`, padding: "3px 10px", borderRadius: 12 }}>{r.priority}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#1C2B3A", lineHeight: 1.6 }}>{r.text}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 24, padding: "12px 18px", background: "#F7F9FC", borderTop: "1px solid #D5E3F0", fontSize: 11, color: "#4A6070" }}>
            ⚕ <strong>Medical Disclaimer:</strong> These recommendations are automatically generated by an isolated AI parameterization sub-system based on strictly quantifiable values. They do not constitute formal medical advice mapping to clinical outcomes. Consult a registered medical practitioner on ABDM before altering treatments.
          </div>
        </Card>

      </PageWrap>
    </div>
  );
}
