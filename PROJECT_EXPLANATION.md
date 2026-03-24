# WorkLink Project — Easy & Detailed Explanation

Use this doc to explain to anyone how the project is made, what libraries and components are used, and how Three.js and React work together.

---

## 1. What Is This Project?

**WorkLink** is a job portal website for two kinds of people:

- **Job Seekers** — people looking for work  
- **Job Givers** — companies or people who are hiring  

Each person also picks their type:

- **Technical Skilled** — developers, electricians, mechanics, etc.  
- **Unskilled** — guards, labour, delivery, etc. (with **location** so jobs are shown near the person)

The website has:

- A **landing page** with a 3D background  
- **Login / signup** where you choose: Job Seeker or Job Giver → then Skilled or Unskilled  
- A **dashboard** after login  
- **Job listings** with filters and **location** (e.g. “2 km away”)  
- **Job detail** pages  

Everything is **frontend only** right now (no real backend or database). Login just saves your choices in the browser and shows the dashboard.

---

## 2. What Framework Is It Built With?

**Next.js** (version 16).

- Next.js is a **React framework** — it uses React for the UI and adds:
  - **File-based routing**: each folder under `src/app/` becomes a URL.
  - **Server and client**: some code runs on the server, some in the browser.
  - **Built-in optimizations** for production (bundling, images, etc.).

So in short: **React + Next.js** = the base of the whole app.

---

## 3. Libraries Used (and What Each One Does)

| Library | What it does |
|--------|----------------|
| **Next.js** | React framework: routing, build, server/client split. |
| **React** | Builds the UI (components, state, pages). |
| **TypeScript** | Adds types to JavaScript so the code is safer and easier to understand. |
| **Tailwind CSS** | Utility-first CSS: you style with classes like `rounded-xl`, `bg-amber-500`, `flex`, etc. No separate CSS files for most styling. |
| **Three.js** | 3D library for the browser. It draws 3D shapes, lights, and cameras (the “engine” behind the 3D scene). |
| **@react-three/fiber** | Lets you build Three.js scenes **using React components**. Instead of writing raw Three.js code, you write JSX like `<Sphere>`, `<mesh>`, `<pointLight>`. |
| **@react-three/drei** | Extra helpers for React Three Fiber: things like `Float` (floating animation), `MeshTransmissionMaterial` (glass-like material), `Environment` (sky/reflections), etc. |
| **framer-motion** | Animations: fade in, slide, stagger. We use `<motion.div>`, `initial`, `animate`, `transition` for smooth page and card animations. |
| **lucide-react** | Icon set (Briefcase, MapPin, User, Lock, etc.). We use these as React components. |

In one line: **Next.js + React + Tailwind** do the website; **Three.js + React Three Fiber + Drei** do the 3D; **Framer Motion** does the animations; **Lucide** does the icons.

---

## 4. Project Structure (Folders and Files)

```
epics2/
├── src/
│   ├── app/                    ← Next.js “App Router” (each folder = route)
│   │   ├── layout.tsx          ← Wraps every page (HTML, body, global CSS)
│   │   ├── page.tsx            ← Home page (/)
│   │   ├── globals.css         ← Global styles, variables, .glass, .glow-amber
│   │   ├── login/
│   │   │   ├── page.tsx        ← /login — choose Job Seeker or Job Giver
│   │   │   └── form/
│   │   │       └── page.tsx    ← /login/form — email, password, name
│   │   ├── dashboard/
│   │   │   └── page.tsx        ← /dashboard — after login
│   │   └── jobs/
│   │       ├── page.tsx        ← /jobs — list of jobs
│   │       └── [id]/
│   │           └── page.tsx    ← /jobs/1, /jobs/2 — single job
│   └── components/
│       ├── Scene3D.tsx         ← The 3D scene (blob + orbs + lights)
│       └── Scene3DWrapper.tsx  ← Loads Scene3D only in the browser (no SSR)
├── public/                     ← Static assets (images, etc.)
├── package.json                ← Dependencies and scripts
└── next.config.ts              ← Next.js config
```

