import { Context } from "koa";
import Joi from "@hapi/joi";
import { ValidationError } from "./errors";

export enum SourceKinds {
  BODY,
  QUERY,
  PARAMS,
  HEADERS
}

export function validate(
  schema: Joi.ObjectSchema,
  source: SourceKinds
): (ctx: Context, next: () => Promise<any>) => Promise<any> {
  return async (ctx, next) => {
    let data;

    console.log(ctx.params);
    console.log(ctx.request.query);

    switch (source) {
      case SourceKinds.BODY:
        data = ctx.request.body;
        break;
      case SourceKinds.PARAMS:
        data = ctx.params;
        break;
      case SourceKinds.HEADERS:
        data = ctx.request.headers;
        break;
      case SourceKinds.QUERY:
        data = ctx.request.query;
        break;
    }

    const { error, value } = schema.validate(data);
    if (error) throw new ValidationError(error.details);

    ctx.state.data = value;
    await next();
  };
}
