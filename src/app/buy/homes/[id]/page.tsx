import HomesDetailClient from "../../../../components/HomesDetailClient";

export const metadata = {
  title: "Home Details | Qeemat",
  description: "View complete home details and contact our experts.",
};

export default function HomesDetailPage({ params }: { params: { id: string } }) {
  return <HomesDetailClient propertyId={params.id} />;
}