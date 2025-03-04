import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertDonationSchema, type InsertDonation } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function DonationForm() {
  const { toast } = useToast();
  const form = useForm<InsertDonation>({
    resolver: zodResolver(insertDonationSchema),
    defaultValues: {
      amount: 0,
      email: "",
      name: "",
      message: "",
      anonymous: false,
    },
  });

  const createPaymentIntent = useMutation({
    mutationFn: async (data: InsertDonation) => {
      const res = await apiRequest("POST", "/api/donations/create-payment-intent", data);
      return res.json();
    },
  });

  const confirmDonation = useMutation({
    mutationFn: async (data: InsertDonation) => {
      return apiRequest("POST", "/api/donations/confirm", data);
    },
  });

  async function onSubmit(data: InsertDonation) {
    try {
      const { clientSecret } = await createPaymentIntent.mutateAsync(data);
      // Here you would normally use Stripe Elements to collect payment details
      // and confirm the payment using the clientSecret
      
      await confirmDonation.mutateAsync(data);
      
      toast({
        title: "Thank you for your donation!",
        description: "Your support helps us make a difference.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error processing donation",
        description: "Please try again later.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Donation Amount ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share why you're supporting our cause"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Make donation anonymous</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={createPaymentIntent.isPending || confirmDonation.isPending}
        >
          {createPaymentIntent.isPending || confirmDonation.isPending
            ? "Processing..."
            : "Donate Now"}
        </Button>
      </form>
    </Form>
  );
}
