import {
  type Volunteer, type InsertVolunteer,
  type Donation, type InsertDonation,
  type Partner, type InsertPartner,
  type Resource, type InsertResource
} from "@shared/schema";

export interface IStorage {
  // Volunteers
  getVolunteers(): Promise<Volunteer[]>;
  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;
  
  // Donations
  getDonations(): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  
  // Partners
  getPartners(): Promise<Partner[]>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  
  // Resources
  getResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  createResource(resource: InsertResource): Promise<Resource>;
}

export class MemStorage implements IStorage {
  private volunteers: Map<number, Volunteer>;
  private donations: Map<number, Donation>;
  private partners: Map<number, Partner>;
  private resources: Map<number, Resource>;
  private currentIds: { [key: string]: number };

  constructor() {
    this.volunteers = new Map();
    this.donations = new Map();
    this.partners = new Map();
    this.resources = new Map();
    this.currentIds = {
      volunteers: 1,
      donations: 1,
      partners: 1,
      resources: 1
    };

    // Add some initial resources
    this.initializeResources();
    this.initializePartners();
  }

  private initializeResources() {
    const initialResources: InsertResource[] = [
      {
        title: "Understanding Anxiety",
        description: "Learn about anxiety disorders and coping mechanisms",
        category: "Mental Health 101",
        content: "Comprehensive guide about anxiety...",
        tags: ["anxiety", "mental health", "self-help"]
      },
      {
        title: "Meditation Basics",
        description: "Introduction to meditation practices",
        category: "Self-Care",
        content: "Guide to meditation techniques...",
        tags: ["meditation", "mindfulness", "wellness"]
      }
    ];

    initialResources.forEach(resource => this.createResource(resource));
  }

  private initializePartners() {
    const initialPartners: InsertPartner[] = [
      {
        name: "Mental Health Foundation",
        description: "Leading mental health research organization",
        website: "https://example.com",
        logo: "mhf-logo",
        type: "collaborator"
      }
    ];

    initialPartners.forEach(partner => this.createPartner(partner));
  }

  async getVolunteers(): Promise<Volunteer[]> {
    return Array.from(this.volunteers.values());
  }

  async createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer> {
    const id = this.currentIds.volunteers++;
    const newVolunteer = { ...volunteer, id };
    this.volunteers.set(id, newVolunteer);
    return newVolunteer;
  }

  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.currentIds.donations++;
    const newDonation = { ...donation, id };
    this.donations.set(id, newDonation);
    return newDonation;
  }

  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const id = this.currentIds.partners++;
    const newPartner = { ...partner, id };
    this.partners.set(id, newPartner);
    return newPartner;
  }

  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      resource => resource.category === category
    );
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const id = this.currentIds.resources++;
    const newResource = { ...resource, id };
    this.resources.set(id, newResource);
    return newResource;
  }
}

export const storage = new MemStorage();
