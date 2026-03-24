"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowLeft, Filter } from "lucide-react";
import Scene3DWrapper from "@/components/Scene3DWrapper";

// Mock jobs: mix of skilled and unskilled, with locations
const MOCK_JOBS = [
  {
    id: "1",
    title: "Security Guard",
    company: "SecurePlus Ltd",
    location: "Mumbai Central, 2 km away",
    type: "unskilled",
    salary: "₹12,000 - ₹15,000/mo",
    posted: "2 days ago",
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "TechStart Inc",
    location: "Andheri East, 5 km away",
    type: "skilled",
    salary: "₹40,000 - ₹60,000/mo",
    posted: "1 day ago",
  },
  {
    id: "3",
    title: "Delivery Helper",
    company: "QuickDeliver",
    location: "Bandra West, 1 km away",
    type: "unskilled",
    salary: "₹10,000 - ₹14,000/mo",
    posted: "3 hours ago",
  },
  {
    id: "4",
    title: "Backend Developer",
    company: "Power Solutions",
    location: "Thane, 8 km away",
    type: "skilled",
    salary: "₹75,000 - ₹85,000/mo",
    posted: "5 days ago",
  },
  {
    id: "5",
    title: "Site Labour",
    company: "BuildRight Constructions",
    location: "Powai, 3 km away",
    type: "unskilled",
    salary: "₹11,000 - ₹13,000/mo",
    posted: "1 day ago",
  },
  {
    id: "6",
    title: "Data Analyst",
    company: "DataDrive",
    location: "Lower Parel, 6 km away",
    type: "skilled",
    salary: "₹35,000 - ₹50,000/mo",
    posted: "4 days ago",
  },
];

function JobsContent() {
  const searchParams = useSearchParams();
  const filterLocation = searchParams.get("filter") === "location";
  const [skillFilter, setSkillFilter] = useState<"all" | "skilled" | "unskilled">("all");

  const jobs = MOCK_JOBS.filter((job) => {
    if (skillFilter === "all") return true;
    return job.type === skillFilter;
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Scene3DWrapper />

      <header className="relative z-10 flex items-center justify-between border-b border-zinc-800/50 bg-black/20 px-6 py-4 backdrop-blur-sm md:px-12">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
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
          className="mx-auto max-w-3xl"
        >
          <h1 className="text-2xl font-bold text-white">Job opportunities</h1>
          <p className="mt-1 text-zinc-400">
            {filterLocation
              ? "Showing jobs near your location — ideal for unskilled roles"
              : "Skilled and unskilled positions with location info"}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-zinc-500">
              <Filter className="h-4 w-4" />
              Filter:
            </span>
            {(["all", "skilled", "unskilled"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setSkillFilter(f)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  skillFilter === f
                    ? "bg-amber-500 text-zinc-900"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {f === "all" ? "All" : f === "skilled" ? "Technical" : "Unskilled"}
              </button>
            ))}
          </div>

          <ul className="mt-8 space-y-4">
            {jobs.map((job, i) => (
              <motion.li
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/jobs/${job.id}`}
                  className="block rounded-2xl glass p-6 transition hover:border-amber-500/30 hover:bg-amber-500/5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold text-white">{job.title}</h2>
                      <p className="mt-0.5 text-sm text-zinc-400">{job.company}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        job.type === "skilled"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-teal-500/20 text-teal-400"
                      }`}
                    >
                      {job.type === "skilled" ? "Skilled" : "Unskilled"}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-teal-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {job.posted}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-amber-400">
                    {job.salary}
                  </p>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </main>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c0c0f]" />}>
      <JobsContent />
    </Suspense>
  );
}
