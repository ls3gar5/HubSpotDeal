import { Router } from "express";
import * as contactController from "../controllers/contact";

const router = Router();

router.get('/', contactController.get);
router.get('/:email/search', contactController.search);

export default router;