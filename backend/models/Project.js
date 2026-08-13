import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a project category'],
      enum: ['Web App', 'Desktop App', 'Research & Development', 'System Integration'],
    },
    techStack: {
      type: [String],
      required: [true, 'Please specify the tech stack list'],
    },
    githubLink: {
      type: String,
      default: '',
    },
    liveLink: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    stats: {
      type: Map,
      of: String,
      default: {},
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);
