import { useQuery } from "@tanstack/react-query";
import { type Partner } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Partners() {
  const { data: partners, isLoading } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });

  return (
    <div className="py-12 container px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Partners</h1>
          <p className="text-lg text-muted-foreground">
            Meet the organizations working with us to promote mental health awareness
            and provide support to our community.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="h-48" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {partners?.map(partner => (
              <Card key={partner.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-8 h-8 object-contain"
                    />
                    {partner.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{partner.description}</p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Visit Website →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