- **`app/`** = all routes. File name `page.tsx` means “this is the page for this URL.”  
- **`[id]`** = dynamic segment (e.g. `/jobs/1`).  
- **`components/`** = reusable pieces (here, the 3D scene and its wrapper).

---

## 5. How the App Works (User Flow)

1. User opens **/** → sees landing page with 3D background, “Job Seeker” / “Job Giver” buttons.  
2. Clicks **Sign in** or **Get started** → goes to **/login**.  
3. On **/login**:  
   - Step 1: Choose **Job Seeker** or **Job Giver**.  
   - Step 2: Choose **Technical Skilled** or **Unskilled**.  
   - Then a “Continue” link sends them to **/login/form** with `role`, `type`, and `register` in the URL.  
4. On **/login/form**: user enters email, password, and (if registering) name, then submits.  
5. On submit we **don’t call any API**. We save `{ role, type, name }` in **sessionStorage** and redirect to **/dashboard**.  
6. **Dashboard** reads that data and shows: “Browse jobs” and “By location.”  
7. **/jobs** shows a list of mock jobs; user can filter by All / Skilled / Unskilled. Each job has a **location** (e.g. “Mumbai Central, 2 km away”).  
8. Clicking a job goes to **/jobs/[id]** (e.g. `/jobs/1`) for the job detail page.

So: **Landing → Login (role + type) → Form → Dashboard → Jobs list → Job detail.** All driven by React state and URL; “login” is simulated with sessionStorage.

---

## 6. Three.js and React — How the 3D Part Is Made

### Why not plain Three.js?

Plain **Three.js** is used with the **DOM** and **requestAnimationFrame**: you create a scene, camera, lights, meshes, and update them in a loop. In a React/Next.js app, that would be awkward (lifecycle, cleanup, server vs browser).

### What React Three Fiber does

**@react-three/fiber** turns Three.js into **React**:

- You describe the 3D scene with **JSX**: `<Canvas>`, `<mesh>`, `<Sphere>`, `<pointLight>`, etc.  
- Each of these becomes a Three.js object (scene, mesh, light) under the hood.  
- React handles when the component mounts and unmounts, so the 3D scene is created and disposed correctly.

So we don’t write `new THREE.Mesh(...)` manually; we write `<mesh>` and set props.

### What Drei adds

**@react-three/drei** gives us:

- **`<Float>`** — makes a 3D object float and gently move/rotate.  
- **`<Sphere>`** — a sphere geometry (instead of creating it with raw Three.js).  
- **`<MeshTransmissionMaterial>`** — a special material that looks like **glass** (transparent, refracts light, slight distortion).  
- **`<Environment>`** — adds environment lighting/reflections (e.g. “night” preset).

So: **Three.js** = 3D engine; **Fiber** = use it with React; **Drei** = handy building blocks for our scene.

### What’s actually in our 3D scene (Scene3D.tsx)

1. **Canvas** (from Fiber)  
   - The container where the 3D world is drawn.  
   - We set camera position, enable alpha (transparency) and antialias.

2. **Lights**  
   - `ambientLight` — soft overall light.  
   - `directionalLight` — main direction light.  
   - Two `pointLight`s — amber and teal, to match the site’s colors.

3. **Blob**  
   - A **Sphere** with **MeshTransmissionMaterial**.  
   - It looks like a glass ball (transmission, thickness, distortion, iridescence).  
   - Wrapped in **Float** so it floats gently.

4. **Floating orbs**  
   - Three spheres with **wireframe** material (only edges, no fill).  
   - Colors: amber, teal, purple.  
   - Each wrapped in **Float** with different speed and intensity so they move a bit.

5. **Environment**  
   - Drei’s “night” preset for subtle reflections/ambient.

All of this is **inside one React component** (`Scene3D`). So when we say “the 3D background,” we mean: one component that renders a Canvas and, inside it, lights + blob + orbs + environment.

### Why Scene3DWrapper?

**Scene3D** uses the **browser’s WebGL** (via Three.js). That doesn’t exist on the **server** when Next.js pre-renders the page.

So we **don’t** import Scene3D directly in the page. We use **Scene3DWrapper**:

