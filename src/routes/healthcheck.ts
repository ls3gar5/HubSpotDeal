import { Router } from 'express';
import * as healthcheck from '../controllers/health';
 
const router = Router();

router.get('/', healthcheck.getHealthCheck);
router.get('/lodash', healthcheck.getLodashTest)
router.get('/javatest', healthcheck.testJava)

router.get('/aws/queues/url', healthcheck.getAWSUrlQueue)
router.get('/aws/queues/list', healthcheck.getAWSListQueues)
router.post('/aws/queues/mysns', healthcheck.postmySns)


export default router;