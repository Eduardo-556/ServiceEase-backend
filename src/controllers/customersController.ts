import { Request, Response } from "express";
import { customersServices } from "../services/customersService";

export const customersController = {
  // GET users/:id/search?name=:name
  search: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name } = req.query;

    try {
      if (typeof name !== "string") throw new Error("name must be a string");
      const customers = await customersServices.findByName(userId, name);
      return res.json(customers);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET customer/:id
  showDetails: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const customerDetails = await customersServices.showDetails(id);
      return res.json(customerDetails);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
