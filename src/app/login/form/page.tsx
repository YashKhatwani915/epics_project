"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import Scene3DWrapper from "@/components/Scene3DWrapper";

function FormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role") || "seeker";
  const type = searchParams.get("type") || "skilled";
  const isRegister = searchParams.get("register") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "worklink_user",
        JSON.stringify({ role, type, name: name || "User" })
      );
    }
    router.push("/dashboard");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Scene3DWrapper />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <Link
          href="/login"
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
          <div className="rounded-2xl glass p-8">
            <p className="text-sm text-zinc-400">
              {role === "seeker" ? "Job Seeker" : "Job Giver"} •{" "}
              {type === "skilled" ? "Technical Skilled" : "Unskilled"}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-white">
              {isRegister ? "Create your account" : "Welcome back"}
            </h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {isRegister && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-zinc-700 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-zinc-700 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-zinc-700 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-amber-500 py-3 font-medium text-zinc-900 transition hover:bg-amber-400 glow-amber"
              >
                {isRegister ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <Link href="/login" className="text-amber-400 hover:underline">
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href={`/login/form?role=${role}&type=${type}&register=1`}
                    className="text-amber-400 hover:underline"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function LoginFormPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c0c0f]" />}>
      <FormContent />
    </Suspense>
  );
}
