import Visit from '../models/Visit.js';

// @desc    Record a page visit
// @route   POST /api/analytics/visit
// @access  Public
export const recordVisit = async (req, res) => {
  const { path } = req.body;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress || 'Anonymous';

  try {
    // If DB is offline, log to standard console and return success
    if (Visit.db.readyState !== 1) {
      console.log(`[Telemetry] Page view logged: ${path} | UA: ${userAgent} | IP: ${ip} (Database offline fallback)`);
      return res.status(200).json({ success: true, status: 'offline_logged' });
    }

    const visit = await Visit.create({
      path: path || '/',
      userAgent,
      ip
    });

    res.status(201).json({ success: true, data: visit });
  } catch (error) {
    console.error(`[API] recordVisit Error: ${error.message}`);
    // Return 200 even on error so telemetry issues don't interrupt frontend users
    res.status(200).json({ success: true, status: 'error_ignored', error: error.message });
  }
};

// @desc    Get all page visits
// @route   GET /api/analytics/visit
// @access  Public (for admin dashboard demo)
export const getVisits = async (req, res) => {
  try {
    if (Visit.db.readyState !== 1) {
      return res.status(200).json({ success: true, source: 'offline-mock', data: [] });
    }
    const visits = await Visit.find().sort({ timestamp: -1 });
    res.status(200).json({ success: true, data: visits });
  } catch (error) {
    console.error(`[API] getVisits Error: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server error retrieving visits.' });
  }
};
