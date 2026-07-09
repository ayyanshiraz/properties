import Services from "../../components/Services";

export const metadata = {
  title: "Our Services | Qemaat.com",
  description: "Explore the extraordinary real estate services offered by Qemaat.com, including buying, selling, leasing, property management, and concierge services."
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Services />
    </main>
  );
}