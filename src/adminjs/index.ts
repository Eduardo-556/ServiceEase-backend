import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { database } from "../database";
import AdminJSSequelize from "@adminjs/sequelize";
import { adminJsResources } from "./resoucers";
import { User } from "../models";
import bcrypt from "bcrypt";
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment";
import session from "express-session";
import connectSession from "connect-session-sequelize";

const SequelizeStore = connectSession(session.Store);
const store = new SequelizeStore({ db: database });
AdminJS.registerAdapter(AdminJSSequelize);
store.sync();
export const adminJs = new AdminJS({
  databases: [database],
  rootPath: "/admin",
  resources: adminJsResources,
  branding: {
    companyName: "ServiceEasy",
    logo: "/service.png",
    theme: {
      colors: {
        primary100: "#c32e58",
        primary80: "#c32e58",
        primary60: "#c32e58",
        primary40: "#c32e58",
        primary20: "#c32e58",
        grey100: "#151515",
        grey80: "#333333",
        grey60: "#4d4d4d",
        grey40: "#666666",
        grey20: "#dddddd",
        filterBg: "#333333",
        accent: "#151515",
        hoverBg: "#161d34",
        bg: "#161d34",
      },
    },
  },
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });

      if (user && user.role === "admin") {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          return user;
        }
      }
      return false;
    },
    cookiePassword: ADMINJS_COOKIE_PASSWORD,
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: ADMINJS_COOKIE_PASSWORD,
  }
);
