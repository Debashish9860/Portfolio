import React, { useState, useEffect } from 'react';
import { Mail, ShieldAlert, Users, Database, Terminal, ChevronLeft } from 'lucide-react';

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState('Checking...');
  const [visitLogs, setVisitLogs] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch Contact Messages from Express API
        const msgRes = await fetch(`http://${window.location.hostname}:5000/api/messages`);
        if (msgRes.ok) {
          const msgData = await msgRes.json();
          setMessages(msgData.data || []);
        }

        // Fetch Telemetry Visit stats from Express API
        const visitRes = await fetch(`http://${window.location.hostname}:5000/api/analytics/visit`);
        if (visitRes.ok) {
          const visitData = await visitRes.json();
          setVisitLogs(visitData.data || []);
        }

        // Check health
        const healthRes = await fetch(`http://${window.location.hostname}:5000/api/health`);
        if (healthRes.ok) {
          const healthData = await healthRes.json();
          setDbStatus(healthData.dbState || 'connected');
        } else {
          setDbStatus('connected');
        }
      } catch (err) {
        console.warn('[Admin] Failed to fetch server metrics. Loading localStorage cache.');
        setDbStatus('offline');
        
        // Fetch from localStorage fallback
        try {
          const storedMsgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
          setMessages(storedMsgs.map((m, i) => ({ ...m, _id: `LOCAL-${i}`, createdAt: m.date || new Date() })));
        } catch (e) {}
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '100px 20px 40px 20px',
      background: 'var(--bg-darker)',
      fontFamily: 'var(--font-mono)'
    }}>
      <div className="container">
        
        {/* Navigation back */}
        <a href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--cyan)',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          marginBottom: '30px'
        }}>
          <ChevronLeft size={16} /> [ Return_to_Dossier ]
        </a>

        {/* Dashboard Title */}
        <div style={{
          borderLeft: '3px solid var(--pink)',
          paddingLeft: '20px',
          marginBottom: '50px'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--pink)', letterSpacing: '0.2em', display: 'block', marginBottom: '5px' }}>
            // RAUT_SYS_ADMIN_PORTAL
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', color: '#ffffff' }}>
            Telemetry Logs & Inbox
          </h2>
        </div>

        {/* Diagnostic Telemetry Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }} className="admin-stats-grid">
          
          {/* Card 1: DB Status */}
          <div className="tactical-card" style={{ padding: '24px', background: 'rgba(255,255,255,0.01)' }}>
            <div className="card-scanner"></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--cyan)', display: 'block', marginBottom: '5px' }}>// DATABASE_STATE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={16} color={dbStatus === 'connected' ? 'var(--cyan)' : 'var(--pink)'} />
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase' }}>
                {dbStatus}
              </span>
            </div>
          </div>

          {/* Card 2: Total Messages */}
          <div className="tactical-card" style={{ padding: '24px', background: 'rgba(255,255,255,0.01)' }}>
            <div className="card-scanner"></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--purple)', display: 'block', marginBottom: '5px' }}>// TOTAL_INQUIRIES</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--purple)" />
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                {messages.length} Packets
              </span>
            </div>
          </div>

          {/* Card 3: Visits telemetry */}
          <div className="tactical-card" style={{ padding: '24px', background: 'rgba(255,255,255,0.01)' }}>
            <div className="card-scanner"></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--pink)', display: 'block', marginBottom: '5px' }}>// TELEMETRY_HITS</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} color="var(--pink)" />
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                {dbStatus === 'offline' ? 'LOCAL_MOCKED' : `${visitLogs.length || 1} Visits`}
              </span>
            </div>
          </div>

        </div>

        {/* Message Inbox list */}
        <div className="tactical-card" style={{ padding: '30px', background: 'rgba(11, 15, 24, 0.9)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '0.9rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} color="var(--cyan)" /> INCOMING_TRANSMISSIONS_INBOX
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {loading ? (
              <div style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>Decrypting records...</div>
            ) : messages.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', padding: '20px 0', textAlign: 'center' }}>
                [ Inbox is empty. Establish pipeline connections above. ]
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  padding: '20px',
                  borderRadius: '2px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px', borderBottom: '1px dashed rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                    <div>
                      <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>{msg.name}</span>
                      <span style={{ color: 'var(--text-muted)', margin: '0 8px' }}>|</span>
                      <span style={{ color: 'var(--text-secondary)' }}>&lt;{msg.email}&gt;</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: 'var(--purple)', fontSize: '0.75rem', textTransform: 'uppercase', marginRight: '6px' }}>SUBJECT:</span>
                    <strong style={{ color: '#ffffff', fontSize: '0.9rem' }}>{msg.subject}</strong>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
