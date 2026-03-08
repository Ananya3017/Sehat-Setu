// @ts-nocheck
import React from 'react';
import { C, PageWrap, SecHead, Card, Chip, Btn, AshokaChakra } from '../lib/design';

const Landing = ({ setPage }) => {
  return (
    <div style={{
      backgroundSize: "cover",
      backgroundAttachment: "fixed"
    }}>
      {/* ── HERO ── */}
      <div style={{ background: "transparent", padding: "0 0 0 0" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          alignItems: "center", minHeight: 480
        }}>

          {/* Left: text */}
          <div style={{ padding: "64px 0 64px" }}>
            {/* ABDM tag */}
            <div className="page-enter" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `1px solid ${C.border}`, borderRadius: 6,
              padding: "5px 14px", marginBottom: 28,
            }}>
              <span style={{
                width: 9, height: 9, borderRadius: "50%",
                background: C.green, display: "inline-block",
                animation: "blinkDot 1.4s step-end infinite"
              }} />
              <span style={{
                fontSize: 12, fontWeight: 600, color: C.text,
                letterSpacing: "0.04em"
              }}>ABDM Integrated System</span>
            </div>

            <h1 className="page-enter s1" style={{
              fontFamily: "'Noto Serif Display',serif",
              fontSize: 52, fontWeight: 800, lineHeight: 1.12, marginBottom: 22,
            }}>
              <span style={{ color: C.primary, display: "block" }}>One Nation.</span>
              <span style={{ color: C.accent, display: "block" }}>One Health Record.</span>
            </h1>

            <p className="page-enter s2" style={{
              fontSize: 16, color: C.textSub, lineHeight: 1.75, maxWidth: 460, marginBottom: 36,
            }}>
              SehatSetu provides secure digital healthcare access for every citizen of India.
            </p>

            <div className="page-enter s3" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn label="Access Health Vault →" onClick={() => setPage("vault")}
                style={{
                  background: C.primary, borderColor: C.primary,
                  color: "#fff", fontSize: 14, padding: "12px 28px"
                }} />
              <Btn label="Create Health Twin" onClick={() => setPage("health-twin")}
                variant="outline" style={{ fontSize: 14, padding: "12px 26px" }} />
              <Btn label="Check Health Score" onClick={() => setPage("score")}
                variant="ghost" style={{
                  fontSize: 14, padding: "12px 24px",
                  color: C.textMuted, borderColor: C.borderLt
                }} />
            </div>
          </div>

          {/* Right: surgery image placeholder — clean frame */}
          <div className="page-enter s2" style={{
            position: "relative", height: 480,
            display: "flex", alignItems: "center", justifyContent: "flex-end",
          }}>
            {/* Image frame */}
            <div style={{
              width: "88%", height: 430, borderRadius: 16, overflow: "hidden",
              background: `linear-gradient(135deg,${C.primary}18,${C.primaryLt}28)`,
              border: `2px solid ${C.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              {/* Abstract medical illustration since no real img */}
              <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={C.primary} stopOpacity="0.08" />
                    <stop offset="100%" stopColor={C.accent} stopOpacity="0.06" />
                  </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#heroGrad)" />
                {/* Operating light rings */}
                {[80, 64, 48, 32, 18].map((r, i) => (
                  <circle key={i} cx="200" cy="130" r={r}
                    fill="none" stroke={C.primary} strokeWidth={i === 0 ? 2 : 1}
                    opacity={0.15 + i * 0.08} />
                ))}
                {/* Surgeons circle */}
                {Array.from({ length: 8 }, (_, i) => {
                  const a = (i / 8) * 2 * Math.PI;
                  const x = 200 + 90 * Math.cos(a), y = 130 + 70 * Math.sin(a);
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r={16} fill={C.primary} opacity={0.12} />
                      <circle cx={x} cy={y - 5} r={8} fill={C.primary} opacity={0.2} />
                      <ellipse cx={x} cy={y + 12} rx={12} ry={8} fill={C.primary} opacity={0.15} />
                    </g>
                  );
                })}
                <circle cx="200" cy="130" r="24" fill={C.primary} opacity={0.1} />
                <text x="200" y="137" textAnchor="middle" fontSize="22" opacity={0.4}>🏥</text>
                {/* Bottom label */}
                <rect x="40" y="250" width="320" height="30" rx="6" fill={C.primary} opacity={0.07} />
                <text x="200" y="270" textAnchor="middle" fontSize="11"
                  fill={C.primary} fontWeight="700" opacity={0.5} fontFamily="Mukta,sans-serif">
                  SehatSetu · Digital Health Platform
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── GOVT STATS BAR ── */}
      <div style={{ background: C.primary, padding: "16px 20px" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0
        }}>
          {[
            { n: "54 Cr+", l: "Citizens Covered", icon: "👥" },
            { n: "2.3L", l: "Empanelled Hospitals", icon: "🏥" },
            { n: "1.1 Cr", l: "ABHA Health IDs", icon: "🪪" },
            { n: "6,400+", l: "Villages Online", icon: "🌾" },
          ].map((s, i) => (
            <div key={s.l} style={{
              display: "flex", alignItems: "center", gap: 12, justifyContent: "center",
              padding: "6px 0",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,.25)" : undefined,
            }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.8)", fontWeight: 500 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CORE MODULES ── */}
      <PageWrap>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <SecHead label="Platform Modules"
            title="Three Pillars of SehatSetu"
            sub="Health Vault · Digital Twin · Health Score — the complete national health intelligence pipeline." />
        </div>

        {/* 3 main cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))",
          gap: 22, marginBottom: 44
        }}>
          {[
            {
              icon: "🗄️", color: C.primary,
              title: "Health Vault",
              desc: "Secure cloud storage for all your medical records — lab reports, prescriptions, X-rays and more. Blockchain-logged, always accessible.",
              page: "vault", tag: "ABDM Compliant",
            },
            {
              icon: "🫀", color: C.red,
              title: "Digital Twin",
              desc: "AI-powered real-time physiological model. Live vitals, risk analysis, ECG trace and body avatar — your health in motion.",
              page: "health-twin", tag: "AI Powered",
            },
            {
              icon: "📊", color: C.accent,
              title: "Health Score",
              desc: "India's first Health CIBIL Score — a 300–900 numerical health reliability index for insurance, government schemes and risk assessment.",
              page: "score", tag: "Patent Pending",
            },
          ].map(f => (
            <Card key={f.page} style={{ cursor: "pointer", borderLeft: `5px solid ${f.color}` }}
              onClick={() => setPage(f.page)} className="page-enter">
              <div style={{ padding: 26 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ fontSize: 36 }}>{f.icon}</div>
                  <Chip label={f.tag} color={f.color} sm />
                </div>
                <div style={{
                  fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 10,
                  fontFamily: "'Noto Serif Display',serif"
                }}>{f.title}</div>
                <div style={{ fontSize: 13, color: C.textSub, lineHeight: 1.7, marginBottom: 18 }}>{f.desc}</div>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: f.color,
                  display: "flex", alignItems: "center", gap: 5
                }}>
                  Open Module →
                </div>
              </div>
            </Card>
          ))}
        </div>

      </PageWrap>
    </div>
  );
};
export default Landing;
