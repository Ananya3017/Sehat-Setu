import React, { useState } from 'react';
import { C, PageWrap, Card, Btn, Chip, USERS } from '../lib/design';

const Emergency = ({ user, setPage }) => {
  const eu = user;
  const [alertState, setAlertState] = useState(null);

  const QRViz = ({ sz = 155 }) => (
    <svg viewBox="0 0 155 155" width={sz} height={sz}
      style={{ border: `2px solid ${C.border}`, borderRadius: 8, background: "#fff" }}>
      {Array.from({ length: 14 }, (_, row) =>
        Array.from({ length: 14 }, (_, col) => {
          const corner = (row < 3 && col < 3) || (row < 3 && col > 10) || (row > 10 && col < 3);
          const fill = corner ? C.navy : (row + col * 3 + 7) % 5 === 0 ? C.primary : (row * 2 + col + 3) % 7 === 0 ? C.primaryLt : "transparent";
          return fill !== "transparent" && (
            <rect key={`${row}-${col}`} x={7 + col * 10} y={7 + row * 10}
              width={8} height={8} rx={1} fill={fill} />
          );
        })
      )}
    </svg>
  );

  const triggerAmbulance = () => {
    setAlertState("ambulance_loading");
    setTimeout(() => setAlertState("ambulance"), 2500);
  };

  const triggerContact = () => {
    setAlertState("contact_calling");
    setTimeout(() => setAlertState("contact"), 2000);
  };

  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg,#7B0000,#B71C1C,#D32F2F)",
        color: "#fff", padding: "18px 20px",
        boxShadow: "0 4px 24px rgba(183,28,28,.4)"
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 32, animation: "blinkDot 1.4s infinite" }}>🚨</span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.05em" }}>
                EMERGENCY ACCESS — AUTHORISED RESPONDERS ONLY
              </div>
              <div style={{ fontSize: 12, opacity: .85 }}>
                Critical patient data for emergency medical personnel. All access is audited on blockchain.
              </div>
            </div>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
            background: "rgba(0,0,0,.25)", padding: "7px 14px", borderRadius: 6
          }}>
            🔐 {new Date().toLocaleTimeString()} · EMG-{Math.floor(100000 + Math.random() * 900000)}
          </div>
        </div>
      </div>

      <PageWrap>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <div>
            <Card style={{ padding: 24, borderTop: `5px solid ${C.red}`, marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.red, marginBottom: 16 }}>
                🆘 Critical Medical Information
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  background: C.redLt, border: `3px solid ${C.red}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 800, color: C.red
                }}>{eu.name[0]}</div>
                <div>
                  <div style={{
                    fontSize: 18, fontWeight: 800, color: C.text,
                    fontFamily: "'Noto Serif Display',serif"
                  }}>{eu.name}</div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{eu.pid} · {eu.gender} · {eu.dob}</div>
                </div>
              </div>
              {/* Blood group big */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                {[{ l: "Blood Group", v: eu.blood, c: C.red, i: "🩸" },
                { l: "Blood Pressure", v: eu.bp || "122/80", c: C.primary, i: "🩺" }].map(x => (
                  <div key={x.l} style={{
                    padding: "14px", background: `${x.c}08`,
                    border: `2px solid ${x.c}40`, borderRadius: 10, textAlign: "center"
                  }}>
                    <div style={{ fontSize: 22 }}>{x.i}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: x.c, marginTop: 3 }}>{x.v}</div>
                    <div style={{ fontSize: 10, color: C.textSub, fontWeight: 600 }}>{x.l}</div>
                  </div>
                ))}
              </div>
              {/* Allergies */}
              <div style={{ marginBottom: 13 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", color: C.textMuted, marginBottom: 7
                }}>⚠️ Allergies</div>
                {eu.allergies?.length ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {eu.allergies.map(a => (
                      <span key={a} style={{
                        padding: "4px 12px", background: C.amberLt,
                        border: `1px solid ${C.amber}44`, color: C.amber,
                        borderRadius: 5, fontSize: 12, fontWeight: 700
                      }}>⚠️ {a}</span>
                    ))}
                  </div>
                ) : <span style={{ color: C.green, fontSize: 12, fontWeight: 600 }}>✓ No known allergies</span>}
              </div>
              {/* Conditions */}
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", color: C.textMuted, marginBottom: 7
                }}>🩺 Chronic Conditions</div>
                {eu.conditions?.length ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {eu.conditions.map(c => (
                      <span key={c} style={{
                        padding: "4px 12px", background: `${C.primary}10`,
                        border: `1px solid ${C.primary}30`, color: C.primary,
                        borderRadius: 5, fontSize: 12, fontWeight: 700
                      }}>{c}</span>
                    ))}
                  </div>
                ) : <span style={{ color: C.green, fontSize: 12, fontWeight: 600 }}>✓ No chronic conditions</span>}
              </div>
              {/* Emergency contact */}
              <div style={{
                padding: "14px 16px", background: C.redLt,
                border: `1px solid ${C.red}30`, borderRadius: 9
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.08em", color: C.red, marginBottom: 7
                }}>📞 Emergency Contact</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 2 }}>{eu.emergency.name}</div>
                <div style={{ fontSize: 12, color: C.textSub, marginBottom: 8 }}>{eu.emergency.relation}</div>
                <Btn label={eu.emergency.phone} onClick={triggerContact} icon="📞" variant="danger"
                  style={{ fontWeight: 800, fontSize: 14 }} />
              </div>
            </Card>
          </div>

          <div>
            <Card style={{
              padding: 24, textAlign: "center", marginBottom: 14,
              boxShadow: "0 4px 24px rgba(26,61,124,.1)"
            }}>
              <div style={{
                fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.1em", color: C.textMuted, marginBottom: 14
              }}>
                ABHA QR Health Card
              </div>
              <div style={{
                display: "inline-block", padding: 12,
                border: `2px solid ${C.border}`, borderRadius: 12, marginBottom: 12
              }}>
                <QRViz sz={155} />
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
                fontWeight: 700, color: C.primary, marginBottom: 4
              }}>{eu.abha}</div>
              <div style={{ fontSize: 12, color: C.textSub, marginBottom: 16 }}>{eu.name}</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <Btn label="Download" icon="⬇️" sm variant="outline" />
                <Btn label="Print" icon="🖨️" sm variant="ghost" />
              </div>
            </Card>

            <Card style={{ padding: 20, marginBottom: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 12 }}>
                Emergency Actions
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Btn label="📞 Call Emergency Contact" onClick={triggerContact} style={{ justifyContent: "center", padding: "11px", fontSize: 13 }} variant="danger" />
                <Btn label="🏥 Locate Nearest Hospital" onClick={() => setPage("hospitals")} style={{ justifyContent: "center", padding: "11px", fontSize: 13 }} />
                <Btn label="💊 Full Medical History" onClick={() => setPage("vault")} style={{ justifyContent: "center", padding: "11px", fontSize: 13 }} variant="outline" />
                <Btn label="🚑 Dispatch Ambulance (108)" onClick={triggerAmbulance} style={{ justifyContent: "center", padding: "11px", fontSize: 13, background: "#7F0000", borderColor: "#7F0000" }} variant="danger" />
              </div>
            </Card>

            <Card style={{ padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 12 }}>
                🔐 Access Audit Log
              </div>
              {[
                { who: "Dr. Kavita Reddy", when: "Just now", r: "Emergency trauma" },
                { who: "SehatSetu Portal", when: "2 hrs ago", r: "Routine check" },
                { who: "Dr. S. Mehta", when: "Yesterday", r: "Teleconsultation" },
              ].map(l => (
                <div key={l.who} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 0", borderBottom: `1px solid ${C.borderLt}`, fontSize: 12
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: C.text }}>{l.who}</div>
                    <div style={{ color: C.textSub }}>{l.r}</div>
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 11 }}>{l.when}</div>
                </div>
              ))}
            </Card>
          </div>
        </div>

        {alertState && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)",
            zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Card className="page-enter" style={{ width: 400, maxWidth: "90%", padding: 32, textAlign: "center", border: alertState.includes("ambulance") ? `3px solid ${C.red}` : `3px solid ${C.primary}` }}>
              {alertState === "ambulance_loading" && (
                <div style={{ color: C.red }}>
                  <div style={{ fontSize: 50, marginBottom: 16, animation: "blinkDot 1s infinite" }}>🚨</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>Locating Nearest Unit...</div>
                </div>
              )}
              {alertState === "ambulance" && (
                <div>
                  <div style={{ fontSize: 60, marginBottom: 10 }}>🚑</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.red, marginBottom: 8 }}>Ambulance Dispatched!</div>
                  <div style={{ fontSize: 15, color: C.textSub, marginBottom: 18, lineHeight: 1.6 }}>A Level-1 Trauma ALS unit is en route to your location. ETA: <b style={{ color: C.text }}>8 Minutes</b>.</div>
                  <div style={{ padding: "12px", background: C.redLt, border: `1px solid ${C.red}40`, borderRadius: 8, marginBottom: 24 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.red }}>Live Tracking ID: UP-14-AMB-8422</span>
                  </div>
                  <Btn label="Acknowledge" variant="danger" full style={{ justifyContent: "center" }} onClick={() => setAlertState(null)} />
                </div>
              )}

              {alertState === "contact_calling" && (
                <div style={{ color: C.primary }}>
                  <div style={{ fontSize: 50, marginBottom: 16, animation: "pulseRing 1.5s infinite" }}>📞</div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>Connecting to {eu.emergency.name}...</div>
                </div>
              )}
              {alertState === "contact" && (
                <div>
                  <div style={{ fontSize: 60, marginBottom: 10 }}>📱</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.green, marginBottom: 8 }}>Alert Sent</div>
                  <div style={{ fontSize: 15, color: C.textSub, marginBottom: 20, lineHeight: 1.6 }}>An automated emergency SOS containing your live ABHA coordinates has been delivered to <b style={{ color: C.text }}>{eu.emergency.name}</b>.</div>
                  <Btn label="Close" variant="outline" full style={{ justifyContent: "center" }} onClick={() => setAlertState(null)} />
                </div>
              )}
            </Card>
          </div>
        )}

      </PageWrap>
    </div>
  );
};
export default Emergency;
