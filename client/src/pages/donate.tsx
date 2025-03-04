import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DonationForm from "@/components/forms/donation-form";

export default function Donate() {
  return (
    <div className="py-12 container px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-lg text-muted-foreground">
            Your donation helps us provide mental health resources and support to those in need.
            Every contribution makes a difference.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
          </CardHeader>
          <CardContent>
            <DonationForm />
          </CardContent>
        </Card>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">
              Fund mental health educational resources and workshops
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Community Support</h3>
            <p className="text-sm text-muted-foreground">
              Support local mental health initiatives and programs
            </p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">Research</h3>
            <p className="text-sm text-muted-foreground">
              Contribute to mental health research and awareness
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
