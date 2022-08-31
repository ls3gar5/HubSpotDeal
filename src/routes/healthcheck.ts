import { Router } from 'express';
import * as healthcheck from '../controllers/health';

const router = Router();

router.get('/', healthcheck.getHealthCheck);
router.get('/lodash', healthcheck.getLodashTest)
router.get('/javatest', healthcheck.testJava)

export default router;