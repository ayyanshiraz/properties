import AreaGuidesClient from "../../components/AreaGuidesClient";

export const metadata = {
  title: "Area Guides | PakProperty",
  description: "Explore the best neighborhoods in Lahore with our comprehensive area guides.",
};

export default function AreaGuidesPage() {
  const areasData = [
    { 
      name: "Gulberg", 
      image: "/areaguides/gulberg.webp", 
      desc: "The commercial and entertainment heart of the city." 
    }
  ];

  return <AreaGuidesClient areas={areasData} />;
}