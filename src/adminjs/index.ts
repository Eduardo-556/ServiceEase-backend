import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { database } from "../database";
import AdminJSSequelize from "@adminjs/sequelize";
import { adminJsResources } from "./resoucers";

AdminJS.registerAdapter(AdminJSSequelize);

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

export const adminJsRouter = AdminJSExpress.buildRouter(adminJs);
