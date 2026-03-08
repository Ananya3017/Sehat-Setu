// @ts-nocheck
import React from "react";

export const GCSS = `
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700;800&family=Noto+Serif+Display:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;font-size:15px;}
body{font-family:'Mukta',sans-serif;background:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none"><defs><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><pattern id="hex" x="0" y="0" width="30" height="52" patternUnits="userSpaceOnUse"><path d="M15 0 L30 8.66 L30 25.98 L15 34.64 L0 25.98 L0 8.66 Z" fill="none" stroke="%230F3460" stroke-width="0.3" stroke-opacity="0.08"/><path d="M15 52 L30 43.34 L30 25.98 L15 34.64 L0 25.98 L0 43.34 Z" fill="none" stroke="%230F3460" stroke-width="0.3" stroke-opacity="0.08"/></pattern><linearGradient id="flagGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ff9933" stop-opacity="0.22" /><stop offset="30%" stop-color="%23ffffff" stop-opacity="0.75" /><stop offset="70%" stop-color="%23ffffff" stop-opacity="0.75" /><stop offset="100%" stop-color="%23138808" stop-opacity="0.18" /></linearGradient></defs><rect width="100%" height="100%" fill="url(%23flagGrad)"/><rect width="100%" height="100%" fill="url(%23hex)"/><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.04"/></svg>') fixed; background-size: cover; color:#1A2B4A;min-height:100vh;}
button{cursor:pointer;font-family:inherit;border:none;outline:none;}
input,select,textarea{font-family:inherit;outline:none;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:#e8ecf2;}
::-webkit-scrollbar-thumb{background:#1A3D7C;border-radius:4px;}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes slideRight{from{opacity:0;transform:translateX(-24px);}to{opacity:1;transform:translateX(0);}}

@keyframes heartbeat{
  0%,100%{transform:scale(1);}
  14%{transform:scale(1.22);}
  28%{transform:scale(1);}
  42%{transform:scale(1.16);}
  56%{transform:scale(1);}
}
@keyframes pulseGlow{
  0%,100%{opacity:0.6;r:6;}
  50%{opacity:1;r:10;}
}
@keyframes pulseRing{
  0%{transform:scale(1);opacity:0.8;}
  100%{transform:scale(2.4);opacity:0;}
}
@keyframes breathe{
  0%,100%{transform:scaleX(1) scaleY(1);}
  50%{transform:scaleX(1.06) scaleY(1.08);}
}
@keyframes neuralPulse{
  0%,100%{opacity:0.2;stroke-width:1;}
  50%{opacity:1;stroke-width:2;}
}
@keyframes bloodFlow{
  0%{stroke-dashoffset:200;}
  100%{stroke-dashoffset:0;}
}
@keyframes scanLine{
  0%{transform:translateY(-100%);}
  100%{transform:translateY(400%);}
}
@keyframes orbitDot{
  0%{transform:rotate(0deg) translateX(46px) rotate(0deg);}
  100%{transform:rotate(360deg) translateX(46px) rotate(-360deg);}
}
@keyframes orbitDot2{
  0%{transform:rotate(120deg) translateX(46px) rotate(-120deg);}
  100%{transform:rotate(480deg) translateX(46px) rotate(-480deg);}
}
@keyframes orbitDot3{
  0%{transform:rotate(240deg) translateX(46px) rotate(-240deg);}
  100%{transform:rotate(600deg) translateX(46px) rotate(-600deg);}
}
@keyframes ecgTrace{
  0%{stroke-dashoffset:800;}
  100%{stroke-dashoffset:0;}
}
@keyframes floatY{
  0%,100%{transform:translateY(0);}
  50%{transform:translateY(-8px);}
}
@keyframes rotateSlow{
  from{transform:rotate(0deg);}
  to{transform:rotate(360deg);}
}
@keyframes blinkDot{0%,100%{opacity:1;}50%{opacity:0;}}
@keyframes shimmer{
  0%{background-position:-600px 0;}
  100%{background-position:600px 0;}
}
@keyframes countIn{
  from{opacity:0;transform:translateY(6px);}
  to{opacity:1;transform:translateY(0);}
}
@keyframes progressFill{
  from{width:0%;}
  to{width:var(--target);}
}
@keyframes ripple{
  0%{transform:scale(0);opacity:1;}
  100%{transform:scale(4);opacity:0;}
}
@keyframes twinkle{
  0%,100%{opacity:0.15;}
  50%{opacity:0.7;}
}

.page-enter{animation:fadeUp 0.42s cubic-bezier(.22,1,.36,1) both;}
.slide-right{animation:slideRight 0.36s ease both;}
.fade-in{animation:fadeIn 0.3s ease both;}
.float-y{animation:floatY 4s ease-in-out infinite;}

.s1{animation-delay:.05s} .s2{animation-delay:.11s} .s3{animation-delay:.17s}
.s4{animation-delay:.23s} .s5{animation-delay:.29s} .s6{animation-delay:.35s}

.heart-beat{animation:heartbeat 1.1s ease-in-out infinite;}
.breathe{animation:breathe 4s ease-in-out infinite;transform-origin:center;}

.card-lift{transition:all .28s cubic-bezier(0.25, 1, 0.5, 1);}
.card-lift:hover{transform:translateY(-6px) scale(1.01);box-shadow:0 18px 44px rgba(26,61,124,.18), 0 0 0 1px rgba(255,255,255,0.6) inset!important; z-index: 10;}

.btn-glow{transition:all .3s ease;}
.btn-glow:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 18px rgba(26,61,124,.22); filter: brightness(1.1);}

.nav-item{position:relative;}
.nav-item.active::after,
.nav-item:hover::after{
  content:'';position:absolute;bottom:-1px;left:0;right:0;
  height:2px;background:#F5A623;border-radius:2px;
}
.nav-item.active{color:#1A3D7C!important;font-weight:700!important;}

.f-input:focus{border-color:#1A3D7C!important;box-shadow:0 0 0 3px rgba(26,61,124,.12);}

.tab-pill.active{background:#1A3D7C;color:#fff;}

.ecg-path{stroke-dasharray:800;animation:ecgTrace 2.4s linear infinite;}

.scan-line{animation:scanLine 2.8s linear infinite;}

.od1{animation:orbitDot  4s linear infinite;}
.od2{animation:orbitDot2 4s linear infinite;}
.od3{animation:orbitDot3 4s linear infinite;}

.n-line{animation:neuralPulse 2s ease-in-out infinite;}
.n-line:nth-child(2){animation-delay:.4s;}
.n-line:nth-child(3){animation-delay:.8s;}
.n-line:nth-child(4){animation-delay:1.2s;}

.ripple-ring{animation:ripple 2s ease-out infinite;}
.ripple-ring:nth-child(2){animation-delay:.66s;}
.ripple-ring:nth-child(3){animation-delay:1.33s;}
`;

