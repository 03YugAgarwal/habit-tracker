import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col">
      <Navbar />

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#f0f6fc] leading-tight">
              Build habits.
              <br />
              Track them visually.
            </h1>

            <p className="mt-6 text-lg text-[#8b949e]">
              A simple habit tracker inspired by GitHub’s contribution graph.
              Click once a day. Stay consistent. See progress over time.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-[#238636] px-5 py-3 text-sm font-medium text-white hover:bg-[#2ea043]"
              >
                Get started
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-[#30363d] px-5 py-3 text-sm font-medium hover:bg-[#161b22]"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-[#30363d]">
          <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
            <Feature
              title="Visual consistency"
              description="See your habits as a heatmap. Missed days stand out. Streaks motivate."
            />
            <Feature
              title="One-click tracking"
              description="Click the card to mark today done. Click again to undo."
            />
            <Feature
              title="Flexible logging"
              description="Forgot a day? Add past entries anytime. Your data, your rules."
            />
          </div>
        </section>

        {/* Call to action */}
        <section className="border-t border-[#30363d]">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl font-semibold text-[#f0f6fc]">
              Start building better habits today
            </h2>
            <p className="mt-3 text-[#8b949e]">
              No subscriptions. No noise. Just progress.
            </p>

            <div className="mt-6">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-[#238636] px-6 py-3 text-sm font-medium text-white hover:bg-[#2ea043]"
              >
                Create your account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-[#f0f6fc] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#8b949e]">
        {description}
      </p>
    </div>
  );
}
