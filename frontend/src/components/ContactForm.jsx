import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ContactForm = ({ addLog }) => {
  const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [toast, setToast] = useState(null); // { type: 'success'|'error', text: '' }
  const [attachment, setAttachment] = useState(null); // { filename: '', content: 'base64...' }
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Used to reset file input field

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      tempErrors.message = 'Message body is required';
    } else if (formData.message.length < 10) {
      tempErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const logEvent = (msg) => {
    if (addLog) {
      addLog(msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when editing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'File size exceeds 5MB limit.');
      logEvent('Attachment warning: Selected file is too large (> 5MB).');
      e.target.value = ''; // clear input
      return;
    }

    logEvent(`Processing attachment packet: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment({
        filename: file.name,
        content: reader.result // This is the base64 data URL
      });
      logEvent('Attachment encoding: COMPLETE.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    logEvent('Attempting contact form transmission protocol...');
    
    if (!validate()) {
      showToast('error', 'Please fix the errors in the form.');
      logEvent('Form validation: FAILED. Checking field errors.');
      return;
    }

    setStatus('submitting');
    logEvent('Uploading message packet to /api/messages...');

    try {
      const response = await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          attachment
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setAttachment(null);
        setFileInputKey(Date.now());
        
        if (data.status === 'offline_logged') {
          showToast('success', 'Message simulated! (Backend connected, MongoDB logged to terminal console)');
          logEvent('Message log: SUCCESS (Console logging fallback mode)');
        } else {
          showToast('success', 'Thank you! Your message has been saved successfully.');
          logEvent('Message log: SUCCESS (Saved to database)');
        }
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.warn('[ContactForm] Failed to hit backend server directly. Triggering local storage fallback.');
      
      // Fallback: Store locally in browser and notify user
      try {
        const offlineMsgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        offlineMsgs.push({
          ...formData,
          date: new Date().toISOString()
        });
        localStorage.setItem('portfolio_messages', JSON.stringify(offlineMsgs));
        
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setAttachment(null);
        setFileInputKey(Date.now());
        showToast('success', 'Form saved locally in Offline Mode! (Server could not be reached directly)');
        logEvent('Server offline: Redirecting packet to browser localStorage.');
      } catch (lsErr) {
        setStatus('error');
        showToast('error', error.message || 'Something went wrong. Please try again.');
        logEvent('Form transmission: CRITICAL_ERROR.');
      }
    }
  };

  return (
    <div className="tactical-card" style={{
      padding: '40px',
      borderRadius: '2px',
      background: 'rgba(11, 15, 24, 0.85)'
    }}>
      <div className="card-scanner"></div>
      
      <h3 className="mono" style={{
        fontSize: '1.2rem',
        marginBottom: '10px',
        color: '#ffffff',
        letterSpacing: '0.05em'
      }}>[04_TRANSMISSION_FORM]</h3>
      
      <p style={{ marginBottom: '30px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Fill out the parameters below to establish a connection.
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Name Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>// IDENTIFICATION_NAME</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => logEvent('Accessing input field: Name')}
            placeholder="John Doe"
            style={{
              padding: '12px 16px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: errors.name ? '1px solid var(--pink)' : '1px solid rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'var(--transition-fast)',
              fontFamily: 'var(--font-mono)'
            }}
            onFocusCapture={(e) => { if (!errors.name) e.target.style.borderColor = 'var(--cyan)'; }}
            onBlurCapture={(e) => { if (!errors.name) e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
          />
          {errors.name && <span style={{ color: 'var(--pink)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>[!] {errors.name}</span>}
        </div>

        {/* Email & Subject grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }} className="form-grid-2">
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>// CONTACT_EMAIL</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => logEvent('Accessing input field: Email')}
              placeholder="johndoe@example.com"
              style={{
                padding: '12px 16px',
                borderRadius: '2px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: errors.email ? '1px solid var(--pink)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'var(--transition-fast)',
                fontFamily: 'var(--font-mono)'
              }}
              onFocusCapture={(e) => { if (!errors.email) e.target.style.borderColor = 'var(--cyan)'; }}
              onBlurCapture={(e) => { if (!errors.email) e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
            />
            {errors.email && <span style={{ color: 'var(--pink)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>[!] {errors.email}</span>}
          </div>

          {/* Subject */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>// TOPIC_SUBJECT</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onFocus={() => logEvent('Accessing input field: Subject')}
              placeholder="Project details"
              style={{
                padding: '12px 16px',
                borderRadius: '2px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: errors.subject ? '1px solid var(--pink)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'var(--transition-fast)',
                fontFamily: 'var(--font-mono)'
              }}
              onFocusCapture={(e) => { if (!errors.subject) e.target.style.borderColor = 'var(--cyan)'; }}
              onBlurCapture={(e) => { if (!errors.subject) e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
            />
            {errors.subject && <span style={{ color: 'var(--pink)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>[!] {errors.subject}</span>}
          </div>
        </div>

        {/* Message Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>// MESSAGE_BODY</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => logEvent('Accessing input field: Message body')}
            placeholder="Tell me more about your requirements..."
            rows={5}
            style={{
              padding: '12px 16px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: errors.message ? '1px solid var(--pink)' : '1px solid rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'var(--font-mono)',
              transition: 'var(--transition-fast)'
            }}
            onFocusCapture={(e) => { if (!errors.message) e.target.style.borderColor = 'var(--cyan)'; }}
            onBlurCapture={(e) => { if (!errors.message) e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
          />
          {errors.message && <span style={{ color: 'var(--pink)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>[!] {errors.message}</span>}
        </div>

        {/* File Attachment Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>// ATTACH_DOSSIER_FILE (OPTIONAL, MAX 5MB)</label>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.01)',
            border: '1px dashed rgba(255, 255, 255, 0.08)',
            padding: '12px 16px',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(102, 252, 241, 0.3)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
          >
            <input
              key={fileInputKey}
              type="file"
              onChange={handleFileChange}
              onFocus={() => logEvent('Accessing file input gateway')}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer',
                width: '100%',
                height: '100%',
                zIndex: 2
              }}
            />
            <span className="mono" style={{ fontSize: '0.85rem', color: attachment ? 'var(--cyan)' : 'var(--text-secondary)' }}>
              {attachment ? `📎 ${attachment.filename}` : 'Select file (PDF, PNG, JPG, DOCX...)'}
            </span>
            {attachment && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setAttachment(null);
                  setFileInputKey(Date.now());
                  logEvent('Attachment packet: PURGED.');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--pink)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  zIndex: 3,
                  marginLeft: 'auto',
                  textTransform: 'uppercase'
                }}
              >
                [Purge File]
              </button>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn-tactical"
          disabled={status === 'submitting'}
          style={{
            alignSelf: 'flex-start',
            marginTop: '10px',
            opacity: status === 'submitting' ? 0.7 : 1,
            pointerEvents: status === 'submitting' ? 'none' : 'auto'
          }}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              TRANSMITTING...
            </>
          ) : (
            <>
              <Send size={16} />
              TRANSMIT_LOG
            </>
          )}
        </button>
      </form>

      {/* Floating Status Notification / Toast inside this container */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1001,
          padding: '16px 20px',
          borderRadius: '2px',
          background: 'rgba(6, 9, 14, 0.95)',
          backdropFilter: 'blur(10px)',
          border: toast.type === 'success' ? '1px solid var(--cyan)' : '1px solid var(--pink)',
          boxShadow: toast.type === 'success' ? '0 4px 20px var(--cyan-glow)' : '0 4px 20px var(--pink-glow)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '400px',
          animation: 'slideIn 0.3s ease forwards',
        }}>
          {toast.type === 'success' ? (
            <CheckCircle size={20} color="var(--cyan)" />
          ) : (
            <AlertCircle size={20} color="var(--pink)" />
          )}
          <span className="mono" style={{ fontSize: '0.8rem', color: '#ffffff' }}>{toast.text}</span>
        </div>
      )}

      {/* Embedded toast animation styles */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @media (max-width: 500px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
