import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { FinalLetterDialog } from "@/components/birthday/final-letter-dialog";
import { LoadingScreen } from "@/components/birthday/loading-screen";
import { Button } from "@/components/ui/button";
import { birthdayContent } from "@/constants/birthday-content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: birthdayContent.seo.title },
      { name: "description", content: birthdayContent.seo.description },
      { property: "og:title", content: birthdayContent.seo.title },
      { property: "og:description", content: birthdayContent.seo.description },
      { name: "twitter:title", content: birthdayContent.seo.title },
      { name: "twitter:description", content: birthdayContent.seo.description },
    ],
    links: [{ rel: "canonical", href: birthdayContent.seo.canonical }],
  }),
  component: BirthdayPage,
});

function BirthdayPage() {
  const [loaded, setLoaded] = useState(false);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [decorationStep, setDecorationStep] = useState(0);
  const [candlesLit, setCandlesLit] = useState(true);
  const [scrapbookIndex, setScrapbookIndex] = useState(0);

  const allCardsOpened = flippedCards.length === birthdayContent.cards.items.length;
  const decorationsComplete = decorationStep >= 3;

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const hashes = ["☆", "✦", "♡", "✧"];
    const interval = window.setInterval(() => {
      document.title = `${hashes[Math.floor(Math.random() * hashes.length)]} ${birthdayContent.seo.title}`;
    }, 1800);

    return () => {
      window.clearInterval(interval);
      document.title = birthdayContent.seo.title;
    };
  }, [loaded]);

  const toggleCard = (id: string) => {
    setFlippedCards((current) => (current.includes(id) ? current : [...current, id]));
  };

  const handleDecorationClick = () => {
    setDecorationStep((current) => {
      const nextStep = Math.min(current + 1, 3);

      if (nextStep >= 3) {
        setCandlesLit(true);
      }

      return nextStep;
    });
  };

  const previousPhoto = () => {
    setScrapbookIndex((current) =>
      current === 0 ? birthdayContent.scrapbook.photos.length - 1 : current - 1,
    );
  };

  const nextPhoto = () => {
    setScrapbookIndex((current) => (current + 1) % birthdayContent.scrapbook.photos.length);
  };

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <main className="page-shell relative isolate overflow-hidden">
        <div className="star-field" aria-hidden="true" />
        <div className="star-field star-field-delayed" aria-hidden="true" />
        <div className="constellation-glow constellation-glow-left" aria-hidden="true" />
        <div className="constellation-glow constellation-glow-right" aria-hidden="true" />

        <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 pb-20 pt-32 sm:px-8 lg:px-10">
          <div className="max-w-3xl animate-fade-in">
            <p className="eyebrow-pill">{birthdayContent.intro.eyebrow}</p>
            <h1 className="mt-6 font-display text-5xl leading-none text-foreground sm:text-6xl lg:text-7xl">
              {birthdayContent.intro.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {birthdayContent.intro.subtitle}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#cards-section">
              <Button variant="dream" size="lg">Start the surprise</Button>
            </a>
            <a href="#letter-section">
              <Button variant="soft" size="lg">Skip to the letter</Button>
            </a>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-24 sm:px-8 lg:px-10">
          <StorySection
            id="cards-section"
            title={birthdayContent.cards.title}
            description={birthdayContent.cards.description}
            unlocked={loaded}
            completed={allCardsOpened}
          >
            <div className="grid gap-5 md:grid-cols-3">
              {birthdayContent.cards.items.map((card) => {
                const flipped = flippedCards.includes(card.id);

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => toggleCard(card.id)}
                    className="flip-card group text-left"
                    aria-pressed={flipped}
                  >
                    <div className={cn("flip-card-inner", flipped && "is-flipped")}>
                      <div className="flip-card-face flip-card-front">
                        <div className="character-orb">
                          <div className="character-face">
                            <span className="character-ear character-ear-left" />
                            <span className="character-ear character-ear-right" />
                            <span className="character-eye character-eye-left" />
                            <span className="character-eye character-eye-right" />
                            <span className="character-heart" />
                          </div>
                        </div>
                        <p className="mt-6 text-center text-lg font-semibold text-foreground">
                          {card.frontLabel}
                        </p>
                        <p className="mt-2 text-center text-sm text-muted-foreground">Tap to open</p>
                      </div>

                      <div className="flip-card-face flip-card-back">
                        <p className="letter-heading">{card.backTitle}</p>
                        <p className="letter-copy">{card.message}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </StorySection>

          <StorySection
            id="decorations-section"
            title={birthdayContent.decorations.title}
            description={birthdayContent.decorations.description}
            unlocked={allCardsOpened}
            completed={decorationsComplete}
          >
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {birthdayContent.decorations.buttonLabels.slice(0, 3).map((label, index) => {
                      const active = decorationStep === index;
                      const done = decorationStep > index || (decorationsComplete && index === 2);

                      return (
                        <span key={label} className={cn("decoration-step-chip", active && "is-active", done && "is-done")}>
                          {done ? "✓" : index + 1}
                        </span>
                      );
                    })}
                  </div>
                  <h3 className="font-display text-2xl text-foreground sm:text-3xl">
                    {decorationsComplete ? birthdayContent.decorations.buttonLabels[3] : birthdayContent.decorations.buttonLabels[decorationStep]}
                  </h3>
                </div>

                <Button variant="dream" size="lg" onClick={handleDecorationClick} disabled={decorationsComplete}>
                  {decorationsComplete ? "Completed" : birthdayContent.decorations.buttonLabels[decorationStep]}
                </Button>

                <p className="text-sm leading-7 text-muted-foreground">
                  {decorationsComplete
                    ? birthdayContent.decorations.completion
                    : "Keep clicking to add each piece of the celebration."}
                </p>

                <div className="decoration-progress" aria-label="Decoration progress">
                  <span className="decoration-progress-bar" style={{ width: `${(decorationStep / 3) * 100}%` }} />
                </div>
              </div>

              <div className="celebration-stage decoration-stage-perfect">
                <div className={cn("party-banner", decorationStep >= 1 && "is-visible")}>
                  HAPPY BIRTHDAY
                </div>
                <div className="stage-glow stage-glow-left" />
                <div className="stage-glow stage-glow-right" />
                <div className={cn("sparkle-cake", decorationStep >= 3 && "is-visible")}>
                  <span className="cake-shadow" />
                  <span className="cake-tier cake-tier-bottom" />
                  <span className="cake-tier cake-tier-middle" />
                  <span className="cake-tier cake-tier-top" />
                  <span className={cn("cake-candle cake-candle-one", !candlesLit && "is-blown-out")} />
                  <span className={cn("cake-candle cake-candle-two", !candlesLit && "is-blown-out")} />
                  <span className={cn("cake-candle cake-candle-three", !candlesLit && "is-blown-out")} />
                  <span className={cn("cake-candle cake-candle-four", !candlesLit && "is-blown-out")} />
                  <span className={cn("cake-candle cake-candle-five", !candlesLit && "is-blown-out")} />
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="flex justify-end">
                  <Button
                    variant="soft"
                    onClick={() => setCandlesLit(false)}
                    disabled={decorationStep < 3 || !candlesLit}
                  >
                    Blow
                  </Button>
                </div>
              </div>
            </div>
          </StorySection>

          <StorySection
            id="scrapbook-section"
            title={birthdayContent.scrapbook.title}
            description={birthdayContent.scrapbook.description}
            unlocked={decorationsComplete}
            completed={false}
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="scrapbook-stack">
                {birthdayContent.scrapbook.photos.map((photo, index) => {
                  const offset = (index - scrapbookIndex + birthdayContent.scrapbook.photos.length) % birthdayContent.scrapbook.photos.length;
                  const active = index === scrapbookIndex;

                  return (
                    <figure
                      key={photo.id}
                      className={cn("scrapbook-photo", active && "is-active")}
                      style={{
                        transform: `translateX(${offset * 14}px) translateY(${offset * 12}px) rotate(${offset * 5 - 4}deg)`,
                        zIndex: birthdayContent.scrapbook.photos.length - offset,
                      }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading={active ? "eager" : "lazy"}
                        width={1024}
                        height={1024}
                        className="h-full w-full object-cover"
                      />
                    </figure>
                  );
                })}
              </div>

              <div>
                <p className="text-base leading-8 text-muted-foreground">
                  {birthdayContent.scrapbook.photos[scrapbookIndex]?.caption}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="soft" onClick={previousPhoto}>← Previous</Button>
                  <Button variant="dream" onClick={nextPhoto}>Next →</Button>
                </div>
                <div className="mt-5 flex gap-2">
                  {birthdayContent.scrapbook.photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setScrapbookIndex(index)}
                      className={cn("scrapbook-dot", index === scrapbookIndex && "is-active")}
                      aria-label={`Go to photo ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StorySection>

          <StorySection
            id="letter-section"
            title={birthdayContent.finalLetter.title}
            description={birthdayContent.finalLetter.subtitle}
            unlocked={decorationsComplete}
            completed={false}
          >
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                When you’re ready for the softest part of this little birthday universe, open the note waiting here.
              </p>
              <FinalLetterDialog />
            </div>
          </StorySection>
        </div>
      </main>
    </>
  );
}

interface StorySectionProps {
  children: React.ReactNode;
  completed: boolean;
  description: string;
  id: string;
  title: string;
  unlocked: boolean;
}

function StorySection({ children, completed, description, id, title, unlocked }: StorySectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "story-panel transition-all duration-500",
        unlocked ? "opacity-100" : "pointer-events-none opacity-45 saturate-50",
      )}
    >
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl text-foreground sm:text-4xl">{title}</h2>
          <p className="mt-3 text-base leading-8 text-muted-foreground">{description}</p>
        </div>
        <span className={cn("status-chip", completed && "is-complete")}>
          {completed ? "Completed" : unlocked ? "In progress" : "Locked"}
        </span>
      </div>
      {children}
    </section>
  );
}
