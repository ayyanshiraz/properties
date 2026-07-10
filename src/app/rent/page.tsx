import RentClient from "../../components/RentClient";

export const metadata = {
  title: "Properties For Rent | Qeemat.com",
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
      image: "/rent/6.webp"
    },
    {
      id: 2,
      title: "Non Furnished Apartment (Without Bills)",
      location: "Gulberg, Lahore",
      price: 150000,
      priceStr: "PKR 150,000",
      image: "/rent/14.webp"
    },
    {
      id: 3,
      title: "2 Bed Apartment in Zameen Aurum (Modern Furnished)",
      location: "Gulberg, Lahore",
      price: 520000,
      priceStr: "PKR 520,000",
      image: "/rent/8.webp"
    },
    {
      id: 4,
      title: "1 Kanal Portion on MM Alam Road",
      location: "MM Alam Road, Gulberg, Lahore",
      price: 250000,
      priceStr: "PKR 250,000",
      image: "/rent/22.webp"
    },
    {
      id: 5,
      title: `House for rent`,
      location: `Cavlary ground cant Lahore`,
      price: 150000,
      priceStr: `PKR 150,000`,
      image: `/rent/46.webp`
    }
  ];

  return <RentClient properties={propertyData} />;
}