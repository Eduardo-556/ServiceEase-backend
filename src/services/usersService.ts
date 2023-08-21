import { create } from "domain";
import { User } from "../models";
import { UserCreationAttributes } from "../models/User";

export const userServices = {
  findCustomersOfUser: async (id: string) => {
    const userListCustomers = await User.findByPk(id, {
      attributes: [
        "id",
        ["first_name", "firstName"],
        ["last_name", "lastName"],
        "email",
      ],
      include: {
        association: "customers",
        attributes: [
          "id",
          ["first_name", "firstName"],
          ["last_name", "lastName"],
          "email",
        ],
      },
    });
    return userListCustomers;
  },

  showDetailsOfUser: async (id: string) => {
    const userDetails = await User.findByPk(id);
    return userDetails;
  },

  findbyEmail: async (email: string) => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  },

  create: async (attributes: UserCreationAttributes) => {
    const newUser = await User.create(attributes);
    return newUser;
  },
};
