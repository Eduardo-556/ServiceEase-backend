import { Request, Response } from "express";
import { User } from "../models";
import { userServices } from "../services/usersService";
import { jwtService } from "../services/jwtService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const userController = {
  // GET /users
  userList: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET /users/:id
  userCustomers: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await userServices.findCustomersOfUser(id);
      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // GET userdetails/
  userDetails: async (req: AuthenticatedRequest, res: Response) => {
    const currentUser = req.user!;

    try {
      return res.json(currentUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // POST /auth/register
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone, birth, language } =
      req.body;
    try {
      const userAlreadyExists = await userServices.findByEmail(email);

      if (userAlreadyExists) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await userServices.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        birth,
        language,
        role: "user",
        subscriptionStatus: "inactive",
        subscriptionPlan: "basic",
      });

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  // POST /auth/login
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await userServices.findByEmail(email);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        if (!isSame) {
          return res.status(400).json({ message: "Invalid password" });
        }
        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };
        const token = jwtService.signToken(payload, "7d");

        return res.json({ authenticated: true, ...payload, token });
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;
    const { firstName, lastName, email, phone, birth, language } = req.body;

    try {
      const updatedUser = await userServices.update(id, {
        firstName,
        lastName,
        email,
        phone,
        birth,
        language,
      });
      return res.json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!;
    const { password, newPassword } = req.body;

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    try {
      user.checkPassword(password, async (err, isSame) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        if (!isSame) {
          return res.status(400).json({ message: "Invalid password" });
        }

        await userServices.updatePassword(user.id, newPassword);
        return res.status(204).send();
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
