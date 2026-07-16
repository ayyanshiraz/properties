"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"

export default function TermsClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen w-full overflow-x-hidden bg-white text-gray-900 py-24 px-8 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        <header ref={headerRef} className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#013220]">Terms and Conditions</h1>
          <p className="text-lg text-gray-500 font-medium">Last updated: July 15, 2026</p>
        </header>

        <div ref={contentRef} className="flex flex-col gap-12 text-[17px] leading-relaxed text-gray-700">
          
          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p>By accessing and using the Qemaat portal, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.</p>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-gray-900">2. User Accounts and Security</h2>
            <p>To list a property or manage alerts, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your registered profile. Qemaat will not be liable for any loss caused by unauthorized access.</p>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-gray-900">3. Property Listings Policy</h2>
            <p>All properties listed on Qemaat must be accurate, lawful, and available. We reserve the right to review, approve, modify, or remove any listing that violates our internal policies or contains misleading information without prior notice.</p>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-gray-900">4. Intellectual Property Rights</h2>
            <p>The content, layout, design, data, and graphics on this website are strictly owned by Qemaat. Unauthorized reproduction, distribution, or commercial exploitation is strictly prohibited without prior written consent from our administrative team.</p>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-gray-900">5. Limitation of Liability</h2>
            <p>Qemaat and its administrative team shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services, or any real estate information provided on the platform.</p>
          </section>

          <section className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-gray-900">6. Modifications to Terms</h2>
            <p>We reserve the right to update these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the platform signifies your acceptance of the revised terms.</p>
          </section>

        </div>
      </div>
    </main>
  )
}