export const C = {
  navy: "#0D1F3C",
  primary: "#1A3D7C",
  primaryLt: "#2B5BAD",
  accent: "#F5A623",
  green: "#1F7A36",
  greenLt: "#E6F4EA",
  red: "#D63B3B",
  redLt: "#FDEAEA",
  amber: "#E8820C",
  amberLt: "#FEF3E0",
  bg: "#F5F7FA",
  surface: "#FFFFFF",
  border: "#D8E0EE",
  borderLt: "#EEF1F8",
  text: "#1A2B4A",
  textSub: "#4A5A7A",
  textMuted: "#8A96B0",
};

export const USERS = {
  "jetavya.singh": {
    pw: "Singh@2004", name: "Jetavya Singh", pid: "P-11042",
    abha: "76-1234-5678-0042", dob: "14 Jun 2004", blood: "A+", gender: "Male",
    city: "Lucknow, UP", phone: "+91 98765 43210",
    healthScore: 742, vaccinations: 7,
    allergies: ["Penicillin"], conditions: ["Mild Hypertension"],
    bmi: 23.1, cholesterol: 195, bp: "122/80",
    emergency: { name: "Rajesh Singh", relation: "Father", phone: "+91 97654 32100" },
    records: [
      { id: "R-001", name: "Blood Test Report", type: "Lab Report", date: "10 Jan 2025", size: "1.9 MB", doc: "Dr. Priya Sharma" },
      { id: "R-002", name: "Chest X-Ray", type: "Imaging", date: "22 Feb 2025", size: "7.4 MB", doc: "Dr. Rahul Nair" },
    ],
  },
  "nidhi.kumari": {
    pw: "Kumari@001", name: "Nidhi Kumari", pid: "P-22083",
    abha: "76-9876-5432-0083", dob: "08 Mar 2000", blood: "B+", gender: "Female",
    city: "Patna, Bihar", phone: "+91 91234 56789",
    healthScore: 618, vaccinations: 6,
    allergies: ["Sulfa Drugs"], conditions: ["Type 2 Diabetes"],
    bmi: 27.4, cholesterol: 242, bp: "134/88",
    emergency: { name: "Ramesh Kumar", relation: "Husband", phone: "+91 91111 22222" },
    records: [
      { id: "R-001", name: "Diabetes Panel", type: "Lab Report", date: "15 Dec 2024", size: "1.6 MB", doc: "Dr. Anika Mehta" },
      { id: "R-002", name: "Vacc Record", type: "Vaccination Record", date: "03 Mar 2025", size: "0.4 MB", doc: "Dr. Sonal Verma" },
    ],
  },
  "ananya.sharma": {
    pw: "Sharma@30", name: "Ananya Sharma", pid: "P-33017",
    abha: "76-5555-1111-0017", dob: "30 Nov 1999", blood: "O+", gender: "Female",
    city: "Pune, Maharashtra", phone: "+91 87654 32100",
    healthScore: 819, vaccinations: 9,
    allergies: ["Aspirin", "Latex"], conditions: [],
    bmi: 21.2, cholesterol: 178, bp: "118/76",
    emergency: { name: "Vijay Sharma", relation: "Father", phone: "+91 88888 77777" },
    records: [
      { id: "R-001", name: "ECG Report", type: "Cardiology", date: "05 Feb 2025", size: "1.1 MB", doc: "Dr. Priya Sharma" },
      { id: "R-002", name: "MRI Brain Scan", type: "Imaging", date: "18 Jan 2025", size: "22.3 MB", doc: "Dr. Vijay Bose" },
      { id: "R-003", name: "Prescription Jan", type: "Prescription", date: "18 Jan 2025", size: "0.2 MB", doc: "Dr. Vijay Bose" },
    ],
  },
};

