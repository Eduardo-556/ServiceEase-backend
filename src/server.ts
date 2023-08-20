import express from "express";
import { database } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";

const app = express();

app.use(adminJs.options.rootPath, adminJsRouter);
app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  database.authenticate().then(() => {
    console.log("DB connection successfuly");
  });
  console.log(`Server started successfuly at port ${PORT}`);
});
