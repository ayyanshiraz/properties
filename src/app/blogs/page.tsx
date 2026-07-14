import BlogsClient from "../../components/BlogsClient";

export const metadata = {
  title: "Real Estate Blogs & News | Qemaat",
  description: "Stay updated with the latest real estate market trends, investment tips, and property news.",
};

export default function BlogsPage() {
  const blogData = [
    {
      id: 1,
      title: "The Future of Real Estate in Lahore",
      excerpt: "Explore upcoming infrastructure projects and how they will impact property values in major residential sectors.",
      date: "July 12, 2026",
      author: "Market Analyst",
      category: "Market Trends",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1920"
    },
    {
      id: 2,
      title: "A Comprehensive Guide to Buying Your First Home",
      excerpt: "Step by step instructions on navigating the property purchasing process with complete peace of mind.",
      date: "July 05, 2026",
      author: "Real Estate Expert",
      category: "Buying Guide",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920"
    },
    {
      id: 3,
      title: "Top Commercial Investment Opportunities",
      excerpt: "Discover the most lucrative commercial zones currently offering high rental yields and capital appreciation.",
      date: "June 28, 2026",
      author: "Investment Advisor",
      category: "Investment",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920"
    },
    {
      id: 4,
      title: "Maximizing Your Rental Yields",
      excerpt: "Learn effective strategies for managing your rental properties and ensuring consistent passive income.",
      date: "June 15, 2026",
      author: "Property Manager",
      category: "Rental Tips",
      image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1920"
    }
  ];

  return <BlogsClient blogs={blogData} />;
}