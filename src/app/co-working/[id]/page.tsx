import CoWorkingDetailClient from "../../../components/CoWorkingDetailClient";
import { prisma } from "../../../lib/prisma";

export const dynamic = `force-dynamic`;

export const metadata = {
  title: `Co-Working Details | Qemaat`,
  description: `View complete co-working space details and contact our experts.`,
};

export default async function CoWorkingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const routeId = String(resolvedParams.id);
  
  let propertyData = null;

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
          propertyType: dbProp.category || `Co-Working Space`, 
          propertyStatus: dbProp.type, 
          propertyId: `bizcowork-` + dbProp.id + `805972`, 
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

  if (!propertyData) {
    propertyData = { id: routeId, title: `Property Not Found`, location: `Unknown`, priceStr: `N/A`, area: `N/A`, image: `/buy/1.webp`, images: [`/buy/1.webp`], description: `This property is no longer available.`, propertyType: `Unknown`, propertyStatus: `Unavailable`, propertyId: `N/A`, agentName: `Qemaat Agent` };
  }

  return <CoWorkingDetailClient property={propertyData} />;
}