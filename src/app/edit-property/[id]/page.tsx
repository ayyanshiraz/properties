"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import { useParams } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export default function EditProperty() {
  const params = useParams();
  const propertyId = params?.id as string;
  
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: "",
    type: "For Sale",
    category: "Homes",
    area: "",
    price: "",
    location: "",
    description: ""
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingVideos, setExistingVideos] = useState<string[]>([]);

  const [mediaFiles, setMediaFiles] = useState<{ images: FileList | null; videos: FileList | null }>({
    images: null,
    videos: null
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!propertyId) return;

    const fetchSingleProperty = async () => {
      try {
        const response = await fetch("/api/properties/" + propertyId, { cache: "no-store" });
        const result = await response.json();
        
        if (result.success && result.data) {
          const propertyToEdit = result.data;
          
          setFormData({
            title: propertyToEdit.title || "",
            type: propertyToEdit.type || "For Sale",
            category: propertyToEdit.category || "Homes",
            area: propertyToEdit.area || "",
            price: propertyToEdit.price || "",
            location: propertyToEdit.location || "",
            description: propertyToEdit.description || ""
          });
          
          setExistingImages(propertyToEdit.images || []);
          setExistingVideos(propertyToEdit.videos || []);
        } else {
          console.error("Data load hone mein masla hai");
        }
      } catch (error) {
        console.error("Error loading property details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSingleProperty();
  }, [propertyId]);

  useEffect(() => {
    if (!isLoading && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles({ ...mediaFiles, [e.target.name]: e.target.files })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    
    try {
      const imageFiles = mediaFiles.images ? Array.from(mediaFiles.images) : [];
      const videoFiles = mediaFiles.videos ? Array.from(mediaFiles.videos) : [];

      const uploadToSupabase = async (files: File[], folder: string) => {
        const uploadedUrls: string[] = []
        for (const file of files) {
          const fileExt = file.name.split(".").pop()
          const fileName = Math.random().toString(36).substring(2) + "." + fileExt
          const filePath = folder + "/" + fileName
          const { error } = await supabase.storage.from("property-media").upload(filePath, file)
          if (error) continue
          const { data: publicUrlData } = supabase.storage.from("property-media").getPublicUrl(filePath)
          uploadedUrls.push(publicUrlData.publicUrl)
        }
        return uploadedUrls
      }

      const newImageUrls = await uploadToSupabase(imageFiles, "images")
      const newVideoUrls = await uploadToSupabase(videoFiles, "videos")

      const finalImages = newImageUrls.length > 0 ? newImageUrls : existingImages;
      const finalVideos = newVideoUrls.length > 0 ? newVideoUrls : existingVideos;

      const payload = {
        ...formData,
        images: finalImages,
        videos: finalVideos
      };

      const response = await fetch("/api/properties/" + propertyId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (result.success) {
        setShowSuccessModal(true)
      } else {
        alert("System Error: Property update karte waqt koi masla pesh aaya.")
      }

    } catch (error) {
      console.error("Submission error:", error)
      alert("Network request fail ho gayi.")
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-700 font-bold text-xl">
        Loading Property Details...
      </div>
    );
  }

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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Updated!</h3>
            <p className="text-gray-600 mb-8">Your property has been successfully updated on Qemaat.</p>
            <Link href="/account" className="block w-full bg-green-700 text-white rounded-lg px-4 py-3 font-semibold hover:bg-green-800 transition-colors shadow-md text-center">
              Back to Dashboard
            </Link>
          </div>
        </div>
      )}

      <div ref={formRef} className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Edit Property</h1>
        <p className="text-gray-500 text-center mb-10">Update the details of your property below</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-black" required />
            </div>

            <div className={formData.type === "For Sale" ? "" : "md:col-span-2"}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 bg-white text-black">
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Co-Working Space">Co-Working Space</option>
              </select>
            </div>

            {formData.type === "For Sale" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 bg-white text-black">
                  <option value="Homes">Homes</option>
                  <option value="Plots">Plots</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            )}

            {formData.type === "For Sale" && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Area / Dimension</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-black" required />
              </div>
            )}
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (PKR)</label>
              <input type="text" name="price" value={formData.price} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-black" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Complete Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-black" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={6} className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 text-black" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Replace Pictures (Optional)</label>
              <input type="file" name="images" accept="image/*" multiple onChange={handleFileChange} className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none text-black" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Replace Videos (Optional)</label>
              <input type="file" name="videos" accept="video/*" multiple onChange={handleFileChange} className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none text-black" />
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={isUploading} className="w-full bg-green-700 text-white py-4 px-4 rounded-lg hover:bg-green-800 transition duration-300 font-semibold text-lg shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isUploading ? "Updating Media and Saving..." : "Update Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}