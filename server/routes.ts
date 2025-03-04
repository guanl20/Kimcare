import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVolunteerSchema, insertDonationSchema } from "@shared/schema";
import Stripe from "stripe";

// Initialize Stripe with API key (uses test key if not provided)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_default", {
  apiVersion: "2025-02-24.acacia",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/resources - Fetch all resources or filter by category
  app.get("/api/resources", async (req, res) => {
    const category = req.query.category as string;
    // If category is provided, filter resources, otherwise return all
    const resources = category
      ? await storage.getResourcesByCategory(category)
      : await storage.getResources();
    res.json(resources);
  });

  // GET /api/partners - Fetch all partner organizations
  app.get("/api/partners", async (_req, res) => {
    const partners = await storage.getPartners();
    res.json(partners);
  });

  // POST /api/volunteers - Register a new volunteer
  app.post("/api/volunteers", async (req, res) => {
    // Validate volunteer data using Zod schema
    const parsedData = insertVolunteerSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid volunteer data" });
    }
    const volunteer = await storage.createVolunteer(parsedData.data);
    res.json(volunteer);
  });

  // POST /api/donations/create-payment-intent - Create Stripe payment intent
  app.post("/api/donations/create-payment-intent", async (req, res) => {
    // Validate donation data using Zod schema
    const parsedData = insertDonationSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid donation data" });
    }

    try {
      // Create a Stripe payment intent for the donation
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parsedData.data.amount * 100, // Convert to cents for Stripe
        currency: "usd",
        metadata: {
          email: parsedData.data.email,
          name: parsedData.data.name,
        },
      });

      // Return the client secret for completing payment on frontend
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  });

  // POST /api/donations/confirm - Record a completed donation
  app.post("/api/donations/confirm", async (req, res) => {
    // Validate donation data using Zod schema
    const parsedData = insertDonationSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({ error: "Invalid donation data" });
    }

    // Store the donation record
    const donation = await storage.createDonation(parsedData.data);
    res.json(donation);
  });

  // Create and return HTTP server
  const httpServer = createServer(app);
  return httpServer;
}