import React from 'react';
import { Mail, Phone, MapPin, FileText } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = ({ addLog }) => {
  const logEvent = (text) => {
    if (addLog) addLog(text);
  };

  return (
    <section id="contact" style={{ background: 'rgba(6, 9, 14, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">// COMMS_PIPELINE</span>
          <h2 className="section-title glitch-hover">Contact Protocols</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '40px'
        }} className="contact-grid">
          
          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 className="mono" style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '10px' }}>[03_INITIATE_CONTACT]</h3>
            <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
              Have an inquiry or project spec that needs technical oversight? I am open to discussing full-time employment, freelance contracts, or technical collaborations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', border: '1px solid var(--cyan)', background: 'rgba(102, 252, 241, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)' }}>
                  <Mail size={16} />
                </div>
                <div>
                  <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>EMAIL</span>
                  <a href="mailto:debashishrout9860@gmail.com" style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>debashishrout9860@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', border: '1px solid var(--purple)', background: 'rgba(168, 85, 247, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--purple)' }}>
                  <Phone size={16} />
                </div>
                <div>
                  <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>PHONE_LINE / WHATSAPP</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>+91 9348954919 / +91 9960801043</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', border: '1px solid var(--pink)', background: 'rgba(236, 72, 153, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--pink)' }}>
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>GRID_COORDINATES</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Download CV */}
            <a 
              href="/Debashish_Raut_Resume.pdf" 
              download="Debashish_Raut_Resume.pdf"
              target="_blank" 
              rel="noreferrer"
              className="btn-tactical"
              style={{ alignSelf: 'flex-start', marginTop: '20px' }}
              onMouseEnter={() => logEvent('Prompting PDF resume transmission.')}
            >
              <FileText size={16} /> Print dossier
            </a>
          </div>

          {/* Form */}
          <ContactForm addLog={addLog} />

        </div>
      </div>
    </section>
  );
};

export default Contact;
