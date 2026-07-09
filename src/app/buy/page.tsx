import BuyClient from "../../components/BuyClient";

export const metadata = {
  title: "Properties For Sale | Qeemat.com",
  description: "Discover real estate opportunities with our exclusive properties for sale.",
};

export default function BuyPage() {
  const propertyData = [
    {
      id: 1,
      title: `2 Kanal Commercial Building`,
      location: `Mehmood Kasuri Road, Gulberg, Lahore`,
      price: 1000000000,
      priceStr: `PKR 100 Crore`,
      beds: 0,
      baths: 4,
      area: `2 Kanal (59x150)`,
      image: `/buy/1.webp`,
      description: `Premium commercial building available for sale on the highly sought after Mehmood Kasuri Road. This property spans exactly 2 Kanal with a front of 59 square feet and a depth of 150. An exceptional investment opportunity in the heart of the commercial district.`
    },
    {
      id: 2,
      title: `2 Kanal Commercial House Kothi`,
      location: `Mehmood Kasuri Road, Gulberg, Lahore`,
      price: 900000000,
      priceStr: `PKR 90 Crore`,
      beds: 5,
      baths: 6,
      area: `2 Kanal (59x150)`,
      image: `/buy/2.webp`,
      description: `Luxurious commercial house kothi located directly on Mehmood Kasuri Road. Features a solid structure with a 59 square feet front and 150 feet length. Ideal for corporate offices or high end retail transformations.`
    },
    {
      id: 3,
      title: `3.5 Marla House`,
      location: `Main Ferozpur Road, Lahore`,
      price: 12500000,
      priceStr: `PKR 1.25 Crore`,
      area: `3.5 Marla (26 ft front)`,
      image: `/buy/9.webp`,
      description: `An excellent investment opportunity awaits with this 3.5 Marla house located on the highly accessible Main Ferozpur Road in Lahore. This property features a prominent 26 foot front providing ample space and visibility. Please contact us directly to inquire about the pricing details for this exceptional residential asset.`
    },
    {
      id: 4,
      title: `6 Marla Shiraz Villas House`,
      location: `Shiraz Villas, Main Walton Road, Lahore`,
      price: 30000000,
      priceStr: `PKR 3 Crore`,
      area: `6 Marla (25 ft front)`,
      image: `/buy/8.webp`,
      description: `Discover luxury living in this brand new double story house situated in the prestigious Shiraz Villas community. Spanning 6 Marla with a 25 foot front this residence boasts immediate access to wide roads and is conveniently located just a one minute drive from the Main Walton Road boulevard. An asking price of PKR 3 Crore makes this a highly desirable property.`
    },
    {
      id: 5,
      title: `1 Kanal 3 Marla Commercial Building`,
      location: `Mehmood Kasuri Road, Gulberg, Lahore`,
      price: 900000000,
      priceStr: `PKR 65 Crore`,
      area: `1 Kanal 3 Marla`,
      image: `/buy/1.webp`,
      description: `Presenting a prime commercial building spanning 1.1 Kanal and 3 Marla located on the bustling Mehmood Kasuri Road. With an asking price of PKR 90 Crore this expansive property offers unparalleled potential for corporate headquarters or high end retail spaces in one of Lahores most coveted commercial hubs.`
    }
  ];

  return <BuyClient properties={propertyData} />;
}