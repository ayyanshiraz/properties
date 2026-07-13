import PropertyDetailClient from "../../../components/PropertyDetailClient";

export const metadata = {
  title: "Property Details | Qeemat.com",
  description: "View complete property details, features, and contact our agents today.",
};

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  
  // Default values mapped to Property 2 (Non Furnished Apartment)
  let currentTitle = "Non Furnished Apartment (Without Bills)";
  let currentPrice = "PKR 150,000";
  let currentLocation = "Gulberg, Lahore";
  let currentImage = "/rent/3.webp";
  let currentDesc = "This stunning non furnished apartment offers a blank canvas to create your perfect home right in the heart of Gulberg. Features spacious living areas and easy access to local amenities. Enjoy the vibrant city life with complete peace of mind. Just steps away from the main commercial zones and premium facilities.";
  let currentImages = ["/rent/3.webp", "/rent/video2.mp4"]; 
  
  if (params.id === "1") {
    currentTitle = "Furnished 2 Bed Apartment (Without Bills)";
    currentPrice = "PKR 160,000";
    currentLocation = "Gulberg, Lahore";
    currentImage = "/rent/4.webp";
    currentDesc = "This stunning furnished apartment offers a luxurious lifestyle right in the heart of Gulberg. Complete with premium fittings, spacious living areas, and easy access to local amenities. Ready for immediate transfer with multiple spacious balconies and bright airy interiors.";
    currentImages = ["/rent/4.webp", "/rent/video1.mp4",]; 
  } else if (params.id === "3") {
    currentTitle = "2 Bed Apartment in Zameen Aurum (Modern Furnished | Prime Location)";
    currentPrice = "PKR 520,000";
    currentLocation = "Gulberg, Lahore";
    currentImage = "/rent/22.webp";
    currentDesc = "Rental Terms: Monthly Rent: PKR 520,000 (including of Utilities/Tax/Bills/CAM/STR charges). This is 30 days Rental Charges. Modern furnished prime location apartment in Zameen Aurum. Enjoy the vibrant city life with complete peace of mind.";
    currentImages = ["/rent/22.webp", "/rent/6.webp", "/rent/13.webp", "/rent/21.webp", "/rent/23.webp", "/rent/25.webp"]; 
  } else if (params.id === "4") {
    currentTitle = "1 Kanal Portion on MM Alam Road";
    currentPrice = "PKR 250,000";
    
    currentLocation = "MM Alam Road, Gulberg, Lahore";
    currentImage = "/rent/6.webp";
    currentDesc = "This exceptional one kanal portion is situated on the highly sought after MM Alam Road. It provides a premium living experience with expansive rooms and sophisticated finishes. The prime location ensures immediate access to top tier commercial areas and dining options.";
    currentImages = ["/rent/6.webp", "/rent/video3.mp4" ]; 
  }
  else if (params.id === `5`) {
    currentTitle = `House for rent`;
    currentPrice = `PKR 150,000`;
   
    currentLocation = `Cavlary ground cant Lahore`;
    currentImage = `/rent/46.webp`;
    currentDesc = `This exceptional house in Cavlary ground cant Lahore offers a premium lifestyle. Enjoy spacious rooms and easy access to local amenities.`;
    currentImages = [`/rent/31.webp`, `/rent/32.webp`, `/rent/33.webp`, `/rent/34.webp`,`/rent/35.webp`,`/rent/36.webp`,`/rent/37.webp`,`/rent/38.webp`,`/rent/39.webp`,`/rent/40.webp`,`/rent/41.webp`,`/rent/42.webp`,`/rent/43.webp`,`/rent/44.webp`,`/rent/45.webp`,`/rent/46.webp`]; 
  }
  
  const propertyData = {
    id: params.id,
    title: currentTitle,
    location: currentLocation,
    priceStr: currentPrice,
    image: currentImage,
    images: currentImages, 
    description: currentDesc,
    propertyType: params.id === `5` ? `House, Residential` : `Apartment, Residential`,
    propertyStatus: `For Rent`,
    propertyId: `bizlux-` + params.id + `905972`
  };

  return <PropertyDetailClient property={propertyData} />;
}