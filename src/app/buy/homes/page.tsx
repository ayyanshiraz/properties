import HomesClient from "../../../components/HomesClient";

export const metadata = {
  title: "Homes For Sale | Qeemat",
  description: "Discover premium residential homes for sale.",
};

export default function HomesPage() {
  const propertyData = [
    {
      id: 2,
      title: "2 Kanal Commercial House Kothi",
      location: "Mehmood Kasuri Road, Gulberg, Lahore",
      price: 900000000,
      priceStr: "PKR 90 Crore",
      area: "2 Kanal (59x150)",
      image: "/buy/4.4.webp"
    },
    {
      id: 3,
      title: `3.5 Marla House`,
      location: `Main Ferozpur Road, Lahore`,
      price: 0,
      priceStr: `Contact For Price +92 333 4888324`,
      area: `3.5 Marla (26 ft front)`,
      image: `/buy/5.webp`
    },
    {
      id: 4,
      title: `6 Marla Shiraz Villas House`,
      location: `Shiraz Villas, Main Walton Road, Lahore`,
      price: 30000000,
      priceStr: `PKR 3 Crore`,
      area: `6 Marla (25 ft front)`,
      image: `/buy/6.webp`
    }
  ];

  return <HomesClient properties={propertyData} />;
}