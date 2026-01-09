"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  verified: boolean;
  project?: string;
  ceoReply?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Dr. Elena Marquez",
    location: "St. Augustine Medical Center",
    rating: 5,
    text: "Braxley Nevim Elite Remodeling LLC expertly managed our outpatient wing renovation in a fully operational hospital setting. Their deep understanding of infection-control measures, phased construction, and strict adherence to Joint Commission and HIPAA standards ensured zero compromises to patient safety. Braxley’s personal involvement and calm, proactive communication alleviated every potential stress point, allowing our team to focus on care while delivering a modern, compliant facility ahead of schedule.",
    verified: true,
    project: "Hospital Administrator",
    ceoReply:
      "Dr. Marquez, thank you sincerely for your trust in us. Healthcare projects demand the highest respect for patient well-being and regulatory precision—principles that guide every decision we make. It was our privilege to shoulder the complexities, ensuring a seamless transformation for your exceptional team at St. Augustine.",
  },
  {
    id: "2",
    name: "James Harrington",
    location: "Azure Bay Luxury Resort & Spa",
    rating: 5,
    text: "Braxley and his team reimagined our oceanfront villas and spa with exquisite attention to aesthetic harmony—custom stonework, fluid indoor-outdoor transitions, and ambient lighting that enhances every moment. Amid peak season, Braxley’s steady leadership and meticulous planning shielded us from disruption, turning a visionary overhaul into a completely stress-free experience that has elevated guest satisfaction to new heights.",
    verified: true,
    project: "Resort Owner",
    ceoReply:
      "Mr. Harrington, your generous feedback is truly appreciated. Crafting serene, indulgent spaces that prioritize guest tranquility is at the core of our expertise. We are honored to have partnered with you at Azure Bay, absorbing the intricacies so you could focus on hospitality excellence.",
  },
  {
    id: "3",
    name: "Michael Torres",
    location: "Riverside Stadium",
    rating: 5,
    text: "Handling a multi-million-dollar premium suite and club-level upgrade in a 65,000-seat venue during live events required flawless scale and timing. Braxley Nevim Elite Remodeling LLC delivered on aggressive deadlines without interrupting a single game, minimizing noise and dust through expert coordination. Braxley’s composed oversight and transparent updates removed all high-stakes pressure, resulting in revenue-boosting spaces.",
    verified: true,
    project: "Stadium Operations Director",
    ceoReply:
      "Michael, thank you for this thoughtful endorsement. Large-scale projects under live operational constraints demand rigorous planning and respect for your schedule—standards we uphold relentlessly. We are grateful for Riverside Stadium’s confidence and proud to contribute to enhanced fan experiences.",
  },
  {
    id: "4",
    name: "Sophia Laurent",
    location: "The Ellington Grand Hotel",
    rating: 5,
    text: "Braxley provided genuine white-glove service throughout our comprehensive lobby, restaurant, and guest-room refresh. His team’s discreet execution, daily coordination, and selection of premium finishes ensured absolutely no guest disturbance while achieving timeless five-star elegance. Braxley’s attentive, reassuring presence dissolved every layer of complexity and stress.",
    verified: true,
    project: "Luxury Hotel Manager",
    ceoReply:
      "Sophia, we are deeply grateful for your words and partnership. Aligning our precision and discretion with the unparalleled hospitality standards of The Ellington Grand is always a privilege. Thank you for allowing us to elevate your iconic property seamlessly.",
  },
  {
    id: "5",
    name: "Victoria Langford",
    location: "Langford & Associates",
    rating: 5,
    text: "Braxley served as our strategic partner on a flagship office tower repositioning, delivering superior craftsmanship 8% under budget and weeks early—directly accelerating leasing and maximizing ROI. His transparent communication, value engineering, and calm leadership transformed a sophisticated, high-value project into a collaborative, low-stress success.",
    verified: true,
    project: "High-End Commercial Developer",
    ceoReply:
      "Victoria, your recognition means a great deal. Building enduring partnerships while driving measurable financial and aesthetic value is the foundation of our approach. We sincerely appreciate Langford & Associates’ trust and look forward to future landmark collaborations.",
  },
  {
    id: "6",
    name: "Robert Kline",
    location: "Mercy Regional Hospital",
    rating: 5,
    text: "Braxley’s mastery of compliance protocols and safety measures made our emergency department expansion exceptionally smooth in an active facility. His proactive risk mitigation and serene oversight eliminated all anxiety, delivering a state-of-the-art space that supports lifesaving care without compromise.",
    verified: true,
    project: "Hospital Administrator",
    ceoReply:
      "Robert, thank you for placing your confidence in us. Protecting clinical operations and patient safety during transformation is non-negotiable for our team. We are honored to have eased the process for Mercy Regional.",
  },
  {
    id: "7",
    name: "Isabella Voss",
    location: "Coral Reef Retreat",
    rating: 5,
    text: "Braxley elevated our spa and private cabanas to breathtaking luxury with refined materials and seamless design flow. Throughout the project, his composed guidance and flawless logistics absorbed every potential burden, creating tranquil retreats that delight guests daily.",
    verified: true,
    project: "Resort Owner",
    ceoReply:
      "Isabella, your praise is sincerely valued. Designing spaces that nurture relaxation and escape aligns perfectly with our passion. Thank you for the opportunity to enhance Coral Reef Retreat without disruption.",
  },
  {
    id: "8",
    name: "David Reyes",
    location: "Apex Arena",
    rating: 5,
    text: "Braxley tackled our premium lounge renovation at immense scale on compressed timelines, ensuring zero impact on events. His expert crew management and steady reassurance turned intense deadlines into a calm, successful delivery.",
    verified: true,
    project: "Stadium Operations Director",
    ceoReply:
      "David, we appreciate your trust immensely. Precision execution in high-pressure venues is our hallmark. Grateful to have supported Apex Arena’s vision.",
  },
  {
    id: "9",
    name: "Alexander Pierce",
    location: "The Sovereign Plaza",
    rating: 5,
    text: "Braxley’s white-glove precision refreshed our executive suites impeccably while maintaining full occupancy. His thoughtful daily presence and meticulous standards removed all stress, yielding spaces of understated grandeur.",
    verified: true,
    project: "Luxury Hotel Manager",
    ceoReply:
      "Alexander, thank you for this gracious testimonial. Upholding the distinguished legacy of The Sovereign Plaza with discreet excellence is our commitment.",
  },
  {
    id: "10",
    name: "Nathaniel Cole",
    location: "Cole Ventures",
    rating: 5,
    text: "Braxley drove outstanding ROI on our trophy property through strategic budgeting and superior finishes. His collaborative calm and transparent partnership made a complex repositioning feel effortlessly rewarding.",
    verified: true,
    project: "High-End Commercial Developer",
    ceoReply:
      "Nathaniel, your feedback honors us. Long-term value creation and trusted collaboration define our shared successes. Thank you.",
  },
  {
    id: "11",
    name: "Dr. Sarah Lin",
    location: "Horizon Medical Center",
    rating: 5,
    text: "Braxley ensured flawless regulatory compliance and patient safety during our advanced imaging suite upgrade. His reassuring leadership and anticipatory planning dissolved every concern in a live environment.",
    verified: true,
    project: "Hospital Administrator",
    ceoReply:
      "Dr. Lin, we are thankful for your partnership. Prioritizing uninterrupted care delivery remains our guiding principle.",
  },
  {
    id: "12",
    name: "Marcus Hale",
    location: "Serenity Cove Resort",
    rating: 5,
    text: "Braxley’s visionary enhancements to our beachfront amenities created stunning guest experiences with impeccable detail. He shielded us completely from renovation complexities, delivering serenity on every level.",
    verified: true,
    project: "Resort Owner",
    ceoReply:
      "Marcus, your words are deeply appreciated. Crafting peaceful luxury escapes is our privilege at Serenity Cove.",
  },
  {
    id: "13",
    name: "Laura Bennett",
    location: "Unity Field",
    rating: 5,
    text: "Braxley managed our expansive concourse upgrades at scale without missing critical deadlines. His composed expertise and proactive coordination kept operations seamless and stress-free.",
    verified: true,
    project: "Stadium Operations Director",
    ceoReply:
      "Laura, thank you sincerely. Delivering under live-event pressure with minimal impact is our standard at Unity Field.",
  },
  {
    id: "14",
    name: "Camille Dubois",
    location: "The Regent Palace",
    rating: 5,
    text: "Braxley delivered exquisite white-glove service for our ballroom and atrium restoration. His steady guidance ensured flawless results with zero guest awareness of the work.",
    verified: true,
    project: "Luxury Hotel Manager",
    ceoReply:
      "Camille, we are honored by your trust. Elevating timeless venues discreetly aligns with The Regent Palace’s legacy.",
  },
  {
    id: "15",
    name: "Oliver Grant",
    location: "Grant Properties",
    rating: 5,
    text: "Braxley maximized ROI on our mixed-use landmark through innovative solutions and budget mastery. His calm partnership transformed ambition into confident, low-stress execution.",
    verified: true,
    project: "High-End Commercial Developer",
    ceoReply:
      "Oliver, thank you deeply. Strategic collaboration and enduring value are the heart of our work together.",
  },
  {
    id: "16",
    name: "Thomas Reed",
    location: "Pinnacle Health",
    rating: 5,
    text: "Braxley’s rigorous safety protocols and compliance expertise made our surgical wing renovation serene and successful in a high-acuity setting.",
    verified: true,
    project: "Hospital Administrator",
    ceoReply:
      "Thomas, your confidence is valued. Safeguarding clinical excellence during change is our sacred duty.",
  },
  {
    id: "17",
    name: "Elena Moreau",
    location: "Vista Mar Luxury Resort",
    rating: 5,
    text: "Braxley created captivating guest spaces through refined aesthetics and thoughtful design. He absorbed all project stress, leaving only beauty and calm.",
    verified: true,
    project: "Resort Owner",
    ceoReply:
      "Elena, thank you. Guest delight through luxurious tranquility is always our aim at Vista Mar.",
  },
  {
    id: "18",
    name: "Gregory Stone",
    location: "Victory Stadium",
    rating: 5,
    text: "Braxley executed luxury box enhancements at massive scale with unyielding professionalism. His calm leadership ensured flawless timing and zero disruptions.",
    verified: true,
    project: "Stadium Operations Director",
    ceoReply:
      "Gregory, grateful for the partnership. Precision under pressure defines unforgettable venues.",
  },
  {
    id: "19",
    name: "Julian Hart",
    location: "The Imperial Suites",
    rating: 5,
    text: "Braxley’s impeccable white-glove approach elevated our penthouse collection seamlessly. His steady expertise eliminated every worry.",
    verified: true,
    project: "Luxury Hotel Manager",
    ceoReply:
      "Julian, your praise honors us. Discreet excellence supports The Imperial Suites’ distinguished standard.",
  },
  {
    id: "20",
    name: "Rebecca Holt",
    location: "Holt & Sterling Development",
    rating: 5,
    text: "Braxley delivered exceptional ROI and enduring partnership on our premier building. His calm mastery turned complexity into seamless success.",
    verified: true,
    project: "High-End Commercial Developer",
    ceoReply:
      "Rebecca, thank you profoundly. Building lasting relationships and superior value remains our highest priority.",
  },
];

const ReviewsCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
    watchDrag: true,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12 md:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-foreground mb-4 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold max-w-2xl mx-auto">
            Don&apos;t just take our word for it—hear from homeowners who&apos;ve
            experienced the Braxley Nevim Elite Remodeling LLC difference.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-start gap-4 md:gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3, margin: "0px" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-secondary/50 rounded-xl p-6 md:p-5 shadow-lg border border-border hover:shadow-xl transition-shadow flex flex-col min-h-full"
                    style={{ 
                      willChange: 'opacity, transform'
                    }}
                  >
                    {/* Header - Match image layout */}
                    <div className="mb-4">
                      <h3 className="font-bold text-foreground text-lg mb-1">
                        {review.location}
                      </h3>
                      {review.project && (
                        <p className="text-sm text-primary font-medium mb-3">
                          {review.project}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mb-3">
                        {review.verified && (
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" strokeWidth={1.5} />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {review.name}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted"
                          )}
                          strokeWidth={0}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-foreground leading-relaxed text-sm mb-4">
                      {review.text}
                    </p>

                    {/* CEO Reply - Match image style */}
                    {review.ceoReply && (
                      <div className="mt-auto pt-4 border-t border-border/50" style={{ borderWidth: '0.5px' }}>
                        <div className="flex items-start gap-3">
                          <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-semibold text-foreground">
                                Braxley Nevim
                              </span>
                              <span className="text-sm text-muted-foreground">
                                CEO
                              </span>
                            </div>
                            <p className="text-sm text-foreground/80 leading-relaxed">
                              {review.ceoReply}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "size-1.5 rounded-full transition-all",
                    index === selectedIndex ? "bg-primary" : "bg-primary/35"
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
export { ReviewsCarousel };

