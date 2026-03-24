"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Search,
  LogOut,
  Wrench,
  User,
  Building2,
} from "lucide-react";
import Scene3DWrapper from "@/components/Scene3DWrapper";

type UserData = { role: string; type: string; name: string } | null;

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("worklink_user");
    if (!raw) {
      router.replace("/login");
      return;
    }
    try {
      setUser(JSON.parse(raw) as UserData);
    } catch {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("worklink_user");
    router.replace("/");
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c0c0f]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  const isSeeker = user.role === "seeker";
  const isSkilled = user.type === "skilled";

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Scene3DWrapper />

      <header className="relative z-10 flex items-center justify-between border-b border-zinc-800/50 bg-black/20 px-6 py-4 backdrop-blur-sm md:px-12">
        <Link href="/dashboard" className="flex items-center gap-2">
        <img src = "/logo.jpeg" alt="logo" className="h-9 w-9" />
          {/* <Briefcase className="h-6 w-6 text-amber-400" /> */}
          <span className="text-lg font-semibold text-white">HIGHER</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">
            {user.name} • {isSeeker ? "Seeker" : "Giver"} •{" "}
            {isSkilled ? "Skilled" : "Unskilled"}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </header>

      <div className="relative z-10 px-6 py-10 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl"
        >
          <h1 className="text-3xl font-bold text-white">
            Hello, {user.name.split(" ")[0] || "there"}
          </h1>
          <p className="mt-1 text-zinc-400">
            {isSeeker
              ? "Find jobs that match your profile and location."
              : "Post and manage job openings for workers near you."}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Link
              href="/jobs"
              className="group flex items-center gap-4 rounded-2xl glass p-6 transition hover:border-amber-500/30 hover:bg-amber-500/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                <Search className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-semibold text-white">Browse jobs</h2>
                <p className="text-sm text-zinc-400">
                  {isSeeker
                    ? "View opportunities near you"
                    : "See your posted jobs"}
                </p>
              </div>
            </Link>
            <Link
              href="/jobs?filter=location"
              className="group flex items-center gap-4 rounded-2xl glass p-6 transition hover:border-teal-500/30 hover:bg-teal-500/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-semibold text-white">By location</h2>
                <p className="text-sm text-zinc-400">
                  Jobs in your area — great for unskilled roles
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-8 rounded-2xl glass p-6">
            <h2 className="font-semibold text-white">Your profile</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 rounded-lg bg-amber-500/20 px-3 py-1.5 text-sm text-amber-400">
                {isSeeker ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                {isSeeker ? "Job Seeker" : "Job Giver"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-teal-500/20 px-3 py-1.5 text-sm text-teal-400">
                <Wrench className="h-4 w-4" />
                {isSkilled ? "Technical Skilled" : "Unskilled / Local"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
