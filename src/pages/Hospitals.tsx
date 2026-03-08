// @ts-nocheck
import React, { useState } from 'react';
import { C, PageWrap, SecHead, StatCard, Btn, Card, Chip, FormField } from '../lib/design';

const INITIAL_HOSPS = [
  { name: "AIIMS New Delhi", type: "Government", beds: 2478, rating: 4.8, dist: 2.1, lat: 28.5659, lng: 77.2089, avail: true, spec: ["Cardiology", "Neurology", "Oncology"] },
  { name: "Apollo Hospital", type: "Private", beds: 710, rating: 4.6, dist: 4.3, lat: 28.5361, lng: 77.2849, avail: true, spec: ["Multi-Specialty", "ICU", "Transplant"] },
  { name: "Safdarjung Hospital", type: "Government", beds: 1531, rating: 4.4, dist: 3.7, lat: 28.5684, lng: 77.2040, avail: true, spec: ["Trauma", "Burns", "Gynecology"] },
  { name: "Fortis Escorts", type: "Private", beds: 310, rating: 4.5, dist: 6.2, lat: 28.5607, lng: 77.2796, avail: false, spec: ["Cardiac", "Orthopedics"] },
];

const Hospitals = () => {
  const [hospitals, setHospitals] = useState(INITIAL_HOSPS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHosp, setSelectedHosp] = useState(null);
  const [bookStep, setBookStep] = useState(1);
  const [bookData, setBookData] = useState({ spec: "", date: "", time: "" });
  const [locating, setLocating] = useState(false);

  const handleSearch = () => {
    if (!search) {
      setHospitals(INITIAL_HOSPS);
      return;
    }
    const lower = search.toLowerCase();
    setHospitals(INITIAL_HOSPS.filter(h => h.name.toLowerCase().includes(lower) || h.spec.some(s => s.toLowerCase().includes(lower))));
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a));
  };

  const handleNearMe = () => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const updated = [...INITIAL_HOSPS].map(h => ({
            ...h,
            dist: getDistance(latitude, longitude, h.lat, h.lng)
          })).sort((a, b) => a.dist - b.dist);
          setHospitals(updated);
          setLocating(false);
        },
        (err) => {
          console.error(err);
          // Fallback mockup sort if permission denied
          const updated = [...INITIAL_HOSPS].map(h => ({ ...h, dist: Math.random() * 5 + 0.5 })).sort((a, b) => a.dist - b.dist);
          setHospitals(updated);
          setLocating(false);
        }
      );
    } else {
      setLocating(false);
    }
  };

  const openBook = (h) => {
    setSelectedHosp(h);
    setBookStep(1);
    setBookData({ spec: h.spec[0], date: "", time: "09:00 AM" });
    setModalOpen(true);
  };

  const confirmBooking = () => {
    setBookStep(3);
    setTimeout(() => {
      setModalOpen(false);
      setHospitals(prev => prev.map(h => h.name === selectedHosp.name ? { ...h, avail: false } : h));
    }, 3000);
  };

  return (
    <PageWrap>
      <SecHead label="Hospital Network" title="Empanelled Hospitals"
        sub="2,30,000+ hospitals registered under Ayushman Bharat PM-JAY network." />
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: 16, marginBottom: 28
      }} className="page-enter">
        <StatCard icon="🏥" label="Total Hospitals" value="2.3L" color={C.primary} />
        <StatCard icon="🛏️" label="Total Beds" value="18.4L" color={C.green} />
        <StatCard icon="👨⚕️" label="Doctors Online" value="84,200" color="#0284C7" />
        <StatCard icon="🚑" label="Emergency Units" value="12,400" color={C.red} />
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input placeholder="Search hospital, city or specialty…" value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()}
          style={{
            flex: 1, padding: "10px 14px", border: `1.5px solid ${C.border}`,
            borderRadius: 8, fontSize: 13, background: C.surface, color: C.text
          }} />
        <Btn label="Search" icon="🔍" onClick={handleSearch} />
        <Btn label={locating ? "Locating..." : "Near Me"} icon="📍" variant="outline" onClick={handleNearMe} disabled={locating} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {hospitals.map(h => (
          <Card key={h.name} style={{ padding: "18px 22px" }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", flexWrap: "wrap", gap: 14
            }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ fontSize: 34 }}>🏥</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                    <span style={{ fontWeight: 800, color: C.text, fontSize: 15 }}>{h.name}</span>
                    <Chip label={h.type} color={h.type === "Government" ? C.green : C.primary} sm />
                  </div>
                  <div style={{ fontSize: 12, color: C.textSub, marginBottom: 4 }}>
                    📍 {h.dist.toFixed(1)} km · 🛏️ {h.beds} beds · ⭐ {h.rating}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {h.spec.map(s => <Chip key={s} label={s} color={C.textMuted} sm />)}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Chip label={h.avail ? "Available" : "Full"} color={h.avail ? C.green : C.red} />
                <Btn label={h.avail ? "Book" : "Waitlist"} sm disabled={!h.avail} onClick={() => openBook(h)} />
                <Btn label="Directions" sm variant="outline" onClick={() => window.open(`https://maps.google.com/?q=${h.lat},${h.lng}`, "_blank")} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {modalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)",
          zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Card className="page-enter" style={{ width: 400, maxWidth: "90%", padding: 24 }}>
            {bookStep === 1 && (
              <>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: C.primary }}>Book at {selectedHosp?.name}</div>
                <FormField label="Department / Specialty" type="select" options={selectedHosp?.spec} value={bookData.spec} onChange={v => setBookData({ ...bookData, spec: v })} />
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
                  <Btn label="Cancel" variant="ghost" onClick={() => setModalOpen(false)} />
                  <Btn label="Next →" onClick={() => setBookStep(2)} />
                </div>
              </>
            )}
            {bookStep === 2 && (
              <>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: C.primary }}>Select Date & Time</div>
                <FormField label="Preferred Date" type="date" value={bookData.date} onChange={v => setBookData({ ...bookData, date: v })} />
                <FormField label="Preferred Time" type="select" options={["09:00 AM", "11:30 AM", "02:00 PM", "04:45 PM"]} value={bookData.time} onChange={v => setBookData({ ...bookData, time: v })} />
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
                  <Btn label="← Back" variant="ghost" onClick={() => setBookStep(1)} />
                  <Btn label="Confirm Booking" variant="green" onClick={confirmBooking} disabled={!bookData.date || !bookData.time} />
                </div>
              </>
            )}
            {bookStep === 3 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 10 }}>✅</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.green, marginBottom: 6 }}>Appointment Confirmed!</div>
                <div style={{ fontSize: 13, color: C.textSub }}>Your slot for {bookData.spec} on {bookData.date} at {bookData.time} is reserved.</div>
              </div>
            )}
          </Card>
        </div>
      )}

    </PageWrap>
  );
};
export default Hospitals;
