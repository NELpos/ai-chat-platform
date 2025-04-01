import { time } from "console";
import type { InferSelectModel } from "drizzle-orm";
import { int } from "drizzle-orm/mysql-core";
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  foreignKey,
  boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", (columnTypes) => ({
  id: columnTypes.uuid("id").primaryKey().notNull().defaultRandom(),
  userId: columnTypes.varchar("userId", { length: 32 }).notNull().unique(),
  email: columnTypes.varchar("email", { length: 64 }).notNull().unique(),
  password: columnTypes.varchar("password", { length: 64 }),
  createdAt: columnTypes.timestamp("createdAt").notNull().defaultNow(),
}));

export type User = InferSelectModel<typeof user>;

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  title: text("title").notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => user.id),
  visibility: varchar("visibility", { enum: ["public", "private"] })
    .notNull()
    .default("private"),
});

export type Chat = InferSelectModel<typeof chat>;

// // model Chat {
// //   id        String    @id @default(uuid())
// //   createdAt DateTime  @default(now())
// //   updatedAt DateTime  @updatedAt
// //   title     String?
// //   pageName  String
// //   messages  Message[]
// //   user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
// //   userId    Int
// //   events    Event[]
// // }

export const message = pgTable("Message", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  role: varchar("role").notNull(),
  content: json("content").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export type Message = InferSelectModel<typeof message>;

// // model Message {
// //   id          String   @id @default(uuid())
// //   userMessage String
// //   aiMessage   String
// //   createdAt   DateTime @default(now())
// //   toolCall    Json?
// //   toolResults Json?
// //   chat        Chat?    @relation(fields: [chatId], references: [id], onDelete: Cascade)
// //   chatId      String?
// //   user        User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
// //   userId      Int?
// //   liked       Boolean  @default(false)
// // }

export const event = pgTable("Event", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  type: varchar("type", {
    enum: ["alert", "jira"],
  }),
  assingneeId: uuid("assigneeId")
    .notNull()
    .references(() => user.id),
  assignee: varchar("assignee")
    .notNull()
    .references(() => user.userId),
  title: varchar("title").notNull(),
  content: json("content").notNull(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  status: varchar("status", {
    enum: [
      "open",
      "ready",
      "investigating",
      "analysis",
      "pending",
      "notify",
      "closed",
      "review",
      "escalation",
      "re-open",
    ],
  }).notNull(),
  priority: varchar("priority", {
    enum: ["low", "medium", "high", "critical"],
  }).notNull(),
});

export type Event = InferSelectModel<typeof event>;

// export const setting = pgTable("Setting", {
//   id: uuid("id").primaryKey().notNull().defaultRandom(),
//   userId: uuid("userId")
//     .notNull()
//     .references(() => user.id),
//   content: json("content").notNull(),
//   pageSize: int("pagesize").default(10),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
//   updatedAt: timestamp("updatedAt").notNull(),
// });

// // export const vote = pgTable(
// //   "Vote",
// //   {
// //     chatId: uuid("chatId")
// //       .notNull()
// //       .references(() => chat.id),
// //     messageId: uuid("messageId")
// //       .notNull()
// //       .references(() => message.id),
// //     isUpvoted: boolean("isUpvoted").notNull(),
// //   },
// //   (table) => {
// //     return {
// //       pk: primaryKey({ columns: [table.chatId, table.messageId] }),
// //     };
// //   }
// // );

// // export type Vote = InferSelectModel<typeof vote>;

// // export const document = pgTable(
// //   "Document",
// //   {
// //     id: uuid("id").notNull().defaultRandom(),
// //     createdAt: timestamp("createdAt").notNull(),
// //     title: text("title").notNull(),
// //     content: text("content"),
// //     kind: varchar("text", { enum: ["text", "code"] })
// //       .notNull()
// //       .default("text"),
// //     userId: uuid("userId")
// //       .notNull()
// //       .references(() => user.id),
// //   },
// //   (table) => {
// //     return {
// //       pk: primaryKey({ columns: [table.id, table.createdAt] }),
// //     };
// //   }
// // );

// // export type Document = InferSelectModel<typeof document>;

// // export const suggestion = pgTable(
// //   "Suggestion",
// //   {
// //     id: uuid("id").notNull().defaultRandom(),
// //     documentId: uuid("documentId").notNull(),
// //     documentCreatedAt: timestamp("documentCreatedAt").notNull(),
// //     originalText: text("originalText").notNull(),
// //     suggestedText: text("suggestedText").notNull(),
// //     description: text("description"),
// //     isResolved: boolean("isResolved").notNull().default(false),
// //     userId: uuid("userId")
// //       .notNull()
// //       .references(() => user.id),
// //     createdAt: timestamp("createdAt").notNull(),
// //   },
// //   (table) => ({
// //     pk: primaryKey({ columns: [table.id] }),
// //     documentRef: foreignKey({
// //       columns: [table.documentId, table.documentCreatedAt],
// //       foreignColumns: [document.id, document.createdAt],
// //     }),
// //   })
// // );

// // export type Suggestion = InferSelectModel<typeof suggestion>;
