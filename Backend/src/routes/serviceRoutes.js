import { Router } from "express";
import { getAllServices, createService, updateService, deleteService} from "../controllers/service.controller.js";

const router = Router();

router.get("/get_services", getAllServices);
router.post("/add_service", createService);
router.delete("/delete_service/:id", deleteService);
router.patch("/update_service/:id", updateService);

export default router;