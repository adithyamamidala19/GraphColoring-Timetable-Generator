import React, { useState } from "react";
import { TopNav } from "@/components/common/TopNav";
import { CustomCursor } from "@/components/common/CustomCursor";
import { Preloader } from "@/components/common/Preloader";
import { HomeHero } from "./HomeHero";
import { HomePinnedStory } from "./HomePinnedStory";
import { HomeBento } from "./HomeBento";
import { HomeWhyManualFails } from "./HomeWhyManualFails";
import { HomeLiveDemoStrip } from "./HomeLiveDemoStrip";
import { HomeFinalCta } from "./HomeFinalCta";
import { HomeFooter } from "./HomeFooter";
import { useSmoothScroll } from "@/motion";

export const HomePage: React.FC = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#14201B] relative selection:bg-[#D1FAE5] selection:text-[#065F46]">
      <CustomCursor />
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      <TopNav isWorkspace={false} />

      <main>
        <HomeHero />
        <HomePinnedStory />
        <HomeBento />
        <HomeWhyManualFails />
        <HomeLiveDemoStrip />
        <HomeFinalCta />
      </main>

      <HomeFooter />
    </div>
  );
};
