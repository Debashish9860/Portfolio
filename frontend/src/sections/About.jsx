import React from 'react';
import { Briefcase, Award } from 'lucide-react';

const About = ({ addLog }) => {
  const logEvent = (text) => {
    if (addLog) addLog(text);
  };

  return (
    <section id="about" style={{ background: 'rgba(6, 9, 14, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">// HISTORICAL_ARCHIVES</span>
          <h2 className="section-title glitch-hover">Dossier / History</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '50px',
          alignItems: 'start'
        }} className="about-grid">
          
          {/* Bio summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 className="mono" style={{ fontSize: '1.1rem', color: '#ffffff', letterSpacing: '0.05em' }}>[01_PROFILE_BRIEFING]</h3>
            <p>
              I am a Pune-based developer with hands-on expertise building enterprise-grade applications.
              With a strong base in both web and desktop architectures, I enjoy resolving complex computation, layout calculation, and ticketing issues.
            </p>
            <p>
              From architecting automated CAD estimator software in .NET to engineering real-time counter managers in the MERN Stack, I write clean, maintainable code structured for scalability.
            </p>

            <div style={{
              marginTop: '15px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px'
            }} className="info-grid">
              <div className="tactical-card" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)' }} 
                onMouseEnter={() => logEvent('Inspected dossier details: Experience metrics')}
                onClick={() => logEvent('Accessed dossier metrics: Experience')}
              >
                <div className="card-scanner"></div>
                <span className="mono" style={{ display: 'block', fontSize: '0.7rem', color: 'var(--cyan)', marginBottom: '5px' }}>// EXPERIENCE_DEPTH</span>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}>2+ YEARS</span>
              </div>
              <div className="tactical-card" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)' }} 
                onMouseEnter={() => logEvent('Inspected dossier details: Sector metrics')}
                onClick={() => logEvent('Accessed dossier metrics: Deployment Sector')}
              >
                <div className="card-scanner"></div>
                <span className="mono" style={{ display: 'block', fontSize: '0.7rem', color: 'var(--purple)', marginBottom: '5px' }}>// SECTOR_DEPLOYED</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>PUNE_MH_IN</span>
              </div>
            </div>
          </div>

          {/* Tactical Timelines */}
          <div>
            {/* Professional Experience */}
            <h3 className="mono" style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '25px', letterSpacing: '0.05em' }}>[02_PROFESSIONAL_DOCK]</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              borderLeft: '2px solid rgba(102, 252, 241, 0.2)',
              paddingLeft: '20px',
              marginLeft: '10px',
              marginBottom: '40px'
            }}>
              {/* Software Developer */}
              <div style={{ position: 'relative' }} 
                onMouseEnter={() => logEvent('Dossier review: Software Developer experience')}
                onClick={() => logEvent('Indexed experience dossier: Software Developer')}
              >
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--cyan)',
                  boxShadow: '0 0 8px var(--cyan-glow)',
                  border: '3px solid var(--bg-darker)'
                }} />
                <span className="mono" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.75rem' }}>[JULY 2025 - PRESENT]</span>
                <h4 style={{ fontSize: '1.1rem', margin: '4px 0 2px 0' }}>Software Developer</h4>
                <span className="mono" style={{ display: 'block', fontSize: '0.85rem', color: '#ffffff', marginBottom: '4px' }}>
                  Abhinav DigiCompSoft Pvt. Ltd., Pune
                </span>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Promoted from Junior Software Developer. Lead developer architecting end-to-end web (MERN Stack) and desktop (.NET/C#) applications.
                </span>
              </div>

              {/* Junior Software Developer */}
              <div style={{ position: 'relative' }} 
                onMouseEnter={() => logEvent('Dossier review: Jr. Software Developer experience')}
                onClick={() => logEvent('Indexed experience dossier: Junior Software Developer')}
              >
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--purple)',
                  boxShadow: '0 0 8px var(--purple-glow)',
                  border: '3px solid var(--bg-darker)'
                }} />
                <span className="mono" style={{ color: 'var(--purple)', fontWeight: 700, fontSize: '0.75rem' }}>[JULY 2024 - JULY 2025]</span>
                <h4 style={{ fontSize: '1.1rem', margin: '4px 0 2px 0' }}>Junior Software Developer</h4>
                <span className="mono" style={{ display: 'block', fontSize: '0.85rem', color: '#ffffff', marginBottom: '4px' }}>
                  Abhinav DigiCompSoft Pvt. Ltd., Pune
                </span>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Joined as Junior Developer. Worked on CRM allocation engines, hotel desk ticketing, and internationalization portals.
                </span>
              </div>

              {/* Software Developer Intern */}
              <div style={{ position: 'relative' }} 
                onMouseEnter={() => logEvent('Dossier review: Software Developer Intern experience')}
                onClick={() => logEvent('Indexed experience dossier: Software Developer Intern')}
              >
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)',
                  border: '3px solid var(--bg-darker)'
                }} />
                <span className="mono" style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.75rem' }}>[JAN 2024 - APRIL 2024]</span>
                <h4 style={{ fontSize: '1.1rem', margin: '4px 0 2px 0' }}>Software Developer Intern</h4>
                <span className="mono" style={{ display: 'block', fontSize: '0.85rem', color: '#ffffff', marginBottom: '4px' }}>
                  Abhinav DigiCompSoft Pvt. Ltd., Pune
                </span>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Built full-featured social media feeds using MERN Stack and GraphQL with secure token structures.
                </span>
              </div>
            </div>

            {/* Academic History */}
            <h3 className="mono" style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '25px', letterSpacing: '0.05em' }}>[03_ACADEMIC_TIMELINE]</h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              borderLeft: '2px solid rgba(102, 252, 241, 0.2)',
              paddingLeft: '20px',
              marginLeft: '10px'
            }}>
              {/* MCA */}
              <div style={{ position: 'relative' }} 
                onMouseEnter={() => logEvent('Dossier review: MCA Education details')}
                onClick={() => logEvent('Indexed academic dossier: Master of Computer Applications (MCA)')}
              >
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--cyan)',
                  boxShadow: '0 0 8px var(--cyan-glow)',
                  border: '3px solid var(--bg-darker)'
                }} />
                <span className="mono" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.75rem' }}>[2022 - 2024]</span>
                <h4 style={{ fontSize: '1.1rem', margin: '4px 0 2px 0' }}>Master of Computer Applications (MCA)</h4>
                <span className="mono" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  PES's Modern College of Engineering, Pune • Score: <strong style={{ color: 'var(--cyan)' }}>8.38 CGPA</strong>
                </span>
              </div>

              {/* BCS */}
              <div style={{ position: 'relative' }} 
                onMouseEnter={() => logEvent('Dossier review: BCS Education details')}
                onClick={() => logEvent('Indexed academic dossier: Bachelor of Computer Science (BCS)')}
              >
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--purple)',
                  boxShadow: '0 0 8px var(--purple-glow)',
                  border: '3px solid var(--bg-darker)'
                }} />
                <span className="mono" style={{ color: 'var(--purple)', fontWeight: 700, fontSize: '0.75rem' }}>[2019 - 2022]</span>
                <h4 style={{ fontSize: '1.1rem', margin: '4px 0 2px 0' }}>Bachelor of Computer Science (BCS)</h4>
                <span className="mono" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Marathwada Mitra Mandal College of Commerce (MMCC), Pune • Score: <strong style={{ color: 'var(--purple)' }}>9.47 CGPA</strong>
                </span>
              </div>

              {/* HSC */}
              <div style={{ position: 'relative' }} 
                onMouseEnter={() => logEvent('Dossier review: HSC Education details')}
                onClick={() => logEvent('Indexed academic dossier: Higher Secondary Certificate (HSC)')}
              >
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)',
                  border: '3px solid var(--bg-darker)'
                }} />
                <span className="mono" style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.75rem' }}>[2019]</span>
                <h4 style={{ fontSize: '1.1rem', margin: '4px 0 2px 0' }}>Higher Secondary Certificate (HSC - 12th)</h4>
                <span className="mono" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Suryadatta Public School, Pune • Score: <strong>68.92%</strong>
                </span>
              </div>

              {/* SSC */}
              <div style={{ position: 'relative' }} 
                onMouseEnter={() => logEvent('Dossier review: SSC Education details')}
                onClick={() => logEvent('Indexed academic dossier: Secondary School Certificate (SSC)')}
              >
                <div style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)',
                  border: '3px solid var(--bg-darker)'
                }} />
                <span className="mono" style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.75rem' }}>[2017]</span>
                <h4 style={{ fontSize: '1.1rem', margin: '4px 0 2px 0' }}>Secondary School Certificate (SSC - 10th)</h4>
                <span className="mono" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Sahyadri International School, Pune • Score: <strong>83.00%</strong>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
