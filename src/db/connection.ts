import { AnyD1Database, drizzle } from 'drizzle-orm/d1';

export interface Env {
    DB: AnyD1Database;
}
export default {
    async fetch(request: Request, env: Env) {
        const db = drizzle(env.DB);
    },
};