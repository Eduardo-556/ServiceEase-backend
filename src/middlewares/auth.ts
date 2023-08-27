import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/User";
import { jwtService } from "../services/jwtService";
import { userServices } from "../services/usersService";
import { JwtPayload } from "jsonwebtoken";
import { Customer } from "../models";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: "Não autorizado: nenhum token encontrado" });
  }

  const token = authorizationHeader.replace(/Bearer /, "");

  console.log(token);
  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res
        .status(401)
        .json({ message: "Não autorizado: token inválido" });
    }
    userServices.findByEmail((decoded as JwtPayload).email).then((user) => {
      req.user = user;
      next();
    });
  });
}

export function checkUserAccess(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userIdFromToken = req.user?.id;
  const requestedUserId = req.params.id;
  if (userIdFromToken === Number(requestedUserId)) {
    next();
  } else {
    res.status(403).json({ message: "Não autorizado" });
  }
}

export function checkAdminAccess(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userRole = req.user?.role;

  if (userRole === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Não autorizado" });
  }
}

export async function checkCustomerAccess(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const userIdFromToken = req.user?.id;
  const requestedUserId = req.params.id;
  const customerId = req.params.customerId;

  try {
    const customer = await Customer.findByPk(customerId);
    const userIdFromCustomer = customer?.userId;

    if (
      userIdFromToken === Number(requestedUserId) &&
      userIdFromToken === userIdFromCustomer
    ) {
      next();
    } else {
      res.status(403).json({ message: "Não autorizado" });
    }
  } catch {
    res.status(403).json({ message: "Não autorizado" });
  }
}
