import React from "react";

interface JsonLdProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

interface LocalBusinessData {
  name: string;
  image: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  priceRange: string; // e.g., "$$$$"
  areaServed: string[]; // Array of city names
  openingHours: string[]; // e.g., ["Mo-Fr 08:00-18:00", "Sa 09:00-15:00"]
  url?: string;
  description?: string;
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

export const LocalBusinessJsonLd: React.FC<{ data: LocalBusinessData }> = ({
  data,
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: data.name,
    image: data.image,
    telephone: data.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    priceRange: data.priceRange,
    areaServed: data.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHoursSpecification: data.openingHours.map((hours) => {
      // Parse "Mo-Fr 08:00-18:00" format
      const [days, timeRange] = hours.split(" ");
      const [opens, closes] = timeRange.split("-");
      const dayMap: Record<string, string> = {
        Mo: "Monday",
        Tu: "Tuesday",
        We: "Wednesday",
        Th: "Thursday",
        Fr: "Friday",
        Sa: "Saturday",
        Su: "Sunday",
      };

      let dayOfWeek: string[] = [];
      if (days.includes("-")) {
        const [start, end] = days.split("-");
        const startIndex = Object.keys(dayMap).indexOf(start);
        const endIndex = Object.keys(dayMap).indexOf(end);
        dayOfWeek = Object.values(dayMap).slice(startIndex, endIndex + 1);
      } else {
        dayOfWeek = [dayMap[days] || days];
      }

      return dayOfWeek.map((day) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: day,
        opens,
        closes,
      }));
    }).flat(),
    url: data.url || "https://braxleynevim.com",
    description: data.description,
    ...(data.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.aggregateRating.ratingValue,
        reviewCount: data.aggregateRating.reviewCount,
      },
    }),
  };

  return <JsonLd data={structuredData} />;
};

