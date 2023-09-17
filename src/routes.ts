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
import { serviceImg } from "./controllers/serviceImgController";

const router = express.Router();

// Atualizar dados do usuário
router.put("/users/current", ensureAuth, userController.update);

// Atualizar senha do usuário
router.put(
  "/users/current/password",
  ensureAuth,
  userController.updatePassword
);

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
router.get("/userdetails", ensureAuth, userController.userDetails);

// Cria um novo cliente
router.post("/customer/create", ensureAuth, customersController.create);

// Deletar um cliente
router.delete("/customer/delete", ensureAuth, customersController.delete);

// Atualizar dados de um cliente
router.put("/customer/update/:id", ensureAuth, customersController.update);

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

// Detalhes de uma ordem de serviço
router.get("/service/:orderId", ensureAuth, serviceOrders.showDetails);

// Criar uma nova ordem de serviço
router.post("/service/create", ensureAuth, serviceOrders.create);

//Atualizar dados de uma ordem de serviço
router.put("/service/update/:id", ensureAuth, serviceOrders.update);

//Deletar uma ordem de serviço
router.delete("/service/delete", ensureAuth, serviceOrders.delete);

//Registra um novo usuário
router.post("/auth/register", userController.register);

//Autentica um usuário
router.post("/auth/login", userController.login);

// Adicionar imagem a um serviço
router.post("/service/:id/img", ensureAuth, serviceImg.create);

// Busca por imagens de um serviço
router.get("/service/:id/img", ensureAuth, serviceImg.search);

// Deleta uma imagem de um serviço
router.delete("/service/:id/img", ensureAuth, serviceImg.delete);

export { router };
