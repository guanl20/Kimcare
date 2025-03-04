import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div 
      className="relative py-32 bg-gradient-to-b from-primary/10 to-background"
      style={{
        backgroundImage: `url(${getImage("calming")})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-background/80" />
      <div className="container px-4 relative">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Supporting Mental Health & Wellbeing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join us in creating a world where mental health is understood,
            supported, and prioritized. Together, we can make a difference.
          </p>
          <div className="flex gap-4">
            <Link href="/donate">
              <Button size="lg">Support Our Cause</Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getImage(type: "calming" | "community" | "support") {
  const images = {
    calming: "https://images.unsplash.com/photo-1447758501994-89bb4bae35d3",
    community: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    support: "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
  };
  return images[type];
}
