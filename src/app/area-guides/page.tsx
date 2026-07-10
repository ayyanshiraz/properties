import AreaGuidesClient from "../../components/AreaGuidesClient";

export const metadata = {
  title: `Area Guides | Qeemat.com`,
  description: `Explore the best neighborhoods in Lahore with our comprehensive area guides.`
};

export default function AreaGuidesPage() {
  const areasData = [
    {
      name: `Gulberg`,
      image: `/areaguides/gulberg.webp`,
      desc: `The commercial and entertainment heart of the city.`
    },
    {
      name: `Ferozpur Road`,
      image: `/areaguides/ferozpur.webp`,
      desc: `A major commercial artery offering excellent connectivity and dynamic business opportunities.`
    },
    {
      name: `Walton Road`,
      image: `/areaguides/walton.webp`,
      desc: `A vibrant corridor blending established residential communities with growing commercial zones.`
    },
    {
      name: `Cavalry Ground Cantt`,
      image: `/areaguides/cavlary.webp`,
      desc: `An upscale neighborhood offering a secure and premium urban lifestyle.`
    }
  ];

  return <AreaGuidesClient areas={areasData} />;
}