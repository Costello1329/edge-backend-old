import Router from "koa-router";
import Joi from "@hapi/joi";
import { SourceKinds, validate } from "../middleware/validation";
import JobService from "../services/job";

const router = new Router({ prefix: "/job" });

const searchSchema = Joi.object({
  page: Joi.number()
    .min(0)
    .optional()
    .default(0),
  query: Joi.string()
    .trim()
    .min(3)
    .pattern(/^[\p{L}\d]+$/u)
    .optional()
    .default("")
});
router.get("/search", validate(searchSchema, SourceKinds.QUERY), async ctx => {
  const { page, query } = ctx.state.data;
  ctx.body = await JobService.search(page, query);
});

export default router;
