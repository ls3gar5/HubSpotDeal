import { Router } from "express";
import * as download from "../controllers/download";

const router = Router();

router.get('/', download.get);
router.get('/test', download.getTest);

export default router;