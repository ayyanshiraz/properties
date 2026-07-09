import BuyDetailClient from "../../../components/BuyDetailClient";

export const metadata = {
  title: "Property Details | Qeemat.com",
  description: "View complete property details and contact our experts to buy your next asset.",
};

export default function BuyDetailPage({ params }: { params: { id: string } }) {
  return <BuyDetailClient propertyId={params.id} />;
}