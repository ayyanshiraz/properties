"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface BlogData {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
}

interface BlogDetailClientProps {
  blog: BlogData;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
    );

    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#fafafa] flex flex-col pt-[70px] overflow-x-hidden">
      
      <div ref={heroRef} className="w-full h-[50vh] relative overflow-hidden flex items-end pb-12">
        <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="bg-[#013220] text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest rounded w-max shadow-md mx-auto">
              {blog.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-300 font-bold uppercase tracking-wider mt-2">
              <span>{blog.date}</span>
              <div className="w-1.5 h-1.5 bg-[#013220] rounded-full"></div>
              <span>By {blog.author}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-16 flex flex-col gap-12">
        
        <div ref={contentRef} className="w-full flex flex-col gap-8">
          
          <div className="text-sm text-gray-500 font-medium flex items-center gap-2 mb-4">
            <Link href="/" className="hover:text-[#013220] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blogs" className="hover:text-[#013220] transition-colors">Blogs</Link>
            <span>/</span>
            <span className="text-gray-900 font-bold truncate">{blog.title}</span>
          </div>

          <div className="bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] p-8 md:p-12 rounded-2xl">
            <p className="text-gray-700 leading-loose text-lg font-light whitespace-pre-line">
              {blog.content}
            </p>
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
               <span className="font-bold text-gray-900 tracking-tight text-xl">Share this article</span>
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#013220] hover:text-white transition-colors border border-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </div>
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#013220] hover:text-white transition-colors border border-gray-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </div>
               </div>
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}