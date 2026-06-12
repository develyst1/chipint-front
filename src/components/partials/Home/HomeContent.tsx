"use client";

import HomeHero from "./HomeHero";
import HomeTierSection from "./HomeTierSection";
import HomeAiSection from "./HomeAiSection";
import HomeFeaturedRobots from "./HomeFeaturedRobots";

export default function HomeContent() {
  return (
    <main>
      <HomeHero />
      <HomeFeaturedRobots />
      <HomeTierSection />
      <HomeAiSection />
    </main>
  );
}
