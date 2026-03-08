// @ts-nocheck
import React, { useState } from 'react';
import { C, AshokaChakra, Btn } from '../lib/design';

export const Navbar = ({ page, setPage, user, onLogout }) => {
  const [langIdx, setLangIdx] = useState(0);
  const LANGS = ["English", "हिन्दी", "தமிழ்", "తెలుగు"];

  React.useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const addScript = document.createElement("script");
      addScript.id = "google-translate-script";
      addScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,ta,te',
          autoDisplay: false
        }, 'google_translate_element');
      };

      const style = document.createElement('style');
      style.innerHTML = `
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleLang = () => {
    const nextIdx = (langIdx + 1) % LANGS.length;
    setLangIdx(nextIdx);
    const codes = ['en', 'hi', 'ta', 'te'];
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = codes[nextIdx];
      select.dispatchEvent(new Event('change'));
    }
  };

  const handleFontSize = (scale) => {
    document.body.style.zoom = scale === 0 ? "100%" : (scale > 0 ? "110%" : "90%");
  };
  const NAV = [
    { id: "home", label: "Home" },
    { id: "vault", label: "Health Vault" },
    { id: "health-twin", label: "Health Twin" },
    { id: "score", label: "Health Score" },
    { id: "hospitals", label: "Hospitals" },
    { id: "tele", label: "Telemedicine" },
    { id: "emergency", label: "Emergency" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 99 }}>
      {/* ── GOV TOP BAR (dark navy) ── */}
      <div style={{
        background: C.navy, color: "rgba(255,255,255,.88)",
        padding: "6px 0", borderBottom: "none"
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>
            GOVERNMENT OF INDIA &nbsp;|&nbsp; MINISTRY OF HEALTH AND FAMILY WELFARE
          </span>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: "rgba(255,255,255,.7)", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <span style={{ cursor: "pointer", fontWeight: 600 }} onClick={() => handleFontSize(-1)}>A-</span>
              <span style={{ cursor: "pointer", fontWeight: 600 }} onClick={() => handleFontSize(0)}>A</span>
              <span style={{ cursor: "pointer", fontWeight: 600 }} onClick={() => handleFontSize(1)}>A+</span>
            </div>
            <span>|</span>
            <span style={{ cursor: "pointer", fontWeight: 700, minWidth: 54, textAlign: "center" }}
              onClick={handleLang}>
              {LANGS[langIdx]}
            </span>
          </div>
          <div id="google_translate_element" style={{ display: "none" }}></div>
        </div>
      </div>

      {/* ── BRAND BAR (glassmorphic) ── */}
      <div style={{
        background: "rgba(255, 255, 255, 0.82)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid rgba(255,255,255,0.4)`,
        boxShadow: "0 4px 20px rgba(13, 31, 60, 0.08)"
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "10px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16
        }}>

          {/* Left: Logo + name */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <div onClick={() => setPage("home")} style={{
              display: "flex", alignItems: "center", gap: 14, cursor: "pointer"
            }}>
              <AshokaChakra size={46} />
              <div>
                <div style={{
                  fontSize: 24, fontWeight: 800, color: C.primary,
                  fontFamily: "'Noto Serif Display',serif", letterSpacing: "-0.01em", lineHeight: 1
                }}>
                  SehatSetu
                </div>
                <div style={{
                  fontSize: 9.5, fontWeight: 600, color: C.textMuted,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2
                }}>
                  National Digital Health Mission Integrated Platform
                </div>
              </div>
            </div>
          </div>

          {/* Center: Nav links */}
          <nav style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            {NAV.map(l => (
              <button key={l.id} onClick={() => setPage(l.id)}
                className={`nav-item${page === l.id ? " active" : ""}`}
                style={{
                  padding: "10px 14px",
                  color: page === l.id ? C.primary : C.textSub,
                  fontSize: 13, fontWeight: page === l.id ? 700 : 500,
                  background: "transparent", whiteSpace: "nowrap",
                  transition: "color .18s", borderRadius: 6
                }}>{l.label}</button>
            ))}
          </nav>

          {/* Right: Auth Profile */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12 }}>
            {user ? (
              <>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>
                  Hi, {user.name?.split(' ')[0] || "User"}
                </span>
                <Btn label="Logout" onClick={onLogout}
                  variant="danger" sm style={{
                    padding: "6px 14px", fontSize: 12,
                  }} />
              </>
            ) : (
              <Btn label="Login / Register" onClick={() => setPage("vault")}
                variant="navyOut" style={{
                  borderColor: C.primary, color: C.primary,
                  padding: "8px 18px", fontSize: 13, borderWidth: 2,
                }} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
