import pool from "../pool";
import logger from "../logger";
import {
  JobModel,
  JobLocation,
  JobCompany,
  JobSalary,
  JobLevel,
  JobSpec,
  JobStack,
  JobContact
} from "../models/job";
import { HttpError, ErrorKinds } from "../middleware/errors";

export type SearchParams = {
  location: JobLocation;
  company: JobCompany;
  salary: JobSalary;
  level: JobLevel;
  spec: JobSpec;
  stack: JobStack;
  remote: boolean;
  query: string;
};

export type CreateParams = {
  contact: JobContact;
  location: JobLocation;
  company: JobCompany;
  salary: JobSalary;
  level: JobLevel;
  spec: JobSpec;
  stack: JobStack;
  remote: boolean;
  description: string;
};

export default class JobService {
  static async find(id: string): Promise<JobModel> {
    const statement = {
      name: "find_job",
      text: `
      SELECT *
      FROM jobs
      WHERE id = $1
      `,
      values: [id]
    };

    let result;
    try {
      result = await pool.query(statement);
    } catch (e) {
      logger.error(`${this.name} find: ${e}`);
      throw new HttpError(ErrorKinds.Database, "пезда", 500);
    }

    const {
      rows: [row]
    } = result;
    return {
      id: row.id,
      verified: row.verified,
      premium: row.premium,
      contact: {
        email: row.contact_email,
        phone: row.contact_phone,
        telegram: row.contact_telegram
      },
      location: {
        country: row.location_country,
        city: row.location_city
      },
      company: {
        name: row.company_name,
        industry: row.company_industry,
        website: row.company_website
      },
      salary: {
        min: Number(row.salary_min),
        max: Number(row.salary_max)
      },
      level: row.level,
      spec: row.spec,
      stack: row.stack,
      remote: row.remote,
      description: row.description
    } as JobModel;
  }

  static async search(params: SearchParams): Promise<Array<JobModel>> {
    const statement = {
      name: "search_jobs",
      text: `
        SELECT *
        FROM jobs
        WHERE verified = TRUE
          AND location_country ILIKE $1
          AND location_city ILIKE $2
          AND company_name ILIKE $3
          AND company_industry ILIKE $4
          AND salary_min >= $5
          AND salary_max <= $6
          AND level::TEXT ILIKE $7
          AND spec::TEXT ILIKE $8
          AND stack @> $9
          AND remote = $10
          AND description ILIKE $11
      `,
      values: [
        `%${params.location.country}%`,
        `%${params.location.city}%`,
        `%${params.company.name}%`,
        `%${params.company.industry}%`,
        params.salary.min,
        params.salary.max,
        `%${params.level}%`,
        `%${params.spec}%`,
        params.stack,
        params.remote,
        `%${params.query}%`
      ]
    };

    let result;
    try {
      result = await pool.query(statement);
    } catch (e) {
      logger.error(`${this.name} search: ${e}`);
      return [];
    }

    const { rows } = result;
    return rows.map(row => {
      return {
        id: row.id,
        verified: row.verified,
        premium: row.premium,
        contact: {
          email: row.contact_email,
          phone: row.contact_phone,
          telegram: row.contact_telegram
        },
        location: {
          country: row.location_country,
          city: row.location_city
        },
        company: {
          name: row.company_name,
          industry: row.company_industry,
          website: row.company_website
        },
        salary: {
          min: Number(row.salary_min),
          max: Number(row.salary_max)
        },
        level: row.level,
        spec: row.spec,
        stack: row.stack,
        remote: row.remote,
        description: row.description
      } as JobModel;
    });
  }

  static async create(params: CreateParams): Promise<JobModel> {
    const statement = {
      name: "create_job",
      text: `
      INSERT INTO jobs (id, verified, premium, contact_email, contact_phone, contact_telegram, location_country,
        location_city, company_name, company_industry, company_website, salary_min, salary_max, level, spec,
        stack, remote, description)
      VALUES (uuid_generate_v4(),
              TRUE,
              TRUE,
              $1,
              $2,
              $3,
              $4,
              $5,
              $6,
              $7,
              $8,
              $9,
              $10,
              $11,
              $12,
              $13,
              $14,
              $15)
      RETURNING *
      `,
      values: [
        params.contact.email,
        params.contact.phone,
        params.contact.telegram,
        params.location.country,
        params.location.city,
        params.company.name,
        params.company.industry,
        params.company.website,
        params.salary.min,
        params.salary.max,
        params.level,
        params.spec,
        params.stack,
        params.remote,
        params.description
      ]
    };

    let result;
    try {
      result = await pool.query(statement);
    } catch (e) {
      logger.error(`${this.name} create: ${e}`);
      throw new HttpError(ErrorKinds.Database, "пезда", 500);
    }

    const {
      rows: [row]
    } = result;
    return {
      id: row.id,
      verified: row.verified,
      premium: row.premium,
      contact: {
        email: row.contact_email,
        phone: row.contact_phone,
        telegram: row.contact_telegram
      },
      location: {
        country: row.location_country,
        city: row.location_city
      },
      company: {
        name: row.company_name,
        industry: row.company_industry,
        website: row.company_website
      },
      salary: {
        min: Number(row.salary_min),
        max: Number(row.salary_max)
      },
      level: row.level,
      spec: row.spec,
      stack: row.stack,
      remote: row.remote,
      description: row.description
    } as JobModel;
  }
}
