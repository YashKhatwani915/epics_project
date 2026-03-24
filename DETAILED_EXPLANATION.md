# WorkLink — Complete Detailed Explanation

**Everything you need to know: routing, pages, components, and special code lines.**

---

## 📁 Table of Contents

1. [How Next.js Routing Works](#how-nextjs-routing-works)
2. [File-by-File Breakdown](#file-by-file-breakdown)
3. [Special & Unique Code Lines](#special--unique-code-lines)
4. [Data Flow Between Pages](#data-flow-between-pages)
5. [Component Hierarchy](#component-hierarchy)
6. [Key React Patterns Used](#key-react-patterns-used)

---

## How Next.js Routing Works

### Next.js App Router (File-Based Routing)

In Next.js 13+, the **folder structure** under `src/app/` directly maps to URLs:

```
src/app/
├── page.tsx              → URL: /
├── login/
│   ├── page.tsx          → URL: /login
│   └── form/
│       └── page.tsx      → URL: /login/form
├── dashboard/
│   └── page.tsx          → URL: /dashboard
└── jobs/
    ├── page.tsx          → URL: /jobs
    └── [id]/
        └── page.tsx      → URL: /jobs/1, /jobs/2, etc.
```

**Key Rules:**
- **`page.tsx`** = the component that renders for that route
- **`layout.tsx`** = wraps all pages in that folder (and nested folders)
- **`[id]`** = dynamic segment (captures `/jobs/1`, `/jobs/2`, etc.)
- **`(folder)`** = route groups (ignored in URL, used for organization)

**Example:**
- File: `src/app/login/form/page.tsx`
- URL: `http://localhost:3001/login/form`
- When user visits `/login/form`, Next.js renders the component exported from that `page.tsx`

---

## File-by-File Breakdown

### 1. `src/app/layout.tsx` — Root Layout

**What it does:**
- Wraps **every single page** in the app
- Sets up `<html>` and `<body>` tags
- Imports `globals.css` so all global styles are available everywhere
- Sets metadata (title, description) for SEO

**Code breakdown:**

```typescript
import type { Metadata } from "next";
import "./globals.css";
```

- `Metadata` type = TypeScript type for Next.js metadata
- `"./globals.css"` = imports global CSS file (Tailwind + custom styles)

```typescript
export const metadata: Metadata = {
  title: "WorkLink — Jobs for Skilled & Unskilled Workers",
  description: "Find local job opportunities...",
};
```

- This metadata appears in the browser tab title and search engine results

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

- `{children}` = whatever page component is being rendered (home, login, dashboard, etc.)
- `className="dark"` = tells Tailwind to use dark mode classes

**Special:** This is the **only** place where `<html>` and `<body>` tags exist. All other pages are just fragments that get inserted into `{children}`.

---

### 2. `src/app/globals.css` — Global Styles

**What it does:**
- Imports Tailwind CSS
- Defines CSS variables for colors (theme)
- Creates utility classes (`.glass`, `.glow-amber`, `.glow-teal`)
- Styles scrollbar

**Special code lines:**

```css
@import "tailwindcss";
```

- This imports Tailwind's utility classes (`flex`, `bg-amber-500`, `rounded-xl`, etc.)

```css
:root {
  --background: #0c0c0f;
  --accent: #f59e0b;
  --teal: #14b8a6;
  /* ... */
}
```

- CSS variables defined here can be used anywhere: `var(--background)`, `var(--accent)`
- Makes it easy to change colors globally

```css
.glass {
  background: rgba(20, 20, 26, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

- **Glassmorphism effect**: semi-transparent background + blur = glass-like appearance
- `backdrop-filter: blur(12px)` = blurs whatever is behind the element
- Used on cards throughout the app (login form, job cards, dashboard cards)

```css
.glow-amber {
  box-shadow: 0 0 40px -10px rgba(245, 158, 11, 0.4);
}
```

- Creates a glowing shadow effect (amber-colored)
- Used on buttons and important elements

---

### 3. `src/app/page.tsx` — Home Page (`/`)

**What it shows:**
- Header with logo ("HIGHER") and two buttons: "Sign in" and "Get started"
- Hero section with large heading: "Jobs that fit your skills and your location"
- Two CTA buttons: "I'm a Job Seeker" and "I'm Hiring"
- Two feature cards: "Technical & Skilled" and "Unskilled & Local"
- Footer

**Routing from this page:**

```typescript
<Link href="/login">Sign in</Link>
```

- Clicking "Sign in" → goes to `/login`

```typescript
<Link href="/login?register=1">Get started</Link>
```

- Clicking "Get started" → goes to `/login?register=1` (query param `register=1` means "registration mode")

```typescript
<Link href="/login?role=seeker">I'm a Job Seeker</Link>
```

- Clicking "I'm a Job Seeker" → goes to `/login?role=seeker` (pre-selects "seeker" role)

```typescript
<Link href="/login?role=giver">I'm Hiring</Link>
```

- Clicking "I'm Hiring" → goes to `/login?role=giver` (pre-selects "giver" role)

**Special code lines:**

```typescript
"use client";
```

- **Critical:** This tells Next.js "this component needs to run in the browser"
- Needed because we use:
  - `motion` from framer-motion (animations need browser APIs)
  - `useState`, `onClick` handlers (React hooks/interactivity)

```typescript
import Scene3DWrapper from "@/components/Scene3DWrapper";
```

- `@/` = alias for `src/` (configured in `tsconfig.json`)
- Imports the 3D background component

```typescript
<main className="relative min-h-screen overflow-hidden">
  <Scene3DWrapper />
```

- `relative` = allows absolute positioning of children
- `min-h-screen` = at least full viewport height
- `overflow-hidden` = prevents scrollbars from 3D scene
- `Scene3DWrapper` = the 3D background (positioned absolutely behind content)

```typescript
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
>
```

- **Framer Motion animation:**
  - `initial` = starting state (invisible, 20px to the left)
  - `animate` = end state (visible, at normal position)
  - `transition` = how long animation takes (0.5 seconds)
  - Creates smooth fade-in + slide-in effect

```typescript
<span className="bg-gradient-to-r from-amber-400 to-teal-400 bg-clip-text text-transparent">
  your skills
</span>
```

- **Gradient text effect:**
  - `bg-gradient-to-r` = horizontal gradient
  - `from-amber-400 to-teal-400` = colors
  - `bg-clip-text` = clips background to text shape
  - `text-transparent` = makes text transparent so gradient shows through

```typescript
<motion.div
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
```

- **Scroll-triggered animation:**
  - `whileInView` = animate when element enters viewport
  - `viewport={{ once: true }}` = only animate once (don't re-animate on scroll back up)

```typescript
© {new Date().getFullYear()} WorkLink.
```

- `new Date().getFullYear()` = gets current year (2026, 2027, etc.)
- Updates automatically each year

---

### 4. `src/app/login/page.tsx` — Login Page (`/login`)

**What it shows:**
- Multi-step form:
  - **Step 1:** Choose "Job Seeker" or "Job Giver" (if no role selected)
  - **Step 2:** Choose "Technical Skilled" or "Unskilled" (if role selected but not skill type)
  - **Step 3:** "Continue" button that links to `/login/form` with query params

**How routing works here:**

```typescript
const searchParams = useSearchParams();
const [role, setRole] = useState<Role>(
  (searchParams.get("role") as Role) || null
);
```

- `useSearchParams()` = Next.js hook to read URL query params (`?role=seeker&register=1`)
- `searchParams.get("role")` = gets value of `?role=` from URL
- If URL is `/login?role=seeker`, `role` state starts as `"seeker"` (pre-selected)
- If URL is `/login`, `role` state starts as `null` (no pre-selection)

```typescript
const isRegister = searchParams.get("register") === "1";
```

- Checks if URL has `?register=1`
- If yes → shows "Create account" text
- If no → shows "Sign in" text

**Step-by-step flow:**

```typescript
{role === null && (
  <motion.div>
    {/* Step 1: Choose role */}
    <button onClick={() => handleRoleSelect("seeker")}>Job Seeker</button>
    <button onClick={() => handleRoleSelect("giver")}>Job Giver</button>
  </motion.div>
)}
```

- If `role` is `null` → show Step 1 (choose role)
- Clicking a button calls `handleRoleSelect("seeker")` → sets `role` to `"seeker"`

```typescript
{role !== null && skillType === null && (
  <motion.div>
    {/* Step 2: Choose skill type */}
    <button onClick={() => setSkillType("skilled")}>Technical Skilled</button>
    <button onClick={() => setSkillType("unskilled")}>Unskilled</button>
  </motion.div>
)}
```

- If `role` is set but `skillType` is `null` → show Step 2 (choose skill type)
- Clicking sets `skillType` to `"skilled"` or `"unskilled"`

```typescript
{role !== null && skillType !== null && (
  <Link href={`/login/form?role=${role}&type=${skillType}&register=${isRegister ? "1" : "0"}`}>
    Continue →
  </Link>
)}
```

- If both `role` and `skillType` are set → show Step 3 (continue button)
- Link builds URL with all params: `/login/form?role=seeker&type=skilled&register=0`

**Special code lines:**

```typescript
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0c0c0f]" />}>
      <LoginContent />
    </Suspense>
  );
}
```

- **Why Suspense?** `useSearchParams()` needs Suspense boundary in Next.js App Router
- `fallback` = what to show while loading (dark background)

```typescript
<AnimatePresence mode="wait">
  {role === null && <motion.div key="role">...</motion.div>}
  {role !== null && skillType === null && <motion.div key="skill">...</motion.div>}
</AnimatePresence>
```

- **AnimatePresence** = allows exit animations when components unmount
- `mode="wait"` = wait for exit animation to finish before showing next step
- `key` prop = helps React identify which component is which (needed for animations)

```typescript
const handleRoleSelect = (r: Role) => {
  setRole(r);
  setSkillType(null);  // Reset skill type when role changes
};
```

- When role changes, reset `skillType` to `null` (forces user to re-select skill type)

---

### 5. `src/app/login/form/page.tsx` — Login Form (`/login/form`)

**What it shows:**
- Form with:
  - Email input (required)
  - Password input (required)
  - Name input (only shown if `register=1`)
- Submit button: "Create account" or "Sign in" (depends on `register` param)
- Link to switch between login/register

**How it reads URL params:**

```typescript
const role = searchParams.get("role") || "seeker";
const type = searchParams.get("type") || "skilled";
const isRegister = searchParams.get("register") === "1";
```

- Gets `role`, `type`, and `register` from URL query params
- Defaults: `role="seeker"`, `type="skilled"` if not provided

**What happens on submit:**

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();  // Prevent page refresh
  
  if (typeof window !== "undefined") {
    sessionStorage.setItem(
      "worklink_user",
      JSON.stringify({ role, type, name: name || "User" })
    );
  }
  router.push("/dashboard");
};
```

- `e.preventDefault()` = stops form from submitting normally (no page refresh)
- `typeof window !== "undefined"` = checks if we're in browser (not server)
- `sessionStorage.setItem()` = saves data to browser's session storage
  - Key: `"worklink_user"`
  - Value: JSON string like `{"role":"seeker","type":"skilled","name":"John"}`
- `router.push("/dashboard")` = redirects to dashboard page

**Special code lines:**

```typescript
{isRegister && (
  <div>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
  </div>
)}
```

- **Conditional rendering:** Only shows name input if `isRegister` is `true`
- `value={name}` = controlled input (React state controls the value)
- `onChange={(e) => setName(e.target.value)}` = updates state when user types

```typescript
<input
  className="w-full rounded-xl border border-zinc-700 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
/>
```

- `bg-white/5` = 5% opacity white background (Tailwind opacity syntax)
- `pl-10` = padding-left for icon
- `focus:border-amber-500/50` = amber border on focus
- `focus:ring-1` = adds subtle ring on focus (accessibility)

```typescript
<Link href={`/login/form?role=${role}&type=${type}&register=1`}>
  Sign up
</Link>
```

- **Template literal:** Builds URL with current `role` and `type`, but toggles `register` to `1`
- Allows switching between login/register without losing selected role/type

---

### 6. `src/app/dashboard/page.tsx` — Dashboard (`/dashboard`)

**What it shows:**
- Header with user info and logout button
- Greeting: "Hello, [First Name]"
- Two main action cards:
  - "Browse jobs" → links to `/jobs`
  - "By location" → links to `/jobs?filter=location`
- Profile badges showing role and skill type

**How it reads user data:**

```typescript
useEffect(() => {
  if (typeof window === "undefined") return;  // Skip on server
  const raw = sessionStorage.getItem("worklink_user");
  if (!raw) {
    router.replace("/login");  // No user data → redirect to login
    return;
  }
  try {
    setUser(JSON.parse(raw) as UserData);  // Parse JSON string
  } catch {
    router.replace("/login");  // Invalid data → redirect to login
  }
}, [router]);
```

- `useEffect` = runs after component mounts (in browser)
- `sessionStorage.getItem("worklink_user")` = reads data saved from login form
- `JSON.parse(raw)` = converts JSON string back to object
- If no data or invalid → redirects to `/login`
- If valid → sets `user` state

**Special code lines:**

```typescript
if (!user) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0c0f]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
    </div>
  );
}
```

- **Loading state:** Shows spinner while checking sessionStorage
- `animate-spin` = Tailwind animation (rotating spinner)
- `border-t-transparent` = makes top border transparent (creates gap in circle)

```typescript
const isSeeker = user.role === "seeker";
const isSkilled = user.type === "skilled";
```

- **Derived state:** Calculates booleans from user data
- Used throughout component to conditionally render content

```typescript
<h1>Hello, {user.name.split(" ")[0] || "there"}</h1>
```

- `user.name.split(" ")[0]` = gets first word of name ("John Doe" → "John")
- `|| "there"` = fallback if name is empty

```typescript
{isSeeker
  ? "Find jobs that match your profile and location."
  : "Post and manage job openings for workers near you."}
```

- **Ternary operator:** Shows different text based on role

```typescript
<Link href="/jobs?filter=location">
  By location
</Link>
```

- Links to `/jobs` with `?filter=location` query param
- Jobs page reads this and shows different message

```typescript
const handleLogout = () => {
  sessionStorage.removeItem("worklink_user");
  router.replace("/");
};
```

- `sessionStorage.removeItem()` = deletes saved user data
- `router.replace("/")` = redirects to home (can't go back)

---

### 7. `src/app/jobs/page.tsx` — Jobs List (`/jobs`)

**What it shows:**
- Header with back button and title
- Filter buttons: "All", "Technical", "Unskilled"
- List of job cards (each links to `/jobs/[id]`)

**Mock data:**

```typescript
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
  // ... more jobs
];
```

- Hardcoded array of job objects
- Each has: `id`, `title`, `company`, `location`, `type`, `salary`, `posted`

**Filtering logic:**

```typescript
const [skillFilter, setSkillFilter] = useState<"all" | "skilled" | "unskilled">("all");

const jobs = MOCK_JOBS.filter((job) => {
  if (skillFilter === "all") return true;
  return job.type === skillFilter;
});
```

- `filter()` = JavaScript array method (creates new array with matching items)
- If `skillFilter === "all"` → return all jobs
- Otherwise → only return jobs where `job.type === skillFilter`

**Special code lines:**

```typescript
const filterLocation = searchParams.get("filter") === "location";
```

- Checks if URL has `?filter=location`
- Used to show different subtitle text

```typescript
{(["all", "skilled", "unskilled"] as const).map((f) => (
  <button
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
```

- **Dynamic button rendering:** Maps over array to create buttons
- `as const` = TypeScript assertion (keeps literal types)
- **Template literal with ternary:** Changes className based on `skillFilter === f`
- Active button = amber background, inactive = transparent

```typescript
{jobs.map((job, i) => (
  <motion.li
    key={job.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.05 }}
  >
```

- **Staggered animation:** Each job card animates with increasing delay
- `delay: i * 0.05` = first card delays 0s, second 0.05s, third 0.1s, etc.
- Creates cascading effect

```typescript
<Link href={`/jobs/${job.id}`}>
```

- **Dynamic link:** Each job links to `/jobs/1`, `/jobs/2`, etc.
- `[id]` folder handles these routes

```typescript
<span className={`rounded-full px-3 py-1 text-xs font-medium ${
  job.type === "skilled"
    ? "bg-amber-500/20 text-amber-400"
    : "bg-teal-500/20 text-teal-400"
}`}>
```

- **Conditional styling:** Different colors for skilled vs unskilled badges

---

### 8. `src/app/jobs/[id]/page.tsx` — Job Detail (`/jobs/1`, `/jobs/2`, etc.)

**What it shows:**
- Job title, company, location, salary, posted date
- Description
- "Apply for this job" button

**How it gets the job ID:**

```typescript
const params = useParams();
const id = params.id as string;
const job = MOCK_JOBS[id];
```

- `useParams()` = Next.js hook to read dynamic route segments
- If URL is `/jobs/1`, `params.id` = `"1"`
- Looks up job in `MOCK_JOBS` object using `id` as key

**Error handling:**

```typescript
if (!job) {
  return (
    <main className="min-h-screen bg-[#0c0c0f] flex items-center justify-center">
      <div className="text-center">
        <p className="text-zinc-400">Job not found.</p>
        <Link href="/jobs">Back to jobs</Link>
      </div>
    </main>
  );
}
```

- If `job` is `undefined` (invalid ID) → show "Job not found" message
- Provides link back to jobs list

**Special code lines:**

```typescript
const MOCK_JOBS: Record<string, { ... }> = {
  "1": { title: "Security Guard", ... },
  "2": { title: "Frontend Developer", ... },
};
```

- **TypeScript Record type:** `Record<KeyType, ValueType>`
- Maps string IDs to job objects
- Easier lookup than array (O(1) vs O(n))

```typescript
<button onClick={() => router.back()}>
  Back
</button>
```

- `router.back()` = goes to previous page in browser history
- Better UX than hardcoded link

---

### 9. `src/components/Scene3D.tsx` — 3D Scene Component

**What it renders:**
- Three.js Canvas (WebGL container)
- Lights (ambient, directional, point lights)
- Glass blob (transmission material sphere)
- Three floating wireframe orbs (amber, teal, purple)

**Special code lines:**

```typescript
"use client";
```

- **Must be client component:** Three.js uses browser WebGL APIs (not available on server)

```typescript
import { Canvas } from "@react-three/fiber";
```

- `Canvas` = React Three Fiber component (creates Three.js scene/camera/renderer)
- Wraps all 3D content

```typescript
<Canvas
  camera={{ position: [0, 0, 5], fov: 50 }}
  gl={{ alpha: true, antialias: true }}
  dpr={[1, 2]}
>
```

- `camera={{ position: [0, 0, 5] }}` = camera at (0, 0, 5) looking at origin
- `fov: 50` = field of view (50 degrees)
- `gl={{ alpha: true }}` = transparent background (allows page content behind)
- `antialias: true` = smooth edges
- `dpr={[1, 2]}` = device pixel ratio (1x on low-res, 2x on high-res screens)

```typescript
<color attach="background" args={["#0c0c0f"]} />
```

- Sets canvas background color
- `attach="background"` = attaches to scene background property

```typescript
<ambientLight intensity={0.4} />
<directionalLight position={[10, 10, 5]} intensity={1} />
<pointLight position={[-10, -10, -5]} color="#f59e0b" intensity={0.5} />
```

- **Three types of lights:**
  - `ambientLight` = soft overall light (no shadows)
  - `directionalLight` = sun-like light from direction
  - `pointLight` = light bulb (emits from point, colored amber)

```typescript
function Blob() {
  const ref = useRef<Mesh>(null);
  return (
    <Sphere ref={ref} args={[1, 64, 64]}>
      <MeshTransmissionMaterial
        transmission={0.95}
        thickness={0.4}
        chromaticAberration={0.05}
        // ... more props
      />
    </Sphere>
  );
}
```

- `useRef<Mesh>(null)` = React ref to access Three.js mesh object (not used here but good practice)
- `Sphere` = Drei component (creates sphere geometry)
- `args={[1, 64, 64]}` = radius 1, 64 segments (smooth sphere)
- `MeshTransmissionMaterial` = Drei material (glass-like effect)
  - `transmission={0.95}` = 95% transparent (like glass)
  - `thickness={0.4}` = how thick the glass is
  - `chromaticAberration={0.05}` = slight color separation (realistic glass)

```typescript
<Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
  <Blob />
</Float>
```

- `Float` = Drei component (adds floating animation)
- `speed={1.5}` = animation speed
- `rotationIntensity={0.2}` = how much it rotates
- `floatIntensity={0.5}` = how much it moves up/down

```typescript
<mesh position={[3, 1, -2]} scale={0.8}>
  <sphereGeometry args={[1, 32, 32]} />
  <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.3} wireframe />
</mesh>
```

- `mesh` = React Three Fiber component (creates Three.js mesh)
- `position={[3, 1, -2]}` = x=3, y=1, z=-2 (3D coordinates)
- `scale={0.8}` = 80% size
- `sphereGeometry` = creates sphere shape
- `meshStandardMaterial` = standard material (reacts to lights)
  - `color="#f59e0b"` = amber color
  - `emissive="#f59e0b"` = glows amber
  - `emissiveIntensity={0.3}` = 30% glow
  - `wireframe` = only shows edges (no fill)

```typescript
<Environment preset="night" />
```

- `Environment` = Drei component (adds environment map)
- `preset="night"` = pre-made night sky environment
- Provides reflections/ambient lighting

```typescript
<div className="absolute inset-0 -z-10">
```

- `absolute` = absolute positioning
- `inset-0` = top:0, right:0, bottom:0, left:0 (full screen)
- `-z-10` = behind other content (negative z-index)

---

### 10. `src/components/Scene3DWrapper.tsx` — 3D Wrapper (Client-Only Loader)

**What it does:**
- Dynamically imports `Scene3D` component
- Only loads in browser (not on server)
- Shows loading placeholder while loading

**Special code lines:**

```typescript
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-[#0c0c0f]" />,
});
```

- `dynamic()` = Next.js function for code splitting
- `() => import("./Scene3D")` = lazy import (loads when needed)
- `ssr: false` = **don't render on server** (only in browser)
- `loading` = component to show while loading

**Why this is needed:**
- Three.js uses WebGL (browser API)
- Server doesn't have WebGL → would crash
- `ssr: false` prevents server-side rendering
- Loading placeholder matches background color (seamless transition)

---

## Data Flow Between Pages

### Complete User Journey:

1. **Home (`/`)** → User clicks "Get started"
   - URL: `/login?register=1`

2. **Login (`/login`)** → Reads `?register=1` from URL
   - Shows "Create account" text
   - User selects "Job Seeker" → sets `role = "seeker"`
   - User selects "Technical Skilled" → sets `skillType = "skilled"`
   - Clicks "Continue" → builds URL: `/login/form?role=seeker&type=skilled&register=1`

3. **Login Form (`/login/form`)** → Reads all params from URL
   - Shows "Create your account" (because `register=1`)
   - Shows name input (because `isRegister = true`)
   - User fills form → submits
   - **Saves to sessionStorage:** `{"role":"seeker","type":"skilled","name":"John"}`
   - Redirects to `/dashboard`

4. **Dashboard (`/dashboard`)** → Reads from sessionStorage
   - `useEffect` runs → reads `"worklink_user"` from sessionStorage
   - Parses JSON → sets `user` state
   - Shows personalized greeting and profile badges
   - User clicks "Browse jobs" → goes to `/jobs`

5. **Jobs List (`/jobs`)** → Shows filtered jobs
   - User clicks filter "Unskilled" → filters jobs array
   - User clicks a job → goes to `/jobs/1`

6. **Job Detail (`/jobs/1`)** → Reads `id` from URL
   - `useParams()` gets `id = "1"`
   - Looks up job in `MOCK_JOBS["1"]`
   - Shows job details

### Data Storage:

- **URL Query Params:** Used for passing data between pages (role, type, register)
- **sessionStorage:** Used for persistent data (user info) across page reloads
- **React State:** Used for temporary UI state (form inputs, filters)

---

## Component Hierarchy

```
RootLayout (layout.tsx)
└── {children} (current page)
    ├── HomePage (page.tsx)
    │   ├── Scene3DWrapper
    │   │   └── Scene3D (dynamic import, ssr: false)
    │   │       └── Canvas (@react-three/fiber)
    │   │           ├── Lights
    │   │           ├── Blob (Sphere + MeshTransmissionMaterial)
    │   │           ├── FloatingOrbs (meshes)
    │   │           └── Environment
    │   ├── Header (motion.div)
    │   ├── Hero Section (motion.h1, motion.p)
    │   ├── CTA Buttons (Links)
    │   └── Feature Cards (motion.div)
    │
    ├── LoginPage (login/page.tsx)
    │   ├── Scene3DWrapper
    │   └── LoginContent (Suspense)
    │       └── Step-by-step form (AnimatePresence)
    │
    ├── LoginFormPage (login/form/page.tsx)
    │   ├── Scene3DWrapper
    │   └── FormContent (Suspense)
    │       └── Form (inputs + submit)
    │
    ├── DashboardPage (dashboard/page.tsx)
    │   ├── Scene3DWrapper
    │   ├── Header
    │   └── Dashboard Content (motion.div)
    │       ├── Greeting
    │       ├── Action Cards (Links)
    │       └── Profile Badges
    │
    ├── JobsPage (jobs/page.tsx)
    │   ├── Scene3DWrapper
    │   ├── Header
    │   └── Jobs List (motion.li items)
    │
    └── JobDetailPage (jobs/[id]/page.tsx)
        ├── Scene3DWrapper
        ├── Header
        └── Job Details
```

---

## Key React Patterns Used

### 1. **Controlled Components**
```typescript
const [email, setEmail] = useState("");
<input value={email} onChange={(e) => setEmail(e.target.value)} />
```
- React state controls input value
- Single source of truth

### 2. **Conditional Rendering**
```typescript
{isRegister && <input type="text" />}
{role === null ? <Step1 /> : <Step2 />}
```
- Shows/hides elements based on state

### 3. **Derived State**
```typescript
const isSeeker = user.role === "seeker";
const jobs = MOCK_JOBS.filter(job => job.type === skillFilter);
```
- Calculates values from other state
- Avoids redundant state

### 4. **Effect Hook**
```typescript
useEffect(() => {
  const user = sessionStorage.getItem("worklink_user");
  setUser(JSON.parse(user));
}, []);
```
- Runs after component mounts
- Reads from browser APIs

### 5. **Dynamic Imports**
```typescript
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });
```
- Code splitting (loads when needed)
- Prevents server-side rendering

### 6. **Template Literals**
```typescript
href={`/login/form?role=${role}&type=${skillType}`}
```
- Builds strings with variables

### 7. **Array Methods**
```typescript
jobs.map(job => <JobCard key={job.id} />)
jobs.filter(job => job.type === filter)
```
- Transforms arrays into JSX
- Filters arrays

---

## Summary

**Routing:** Next.js App Router maps folders to URLs. `page.tsx` = route component.

**Pages:**
- `/` = Home (landing page with 3D background)
- `/login` = Multi-step role/skill selection
- `/login/form` = Email/password form (saves to sessionStorage)
- `/dashboard` = User dashboard (reads from sessionStorage)
- `/jobs` = Job listings with filters
- `/jobs/[id]` = Individual job detail

**3D Background:** `Scene3D` (Three.js + React Three Fiber) loaded via `Scene3DWrapper` (dynamic import, client-only).

**Data Flow:** URL params → React state → sessionStorage → dashboard reads sessionStorage.

**Styling:** Tailwind utilities + custom CSS (`.glass`, `.glow-amber`) + CSS variables.

This document covers every file, every route, and every special code line in detail!
