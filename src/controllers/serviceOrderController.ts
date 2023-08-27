import { Request, Response } from "express";
import { serviceOrdersService } from "../services/serviceOrderService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const serviceOrders = {
  // GET :id/service/search?name=:name
  search: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.query;
    try {
      if (typeof name !== "string") throw new Error("name must be a string");
      const serviceOrdersList = await serviceOrdersService.findOrders(id, name);

      return res.json(serviceOrdersList);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // POST /service/create
  create: async (req: Request, res: Response) => {
    const orderAttributes = req.body;
    try {
      const newOrder = await serviceOrdersService.createOrder(orderAttributes);

      return res.status(201).json(newOrder);
    } catch {
      return res.status(400).json({ message: "Error creating order" });
    }
  },

  // DELETE /service/delete
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const requestedUserId = req.body.userId;
    const serviceId = req.body.serviceId;
    console.log(userId);
    console.log(requestedUserId);
    console.log(serviceId);
    try {
      if (userId !== Number(requestedUserId)) {
        return res.status(403).json({ message: "Não autorizado" });
      }

      const deletedOrder = await serviceOrdersService.deleteOrder(serviceId);

      return res
        .status(200)
        .json({ message: "Order deleted successfully", deletedOrder });
    } catch {
      return res.status(400).json({ message: "Error deleting order" });
    }
  },
};
