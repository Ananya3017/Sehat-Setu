// @ts-nocheck
import React from 'react';
import { C, AshokaChakra, Btn } from '../lib/design';

export const Navbar = ({page,setPage}) => {
  const NAV = [
    {id:"home",        label:"Home"},
    {id:"vault",       label:"Health Vault"},
    {id:"health-twin", label:"Health Twin"},
    {id:"score",       label:"Health Score"},
    {id:"hospitals",   label:"Hospitals"},
    {id:"tele",        label:"Telemedicine"},
    {id:"emergency",   label:"Emergency"},
    {id:"admin",       label:"Admin"},
  ];
  return (
    <header style={{position:"sticky",top:0,zIndex:99}}>
      {/* ── GOV TOP BAR (dark navy) ── */}
      <div style={{background:C.navy,color:"rgba(255,255,255,.88)",
        padding:"6px 0",borderBottom:"none"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",
          display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
          <span style={{fontSize:12,fontWeight:600,letterSpacing:"0.04em"}}>
            GOVERNMENT OF INDIA &nbsp;|&nbsp; MINISTRY OF HEALTH AND FAMILY WELFARE
          </span>
          <div style={{display:"flex",gap:20,fontSize:12,color:"rgba(255,255,255,.7)"}}>
            <span style={{cursor:"pointer"}}>Skip to main content</span>
            <span>|</span>
            <span style={{cursor:"pointer"}}>A-&nbsp; A &nbsp;A+</span>
            <span>|</span>
            <span style={{cursor:"pointer"}}>English</span>
          </div>
        </div>
      </div>

      {/* ── BRAND BAR (white with bottom border) ── */}
      <div style={{background:C.surface,borderBottom:`3px solid ${C.primary}`,
        boxShadow:"0 2px 12px rgba(26,61,124,.1)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"10px 20px",
          display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>

          {/* Logo + name */}
          <div onClick={()=>setPage("home")} style={{
            display:"flex",alignItems:"center",gap:14,cursor:"pointer",flexShrink:0}}>
            <AshokaChakra size={46}/>
            <div>
              <div style={{fontSize:24,fontWeight:800,color:C.primary,
                fontFamily:"'Noto Serif Display',serif",letterSpacing:"-0.01em",lineHeight:1}}>
                SehatSetu
              </div>
              <div style={{fontSize:9.5,fontWeight:600,color:C.textMuted,
                letterSpacing:"0.1em",textTransform:"uppercase",marginTop:2}}>
                National Digital Health Mission Integrated Platform
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav style={{display:"flex",alignItems:"center",gap:0}}>
            {NAV.map(l=>(
              <button key={l.id} onClick={()=>setPage(l.id)}
                className={`nav-item${page===l.id?" active":""}`}
                style={{
                  padding:"10px 13px",
                  color:page===l.id?C.primary:C.textSub,
                  fontSize:13,fontWeight:page===l.id?700:500,
                  background:"transparent",whiteSpace:"nowrap",
                  transition:"color .18s",
                }}>{l.label}</button>
            ))}
            <div style={{marginLeft:16}}>
              <Btn label="Login / Register" onClick={()=>setPage("vault")}
                variant="navyOut" style={{
                  borderColor:C.primary,color:C.primary,
                  padding:"8px 18px",fontSize:13,borderWidth:2,
                }}/>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
