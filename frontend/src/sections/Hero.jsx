import React from 'react';
import { Sparkles, Cpu } from 'lucide-react';

const Hero = ({ addLog }) => {
  const logEvent = (text) => {
    if (addLog) addLog(text);
  };

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '100px',
      paddingBottom: '50px'
    }}>
      <div className="container hero-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px' }}>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.1em' }}>
              // TELEMETRY_ONLINE
            </span>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }}></div>
          </div>
          
          <h1 className="hud-font" style={{
            fontSize: '4rem',
            lineHeight: 1,
            marginBottom: '20px'
          }}>
            DEBASHISH RAUT
          </h1>
          
          <h2 className="mono" style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '25px',
            borderLeft: '2px solid var(--purple)',
            paddingLeft: '12px'
          }}>
            ROLE: FULL-STACK_DEV // DESKTOP_ENGINEER
          </h2>

          <p style={{
            fontSize: '1rem',
            marginBottom: '35px',
            maxWidth: '520px',
            color: 'var(--text-secondary)'
          }}>
            Tactical builder of manufacturing CRM/PPC suites, hotel ticketing monitors, and complex vector estimation tools. Proficient in **JavaScript/MERN** and **.NET C#**.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <a 
              href="#projects" 
              className="btn-tactical"
              onMouseEnter={() => logEvent('Hovered primary interface action: [View Projects]')}
            >
              Scan Modules
            </a>
            <a 
              href="#contact" 
              className="btn-tactical btn-tactical-purple"
              onMouseEnter={() => logEvent('Hovered secondary interface action: [Contact]')}
            >
              Transmit log
            </a>
          </div>
        </div>

        {/* Glowing Animated SVG HUD Grid */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="hero-illustration">
          <div className="tactical-card" style={{
            width: '100%',
            maxWidth: '380px',
            aspectRatio: '1/1',
            padding: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '2px',
            border: '1px solid rgba(102, 252, 241, 0.1)',
            background: 'rgba(6, 9, 14, 0.4)'
          }}
          onMouseEnter={() => logEvent('Vector grid graphics scanner: ACTIVE')}
          >
            <div className="card-scanner"></div>
            
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
              {/* Rotating ring */}
              <circle cx="100" cy="100" r="80" stroke="url(#hudGrad)" strokeWidth="1.5" strokeDasharray="16 8" style={{
                transformOrigin: 'center',
                animation: 'spin 50s linear infinite'
              }} />
              
              {/* HUD Crosshairs */}
              <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(102, 252, 241, 0.08)" strokeWidth="1" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(102, 252, 241, 0.08)" strokeWidth="1" />
              
              {/* Floating brackets symbol */}
              <g style={{
                transformOrigin: 'center',
                animation: 'float 6s ease-in-out infinite'
              }}>
                {/* Left Bracket */}
                <path d="M 60,60 L 45,60 L 45,140 L 60,140" fill="none" stroke="var(--cyan)" strokeWidth="2.5" />
                {/* Right Bracket */}
                <path d="M 140,60 L 155,60 L 155,140 L 140,140" fill="none" stroke="var(--purple)" strokeWidth="2.5" />
                
                {/* Core symbol */}
                <Cpu x="88" y="88" width="24" height="24" color="var(--cyan)" />
                
                {/* Customized Project Abbreviations Readout */}
                {/* Left Column: Modules 01-03 */}
                <text x="52" y="80" fill="var(--cyan)" fontSize="5.5" fontFamily="var(--font-mono)" opacity="0.8">// MODULES</text>
                <text x="52" y="92" fill="var(--cyan)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">01: LEDE</text>
                <text x="52" y="102" fill="var(--cyan)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">02: MKIT</text>
                <text x="52" y="112" fill="var(--cyan)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">03: SCON</text>

                {/* Right Column: Modules 04-05 + Status */}
                <text x="114" y="80" fill="var(--purple)" fontSize="5.5" fontFamily="var(--font-mono)" opacity="0.8">// DB_LOGS</text>
                <text x="114" y="92" fill="var(--purple)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">04: AMS</text>
                <text x="114" y="102" fill="var(--purple)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">05: ERND</text>
                <text x="114" y="112" fill="var(--purple)" fontSize="5" fontFamily="var(--font-mono)" opacity="0.6">SYS: OK</text>
              </g>

              <defs>
                <linearGradient id="hudGrad" x1="0" y1="0" x2="200" y2="200">
                  <stop offset="0%" stopColor="var(--cyan)" />
                  <stop offset="100%" stopColor="var(--purple)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
