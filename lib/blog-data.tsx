// Blog posts data and content
// In production, this would fetch from a CMS
import React from "react";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  datePublished: string;
  timeline?: string[];
  tags?: string[];
  views?: number;
  featured?: boolean;
  content: JSX.Element;
}

// Full article content for each post
const articleContent: Record<string, JSX.Element> = {
  "seismic-2026": (
    <>
      <p>
        The 2026 building codes have introduced significant changes to seismic retrofitting requirements,
        particularly for historic masonry structures in high-risk seismic zones. As a general contractor
        specializing in compliance and structural integrity, we&apos;ve analyzed the new regulations and their
        practical implications.
      </p>
      
      <h2>Understanding the New Requirements</h2>
      <p>
        The updated codes mandate comprehensive structural assessments for buildings constructed before 1980,
        with particular focus on unreinforced masonry (URM) structures. These assessments must be conducted
        by licensed structural engineers and submitted to local building departments within 18 months of the
        code&apos;s effective date.
      </p>
      
      <h2>Carbon-Fiber vs. Traditional Steel Reinforcement</h2>
      <p>
        Our analysis of recent retrofitting projects reveals a compelling case for carbon-fiber reinforcement
        systems. While initial material costs are 15-20% higher than traditional steel, the installation
        efficiency and long-term performance benefits often offset the premium.
      </p>
      
      <h3>Cost-Benefit Analysis</h3>
      <ul>
        <li><strong>Installation Time:</strong> Carbon-fiber systems reduce on-site labor by approximately 40%</li>
        <li><strong>Structural Performance:</strong> Superior tensile strength-to-weight ratio</li>
        <li><strong>Maintenance:</strong> Non-corrosive properties eliminate long-term maintenance concerns</li>
        <li><strong>Aesthetics:</strong> Minimal visual impact on historic facades</li>
      </ul>
      
      <h2>Implementation Timeline</h2>
      <p>
        A typical seismic retrofitting project follows a structured timeline: initial assessment and planning
        (4-6 weeks), engineering design and permit acquisition (6-8 weeks), material procurement (2-4 weeks),
        and on-site installation (8-12 weeks depending on building size).
      </p>
      
      <h2>Case Study: 1920s Commercial Building</h2>
      <p>
        Our recent project involving a 15,000 sq ft historic commercial building in downtown Los Angeles
        demonstrated the effectiveness of carbon-fiber reinforcement. The project was completed 3 weeks
        ahead of schedule and came in 8% under budget, while exceeding all structural performance requirements.
      </p>
      
      <h2>Conclusion</h2>
      <p>
        The 2026 codes represent a significant step forward in urban seismic safety. While compliance requires
        substantial investment, the long-term benefits to building owners and occupants justify the costs.
        Early engagement with qualified contractors and engineers is essential for navigating these requirements
        efficiently.
      </p>
    </>
  ),
  
  "smart-glass-roi": (
    <>
      <p>
        Electrochromic glass technology has evolved from a premium feature to a cost-effective solution for
        commercial office environments. Our analysis of LEED Platinum projects reveals compelling ROI data
        that challenges traditional assumptions about smart glass implementation.
      </p>
      
      <h2>Energy Cost Savings</h2>
      <p>
        Dynamic fenestration systems can reduce HVAC energy consumption by 25-35% in commercial office
        buildings. Our 50,000 sq ft office build-out in San Francisco demonstrated annual energy savings of
        $47,000, with a payback period of 6.2 years.
      </p>
      
      <h2>LEED Certification Impact</h2>
      <p>
        Smart glass contributes significantly to LEED certification points, particularly in the Energy
        and Atmosphere category. Our projects have consistently achieved 8-12 additional LEED points through
        electrochromic glass implementation.
      </p>
      
      <h2>Real-World Performance Data</h2>
      <p>
        Post-occupancy evaluations from our completed projects show:
      </p>
      <ul>
        <li>Average 28% reduction in cooling loads during peak summer months</li>
        <li>15% reduction in artificial lighting requirements</li>
        <li>Improved occupant satisfaction scores (average +12 points on WELL Building Standard surveys)</li>
        <li>Reduced glare complaints by 67%</li>
      </ul>
      
      <h2>Installation Best Practices</h2>
      <p>
        Successful smart glass implementation requires careful coordination between electrical, glazing, and
        automation contractors. Our integrated approach ensures seamless integration with building management
        systems and optimal performance from day one.
      </p>
      
      <h2>Conclusion</h2>
      <p>
        The ROI of dynamic fenestration extends beyond energy savings to include improved occupant experience,
        enhanced building value, and sustainability credentials. For commercial developers and building owners,
        smart glass represents a strategic investment in building performance and market positioning.
      </p>
    </>
  ),
  
  "oshpd-3-requirements": (
    <>
      <p>
        The 2026 building codes have introduced significant updates to OSHPD 3 requirements for outpatient
        healthcare facilities. These changes affect electrical systems, HVAC design, and overall facility
        compliance standards.
      </p>
      
      <h2>Key Changes in 2026 Codes</h2>
      <p>
        The most significant updates include enhanced requirements for emergency power systems, stricter
        ventilation standards for procedure rooms, and new requirements for medical gas system redundancy.
        These changes affect both new construction and major renovations.
      </p>
      
      <h2>Electrical Compliance</h2>
      <p>
        New requirements mandate that all critical care areas maintain emergency power within 10 seconds of
        utility failure, down from the previous 15-second standard. This requires upgraded transfer switch
        specifications and potentially larger generator capacity.
      </p>
      
      <h2>HVAC System Updates</h2>
      <p>
        Procedure rooms now require 20 air changes per hour (up from 15), with enhanced filtration requirements.
        This impacts both equipment sizing and ductwork design, potentially increasing mechanical system costs
        by 12-18% for new facilities.
      </p>
      
      <h2>Medical Gas Systems</h2>
      <p>
        The new codes require redundant medical gas systems for facilities with more than 10 procedure rooms.
        This includes backup compressors, additional storage capacity, and enhanced monitoring systems.
      </p>
      
      <h2>Compliance Timeline</h2>
      <p>
        Facilities planning construction or major renovations should begin compliance planning immediately.
        The new requirements apply to all projects with building permits issued after January 1, 2026.
      </p>
      
      <h2>Conclusion</h2>
      <p>
        Navigating OSHPD 3 requirements requires early engagement with experienced healthcare construction
        specialists. The 2026 updates represent a significant shift toward enhanced safety and reliability
        standards that will benefit patients and facility operators alike.
      </p>
    </>
  ),
  
  "2026-material-trends": (
    <>
      <p>
        The luxury residential market is experiencing a material revolution, with sintered stone and porcelain
        slabs emerging as the preferred alternatives to traditional quartz and marble. Performance data and
        installation best practices reveal why these materials are gaining market dominance.
      </p>
      
      <h2>Performance Advantages</h2>
      <p>
        Sintered stone offers superior performance characteristics compared to natural stone and engineered
        quartz. With a Mohs hardness rating of 6-7 (compared to marble&apos;s 3-4), these materials provide
        exceptional durability for high-traffic residential applications.
      </p>
      
      <h2>Installation Best Practices</h2>
      <p>
        Proper installation requires specialized tools and techniques. Our installation teams have developed
        proprietary methods for handling large-format slabs (up to 126&quot; x 63&quot;) that minimize waste and ensure
        perfect seams.
      </p>
      
      <h2>Cost Analysis</h2>
      <p>
        While material costs are 20-30% higher than traditional options, the long-term value proposition is
        compelling. Reduced maintenance, superior durability, and enhanced aesthetics justify the premium
        for luxury residential projects.
      </p>
      
      <h2>Market Trends</h2>
      <p>
        Our analysis of 2025 project data shows a 340% increase in sintered stone installations compared to
        2024. This trend is expected to continue as manufacturers expand color and texture options.
      </p>
      
      <h2>Conclusion</h2>
      <p>
        The shift toward sintered stone and porcelain represents more than a trend—it&apos;s a fundamental
        evolution in residential material selection. For luxury home builders and remodelers, understanding
        these materials is essential for meeting client expectations and delivering superior results.
      </p>
    </>
  ),
  
  "prefabricated-modular-construction": (
    <>
      <p>
        Prefabricated modular construction is transforming the multi-family development landscape, offering
        unprecedented speed-to-market advantages while maintaining quality standards. Our recent projects
        demonstrate the potential and limitations of this approach.
      </p>
      
      <h2>Speed vs. Quality: The Real Story</h2>
      <p>
        Contrary to common misconceptions, modular construction doesn&apos;t require quality compromises. Our
        120-unit development in Portland was completed 8 months ahead of schedule while exceeding all quality
        benchmarks. The key is selecting the right modular manufacturer and maintaining rigorous quality
        control throughout the process.
      </p>
      
      <h2>Case Study Analysis</h2>
      <p>
        Our analysis of three recent multi-family projects reveals:
      </p>
      <ul>
        <li>Average 35% reduction in construction timeline</li>
        <li>15% cost savings through reduced on-site labor</li>
        <li>Superior quality control through factory conditions</li>
        <li>Reduced weather-related delays</li>
      </ul>
      
      <h2>Challenges and Solutions</h2>
      <p>
        Modular construction presents unique challenges, including transportation logistics, crane
        coordination, and on-site assembly precision. Our integrated approach addresses these challenges
        through early planning and close coordination with manufacturers.
      </p>
      
      <h2>Future Outlook</h2>
      <p>
        As modular construction technology advances, we expect to see expanded applications in commercial
        and hospitality sectors. The 2026 construction landscape will likely feature increased adoption of
        hybrid approaches combining modular and traditional construction methods.
      </p>
      
      <h2>Conclusion</h2>
      <p>
        Prefabricated modular construction represents a viable path forward for developers seeking to
        optimize timelines and costs without sacrificing quality. Success requires careful manufacturer
        selection, detailed planning, and experienced project management.
      </p>
    </>
  ),
  
  "zero-waste-construction": (
    <>
      <p>
        Achieving 95% waste diversion on a $2.5M commercial renovation required innovative approaches to
        material sorting, strategic recycling partnerships, and comprehensive documentation. This case study
        outlines the strategies that made near-zero waste possible.
      </p>
      
      <h2>Material Sorting Strategy</h2>
      <p>
        Our zero-waste approach began with comprehensive pre-demolition audits, identifying all materials
        for potential reuse or recycling. We established on-site sorting stations for 12 material categories,
        including metals, concrete, wood, drywall, and mixed plastics.
      </p>
      
      <h2>Recycling Partnerships</h2>
      <p>
        Strategic partnerships with specialized recyclers were essential. We worked with:
      </p>
      <ul>
        <li>Concrete crushing facilities for aggregate reuse</li>
        <li>Metal recyclers for steel, copper, and aluminum</li>
        <li>Wood processors for engineered lumber production</li>
        <li>Drywall recyclers for gypsum recovery</li>
      </ul>
      
      <h2>Cost Savings</h2>
      <p>
        While initial sorting required additional labor investment, the project achieved $47,000 in
        avoided disposal costs and material recovery revenue. The net savings after sorting labor costs
        totaled $28,000.
      </p>
      
      <h2>Documentation and Compliance</h2>
      <p>
        Comprehensive documentation was essential for LEED certification and waste diversion verification.
        We implemented digital tracking systems that recorded every material stream from removal through
        final disposition.
      </p>
      
      <h2>Lessons Learned</h2>
      <p>
        Key success factors included early planning, dedicated sorting staff, and strong recycling
        partnerships. The project demonstrated that zero-waste goals are achievable with proper planning
        and execution.
      </p>
      
      <h2>Conclusion</h2>
      <p>
        Zero-waste construction is not just an environmental goal—it&apos;s a viable business strategy that
        reduces costs while enhancing project sustainability credentials. Our experience proves that with
        proper planning, 95%+ diversion rates are achievable on commercial projects.
      </p>
    </>
  ),
  
  "acoustic-design-open-plan": (
    <>
      <p>
        Modern open-plan offices require sophisticated acoustic solutions beyond traditional sound masking.
        Our 50,000 sq ft tech headquarters project demonstrates advanced acoustic design principles that
        achieve STC 60+ partition ratings while maintaining the collaborative benefits of open spaces.
      </p>
      
      <h2>Beyond Sound Masking</h2>
      <p>
        While sound masking systems provide baseline noise coverage, truly effective acoustic design
        requires a multi-layered approach. Our design incorporated:
      </p>
      <ul>
        <li>Active noise cancellation in meeting rooms</li>
        <li>Acoustic wall panels with variable absorption coefficients</li>
        <li>Strategic placement of sound-absorbing materials</li>
        <li>Floating floor systems to reduce structure-borne noise</li>
      </ul>
      
      <h2>STC 60+ Partitions</h2>
      <p>
        Achieving STC 60+ ratings required specialized partition systems with multiple layers of
        acoustic insulation, staggered stud configurations, and acoustic sealants. These partitions
        effectively isolate private offices and conference rooms from open workspace areas.
      </p>
      
      <h2>Active Noise Cancellation</h2>
      <p>
        Our implementation of active noise cancellation technology in meeting rooms represents a
        cutting-edge approach to acoustic control. The system uses microphones and speakers to generate
        anti-noise signals that cancel unwanted sound frequencies.
      </p>
      
      <h2>Occupant Satisfaction</h2>
      <p>
        Post-occupancy surveys revealed significant improvements in acoustic satisfaction:
      </p>
      <ul>
        <li>87% of occupants reported improved ability to focus</li>
        <li>92% satisfaction with meeting room acoustics</li>
        <li>Reduced complaints about noise distractions</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>
        Advanced acoustic design in open-plan offices requires a holistic approach that goes beyond
        traditional solutions. The investment in sophisticated acoustic systems pays dividends in
        occupant satisfaction, productivity, and overall workplace quality.
      </p>
    </>
  ),
  
  "historic-preservation-art-deco": (
    <>
      <p>
        Restoring 1920s Art Deco facades presents unique technical challenges, particularly when working
        with original terracotta and cast stone elements. Our recent landmark designation project required
        innovative restoration techniques and comprehensive documentation for compliance.
      </p>
      
      <h2>Technical Challenges</h2>
      <p>
        Original Art Deco facades feature intricate terracotta ornamentation and cast stone details that
        require specialized restoration expertise. Common issues include:
      </p>
      <ul>
        <li>Spalling and deterioration of terracotta units</li>
        <li>Cracking in cast stone elements</li>
        <li>Failed mortar joints</li>
        <li>Corrosion of embedded steel supports</li>
      </ul>
      
      <h2>Restoration Techniques</h2>
      <p>
        Our restoration approach prioritized preservation of original materials while ensuring structural
        integrity. Techniques included:
      </p>
      <ul>
        <li>In-situ repair of terracotta using compatible mortars</li>
        <li>Selective replacement of severely damaged units</li>
        <li>Epoxy injection for cast stone crack repair</li>
        <li>Cathodic protection for embedded steel</li>
      </ul>
      
      <h2>Documentation Process</h2>
      <p>
        Landmark designation compliance required comprehensive documentation, including:
      </p>
      <ul>
        <li>Detailed condition assessments with photogrammetry</li>
        <li>Material analysis and compatibility testing</li>
        <li>Historical research and archival documentation</li>
        <li>Proposed treatment plans with preservation rationale</li>
      </ul>
      
      <h2>Case Study: 1928 Office Building</h2>
      <p>
        Our restoration of a 12-story Art Deco office building in downtown Los Angeles involved repair
        of over 2,000 terracotta units and restoration of 150 cast stone elements. The project was
        completed on schedule and received approval from the local landmarks commission.
      </p>
      
      <h2>Conclusion</h2>
      <p>
        Historic preservation of Art Deco facades requires specialized expertise, careful planning, and
        commitment to preserving architectural heritage. The investment in proper restoration techniques
        ensures these historic structures continue to contribute to urban character for generations to come.
      </p>
    </>
  ),
};

