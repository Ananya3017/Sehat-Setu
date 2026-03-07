// @ts-nocheck
import React from 'react';
import { C, PageWrap, SecHead, StatCard, Btn, Card, Chip } from '../lib/design';

const Hospitals = () => {
  const HOSPS = [
    {name:"AIIMS New Delhi",    type:"Government",beds:2478,rating:4.8,dist:"2.1 km",avail:true,  spec:["Cardiology","Neurology","Oncology"]},
    {name:"Apollo Hospital",    type:"Private",   beds:710, rating:4.6,dist:"4.3 km",avail:true,  spec:["Multi-Specialty","ICU","Transplant"]},
    {name:"Safdarjung Hospital",type:"Government",beds:1531,rating:4.4,dist:"3.7 km",avail:true,  spec:["Trauma","Burns","Gynecology"]},
    {name:"Fortis Escorts",     type:"Private",   beds:310, rating:4.5,dist:"6.2 km",avail:false, spec:["Cardiac","Orthopedics"]},
  ];
  return (
    <PageWrap>
      <SecHead label="Hospital Network" title="Empanelled Hospitals"
        sub="2,30,000+ hospitals registered under Ayushman Bharat PM-JAY network."/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
        gap:16,marginBottom:28}} className="page-enter">
        <StatCard icon="🏥" label="Total Hospitals"  value="2.3L"   color={C.primary}/>
        <StatCard icon="🛏️" label="Total Beds"       value="18.4L"  color={C.green}/>
        <StatCard icon="👨⚕️" label="Doctors Online"  value="84,200" color="#0284C7"/>
        <StatCard icon="🚑" label="Emergency Units"  value="12,400" color={C.red}/>
      </div>
      <div style={{display:"flex",gap:12,marginBottom:20}}>
        <input placeholder="Search hospital, city or PIN code…"
          style={{flex:1,padding:"10px 14px",border:`1.5px solid ${C.border}`,
            borderRadius:8,fontSize:13,background:C.surface,color:C.text}}/>
        <Btn label="Search" icon="🔍"/>
        <Btn label="Near Me" icon="📍" variant="outline"/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {HOSPS.map(h=>(
          <Card key={h.name} style={{padding:"18px 22px"}}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"center",flexWrap:"wrap",gap:14}}>
              <div style={{display:"flex",gap:16,alignItems:"center"}}>
                <div style={{fontSize:34}}>🏥</div>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:3}}>
                    <span style={{fontWeight:800,color:C.text,fontSize:15}}>{h.name}</span>
                    <Chip label={h.type} color={h.type==="Government"?C.green:C.primary} sm/>
                  </div>
                  <div style={{fontSize:12,color:C.textSub,marginBottom:4}}>
                    📍 {h.dist} · 🛏️ {h.beds} beds · ⭐ {h.rating}
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {h.spec.map(s=><Chip key={s} label={s} color={C.textMuted} sm/>)}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <Chip label={h.avail?"Available":"Full"} color={h.avail?C.green:C.red}/>
                <Btn label="Book" sm/>
                <Btn label="Directions" sm variant="outline"/>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageWrap>
  );
};
export default Hospitals;
