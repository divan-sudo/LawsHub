import { Router } from "express";
import {
  createRegulation,
  getRegulations,
  getRegulationById,
  updateRegulation,
  deleteRegulation,
} from "../controllers/regulationController";

const router = Router();

router.post("/", createRegulation);
router.get("/", getRegulations);
router.get("/:id", getRegulationById);
router.put("/:id", updateRegulation);
router.delete("/:id", deleteRegulation);

export default router;
