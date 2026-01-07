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
  projectType: z.enum(["Kitchen", "Bath", "Whole Home", "Commercial"], {
    required_error: "Please select a project type",
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
      projectType: undefined as "Kitchen" | "Bath" | "Whole Home" | "Commercial" | undefined,
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate server delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", data);

      // Show success toast
      toast.success("Message Sent", {
        description: "Ivan will be in touch within 24 hours.",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      // Show error toast
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
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
                  <SelectItem value="Kitchen">Kitchen</SelectItem>
                  <SelectItem value="Bath">Bath</SelectItem>
                  <SelectItem value="Whole Home">Whole Home</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
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

