"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface BlogItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

interface BlogsClientProps {
  blogs: BlogItem[];
}

export default function BlogsClient({ blogs }: BlogsClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroTextRef.current,
      { opacity: 0, scale: 0.8, y: 30, filter: "blur(10px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: "power4.out", delay: 0.1 }
    );

    if (contentRef.current) {
      const cards = contentRef.current.querySelectorAll(".blog-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 100, rotateX: 10 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", transformPerspective: 1000, delay: 0.3 }
      );
    }
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#fafafa] flex flex-col pt-[70px] overflow-hidden">
      
      <section ref={heroRef} className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#013220] transform scale-105">
           <div className="absolute inset-0 bg-black/40 mix-blend-overlay"></div>
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>

        <div ref={heroTextRef} className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
          <span className="text-white/80 font-bold tracking-widest uppercase text-sm mb-3">Insights and News</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
            Real Estate Journal
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl drop-shadow-md">
            Stay ahead of the market with expert analysis and the latest property updates
          </p>
        </div>
      </section>

      <section ref={contentRef} className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-16 flex flex-col gap-10">
        
        <div className="flex flex-col gap-2 border-b border-gray-200 pb-6">
          <div className="text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#013220] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-bold">Blogs</span>
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Latest Articles</h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link 
              href={"/blogs/" + blog.id} 
              key={blog.id} 
              className="blog-card flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(1,50,32,0.12)] hover:-translate-y-2 transition-all duration-400 group border border-gray-100"
            >
              <div className="relative w-full h-[240px] overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-[#013220] text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded shadow-md">
                  {blog.category}
                </div>
              </div>

              <div className="flex flex-col p-8 flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">
                  <span>{blog.date}</span>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span>By {blog.author}</span>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-[#013220] transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed font-light mb-6 flex-grow">
                  {blog.excerpt}
                </p>

                <div className="flex items-center gap-2 text-[#013220] font-black text-sm uppercase tracking-widest mt-auto group-hover:translate-x-2 transition-transform duration-300">
                  Read Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

    </main>
  );
}