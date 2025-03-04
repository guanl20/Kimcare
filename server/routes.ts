import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVolunteerSchema, insertDonationSchema } from "@shared/schema";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_default", {
  apiVersion: "2025-02-24.acacia",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get("/api/resources", async (req, res) => {
    const category = req.query.category as string;
    const resources = category
      ? await storage.getResourcesByCategory(category)
      : await storage.getResources();
    res.json(resources);
  });

  app.get("/api/partners", async (_req, res) => {
    const partners = await storage.getPartners();
    res.json(partners);
  });

  app.post("/api/volunteers", async (req, res) => {
    const parsedData = insertVolunteerSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid volunteer data" });
    }
    const volunteer = await storage.createVolunteer(parsedData.data);
    res.json(volunteer);
  });

  app.post("/api/donations/create-payment-intent", async (req, res) => {
    const parsedData = insertDonationSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid donation data" });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parsedData.data.amount * 100, // Convert to cents
        currency: "usd",
        metadata: {
          email: parsedData.data.email,
          name: parsedData.data.name,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  });

  app.post("/api/donations/confirm", async (req, res) => {
    const parsedData = insertDonationSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid donation data" });
    }

    const donation = await storage.createDonation(parsedData.data);
    res.json(donation);
  });

  const httpServer = createServer(app);
  return httpServer;
}