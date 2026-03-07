// @ts-nocheck
import React, { useState } from 'react';
import { C, PageWrap, SecHead, Btn, StatCard, Card, DonutChart, ProgBar, BarChart, Chip, VILLAGE_DATA, OPD_MONTHLY, VACC_VG } from '../lib/design';

const Admin = () => {
  const [region,setRegion] = useState("Lucknow Division");
  return (
    <PageWrap>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
        flexWrap:"wrap",gap:14,marginBottom:28}}>
        <SecHead label="Admin · Analytics Dashboard"
          title="Village Health Intelligence"
          sub="District-level surveillance, vaccination tracking and rural health worker data."/>
        <div style={{display:"flex",gap:10,marginTop:8}}>
          <select value={region} onChange={e=>setRegion(e.target.value)}
            style={{padding:"8px 12px",border:`1.5px solid ${C.border}`,borderRadius:7,
              fontSize:13,background:C.surface,color:C.text,cursor:"pointer",outline:"none"}}>
            {["Lucknow Division","Varanasi Division","Gorakhpur Division",
              "Patna District","Ranchi District"].map(r=><option key={r}>{r}</option>)}
          </select>
          <Btn label="Export" icon="📥" variant="outline" sm/>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
        gap:16,marginBottom:22}} className="page-enter">
        <StatCard icon="🏘️" label="Villages"      value="284"   color={C.primary} delay={0}/>
        <StatCard icon="👥" label="Population"    value="1.2 L" color={C.green}   delay={0.06}/>
        <StatCard icon="🏥" label="PHCs Active"   value="38"    color="#0284C7"   delay={0.12}/>
        <StatCard icon="💉" label="Vacc Coverage" value="79%"   color={C.accent}  delay={0.18}/>
        <StatCard icon="🚑" label="ASHA Workers"  value="621"   color="#7C3AED"   delay={0.24}/>
        <StatCard icon="⚠️" label="Outbreaks"     value="2"     color={C.red}     delay={0.30}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
        <Card style={{padding:24}}>
          <div style={{fontSize:14,fontWeight:700,color:C.primary,marginBottom:4}}>Disease Distribution</div>
          <div style={{fontSize:12,color:C.textSub,marginBottom:16}}>{region} · Last 30 days</div>
          <div style={{display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
            <DonutChart data={VILLAGE_DATA} size={160}/>
            <div style={{flex:1,minWidth:130}}>
              {VILLAGE_DATA.map(d=>(
                <div key={d.label} style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",marginBottom:9}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <div style={{width:10,height:10,borderRadius:2,background:d.color,flexShrink:0}}/>
                    <span style={{fontSize:12,color:C.text}}>{d.label}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <ProgBar value={d.value} max={50} color={d.color} h={4}/>
                    <span style={{fontSize:12,fontWeight:700,color:d.color,
                      minWidth:28,textAlign:"right"}}>{d.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card style={{padding:24}}>
          <div style={{fontSize:14,fontWeight:700,color:C.primary,marginBottom:4}}>Monthly OPD Patients</div>
          <div style={{fontSize:12,color:C.textSub,marginBottom:14}}>Oct 2024 – Mar 2025</div>
          <BarChart data={OPD_MONTHLY} color={C.primary}/>
        </Card>
      </div>

      {/* Vaccination villages */}
      <Card style={{padding:24,marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:700,color:C.primary,marginBottom:4}}>
          Village-wise Vaccination Coverage
        </div>
        <div style={{fontSize:12,color:C.textSub,marginBottom:18}}>Routine immunization per village</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
          {VACC_VG.map(v=>{
            const col=v.pct>=85?C.green:v.pct>=70?C.amber:C.red;
            return (
              <div key={v.name} style={{padding:"14px 16px",background:C.bg,
                borderRadius:8,border:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
                  <span style={{fontSize:13,fontWeight:600,color:C.text}}>{v.name}</span>
                  <span style={{fontSize:14,fontWeight:800,color:col}}>{v.pct}%</span>
                </div>
                <ProgBar value={v.pct} max={100} color={col} h={6}/>
                <div style={{fontSize:10,color:C.textMuted,marginTop:5}}>
                  {v.pct>=85?"✅ Target met":v.pct>=70?"⚠️ Below target":"🚨 Critical gap"}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card style={{padding:22,borderLeft:`5px solid ${C.red}`}}>
        <div style={{fontSize:13,fontWeight:700,color:C.red,marginBottom:14}}>
          🚨 Active Health Alerts — {region}
        </div>
        {[
          {sev:"HIGH",msg:"Dengue cluster in Rampur Block — 14 cases in 7 days",date:"Today"},
          {sev:"MED", msg:"Malaria uptick in Nagwa village — vector control needed",date:"2 days ago"},
          {sev:"LOW", msg:"Low BCG coverage (<60%) in Kotwa PHC catchment",date:"4 days ago"},
        ].map(a=>(
          <div key={a.msg} style={{display:"flex",gap:14,alignItems:"flex-start",
            padding:"12px 0",borderBottom:`1px solid ${C.borderLt}`}}>
            <Chip label={a.sev} color={a.sev==="HIGH"?C.red:a.sev==="MED"?C.amber:C.green}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:C.text,lineHeight:1.5,marginBottom:3}}>{a.msg}</div>
              <div style={{fontSize:11,color:C.textMuted}}>{a.date}</div>
            </div>
            <Btn label="Action" sm variant="outline"/>
          </div>
        ))}
      </Card>
    </PageWrap>
  );
};
export default Admin;
