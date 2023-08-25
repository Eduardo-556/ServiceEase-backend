import express from "express";
import { userController } from "./controllers/usersController";
import { customersController } from "./controllers/customersController";
import { serviceOrders } from "./controllers/serviceOrderController";
import {
  checkAdminAccess,
  checkCustomerAccess,
  checkUserAccess,
  ensureAuth,
} from "./middlewares/auth";

const router = express.Router();
// Lista de usuários
router.get(
  "/list/users",
  ensureAuth,
  checkAdminAccess,
  userController.userList
);
// Lista de clientes de um usuário
router.get(
  "/users/:id",
  ensureAuth,
  checkUserAccess,
  userController.userCustomers
);
// Detalhes de um usuário
router.get(
  "/userdetails/:id",
  ensureAuth,
  checkUserAccess,
  userController.userDetails
);
// Pesquisar por clientes
router.get(
  "/users/:id/search",
  ensureAuth,
  checkUserAccess,
  customersController.search
);
// Exibir detalhes de um cliente
router.get(
  "/users/:id/customer/:customerId",
  ensureAuth,
  checkCustomerAccess,
  customersController.showDetails
);
// Pesquisa por ordens de serviço
router.get(
  "/:id/service/search",
  ensureAuth,
  checkUserAccess,
  serviceOrders.search
);

router.post("/auth/register", userController.register);
router.post("/auth/login", userController.login);
export { router };
