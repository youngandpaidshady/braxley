"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MovingBorderBtn } from "@/components/ui/moving-border-btn";
import { Button } from "@/components/ui/button";

// Zod validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(
      /^[\d\s\-\(\)]+$/,
      "Please enter a valid phone number"
    ),
  projectType: z.enum(["Residential", "Commercial", "Engineering"], {
    required_error: "Please select a project type",
  }),
  budgetRange: z.enum(["Under $50k", "$50k - $100k", "$100k - $250k", "$250k - $500k", "$500k+"], {
    required_error: "Please select a budget range",
  }),
  message: z
    .string()
    .min(10, "Tell us a bit more about your project"),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: undefined as "Residential" | "Commercial" | "Engineering" | undefined,
      budgetRange: undefined as "Under $50k" | "$50k - $100k" | "$100k - $250k" | "$250k - $500k" | "$500k+" | undefined,
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`New Project Inquiry from ${data.name}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n` +
        `Project Type: ${data.projectType}\n` +
        `Budget Range: ${data.budgetRange}\n\n` +
        `Project Details:\n${data.message}`
      );

      const mailtoLink = `mailto:Braxleynevimllc@outlook.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show success toast
      toast.success("Email Client Opened", {
        description: "Please send the email to complete your submission. We'll respond within 24 hours.",
        duration: 5000,
      });

      // Reset form after a delay
      setTimeout(() => {
        form.reset();
      }, 1000);
    } catch (error) {
      // Show error toast
      toast.error("Failed to open email client", {
        description: "Please contact us directly at Braxleynevimllc@outlook.com",
        duration: 5000,
      });
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 rounded-none">
        {/* Name Field - Underline Only Style */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field - Underline Only Style */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field - Underline Only Style */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(123) 456-7890"
                  className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Project Type Field - Underline Only Style */}
        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Project Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 focus:ring-0 focus:ring-offset-0 focus:border-primary transition-colors">
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Budget Range Field */}
        <FormField
          control={form.control}
          name="budgetRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Budget Range</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 focus:ring-0 focus:ring-offset-0 focus:border-primary transition-colors">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Under $50k">Under $50k</SelectItem>
                  <SelectItem value="$50k - $100k">$50k - $100k</SelectItem>
                  <SelectItem value="$100k - $250k">$100k - $250k</SelectItem>
                  <SelectItem value="$250k - $500k">$250k - $500k</SelectItem>
                  <SelectItem value="$500k+">$500k+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Field - Underline Only Style */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Project Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project vision, timeline, and any specific requirements..."
                  className="bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 min-h-[120px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button - Maintain MovingBorderBtn */}
        <div className="pt-6">
          <MovingBorderBtn
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Request"
            )}
          </MovingBorderBtn>
        </div>
      </form>
    </Form>
  );
};