export const VILLAGE_DATA = [
  { label: "Malaria", value: 38, color: "#D63B3B" },
  { label: "Typhoid", value: 24, color: "#E8820C" },
  { label: "Dengue", value: 19, color: "#7C3AED" },
  { label: "TB", value: 11, color: "#0284C7" },
  { label: "Other", value: 8, color: "#6B7280" },
];

export const OPD_MONTHLY = [
  { m: "Oct", v: 1820 }, { m: "Nov", v: 2140 }, { m: "Dec", v: 2380 },
  { m: "Jan", v: 2070 }, { m: "Feb", v: 2650 }, { m: "Mar", v: 2980 },
];

export const VACC_VG = [
  { name: "Rampur", pct: 87 }, { name: "Sinduri", pct: 72 }, { name: "Bhauli", pct: 91 },
  { name: "Kotwa", pct: 65 }, { name: "Nagwa", pct: 78 }, { name: "Deoria", pct: 83 },
  { name: "Mailani", pct: 69 }, { name: "Kasimpur", pct: 94 },
];

export const AshokaChakra = ({ size = 36 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="50" r="46" fill="none" stroke={C.primary} strokeWidth="3" />
    <circle cx="50" cy="50" r="38" fill="none" stroke={C.primary} strokeWidth="1" />
    <circle cx="50" cy="50" r="6" fill={C.primary} />
    {Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * 2 * Math.PI - Math.PI / 2;
      const x1 = 50 + 8 * Math.cos(a), y1 = 50 + 8 * Math.sin(a);
      const x2 = 50 + 36 * Math.cos(a), y2 = 50 + 36 * Math.sin(a);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" />;
    })}
    {Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * 2 * Math.PI - Math.PI / 2;
      const x = 50 + 38 * Math.cos(a), y = 50 + 38 * Math.sin(a);
      return <circle key={i} cx={x} cy={y} r="2.5" fill={C.primary} />;
    })}
  </svg>
);

