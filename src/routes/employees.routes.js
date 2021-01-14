import { Router } from "express";
// import "../controllers/employees.controllers";
import * as controller from "../controllers/employees.controllers";

const router = Router();

router.get("/", controller.findEmployees);
router.post("/", controller.createEmployee);
router.get("/:id", controller.findEmployee);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

export default router;
