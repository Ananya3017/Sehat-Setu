// @ts-nocheck
import React, { useState, useRef } from 'react';
import api from '../services/api';
import { C, PageWrap, Card, FormField, Btn, Chip, ProgBar, USERS } from '../lib/design';

const HealthVault = ({ user, setGlobalUser, setPage }) => {
  const [tab, setTab] = useState("records");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

  // Consent State
  const [consents, setConsents] = useState([
    { id: 1, who: "Dr. Priya Sharma", role: "General Physician", access: "Read", expires: "31 Mar 2025", active: true },
    { id: 2, who: "Apollo Hospital", role: "Hospital System", access: "Read+Write", expires: "30 Jun 2025", active: true },
    { id: 3, who: "LIC Insurance", role: "Insurer", access: "Score Only", expires: "31 Dec 2024", active: false },
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    { id: 4, who: "Star Health", role: "Insurer", access: "Read Only" },
    { id: 5, who: "AIIMS Lab Services", role: "Diagnostics", access: "Read+Write" }
  ]);

  const handleRevoke = (id) => {
    setConsents(prev => prev.map(c => c.id === id ? { ...c, active: false } : c));
  };

  const handleRequest = (id, accepted) => {
    const req = pendingRequests.find(r => r.id === id);
    if (!req) return;

    if (accepted) {
      setConsents(prev => [{
        id: req.id, who: req.who, role: req.role, access: req.access, expires: "31 Dec 2025", active: true
      }, ...prev]);
    }

    setPendingRequests(prev => prev.filter(r => r.id !== id));
  };

  // Form State
  const [uploadType, setUploadType] = useState("");
  const [uploadDoc, setUploadDoc] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [uploadTags, setUploadTags] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clinical Input State for Dynamic Score
  const [bp, setBp] = useState("");
  const [bmi, setBmi] = useState("");
  const [chol, setChol] = useState("");
  const [sugar, setSugar] = useState("");

  const fetchRecords = async () => {
    try {
      setLoadingRecords(true);
      const res = await api.get(`/records/user/${user._id || user.id}`);
      setRecords(res.data);
    } catch (e) {
      console.error("Failed to fetch records:", e);
    } finally {
      setLoadingRecords(false);
    }
  };

  React.useEffect(() => {
    fetchRecords();
  }, [user]);

  const handleUpload = async () => {
    if (!uploadType || !uploadDoc || !uploadDate) {
      alert("Please fill all required fields");
      return;
    }
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    setUploading(true);
    setUploaded(false);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", `${uploadType} - ${uploadDate}`);
      formData.append("type", uploadType);
      formData.append("date", uploadDate);
      formData.append("doc", uploadDoc);
      formData.append("size", `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`);

      await api.post('/records/store-record', formData);

      // Update the global user state with the newly entered health metrics so the Score instantly updates
      if (setGlobalUser) {
        setGlobalUser(prev => ({
          ...prev,
          bp: bp || prev.bp,
          bmi: bmi ? parseFloat(bmi) : prev.bmi,
          cholesterol: chol ? parseInt(chol) : prev.cholesterol,
          sugar: sugar ? parseInt(sugar) : prev.sugar,
          records: [...(prev.records || []), { id: Date.now(), type: uploadType, date: uploadDate }] // Mock record to increment score
        }));
      }

      setUploaded(true);
      fetchRecords(); // Refresh the list
      // Clear form
      setUploadType(""); setUploadDoc(""); setUploadDate(""); setUploadTags(""); setSelectedFile(null);
      setBp(""); setBmi(""); setChol(""); setSugar("");
    } catch (e) {
      console.error(e);
      alert("Failed to store on blockchain or database.");
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
          {[[records.length, "Records"], ["7", "Vault Days"], ["✓", "Blockchain Verified"]].map(([v, l]) => (
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
              Medical Records ({records.length})
            </div>
            <Chip label="Blockchain Secured" color={C.green} />
          </div>
          {loadingRecords ? (
            <div style={{ padding: "20px", textAlign: "center", color: C.textSub }}>Loading records...</div>
          ) : records.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: C.textSub }}>No records found in Vault. Upload one to get started!</div>
          ) : records.map(r => (
            <Card key={r._id || r.id} style={{ padding: "16px 20px", marginBottom: 10 }}>
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", flexWrap: "wrap", gap: 10
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ fontSize: 30 }}>
                    {r.type === "Lab Report" ? "🧪" : r.type === "Imaging" ? "🫁" :
                      r.type === "Vaccination" || r.type === "Vaccination Record" ? "💉" : "📄"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, marginBottom: 3 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: C.textSub }}>{r.doc} · {r.date} · {r.size}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Chip label={r.type} sm />
                  <Btn label="View" sm variant="outline" onClick={() => window.open(`https://gateway.pinata.cloud/ipfs/${r.blockchainHash}`, '_blank')} />
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
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${C.border}`, borderRadius: 10, padding: "36px 20px",
                textAlign: "center", marginBottom: 22, cursor: "pointer",
                background: selectedFile ? C.greenLt : C.bg, transition: "border-color .2s",
              }}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <div style={{ fontSize: 40, marginBottom: 8 }}>{selectedFile ? "📄" : "📁"}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: selectedFile ? C.green : C.text, marginBottom: 4 }}>
                {selectedFile ? selectedFile.name : "Drop files here or click to browse"}
              </div>
              <div style={{ fontSize: 12, color: C.textMuted }}>
                {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : "PDF, JPG, PNG · Max 50 MB per file"}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <FormField label="Document Type" type="select" value={uploadType} onChange={setUploadType}
                options={["Lab Report", "Prescription", "Imaging", "Vaccination Record", "Discharge Summary", "Other"]} required={true} />
              <FormField label="Doctor / Hospital" value={uploadDoc} onChange={setUploadDoc}
                placeholder="e.g. Dr. Priya Sharma, AIIMS" required={true} />
              <FormField label="Document Date" type="date" value={uploadDate} onChange={setUploadDate} required={true} />
              <FormField label="Tags" value={uploadTags} onChange={setUploadTags} placeholder="diabetes, cardiology…" />
            </div>

            <div style={{ marginTop: 24, marginBottom: 20, paddingTop: 20, borderTop: `1px solid ${C.borderLt}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 6 }}>
                🧬 Add Clinical Metrics (Improves Health Score)
              </div>
              <div style={{ fontSize: 12, color: C.textSub, marginBottom: 16 }}>
                Entering these updated metrics from your report will recalculate your CIBIL Health Score instantly.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0 14px" }}>
                <FormField label="Blood Pressure (sys/dia)" value={bp} onChange={setBp} placeholder="120/80" />
                <FormField label="BMI (Body Mass)" type="number" value={bmi} onChange={setBmi} placeholder="22.5" />
                <FormField label="Cholesterol (mg/dL)" type="number" value={chol} onChange={setChol} placeholder="190" />
                <FormField label="Blood Sugar (mg/dL)" type="number" value={sugar} onChange={setSugar} placeholder="95" />
              </div>
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
            {[...consents].map(c => (
              <div key={c.id} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "14px 0",
                borderBottom: `1px solid ${C.borderLt}`, flexWrap: "wrap", gap: 10
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: C.text, marginBottom: 2 }}>{c.who}</div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{c.role} {c.active ? `· Expires ${c.expires}` : ""}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Chip label={c.access} color={C.primary} sm />
                  <Chip label={c.active ? "Active" : "Revoked"} color={c.active ? C.green : C.textMuted} sm />
                  {c.active && <Btn label="Revoke" onClick={() => handleRevoke(c.id)} sm variant="danger" />}
                </div>
              </div>
            ))}

            {/* Pending Requests Section */}
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginTop: 30, marginBottom: 14 }}>
              Pending Access Requests
            </div>
            {pendingRequests.length === 0 ? (
              <div style={{ fontSize: 13, color: C.textSub }}>No pending requests.</div>
            ) : pendingRequests.map(r => (
              <div key={r.id} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "14px", background: C.bg,
                border: `1px solid ${C.borderLt}`, borderRadius: 8, flexWrap: "wrap", gap: 10, marginBottom: 10
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: C.text, marginBottom: 2 }}>{r.who}</div>
                  <div style={{ fontSize: 12, color: C.textSub }}>{r.role} · Requests {r.access} Access</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Btn label="Deny" onClick={() => handleRequest(r.id, false)} sm variant="danger" />
                  <Btn label="Accept" onClick={() => handleRequest(r.id, true)} sm variant="green" />
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