export const BarChart = ({ data, color = C.primary, h = 150 }) => {
  const W = 400, H = h, pad = 30;
  const max = Math.max(...data.map(d => d.v));
  const cw = (W - pad * 2) / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + 28}`} style={{ width: "100%", overflow: "visible" }}>
      {data.map((d, i) => {
        const bh = ((d.v / max) * (H - 16));
        const x = pad + i * cw + cw * .15, bw = cw * .7, y = H - bh;
        return (
          <g key={d.m}>
            <rect x={x} y={y} width={bw} height={bh} rx={4} fill={color} opacity={.88} />
            <text x={x + bw / 2} y={H + 17} textAnchor="middle" fontSize={10} fill={C.textSub}>{d.m}</text>
            <text x={x + bw / 2} y={y - 5} textAnchor="middle" fontSize={9} fill={color} fontWeight="700">
              {(d.v / 1000).toFixed(1)}k
            </text>
          </g>
        );
      })}
      <line x1={pad} y1={H} x2={W - pad} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
};

export const DonutChart = ({ data, size = 168 }) => {
  const r = 56, cx = size / 2, cy = size / 2;
  const total = data.reduce((s, d) => s + d.value, 0);
  let cursor = -Math.PI / 2;
  const slices = data.map(d => {
    const ang = (d.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(cursor), y1 = cy + r * Math.sin(cursor);
    cursor += ang;
    const x2 = cx + r * Math.cos(cursor), y2 = cy + r * Math.sin(cursor);
    return { ...d, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${ang > Math.PI ? 1 : 0},1 ${x2},${y2} Z` };
  });
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {slices.map(s => <path key={s.label} d={s.d} fill={s.color} />)}
      <circle cx={cx} cy={cy} r={38} fill="#fff" />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={15} fontWeight="800" fill={C.text}>{total}</text>
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize={9} fill={C.textSub}>Total Cases</text>
    </svg>
  );
};

export const ArcProgress = ({ value, max = 100, size = 110, color = C.primary, label, sub }) => {
  const r = 43, circ = 2 * Math.PI * r, dash = circ * (value / max);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <svg viewBox="0 0 110 110" width={size} height={size}>
        <circle cx="55" cy="55" r={r} fill="none" stroke={C.borderLt} strokeWidth="9" />
        <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dasharray 1.3s ease" }} />
        <text x="55" y="51" textAnchor="middle" fontSize="17" fontWeight="800" fill={C.text}>{value}</text>
        <text x="55" y="64" textAnchor="middle" fontSize="9" fill={C.textSub}>{sub}</text>
      </svg>
      {label && <div style={{ fontSize: 11, fontWeight: 600, color: C.textSub, textAlign: "center" }}>{label}</div>}
    </div>
  );
};

export const StyleSheet = () => <style dangerouslySetInnerHTML={{ __html: GCSS }} />;

export const ProgBar = ({ value, max = 100, color = C.primary, h = 7 }) => (
  <div style={{ background: C.borderLt, borderRadius: 8, height: h, overflow: "hidden" }}>
    <div style={{
      height: "100%", borderRadius: 8, background: color,
      width: `${Math.min((value / max) * 100, 100)}%`,
      transition: "width 1.2s cubic-bezier(.22,1,.36,1)"
    }} />
  </div>
);

export const Chip = ({ label, color = C.primary, sm }) => (
  <span style={{
    display: "inline-block", padding: sm ? "2px 8px" : "3px 10px",
    background: `${color}14`, color, border: `1px solid ${color}30`,
    borderRadius: 5, fontSize: sm ? 10 : 11, fontWeight: 700, whiteSpace: "nowrap",
  }}>{label}</span>
);

