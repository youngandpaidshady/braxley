"use client";

import React from "react";
import { KineticSlider } from "./ui/kinetic-slider";
import {
    TeamCard,
    ServiceCardKinetic,
    TestimonialCardKinetic,
    ProjectCardKinetic,
} from "./ui/kinetic-cards";
import {
    Building2,
    Hospital,
    Hotel,
    Landmark,
    Trophy,
    Waves,
} from "lucide-react";

/* ========================================
   TEAM SECTION
   ======================================== */
const teamMembers = [
    {
        name: "Braxley Nevim",
        role: "Founder & CEO",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=530&fit=crop&q=80",
    },
    {
        name: "Marcus Chen",
        role: "Director of Operations",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=530&fit=crop&q=80",
    },
    {
        name: "Elena Rodriguez",
        role: "Lead Architect",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=530&fit=crop&q=80",
    },
    {
        name: "James Harrington",
        role: "Project Manager",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=530&fit=crop&q=80",
    },
    {
        name: "Sofia Laurent",
        role: "Design Director",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=530&fit=crop&q=80",
    },
];

export const TeamSection: React.FC = () => {
    return (
        <section className="bg-background">
            <KineticSlider
                title="Our Leadership"
                subtitle="The Team"
                cardSpacing={20}
            >
                {teamMembers.map((member, index) => (
                    <TeamCard
                        key={index}
                        name={member.name}
                        role={member.role}
                        imageUrl={member.imageUrl}
                    />
                ))}
            </KineticSlider>
        </section>
    );
};

/* ========================================
   SERVICES SECTION
   ======================================== */
const services = [
    { icon: Trophy, title: "Stadium Construction" },
    { icon: Hospital, title: "Healthcare Facilities" },
    { icon: Waves, title: "Luxury Resorts" },
    { icon: Hotel, title: "Grand Hotels" },
    { icon: Building2, title: "Commercial Towers" },
    { icon: Landmark, title: "Historic Restoration" },
];

export const ServicesKineticSection: React.FC = () => {
    return (
        <section className="bg-background">
            <KineticSlider
                title="What We Build"
                subtitle="Our Services"
                cardSpacing={16}
            >
                {services.map((service, index) => (
                    <ServiceCardKinetic
                        key={index}
                        icon={service.icon}
                        title={service.title}
                    />
                ))}
            </KineticSlider>
        </section>
    );
};

/* ========================================
   TESTIMONIALS SECTION
   ======================================== */
const testimonials = [
    {
        quote: "Braxley Nevim Elite Remodeling LLC expertly managed our outpatient wing renovation in a fully operational hospital setting. Their deep understanding of infection-control measures ensured zero compromises to patient safety.",
        author: "Dr. Elena Marquez",
        role: "Hospital Administrator",
        company: "St. Augustine Medical",
    },
    {
        quote: "Braxley and his team reimagined our oceanfront villas with exquisite attention to aesthetic harmony. The entire project was completely stress-free.",
        author: "James Harrington",
        role: "Resort Owner",
        company: "Azure Bay Resort",
    },
    {
        quote: "Handling a multi-million-dollar premium suite upgrade in a 65,000-seat venue during live events required flawless timing. They delivered without interrupting a single game.",
        author: "Michael Torres",
        role: "Operations Director",
        company: "Riverside Stadium",
    },
    {
        quote: "Braxley provided genuine white-glove service throughout our lobby and guest-room refresh. Absolutely no guest disturbance while achieving timeless five-star elegance.",
        author: "Sophia Laurent",
        role: "Hotel Manager",
        company: "The Ellington Grand",
    },
    {
        quote: "Our office tower repositioning was delivered 8% under budget and weeks early—directly accelerating leasing and maximizing ROI.",
        author: "Victoria Langford",
        role: "Commercial Developer",
        company: "Langford & Associates",
    },
];

export const TestimonialsKineticSection: React.FC = () => {
    return (
        <section className="bg-background">
            <KineticSlider
                title="Client Testimonials"
                subtitle="Trust"
                cardSpacing={20}
            >
                {testimonials.map((testimonial, index) => (
                    <TestimonialCardKinetic
                        key={index}
                        quote={testimonial.quote}
                        author={testimonial.author}
                        role={testimonial.role}
                        company={testimonial.company}
                    />
                ))}
            </KineticSlider>
        </section>
    );
};

/* ========================================
   PROJECTS SECTION
   ======================================== */
const projects = [
    {
        title: "Riverside Stadium",
        category: "Stadium",
        imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=450&fit=crop&q=80",
        stats: [
            { value: "65,000", label: "Seats" },
            { value: "$12M", label: "Value" },
        ],
    },
    {
        title: "St. Augustine Medical",
        category: "Healthcare",
        imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=450&fit=crop&q=80",
        stats: [
            { value: "120", label: "Beds" },
            { value: "0", label: "Incidents" },
        ],
    },
    {
        title: "Azure Bay Resort",
        category: "Luxury Resort",
        imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=450&fit=crop&q=80",
        stats: [
            { value: "48", label: "Villas" },
            { value: "5★", label: "Rating" },
        ],
    },
    {
        title: "The Ellington Grand",
        category: "Hotel",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=450&fit=crop&q=80",
        stats: [
            { value: "280", label: "Rooms" },
            { value: "1892", label: "Est." },
        ],
    },
    {
        title: "Pinnacle Tower",
        category: "Commercial",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop&q=80",
        stats: [
            { value: "42", label: "Floors" },
            { value: "$50M", label: "Value" },
        ],
    },
];

export const ProjectsKineticSection: React.FC = () => {
    return (
        <section className="bg-background">
            <KineticSlider
                title="Featured Projects"
                subtitle="Portfolio"
                cardSpacing={24}
            >
                {projects.map((project, index) => (
                    <ProjectCardKinetic
                        key={index}
                        title={project.title}
                        category={project.category}
                        imageUrl={project.imageUrl}
                        stats={project.stats}
                    />
                ))}
            </KineticSlider>
        </section>
    );
};

/* ========================================
   COMBINED EXPORT
   ======================================== */
export { KineticSlider } from "./ui/kinetic-slider";
export {
    TeamCard,
    ServiceCardKinetic,
    TestimonialCardKinetic,
    ProjectCardKinetic,
} from "./ui/kinetic-cards";
