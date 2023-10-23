import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { database } from "./database";

import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use(router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  database.authenticate().then(() => {
    console.log("DB connection successfuly");
  });
  console.log(`Server started successfuly at port ${PORT}`);
});
