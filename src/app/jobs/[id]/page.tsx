"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Briefcase, Building2 } from "lucide-react";
import Scene3DWrapper from "@/components/Scene3DWrapper";

const MOCK_JOBS: Record<string, { title: string; company: string; location: string; type: string; salary: string; description: string; posted: string }> = {
  "1": { title: "Security Guard", company: "SecurePlus Ltd", location: "Mumbai Central, 2 km away", type: "unskilled", salary: "₹12,000 - ₹15,000/mo", posted: "2 days ago", description: "Night shift security at commercial building. Basic fitness required. Uniform provided." },
  "2": { title: "Frontend Developer", company: "TechStart Inc", location: "Andheri East, 5 km away", type: "skilled", salary: "₹40,000 - ₹60,000/mo", posted: "1 day ago", description: "React/Next.js experience. 2+ years. Remote hybrid option." },
  "3": { title: "Delivery Helper", company: "QuickDeliver", location: "Bandra West, 1 km away", type: "unskilled", salary: "₹10,000 - ₹14,000/mo", posted: "3 hours ago", description: "Assist with local deliveries. Two-wheeler preferred. Flexible hours." },
  "4": { title: "Electrician", company: "Power Solutions", location: "Thane, 8 km away", type: "skilled", salary: "₹25,000 - ₹35,000/mo", posted: "5 days ago", description: "Residential and commercial wiring. Valid license required." },
  "5": { title: "Site Labour", company: "BuildRight Constructions", location: "Powai, 3 km away", type: "unskilled", salary: "₹11,000 - ₹13,000/mo", posted: "1 day ago", description: "Construction site helper. No experience needed. Safety gear provided." },
  "6": { title: "Data Analyst", company: "DataDrive", location: "Lower Parel, 6 km away", type: "skilled", salary: "₹35,000 - ₹50,000/mo", posted: "4 days ago", description: "SQL, Python, Excel. 1+ years. Good for growth." },
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const job = MOCK_JOBS[id];

  if (!job) {
    return (
      <main className="min-h-screen bg-[#0c0c0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400">Job not found.</p>
          <Link href="/jobs" className="mt-4 inline-block text-amber-400 hover:underline">Back to jobs</Link>
        </div>
      </main>
    );
  }

  const isSkilled = job.type === "skilled";

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Scene3DWrapper />
      <header className="relative z-10 flex items-center justify-between border-b border-zinc-800/50 bg-black/20 px-6 py-4 backdrop-blur-sm md:px-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
        <img src = "/logo.jpeg" alt="logo" className="h-9 w-9" />
          {/* <Briefcase className="h-5 w-5 text-amber-400" /> */}
          <span className="font-semibold text-white">HIGHER</span>
        </Link>
      </header>

      <div className="relative z-10 px-6 py-10 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl"
        >
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${isSkilled ? "bg-amber-500/20 text-amber-400" : "bg-teal-500/20 text-teal-400"}`}>
            {isSkilled ? "Skilled" : "Unskilled"}
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white">{job.title}</h1>
          <p className="mt-1 flex items-center gap-2 text-zinc-400">
            <Building2 className="h-4 w-4" />
            {job.company}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-teal-400">
              <MapPin className="h-4 w-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Clock className="h-4 w-4" />
              {job.posted}
            </span>
          </div>
          <p className="mt-4 text-lg font-medium text-amber-400">{job.salary}</p>
          <div className="mt-8 rounded-2xl glass p-6">
            <h2 className="font-semibold text-white">Description</h2>
            <p className="mt-2 text-zinc-400">{job.description}</p>
          </div>
          <button className="mt-8 w-full rounded-xl bg-amber-500 py-3 font-medium text-zinc-900 transition hover:bg-amber-400">
            Apply for this job
          </button>
        </motion.div>
      </div>
    </main>
  );
}
