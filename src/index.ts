import { server } from "../config.json";
import Koa from "koa";
import parser from "koa-bodyparser";

import jobRouter from "./routes/job";
import { handleExceptions } from "./middleware/errors";
import logger from "./logger";

logger.info("Starting Application");
const app = new Koa();

app
  .use(handleExceptions)
  .use(parser())
  .use(jobRouter.routes())
  .use(jobRouter.allowedMethods());

export default app.listen({ host: server.host, port: server.port });
logger.info(`Server listening on ${server.host}:${server.port}`);
