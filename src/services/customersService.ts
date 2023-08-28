import { Op } from "sequelize";
import { Customer } from "../models";
import { CustomerCretionAttributes } from "../models/Customer";

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
  },

  update: async (id: string, attributes: CustomerCretionAttributes) => {
    const customer = await Customer.findByPk(id);
    await customer?.update(attributes);
    return customer;
  },

  create: async (attributes: CustomerCretionAttributes) => {
    const newcustomer = await Customer.create(attributes);
    return newcustomer;
  },

  delete: async (id: string) => {
    const customer = await Customer.findByPk(id);
    await customer?.destroy();
    return customer;
  },
};
