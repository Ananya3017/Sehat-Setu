// @ts-nocheck
import React, { useState } from 'react';
import api from '../services/api';
import { C, PageWrap, Card, FormField, Btn, Chip, ProgBar, USERS } from '../lib/design';

const HealthVault = ({ user, setPage }) => {
  const [tab, setTab] = useState("records");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    setUploading(true);
    try {
      const hash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      await api.post('/records/store-record', { hash });
      setUploaded(true);
    } catch (e) {
      console.error(e);
      alert("Failed to store on blockchain.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageWrap>
      {/* Top bar */}
      <div style={{
        background: `linear-gradient(135deg,${C.navy},${C.primary})`,
        borderRadius: 14, padding: "22px 28px", color: "#fff", marginBottom: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 54, height: 54, borderRadius: "50%",
            background: "rgba(255,255,255,.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 800
          }}>{user.name[0]}</div>
          <div>
            <div style={{ fontSize: 11, opacity: .7, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Health Vault · Secure Records
            </div>
            <div style={{
              fontSize: 22, fontWeight: 800,
              fontFamily: "'Noto Serif Display',serif"
            }}>{user.name}</div>
            <div style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 12, opacity: .8, marginTop: 2
            }}>{user.abha}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[[user.records.length, "Records"], ["7", "Vault Days"], ["✓", "Blockchain Verified"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: v === "✓" ? "#4ADE80" : "#fff" }}>{v}</div>
              <div style={{ fontSize: 11, opacity: .75 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABHA Card */}
      <div style={{
        background: `linear-gradient(135deg,${C.navy} 0%,${C.primary} 55%,${C.primaryLt} 100%)`,
        borderRadius: 16, padding: 26, color: "#fff", marginBottom: 24,
        boxShadow: "0 10px 36px rgba(26,61,124,.3)", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40, width: 160, height: 160,
          borderRadius: "50%", background: "rgba(255,255,255,.05)"
        }} />
        <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
          {[C.accent, "#fff", C.green].map((c, i) => (
            <div key={i} style={{ width: 7, height: 36, background: c, borderRadius: 2 }} />
          ))}
          <div style={{ marginLeft: 10 }}>
            <div style={{ fontSize: 10, opacity: .7, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Ayushman Bharat · SehatSetu
            </div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>ABHA Digital Health Account</div>
          </div>
        </div>
        <div style={{
          fontSize: 24, fontWeight: 800, marginBottom: 3,
          fontFamily: "'Noto Serif Display',serif"
        }}>{user.name}</div>
        <div style={{
          fontFamily: "'JetBrains Mono',monospace", fontSize: 14, opacity: .85,
          letterSpacing: "0.1em", marginBottom: 16
        }}>{user.abha}</div>
        <div style={{ display: "flex", gap: 28 }}>
          {[["Blood", user.blood], ["DOB", user.dob], ["City", user.city.split(",")[0]]].map(([l, v]) => (
            <div key={l}>
              <div style={{ fontSize: 10, opacity: .65 }}>{l}</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
        {["records", "upload", "consent"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`tab-pill${tab === t ? " active" : ""}`}
            style={{
              padding: "8px 18px", borderRadius: 22, fontSize: 12, fontWeight: 700,
              background: tab === t ? C.primary : C.borderLt,
              color: tab === t ? "#fff" : C.textSub, transition: "all .18s",
              border: "none", textTransform: "capitalize"
            }}>
            {t === "records" ? "📁 Records" : t === "upload" ? "📤 Upload" : t === "consent" ? "🔐 Consent" : ""}
          </button>
        ))}
      </div>

      {tab === "records" && (
        <div className="page-enter">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.primary }}>
              Medical Records ({user.records.length})
            </div>
            <Chip label="Blockchain Secured" color={C.green} />
          </div>
          {user.records.map(r => (
            <Card key={r.id} style={{ padding: "16px 20px", marginBottom: 10 }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", flexWrap: "wrap", gap: 10
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ fontSize: 30 }}>
                    {r.type === "Lab Report" ? "🧪" : r.type === "Imaging" ? "🫁" :
                      r.type === "Vaccination Record" ? "💉" : "📄"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, marginBottom: 3 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: C.textSub }}>{r.doc} · {r.date} · {r.size}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Chip label={r.type} sm />
                  <Btn label="View" sm variant="outline" />
                  <Btn label="Share" sm variant="ghost" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "upload" && (
        <div className="page-enter">
          <Card style={{ padding: 30, maxWidth: 600 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 20 }}>
              📤 Upload Medical Record
            </div>
            <div style={{
              border: `2px dashed ${C.border}`, borderRadius: 10, padding: "36px 20px",
              textAlign: "center", marginBottom: 22, cursor: "pointer",
              background: C.bg, transition: "border-color .2s",
            }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📁</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>
                Drop files here or click to browse
              </div>
              <div style={{ fontSize: 12, color: C.textMuted }}>
                PDF, JPG, PNG · Max 50 MB per file
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormField label="Document Type" type="select" value="" onChange={() => { }}
                options={["Lab Report", "Prescription", "Imaging", "Vaccination", "Discharge Summary", "Other"]} />
              <FormField label="Doctor / Hospital" value="" onChange={() => { }}
                placeholder="e.g. Dr. Priya Sharma, AIIMS" />
              <FormField label="Document Date" type="date" value="" onChange={() => { }} />
              <FormField label="Tags" value="" onChange={() => { }} placeholder="diabetes, cardiology…" />
            </div>
            {uploading && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: C.textSub, marginBottom: 6 }}>
                  Uploading & encrypting…
                </div>
                <ProgBar value={70} max={100} color={C.green} h={6} />
              </div>
            )}
            {uploaded && (
              <div style={{
                padding: "10px 14px", background: C.greenLt,
                border: `1px solid ${C.green}30`, borderRadius: 7,
                fontSize: 12, color: C.green, marginBottom: 14, fontWeight: 600
              }}>
                ✅ Record uploaded and stored in Health Vault. Blockchain hash generated.
              </div>
            )}
            <Btn label={uploading ? "Uploading…" : "✓ Upload to Vault"} onClick={handleUpload}
              disabled={uploading} variant="green" style={{ padding: "10px 24px" }} />
          </Card>
        </div>
      )}

      {tab === "consent" && (
        <div className="page-enter">
          <Card style={{ padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 16 }}>
              🔐 Consent Manager
            </div>
            <div style={{ fontSize: 13, color: C.textSub, marginBottom: 20 }}>
              Control who can access your health records. All access is logged on blockchain.
            </div>
            {[
              { who: "Dr. Priya Sharma", role: "General Physician", access: "Read", expires: "31 Mar 2025", active: true },
              { who: "Apollo Hospital", role: "Hospital System", access: "Read+Write", expires: "30 Jun 2025", active: true },
              { who: "LIC Insurance", role: "Insurer", access: "Score Only", expires: "31 Dec 2024", active: false },
            ].map(c => (
              <div key={c.who} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "14px 0",
                borderBottom: `1px solid ${C.borderLt}`, flexWrap: "wrap", gap: 10
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: C.text, marginBottom: 2 }}>{c.who}</div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{c.role} · Expires {c.expires}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Chip label={c.access} color={C.primary} sm />
                  <Chip label={c.active ? "Active" : "Expired"} color={c.active ? C.green : C.textMuted} sm />
                  {c.active && <Btn label="Revoke" sm variant="danger" />}
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}
    </PageWrap>
  );
};
export default HealthVault;
