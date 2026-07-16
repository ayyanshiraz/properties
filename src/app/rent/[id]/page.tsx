import PropertyDetailClient from "../../../components/PropertyDetailClient";
import { prisma } from "../../../lib/prisma";

export const metadata = {
  title: `Property Details | Qemaat`,
  description: `View complete property details, features, and contact our agents today.`,
};

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const routeId = String(resolvedParams.id);
  
  let propertyData = null;

  if (routeId === `1001` || routeId === `1002` || routeId === `1003` || routeId === `1004` || routeId === `1005` || routeId === `1006`) {
    let currentTitle = `Non Furnished Apartment (Without Bills)`;
    let currentPrice = `PKR 150,000`;
    let currentLocation = `Gulberg, Lahore`;
    let currentImage = `/rent/3.webp`;
    let currentDesc = `This stunning non furnished apartment offers a blank canvas to create your perfect home right in the heart of Gulberg. Features spacious living areas and easy access to local amenities. Enjoy the vibrant city life with complete peace of mind. Just steps away from the main commercial zones and premium facilities.`;
    let currentImages = [`/rent/3.webp`, `/rent/4.webp`, `/rent/5.webp`, `/rent/6.webp`, `/rent/19.webp`, `/rent/video2.mp4` ]; 

    if (routeId === `1001`) {
      currentTitle = `Furnished 2 Bed Apartment (Without Bills)`;
      currentPrice = `PKR 160,000`;
      currentLocation = `Gulberg, Lahore`;
      currentImage = `/rent/2.webp`;
      currentDesc = `This stunning furnished apartment offers a luxurious lifestyle right in the heart of Gulberg. Complete with premium fittings, spacious living areas, and easy access to local amenities. Ready for immediate transfer with multiple spacious balconies and bright airy interiors.`;
      currentImages = [`/rent/4.webp`, `/rent/8.webp`, `/rent/9.webp`, `/rent/10.webp`, `/rent/11.webp`, `/rent/12.webp`, `/rent/video1.mp4`]; 
    } else if (routeId === `1003`) {
      currentTitle = `2 Bed Apartment in Zameen Aurum (Modern Furnished | Prime Location)`;
      currentPrice = `PKR 520,000`;
      currentLocation = `Gulberg, Lahore`;
      currentImage = `/rent/22.webp`;
      currentDesc = `Rental Terms: Monthly Rent: PKR 520,000 (including of Utilities/Tax/Bills/CAM/STR charges). This is 30 days Rental Charges. Modern furnished prime location apartment in Zameen Aurum. Enjoy the vibrant city life with complete peace of mind.`;
      currentImages = [`/rent/22.webp`, `/rent/6.webp`, `/rent/13.webp`, `/rent/21.webp`, `/rent/23.webp`, `/rent/25.webp`]; 
    } else if (routeId === `1004`) {
      currentTitle = `1 Kanal Portion on MM Alam Road`;
      currentPrice = `PKR 250,000`;
      currentLocation = `MM Alam Road, Gulberg, Lahore`;
      currentImage = `/rent/6.webp`;
      currentDesc = `This exceptional one kanal portion is situated on the highly sought after MM Alam Road. It provides a premium living experience with expansive rooms and sophisticated finishes. The prime location ensures immediate access to top tier commercial areas and dining options.`;
      currentImages = [`/rent/6.webp`, `/rent/13.webp`, `/rent/14.webp`, `/rent/15.webp`, `/rent/16.webp`, `/rent/17.webp`, `/rent/video3.mp4`]; 
    } else if (routeId === `1005`) {
      currentTitle = `House for rent`;
      currentPrice = `PKR 150,000`;
      currentLocation = `Cavlary ground cant Lahore`;
      currentImage = `/rent/46.webp`;
      currentDesc = `This exceptional house in Cavlary ground cant Lahore offers a premium lifestyle. Enjoy spacious rooms and easy access to local amenities.`;
      currentImages = [`/rent/31.webp`, `/rent/32.webp`, `/rent/33.webp`, `/rent/34.webp`,`/rent/35.webp`,`/rent/36.webp`,`/rent/37.webp`,`/rent/38.webp`,`/rent/39.webp`,`/rent/40.webp`,`/rent/41.webp`,`/rent/42.webp`,`/rent/43.webp`,`/rent/44.webp`,`/rent/45.webp`,`/rent/46.webp`]; 
    } else if (routeId === `1006`) {
      currentTitle = `Commercial rent property main bolevard valenciaa`;
      currentPrice = `PKR 650,000`;
      currentLocation = `Main Boulevard Valencia, Lahore`;
      currentImage = `/rent/87.webp`;
      currentDesc = `This exceptional commercial property is situated on the highly sought after Main Boulevard in Valencia. It provides a premium space for your business with expansive areas and sophisticated finishes. The prime location ensures immediate access to top tier commercial areas.`;
      currentImages = [`/rent/50.webp`, `/rent/51.webp`, `/rent/52.webp`, `/rent/53.webp`, `/rent/54.webp`, `/rent/55.webp`, `/rent/56.webp`,`/rent/57.webp`, `/rent/58.webp`, `/rent/59.webp`, `/rent/60.webp`, `/rent/61.webp`, `/rent/62.webp`, `/rent/63.webp`,`/rent/64.webp`, `/rent/65.webp`, `/rent/66.webp`, `/rent/67.webp`, `/rent/68.webp`, `/rent/69.webp`, `/rent/70.webp`,`/rent/71.webp`, `/rent/72.webp`,`/rent/73.webp`, `/rent/74.webp`, `/rent/75.webp`, `/rent/76.webp`, `/rent/77.webp`, `/rent/78.webp`,`/rent/79.webp`, `/rent/80.webp`, `/rent/81.webp`, `/rent/82.webp`, `/rent/83.webp`, `/rent/84.webp`, `/rent/85.webp`,`/rent/86.webp`, `/rent/87.webp`, `/rent/88.webp`, `/rent/89.webp`, `/rent/90.webp`, `/rent/91.webp`, `/rent/92.webp`, `/rent/93.webp`, `/rent/94.webp`, `/rent/95.webp`, `/rent/96.webp`, `/rent/97.webp`, `/rent/98.webp`, `/rent/video6.mp4`];
    }

    propertyData = {
      id: routeId,
      title: currentTitle,
      location: currentLocation,
      priceStr: currentPrice,
      image: currentImage,
      images: currentImages, 
      description: currentDesc,
      propertyType: routeId === `1006` ? `Commercial` : (routeId === `1005` ? `House, Residential` : `Apartment, Residential`),
      propertyStatus: `For Rent`,
      propertyId: `bizlux-` + routeId + `905972`,
      agentName: `Qemaat Agent`
    };
  } else {
    try {
      const dbId = parseInt(routeId);
      if (!isNaN(dbId)) {
        const dbProp = await prisma.property.findUnique({
          where: { id: dbId },
          include: { user: true }
        }) as any;

        if (dbProp) {
          const dbImages = dbProp.images || [];
          const dbVideos = dbProp.videos || [];
          const combinedMedia = [...dbImages, ...dbVideos];

          propertyData = {
            id: dbProp.id.toString(),
            title: dbProp.title,
            location: dbProp.location,
            priceStr: `PKR ` + dbProp.price,
            image: combinedMedia.length > 0 ? combinedMedia[0] : `/rent/6.webp`,
            images: combinedMedia.length > 0 ? combinedMedia : [`/rent/6.webp`],
            description: dbProp.description,
            propertyType: dbProp.category || `Residential`,
            propertyStatus: dbProp.type,
            propertyId: `bizlux-` + dbProp.id + `905972`,
            agentName: dbProp.user ? dbProp.user.name : `Qemaat Agent`
          };
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!propertyData) {
    propertyData = {
      id: routeId,
      title: `Property Not Found`,
      location: `Unknown`,
      priceStr: `N/A`,
      image: `/rent/6.webp`,
      images: [`/rent/6.webp`],
      description: `This property is no longer available.`,
      propertyType: `Unknown`,
      propertyStatus: `Sold / Rented`,
      propertyId: `N/A`,
      agentName: `Qemaat Agent`
    };
  }

  return <PropertyDetailClient property={propertyData} />;
}