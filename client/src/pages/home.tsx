import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      
      <section className="py-20 container px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How We Help</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            <p className="text-muted-foreground mb-4">
              Access our comprehensive mental health resources and educational materials.
            </p>
            <Link href="/resources">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <p className="text-muted-foreground mb-4">
              Join our community of volunteers and make a difference in mental health.
            </p>
            <Link href="/volunteer">
              <Button variant="outline">Get Involved</Button>
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Partnership</h3>
            <p className="text-muted-foreground mb-4">
              Collaborate with us to create greater impact in mental health awareness.
            </p>
            <Link href="/partners">
              <Button variant="outline">Partner With Us</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Make a Difference Today</h2>
            <p className="text-muted-foreground mb-8">
              Your support helps us continue our mission of promoting mental health awareness
              and providing resources to those in need.
            </p>
            <Link href="/donate">
              <Button size="lg">Donate Now</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
