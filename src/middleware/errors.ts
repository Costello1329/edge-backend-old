import { Context } from "koa";
import logger from "../logger";
import { secondsBetweenDates } from "../utils/date";
import _ from "lodash";

export enum ErrorKinds {
  Validation = "ValidationError",
  Database = "DBError",
  Privilege = "PrivilegeError",
  BadRequest = "BadRequest",
  Unknown = "Unknown"
}

export class HttpError extends Error {
  data: object | string;
  status: number;

  constructor(kind: ErrorKinds, data: object | string, status = 400) {
    super(kind);
    this.data = data;
    this.status = status;
  }
}

export class ValidationError extends HttpError {
  constructor(data: Array<object>) {
    super(
      ErrorKinds.Validation,
      data.map((x: any) => x.message).join(" | "),
      400
    );
  }
}

export async function handleExceptions(ctx: Context, next: () => Promise<any>) {
  const start = new Date();

  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = "json";

    if (err instanceof HttpError || err instanceof ValidationError) {
      logger.error(JSON.stringify(err.data));

      ctx.body = {
        kind: err.message,
        error: err.data
      };
    } else {
      logger.error(`UNHANDLED ERROR: ${err.message}`);

      ctx.body = {
        kind: ErrorKinds.Unknown,
        error: "Что-то пошло не так"
      };
    }
  }

  const end = new Date();

  const duration = `${secondsBetweenDates(start, end)}s`;
  const IP = _.defaultTo(ctx.headers["cf-connecting-ip"], "NO IP");
  const country = _.defaultTo(ctx.headers["cf-ipcountry"], "NO COUNTRY");

  logger.info(`${duration} | ${ctx.status} | ${country} | ${IP} | ${ctx.path}`);
}
