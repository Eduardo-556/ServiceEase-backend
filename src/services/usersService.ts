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

  findByEmail: async (email: string) => {
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

  update: async (
    id: number,
    attributes: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      birth: Date;
      language: "pt-BR" | "en-US";
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });
    return updatedUsers[0];
  },

  updatePassword: async (id: number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      { password },
      { where: { id }, individualHooks: true, returning: true }
    );

    return updatedUsers[0];
  },
};
