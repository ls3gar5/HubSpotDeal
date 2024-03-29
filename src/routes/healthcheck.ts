import { Router } from 'express';
import * as healthcheck from '../controllers/healthController';
 
const router = Router();

router.get('/', healthcheck.getHealthCheck);
router.get('/lodash', healthcheck.getLodashTest)
router.get('/javatest', healthcheck.testJava)
router.get('/pattern', healthcheck.pattern)

router.get('/aws/queues/url', healthcheck.getAWSUrlQueue)
router.get('/aws/queues/list', healthcheck.getAWSListQueues)
router.post('/aws/queues/mysns',healthcheck.getSuscriptionUnsubscribeConfirm, healthcheck.postMessage)

router.post('/producer', healthcheck.producedRabbitMQ)
router.post('/consumer', healthcheck.consumerRabbitMQ)

router.get('/destructuring', healthcheck.destructuring)

export default router;