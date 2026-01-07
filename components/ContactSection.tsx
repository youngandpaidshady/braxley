"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      project: "",
      message: "",
    });
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
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Get Your Free Quote
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <a
                    href="tel:+1234567890"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a
                    href="mailto:info@ivanremodeling.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    info@ivanremodeling.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Service Area
                  </h4>
                  <p className="text-muted-foreground">
                    [City Name] and surrounding areas
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Business Hours:</strong>
                <br />
                Monday - Friday: 8:00 AM - 6:00 PM
                <br />
                Saturday: 9:00 AM - 3:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </motion.div>

          {/* Contact Form - Structural/Blueprint Style */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-none p-8 border border-border"
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
                  htmlFor="project"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Project Type
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 py-3 text-foreground focus:outline-none focus:ring-0 focus:border-primary transition-colors"
                >
                  <option value="">Select a project type</option>
                  <option value="kitchen">Kitchen Remodeling</option>
                  <option value="bathroom">Bathroom Renovation</option>
                  <option value="addition">Room Addition</option>
                  <option value="basement">Basement Finishing</option>
                  <option value="interior">Interior Remodeling</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message Field - Underline Only */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 rounded-none px-0 py-3 text-foreground focus:outline-none focus:ring-0 focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button - Maintain MovingBorderBtn style */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full text-lg py-6 rounded-full"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

