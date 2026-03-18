import {
  FiCpu,
  FiHeart,
  FiShuffle,
  FiEye,
  FiSliders,
} from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader.jsx";

const policyItems = [
  {
    icon: FiCpu,
    title: "Personalized recommendations",
    text:
      "We analyze your listening history, liked songs, and interactions to suggest music that matches your taste.",
  },
  {
    icon: FiHeart,
    title: "Your actions matter",
    text:
      "Every like, skip, or play helps the AI learn what you enjoy. This directly influences future recommendations.",
  },
  {
    icon: FiShuffle,
    title: "Breaking your bubble",
    text:
      "Recommendation systems can create a music bubble where you mostly hear similar songs. We add variation to help you discover new artists and genres.",
  },
  {
    icon: FiSliders,
    title: "Preference settings",
    text:
      "Your preference controls can shift recommendations toward familiar music or more exploration.",
  },
  {
    icon: FiEye,
    title: "Transparency and control",
    text:
      "You stay in control. By adjusting your preferences and interacting with songs, you shape what the AI shows you.",
  },
];

function PolicyCard({ icon: Icon, title, text }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-tertiary/35 px-4 py-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-text-primary">
          <Icon size={20} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-snug text-text-primary">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-7 text-text-primary/88">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Policy() {
  return (
    <div className="min-h-screen bg-background text-text-primary pb-28">
      <PageHeader title="AI Policy" />

      <main className="px-6 pt-4">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
          <h1 className="text-2xl font-bold leading-tight text-text-primary">
            How our AI works
          </h1>

          <p className="mt-3 text-base leading-8 text-text-primary/90">
            Our recommendation system helps you discover music based on your
            listening behavior. It is important that you understand how it works
            and how you can influence it.
          </p>
        </section>

        <div className="mt-6 flex flex-col gap-4">
          {policyItems.map((item) => (
            <PolicyCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>

        <section className="mt-6 rounded-2xl border border-primary/35 bg-primary/12 px-4 py-4">
          <p className="text-sm leading-7 text-text-primary/92">
            Our AI supports your music discovery, but it does not make decisions
            for you. You are always in control of what you play, like, and
            explore.
          </p>
        </section>
      </main>
    </div>
  );
}