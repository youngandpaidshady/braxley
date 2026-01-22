// Centralized project data - Single source of truth
export interface Project {
  id: string;
  title: string;
  location: string;
  scope: string;
  category: "Residential" | "Restoration" | "Structural" | "Hospitality" | "Infrastructure";
  image: string;
  gallery?: string[];
  brief?: string;
  description?: string;
}

// Project data as Record for detail pages
export const PROJECTS: Record<string, Project> = {
  "manhattan-skyline-penthouse": {
    id: "BN-MH",
    title: "Manhattan Skyline Penthouse",
    location: "Manhattan, NY",
    scope: "Elite Interior Remodeling",
    category: "Residential",
    image: "/img/projects/ManhattanPenthouse/ManhattanPenthouse_Main-1.jpg",
    gallery: [
      "/img/projects/ManhattanPenthouse/ManhattanPenthouse_Main-1.jpg",
      "/img/projects/ManhattanPenthouse/ManhattanPenthouse_1-2.jpg",
      "/img/projects/ManhattanPenthouse/ManhattanPenthouse_2-3.jpg",
    ],
    brief: "Elite interior remodeling of a Manhattan skyline penthouse, combining modern luxury with urban sophistication and showcasing exceptional craftsmanship in every detail.",
    description: "This prestigious Manhattan penthouse renovation represents the pinnacle of urban luxury living. Our team transformed the space with custom millwork, high-end finishes, and architectural details that reflect the building's iconic status. The project involved complete interior redesign, custom cabinetry, and integration of smart home technology while preserving the building's historic character.",
  },
  "jw-marriott-bonnet-creek": {
    id: "BN-JWM",
    title: "JW Marriott Bonnet Creek",
    location: "Orlando, FL",
    scope: "Elite Interior Remodeling",
    category: "Hospitality",
    image: "/img/projects/JWMarriott_BonnettCreek/JWMarriott_BonnettCreek_Main-1.jpg",
    gallery: [
      "/img/projects/JWMarriott_BonnettCreek/JWMarriott_BonnettCreek_Main-1.jpg",
      "/img/projects/JWMarriott_BonnettCreek/JWMarriott_BonnettCreek_1-3.jpg",
      "/img/projects/JWMarriott_BonnettCreek/JWMarriott_BonnettCreek_2-1.jpg",
    ],
    brief: "A comprehensive interior transformation of the JW Marriott Bonnet Creek, featuring luxury finishes, custom millwork, and elite craftsmanship throughout the public spaces and guest accommodations.",
    description: "This large-scale hospitality renovation required meticulous attention to detail and coordination with hotel operations. We delivered a complete interior transformation that elevated the guest experience while maintaining the JW Marriott brand standards. The project included custom furniture, lighting design, and artisanal finishes throughout.",
  },
  "lax-consolidated-rental-car-facility": {
    id: "BN-LAX",
    title: "LAX Consolidated Rental Car Facility",
    location: "Los Angeles, CA",
    scope: "Structural Engineering & Execution",
    category: "Infrastructure",
    image: "/img/projects/LAXConsolidatedRentalCarFacility/LAXConsolidatedRentalCarFacility_CAB_Buildings_Main-29.jpg",
    gallery: [
      "/img/projects/LAXConsolidatedRentalCarFacility/LAXConsolidatedRentalCarFacility_CAB_Buildings_Main-29.jpg",
      "/img/projects/LAXConsolidatedRentalCarFacility/LAXConsolidatedRentalCarFacility_CAB_Buildings_2-62.jpg",
      "/img/projects/LAXConsolidatedRentalCarFacility/LAXConsolidatedRentalCarFacility_CAB_Buildings_3-63.jpg",
    ],
    brief: "Structural engineering and execution for the LAX Consolidated Rental Car Facility, featuring advanced seismic design, load-bearing analysis, and precision construction methodologies for critical infrastructure.",
    description: "This critical infrastructure project required advanced structural engineering and precise execution. Our team delivered seismic-resistant design, load-bearing analysis, and construction oversight for one of LAX's most important facilities. The project involved coordination with multiple stakeholders and adherence to strict aviation authority regulations.",
  },
  "beverly-hills-elite-residence": {
    id: "BN-BH",
    title: "Beverly Hills Elite Residence",
    location: "Beverly Hills, CA",
    scope: "Complete Luxury Renovation",
    category: "Residential",
    image: "/img/projects/BeverlyHillsResidential/BeverlyHillsResidential_Main-1.jpg",
    gallery: [
      "/img/projects/BeverlyHillsResidential/BeverlyHillsResidential_Main-1.jpg",
      "/img/projects/BeverlyHillsResidential/BeverlyHillsResidential_1-2.jpg",
      "/img/projects/BeverlyHillsResidential/BeverlyHillsResidential_2-3.jpg",
    ],
    brief: "A complete luxury renovation of a prestigious Beverly Hills residence, featuring architectural excellence, custom finishes, and meticulous attention to detail throughout every space.",
    description: "This Beverly Hills estate renovation showcases our commitment to luxury residential transformation. The project involved complete architectural redesign, custom millwork, and integration of high-end finishes throughout. Every detail was carefully curated to reflect the client's vision of sophisticated elegance.",
  },
};

// Convert to array for listing pages
export const PROJECTS_ARRAY: Project[] = [
  PROJECTS["jw-marriott-bonnet-creek"],
  PROJECTS["lax-consolidated-rental-car-facility"],
  PROJECTS["beverly-hills-elite-residence"],
  PROJECTS["manhattan-skyline-penthouse"],
  {
    id: "BN-01",
    title: "The Obsidian Estate",
    location: "Brentwood",
    scope: "Full Structural Remodel",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=1600&fit=crop&q=80",
  },
  {
    id: "BN-02",
    title: "Vellum Penthouse",
    location: "Manhattan",
    scope: "Interior Forensics",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=1600&fit=crop&q=80",
  },
  {
    id: "BN-03",
    title: "Heritage Manor Restoration",
    location: "Charleston",
    scope: "Period-Accurate Reconstruction",
    category: "Restoration",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=1600&fit=crop&q=80",
  },
  {
    id: "BN-04",
    title: "Steel Frame Modern",
    location: "Austin",
    scope: "Structural Engineering",
    category: "Structural",
    image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&h=1600&fit=crop&q=80",
  },
  {
    id: "BN-05",
    title: "Coastal Revival",
    location: "Nantucket",
    scope: "Complete Restoration",
    category: "Restoration",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=1600&fit=crop&q=80",
  },
  {
    id: "BN-06",
    title: "Urban Foundation",
    location: "Brooklyn",
    scope: "Structural Reinforcement",
    category: "Structural",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=1600&fit=crop&q=80",
  },
  {
    id: "BN-07",
    title: "Mid-Century Modern",
    location: "Palm Springs",
    scope: "Preservation & Update",
    category: "Restoration",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&h=1600&fit=crop&q=80",
  },
  {
    id: "BN-08",
    title: "The Timber Frame",
    location: "Aspen",
    scope: "Structural Design",
    category: "Structural",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=1600&fit=crop&q=80",
  },
];
