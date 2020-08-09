import pool from "../pool";
import logger from "../logger";
import { JobModel } from "../models/job";

export default class JobService {
  static async search(page: number, query: string): Promise<Array<JobModel>> {
    const limit = 10;
    const offset = page * limit;
    query = `%${query}%`;

    const statement = {
      name: "search_jobs",
      text: `
        SELECT *
        FROM jobs
        WHERE verified = TRUE
          AND description ILIKE $1
        OFFSET $2 LIMIT $3
      `,
      values: [query, offset, limit]
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
        salary: {
          min: Number(row.salary_min),
          max: Number(row.salary_max)
        },
        scope: row.scope,
        stack: row.stack,
        remote: row.remote,
        description: row.description
      } as JobModel;
    });
  }
}
