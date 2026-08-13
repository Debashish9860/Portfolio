import express from 'express';
import { submitMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

router.route('/')
  .post(submitMessage)
  .get(getMessages);

export default router;
