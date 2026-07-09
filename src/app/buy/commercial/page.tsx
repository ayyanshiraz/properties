import CommercialClient from "../../../components/CommercialClient";

export const metadata = {
  title: "Commercial Properties For Sale | Qeemat",
  description: "Discover exclusive commercial properties for sale.",
};

export default function CommercialPage() {
  const propertyData = [
    {
      id: 1,
      title: `2 Kanal Commercial Building`,
      location: `Mehmood Kasuri Road, Gulberg, Lahore`,
      price: 1000000000,
      priceStr: `PKR 100 Crore`,
      area: `2 Kanal (59x150)`,
      image: `/buy/3.3.webp`,
      description: `Premium commercial building available for sale on the highly sought after Mehmood Kasuri Road. This property spans exactly 2 Kanal with a front of 59 square feet and a depth of 150. An exceptional investment opportunity in the heart of the commercial district.`
    },
    {
      id: 2,
      title: `2 Kanal Commercial House Kothi`,
      location: `Mehmood Kasuri Road, Gulberg, Lahore`,
      price: 900000000,
      priceStr: `PKR 90 Crore`,
      area: `2 Kanal (59x150)`,
      image: `/buy/4.4.webp`,
      description: `Luxurious commercial house kothi located directly on Mehmood Kasuri Road. Features a solid structure with a 59 square feet front and 150 feet length. Ideal for corporate offices or high end retail transformations.`
    },
    {
      id: 5,
      title: `1 Kanal 3 Marla Commercial Building`,
      location: `Mehmood Kasuri Road, Gulberg, Lahore`,
      price: 900000000,
      priceStr: `PKR 90 Crore`,
      area: `1 Kanal 3 Marla`,
      image: `/buy/7.webp`,
      description: `Presenting a prime commercial building spanning 1.1 Kanal and 3 Marla located on the bustling Mehmood Kasuri Road. With an asking price of PKR 90 Crore this expansive property offers unparalleled potential for corporate headquarters or high end retail spaces in one of Lahores most coveted commercial hubs.`
    }
  ];

  return <CommercialClient properties={propertyData} />;
}