import { Link } from "react-router-dom";

// ─── Data ──────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id: "01",
    icon: "🤖",
    iconBg: "bg-indigo-500/10",
    tag: { label: "AI-powered", color: "bg-indigo-100 text-indigo-800" },
    title: "AI Caption Generator",
    desc: "Write scroll-stopping captions in seconds. Describe your post — AI handles tone, length, and platform style.",
    hero: true,
  },
  {
    id: "02",
    icon: "#",
    iconBg: "bg-violet-100",
    tag: { label: "Trending data", color: "bg-violet-100 text-violet-800" },
    title: "Hashtag Generator",
    desc: "Get trending, niche-relevant hashtags that actually move the needle.",
  },
  {
    id: "03",
    icon: "⏰",
    iconBg: "bg-teal-100",
    tag: { label: "Audience-based", color: "bg-teal-100 text-teal-800" },
    title: "Best Time Suggestion",
    desc: "Post when your audience is most active — not when everyone else does.",
  },
  {
    id: "04",
    icon: "🌐",
    iconBg: "bg-orange-100",
    tag: { label: "6 platforms", color: "bg-orange-100 text-orange-800" },
    title: "Multi-Platform Posting",
    desc: "One click to publish across Instagram, X, LinkedIn, and more.",
  },
  {
    id: "05",
    icon: "📅",
    iconBg: "bg-amber-100",
    tag: { label: "Auto-publish", color: "bg-amber-100 text-amber-800" },
    title: "Smart Scheduling",
    desc: "Build a content calendar and let automation handle the rest.",
  },
  {
    id: "06",
    icon: "📊",
    iconBg: "bg-green-100",
    tag: { label: "Predictive AI", color: "bg-green-100 text-green-800" },
    title: "Engagement Prediction",
    desc: "See estimated likes and reach before you hit publish.",
  },
];

