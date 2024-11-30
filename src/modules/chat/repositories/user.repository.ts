import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/db/connection';
import * as schema from 'src/db/schema'

@Injectable()
export class UserRepository {

    private db = db

    async findAll() {
        return await this.db.select().from(schema.users)
    }

    async findById(userId: string) {
        return await this.db.select().from(schema.users).where(eq(schema.users.id, userId))
    }

    async create({ username, name }: { username: string, name: string }) {
        return await this.db.insert(schema.users).values({ username, name }).returning()
    }

}
