import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const volunteers = pgTable("volunteers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  skills: text("skills").notNull(),
  availability: text("availability").notNull(),
  experience: text("experience").default("").notNull(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  message: text("message").default("").notNull(),
  anonymous: boolean("anonymous").default(false).notNull(),
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  website: text("website").notNull(),
  logo: text("logo").notNull(),
  type: text("type").notNull(), // sponsor, collaborator, etc.
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  tags: text("tags").array().default([]).notNull(),
});

export const insertVolunteerSchema = createInsertSchema(volunteers);
export const insertDonationSchema = createInsertSchema(donations);
export const insertPartnerSchema = createInsertSchema(partners);
export const insertResourceSchema = createInsertSchema(resources);

export type InsertVolunteer = z.infer<typeof insertVolunteerSchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Volunteer = typeof volunteers.$inferSelect;
export type Donation = typeof donations.$inferSelect;
export type Partner = typeof partners.$inferSelect;
export type Resource = typeof resources.$inferSelect;