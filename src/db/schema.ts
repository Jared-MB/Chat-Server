import { relations } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { randomUUID } from 'node:crypto'

export const users = sqliteTable('users', {
    id: text().$defaultFn(() => randomUUID()).primaryKey(),
    name: text(),
    username: text(),
})

export const usersRelations = relations(users, ({ many }) => ({
    messages: many(messages)
}))

export const messages = sqliteTable('messages', {
    id: text().$defaultFn(() => randomUUID()).primaryKey(),
    message: text(),
    ownerId: text(),
    receptorId: text(),
})

export const messagesRelations = relations(messages, ({ one }) => ({
    owner: one(users, {
        fields: [messages.ownerId],
        references: [users.id],
    }),
    receptor: one(users, {
        fields: [messages.receptorId],
        references: [users.id],
    }),
}))