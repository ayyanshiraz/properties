import CommercialDetailClient from "../../../../components/CommercialDetailClient";

export const metadata = {
  title: "Commercial Details | Qeemat",
  description: "View complete commercial details and contact our experts.",
};

export default function CommercialDetailPage({ params }: { params: { id: string } }) {
  return <CommercialDetailClient propertyId={params.id} />;
}