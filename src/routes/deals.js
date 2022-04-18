import { Router } from "express";
import * as dealsController from "../controllers/deal";

const router = Router();

router.get('/', dealsController.getdeals);

export default router;