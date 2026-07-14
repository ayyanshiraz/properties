import Services from "../../components/Services";

export const metadata = {
  title: "Our Services | Qemaat",
  description: "Explore the extraordinary real estate services offered by Qemaat, including buying, selling, leasing, property management, and concierge services."
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Services />
    </main>
  );
}