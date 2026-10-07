import Closer from "./_components/closer/Closer";
import DaysSection from "./_components/days/DaysSection";
import FruitsSection from "./_components/fruits/FruitsSection";
import GuestSection from "./_components/guest/GuestSection";
import Hero from "./_components/hero/Hero";
import TetPrimer from "./_components/primer/TetPrimer";
import Proverb from "./_components/proverb/Proverb";
import RecipesSection from "./_components/recipes/RecipesSection";
import Setting from "./_components/setting/Setting";
import TetCountdown from "./_components/tet/TetCountdown";
import { TetYearProvider } from "./_components/tet/TetYear";

export default function Home() {
  return (
    <main>
      {/* the year picked in the countdown also sets the dates on the day cards */}
      <TetYearProvider>
        <Hero />
        <TetPrimer />
        <TetCountdown />
        <Setting />
        <DaysSection />
        <FruitsSection />
        <RecipesSection />
        <GuestSection />
        <Proverb />
        <Closer />
      </TetYearProvider>
    </main>
  );
}
