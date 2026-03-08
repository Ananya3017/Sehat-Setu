import React, { useState } from 'react';
import { C, PageWrap, SecHead, StatCard, Card, FormField, Btn } from '../lib/design';

const ALL_DOCS = [
  { name: "Dr. Priya Sharma", spec: "General Physician", wait: "2 min", lang: "Hindi, English", img: "P" },
  { name: "Dr. Rahul Nair", spec: "Cardiologist", wait: "8 min", lang: "Malayalam, English", img: "R" },
  { name: "Dr. Anika Mehta", spec: "Diabetologist", wait: "5 min", lang: "Hindi, Gujarati", img: "A" },
  { name: "Dr. Suresh Patel", spec: "General Physician", wait: "4 min", lang: "Gujarati, English", img: "S" },
  { name: "Dr. Anita Desai", spec: "Gynecologist", wait: "0 min", lang: "Marathi, Hindi", img: "A" },
  { name: "Dr. Rohan Gupta", spec: "Pediatrician", wait: "12 min", lang: "Hindi, English", img: "R" }
];

const Telemedicine = () => {
  const [doctors, setDoctors] = useState(ALL_DOCS);
  const [spec, setSpec] = useState("");
  const [lang, setLang] = useState("");
  const [date, setDate] = useState("");

  const [activeCall, setActiveCall] = useState(null); // null | "waiting" | "connected"
  const [callDoc, setCallDoc] = useState(null);

  const handleFilter = () => {
    let filt = ALL_DOCS;
    if (spec) filt = filt.filter(d => d.spec === spec);
    if (lang) filt = filt.filter(d => d.lang.includes(lang));
    setDoctors(filt);
  };

  const startCall = (doc) => {
    setCallDoc(doc);
    setActiveCall("waiting");
    setTimeout(() => {
      setActiveCall("connected");
    }, 2500);
  };

  const endCall = () => {
    setActiveCall(null);
    setCallDoc(null);
  };

  return (
    <PageWrap>
      <SecHead label="eSanjeevani Integration" title="Telemedicine Portal"
        sub="Video consultations, e-prescriptions and remote monitoring — powered by eSanjeevani." />
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: 16, marginBottom: 28
      }} className="page-enter">
        <StatCard icon="📞" label="Active Consults" value="18,320" color={C.primary} />
        <StatCard icon="👨⚕️" label="Doctors Online" value="3,412" color={C.green} />
        <StatCard icon="⏱️" label="Avg Wait Time" value="4 min" color={C.accent} />
        <StatCard icon="🌐" label="States Covered" value="28" color="#0284C7" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
        <Card style={{ padding: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 18 }}>
            👨⚕️ Available Doctors ({doctors.length})
          </div>
          {doctors.length === 0 ? (
            <div style={{ padding: 20, color: C.textSub, textAlign: "center" }}>No doctors available for these preferences right now.</div>
          ) : doctors.map(d => (
            <div key={d.name} style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "12px 0",
              borderBottom: `1px solid ${C.borderLt}`
            }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: "50%",
                  background: `${C.primary}14`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 18, fontWeight: 700, color: C.primary
                }}>
                  {d.img}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: C.text, fontSize: 13 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: C.textSub }}>{d.spec} · {d.lang}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>~{d.wait}</span>
                <Btn label="Consult" sm variant="green" onClick={() => startCall(d)} />
              </div>
            </div>
          ))}
        </Card>

        <Card style={{ padding: 24, position: "sticky", top: 90 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 2 }}>
            📅 Filter & Book Appointment
          </div>
          <div style={{ fontSize: 12, color: C.textSub, marginBottom: 18 }}>
            Live queue filtering powered by eSanjeevani.
          </div>
          <FormField label="Specialty" type="select" value={spec} onChange={setSpec}
            options={["General Physician", "Cardiologist", "Diabetologist", "Gynecologist", "Pediatrician"]} />
          <FormField label="Preferred Language" type="select" value={lang} onChange={setLang}
            options={["Hindi", "English", "Gujarati", "Malayalam", "Marathi"]} />
          <FormField label="Date (Optional)" type="date" value={date} onChange={setDate} />
          <Btn label="Find Available Doctors" variant="primary" style={{ padding: "10px 22px", marginTop: 8 }} onClick={handleFilter} />
        </Card>
      </div>

      {activeCall && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)",
          zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Card className="page-enter" style={{ width: 600, maxWidth: "95%", padding: 0, overflow: "hidden", background: "#111", border: `1px solid ${C.borderLt}` }}>
            <div style={{ padding: "16px 24px", background: C.navy, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 800 }}>eSanjeevani Teleconsultation</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Secured via ABDM Encryption</div>
            </div>

            <div style={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              {activeCall === "waiting" ? (
                <div style={{ textAlign: "center", color: "#fff" }}>
                  <div style={{ fontSize: 40, marginBottom: 16, animation: "pulseRing 2s infinite", display: "inline-block", borderRadius: "50%" }}>🎥</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Routing to {callDoc.name}...</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Establishing secure video link. Estimated wait: {callDoc.wait}</div>
                </div>
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#222", position: "relative" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.05)", fontSize: 120, fontWeight: 900, fontFamily: "serif" }}>
                    {callDoc.img}
                  </div>
                  <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 6, color: "#fff", fontSize: 11, fontWeight: 700 }}>
                    {callDoc.name} ({callDoc.spec})
                  </div>
                  <div style={{ position: "absolute", bottom: 16, right: 16, background: "rgba(255,0,0,0.2)", border: "1px solid red", padding: "4px 10px", borderRadius: 6, color: "#ff4d4d", fontSize: 11, fontWeight: 700, animation: "blinkDot 1.5s infinite" }}>
                    ● REC
                  </div>
                  <div style={{ position: "absolute", top: 16, right: 16, width: 100, height: 140, background: "#444", borderRadius: 8, border: "2px solid #555" }} />
                </div>
              )}
            </div>

            <div style={{ padding: 20, background: "#1A1A1A", display: "flex", justifyContent: "center", gap: 20 }}>
              <Btn label="🔇 Mute" variant="outline" style={{ borderColor: "#555", color: "#fff", background: "#333" }} />
              <Btn label="📹 Video" variant="outline" style={{ borderColor: "#555", color: "#fff", background: "#333" }} />
              <Btn label="End Call" variant="danger" onClick={endCall} />
            </div>
          </Card>
        </div>
      )}

    </PageWrap>
  );
};

export default Telemedicine;