- **Scene3DWrapper** uses Next.js **dynamic import**: `dynamic(() => import("./Scene3D"), { ssr: false })`.  
- `ssr: false` means: “only load and run this component in the **browser**.”  
- Until it loads, we show a simple loading placeholder (same background color).

So: **Scene3DWrapper** = “load the 3D scene only on the client, and show a fallback while loading.” That’s how we use Three.js safely with Next.js.

---

## 7. Main Components (Simple Breakdown)

### Layout (app/layout.tsx)

- Wraps **every** page.  
- Sets the HTML structure, metadata (title, description), and imports **globals.css**.  
- No 3D here; just the shell of the site.

### Scene3D (components/Scene3D.tsx)

- **Client-only** (has `"use client"` at the top).  
- Renders the **Canvas** and inside it: lights, Blob (glass sphere), FloatingOrbs (wireframe spheres), Environment.  
- Uses **three**, **@react-three/fiber**, and **@react-three/drei**.  
- Placed in a div with `absolute inset-0 -z-10` so it sits behind the rest of the page.

### Scene3DWrapper (components/Scene3DWrapper.tsx)

- **Client-only.**  
- Dynamically imports **Scene3D** with `ssr: false` and a loading state.  
- Used on: home, login, login form, dashboard, jobs. So the same 3D background appears on those pages.

### Pages (app/**/page.tsx)

- **page.tsx** in each folder is the UI for that route.  
- They use:  
  - **Tailwind** for layout and styling.  
  - **framer-motion** for `<motion.div>`, `<motion.h1>`, etc., with `initial`, `animate`, `transition`.  
  - **lucide-react** for icons.  
  - **Scene3DWrapper** where we want the 3D background.  
- Login page also uses **useState** and **useSearchParams** for the step-by-step flow (role → skill type → form).

So the “components” you can name when explaining are: **Layout**, **Scene3D**, **Scene3DWrapper**, and the **page** components for each route.

---

## 8. Styling (Tailwind + globals.css)

- **Tailwind** does most of the work: spacing (`p-6`, `mt-4`), colors (`bg-amber-500`, `text-white`), flex/grid (`flex`, `grid`), responsiveness (`md:px-12`).  
- **globals.css** does:  
  - **CSS variables** in `:root` (e.g. `--background`, `--accent`, `--teal`) so we can reuse the same colors.  
  - **.glass** — semi-transparent background + blur (glassmorphism).  
  - **.glow-amber** / **.glow-teal** — soft box-shadow for buttons/cards.  
  - Custom scrollbar and body font.

So: “We use Tailwind for layout and utility styling, and a small global CSS file for theme variables and effects like glass and glow.”

---

## 9. Important Concepts to Mention When Explaining

- **Next.js App Router**: Routes come from the `app/` folder structure; `page.tsx` = page for that URL.  
- **Client vs server**: Components with `"use client"` run in the browser (needed for 3D, useState, onClick). The 3D scene is loaded only on the client via dynamic import.  
- **React Three Fiber**: React components that represent Three.js objects (Canvas, meshes, lights).  
- **Drei**: Helper library for R3F (Float, materials, Environment).  
- **Framer Motion**: Declarative animations with `<motion.*>` and props.  
- **sessionStorage**: We use it to “remember” the user (role, type, name) after the fake login so the dashboard can show the right UI.

---

## 10. One-Paragraph Summary You Can Say Out Loud

“WorkLink is a Next.js frontend for a job portal. We use React for the UI, Tailwind for styling, and Framer Motion for animations. The 3D background is built with Three.js through React Three Fiber and Drei: we have a glass-like sphere and floating wireframe orbs, with lights and environment. The 3D component is loaded only in the browser using a dynamic import so it doesn’t break server-side rendering. The app has a landing page, a multi-step login where you choose Job Seeker or Job Giver and then Skilled or Unskilled, a dashboard, and job listings with location info. Login is simulated with sessionStorage; there’s no backend yet. Icons are from Lucide React.”

You can copy this file or parts of it whenever you need to explain the project to someone.
