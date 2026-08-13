import React, { useState, useEffect, useRef } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Footer from '../components/Footer';
import Console from '../components/Console';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const reticleRef = useRef(null);

  // Live System Diagnostics Log state
  const [logs, setLogs] = useState([
    '[SYSTEM] Initializing RAUT_ENG_CORE_v2.5...',
    '[SYSTEM] Telemetry coordinates: PUNE_MH_IN (18.52° N, 73.85° E)',
    '[SYSTEM] Database connection: ESTABLISHED',
    '[SYSTEM] Awaiting user manual diagnostics interface...'
  ]);

  const addLog = (text) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs((prev) => {
      const newLogs = [...prev, `[${time}] ${text}`];
      return newLogs.slice(-5); // keep last 5 logs
    });
  };

  // Telemetry page view logging
  useEffect(() => {
    try {
      fetch(`http://${window.location.hostname}:5000/api/analytics/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/' })
      }).catch(() => {});
    } catch (e) {}
  }, []);

  // Track mouse movements for custom reticle cursor
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('interactive-item');

      if (reticleRef.current) {
        if (isInteractive) {
          reticleRef.current.classList.add('hovered');
        } else {
          reticleRef.current.classList.remove('hovered');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Fetch projects from MERN backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://${window.location.hostname}:5000/api/projects`);
        const resData = await response.json();
        if (resData.success) {
          setProjects(resData.data);
          addLog('[API] Projects feed parsed successfully from MongoDB.');
        } else {
          throw new Error('Failed loading projects');
        }
      } catch (err) {
        console.warn('[App] Backend connection failed. Loading local static projects dataset.');
        addLog('[WARN] Local DB offline. Activating cached fallback schemas.');
        
        // Seed static fallback list
        const staticProjects = [
          {
            title: 'LED Estimator',
            description: 'A native CAD processing and calculation suite. Built for industrial signage planning, it parses vector graphics to lay out LED modules automatically.',
            category: 'Desktop App',
            techStack: ['C#', '.NET Framework', 'Node.js', 'CodeIgniter 4'],
            githubLink: 'https://github.com/Debashish9860',
            liveLink: '',
            features: [
              'Desktop CAD Tool: Parses EPS/PDF vector files to automatically position LED modules.',
              'BOM Generator: Calculates precise power supply capacities and creates detailed Bill of Materials.',
              'Web Panel: Node.js/CI4 portal handling 5 languages (EN, FR, ES, PT, DE).'
            ],
            stats: { 'CAD Format': 'EPS, PDF', 'i18n': '5 Languages', 'Engine': '.NET Parser' },
            featured: true
          },
          {
            title: 'Muktai Kitchen',
            description: 'A highly optimized Hotel Counter Management System engineered in a rapid 2-sprint execution cycle. Automates front-of-house ticketing and back-of-house cost analysis.',
            category: 'Web App',
            techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
            githubLink: 'https://github.com/Debashish9860',
            liveLink: '',
            features: [
              'Real-time Ticketing: Generates instantaneous service tokens for kitchen monitors.',
              'Inventory Ledger: Traces cost of raw materials against sales.',
              'Financial Audits: Automates daily cash flows and EOD (End of Day) financial reconciliations.'
            ],
            stats: { 'Sprints': '2 Sprints', 'Updates': 'Real-time WebSocket', 'Reporting': 'Daily EOD Summary' },
            featured: true
          },
          {
            title: 'Sai Controls CRM & PPC Suite',
            description: 'An enterprise Customer Relationship Management (CRM) and Production Planning & Control (PPC) manufacturing suite. Seamlessly connects inventory with assembly progress.',
            category: 'Web App',
            techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
            githubLink: 'https://github.com/Debashish9860',
            liveLink: '',
            features: [
              'CRM System: Tracks customer orders, client specifications, and sales pipeline.',
              'PPC Workflows: Automates assembly floor progressions, tracking raw parts and assembly steps.',
              'Allocation Engines: Intelligent materials allocation to reduce dead stock.'
            ],
            stats: { 'Workflow': 'Shop Floor', 'Savings': 'Intelligent Parts Allocation', 'Interface': 'Interactive Gantt' },
            featured: true
          },
          {
            title: 'Abstract Management System',
            description: 'Academic seminar registration and abstract submission platform developed for Abhinav Pharmacy College, Narhe, Pune.',
            category: 'Web App',
            techStack: ['Node.js', 'Express.js', 'PostgreSQL', 'EJS', 'Razorpay API'],
            githubLink: 'https://github.com/Debashish9860',
            liveLink: '',
            features: [
              'Academic Registration: Handles attendee profiles, delegate designations, and poster abstract attachments.',
              'Payment Gateway: Complete Razorpay integration for automated entry fees and currency management.',
              'Review Dashboard: Admin backend for reviewing and grading submitted scientific abstracts.'
            ],
            stats: { 'Client': 'Pharmacy College', 'Gateway': 'Razorpay Checkout', 'Database': 'PostgreSQL' },
            featured: false
          },
          {
            title: 'Eurobond R&D Vision Tool',
            description: 'An architectural visualization and image processing tool used to calculate aluminum panel layouts on structures under construction.',
            category: 'Research & Development',
            techStack: ['Python', 'Image Processing', 'OpenCV', 'Estimation Algorithms'],
            githubLink: 'https://github.com/Debashish9860',
            liveLink: '',
            features: [
              'Computer Vision Filters: Strips backgrounds, leaves, and visual noise from facade photos.',
              'Panel Fit Engine: Fits standard Aluminum Composite Panels (ACP) onto walls using visual bounds.',
              'BOM Estimator: Details panel shapes, dimensions, and scrap ratios.'
            ],
            stats: { 'Core Engine': 'OpenCV Vision', 'Output': 'ACP Layout Mockups', 'Savings': 'Reduced Manual Surveys' },
            featured: false
          }
        ];
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // IntersectionObserver to add 'in-view' class when cards & headings scroll onto the screen
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const targets = document.querySelectorAll('.tactical-card, .glitch-hover');
    targets.forEach(t => observer.observe(t));

    return () => {
      targets.forEach(t => observer.unobserve(t));
      observer.disconnect();
    };
  }, [projects, loading]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Custom Crosshair Reticle Follower (Desktop only) */}
      {!isMobile && (
        <div id="reticle" ref={reticleRef}>
          <div id="reticle-dot" />
        </div>
      )}

      {/* Sections rendering */}
      <Hero addLog={addLog} />
      <About addLog={addLog} />
      <Skills addLog={addLog} />
      <Projects projects={projects} loading={loading} addLog={addLog} />
      <Contact addLog={addLog} />
      <Footer />
      <Console logs={logs} isMobile={isMobile} />
    </div>
  );
};

export default Home;
