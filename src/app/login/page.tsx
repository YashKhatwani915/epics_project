"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, UserPlus, Wrench, MapPin, ArrowLeft } from "lucide-react";
import Scene3DWrapper from "@/components/Scene3DWrapper";

type Role = "seeker" | "giver" | null;
type SkillType = "skilled" | "unskilled" | null;

function LoginContent() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>(
    (searchParams.get("role") as Role) || null
  );
  const [skillType, setSkillType] = useState<SkillType>(null);
  const isRegister = searchParams.get("register") === "1";

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    setSkillType(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Scene3DWrapper />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <Link
          href="/"
          className="absolute left-6 top-6 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl glass p-8 glow-amber/50">
            <h1 className="text-2xl font-bold text-white">
              {isRegister ? "Create account" : "Sign in"} to HIGHER
            </h1>
            <p className="mt-1 text-zinc-400">
              Choose how you want to use HIGHER
            </p>

            {/* Step 1: Role */}
            {role === null && (
              <motion.div
                key="role"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="mt-8 space-y-4"
              >
                <p className="text-sm font-medium text-zinc-300">I am a</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => handleRoleSelect("seeker")}
                    className="group flex flex-col items-center gap-3 rounded-xl border-2 border-zinc-700 bg-white/5 p-6 text-left transition hover:border-amber-500/50 hover:bg-amber-500/10"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30">
                      <UserPlus className="h-7 w-7" />
                    </div>
                    <span className="font-semibold text-white">Job Seeker</span>
                    <span className="text-center text-sm text-zinc-400">
                      Looking for work
                    </span>
                  </button>
                  <button
                    onClick={() => handleRoleSelect("giver")}
                    className="group flex flex-col items-center gap-3 rounded-xl border-2 border-zinc-700 bg-white/5 p-6 text-left transition hover:border-teal-500/50 hover:bg-teal-500/10"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 group-hover:bg-teal-500/30">
                      <Briefcase className="h-7 w-7" />
                    </div>
                    <span className="font-semibold text-white">Job Giver</span>
                    <span className="text-center text-sm text-zinc-400">
                      Hiring workers
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Skill type */}
            <AnimatePresence mode="wait">
              {role !== null && skillType === null && (
                <motion.div
                  key="skill"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="mt-8 space-y-4"
                >
                  <button
                    onClick={() => setRole(null)}
                    className="text-sm text-zinc-400 hover:text-white"
                  >
                    ← Change role
                  </button>
                  <p className="text-sm font-medium text-zinc-300">
                    I am looking for / I offer
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      onClick={() => setSkillType("skilled")}
                      className="group flex flex-col items-center gap-3 rounded-xl border-2 border-zinc-700 bg-white/5 p-6 text-left transition hover:border-amber-500/50 hover:bg-amber-500/10"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                        <Wrench className="h-7 w-7" />
                      </div>
                      <span className="font-semibold text-white">
                        Technical Skilled
                      </span>
                      <span className="text-center text-sm text-zinc-400">
                        Tech, trades, expertise
                      </span>
                    </button>
                    <button
                      onClick={() => setSkillType("unskilled")}
                      className="group flex flex-col items-center gap-3 rounded-xl border-2 border-zinc-700 bg-white/5 p-6 text-left transition hover:border-teal-500/50 hover:bg-teal-500/10"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
                        <MapPin className="h-7 w-7" />
                      </div>
                      <span className="font-semibold text-white">Unskilled</span>
                      <span className="text-center text-sm text-zinc-400">
                        Guard, labour, local gigs
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Redirect to form */}
              {role !== null && skillType !== null && (
                <motion.div
                  key="form-redirect"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8"
                >
                  <p className="text-sm text-zinc-400">
                    Redirecting to {isRegister ? "registration" : "login"}...
                  </p>
                  <Link
                    href={`/login/form?role=${role}&type=${skillType}&register=${isRegister ? "1" : "0"}`}
                    className="mt-4 inline-block w-full rounded-xl bg-amber-500 py-3 text-center font-medium text-zinc-900 transition hover:bg-amber-400"
                  >
                    Continue →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c0c0f]" />}>
      <LoginContent />
    </Suspense>
  );
}
