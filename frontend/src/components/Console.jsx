import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X } from 'lucide-react';

const Console = ({ logs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const consoleRef = useRef(null);
  const buttonRef = useRef(null);

  // Close the console automatically when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (
        consoleRef.current && !consoleRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    // Delay listener slightly to prevent instantaneous trigger on the open tap event
    const timer = setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    }, 50);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating AssistiveTouch-style Ball Button */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="hud-console-trigger interactive-item"
          title="Diagnostics Feed"
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(6, 9, 14, 0.85)',
            border: '1.5px solid var(--cyan)',
            boxShadow: '0 0 15px rgba(102, 252, 241, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 990,
            outline: 'none',
            padding: 0,
            animation: 'pulse-ball 2s infinite ease-in-out'
          }}
        >
          <Terminal size={18} color="var(--cyan)" />
          
          {/* Subtle pulse animation indicator inside */}
          <span style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid var(--cyan)',
            opacity: 0.5,
            animation: 'ping-ball 2s infinite ease-out'
          }}></span>
        </button>
      )}

      {/* Expanded Diagnostics Console Panel */}
      {isOpen && (
        <div 
          ref={consoleRef}
          className="diagnostic-console"
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 995,
            width: '320px',
            padding: '16px',
            border: '1.5px solid var(--cyan)',
            background: 'rgba(6, 9, 14, 0.95)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 12px 40px rgba(102, 252, 241, 0.25)',
            borderRadius: '4px',
            animation: 'console-open 0.25s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(102, 252, 241, 0.2)', paddingBottom: '6px', marginBottom: '10px' }}>
            <span className="mono" style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={12} /> DIAGNOSTICS_FEED
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '2px' }}
            >
              <X size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {logs.map((log, lIdx) => (
              <div key={lIdx} style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', lineHeight: '1.2', fontFamily: 'var(--font-mono)' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AssistiveTouch Ball Animations */}
      <style>{`
        @keyframes pulse-ball {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 12px rgba(102, 252, 241, 0.4);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 20px rgba(102, 252, 241, 0.7);
          }
        }
        @keyframes ping-ball {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Console;
