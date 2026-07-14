import Team from "../../components/Team";

export const metadata = {
  title: "Our Team | Qemaat",
  description: "Meet the dedicated professionals and experts behind Qemaat."
};

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white">
      <Team />
    </main>
  );
}