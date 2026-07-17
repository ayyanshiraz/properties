"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface SortableImage {
  id: string;
  file: File;
  preview: string;
}

export default function AddProperty() {
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: "",
    type: "For Sale",
    category: "Homes",
    area: "",
    price: "",
    location: "",
    description: "",
    featuresList: "",
    floorRates: "",
    paymentPlans: ""
  });

  const [videoFiles, setVideoFiles] = useState<FileList | null>(null);
  
  // Naya Drag & Drop Image State
  const [images, setImages] = useState<SortableImage[]>([]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFiles(e.target.files);
    }
  };

  // Image Selection Handler
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newImages]);
    }
    // Reset input so same files can be selected again if needed
    e.target.value = "";
  };

  const removeImage = (idToRemove: string) => {
    setImages(prev => prev.filter(img => img.id !== idToRemove));
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    // For Firefox compatibility
    e.dataTransfer.setData("text/html", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    
    if (draggedIdx === null || draggedIdx === index) return;
    
    const newImages = [...images];
    const draggedItem = newImages[draggedIdx];
    
    newImages.splice(draggedIdx, 1);
    newImages.splice(index, 0, draggedItem);
    
    setImages(newImages);
    setDraggedIdx(index);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    let parsedFloorRates = null;
    let parsedPaymentPlans = null;
    let parsedFeatures: string[] = [];
    
    if (formData.featuresList) {
       parsedFeatures = formData.featuresList.split(",").map((f: string) => f.trim()).filter((f: string) => f.length > 0);
    }
    
    try {
      if (formData.floorRates) parsedFloorRates = JSON.parse(formData.floorRates);
      if (formData.paymentPlans) parsedPaymentPlans = JSON.parse(formData.paymentPlans);
    } catch (err) {
      alert("Invalid JSON format in Floor Rates or Payment Plans. Please ensure correct JSON.");
      setIsUploading(false);
      return;
    }
    
    try {
      const storedUserString = localStorage.getItem("user");
      const storedUser = storedUserString ? JSON.parse(storedUserString) : null;

      if (!storedUser || !storedUser.id) {
        throw new Error("You must be logged in to add a property.");
      }

      // Upload Images exactly in the sorted order
      const uploadFilesToSupabase = async (files: File[], folder: string) => {
        const uploadedUrls: string[] = [];
        for (const file of files) {
          const fileExt = file.name.split(".").pop();
          const fileName = Math.random().toString(36).substring(2) + "." + fileExt;
          const filePath = folder + "/" + fileName;
          
          const { error } = await supabase.storage.from("property-media").upload(filePath, file);
          if (error) throw new Error("Media Upload Failed: " + error.message);
          
          const { data: publicUrlData } = supabase.storage.from("property-media").getPublicUrl(filePath);
          uploadedUrls.push(publicUrlData.publicUrl);
        }
        return uploadedUrls;
      };

      const filesToUpload = images.map(img => img.file);
      const uploadedImageUrls = await uploadFilesToSupabase(filesToUpload, "images");
      
      const vFiles = videoFiles ? Array.from(videoFiles) : [];
      const uploadedVideoUrls = await uploadFilesToSupabase(vFiles, "videos");

      const payload = {
        ...formData,
        images: uploadedImageUrls,
        videos: uploadedVideoUrls,
        userId: storedUser.id,
        featuresList: parsedFeatures,
        floorRates: parsedFloorRates,
        paymentPlans: parsedPaymentPlans
      };

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Server Error: Database mein save nahi ho saka.");

      const result = await response.json();

      if (result.success) {
        setShowSuccessModal(true);
        setFormData({ title: "", type: "For Sale", category: "Homes", area: "", price: "", location: "", description: "", featuresList: "", floorRates: "", paymentPlans: "" });
        setImages([]);
        setVideoFiles(null);
      } else {
        throw new Error("Property save karte waqt backend par masla aya.");
      }

    } catch (error: any) {
      console.error("Submission error:", error);
      alert("Error: " + (error.message || "Unknown error occurred."));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
            <p className="text-gray-600 mb-8">Your property has been successfully listed.</p>
            <Link href="/account" className="block w-full bg-green-700 text-white rounded-lg px-4 py-3 font-semibold hover:bg-green-800 transition-colors shadow-md text-center">
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}

      <div ref={formRef} className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-black mb-2 text-center">Add New Property</h1>
        <p className="text-gray-500 text-center mb-10">Fill in the details below</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none text-black" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none bg-white text-black">
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Co-Working Space">Co-Working Space</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Category (Homes / Plots / Commercial)</label>
              <select name="category" value={formData.category} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none bg-white text-black">
                <option value="Homes">Homes</option>
                <option value="Plots">Plots</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Area / Dimension (Optional)</label>
              <input type="text" name="area" value={formData.area} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none text-black" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (PKR)</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none text-black" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none text-black" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none text-black" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Advanced: Features List (Comma separated)</label>
              <textarea name="featuresList" value={formData.featuresList} onChange={handleChange} rows={2} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none text-black" placeholder="Feature 1, Feature 2, Feature 3" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Advanced: Floor Rates (Valid JSON Array)</label>
              <textarea name="floorRates" value={formData.floorRates} onChange={handleChange} rows={3} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none text-black" placeholder='[{"floor": "Ground Floor", "rate": "PKR 145,000"}]' />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Advanced: Payment Plans (Valid JSON Array)</label>
              <textarea name="paymentPlans" value={formData.paymentPlans} onChange={handleChange} rows={3} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none text-black" placeholder='[{"title": "100 SQFT OFFICE", "value": "5,000,000"}]' />
            </div>

            {/* Interactive Image Upload Section */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload & Order Pictures</label>
              <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none text-black mb-4" />
              
              {images.length > 0 && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-500 mb-3 font-semibold">Drag and drop images to change their display order. The first image will be the cover.</p>
                  <div className="flex flex-wrap gap-4">
                    {images.map((img, index) => (
                      <div 
                        key={img.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 cursor-grab active:cursor-grabbing ${draggedIdx === index ? 'border-green-500 opacity-50' : 'border-gray-300 hover:border-green-500'}`}
                      >
                        <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {index + 1}
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeImage(img.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Videos</label>
              <input type="file" accept="video/*" multiple onChange={handleVideoChange} className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none text-black" />
            </div>

          </div>

          <div className="pt-6">
            <button type="submit" disabled={isUploading || images.length === 0} className="w-full bg-green-700 text-white py-4 px-4 rounded-lg hover:bg-green-800 transition duration-300 font-semibold text-lg shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isUploading ? "Uploading Media and Saving..." : "List Property"}
            </button>
            {images.length === 0 && <p className="text-red-500 text-xs text-center mt-2 font-bold">Please select at least one image to list.</p>}
          </div>
        </form>
      </div>
    </div>
  );
}