const STATS = [
  { value: "50K+", label: "Active creators" },
  { value: "12M+", label: "Posts published" },
  { value: "6",    label: "Platforms supported" },
  { value: "3×",   label: "Avg. engagement lift" },
];

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "Content Creator",
    initials: "PM",
    color: "bg-indigo-100 text-indigo-700",
    quote:
      "I went from spending 2 hours a day on captions to 10 minutes. The AI actually gets my voice.",
  },
  {
    name: "James Okafor",
    role: "Marketing Lead @ Flink",
    initials: "JO",
    color: "bg-teal-100 text-teal-700",
    quote:
      "Scheduling across six platforms used to be chaos. Now it's one click. Our reach tripled in a month.",
  },
  {
    name: "Sofia Ramos",
    role: "Freelance Social Strategist",
    initials: "SR",
    color: "bg-violet-100 text-violet-700",
    quote:
      "The engagement prediction is scary accurate. I've stopped guessing and started publishing with confidence.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="
      sticky top-0 z-50
      flex justify-between items-center
      px-12 py-4
      backdrop-blur-md bg-white/70
      border-b border-gray-200
    ">

      {/* Logo */}
      <h1 className="text-lg font-semibold text-indigo-600 tracking-wide">
        AI Social SaaS
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-6 text-sm">

        <Link
          to="/login"
          className="text-gray-600 hover:text-indigo-600 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="
            bg-indigo-600 text-white
            px-4 py-2 rounded-lg
            hover:bg-indigo-700
            transition
            shadow-sm
          "
        >
          Signup
        </Link>

      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 text-white overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-80 h-80 bg-white/5 rounded-full" />
      <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-white/5 rounded-full" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />

      {/* Eyebrow */}
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase bg-white/15 border border-white/25 px-4 py-1.5 rounded-full mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
        Now with GPT-4o powered captions
      </span>

      <h2 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl mb-6 tracking-tight">
        Manage All Your Social Media{" "}
        <span className="text-yellow-300">in One Place</span> 🚀
      </h2>

      <p className="text-lg max-w-xl text-indigo-100 mb-10 leading-relaxed">
        Create, schedule, and publish content across multiple platforms with
        AI-powered insights and automation.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/signup"
          className="bg-white text-indigo-600 px-7 py-3.5 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          Get Started — it's free
        </Link>
        <Link
          to="/login"
          className="border border-white/60 px-7 py-3.5 rounded-lg hover:bg-white hover:text-indigo-600 transition"
        >
          Login
        </Link>
      </div>

      <p className="mt-8 text-xs text-indigo-200">
        No credit card required · Free plan forever · Cancel anytime
      </p>

    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center py-10 px-6">
            <span className="text-3xl font-extrabold text-indigo-600 mb-1">
              {s.value}
            </span>
            <span className="text-sm text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HeroCard({ id, icon, iconBg, title, desc }) {
  return (
    <div className="col-span-2 bg-[#0f0c2e] rounded-2xl p-8 border border-[#1e1a4a] hover:border-indigo-500 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between min-h-[280px]">
      <div>
        <p className="text-xs font-semibold tracking-widest text-indigo-400 mb-3">{id}</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/30 px-2.5 py-1 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
          AI-powered
        </span>
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconBg} text-2xl mb-5`}>
          {icon}
        </div>
        <div className="w-8 h-0.5 bg-indigo-500/30 rounded mb-5" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-indigo-50 mb-2">{title}</h4>
        <p className="text-sm text-indigo-300 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function SmallCard({ id, icon, iconBg, title, desc, tag }) {
  return (
    <div
      className="
      relative bg-white rounded-2xl p-6 border border-gray-200 
      shadow-sm hover:shadow-xl hover:-translate-y-1 
      transition-all duration-300 group overflow-hidden
      "
    >

      {/* Subtle gradient glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-indigo-50 via-transparent to-blue-50" />

      <div className="relative z-10">

        <p className="text-[11px] font-semibold tracking-widest text-gray-400 mb-4">
          {id}
        </p>

        {/* Icon */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconBg} text-xl mb-5 
          group-hover:scale-110 transition`}
        >
          {icon}
        </div>

        <h4 className="text-base font-semibold text-gray-900 mb-2">
          {title}
        </h4>

        <p className="text-sm text-gray-500 leading-relaxed">
          {desc}
        </p>

        {/* Tag */}
        {tag && (
          <span
            className={`inline-block mt-5 text-[11px] font-medium px-3 py-1 rounded-full ${tag.color}`}
          >
            {tag.label}
          </span>
        )}

      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="py-28 px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-4">
            Everything you need
          </span>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-4">
            Powerful features, zero guesswork
          </h3>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Every tool is built to save time, boost reach, and make you look
            like a pro — whether you have 100 followers or 1 million.
          </p>
        </div>

        {/* ✅ 3 + 3 GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <SmallCard key={f.id} {...f} />
          ))}
        </div>

      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 px-10 bg-white">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-teal-600 bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full mb-4">
            Social proof
          </span>
          <h3 className="text-3xl font-extrabold text-gray-900">
            Loved by creators &amp; marketers
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 px-10 bg-gradient-to-br from-indigo-600 to-blue-500">
      <div className="max-w-3xl mx-auto text-center text-white">
        <h3 className="text-4xl font-extrabold mb-4 leading-tight">
          Ready to grow your social presence?
        </h3>
        <p className="text-indigo-100 mb-10 text-base leading-relaxed">
          Join 50,000+ creators who save hours every week and publish smarter with AI.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-100 transition shadow-xl"
        >
          Start for free — no card needed
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-indigo-600 font-semibold text-sm tracking-wide">
          AI Social SaaS
        </span>
        <p className="text-gray-400 text-xs">
          © 2026 AI Social SaaS. Built with ❤️ for creators everywhere.
        </p>
        <div className="flex gap-5 text-xs text-gray-400">
          <a href="#" className="hover:text-indigo-600 transition">Privacy</a>
          <a href="#" className="hover:text-indigo-600 transition">Terms</a>
          <a href="#" className="hover:text-indigo-600 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}