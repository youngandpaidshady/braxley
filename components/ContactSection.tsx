"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { MagneticButton } from "./ui/magnetic-button";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budgetRange: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send form data to server API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType || undefined,
          budgetRange: formData.budgetRange || undefined,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Show success message
      setSubmitStatus("success");
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          budgetRange: "",
          message: "",
        });
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-12 md:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Newspaper Editorial Style Header */}
          <div className="border-b border-primary/40 mb-8 pb-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Project Submission</span>
            <span>Vol. 2026.01</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-extrabold text-foreground mb-4 tracking-tight">
            Submit a Project <span className="italic">Mandate.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to transform your space? Let&apos;s discuss your project.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground mb-8">
                Whether you have a specific project in mind or just want to
                explore possibilities, we&apos;re here to help bring your vision
                to life.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <a
                    href="tel:+1234567890"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a
                    href="mailto:Braxleynevimllc@outlook.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Braxleynevimllc@outlook.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Office</h4>
                  <p className="text-muted-foreground">
                    123 Luxury Lane
                    <br />
                    Beverly Hills, CA 90210
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h4 className="font-semibold text-foreground mb-2">
                Business Hours
              </h4>
              <p className="text-muted-foreground text-sm">
                Monday - Friday: 8:00 AM - 6:00 PM
                <br />
                Saturday: 9:00 AM - 2:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </motion.div>

          {/* Contact Form - Structural/Blueprint Style */}
          <motion.div
            id="message-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-none p-8 border border-border scroll-mt-24"
          >
            <h3 className="text-2xl font-serif font-bold text-foreground mb-8">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field - Underline Only */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 py-3 text-foreground focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field - Underline Only */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 py-3 text-foreground focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone Field - Underline Only */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 py-3 text-foreground focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                  placeholder="(123) 456-7890"
                />
              </div>

              {/* Project Type Field - Underline Only */}
              <div>
                <label
                  htmlFor="projectType"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 py-3 text-foreground focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                >
                  <option value="">Select a project type</option>
                  <option value="kitchen">Kitchen Remodel</option>
                  <option value="bathroom">Bathroom Renovation</option>
                  <option value="addition">Home Addition</option>
                  <option value="whole-home">Whole Home Remodel</option>
                  <option value="commercial">Commercial Project</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Budget Range Field - Underline Only */}
              <div>
                <label
                  htmlFor="budgetRange"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Budget Range
                </label>
                <select
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 py-3 text-foreground focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                >
                  <option value="">Select a budget range</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k-500k">$250,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
              </div>

              {/* Message Field - Underline Only */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 py-3 text-foreground focus:outline-none focus:ring-0 focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <div className="space-y-3">
                <MagneticButton strength={0.2} className="w-full">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed py-6 text-lg font-semibold rounded-none touch-manipulation min-h-[56px] transition-all"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" strokeWidth={1.5} />
                        Send Message
                      </>
                    )}
                  </Button>
                </MagneticButton>
                
                {/* Status Messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-primary font-medium text-center"
                  >
                    ✓ Email client opened. Please send the message to complete your submission.
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-destructive font-medium text-center"
                  >
                    ✗ Failed to open email client. Please contact us directly at Braxleynevimllc@outlook.com
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
