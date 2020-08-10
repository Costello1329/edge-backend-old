import Router from "koa-router";
import Joi from "@hapi/joi";
import { SourceKinds, validate } from "../middleware/validation";
import JobService, { SearchParams, CreateParams } from "../services/job";
import { JobLevel, JobSpec } from "../models/job";

const router = new Router({ prefix: "/job" });

const searchSchema = Joi.object({
  location: Joi.object({
    country: Joi.string()
      .trim()
      .optional()
      .default(""),
    city: Joi.string()
      .trim()
      .optional()
      .default("")
  }).default(),
  company: Joi.object({
    name: Joi.string()
      .trim()
      .optional()
      .default(""),
    industry: Joi.string()
      .trim()
      .optional()
      .default("")
  }).default(),
  salary: Joi.object({
    min: Joi.number()
      .min(0)
      .max(99_999_999)
      .optional()
      .default(0),
    max: Joi.number()
      .min(0)
      .max(99_999_999)
      .optional()
      .default(99_999_999)
  }).default(),
  level: Joi.string()
    .valid(...Object.values(JobLevel))
    .optional()
    .default(""),
  spec: Joi.string()
    .valid(...Object.values(JobSpec))
    .optional()
    .default(""),
  stack: Joi.array()
    .items(Joi.string())
    .optional()
    .default([]),
  remote: Joi.bool()
    .optional()
    .default(false),
  query: Joi.string()
    .trim()
    .min(3)
    .pattern(/^[\p{L}\d]+$/u)
    .optional()
    .default("")
});
router.post("/search", validate(searchSchema, SourceKinds.BODY), async ctx => {
  const searchParams = ctx.state.data as SearchParams;
  ctx.body = await JobService.search(searchParams);
});

const createSchema = Joi.object({
  contact: Joi.object({
    email: Joi.string()
      .trim()
      .email()
      .required(),
    phone: Joi.string()
      .trim()
      .required(),
    telegram: Joi.string().required()
  }).required(),
  location: Joi.object({
    country: Joi.string()
      .trim()
      .required(),
    city: Joi.string()
      .trim()
      .required()
  }).required(),
  company: Joi.object({
    name: Joi.string()
      .trim()
      .required(),
    industry: Joi.string()
      .trim()
      .required(),
    website: Joi.string()
      .trim()
      .required()
  }).required(),
  salary: Joi.object({
    min: Joi.number()
      .min(0)
      .max(99_999_999)
      .required(),
    max: Joi.number()
      .min(0)
      .max(99_999_999)
      .required()
  }).required(),
  level: Joi.string()
    .valid(...Object.values(JobLevel))
    .required(),
  spec: Joi.string()
    .valid(...Object.values(JobSpec))
    .required(),
  stack: Joi.array()
    .items(Joi.string())
    .required(),
  remote: Joi.bool().required(),
  description: Joi.string()
    .trim()
    .required()
});
router.post("/create", validate(createSchema, SourceKinds.BODY), async ctx => {
  const createParams = ctx.state.data as CreateParams;
  ctx.body = await JobService.create(createParams);
});

const findSchema = Joi.object({
  id: Joi.string()
    .uuid()
    .required()
});
router.get("/:id", validate(findSchema, SourceKinds.PARAMS), async ctx => {
  const { id } = ctx.state.data;
  ctx.body = await JobService.find(id);
});

export default router;
