// @ts-nocheck
import React, { useState } from 'react';
import { C, Card, FormField, Btn, AshokaChakra, USERS } from '../lib/design';

const GlobalLogin = ({ onLogin }) => {
  const [uname, setUname] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const login = () => {
    const u = USERS[uname.toLowerCase().trim()];
    if (u && u.pw === pw) {
      onLogin({ ...u, _u: uname.toLowerCase().trim() });
      setErr("");
    } else {
      setErr("Invalid credentials. Please try: jetavya.singh / Singh@2004");
    }
  };

  return (
    <div style={{minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:20}}>
      <div className="page-enter" style={{maxWidth:440, width:"100%"}}>
        <div style={{textAlign:"center", marginBottom:32}}>
          <div style={{display:"flex", justifyContent:"center", marginBottom:16}}>
            <AshokaChakra size={64}/>
          </div>
          <div style={{fontSize:28, fontWeight:800, color:C.primary, fontFamily:"'Noto Serif Display',serif", lineHeight:1.2}}>
            SehatSetu Platform
          </div>
          <div style={{fontSize:12, color:C.textSub, marginTop:8, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700}}>
            National Digital Health Mission
          </div>
        </div>

        <Card style={{padding:32}}>
          <div style={{fontSize:18, fontWeight:800, color:C.text, marginBottom:24, textAlign:"center"}}>
            Secure Citizen Login
          </div>

          <FormField 
            label="ABHA ID / Username" 
            value={uname} 
            onChange={setUname} 
            placeholder="e.g. jetavya.singh" 
          />
          <FormField 
            label="Password" 
            type="password" 
            value={pw} 
            onChange={setPw} 
            placeholder="Your password" 
          />
          
          {err && (
            <div className="page-enter" style={{padding:"10px 14px", background:C.redLt, border:`1px solid ${C.red}30`, borderRadius:7, fontSize:12, color:C.red, marginBottom:16, fontWeight:600}}>
              {err}
            </div>
          )}
          
          <Btn 
            label="Sign In to SehatSetu →" 
            onClick={login} 
            full 
            style={{justifyContent:"center", padding:"12px 16px", marginTop:8}} 
          />
          
          <div style={{marginTop:24, padding:"12px 14px", background:C.borderLt, borderRadius:8, fontSize:11, color:C.textSub, lineHeight:1.9}}>
            <div style={{fontWeight:800, color:C.text, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em", fontSize:10}}>
              Demo Accounts (Username / Password)
            </div>
            jetavya.singh / Singh@2004<br/>
            nidhi.kumari / Kumari@001<br/>
            ananya.sharma / Sharma@30
          </div>
        </Card>

        <div style={{textAlign:"center", marginTop:24, fontSize:11, color:C.textMuted}}>
          Protected by Government of India ISO 27001 Security Standard
        </div>
      </div>
    </div>
  );
};

export default GlobalLogin;
