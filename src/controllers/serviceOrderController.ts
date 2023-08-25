import { Request, Response } from "express";
import { serviceOrdersService } from "../services/serviceOrderService";

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
};
