import { DataTypes, Model, Optional } from "sequelize";
import { database } from "../database";
import bcrypt from "bcrypt";

type checkPasswordCallback = (err?: Error, isSame?: boolean) => void;

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  language: "pt-BR" | "en-US";
  role: "admin" | "user";
  subscriptionStatus: "active" | "inactive";
  subscriptionPlan: "basic" | "premium";
}

export interface UserCreationAttributes extends Optional<User, "id"> {}

export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {
  checkPassword: (password: string, callbackfn: checkPasswordCallback) => void;
}

export const User = database.define<UserInstance, User>(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    language: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    subscriptionStatus: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    subscriptionPlan: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);

User.prototype.checkPassword = function (
  password: string,
  callbackfn: checkPasswordCallback
) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      callbackfn(err);
    } else {
      callbackfn(err, isSame);
    }
  });
};
