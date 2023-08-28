import { Op } from "sequelize";
import { Customer, Service } from "../models";
import { ServiceCreationAttributes } from "../models/Service";

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

  createOrder: async (attributes: ServiceCreationAttributes) => {
    const order = await Service.create(attributes);
    return order;
  },

  updateOrder: async (id: string, attributes: ServiceCreationAttributes) => {
    const order = await Service.findByPk(id);
    const updatedOrder = await order?.update(attributes);
    return updatedOrder;
  },

  deleteOrder: async (id: string) => {
    const order = await Service.findByPk(id);
    await order?.destroy();
    return order;
  },
};
