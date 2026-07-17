import CommercialDetailClient from "../../../../components/CommercialDetailClient";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Commercial Details | Qemaat`,
  description: `View complete commercial details and contact our experts.`,
};

export default async function CommercialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const routeId = String(resolvedParams.id);
  
  let propertyData = null;

  if (routeId === `2001`) {
    propertyData = { id: routeId, title: `2 Kanal Commercial Building`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, priceStr: `PKR 100 Crore`, area: `2 Kanal (59x150)`, image: `/buy/1.webp`, images: [`/buy/1.webp`], description: `Premium commercial building available for sale on the highly sought after Mehmood Kasuri Road. This property spans exactly 2 Kanal with a front of 59 square feet and a depth of 150.`, propertyType: `Commercial`, propertyStatus: `For Sale`, propertyId: `bizbuy-2001805972`, agentName: `Qemaat Agent` };
  } else if (routeId === `2002`) {
    propertyData = { id: routeId, title: `2 Kanal Commercial House Kothi`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, priceStr: `PKR 90 Crore`, area: `2 Kanal (59x150)`, image: `/buy/2.webp`, images: [`/buy/2.webp`], description: `Luxurious commercial house kothi located directly on Mehmood Kasuri Road. Features a solid structure with a 59 square feet front and 150 feet length.`, propertyType: `Commercial`, propertyStatus: `For Sale`, propertyId: `bizbuy-2002805972`, agentName: `Qemaat Agent` };
  } else if (routeId === `2005`) {
    propertyData = { id: routeId, title: `1 Kanal 3 Marla Commercial Building`, location: `Mehmood Kasuri Road, Gulberg, Lahore`, priceStr: `PKR 65 Crore`, area: `1 Kanal 3 Marla`, image: `/buy/1.webp`, images: [`/buy/1.webp`], description: `Presenting a prime commercial building spanning 1 Kanal and 3 Marla located on the bustling Mehmood Kasuri Road.`, propertyType: `Commercial`, propertyStatus: `For Sale`, propertyId: `bizbuy-2005805972`, agentName: `Qemaat Agent` };
  } else {
    try {
      const dbId = parseInt(routeId);
      if (!isNaN(dbId)) {
        const dbProp = await prisma.property.findUnique({ 
          where: { id: dbId },
          include: { user: true }
        });
        if (dbProp) {
          const dbImages = dbProp.images || [];
          const dbVideos = dbProp.videos || [];
          const combinedMedia = [...dbImages, ...dbVideos];
          propertyData = { 
            id: dbProp.id.toString(), 
            title: dbProp.title, 
            location: dbProp.location, 
            priceStr: `PKR ` + dbProp.price, 
            area: dbProp.area || dbProp.category || `Not Specified`, 
            image: combinedMedia.length > 0 ? combinedMedia[0] : `/buy/1.webp`, 
            images: combinedMedia.length > 0 ? combinedMedia : [`/buy/1.webp`], 
            description: dbProp.description, 
            propertyType: dbProp.category || `Commercial`, 
            propertyStatus: dbProp.type, 
            propertyId: `bizbuy-` + dbProp.id + `805972`, 
            agentName: dbProp.user ? dbProp.user.name : `Qemaat Agent`,
            featuresList: dbProp.featuresList || [],
            floorRates: dbProp.floorRates || null,
            paymentPlans: dbProp.paymentPlans || null
          };
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!propertyData) {
    propertyData = { id: routeId, title: `Property Not Found`, location: `Unknown`, priceStr: `N/A`, area: `N/A`, image: `/buy/1.webp`, images: [`/buy/1.webp`], description: `This property is no longer available.`, propertyType: `Unknown`, propertyStatus: `Unavailable`, propertyId: `N/A`, agentName: `Qemaat Agent` };
  }

  return <CommercialDetailClient property={propertyData} />;
}