export const Btn = ({ label, icon, onClick, variant = "primary", sm, style = {}, disabled, full }) => {
  const M = {
    primary: { bg: C.primary, fg: "#fff", br: C.primary },
    accent: { bg: C.accent, fg: "#fff", br: C.accent },
    outline: { bg: "transparent", fg: C.primary, br: C.primary },
    ghost: { bg: "transparent", fg: C.textSub, br: C.border },
    danger: { bg: C.red, fg: "#fff", br: C.red },
    green: { bg: C.green, fg: "#fff", br: C.green },
    navyOut: { bg: "transparent", fg: C.navy, br: C.navy },
  };
  const s = M[variant] || M.primary;
  return (
    <button onClick={onClick} disabled={disabled} className="btn-glow" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
      padding: sm ? "6px 14px" : "10px 22px",
      background: s.bg, color: s.fg, border: `1.5px solid ${s.br}`,
      borderRadius: 6, fontSize: sm ? 12 : 13, fontWeight: 700,
      opacity: disabled ? .5 : 1, transition: "all .18s", letterSpacing: "0.02em",
      width: full ? "100%" : undefined, ...style,
    }}>
      {icon && <span style={{ fontSize: sm ? 13 : 15 }}>{icon}</span>}
      {label}
    </button>
  );
};

export const Card = ({ children, style = {}, className = "", onClick }) => (
  <div onClick={onClick} className={`card-lift ${className}`} style={{
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: `1px solid rgba(255, 255, 255, 0.7)`,
    borderRadius: 16,
    boxShadow: "0 4px 16px rgba(13, 31, 60, 0.06), inset 0 0 0 1px rgba(255,255,255,0.4)",
    overflow: "hidden", cursor: onClick ? "pointer" : "default", ...style,
  }}>{children}</div>
);

export const PageWrap = ({ children, style = {} }) => (
  <main className="page-enter" style={{
    maxWidth: 1200, margin: "0 auto",
    padding: "36px 20px 72px", ...style
  }}>
    {children}
  </main>
);

export const SecHead = ({ label, title, sub }) => (
  <div style={{ marginBottom: 26 }}>
    {label && <div style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
      textTransform: "uppercase", color: C.accent, marginBottom: 7
    }}>{label}</div>}
    <h2 style={{
      fontSize: 23, fontWeight: 800, color: C.primary,
      fontFamily: "'Noto Serif Display',serif", lineHeight: 1.25
    }}>{title}</h2>
    {sub && <p style={{ fontSize: 13, color: C.textSub, marginTop: 6, maxWidth: 560, lineHeight: 1.7 }}>{sub}</p>}
  </div>
);

export const StatCard = ({ icon, label, value, sub, color = C.primary, delay = 0, trend }) => (
  <Card className="page-enter" style={{
    padding: 22, borderTop: `4px solid ${color}`,
    animationDelay: `${delay}s`
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{
          fontSize: 11, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.09em", color: C.textMuted, marginBottom: 9
        }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: C.text, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: C.textSub, marginTop: 6 }}>{sub}</div>}
        {trend && <div style={{ fontSize: 11, color: C.green, marginTop: 4, fontWeight: 700 }}>{trend}</div>}
      </div>
      <div style={{ fontSize: 26, padding: "10px 12px", background: `${color}12`, borderRadius: 10 }}>{icon}</div>
    </div>
  </Card>
);

export const FormField = ({ label, type = "text", value, onChange, placeholder, options, required, hint }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{
      display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
      textTransform: "uppercase", color: C.primary, marginBottom: 6
    }}>
      {label}{required && <span style={{ color: C.red }}> *</span>}
    </label>
    {type === "select" ? (
      <select value={value} onChange={e => onChange(e.target.value)} className="f-input" style={{
        width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8,
        fontSize: 13, background: C.surface, color: C.text, cursor: "pointer", appearance: "none",
      }}>
        <option value="">Select…</option>
        {options?.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : type === "textarea" ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        rows={3} className="f-input" style={{
          width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8,
          fontSize: 13, background: C.surface, color: C.text, resize: "vertical",
        }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} className="f-input" style={{
          width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8,
          fontSize: 13, background: C.surface, color: C.text,
        }} />
    )}
    {hint && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{hint}</div>}
  </div>
);
