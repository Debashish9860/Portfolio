import Message from '../models/Message.js';
import { sendEmail } from '../utils/sendEmail.js';

// @desc    Submit a contact form message
// @route   POST /api/messages
// @access  Public
export const submitMessage = async (req, res) => {
  const { name, email, subject, message, attachment } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Please provide all required fields (name, email, subject, message)' });
  }

  try {
    // If DB is offline, fall back to console logging & returning success status
    if (Message.db.readyState !== 1) {
      console.log('\n--- [CONTACT FORM SUBMISSION (OFFLINE MODE)] ---');
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log('------------------------------------------------\n');
      
      // Dispatch email notification even if DB is offline
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          await sendEmail({ name, email, subject, message, attachment });
          console.log('[API] Email notification sent successfully (DB offline mode).');
        } catch (emailError) {
          console.error(`[API] Email dispatch in offline DB mode failed: ${emailError.message}`);
        }
      }
      
      return res.status(200).json({ 
        success: true, 
        status: 'offline_logged', 
        message: 'Message processed and logged to console. (Database offline fallback)' 
      });
    }

    const newMessage = await Message.create({ name, email, subject, message });
    
    console.log(`[API] Message saved to database: ${newMessage._id}`);
    
    // Dispatch email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await sendEmail({ name, email, subject, message, attachment });
        console.log('[API] Email notification sent successfully.');
      } catch (emailError) {
        console.error(`[API] Email dispatch failed: ${emailError.message}`);
      }
    } else {
      console.log('[API] Email credentials not configured. Skipping email notification.');
    }
    
    res.status(201).json({ 
      success: true, 
      status: 'database_saved', 
      message: 'Thank you for your message! It has been successfully saved.',
      data: newMessage 
    });
  } catch (error) {
    console.error(`[API] submitMessage Error: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public (for admin dashboard demo)
export const getMessages = async (req, res) => {
  try {
    if (Message.db.readyState !== 1) {
      return res.status(200).json({ success: true, source: 'offline-mock', data: [] });
    }
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(`[API] getMessages Error: ${error.message}`);
    res.status(500).json({ success: false, error: 'Server error retrieving messages.' });
  }
};
