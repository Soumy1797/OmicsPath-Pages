import {sqliteTable,text,integer,primaryKey} from 'drizzle-orm/sqlite-core';
export const progress=sqliteTable('learning_progress',{userId:text('user_id').notNull(),lessonId:text('lesson_id').notNull(),completedAt:text('completed_at').notNull(),score:integer('score').notNull()},t=>[primaryKey({columns:[t.userId,t.lessonId]})]);
export const attempts=sqliteTable('learning_attempts',{id:text('id').primaryKey(),userId:text('user_id').notNull(),lessonId:text('lesson_id').notNull(),score:integer('score').notNull(),createdAt:text('created_at').notNull()});
