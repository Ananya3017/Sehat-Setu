// @ts-nocheck
import React, { useState } from 'react';
import { C, PageWrap, SecHead, Card, FormField, Btn, ProgBar, Chip, USERS } from '../lib/design';

const HealthScore = ({ user }) => {

  const score = user.healthScore;
  const scoreColor = score>=750?C.green:score>=600?C.amber:C.red;
  const scoreLabel = score>=750?"Excellent":score>=600?"Good":"Needs Improvement";

  const factors = [
    {l:"Medical History",  w:30, s:Math.round(score*0.32/3), d:"Lab reports, diagnoses, conditions"},
    {l:"Lifestyle",        w:25, s:Math.round(score*0.27/3), d:"Activity, sleep, BMI, diet"},
    {l:"Preventive Care",  w:20, s:Math.round(score*0.22/3), d:"Vaccinations, checkups, screenings"},
    {l:"Risk Factors",     w:15, s:Math.round(score*0.16/3), d:"Chronic conditions, allergies"},
    {l:"Health Trend",     w:10, s:Math.round(score*0.11/3), d:"Score direction over 6 months"},
  ];

  const r=80, circ=2*Math.PI*r, pct=(score-300)/600;
  const dash=circ*Math.min(pct,1);

  return (
    <PageWrap>
      <SecHead label="Health CIBIL Score" title="Your Health Intelligence Score"
        sub="India's first numerical health reliability index — used for insurance, PM-JAY and risk assessment."/>

      <div style={{display:"grid",gridTemplateColumns:"340px 1fr",gap:22,marginBottom:22}}>

        {/* Score dial */}
        <Card style={{padding:28,textAlign:"center"}}>
          <div style={{fontSize:11,fontWeight:700,color:C.textMuted,
            textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:16}}>
            Health CIBIL Score · {new Date().toLocaleDateString("en-IN")}
          </div>

          <svg viewBox="0 0 200 200" width={200} height={200} style={{overflow:"visible"}}>
            {/* Track */}
            <circle cx="100" cy="100" r={r} fill="none"
              stroke={C.borderLt} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${circ*.75} ${circ*.25}`}
              style={{transform:"rotate(135deg)",transformOrigin:"100px 100px"}}/>
            {/* Fill */}
            <circle cx="100" cy="100" r={r} fill="none"
              stroke={scoreColor} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${dash*.75} ${circ-dash*.75}`}
              style={{transform:"rotate(135deg)",transformOrigin:"100px 100px",
                transition:"stroke-dasharray 1.4s ease, stroke .5s ease"}}/>
            {/* Labels */}
            <text x="100" y="82" textAnchor="middle" fontSize="10" fill={C.textMuted}>Score</text>
            <text x="100" y="106" textAnchor="middle" fontSize="36" fontWeight="800" fill={C.text}>{score}</text>
            <text x="100" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill={scoreColor}>{scoreLabel}</text>
            <text x="30" y="165" textAnchor="middle" fontSize="9" fill={C.textMuted}>300</text>
            <text x="170" y="165" textAnchor="middle" fontSize="9" fill={C.textMuted}>900</text>
          </svg>

          <div style={{display:"flex",justifyContent:"space-around",
            marginTop:16,paddingTop:16,borderTop:`1px solid ${C.borderLt}`}}>
            {[["300–549","Poor","#D63B3B"],["550–699","Good",C.amber],["700–900","Excel.",C.green]].map(([r,l,c])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontSize:10,color:c,fontWeight:800}}>{r}</div>
                <div style={{fontSize:9,color:C.textMuted}}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop:16,padding:"10px 14px",
            background:`${scoreColor}12`,border:`1px solid ${scoreColor}30`,
            borderRadius:8,fontSize:12,fontWeight:700,color:scoreColor,
          }}>
            Risk Level: {score>=750?"Low 🟢":score>=600?"Moderate 🟡":"High 🔴"}
          </div>
        </Card>

        {/* Score formula & breakdown */}
        <div>
          <Card style={{padding:22,marginBottom:16}}>
            <div style={{fontSize:13,fontWeight:700,color:C.primary,marginBottom:14}}>
              Score Algorithm (Weighted Formula)
            </div>
            <div style={{
              background:C.navy,borderRadius:8,padding:"14px 16px",
              fontFamily:"'JetBrains Mono',monospace",fontSize:11,lineHeight:2,
              color:"rgba(255,255,255,.8)",marginBottom:14,
            }}>
              <div style={{color:"rgba(255,255,255,.35)"}}>{/* Health CIBIL Engine v2 */}</div>
              <div style={{color:"#60A5FA"}}>score = (</div>
              {factors.map(f=>(
                <div key={f.l} style={{paddingLeft:14}}>
                  <span style={{color:"#F59E0B"}}>{f.w}%</span>
                  {" × "}<span style={{color:"#4ADE80"}}>{f.l.toLowerCase()}</span>
                  <span style={{color:"rgba(255,255,255,.3)"}}>{" // "+f.d}</span>
                </div>
              ))}
              <div style={{color:"#60A5FA"}}>{")"}</div>
              <div style={{color:"#4ADE80"}}>→ {score}</div>
            </div>
          </Card>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12}}>
            {factors.map(f=>(
              <Card key={f.l} style={{padding:14}}>
                <div style={{fontSize:20,fontWeight:800,color:scoreColor,marginBottom:3}}>{f.s}</div>
                <div style={{fontSize:11,fontWeight:700,color:C.text,marginBottom:2}}>{f.l}</div>
                <div style={{fontSize:9,color:C.textMuted,marginBottom:7}}>Weight {f.w}%</div>
                <ProgBar value={f.s} max={Math.round(900*f.w/100)} color={scoreColor} h={4}/>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* History + Recommendations */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <Card style={{padding:22}}>
          <div style={{fontWeight:700,color:C.primary,marginBottom:16}}>Score History</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:6,height:90}}>
            {[["Sep",680],["Oct",695],["Nov",710],["Dec",700],["Jan",718],["Feb",724],["Mar",score]].map(([m,s],i,arr)=>{
              const last=i===arr.length-1;
              return (
                <div key={m} style={{flex:1,display:"flex",flexDirection:"column",
                  alignItems:"center",gap:4}}>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,
                    color:last?C.primary:C.textMuted}}>{s}</div>
                  <div style={{width:"100%",background:last?C.primary:C.borderLt,
                    borderRadius:"3px 3px 0 0",height:`${((s-620)/300)*80}px`,
                    transition:"height 1s ease"}}/>
                  <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:8,
                    color:C.textMuted}}>{m}</div>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:12,padding:"8px 12px",background:C.greenLt,
            border:`1px solid ${C.green}30`,borderRadius:6,fontSize:12,color:C.green,fontWeight:600}}>
            +{score-680} points over 6 months 📈
          </div>
        </Card>

        <Card style={{padding:22,borderLeft:`5px solid ${C.accent}`}}>
          <div style={{fontWeight:700,color:C.primary,marginBottom:14}}>
            📋 Recommendations
          </div>
          {[
            {icon:"🏃",text:"Increase daily exercise to 30 minutes — target 10,000 steps.",priority:"High"},
            {icon:"🥗",text:"Reduce sodium intake; monitor cholesterol levels quarterly.",priority:"Medium"},
            {icon:"💉",text:"Schedule overdue vaccinations to improve Preventive Care score.",priority:"Medium"},
            {icon:"😴",text:"Improve sleep consistency — aim for 7.5–8.5 hrs nightly.",priority:"Low"},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",
              padding:"10px 0",borderBottom:i<3?`1px solid ${C.borderLt}`:undefined}}>
              <span style={{fontSize:18,flexShrink:0}}>{r.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:C.text,lineHeight:1.6,marginBottom:3}}>{r.text}</div>
                <Chip label={`${r.priority} Priority`}
                  color={r.priority==="High"?C.red:r.priority==="Medium"?C.amber:C.green} sm/>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </PageWrap>
  );
};
export default HealthScore;
