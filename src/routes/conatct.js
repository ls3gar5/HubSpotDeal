import { Router } from "express";
import * as contactController from "../controllers/contact";

const router = Router();

router.get('/', contactController.getConatcts);

export default router;