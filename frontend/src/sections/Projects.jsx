import React from 'react';
import { Star } from 'lucide-react';

const Projects = ({ projects, loading, addLog }) => {
  const logEvent = (text) => {
    if (addLog) addLog(text);
  };

  return (
    <section id="projects" style={{ background: 'rgba(6, 9, 14, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">// DEPLOYED_SCHEMAS</span>
          <h2 className="section-title glitch-hover">Engineering Works</h2>
        </div>

        {loading ? (
          <div className="mono" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Querying projects pipeline...
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '30px'
          }}>
            {projects.map((proj, idx) => (
              <div 
                key={idx} 
                className={`tactical-card ${idx % 3 === 1 ? 'tactical-card-purple' : idx % 3 === 2 ? 'tactical-card-pink' : ''}`}
                style={{
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                onMouseEnter={() => logEvent(`Inspecting project module: [${proj.title}]`)}
                onClick={() => logEvent(`Selected project module: [${proj.title}]`)}
              >
                <div className="card-scanner"></div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <span className="mono" style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      background: 'rgba(102, 252, 241, 0.05)',
                      border: '1px solid rgba(102, 252, 241, 0.15)',
                      color: 'var(--cyan)'
                    }}>
                      {proj.category || 'Software'}
                    </span>
                    {proj.featured && (
                      <span className="mono" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#f59e0b', fontWeight: 600 }}>
                        <Star size={12} fill="#f59e0b" /> [Featured_Core]
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '10px' }}>{proj.title}</h3>
                  <p style={{ fontSize: '0.9rem', marginBottom: '20px', color: 'var(--text-secondary)' }}>{proj.description}</p>

                  {/* Features list */}
                  <ul style={{
                    listStyle: 'none',
                    paddingLeft: 0,
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {(proj.features || []).map((feat, fIdx) => (
                      <li key={fIdx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: 'var(--cyan)' }}>▪</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Tech Stack tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px',
                    paddingTop: '15px',
                    borderTop: '1px dashed rgba(255, 255, 255, 0.08)'
                  }}>
                    {(proj.techStack || []).map(tech => (
                      <span key={tech} className="mono" style={{
                        fontSize: '0.7rem',
                        background: 'rgba(255,255,255,0.01)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: '3px 8px',
                        color: 'var(--text-muted)'
                      }}>{tech}</span>
                    ))}
                  </div>

                  {/* Project stats */}
                  {proj.stats && Object.keys(proj.stats).length > 0 && (
                    <div className="mono" style={{
                      background: 'rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.02)',
                      padding: '10px 14px',
                      borderRadius: '2px',
                      marginBottom: '20px',
                      fontSize: '0.75rem'
                    }}>
                      {Object.entries(proj.stats).map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 0' }}>
                          <span style={{ color: 'var(--text-muted)' }}>{k}:</span>
                          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  )}


                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
