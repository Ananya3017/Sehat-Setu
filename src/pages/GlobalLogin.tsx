// @ts-nocheck
import React, { useState } from 'react';

const GlobalLogin = ({ onLogin }) => {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState(""); 
  const [pass, setPass] = useState("");
  const [name, setName] = useState(""); 
  const [rEmail, setREmail] = useState(""); 
  const [rPass, setRPass] = useState("");
  const [err, setErr] = useState(""); 
  const [msg, setMsg] = useState(""); 
  const [loading, setLoading] = useState(false);

  const doLogin = () => {
    setErr("");
    if (!email||!pass) { setErr("Please enter email and password."); return; }
    setLoading(true);
    setTimeout(() => {
      if ((email==="citizen@gov.in" && pass==="Sehat@123") || 
          (email==="jetavya.singh" && pass==="Singh@2004")) {
        onLogin({
          _u: email,
          name: email==="citizen@gov.in" ? "Rajesh Kumar" : "Jetavya Singh",
          abha: "91-1234-5678-9012",
          pid: "P-33017",
          blood: "O+", dob: "14 May 1988", city: "New Delhi", gender: "Male",
          records: [
            { id: 1, name: "Complete Blood Count", date: "2025-12-10", type: "Lab Report", size: "1.2 MB", doc: "Dr. Sharma" }
          ],
          healthScore: 712,
          allergies: ["Penicillin", "Peanuts"],
          conditions: ["Hypertension"],
          emergency: { name: "Sunita Kumar", relation: "Spouse", phone: "+91-9876543210" }
        });
      } else { 
        setErr("Invalid credentials."); setLoading(false); 
      }
    }, 900);
  };

  const doRegister = () => {
    setErr("");
    if (!name||!rEmail||!rPass) { setErr("Please fill all fields."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setMsg("Registered. Please login."); setTab("login"); }, 900);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Noto Sans', sans-serif",
      background: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" preserveAspectRatio=\"none\"><defs><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><linearGradient id=\"grad1\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"%23ffb366\" stop-opacity=\"0.7\" /><stop offset=\"35%\" stop-color=\"%23ffede0\" stop-opacity=\"0.9\" /><stop offset=\"50%\" stop-color=\"%23ffffff\" stop-opacity=\"1\" /><stop offset=\"65%\" stop-color=\"%23e6f5ea\" stop-opacity=\"0.9\" /><stop offset=\"100%\" stop-color=\"%234db86e\" stop-opacity=\"0.8\" /></linearGradient></defs><rect width=\"100%\" height=\"100%\" fill=\"url(%23grad1)\"/><rect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\" opacity=\"0.05\"/></svg>')",
      backgroundSize: "cover",
      padding: "20px"
    }}>

      {/* Header Text */}
      <div style={{ textAlign: "center", marginBottom: "30px", zIndex: 2 }}>
        <h1 style={{ 
          color: "#275eaa", 
          fontSize: "36px", 
          fontWeight: "800", 
          margin: "0 0 5px 0" 
        }}>
          Sehat Setu
        </h1>
        <div style={{ color: "#666", fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>
          Ministry of Health & Family Welfare
        </div>
        <div style={{ height: "1px", width: "100%", background: "#ccc", margin: "0 auto", maxWidth: "250px", marginBottom: "8px" }} />
        <div style={{ color: "#777", fontSize: "12px", fontWeight: "500" }}>
          Government of India
        </div>
      </div>

      {/* Login Card */}
      <div style={{
        background: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        width: "100%",
        maxWidth: "380px",
        overflow: "hidden",
        zIndex: 2,
        padding: "25px 35px 35px 35px"
      }}>
        {tab === "login" ? (
          <>
            <h2 style={{
              color: "#184b9e",
              fontSize: "18px",
              fontWeight: "700",
              textAlign: "center",
              margin: "0 0 15px 0"
            }}>
              Citizen Login
            </h2>
            <div style={{ height: "1px", width: "100%", background: "#f0f0f0", marginBottom: "25px" }} />

            {err && <div style={{ color: "#d32f2f", fontSize: "13px", marginBottom: "15px", textAlign: "center" }}>{err}</div>}
            {msg && <div style={{ color: "#388e3c", fontSize: "13px", marginBottom: "15px", textAlign: "center" }}>{msg}</div>}

            <input 
              type="text" 
              placeholder="Enter Email" 
              value={email} onChange={e=>setEmail(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px", borderRadius: "4px", border: "1px solid #e0e0e0",
                fontSize: "14px", marginBottom: "16px", outline: "none", color: "#333"
              }}
            />
            <input 
              type="password" 
              placeholder="Enter Password" 
              value={pass} onChange={e=>setPass(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&doLogin()}
              style={{
                width: "100%", padding: "12px 14px", borderRadius: "4px", border: "1px solid #e0e0e0",
                fontSize: "14px", marginBottom: "25px", outline: "none", color: "#333"
              }}
            />

            <button 
              onClick={doLogin}
              disabled={loading}
              style={{
                width: "100%", padding: "12px", background: "#1b5bad", color: "#fff",
                border: "none", borderRadius: "4px", fontSize: "15px", fontWeight: "600",
                cursor: loading ? "default" : "pointer", marginBottom: "20px",
                transition: "background 0.2s"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div style={{ textAlign: "center", fontSize: "13px", color: "#666" }}>
              Don't have an account? <span onClick={() => {setTab("register"); setErr("");}} style={{ color: "#1b5bad", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}>Register</span>
            </div>
          </>
        ) : (
          <>
            <h2 style={{
              color: "#184b9e",
              fontSize: "18px",
              fontWeight: "700",
              textAlign: "center",
              margin: "0 0 15px 0"
            }}>
              Citizen Registration
            </h2>
            <div style={{ height: "1px", width: "100%", background: "#f0f0f0", marginBottom: "25px" }} />

            {err && <div style={{ color: "#d32f2f", fontSize: "13px", marginBottom: "15px", textAlign: "center" }}>{err}</div>}

            <input 
              type="text" placeholder="Full Name" 
              value={name} onChange={e=>setName(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", borderRadius: "4px", border: "1px solid #e0e0e0", fontSize: "14px", marginBottom: "16px", outline: "none" }}
            />
            <input 
              type="email" placeholder="Enter Email" 
              value={rEmail} onChange={e=>setREmail(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", borderRadius: "4px", border: "1px solid #e0e0e0", fontSize: "14px", marginBottom: "16px", outline: "none" }}
            />
            <input 
              type="password" placeholder="Create Password" 
              value={rPass} onChange={e=>setRPass(e.target.value)}
              style={{ width: "100%", padding: "12px 14px", borderRadius: "4px", border: "1px solid #e0e0e0", fontSize: "14px", marginBottom: "25px", outline: "none" }}
            />

            <button 
              onClick={doRegister} disabled={loading}
              style={{ width: "100%", padding: "12px", background: "#1b5bad", color: "#fff", border: "none", borderRadius: "4px", fontSize: "15px", fontWeight: "600", cursor: loading ? "default" : "pointer", marginBottom: "20px" }}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <div style={{ textAlign: "center", fontSize: "13px", color: "#666" }}>
              Already registered? <span onClick={() => {setTab("login"); setErr("");}} style={{ color: "#1b5bad", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}>Login</span>
            </div>
          </>
        )}
      </div>
      
      {/* Demo Credentials Helper */}
      <div style={{ marginTop:"40px", fontSize:"12px", color:"#555", background:"rgba(255,255,255,0.6)", padding:"8px 16px", borderRadius:"20px", zIndex: 2 }}>
        Demo: jetavya.singh / Singh@2004
      </div>

    </div>
  );
};

export default GlobalLogin;
