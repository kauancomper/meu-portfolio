import { portfolioContent } from '../data/content';
import RecentWorks from './RecentWorks';
import Process from './Process';

export default function Hero() {
  const { hero } = portfolioContent;

  return (
    <>
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black py-32 px-6">
      <div className="max-w-4xl text-center flex flex-col gap-8 relative z-10">
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary-red animate-pulse" />
          <span className="text-brand-secondary-red font-mono text-xs tracking-widest uppercase">
            {hero.badge_label}
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
          <span className="block text-white/40">{hero.title_line1}</span>
          <span className="block text-white/90">{hero.title_line2}</span>
          <span className="text-brand-primary-red">{hero.title_name}</span>
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          {hero.description}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <button className="px-10 py-5 bg-white text-black font-black rounded-full uppercase">
            {hero.cta_primary}
          </button>
          <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-full uppercase">
            {hero.cta_secondary}
          </button>
        </div>
      </div>
    </section>
    <RecentWorks />
    <Process />
    </>
  );
}
