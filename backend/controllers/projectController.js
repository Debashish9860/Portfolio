import Project from '../models/Project.js';

// Pre-seeded projects data from Debashish's Resume
const fallbackProjects = [
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
    stats: {
      'Sprints Completed': '2 Sprints',
      'Data updates': 'Real-time WebSocket/Polling',
      'Finance Reporting': 'Automated EOD Summary'
    },
    featured: true,
    order: 1
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
    stats: {
      'Client': 'Abhinav Pharmacy College',
      'Payment Provider': 'Razorpay Checkout',
      'Database Engine': 'PostgreSQL'
    },
    featured: true,
    order: 2
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
    stats: {
      'Core Engine': 'Computer Vision (OpenCV)',
      'Output': 'ACP Layout Mockups',
      'Efficiency Gains': 'Reduced manual facades measurement'
    },
    featured: true,
    order: 3
  }
];

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    // If mongoose isn't connected or we fail to search, use fallback
    if (Project.db.readyState !== 1) {
      console.log('[API] DB not connected, returning fallback projects');
      return res.status(200).json({ success: true, source: 'cache', data: fallbackProjects });
    }

    const projects = await Project.find().sort({ order: 1 });
    
    if (!projects || projects.length === 0) {
      // If DB is connected but empty, let's return our fallback list
      console.log('[API] DB is empty, returning fallback projects');
      return res.status(200).json({ success: true, source: 'fallback', data: fallbackProjects });
    }

    res.status(200).json({ success: true, source: 'database', data: projects });
  } catch (error) {
    console.error(`[API] getProjects Error: ${error.message}`);
    res.status(200).json({ success: true, source: 'fallback-on-error', data: fallbackProjects });
  }
};

// @desc    Create a project (Optional seed endpoint)
// @route   POST /api/projects
// @access  Public (for dev environment seeding)
export const createProject = async (req, res) => {
  try {
    if (Project.db.readyState !== 1) {
      return res.status(503).json({ success: false, error: 'Database connection offline' });
    }
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
