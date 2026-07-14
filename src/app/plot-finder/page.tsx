import PlotFinder from "../../components/PlotFinder";

export const metadata = {
  title: `Plot Finder | Qemaat`,
  description: `Search and discover available plots and properties across Lahore using our interactive map interface.`
};

export default function PlotFinderPage() {
  return (
    <main className={`w-full min-h-screen bg-gray-200`}>
      <PlotFinder />
    </main>
  );
}