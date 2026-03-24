"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Wrench, UserPlus } from "lucide-react";
import Scene3DWrapper from "@/components/Scene3DWrapper";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Scene3DWrapper />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
          <img src = "/logo.jpeg" alt="logo" className="h-9 w-9" />
            {/* <Briefcase className="h-5 w-5" /> */}
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">HIGHER</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-3"
        >
          <Link
            href="/login"
            className="rounded-lg border border-zinc-600/80 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/10 hover:border-amber-500/30"
          >
            Sign in
          </Link>
          <Link
            href="/login?register=1"
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-amber-400 glow-amber"
          >
            Get started
          </Link>
        </motion.div>
      </header>

      <section className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-6 text-center md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Job that fit's{" "}
          <span className="bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
            your skills
          </span>
          <br />
          and your location
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl"
        >
          Whether you&apos;re technical or looking for local gigs — guards, labour, delivery — find
          opportunities near you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/login?role=seeker"
            className="group flex items-center gap-2 rounded-xl glass border-amber-500/30 px-6 py-4 text-white transition hover:border-amber-500/60 hover:bg-amber-500/10"
          >
            <UserPlus className="h-5 w-5 text-amber-400" />
            <span className="font-medium">I&apos;m a Job Seeker</span>
          </Link>
          <Link
            href="/login?role=giver"
            className="group flex items-center gap-2 rounded-xl glass border-teal-500/30 px-6 py-4 text-white transition hover:border-teal-500/60 hover:bg-teal-500/10"
          >
            <Briefcase className="h-5 w-5 text-teal-400" />
            <span className="font-medium">I&apos;m Hiring</span>
          </Link>
        </motion.div>
      </section>

      <section className="relative z-10 border-t border-zinc-800/50 bg-black/20 px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl glass p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20">
              <Wrench className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Technical & Skilled</h3>
            <p className="mt-2 text-zinc-400">
              Frontend Developers, Backend developer, Cyber Security — match with roles that need your expertise.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl glass p-8"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20">
              <MapPin className="h-6 w-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Unskilled & Local</h3>
            <p className="mt-2 text-zinc-400">
              Security guards, helpers, delivery — jobs near you with no technical skills required.
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-zinc-800/50 px-6 py-6 text-center text-sm text-zinc-500 md:px-12">
        © {new Date().getFullYear()} HIGHER. Jobs for everyone, everywhere.
      </footer>
    </main>
  );
}
