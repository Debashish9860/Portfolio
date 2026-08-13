import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const Github = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: scrolled ? '12px 0' : '22px 0',
      background: scrolled ? 'rgba(6, 9, 14, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(102, 252, 241, 0.15)' : '1px dashed rgba(255, 255, 255, 0.05)',
      transition: 'var(--transition-tactical)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* HUD Logo */}
        <a href="#home" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#ffffff',
        }}>
          <div style={{
            background: 'rgba(102, 252, 241, 0.05)',
            border: '1px solid var(--cyan)',
            padding: '8px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px var(--cyan-glow)',
            transform: 'skewX(-10deg)'
          }}>
            <Code2 size={20} color="var(--cyan)" style={{ transform: 'skewX(10deg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>
              DEBASHISH<span style={{ color: 'var(--cyan)' }}>.R</span>
            </span>
            <span className="mono" style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
              // ENG_SYS_PROTOCOL
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }} className="desktop-nav">
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '24px',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            fontWeight: 500
          }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} style={{
                  position: 'relative',
                  padding: '6px 0',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--cyan)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Social icons + Skewed button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginLeft: '20px',
            borderLeft: '1px dashed rgba(255, 255, 255, 0.1)',
            paddingLeft: '20px'
          }}>
            <a href="https://github.com/Debashish9860" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--cyan)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'} title="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/debashish-raut-67a96a1a0" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--purple)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'} title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#contact" className="btn-tactical btn-tactical-purple" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
              TRANSMIT LOG
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#ffffff',
          cursor: 'pointer',
        }} className="mobile-toggle">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          background: 'rgba(6, 9, 14, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(102, 252, 241, 0.15)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 999
        }}>
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            listStyle: 'none',
            fontSize: '1rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase'
          }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={() => setIsOpen(false)} style={{
                  color: 'var(--text-secondary)',
                  display: 'block',
                  padding: '8px 0'
                }}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div style={{
            display: 'flex',
            gap: '20px',
            borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            alignItems: 'center'
          }}>
            <a href="https://github.com/Debashish9860" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/debashish-raut-67a96a1a0" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
              <Linkedin size={20} />
            </a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="btn-tactical" style={{ padding: '8px 20px', fontSize: '0.8rem' }}>
              TRANSMIT LOG
            </a>
          </div>
        </div>
      )}

      {/* Responsive toggle classes */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
