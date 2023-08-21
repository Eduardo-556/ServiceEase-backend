import { Op } from "sequelize";
import { Customer, Service } from "../models";

export const serviceOrdersService = {
  findOrders: async (userId: string, name: string) => {
    const orders = await Service.findAll({
      where: {
        [Op.or]: [
          { deviceModel: { [Op.iLike]: `%${name}%` } },
          { serviceDescription: { [Op.iLike]: `%${name}%` } },
          { serviceStatus: { [Op.iLike]: `%${name}%` } },
        ],
      },
      include: [
        {
          model: Customer,
          where: {
            userId: userId,
          },
        },
      ],
    });
    return orders;
  },
};
