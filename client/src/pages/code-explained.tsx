import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentExplainer } from "@/components/code/comment-explainer";

export default function CodeExplained() {
  // Example code with comments for demonstration
  const sampleCode = `// Initialize our mental health resource database
const resourceDb = new Database();

/* This function fetches mental health resources
 * based on the user's preferences and needs
 */
async function getPersonalizedResources(userId: string) {
  // First validate the user exists
  const user = await validateUser(userId);
  
  // Get user preferences from profile
  const preferences = user.getPreferences();
  
  // Return filtered resources
  return resourceDb.filter(preferences);
}`;

  // Custom explanations for specific comments
  const explanations = {
    "Initialize our mental health resource database": 
      "This line creates a new database connection specifically for storing and managing mental health resources like articles, videos, and support materials.",
    
    "This function fetches mental health resources\n * based on the user's preferences and needs":
      "This function is crucial for providing personalized content to users. It takes into account their interests, past interactions, and specific mental health topics they're interested in.",
    
    "First validate the user exists":
      "Security check to ensure only registered users can access personalized resources. This helps maintain privacy and data security.",
    
    "Get user preferences from profile":
      "Retrieves the user's saved preferences, including preferred content types (articles, videos, etc.), topics of interest, and content difficulty level.",
    
    "Return filtered resources":
      "Returns a customized list of resources that match the user's preferences, ensuring they receive relevant and helpful content.",
  };

  return (
    <div className="py-12 container px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Understanding Our Code</h1>
          <p className="text-lg text-muted-foreground">
            Hover over the information icons to learn more about what each part of the code does.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resource Management Example</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentExplainer code={sampleCode} explanations={explanations} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
