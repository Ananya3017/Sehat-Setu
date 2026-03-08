// @ts-nocheck
import React, { useState } from 'react';
import { C, PageWrap, SecHead, Card, FormField, Btn, ProgBar, Chip, USERS } from '../lib/design';

const HealthScore = ({ user }) => {

  const getBPStatus = (bpStr) => {
    if (!bpStr) return { w: 0, s: "Unknown" };
    const [sys, dia] = bpStr.split('/').map(Number);
    if (sys <= 120 && dia <= 80) return { w: 50, s: "Normal" };
    if (sys <= 130 && dia <= 80) return { w: 20, s: "Elevated" };
    return { w: -30, s: "High BP" };
  };

  const bpEval = getBPStatus(user.bp);
  const bmi = user.bmi || 25;
  const bmiEval = (bmi >= 18.5 && bmi <= 24.9) ? { w: 50, s: "Ideal" } : { w: -30, s: "Outside Ideal Range" };

  const chol = user.cholesterol || 200;
  const cholEval = chol < 200 ? { w: 40, s: "Normal" } : chol <= 239 ? { w: 10, s: "Borderline" } : { w: -30, s: "High" };

  const sugar = user.sugar || 95;
  const sugarEval = sugar < 100 ? { w: 40, s: "Normal" } : sugar <= 125 ? { w: -10, s: "Prediabetic" } : { w: -40, s: "Diabetic" };

  const vaccEval = { w: (user.vaccinations || 0) * 15, s: `${user.vaccinations || 0} Doses` };
  const condEval = { w: (user.conditions?.length || 0) * -40, s: `${user.conditions?.length || 0} Condition(s)` };
  const recsEval = { w: (user.records?.length || 0) * 10, s: `${user.records?.length || 0} Uploads` };

  let calculatedScore = 500 + bpEval.w + bmiEval.w + cholEval.w + sugarEval.w + vaccEval.w + condEval.w + recsEval.w;
  calculatedScore = Math.max(300, Math.min(900, calculatedScore));

  const score = calculatedScore;
  const scoreColor = score >= 750 ? C.green : score >= 600 ? C.amber : C.red;
  const scoreLabel = score >= 750 ? "Excellent" : score >= 600 ? "Good" : "Needs Improvement";

  const factors = [
    { l: "Vitals (BMI, BP)", w: Math.round(((bpEval.w + bmiEval.w + 100) / 200) * 30), s: `${bpEval.s}, ${bmiEval.s}`, d: "Blood Pressure, BMI Index" },
    { l: "Lipids (Chol)", w: Math.round(((cholEval.w + 50) / 90) * 15), s: cholEval.s, d: `Level: ${chol} mg/dL` },
    { l: "Blood Sugar", w: Math.round(((sugarEval.w + 50) / 90) * 15), s: sugarEval.s, d: `Fasting: ${sugar} mg/dL` },
    { l: "Preventive Care", w: Math.round((Math.min(vaccEval.w, 100) / 100) * 20), s: vaccEval.s, d: "Vacci nations, Screenings" },
    { l: "Active Monitoring", w: Math.round((Math.min(recsEval.w, 50) / 50) * 10), s: recsEval.s, d: "Uploaded Medical Records" },
    { l: "Risk Events", w: Math.round(((100 + condEval.w) / 100) * 10), s: condEval.s, d: "Chronic Disease, Allergies" },
  ];

  const r = 80, circ = 2 * Math.PI * r, pct = (score - 300) / 600;
  const dash = circ * Math.min(pct, 1);

  return (
    <PageWrap>
      <SecHead label="Health CIBIL Score" title="Your Health Intelligence Score"
        sub="India's first numerical health reliability index — used for insurance, PM-JAY and risk assessment." />

      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 22, marginBottom: 22 }}>

        {/* Score dial */}
        <Card style={{ padding: 28, textAlign: "center" }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: C.textMuted,
            textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16
          }}>
            Health CIBIL Score · {new Date().toLocaleDateString("en-IN")}
          </div>

          <svg viewBox="0 0 200 200" width={200} height={200} style={{ overflow: "visible" }}>
            {/* Track */}
            <circle cx="100" cy="100" r={r} fill="none"
              stroke={C.borderLt} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${circ * .75} ${circ * .25}`}
              style={{ transform: "rotate(135deg)", transformOrigin: "100px 100px" }} />
            {/* Fill */}
            <circle cx="100" cy="100" r={r} fill="none"
              stroke={scoreColor} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${dash * .75} ${circ - dash * .75}`}
              style={{
                transform: "rotate(135deg)", transformOrigin: "100px 100px",
                transition: "stroke-dasharray 1.4s ease, stroke .5s ease"
              }} />
            {/* Labels */}
            <text x="100" y="82" textAnchor="middle" fontSize="10" fill={C.textMuted}>Score</text>
            <text x="100" y="106" textAnchor="middle" fontSize="36" fontWeight="800" fill={C.text}>{score}</text>
            <text x="100" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill={scoreColor}>{scoreLabel}</text>
            <text x="30" y="165" textAnchor="middle" fontSize="9" fill={C.textMuted}>300</text>
            <text x="170" y="165" textAnchor="middle" fontSize="9" fill={C.textMuted}>900</text>
          </svg>

          <div style={{
            display: "flex", justifyContent: "space-around",
            marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.borderLt}`
          }}>
            {[["300–549", "Poor", "#D63B3B"], ["550–699", "Good", C.amber], ["700–900", "Excel.", C.green]].map(([r, l, c]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 10, color: c, fontWeight: 800 }}>{r}</div>
                <div style={{ fontSize: 9, color: C.textMuted }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 16, padding: "10px 14px",
            background: `${scoreColor}12`, border: `1px solid ${scoreColor}30`,
            borderRadius: 8, fontSize: 12, fontWeight: 700, color: scoreColor,
          }}>
            Risk Level: {score >= 750 ? "Low 🟢" : score >= 600 ? "Moderate 🟡" : "High 🔴"}
          </div>
        </Card>

        {/* Score formula & breakdown */}
        <div>
          <Card style={{ padding: 22, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 14 }}>
              Score Algorithm (Weighted Formula)
            </div>
            <div style={{
              background: C.navy, borderRadius: 8, padding: "14px 16px",
              fontFamily: "'JetBrains Mono',monospace", fontSize: 11, lineHeight: 2,
              color: "rgba(255,255,255,.8)", marginBottom: 14,
            }}>
              <div style={{ color: "rgba(255,255,255,.35)" }}>{/* Health CIBIL Engine v2 */}</div>
              <div style={{ color: "#60A5FA" }}>score = (</div>
              {factors.map(f => (
                <div key={f.l} style={{ paddingLeft: 14 }}>
                  <span style={{ color: "#F59E0B" }}>{f.w}%</span>
                  {" × "}<span style={{ color: "#4ADE80" }}>{f.l.toLowerCase()}</span>
                  <span style={{ color: "rgba(255,255,255,.3)" }}>{" // " + f.d}</span>
                </div>
              ))}
              <div style={{ color: "#60A5FA" }}>{")"}</div>
              <div style={{ color: "#4ADE80" }}>→ {score}</div>
            </div>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
            {factors.map(f => (
              <Card key={f.l} style={{ padding: 14 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: scoreColor, marginBottom: 3 }}>{f.s}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text, marginBottom: 2 }}>{f.l}</div>
                <div style={{ fontSize: 9, color: C.textMuted, marginBottom: 7 }}>Weight {f.w}%</div>
                <ProgBar value={f.s} max={Math.round(900 * f.w / 100)} color={scoreColor} h={4} />
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* History + Recommendations */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 22 }}>
        <Card style={{ padding: 22 }}>
          <div style={{ fontWeight: 700, color: C.primary, marginBottom: 16 }}>Score History</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
            {[
              ["Oct", Math.max(300, score - 42)],
              ["Nov", Math.max(300, score - 31)],
              ["Dec", Math.max(300, score - 20)],
              ["Jan", Math.max(300, score - 14)],
              ["Feb", Math.max(300, score - 8)],
              ["Mar", score]
            ].map(([m, s], i, arr) => {
              const last = i === arr.length - 1;
              return (
                <div key={m} style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 4
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 8,
                    color: last ? C.primary : C.textMuted
                  }}>{s}</div>
                  <div style={{
                    width: "100%", background: last ? scoreColor : C.borderLt,
                    borderRadius: "3px 3px 0 0", height: `${((s - 300) / 600) * 80}px`,
                    transition: "height 1s ease"
                  }} />
                  <div style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 8,
                    color: C.textMuted
                  }}>{m}</div>
                </div>
              );
            })}
          </div>
          <div style={{
            marginTop: 12, padding: "8px 12px", background: C.greenLt,
            border: `1px solid ${C.green}30`, borderRadius: 6, fontSize: 12, color: C.green, fontWeight: 600
          }}>
            +{score - Math.max(300, score - 42)} points over 6 months 📈
          </div>
        </Card>

        <Card style={{ padding: 22, borderLeft: `5px solid ${C.accent}` }}>
          <div style={{ fontWeight: 700, color: C.primary, marginBottom: 14 }}>
            📋 Recommendations
          </div>
          {[
            { icon: "🏃", text: "Increase daily exercise to 30 minutes — target 10,000 steps.", priority: "High" },
            { icon: "🩸", text: "Fasting blood sugar is elevated; reduce refined carbs and sugar.", priority: sugar >= 100 ? "High" : "Low" },
            { icon: "🥗", text: "Reduce sodium intake; monitor cholesterol levels quarterly.", priority: chol >= 200 ? "High" : "Low" },
            { icon: "💉", text: "Schedule overdue vaccinations to improve Preventive Care score.", priority: user.vaccinations < 6 ? "Medium" : "Low" },
          ].map((r, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: "10px 0", borderBottom: i < 3 ? `1px solid ${C.borderLt}` : undefined
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{r.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6, marginBottom: 3 }}>{r.text}</div>
                <Chip label={`${r.priority} Priority`}
                  color={r.priority === "High" ? C.red : r.priority === "Medium" ? C.amber : C.green} sm />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Insurance Benefits Output */}
      <Card className="page-enter s6" style={{ padding: 0, overflow: "hidden", display: "flex" }}>
        <div style={{
          width: 130, background: C.primary, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: 20, color: "#fff", textAlign: "center"
        }}>
          <div style={{ fontSize: 36 }}>🛡️</div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 10 }}>
            Insurance<br />Benefits
          </div>
        </div>
        <div style={{ flex: 1, padding: "26px 30px", background: `linear-gradient(to right, ${C.surface}, ${scoreColor}06)` }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 8 }}>
            Unlocked Insurance Benefits
          </div>
          <div style={{ fontSize: 13, color: C.textSub, marginBottom: 20 }}>
            Your Health CIBIL Score is instantly verifiable by empanelled insurers.
            Maintain a high score to permanently lock-in premium discounts and risk-free policy renewals.
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {score >= 800 ? (
              <>
                <div style={{ background: C.greenLt, border: `1px solid ${C.green}40`, padding: "12px 18px", borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.green }}>15% Premium Discount</div>
                  <div style={{ fontSize: 11, color: C.textSub, fontWeight: 600 }}>On all new policy issuances</div>
                </div>
                <div style={{ background: C.greenLt, border: `1px solid ${C.green}40`, padding: "12px 18px", borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.green }}>Free Annual Health Checkup</div>
                  <div style={{ fontSize: 11, color: C.textSub, fontWeight: 600 }}>Including Complete Blood Panel</div>
                </div>
              </>
            ) : score >= 700 ? (
              <>
                <div style={{ background: `${C.primary}15`, border: `1px solid ${C.primary}30`, padding: "12px 18px", borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>10% Premium Discount</div>
                  <div style={{ fontSize: 11, color: C.textSub, fontWeight: 600 }}>Upon policy renewal</div>
                </div>
                <div style={{ background: `${C.primary}15`, border: `1px solid ${C.primary}30`, padding: "12px 18px", borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.primary }}>+10% NCB Boost</div>
                  <div style={{ fontSize: 11, color: C.textSub, fontWeight: 600 }}>Bonus No-Claim applied</div>
                </div>
              </>
            ) : score >= 600 ? (
              <>
                <div style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}30`, padding: "12px 18px", borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.amber }}>5% Premium Discount</div>
                  <div style={{ fontSize: 11, color: C.textSub, fontWeight: 600 }}>Basic score benefit tier</div>
                </div>
                <div style={{ background: `${C.amber}15`, border: `1px solid ${C.amber}30`, padding: "12px 18px", borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.amber }}>1 Free Teleconsultation</div>
                  <div style={{ fontSize: 11, color: C.textSub, fontWeight: 600 }}>Via SehatSetu App</div>
                </div>
              </>
            ) : (
              <div style={{ background: C.redLt, border: `1px solid ${C.red}30`, padding: "12px 18px", borderRadius: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.red }}>Standard Premiums Apply</div>
                <div style={{ fontSize: 12, color: C.textSub, fontWeight: 600 }}>Improve your score to 600+ to unlock benefits.</div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </PageWrap>
  );
};
export default HealthScore;
