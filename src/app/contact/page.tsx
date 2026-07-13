import Contact from "../../components/Contact";

export const metadata = {
  title: "Contact Us | Qemaat.com",
  description: "Get in touch with Qemaat.com. We are ready to assist you with all your real estate needs."
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Contact />
    </main>
  );
}