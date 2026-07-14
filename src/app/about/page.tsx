import About from "../../components/About";

export const metadata = {
  title: "About Us | Qemaat",
  description: "Learn more about Qemaat, the leading real estate agency in Pakistan. Discover our story, our experts, and our core values."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <About />
    </main>
  );
}