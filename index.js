import dotenv from "dotenv";
// import { logger } from './shared/logger'
import createServer from "./app";

dotenv.config();

const port = process.env.PORT || 8000;

const app = createServer();

try {
  app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.log(`Error occured: ${error.message}`);
}