// Blog posts data
const POSTS_DATA = [
  {
    id: 1,
    title: "Seismic Retrofitting: Navigating New 2026 Urban Compliance Codes",
    excerpt:
      "A comprehensive breakdown of the structural requirements for historic masonry buildings in high-risk zones. We examine the cost-benefit of carbon-fiber reinforcement vs traditional steel.",
    category: "Structural",
    date: "Jan 2026",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=3270&auto=format&fit=crop",
    slug: "seismic-2026",
    datePublished: "2026-01-15",
    timeline: ["Planning", "Survey", "Demo", "Reinforcement", "Final"],
    tags: ["Engineering", "Compliance", "Retrofitting", "Safety"],
    views: 1247,
    featured: true,
  },
  {
    id: 2,
    title: "Smart Glass: The ROI of Dynamic Fenestration in Commercial Build-outs",
    excerpt:
      "Analyzing the energy cost savings of electrochromic glass in commercial office build-outs. Real-world case studies from our LEED Platinum projects.",
    category: "Sustainable",
    date: "Dec 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=3464&auto=format&fit=crop",
    slug: "smart-glass-roi",
    datePublished: "2025-12-10",
    timeline: ["Design", "Installation", "Calibration", "Final"],
    tags: ["Sustainability", "Technology", "Energy Efficiency", "LEED"],
    views: 892,
    featured: true,
  },
  {
    id: 3,
    title: "Navigating OSHPD 3 Requirements for Medical Clinics",
    excerpt:
      "A technical guide to electrical and HVAC compliance for outpatient healthcare facilities. What changed in the 2026 building codes.",
    category: "Compliance",
    date: "Nov 2025",
    readTime: "15 min read",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=3535&auto=format&fit=crop",
    slug: "oshpd-3-requirements",
    datePublished: "2025-11-28",
    timeline: ["Planning", "Inspection", "Compliance", "Final"],
    tags: ["Healthcare", "Compliance", "OSHPD", "Regulations"],
    views: 1563,
    featured: false,
  },
  {
    id: 4,
    title: "2026 Material Trends: Beyond Quartz and Marble",
    excerpt:
      "Why sintered stone and porcelain slabs are taking over the luxury residential market. Performance data and installation best practices.",
    category: "Commercial",
    date: "Oct 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=3200&auto=format&fit=crop",
    slug: "2026-material-trends",
    datePublished: "2025-10-15",
    timeline: ["Research", "Selection", "Installation", "Final"],
    tags: ["Materials", "Trends", "Luxury", "Design"],
    views: 743,
    featured: false,
  },
  {
    id: 5,
    title: "Prefabricated Modular Construction: Speed vs. Quality in 2026",
    excerpt:
      "Exploring the rise of off-site construction methods and their impact on project timelines. Case study analysis from our recent multi-family development projects.",
    category: "Commercial",
    date: "Sep 2025",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3270&auto=format&fit=crop",
    slug: "prefabricated-modular-construction",
    datePublished: "2025-09-20",
    timeline: ["Design", "Fabrication", "Transport", "Assembly", "Final"],
    tags: ["Modular", "Efficiency", "Innovation", "Construction"],
    views: 1024,
    featured: false,
  },
  {
    id: 6,
    title: "Zero-Waste Construction: Achieving 95% Diverted Materials",
    excerpt:
      "How we achieved near-zero waste on a $2.5M commercial renovation. Detailed breakdown of material sorting, recycling partnerships, and cost savings.",
    category: "Sustainable",
    date: "Aug 2025",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=3269&auto=format&fit=crop",
    slug: "zero-waste-construction",
    datePublished: "2025-08-12",
    timeline: ["Planning", "Sorting", "Recycling", "Documentation", "Final"],
    tags: ["Sustainability", "Waste Management", "Green Building", "LEED"],
    views: 1156,
    featured: true,
  },
  {
    id: 7,
    title: "Acoustic Design in Open-Plan Offices: Beyond Sound Masking",
    excerpt:
      "Advanced acoustic solutions for modern workspaces. Case study of a 50,000 sq ft tech headquarters with STC 60+ partitions and active noise cancellation.",
    category: "Commercial",
    date: "Jul 2025",
    readTime: "11 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=3269&auto=format&fit=crop",
    slug: "acoustic-design-open-plan",
    datePublished: "2025-07-08",
    timeline: ["Analysis", "Design", "Installation", "Testing", "Final"],
    tags: ["Acoustics", "Office Design", "Wellness", "Technology"],
    views: 678,
    featured: false,
  },
  {
    id: 8,
    title: "Historic Preservation: Restoring 1920s Art Deco Facades",
    excerpt:
      "Technical challenges and solutions in restoring original terracotta and cast stone elements. Documentation process for landmark designation compliance.",
    category: "Structural",
    date: "Jun 2025",
    readTime: "14 min read",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=3270&auto=format&fit=crop",
    slug: "historic-preservation-art-deco",
    datePublished: "2025-06-25",
    timeline: ["Assessment", "Documentation", "Restoration", "Inspection", "Final"],
    tags: ["Historic", "Preservation", "Restoration", "Heritage"],
    views: 934,
    featured: false,
  },
];

export function getAllPosts(): BlogPost[] {
  return POSTS_DATA.map((post) => ({
    ...post,
    content: articleContent[post.slug] || <p>Article content coming soon...</p>,
  }));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const post = POSTS_DATA.find((p) => p.slug === slug);
  if (!post) return undefined;
  
  return {
    ...post,
    content: articleContent[slug] || <p>Article content coming soon...</p>,
  };
}
