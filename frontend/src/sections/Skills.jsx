import React from 'react';

const Skills = ({ addLog }) => {
  const skills = {
    languages: ['JavaScript (ES6+)', 'C#', 'Python', 'Java', 'HTML5', 'CSS3', 'SQL', 'PHP'],
    frameworks: ['React.js', 'Node.js', 'Express.js', '.NET Framework', 'CodeIgniter 4', 'EJS', 'GraphQL'],
    databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'DBMS/RDBMS Design'],
    specializations: ['REST APIs', 'Razorpay Gateway', 'i18n Multilingual Engines', 'Vector CAD Parsing', 'OOP', 'DSA']
  };

  const logEvent = (text) => {
    if (addLog) addLog(text);
  };

  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">// TECHNICAL_MATRIX</span>
          <h2 className="section-title glitch-hover">Expertise Core</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          
          {/* Languages */}
          <div className="tactical-card" style={{ padding: '28px' }}>
            <div className="card-scanner"></div>
            <h3 className="mono" style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--cyan)' }}>&lt;/&gt;</span> LANGUAGES_LIST
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.languages.map(s => (
                <span 
                  key={s} 
                  className="mono interactive-item"
                  onMouseEnter={() => logEvent(`Scanned language node: ${s}`)}
                  onClick={() => logEvent(`Queried language node: ${s}`)}
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--text-secondary)'
                  }}
                >{s}</span>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="tactical-card tactical-card-purple" style={{ padding: '28px' }}>
            <div className="card-scanner"></div>
            <h3 className="mono" style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--purple)' }}>📦</span> FRAMEWORKS_DEV
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.frameworks.map(s => (
                <span 
                  key={s} 
                  className="mono interactive-item"
                  onMouseEnter={() => logEvent(`Scanned framework node: ${s}`)}
                  onClick={() => logEvent(`Queried framework node: ${s}`)}
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--text-secondary)'
                  }}
                >{s}</span>
              ))}
            </div>
          </div>

          {/* Databases */}
          <div className="tactical-card tactical-card-pink" style={{ padding: '28px' }}>
            <div className="card-scanner"></div>
            <h3 className="mono" style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--pink)' }}>🗄️</span> DATABASE_SYSTEMS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.databases.map(s => (
                <span 
                  key={s} 
                  className="mono interactive-item"
                  onMouseEnter={() => logEvent(`Scanned database node: ${s}`)}
                  onClick={() => logEvent(`Queried database node: ${s}`)}
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--text-secondary)'
                  }}
                >{s}</span>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div className="tactical-card" style={{ padding: '28px' }}>
            <div className="card-scanner"></div>
            <h3 className="mono" style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--cyan)' }}>⚡</span> SPECIALIZATIONS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.specializations.map(s => (
                <span 
                  key={s} 
                  className="mono interactive-item"
                  onMouseEnter={() => logEvent(`Scanned specialization node: ${s}`)}
                  onClick={() => logEvent(`Queried specialization node: ${s}`)}
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 12px',
                    borderRadius: '2px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--text-secondary)'
                  }}
                >{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
