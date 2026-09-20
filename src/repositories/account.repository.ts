import { pool } from "../db/database.js";
import type { Account } from "../types/account.js";

export class AccountRepository {
  async findAll(): Promise<Account[]> {
    const result = await pool.query<Account>(
      `
      SELECT
        id,
        provider,
        identifier,
        display_name AS "displayName"
      FROM accounts
      ORDER BY created_at DESC
      `
    );

    return result.rows;
  }

  async findById(id: string): Promise<Account | undefined> {
    const result = await pool.query<Account>(
      `
      SELECT
        id,
        provider,
        identifier,
        display_name AS "displayName"
      FROM accounts
      WHERE id = $1
      `,
      [id]
    );

    return result.rows[0];
  }

  async create(account: Account): Promise<Account> {
    const result = await pool.query<Account>(
      `
      INSERT INTO accounts (
        id,
        provider,
        identifier,
        display_name
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        provider,
        identifier,
        display_name AS "displayName"
      `,
      [
        account.id,
        account.provider,
        account.identifier,
        account.displayName ?? null
      ]
    );

    return result.rows[0];
  }
}