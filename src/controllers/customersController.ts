import { Request, Response } from "express";
import { customersServices } from "../services/customersService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const customersController = {
  // GET users/:id/search?name=:name
  search: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.query;
    try {
      if (typeof name !== "string") throw new Error("name must be a string");
      const customers = await customersServices.findByName(id, name);
      return res.json(customers);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET users/:id/customer/:customerId
  showDetails: async (req: Request, res: Response) => {
    const { customerId } = req.params;
    try {
      const customerDetails = await customersServices.showDetails(customerId);
      return res.json(customerDetails);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // POST /customer/create
  create: async (req: Request, res: Response) => {
    const attributes = req.body;
    try {
      const newCustomer = await customersServices.create(attributes);
      return res.status(201).json(newCustomer);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Error creating customer" });
    }
  },

  // DELETE /customer/delete
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const customerId = req.body.customerId;
    const userId = req.user?.id;
    const requsetUserId = req.body.userId;
    try {
      if (userId !== Number(requsetUserId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const customer = await customersServices.delete(customerId);

      return res.status(200).json(customer);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Error deleting customer" });
    }
  },
};
