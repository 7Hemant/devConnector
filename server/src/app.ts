import Express from "express";
import * as dotenv from "dotenv";

import ConnectedDB from "./db/db";
dotenv.config();

const app = Express();

const PORT = process.env.PORT || 5000;

ConnectedDB().then(() => {
  app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
});
