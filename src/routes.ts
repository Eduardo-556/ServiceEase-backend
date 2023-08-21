import express from "express";
import { userController } from "./controllers/usersController";
import { customersController } from "./controllers/customersController";
import { serviceOrders } from "./controllers/serviceOrderController";

const router = express.Router();

router.get("/users", userController.userList);
router.get("/users/:id", userController.userCustomers);
router.get("/userdetails/:id", userController.userDetails);
router.get("/users/:userId/search", customersController.search);
router.get("/customer/:id", customersController.showDetails);
router.get("/:userId/service/search", serviceOrders.search);

router.post("/auth/register", userController.register);
export { router };
