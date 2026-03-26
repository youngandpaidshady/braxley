import React from "react";

interface StructuredDataProps {
  name?: string;
  description?: string;
  priceRange?: string;
  areaServed?: string;
  url?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  name = "Braxley Nevim Elite Remodeling LLC",
  description = "Enterprise-grade general contracting specializing in healthcare, hospitality, and high-end residential.",
  priceRange = "$$$$",
  areaServed = "Metro Area",
  url = "https://www.braxleynevimllc.com",
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name,
    description,
    url,
    priceRange,
    areaServed: {
      "@type": "City",
      name: areaServed,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

