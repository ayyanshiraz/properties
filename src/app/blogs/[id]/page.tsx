import BlogDetailClient from "../../../components/BlogDetailClient";

export const metadata = {
  title: "Blog Details | Qemaat",
  description: "Read the full article and stay updated with real estate news.",
};

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  let currentTitle = "The Future of Real Estate in Lahore";
  let currentDate = "July 12, 2026";
  let currentAuthor = "Market Analyst";
  let currentCategory = "Market Trends";
  let currentImage = "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920";
  let currentContent = "Lahore is experiencing a massive shift in its real estate dynamics. With the introduction of new infrastructure projects, the city is expanding rapidly towards the south. Investors are closely watching these developments as they present unique opportunities for high return on investment.\n\nThe residential sectors are seeing an influx of modern housing societies that offer state of the art amenities. Furthermore, commercial zones are developing at a fast pace, providing dedicated spaces for businesses to thrive.\n\nIt is crucial for buyers to conduct thorough research before making any financial commitments. Engaging with registered real estate agents and consulting legal advisors can prevent potential complications. Overall, the market outlook remains highly positive for both short term traders and long term investors.";

  if (params.id === "2") {
    currentTitle = "A Comprehensive Guide to Buying Your First Home";
    currentCategory = "Buying Guide";
    currentImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920";
    currentDate = "July 05, 2026";
  } else if (params.id === "3") {
    currentTitle = "Top Commercial Investment Opportunities";
    currentCategory = "Investment";
    currentImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920";
    currentDate = "June 28, 2026";
  } else if (params.id === "4") {
    currentTitle = "Maximizing Your Rental Yields";
    currentCategory = "Rental Tips";
    currentImage = "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1920";
    currentDate = "June 15, 2026";
  }

  const blogData = {
    id: params.id,
    title: currentTitle,
    date: currentDate,
    author: currentAuthor,
    category: currentCategory,
    image: currentImage,
    content: currentContent
  };

  return <BlogDetailClient blog={blogData} />;
}