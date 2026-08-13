import express from 'express';
import { recordVisit, getVisits } from '../controllers/analyticsController.js';

const router = express.Router();

router.route('/visit')
  .post(recordVisit)
  .get(getVisits);

export default router;
