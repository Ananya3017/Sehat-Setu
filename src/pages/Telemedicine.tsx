// @ts-nocheck
import React from 'react';
import { C, PageWrap, SecHead, StatCard, Card, FormField, Btn } from '../lib/design';

const Telemedicine = () => (
  <PageWrap>
    <SecHead label="eSanjeevani Integration" title="Telemedicine Portal"
      sub="Video consultations, e-prescriptions and remote monitoring — powered by eSanjeevani."/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
      gap:16,marginBottom:28}} className="page-enter">
      <StatCard icon="📞" label="Active Consults"  value="18,320" color={C.primary}/>
      <StatCard icon="👨⚕️" label="Doctors Online"  value="3,412"  color={C.green}/>
      <StatCard icon="⏱️" label="Avg Wait Time"    value="4 min"  color={C.accent}/>
      <StatCard icon="🌐" label="States Covered"   value="28"     color="#0284C7"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Card style={{padding:24}}>
        <div style={{fontSize:15,fontWeight:700,color:C.primary,marginBottom:18}}>
          👨⚕️ Available Doctors
        </div>
        {[
          {name:"Dr. Priya Sharma",spec:"General Physician",wait:"2 min",lang:"Hindi, English"},
          {name:"Dr. Rahul Nair",  spec:"Cardiologist",     wait:"8 min",lang:"Malayalam, English"},
          {name:"Dr. Anika Mehta", spec:"Diabetologist",    wait:"5 min",lang:"Hindi, Gujarati"},
        ].map(d=>(
          <div key={d.name} style={{display:"flex",justifyContent:"space-between",
            alignItems:"center",padding:"12px 0",
            borderBottom:`1px solid ${C.borderLt}`}}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:38,height:38,borderRadius:"50%",
                background:`${C.primary}14`,display:"flex",alignItems:"center",
                justifyContent:"center",fontSize:18,fontWeight:700,color:C.primary}}>
                {d.name.split(" ")[1][0]}
              </div>
              <div>
                <div style={{fontWeight:700,color:C.text,fontSize:13}}>{d.name}</div>
                <div style={{fontSize:11,color:C.textSub}}>{d.spec} · {d.lang}</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:11,color:C.green,fontWeight:600}}>~{d.wait}</span>
              <Btn label="Consult" sm variant="green"/>
            </div>
          </div>
        ))}
      </Card>
      <Card style={{padding:24}}>
        <div style={{fontSize:15,fontWeight:700,color:C.primary,marginBottom:18}}>
          📅 Book Appointment
        </div>
        <FormField label="Specialty" type="select" value="" onChange={()=>{}}
          options={["General Physician","Cardiologist","Diabetologist","Gynecologist","Pediatrician"]}/>
        <FormField label="Preferred Language" type="select" value="" onChange={()=>{}}
          options={["Hindi","English","Tamil","Bengali","Telugu","Marathi"]}/>
        <FormField label="Date" type="date" value="" onChange={()=>{}}/>
        <Btn label="Find Available Doctors" variant="primary" style={{padding:"10px 22px"}}/>
      </Card>
    </div>
  </PageWrap>
);

export default Telemedicine;
