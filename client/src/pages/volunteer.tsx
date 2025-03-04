import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VolunteerForm from "@/components/forms/volunteer-form";

export default function Volunteer() {
  return (
    <div className="py-12 container px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Volunteer With Us</h1>
          <p className="text-lg text-muted-foreground">
            Join our community of volunteers dedicated to promoting mental health awareness
            and supporting those in need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Why Volunteer?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span>🤝</span>
                  <span>Make a real difference in people's lives</span>
                </li>
                <li className="flex gap-2">
                  <span>📚</span>
                  <span>Gain valuable experience in mental health support</span>
                </li>
                <li className="flex gap-2">
                  <span>👥</span>
                  <span>Join a community of passionate volunteers</span>
                </li>
                <li className="flex gap-2">
                  <span>🌱</span>
                  <span>Personal growth and development opportunities</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span>💻</span>
                  <span>Online Resource Moderator</span>
                </li>
                <li className="flex gap-2">
                  <span>📞</span>
                  <span>Support Line Volunteer</span>
                </li>
                <li className="flex gap-2">
                  <span>📝</span>
                  <span>Content Creator</span>
                </li>
                <li className="flex gap-2">
                  <span>🎯</span>
                  <span>Event Coordinator</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Volunteer Application</CardTitle>
          </CardHeader>
          <CardContent>
            <VolunteerForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
