import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      default: '/',
    },
    userAgent: {
      type: String,
      default: 'Unknown',
    },
    ip: {
      type: String,
      default: 'Anonymous',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    capped: { size: 1024 * 1024, max: 5000 } // Cap analytics database size to 5,000 records / 1MB max for safety
  }
);

export default mongoose.model('Visit', visitSchema);
