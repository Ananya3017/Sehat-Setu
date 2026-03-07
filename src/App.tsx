// @ts-nocheck
import React, { useState } from 'react';
import { StyleSheet } from './lib/design';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import GlobalLogin from './pages/GlobalLogin';
import Home from './pages/Landing';
import HealthVault from './pages/HealthVault';
import HealthTwin from './pages/HealthTwin';
import HealthScore from './pages/HealthScore';
import Hospitals from './pages/Hospitals';
import Telemedicine from './pages/Telemedicine';
import Emergency from './pages/Emergency';
import Admin from './pages/Admin';

export default function App() {
  const [globalUser, setGlobalUser] = useState(null);
  const [page, setPage] = useState("home");

  if (!globalUser) {
    return (
      <>
        <StyleSheet/>
        <GlobalLogin onLogin={setGlobalUser} />
      </>
    );
  }

  const render = () => {
    switch(page){
      case "home":        return <Home setPage={setPage}/>;
      case "vault":       return <HealthVault setPage={setPage}/>;
      case "health-twin": return <HealthTwin/>;
      case "score":       return <HealthScore/>;
      case "hospitals":   return <Hospitals/>;
      case "tele":        return <Telemedicine/>;
      case "emergency":   return <Emergency/>;
      case "admin":       return <Admin/>;
      default:            return <Home setPage={setPage}/>;
    }
  };

  return (
    <>
      <StyleSheet/>
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
        <Navbar page={page} setPage={setPage}/>
        <div style={{flex:1}}>{render()}</div>
        <Footer/>
      </div>
    </>
  );
}
