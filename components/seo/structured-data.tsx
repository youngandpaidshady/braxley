import React from "react";

interface StructuredDataProps {
  name?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  priceRange?: string;
  areaServed?: string;
  url?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  name = "Braxley Nevim Elite Remodeling LLC",
  description = "Enterprise-grade general contracting specializing in healthcare, hospitality, and high-end residential.",
  address = {
    streetAddress: "123 Construction Boulevard",
    addressLocality: "Metro Area",
    addressRegion: "CA",
    postalCode: "90001",
    addressCountry: "US",
  },
  priceRange = "$$$$",
  areaServed = "Metro Area",
  url = "https://braxleynevim.com",
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name,
    description,
    url,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
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

