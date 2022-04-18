import { Router } from "express";
import * as healthcheck from "../controllers/healthcheck";

const router = Router();

router.get('/', healthcheck.getHealthCheck);

export default router;