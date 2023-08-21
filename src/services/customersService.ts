import { Op } from "sequelize";
import { Customer } from "../models";

export const customersServices = {
  findByName: async (userId: string, name: string) => {
    const customers = await Customer.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${name}%` } },
          { lastName: { [Op.iLike]: `%${name}%` } },
        ],
        userId: userId,
      },
    });
    return customers;
  },

  showDetails: async (id: string) => {
    const customer = await Customer.findByPk(id);
    return customer;
  }
};
