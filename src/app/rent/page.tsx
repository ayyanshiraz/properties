import RentClient from "../../components/RentClient";

export const metadata = {
  title: "Properties For Rent | PakProperty",
  description: "Browse our exclusive properties for rent and discover luxury living today.",
};

export default function RentPage() {
  const propertyData = [
    {
      id: 1,
      title: "Furnished 2 Bed Apartment (Without Bills)",
      location: "Gulberg, Lahore",
      price: 160000,
      priceStr: "PKR 160,000",
      area: "1100 Sq.Ft",
      image: "/rent/26.webp"
    },
    {
      id: 2,
      title: "Non Furnished Apartment (Without Bills)",
      location: "Gulberg, Lahore",
      price: 150000,
      priceStr: "PKR 150,000",
      area: "1200 Sq.Ft",
      image: "/rent/27.webp"
    },
    {
      id: 3,
      title: "2 Bed Apartment in Zameen Aurum (Modern Furnished)",
      location: "Gulberg, Lahore",
      price: 520000,
      priceStr: "PKR 520,000",
      area: "1300 Sq.Ft",
      image: "/rent/28.webp"
    },
    {
      id: 4,
      title: "1 Kanal Portion on MM Alam Road",
      location: "MM Alam Road, Gulberg, Lahore",
      price: 250000,
      priceStr: "PKR 250,000",
      area: "2250 Sq.Ft",
      image: "/rent/29.webp"
    }
  ];

  return <RentClient properties={propertyData} />;
}