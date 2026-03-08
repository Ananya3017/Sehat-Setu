// @ts-nocheck
import React from 'react';
import { C } from '../lib/design';

export const Footer = ({ setPage }) => (
  <footer style={{
    background: `linear-gradient(135deg,${C.navy},#0B3A60)`,
    color: "rgba(255,255,255,.7)", padding: "40px 20px", marginTop: 30,
    borderTop: `4px solid ${C.primary}`,
  }}>
    <div style={{
      maxWidth: 1200, margin: "0 auto", display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 40
    }}>

      {/* Brand & Address */}
      <div>
        <div style={{
          fontSize: 20, fontWeight: 800, color: "#fff",
          fontFamily: "'Noto Serif Display',serif", letterSpacing: "-0.01em", marginBottom: 4
        }}>
          SehatSetu Platform
        </div>
        <div style={{
          fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
          color: C.primaryLt, fontWeight: 700, marginBottom: 16
        }}>
          Ministry of Health & Family Welfare
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.7 }}>
          Nirman Bhawan, Maulana Azad Road<br />
          New Delhi - 110011, India
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          {["T", "f", "in", "IG"].map(soc => (
            <span key={soc} style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 12, fontWeight: 600
            }}>{soc}</span>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
          Quick Links
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
          {[
            { label: "Create ABHA Account", page: "vault" },
            { label: "Hospitals & Clinics", page: "hospitals" },
            { label: "Emergency Services", page: "emergency" },
            { label: "Latest Health Schemes", page: "home" },
            { label: "PM-JAY Registration", page: "home" }
          ].map(l => (
            <span key={l.label} className="foot-link" style={{
              cursor: "pointer",
              transition: "color .2s"
            }} onClick={() => setPage(l.page)}>{l.label}</span>
          ))}
        </div>
      </div>

      {/* Helpline */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
          National Helplines
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Ambulance", num: "108", c: C.redLt },
            { label: "Health Helpline", num: "104", c: C.primaryLt },
            { label: "Women Helpline", num: "1091", c: "#EC4899" },
          ].map(h => (
            <a key={h.label} href={`tel:${h.num}`} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: h.c }}>{h.num}</span>
              <span style={{ fontSize: 13, transition: "color .2s" }} className="foot-link">{h.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
          Compliance & Policies
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
          {["Privacy Policy", "Terms of Service", "HIPAA & DPDP Compliance",
            "Accessibility Statement", "Feedback & Grievances"].map(l => (
              <span key={l} className="foot-link" style={{
                cursor: "pointer",
                transition: "color .2s"
              }} onClick={() => alert(`Opening document: ${l}`)}>{l}</span>
            ))}
        </div>
        <div style={{
          marginTop: 18, padding: "8px 12px", background: "rgba(255,255,255,.05)",
          border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, fontSize: 11,
          display: "inline-block"
        }}>
          ✅ ISO 27001 Certified Secure System
        </div>
      </div>
    </div>

    {/* Bottom Copyright */}
    <div style={{
      maxWidth: 1200, margin: "40px auto 0", paddingTop: 20,
      borderTop: "1px solid rgba(255,255,255,.1)", display: "flex",
      justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16
    }}>
      <div style={{ fontSize: 12 }}>
        © {new Date().getFullYear()} SehatSetu Platform. All rights reserved.
      </div>
      <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", opacity: .6 }}>
        Sys_Version: 2.1.0-build.84 | Server: Delhi-04
      </div>
    </div>
  </footer>
);
